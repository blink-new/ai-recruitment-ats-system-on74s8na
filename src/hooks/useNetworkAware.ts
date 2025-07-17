import React from 'react'
import { useNetworkState, NetworkManager } from '../lib/networkUtils'

// Hook for components to handle network-aware operations
export const useNetworkAwareOperation = <T,>(
  operation: () => Promise<T>,
  options: {
    showErrorToast?: boolean
    autoRetry?: boolean
    retryDelay?: number
  } = {}
) => {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const networkState = useNetworkState()
  
  const execute = React.useCallback(async () => {
    if (!networkState.isOnline) {
      const offlineError = new Error('No internet connection. Please check your network and try again.')
      setError(offlineError)
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const networkManager = NetworkManager.getInstance()
      const result = await networkManager.withRetry(operation)
      setData(result)
      setError(null)
    } catch (err) {
      setError(err as Error)
      
      if (options.showErrorToast) {
        // You could integrate with a toast system here
        console.error('Network operation failed:', err)
      }
    } finally {
      setLoading(false)
    }
  }, [operation, networkState.isOnline, options.showErrorToast])
  
  // Auto-retry when network comes back online
  React.useEffect(() => {
    if (networkState.isOnline && error && options.autoRetry) {
      const timer = setTimeout(() => {
        execute()
      }, options.retryDelay || 1000)
      
      return () => clearTimeout(timer)
    }
  }, [networkState.isOnline, error, options.autoRetry, options.retryDelay, execute])
  
  return {
    data,
    loading: loading || networkState.isConnecting,
    error,
    execute,
    retry: execute,
    networkState
  }
}