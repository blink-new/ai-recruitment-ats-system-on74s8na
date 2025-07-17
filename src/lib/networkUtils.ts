// Network utilities for error handling, retry logic, and auto-healing
export interface NetworkError extends Error {
  code?: string
  status?: number
  isNetworkError: boolean
  retryable: boolean
  timestamp: number
}

export interface RetryConfig {
  maxRetries: number
  baseDelay: number
  maxDelay: number
  backoffMultiplier: number
  retryableStatuses: number[]
  retryableErrors: string[]
}

export interface NetworkState {
  isOnline: boolean
  isConnecting: boolean
  lastError: NetworkError | null
  retryCount: number
  nextRetryAt: number | null
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
  retryableErrors: ['NETWORK_ERROR', 'TIMEOUT', 'CONNECTION_FAILED']
}

export class NetworkManager {
  private static instance: NetworkManager
  private state: NetworkState = {
    isOnline: navigator.onLine,
    isConnecting: false,
    lastError: null,
    retryCount: 0,
    nextRetryAt: null
  }
  private listeners: ((state: NetworkState) => void)[] = []
  private retryTimeouts: Map<string, NodeJS.Timeout> = new Map()

  private constructor() {
    this.setupNetworkListeners()
  }

  static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager()
    }
    return NetworkManager.instance
  }

  private setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.updateState({ isOnline: true, lastError: null })
      this.notifyListeners()
    })

    window.addEventListener('offline', () => {
      this.updateState({ isOnline: false })
      this.notifyListeners()
    })
  }

  private updateState(updates: Partial<NetworkState>) {
    this.state = { ...this.state, ...updates }
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state))
  }

  subscribe(listener: (state: NetworkState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  getState(): NetworkState {
    return { ...this.state }
  }

  createNetworkError(
    message: string,
    code?: string,
    status?: number,
    retryable: boolean = true
  ): NetworkError {
    const error = new Error(message) as NetworkError
    error.code = code
    error.status = status
    error.isNetworkError = true
    error.retryable = retryable
    error.timestamp = Date.now()
    return error
  }

  isRetryableError(error: any): boolean {
    if (!error) return false
    
    // Check if it's a network error
    if (error.isNetworkError && error.retryable) return true
    
    // Check HTTP status codes
    if (error.status && DEFAULT_RETRY_CONFIG.retryableStatuses.includes(error.status)) {
      return true
    }
    
    // Check error codes
    if (error.code && DEFAULT_RETRY_CONFIG.retryableErrors.includes(error.code)) {
      return true
    }
    
    // Check common network error patterns
    const message = error.message?.toLowerCase() || ''
    const networkErrorPatterns = [
      'network error',
      'connection failed',
      'timeout',
      'fetch failed',
      'load failed',
      'network request failed'
    ]
    
    return networkErrorPatterns.some(pattern => message.includes(pattern))
  }

  calculateDelay(retryCount: number, config: RetryConfig = DEFAULT_RETRY_CONFIG): number {
    const delay = Math.min(
      config.baseDelay * Math.pow(config.backoffMultiplier, retryCount),
      config.maxDelay
    )
    
    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 0.1 * delay
    return Math.floor(delay + jitter)
  }

  async withRetry<T>(
    operation: () => Promise<T>,
    config: Partial<RetryConfig> = {},
    operationId?: string
  ): Promise<T> {
    const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config }
    let lastError: any
    
    for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
      try {
        this.updateState({ isConnecting: true, retryCount: attempt })
        this.notifyListeners()
        
        const result = await operation()
        
        // Success - reset state
        this.updateState({
          isConnecting: false,
          lastError: null,
          retryCount: 0,
          nextRetryAt: null
        })
        this.notifyListeners()
        
        // Clear any pending retry for this operation
        if (operationId && this.retryTimeouts.has(operationId)) {
          clearTimeout(this.retryTimeouts.get(operationId)!)
          this.retryTimeouts.delete(operationId)
        }
        
        return result
      } catch (error) {
        lastError = error
        
        // Check if we should retry
        if (attempt < finalConfig.maxRetries && this.isRetryableError(error)) {
          const delay = this.calculateDelay(attempt, finalConfig)
          const nextRetryAt = Date.now() + delay
          
          this.updateState({
            isConnecting: false,
            lastError: error as NetworkError,
            retryCount: attempt + 1,
            nextRetryAt
          })
          this.notifyListeners()
          
          console.warn(`Network operation failed (attempt ${attempt + 1}/${finalConfig.maxRetries + 1}). Retrying in ${delay}ms...`, error)
          
          // Wait before retry
          await new Promise(resolve => {
            const timeout = setTimeout(resolve, delay)
            if (operationId) {
              this.retryTimeouts.set(operationId, timeout)
            }
          })
        } else {
          // No more retries or non-retryable error
          this.updateState({
            isConnecting: false,
            lastError: error as NetworkError,
            retryCount: attempt,
            nextRetryAt: null
          })
          this.notifyListeners()
          break
        }
      }
    }
    
    throw lastError
  }

  async healthCheck(url: string = '/api/health'): Promise<boolean> {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        cache: 'no-cache'
      })
      return response.ok
    } catch {
      return false
    }
  }

  startAutoHealing(interval: number = 30000) {
    const checkHealth = async () => {
      if (!this.state.isOnline) return
      
      const isHealthy = await this.healthCheck()
      if (!isHealthy && this.state.lastError) {
        console.log('Auto-healing: Attempting to recover from network error...')
        // Trigger a retry of the last failed operation if applicable
        this.updateState({ lastError: null })
        this.notifyListeners()
      }
    }
    
    setInterval(checkHealth, interval)
  }
}

