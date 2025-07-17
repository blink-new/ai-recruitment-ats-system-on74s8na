import React, { useState } from 'react'
import {
  Bot,
  Brain,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  FileText,
  Clock,
  TrendingUp,
  Users,
  Target,
  Zap,
  Play,
  Pause,
  Settings,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  MessageSquare,
  UserPlus,
  Bookmark,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Building
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { Separator } from './ui/separator'

interface AIScreeningProps {
  jobId?: string
  candidates?: any[]
}

const AIScreening: React.FC<AIScreeningProps> = ({ jobId, candidates = [] }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [screeningStatus, setScreeningStatus] = useState<'idle' | 'running' | 'paused'>('idle')
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])

  // Mock screening results data
  const screeningResults = [
    {
      id: 1,
      candidate: {
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        title: 'Senior Frontend Developer',
        company: 'Google',
        location: 'San Francisco, CA',
        experience: '6 years'
      },
      aiScore: 94,
      status: 'recommended',
      screeningDate: '2024-01-15T10:30:00Z',
      processingTime: '2.3s',
      strengths: [
        'Strong React and TypeScript expertise',
        'Excellent problem-solving skills',
        'Leadership experience in previous roles',
        'Perfect cultural fit based on values assessment'
      ],
      concerns: [
        'Limited experience with our specific tech stack',
        'Salary expectations slightly above budget'
      ],
      skillsMatch: {
        technical: 92,
        soft: 89,
        cultural: 96,
        experience: 88
      },
      resumeAnalysis: {
        relevantExperience: 85,
        skillsAlignment: 92,
        careerProgression: 88,
        educationFit: 90
      },
      interviewRecommendation: 'Highly recommended for technical interview',
      nextSteps: [
        'Schedule technical interview',
        'Discuss salary expectations',
        'Reference check with previous manager'
      ]
    },
    {
      id: 2,
      candidate: {
        name: 'Marcus Johnson',
        email: 'marcus.johnson@email.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        title: 'Product Manager',
        company: 'Meta',
        location: 'New York, NY',
        experience: '8 years'
      },
      aiScore: 87,
      status: 'maybe',
      screeningDate: '2024-01-15T10:32:00Z',
      processingTime: '1.8s',
      strengths: [
        'Extensive product management experience',
        'Strong analytical and data-driven approach',
        'Proven track record of successful product launches',
        'Excellent communication skills'
      ],
      concerns: [
        'May be overqualified for the role',
        'Previous experience focused on B2C products',
        'Potential culture mismatch based on work style'
      ],
      skillsMatch: {
        technical: 78,
        soft: 94,
        cultural: 72,
        experience: 95
      },
      resumeAnalysis: {
        relevantExperience: 90,
        skillsAlignment: 78,
        careerProgression: 92,
        educationFit: 85
      },
      interviewRecommendation: 'Consider for cultural fit interview',
      nextSteps: [
        'Assess cultural fit',
        'Discuss role expectations',
        'Evaluate long-term commitment'
      ]
    },
    {
      id: 3,
      candidate: {
        name: 'Jennifer Liu',
        email: 'jennifer.liu@email.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        title: 'UX Designer',
        company: 'Airbnb',
        location: 'Austin, TX',
        experience: '4 years'
      },
      aiScore: 76,
      status: 'rejected',
      screeningDate: '2024-01-15T10:35:00Z',
      processingTime: '2.1s',
      strengths: [
        'Creative design approach',
        'Good understanding of user research',
        'Portfolio shows diverse projects'
      ],
      concerns: [
        'Limited experience with enterprise products',
        'Lacks specific industry knowledge',
        'Portfolio doesn\'t demonstrate required skills',
        'Experience level below requirements'
      ],
      skillsMatch: {
        technical: 65,
        soft: 78,
        cultural: 82,
        experience: 58
      },
      resumeAnalysis: {
        relevantExperience: 60,
        skillsAlignment: 68,
        careerProgression: 75,
        educationFit: 80
      },
      interviewRecommendation: 'Not recommended for current role',
      nextSteps: [
        'Consider for junior positions',
        'Keep in talent pool for future opportunities'
      ]
    }
  ]

  const screeningStats = {
    totalProcessed: 156,
    recommended: 23,
    maybe: 45,
    rejected: 88,
    averageScore: 78,
    processingTime: '1.8s',
    accuracy: 94
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommended':
        return 'bg-green-100 text-green-800'
      case 'maybe':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recommended':
        return <CheckCircle className="w-4 h-4" />
      case 'maybe':
        return <AlertCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <Bot className="w-7 h-7 mr-3 text-blue-600" />
            AI Screening
          </h2>
          <p className="text-slate-600 mt-1">
            Automated candidate evaluation and ranking powered by AI
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Start Screening
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Configure AI Screening</DialogTitle>
                <DialogDescription>
                  Set up screening criteria and parameters for AI evaluation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="job-role">Job Role</Label>
                    <Input id="job-role" placeholder="e.g. Senior Frontend Developer" />
                  </div>
                  <div>
                    <Label htmlFor="required-skills">Required Skills</Label>
                    <Textarea 
                      id="required-skills" 
                      placeholder="e.g. React, TypeScript, Node.js, 5+ years experience..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Minimum Score Threshold</Label>
                    <div className="mt-2">
                      <Slider defaultValue={[75]} max={100} min={0} step={5} />
                      <div className="flex justify-between text-sm text-slate-500 mt-1">
                        <span>0</span>
                        <span>75</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-reject" />
                    <Label htmlFor="auto-reject">Auto-reject candidates below threshold</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Start Screening
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Processed</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{screeningStats.totalProcessed}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Recommended</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{screeningStats.recommended}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Average Score</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{screeningStats.averageScore}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Accuracy</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{screeningStats.accuracy}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Screening Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Screening Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Screening Status
              </CardTitle>
              <CardDescription>
                Current AI screening progress and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${screeningStatus === 'running' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="font-medium">
                    {screeningStatus === 'running' ? 'Screening in Progress' : 'Ready to Screen'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {screeningStatus === 'running' ? (
                    <Button variant="outline" size="sm" onClick={() => setScreeningStatus('paused')}>
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => setScreeningStatus('running')}>
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>156/200 candidates</span>
                </div>
                <Progress value={78} className="w-full" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{screeningStats.recommended}</p>
                  <p className="text-sm text-slate-600">Recommended</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{screeningStats.maybe}</p>
                  <p className="text-sm text-slate-600">Maybe</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{screeningStats.rejected}</p>
                  <p className="text-sm text-slate-600">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Screening Activity</CardTitle>
              <CardDescription>Latest AI evaluations and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {screeningResults.slice(0, 3).map((result) => (
                  <div key={result.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={result.candidate.avatar} />
                      <AvatarFallback>
                        {result.candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{result.candidate.name}</p>
                          <p className="text-sm text-slate-600">{result.candidate.title}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(result.status)}>
                            {getStatusIcon(result.status)}
                            <span className="ml-1 capitalize">{result.status}</span>
                          </Badge>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${getScoreColor(result.aiScore)}`}>
                              {result.aiScore}
                            </p>
                            <p className="text-xs text-slate-500">AI Score</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input placeholder="Search candidates..." className="pl-10" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results List */}
          <div className="space-y-4">
            {screeningResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={result.candidate.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {result.candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{result.candidate.name}</h3>
                        <p className="text-slate-600">{result.candidate.title} at {result.candidate.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {result.candidate.location}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {result.candidate.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getScoreColor(result.aiScore)}`}>
                          {result.aiScore}
                        </p>
                        <p className="text-xs text-slate-500">AI Score</p>
                      </div>
                      <Badge className={getStatusColor(result.status)}>
                        {getStatusIcon(result.status)}
                        <span className="ml-1 capitalize">{result.status}</span>
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add to Pipeline
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Skills Match Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Technical</span>
                        <span>{result.skillsMatch.technical}%</span>
                      </div>
                      <Progress value={result.skillsMatch.technical} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soft Skills</span>
                        <span>{result.skillsMatch.soft}%</span>
                      </div>
                      <Progress value={result.skillsMatch.soft} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cultural</span>
                        <span>{result.skillsMatch.cultural}%</span>
                      </div>
                      <Progress value={result.skillsMatch.cultural} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Experience</span>
                        <span>{result.skillsMatch.experience}%</span>
                      </div>
                      <Progress value={result.skillsMatch.experience} className="h-2" />
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {result.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start">
                            <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 text-yellow-600" />
                        Concerns
                      </h4>
                      <ul className="space-y-1">
                        {result.concerns.map((concern, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start">
                            <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Recommendation & Next Steps */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">AI Recommendation:</p>
                      <p className="text-sm text-slate-600">{result.interviewRecommendation}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Full Report
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Move to Pipeline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Screening Performance</CardTitle>
                <CardDescription>AI accuracy and processing metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Accuracy Rate</span>
                    <span className="text-lg font-bold text-green-600">94%</span>
                  </div>
                  <Progress value={94} className="w-full" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Processing Speed</span>
                    <span className="text-lg font-bold text-blue-600">1.8s</span>
                  </div>
                  <Progress value={85} className="w-full" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">False Positives</span>
                    <span className="text-lg font-bold text-yellow-600">3%</span>
                  </div>
                  <Progress value={3} className="w-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Candidate score breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">90-100 (Excellent)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }} />
                      </div>
                      <span className="text-sm font-medium">23</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">80-89 (Good)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '29%' }} />
                      </div>
                      <span className="text-sm font-medium">45</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">70-79 (Average)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '35%' }} />
                      </div>
                      <span className="text-sm font-medium">54</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Below 70 (Poor)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '21%' }} />
                      </div>
                      <span className="text-sm font-medium">34</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AIScreening