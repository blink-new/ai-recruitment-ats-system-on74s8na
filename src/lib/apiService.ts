import { fetchWithRetry, NetworkManager } from './networkUtils'

// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api'
const DEFAULT_TIMEOUT = 10000

// API response types
export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// API error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Base API service class
class ApiService {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private networkManager: NetworkManager

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
    this.networkManager = NetworkManager.getInstance()
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetchWithRetry(url, config, {
        maxRetries: 3,
        baseDelay: 1000,
        maxDelay: 5000,
      })

      const contentType = response.headers.get('content-type')
      let data: any

      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = await response.text()
      }

      // Handle API error responses
      if (!response.ok) {
        throw new ApiError(
          data.message || data.error || `HTTP ${response.status}`,
          response.status,
          data.code,
          data
        )
      }

      return data
    } catch (error: any) {
      // Re-throw network errors as-is
      if (error.isNetworkError) {
        throw error
      }

      // Convert other errors to ApiError
      if (error instanceof ApiError) {
        throw error
      }

      throw new ApiError(
        error.message || 'An unexpected error occurred',
        error.status,
        error.code
      )
    }
  }

  // HTTP methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(endpoint, this.baseUrl)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    return this.request<T>(url.pathname + url.search)
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }

  // File upload with progress
  async upload<T>(
    endpoint: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()
      formData.append('file', file)

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText)
            resolve(response)
          } catch {
            resolve(xhr.responseText as any)
          }
        } else {
          reject(new ApiError(`Upload failed: ${xhr.statusText}`, xhr.status))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new ApiError('Upload failed: Network error'))
      })

      xhr.addEventListener('timeout', () => {
        reject(new ApiError('Upload failed: Timeout'))
      })

      xhr.open('POST', `${this.baseUrl}${endpoint}`)
      xhr.timeout = DEFAULT_TIMEOUT
      xhr.send(formData)
    })
  }

  // Set authentication token
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  // Remove authentication token
  removeAuthToken() {
    delete this.defaultHeaders['Authorization']
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.get('/health')
      return true
    } catch {
      return false
    }
  }
}

// Create singleton instance
export const apiService = new ApiService()