// Enhanced fetch wrapper with automatic retry and error handling
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retryConfig?: Partial<RetryConfig>
): Promise<Response> {
  const networkManager = NetworkManager.getInstance()
  
  return networkManager.withRetry(async () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw networkManager.createNetworkError(
          `HTTP ${response.status}: ${response.statusText}`,
          'HTTP_ERROR',
          response.status,
          networkManager.isRetryableError({ status: response.status })
        )
      }
      
      return response
    } catch (error: any) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        throw networkManager.createNetworkError(
          'Request timeout',
          'TIMEOUT',
          408,
          true
        )
      }
      
      if (error.isNetworkError) {
        throw error
      }
      
      // Convert generic errors to network errors
      throw networkManager.createNetworkError(
        error.message || 'Network request failed',
        'NETWORK_ERROR',
        undefined,
        true
      )
    }
  }, retryConfig, `fetch-${url}`)
}

// Utility function to check if user is online
export function useNetworkState() {
  const [networkState, setNetworkState] = React.useState<NetworkState>(
    NetworkManager.getInstance().getState()
  )
  
  React.useEffect(() => {
    const networkManager = NetworkManager.getInstance()
    const unsubscribe = networkManager.subscribe(setNetworkState)
    
    // Start auto-healing
    networkManager.startAutoHealing()
    
    return unsubscribe
  }, [])
  
  return networkState
}

// React hook for network-aware operations
export function useNetworkOperation<T>(
  operation: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<NetworkError | null>(null)
  const networkState = useNetworkState()
  
  const execute = React.useCallback(async () => {
    if (!networkState.isOnline) {
      setError(NetworkManager.getInstance().createNetworkError(
        'No internet connection',
        'OFFLINE',
        undefined,
        false
      ))
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await NetworkManager.getInstance().withRetry(operation)
      setData(result)
    } catch (err) {
      setError(err as NetworkError)
    } finally {
      setLoading(false)
    }
  }, [operation, networkState.isOnline])
  
  React.useEffect(() => {
    execute()
  }, [execute, dependencies])
  
  return {
    data,
    loading: loading || networkState.isConnecting,
    error: error || networkState.lastError,
    retry: execute,
    networkState
  }
}

// Add React import for hooks
import React from 'react'