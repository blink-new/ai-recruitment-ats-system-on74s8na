import React, { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Briefcase,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Progress } from '../components/ui/progress'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')
  const [metric, setMetric] = useState('all')

  const kpis = [
    {
      title: 'Total Hires',
      value: '24',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Time to Hire',
      value: '18 days',
      change: '-3 days',
      trend: 'down',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Cost per Hire',
      value: '$3,200',
      change: '-12%',
      trend: 'down',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Offer Acceptance',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const pipelineMetrics = [
    { stage: 'Applied', count: 247, conversion: 100, color: 'bg-slate-500' },
    { stage: 'Screening', count: 156, conversion: 63, color: 'bg-blue-500' },
    { stage: 'Phone Screen', count: 89, conversion: 36, color: 'bg-yellow-500' },
    { stage: 'Technical', count: 45, conversion: 18, color: 'bg-purple-500' },
    { stage: 'Final Round', count: 28, conversion: 11, color: 'bg-orange-500' },
    { stage: 'Offer', count: 24, conversion: 10, color: 'bg-green-500' }
  ]

  const sourceMetrics = [
    { source: 'LinkedIn', candidates: 89, hires: 12, cost: '$2,800', quality: 92 },
    { source: 'Indeed', candidates: 156, hires: 8, cost: '$1,200', quality: 78 },
    { source: 'Referrals', candidates: 34, hires: 6, cost: '$500', quality: 95 },
    { source: 'Company Website', candidates: 67, hires: 4, cost: '$800', quality: 85 },
    { source: 'Glassdoor', candidates: 45, hires: 2, cost: '$600', quality: 72 },
    { source: 'Other', candidates: 23, hires: 1, cost: '$400', quality: 68 }
  ]

  const topPerformers = [
    { name: 'Sarah Kim', role: 'Senior Recruiter', hires: 8, timeToHire: 15, satisfaction: 4.8 },
    { name: 'Mike Chen', role: 'Technical Recruiter', hires: 6, timeToHire: 12, satisfaction: 4.9 },
    { name: 'Lisa Wang', role: 'Recruiter', hires: 5, timeToHire: 18, satisfaction: 4.7 },
    { name: 'John Smith', role: 'Senior Recruiter', hires: 5, timeToHire: 20, satisfaction: 4.6 }
  ]

  const recentHires = [
    { name: 'Alex Chen', position: 'Senior Frontend Developer', department: 'Engineering', hireDate: '2024-01-15', salary: '$140k' },
    { name: 'Maria Garcia', position: 'Product Manager', department: 'Product', hireDate: '2024-01-12', salary: '$160k' },
    { name: 'David Kim', position: 'UX Designer', department: 'Design', hireDate: '2024-01-10', salary: '$120k' },
    { name: 'Emily Johnson', position: 'Data Scientist', department: 'Data', hireDate: '2024-01-08', salary: '$150k' }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
    )
  }

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-1">Track your recruitment performance and insights</p>
        </div>
        <div className="flex space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      {getTrendIcon(kpi.trend)}
                      <span className={`text-sm font-medium ml-1 ${getTrendColor(kpi.trend)}`}>
                        {kpi.change}
                      </span>
                      <span className="text-sm text-slate-500 ml-1">vs last period</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Conversion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Pipeline Conversion</span>
            </CardTitle>
            <CardDescription>Candidate flow through hiring stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineMetrics.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{stage.stage}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">{stage.count}</span>
                      <span className="text-xs text-slate-500">({stage.conversion}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${stage.color}`}
                      style={{ width: `${stage.conversion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Source Performance</span>
            </CardTitle>
            <CardDescription>Recruitment channel effectiveness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceMetrics.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">{source.source}</h4>
                    <p className="text-sm text-slate-600">{source.candidates} candidates • {source.hires} hires</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{source.cost}</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-slate-600">Quality: {source.quality}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Top Performers</span>
            </CardTitle>
            <CardDescription>Best recruiting team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">{performer.name}</h4>
                    <p className="text-sm text-slate-600">{performer.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{performer.hires} hires</div>
                    <div className="text-xs text-slate-500">{performer.timeToHire} days avg</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-slate-600">Rating: {performer.satisfaction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Hires */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Recent Hires</span>
            </CardTitle>
            <CardDescription>Latest successful placements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentHires.map((hire, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{hire.name}</h4>
                      <p className="text-sm text-slate-600">{hire.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">{hire.department}</Badge>
                    <div className="text-sm text-slate-600">{hire.salary}</div>
                    <div className="text-xs text-slate-500">{new Date(hire.hireDate).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time to Hire Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Time to Hire Breakdown</span>
            </CardTitle>
            <CardDescription>Average days spent in each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Sourcing to Application</span>
                <span className="font-medium">3.2 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Application to Screen</span>
                <span className="font-medium">2.1 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Screen to Interview</span>
                <span className="font-medium">4.5 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Interview to Decision</span>
                <span className="font-medium">3.8 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Decision to Offer</span>
                <span className="font-medium">1.2 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Offer to Accept</span>
                <span className="font-medium">3.2 days</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-900">Total Average</span>
                  <span className="text-slate-900">18.0 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Quality Metrics</span>
            </CardTitle>
            <CardDescription>Hiring quality indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">90-Day Retention</span>
                  <span className="font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Manager Satisfaction</span>
                  <span className="font-medium">4.7/5</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">New Hire Performance</span>
                  <span className="font-medium">4.5/5</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Cultural Fit Score</span>
                  <span className="font-medium">4.6/5</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Skills Match Accuracy</span>
                  <span className="font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}