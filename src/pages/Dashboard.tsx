import React from 'react'
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock,
  Plus,
  ArrowRight,
  Star,
  Calendar,
  MessageSquare,
  Target,
  Activity,
  CheckCircle,
  AlertCircle,
  Wifi
} from 'lucide-react'
import { NetworkDemo } from '../components/NetworkDemo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'

export default function Dashboard() {
  const stats = [
    {
      title: 'Active Jobs',
      value: '12',
      change: '+2 this week',
      trend: 'up',
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Candidates',
      value: '247',
      change: '+18 today',
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Interviews Scheduled',
      value: '8',
      change: 'This week',
      trend: 'neutral',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg. Time to Hire',
      value: '18 days',
      change: '-3 days',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentApplications = [
    {
      id: 1,
      name: 'Sarah Chen',
      position: 'Senior Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      score: 92,
      status: 'AI Screening',
      appliedTime: '2 hours ago',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      position: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      score: 88,
      status: 'Phone Screen',
      appliedTime: '4 hours ago',
      location: 'New York, NY'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      position: 'UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      score: 85,
      status: 'Technical Review',
      appliedTime: '6 hours ago',
      location: 'Austin, TX'
    },
    {
      id: 4,
      name: 'David Kim',
      position: 'Backend Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      score: 90,
      status: 'Final Interview',
      appliedTime: '1 day ago',
      location: 'Seattle, WA'
    }
  ]

  const upcomingInterviews = [
    {
      id: 1,
      candidate: 'Lisa Wang',
      position: 'Data Scientist',
      interviewer: 'Mike Chen',
      time: '10:00 AM',
      date: 'Today',
      type: 'Technical',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
    },
    {
      id: 2,
      candidate: 'Alex Thompson',
      position: 'DevOps Engineer',
      interviewer: 'Sarah Kim',
      time: '2:30 PM',
      date: 'Today',
      type: 'Phone Screen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    {
      id: 3,
      candidate: 'Maria Garcia',
      position: 'Frontend Developer',
      interviewer: 'John Smith',
      time: '11:00 AM',
      date: 'Tomorrow',
      type: 'Final Round',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
    }
  ]

  const activeJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      applications: 45,
      filled: 0,
      total: 2,
      status: 'Active',
      priority: 'High',
      daysOpen: 12
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      applications: 67,
      filled: 1,
      total: 1,
      status: 'Active',
      priority: 'Medium',
      daysOpen: 8
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      applications: 23,
      filled: 0,
      total: 1,
      status: 'Active',
      priority: 'Low',
      daysOpen: 5
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 80) return 'text-blue-600 bg-blue-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AI Screening':
        return 'bg-blue-100 text-blue-800'
      case 'Phone Screen':
        return 'bg-yellow-100 text-yellow-800'
      case 'Technical Review':
        return 'bg-purple-100 text-purple-800'
      case 'Final Interview':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your recruitment.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600 rotate-180' : 
                        'text-slate-400'
                      }`} />
                      <span className="text-sm text-slate-500">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest candidates who applied to your jobs</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={application.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {application.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-slate-900">{application.name}</h4>
                      <p className="text-sm text-slate-600">{application.position}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-slate-500">📍 {application.location}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{application.appliedTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(application.score)}`}>
                      <Star className="w-3 h-3 inline mr-1" />
                      {application.score}
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="p-3 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={interview.avatar} />
                      <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                        {interview.candidate.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{interview.candidate}</p>
                      <p className="text-xs text-slate-600 truncate">{interview.position}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {interview.date} at {interview.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      with {interview.interviewer}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {interview.type}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Join Interview
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>Currently open positions</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              Manage Jobs
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-slate-900">{job.title}</h4>
                      <p className="text-sm text-slate-600">{job.department}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(job.priority)}>
                        {job.priority}
                      </Badge>
                      <Badge variant="outline">
                        {job.daysOpen} days open
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-slate-900">{job.applications}</div>
                      <div className="text-xs text-slate-500">Applications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{job.filled}</div>
                      <div className="text-xs text-slate-500">Filled</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{job.total}</div>
                      <div className="text-xs text-slate-500">Total Needed</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-slate-900">{Math.round((job.filled / job.total) * 100)}%</span>
                    </div>
                    <Progress value={(job.filled / job.total) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>AI Insights</span>
            </CardTitle>
            <CardDescription>Smart recommendations for your recruitment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">High-Quality Candidates Available</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      3 candidates with 90+ scores are waiting for review in your Frontend Developer pipeline.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-100">
                      Review Candidates
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">Screening Efficiency Up</h4>
                    <p className="text-sm text-green-700 mt-1">
                      AI screening has improved your time-to-first-interview by 40% this month.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900">Interview Bottleneck Detected</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Product Manager role has 5 candidates waiting for technical interviews for over 1 week.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 border-orange-300 text-orange-700 hover:bg-orange-100">
                      Schedule Interviews
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900">Sourcing Opportunity</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Based on your criteria, 12 potential candidates found on LinkedIn for DevOps Engineer role.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 border-purple-300 text-purple-700 hover:bg-purple-100">
                      View Prospects
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Demo Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wifi className="w-5 h-5 mr-2" />
            Network Error Handling Demo
          </CardTitle>
          <CardDescription>
            Test and demonstrate the network error handling, retry mechanisms, and auto-healing features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NetworkDemo />
        </CardContent>
      </Card>
    </div>
  )
}