// Specific API endpoints for the ATS system
export const atsApi = {
  // Jobs
  jobs: {
    list: (params?: { page?: number; limit?: number; status?: string }) =>
      apiService.get<PaginatedResponse<any>>('/jobs', params),
    
    get: (id: string) =>
      apiService.get<ApiResponse<any>>(`/jobs/${id}`),
    
    create: (data: any) =>
      apiService.post<ApiResponse<any>>('/jobs', data),
    
    update: (id: string, data: any) =>
      apiService.put<ApiResponse<any>>(`/jobs/${id}`, data),
    
    delete: (id: string) =>
      apiService.delete<ApiResponse<any>>(`/jobs/${id}`),
    
    applications: (id: string, params?: { page?: number; limit?: number }) =>
      apiService.get<PaginatedResponse<any>>(`/jobs/${id}/applications`, params),
  },

  // Candidates
  candidates: {
    list: (params?: { 
      page?: number; 
      limit?: number; 
      search?: string; 
      status?: string;
      position?: string;
      score?: string;
    }) =>
      apiService.get<PaginatedResponse<any>>('/candidates', params),
    
    get: (id: string) =>
      apiService.get<ApiResponse<any>>(`/candidates/${id}`),
    
    create: (data: any) =>
      apiService.post<ApiResponse<any>>('/candidates', data),
    
    update: (id: string, data: any) =>
      apiService.put<ApiResponse<any>>(`/candidates/${id}`, data),
    
    delete: (id: string) =>
      apiService.delete<ApiResponse<any>>(`/candidates/${id}`),
    
    uploadResume: (id: string, file: File, onProgress?: (progress: number) => void) =>
      apiService.upload<ApiResponse<any>>(`/candidates/${id}/resume`, file, onProgress),
  },

  // AI Screening
  screening: {
    start: (data: { jobId: string; candidateIds: string[]; criteria: any }) =>
      apiService.post<ApiResponse<any>>('/screening/start', data),
    
    results: (params?: { 
      page?: number; 
      limit?: number; 
      jobId?: string;
      status?: string;
    }) =>
      apiService.get<PaginatedResponse<any>>('/screening/results', params),
    
    result: (id: string) =>
      apiService.get<ApiResponse<any>>(`/screening/results/${id}`),
    
    rescreen: (candidateId: string, jobId: string) =>
      apiService.post<ApiResponse<any>>('/screening/rescreen', { candidateId, jobId }),
  },

  // Sourcing
  sourcing: {
    search: (params: {
      query: string;
      location?: string;
      experience?: [number, number];
      salary?: [number, number];
      skills?: string[];
    }) =>
      apiService.post<ApiResponse<any>>('/sourcing/search', params),
    
    campaigns: {
      list: () =>
        apiService.get<ApiResponse<any[]>>('/sourcing/campaigns'),
      
      create: (data: any) =>
        apiService.post<ApiResponse<any>>('/sourcing/campaigns', data),
      
      update: (id: string, data: any) =>
        apiService.put<ApiResponse<any>>(`/sourcing/campaigns/${id}`, data),
      
      delete: (id: string) =>
        apiService.delete<ApiResponse<any>>(`/sourcing/campaigns/${id}`),
    },
    
    profiles: {
      save: (profileId: string) =>
        apiService.post<ApiResponse<any>>(`/sourcing/profiles/${profileId}/save`),
      
      contact: (profileId: string, message: string) =>
        apiService.post<ApiResponse<any>>(`/sourcing/profiles/${profileId}/contact`, { message }),
    },
  },

  // Pipeline
  pipeline: {
    stages: () =>
      apiService.get<ApiResponse<any[]>>('/pipeline/stages'),
    
    candidates: (stageId?: string) =>
      apiService.get<ApiResponse<any[]>>('/pipeline/candidates', { stage: stageId }),
    
    moveCandidate: (candidateId: string, fromStage: string, toStage: string) =>
      apiService.post<ApiResponse<any>>('/pipeline/move', {
        candidateId,
        fromStage,
        toStage,
      }),
    
    addNote: (candidateId: string, note: string) =>
      apiService.post<ApiResponse<any>>(`/pipeline/candidates/${candidateId}/notes`, { note }),
    
    scheduleInterview: (candidateId: string, data: any) =>
      apiService.post<ApiResponse<any>>(`/pipeline/candidates/${candidateId}/interviews`, data),
  },

  // Analytics
  analytics: {
    dashboard: () =>
      apiService.get<ApiResponse<any>>('/analytics/dashboard'),
    
    jobs: (params?: { period?: string; jobId?: string }) =>
      apiService.get<ApiResponse<any>>('/analytics/jobs', params),
    
    candidates: (params?: { period?: string; position?: string }) =>
      apiService.get<ApiResponse<any>>('/analytics/candidates', params),
    
    pipeline: (params?: { period?: string }) =>
      apiService.get<ApiResponse<any>>('/analytics/pipeline', params),
    
    screening: (params?: { period?: string }) =>
      apiService.get<ApiResponse<any>>('/analytics/screening', params),
  },

  // Settings
  settings: {
    get: () =>
      apiService.get<ApiResponse<any>>('/settings'),
    
    update: (data: any) =>
      apiService.put<ApiResponse<any>>('/settings', data),
    
    integrations: {
      list: () =>
        apiService.get<ApiResponse<any[]>>('/settings/integrations'),
      
      configure: (integration: string, config: any) =>
        apiService.post<ApiResponse<any>>(`/settings/integrations/${integration}`, config),
    },
  },
}

// Export types and utilities
export { ApiService, ApiError }
export default apiService