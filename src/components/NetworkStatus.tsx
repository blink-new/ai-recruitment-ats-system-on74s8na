import React from 'react'
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  X,
  Info
} from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { useNetworkState, NetworkManager } from '../lib/networkUtils'

interface NetworkStatusProps {
  showDetails?: boolean
  className?: string
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ 
  showDetails = false, 
  className = '' 
}) => {
  const networkState = useNetworkState()
  const [dismissed, setDismissed] = React.useState(false)
  const [timeToRetry, setTimeToRetry] = React.useState<number | null>(null)

  // Update countdown timer
  React.useEffect(() => {
    if (!networkState.nextRetryAt) {
      setTimeToRetry(null)
      return
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, networkState.nextRetryAt! - Date.now())
      setTimeToRetry(remaining)
      
      if (remaining <= 0) {
        setTimeToRetry(null)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [networkState.nextRetryAt])

  // Reset dismissed state when network comes back online
  React.useEffect(() => {
    if (networkState.isOnline && !networkState.lastError) {
      setDismissed(false)
    }
  }, [networkState.isOnline, networkState.lastError])

  const formatTimeRemaining = (ms: number): string => {
    const seconds = Math.ceil(ms / 1000)
    return `${seconds}s`
  }

  const getStatusIcon = () => {
    if (!networkState.isOnline) {
      return <WifiOff className="w-4 h-4 text-red-500" />
    }
    
    if (networkState.isConnecting) {
      return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
    }
    
    if (networkState.lastError) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    }
    
    return <Wifi className="w-4 h-4 text-green-500" />
  }

  const getStatusText = () => {
    if (!networkState.isOnline) {
      return 'Offline'
    }
    
    if (networkState.isConnecting) {
      return 'Connecting...'
    }
    
    if (networkState.lastError) {
      return 'Connection Issues'
    }
    
    return 'Online'
  }

  const getStatusColor = () => {
    if (!networkState.isOnline) return 'destructive'
    if (networkState.isConnecting) return 'default'
    if (networkState.lastError) return 'secondary'
    return 'default'
  }

  const handleRetry = async () => {
    // This would typically trigger a retry of the last failed operation
    // For now, we'll just clear the error state
    const networkManager = NetworkManager.getInstance()
    // In a real implementation, you'd want to retry the specific failed operation
    console.log('Manual retry triggered')
  }

  const handleDismiss = () => {
    setDismissed(true)
  }

  // Don't show if online and no errors, or if dismissed
  if ((networkState.isOnline && !networkState.lastError && !networkState.isConnecting) || dismissed) {
    return null
  }

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md ${className}`}>
      <Alert className="shadow-lg border-l-4 border-l-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 flex-1">
            {getStatusIcon()}
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{getStatusText()}</span>
                <Badge variant={getStatusColor() as any} className="text-xs">
                  {networkState.isOnline ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              
              {networkState.lastError && (
                <AlertDescription className="mt-1 text-xs">
                  {networkState.lastError.message}
                </AlertDescription>
              )}
              
              {networkState.isConnecting && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span>Attempting to reconnect...</span>
                    {networkState.retryCount > 0 && (
                      <span>Attempt {networkState.retryCount}</span>
                    )}
                  </div>
                  <Progress value={33} className="h-1" />
                </div>
              )}
              
              {timeToRetry && timeToRetry > 0 && (
                <div className="mt-2 flex items-center space-x-2 text-xs text-slate-600">
                  <Clock className="w-3 h-3" />
                  <span>Retrying in {formatTimeRemaining(timeToRetry)}</span>
                </div>
              )}
              
              {showDetails && networkState.lastError && (
                <div className="mt-2 text-xs text-slate-500">
                  <div>Error Code: {networkState.lastError.code || 'UNKNOWN'}</div>
                  {networkState.lastError.status && (
                    <div>Status: {networkState.lastError.status}</div>
                  )}
                  <div>Time: {new Date(networkState.lastError.timestamp).toLocaleTimeString()}</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 ml-2">
            {networkState.lastError && !networkState.isConnecting && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRetry}
                className="h-6 px-2 text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  )
}

// Compact network status indicator for the header
export const NetworkStatusIndicator: React.FC = () => {
  const networkState = useNetworkState()
  
  return (
    <div className="flex items-center space-x-2">
      {getStatusIcon()}
      {networkState.isConnecting && (
        <span className="text-xs text-slate-600">
          Reconnecting...
        </span>
      )}
      {networkState.retryCount > 0 && !networkState.isConnecting && (
        <Badge variant="outline" className="text-xs">
          Retry {networkState.retryCount}
        </Badge>
      )}
    </div>
  )
  
  function getStatusIcon() {
    if (!networkState.isOnline) {
      return <WifiOff className="w-4 h-4 text-red-500" />
    }
    
    if (networkState.isConnecting) {
      return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
    }
    
    if (networkState.lastError) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    }
    
    return <CheckCircle className="w-4 h-4 text-green-500" />
  }
}

