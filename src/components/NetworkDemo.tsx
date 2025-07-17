import React, { useState } from 'react'
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle,
  Play,
  Pause,
  Settings,
  Activity,
  Clock,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { useNetworkState } from '../lib/networkUtils'
import { useNetworkAwareOperation } from '../hooks/useNetworkAware'

export const NetworkDemo: React.FC = () => {
  const networkState = useNetworkState()
  const [simulateOffline, setSimulateOffline] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])

  // Example of network-aware operation
  const {
    data: jobsData,
    loading: jobsLoading,
    error: jobsError,
    retry: retryJobs
  } = useNetworkAwareOperation(
    async () => {
      // Simulate API call
      if (simulateOffline) {
        throw new Error('Simulated network error')
      }
      
      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        data: [
          { id: 1, title: 'Frontend Developer', applications: 45 },
          { id: 2, title: 'Backend Engineer', applications: 32 },
          { id: 3, title: 'Product Manager', applications: 67 }
        ],
        success: true
      }
    },
    { 
      showErrorToast: true, 
      autoRetry: true,
      retryDelay: 2000
    }
  )

  const simulateNetworkError = async () => {
    const testId = Date.now()
    setTestResults(prev => [...prev, {
      id: testId,
      type: 'Network Error Test',
      status: 'running',
      timestamp: new Date().toLocaleTimeString()
    }])

    try {
      // Simulate a failing API call
      throw new Error('Simulated network failure')
    } catch (error) {
      setTestResults(prev => prev.map(test => 
        test.id === testId 
          ? { ...test, status: 'failed', error: error.message }
          : test
      ))
    }
  }

  const simulateSlowNetwork = async () => {
    const testId = Date.now()
    setTestResults(prev => [...prev, {
      id: testId,
      type: 'Slow Network Test',
      status: 'running',
      timestamp: new Date().toLocaleTimeString()
    }])

    try {
      // Simulate slow network
      await new Promise(resolve => setTimeout(resolve, 5000))
      setTestResults(prev => prev.map(test => 
        test.id === testId 
          ? { ...test, status: 'success', duration: '5.0s' }
          : test
      ))
    } catch (error) {
      setTestResults(prev => prev.map(test => 
        test.id === testId 
          ? { ...test, status: 'failed', error: error.message }
          : test
      ))
    }
  }

  const testRetryMechanism = async () => {
    const testId = Date.now()
    setTestResults(prev => [...prev, {
      id: testId,
      type: 'Retry Mechanism Test',
      status: 'running',
      timestamp: new Date().toLocaleTimeString(),
      attempts: 0
    }])

    let attempts = 0
    const maxAttempts = 3

    const attemptRequest = async (): Promise<any> => {
      attempts++
      setTestResults(prev => prev.map(test => 
        test.id === testId 
          ? { ...test, attempts }
          : test
      ))

      if (attempts < maxAttempts) {
        throw new Error(`Attempt ${attempts} failed`)
      }
      
      return { success: true, attempts }
    }

    try {
      // This would normally use the NetworkManager's withRetry method
      let lastError
      for (let i = 0; i < maxAttempts; i++) {
        try {
          const result = await attemptRequest()
          setTestResults(prev => prev.map(test => 
            test.id === testId 
              ? { ...test, status: 'success', result: `Succeeded after ${attempts} attempts` }
              : test
          ))
          return
        } catch (error) {
          lastError = error
          if (i < maxAttempts - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
          }
        }
      }
      throw lastError
    } catch (error) {
      setTestResults(prev => prev.map(test => 
        test.id === testId 
          ? { ...test, status: 'failed', error: error.message }
          : test
      ))
    }
  }

  const clearTestResults = () => {
    setTestResults([])
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800'
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Network Error Handling Demo</h2>
          <p className="text-slate-600 mt-1">
            Test and demonstrate network error handling, retry mechanisms, and auto-healing
          </p>
        </div>
        <Button variant="outline" onClick={clearTestResults}>
          Clear Results
        </Button>
      </div>

      {/* Network Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Connection Status</p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {networkState.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                {networkState.isOnline ? (
                  <Wifi className="w-6 h-6 text-green-600" />
                ) : (
                  <WifiOff className="w-6 h-6 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Retry Count</p>
                <p className="text-lg font-bold text-slate-900 mt-1">{networkState.retryCount}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Connection State</p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {networkState.isConnecting ? 'Connecting' : 'Idle'}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Last Error</p>
                <p className="text-sm font-medium text-slate-900 mt-1">
                  {networkState.lastError ? 'Error Present' : 'None'}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                {networkState.lastError ? (
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Network State Details */}
      {(networkState.lastError || networkState.isConnecting) && (
        <Alert>
          <Activity className="h-4 w-4" />
          <AlertDescription>
            {networkState.isConnecting && (
              <div className="space-y-2">
                <p>Network operation in progress...</p>
                <Progress value={33} className="w-full" />
              </div>
            )}
            {networkState.lastError && (
              <div>
                <p className="font-medium">Network Error:</p>
                <p className="text-sm">{networkState.lastError.message}</p>
                {networkState.lastError.code && (
                  <p className="text-xs text-slate-500">Code: {networkState.lastError.code}</p>
                )}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Network Tests
            </CardTitle>
            <CardDescription>
              Simulate various network conditions and test error handling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Simulate Offline Mode</p>
                <p className="text-sm text-slate-600">Test offline behavior</p>
              </div>
              <Button
                variant={simulateOffline ? "destructive" : "outline"}
                size="sm"
                onClick={() => setSimulateOffline(!simulateOffline)}
              >
                {simulateOffline ? 'Go Online' : 'Go Offline'}
              </Button>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={simulateNetworkError}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Simulate Network Error
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={simulateSlowNetwork}
              >
                <Clock className="w-4 h-4 mr-2" />
                Simulate Slow Network
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={testRetryMechanism}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Test Retry Mechanism
              </Button>
            </div>

            {/* Example API Call */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Example API Call</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={retryJobs}
                  disabled={jobsLoading}
                >
                  {jobsLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    'Retry'
                  )}
                </Button>
              </div>
              
              {jobsLoading && (
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">Loading jobs...</p>
                  <Progress value={50} className="w-full" />
                </div>
              )}
              
              {jobsError && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-medium">API Error:</p>
                    <p className="text-sm">{jobsError.message}</p>
                  </AlertDescription>
                </Alert>
              )}
              
              {jobsData && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-600">✓ API call successful</p>
                  <div className="text-xs text-slate-600">
                    Loaded {jobsData.data?.length || 0} jobs
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Test Results
            </CardTitle>
            <CardDescription>
              Real-time results of network tests and operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Zap className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">No tests run yet</p>
                  <p className="text-xs">Click a test button to see results</p>
                </div>
              ) : (
                testResults.map((test) => (
                  <div key={test.id} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(test.status)}
                        <span className="font-medium text-sm">{test.type}</span>
                      </div>
                      <Badge className={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-slate-600 space-y-1">
                      <div>Started: {test.timestamp}</div>
                      {test.attempts && (
                        <div>Attempts: {test.attempts}</div>
                      )}
                      {test.duration && (
                        <div>Duration: {test.duration}</div>
                      )}
                      {test.error && (
                        <div className="text-red-600">Error: {test.error}</div>
                      )}
                      {test.result && (
                        <div className="text-green-600">Result: {test.result}</div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}