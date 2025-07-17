import React, { useState } from 'react'
import { 
  Plus,
  MoreHorizontal,
  User,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Mail,
  Phone,
  MessageSquare,
  Eye,
  Edit,
  Archive,
  Filter,
  Search,
  Users,
  TrendingUp,
  Target,
  Award,
  Briefcase,
  MapPin,
  Building,
  GraduationCap,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'

export default function Pipeline() {
  const [searchQuery, setSearchQuery] = useState('')
  const [jobFilter, setJobFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')

  const pipelineStages = [
    {
      id: 'applied',
      name: 'Applied',
      color: 'bg-slate-100 text-slate-800',
      count: 12
    },
    {
      id: 'screening',
      name: 'AI Screening',
      color: 'bg-blue-100 text-blue-800',
      count: 8
    },
    {
      id: 'phone',
      name: 'Phone Screen',
      color: 'bg-yellow-100 text-yellow-800',
      count: 5
    },
    {
      id: 'technical',
      name: 'Technical Interview',
      color: 'bg-purple-100 text-purple-800',
      count: 4
    },
    {
      id: 'final',
      name: 'Final Interview',
      color: 'bg-orange-100 text-orange-800',
      count: 3
    },
    {
      id: 'offer',
      name: 'Offer',
      color: 'bg-green-100 text-green-800',
      count: 2
    },
    {
      id: 'hired',
      name: 'Hired',
      color: 'bg-emerald-100 text-emerald-800',
      count: 1
    }
  ]

  const candidates = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      score: 92,
      stage: 'technical',
      appliedDate: '2024-01-15',
      location: 'San Francisco, CA',
      experience: '6 years',
      currentCompany: 'Google',
      education: 'Stanford University',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      salary: '$140k',
      notes: 'Strong technical background, excellent cultural fit.',
      nextStep: 'Technical interview scheduled for Jan 20',
      priority: 'high',
      source: 'LinkedIn',
      lastActivity: '2 hours ago',
      interviewer: 'John Smith',
      interviewDate: '2024-01-20',
      feedback: 'Excellent problem-solving skills, great communication'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      phone: '+1 (555) 234-5678',
      position: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      score: 88,
      stage: 'phone',
      appliedDate: '2024-01-14',
      location: 'New York, NY',
      experience: '8 years',
      currentCompany: 'Meta',
      education: 'MIT',
      skills: ['Product Strategy', 'Data Analysis', 'Agile'],
      salary: '$160k',
      notes: 'Excellent product strategy background.',
      nextStep: 'Phone screen with hiring manager',
      priority: 'medium',
      source: 'Referral',
      lastActivity: '1 day ago',
      interviewer: 'Sarah Wilson',
      interviewDate: '2024-01-18',
      feedback: 'Strong strategic thinking, needs to discuss timeline'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      email: 'elena.r@email.com',
      phone: '+1 (555) 345-6789',
      position: 'UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      score: 85,
      stage: 'screening',
      appliedDate: '2024-01-13',
      location: 'Austin, TX',
      experience: '4 years',
      currentCompany: 'Airbnb',
      education: 'RISD',
      skills: ['Figma', 'User Research', 'Prototyping'],
      salary: '$95k',
      notes: 'Great portfolio, strong design thinking.',
      nextStep: 'AI screening in progress',
      priority: 'medium',
      source: 'Company Website',
      lastActivity: '3 hours ago',
      interviewer: null,
      interviewDate: null,
      feedback: 'Portfolio review shows strong design skills'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 456-7890',
      position: 'Backend Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      score: 90,
      stage: 'final',
      appliedDate: '2024-01-12',
      location: 'Seattle, WA',
      experience: '5 years',
      currentCompany: 'Amazon',
      education: 'UC Berkeley',
      skills: ['Python', 'Go', 'Kubernetes', 'PostgreSQL'],
      salary: '$125k',
      notes: 'Excellent system design skills.',
      nextStep: 'Final interview with CTO',
      priority: 'high',
      source: 'Indeed',
      lastActivity: '30 minutes ago',
      interviewer: 'Mike Chen',
      interviewDate: '2024-01-22',
      feedback: 'Strong technical skills, good culture fit'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      phone: '+1 (555) 567-8901',
      position: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      score: 87,
      stage: 'offer',
      appliedDate: '2024-01-10',
      location: 'Boston, MA',
      experience: '3 years',
      currentCompany: 'Netflix',
      education: 'Harvard PhD',
      skills: ['Python', 'R', 'Machine Learning', 'Statistics'],
      salary: '$110k',
      notes: 'PhD in Statistics, strong ML background.',
      nextStep: 'Offer extended, awaiting response',
      priority: 'high',
      source: 'Glassdoor',
      lastActivity: '1 hour ago',
      interviewer: 'Anna Davis',
      interviewDate: '2024-01-19',
      feedback: 'Exceptional technical knowledge, great fit for the team'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      email: 'alex.t@email.com',
      phone: '+1 (555) 678-9012',
      position: 'DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      score: 89,
      stage: 'applied',
      appliedDate: '2024-01-16',
      location: 'Denver, CO',
      experience: '7 years',
      currentCompany: 'Spotify',
      education: 'Georgia Tech',
      skills: ['AWS', 'Docker', 'Terraform', 'Jenkins'],
      salary: '$130k',
      notes: 'Strong DevOps background at scale.',
      nextStep: 'Initial review pending',
      priority: 'medium',
      source: 'LinkedIn',
      lastActivity: '4 hours ago',
      interviewer: null,
      interviewDate: null,
      feedback: null
    },
    {
      id: 7,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 789-0123',
      position: 'Senior Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
      score: 91,
      stage: 'hired',
      appliedDate: '2024-01-05',
      location: 'Los Angeles, CA',
      experience: '7 years',
      currentCompany: 'Adobe',
      education: 'UCLA',
      skills: ['React', 'Vue.js', 'TypeScript', 'CSS'],
      salary: '$145k',
      notes: 'Exceptional frontend skills, great team player.',
      nextStep: 'Onboarding scheduled',
      priority: 'high',
      source: 'Employee Referral',
      lastActivity: '2 days ago',
      interviewer: 'Tom Wilson',
      interviewDate: '2024-01-17',
      feedback: 'Outstanding candidate, perfect fit for the role'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />
      case 'medium':
        return <Clock className="w-4 h-4" />
      case 'low':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 80) return 'text-blue-600 bg-blue-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesJob = jobFilter === 'all' || candidate.position.toLowerCase().includes(jobFilter.toLowerCase())
    const matchesStage = stageFilter === 'all' || candidate.stage === stageFilter
    return matchesSearch && matchesJob && matchesStage
  })

  const getCandidatesByStage = (stageId: string) => {
    return filteredCandidates.filter(candidate => candidate.stage === stageId)
  }

  const totalCandidates = candidates.length
  const conversionRate = Math.round((candidates.filter(c => c.stage === 'hired').length / totalCandidates) * 100)
  const avgTimeToHire = '18 days'
  const activeInterviews = candidates.filter(c => c.interviewDate && new Date(c.interviewDate) >= new Date()).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pipeline</h1>
          <p className="text-slate-600 mt-1">Track candidates through your hiring process</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Candidate to Pipeline</DialogTitle>
                <DialogDescription>
                  Add a new candidate directly to your hiring pipeline
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="john.doe@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="e.g. Senior Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stage">Initial Stage</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {pipelineStages.map((stage) => (
                          <SelectItem key={stage.id} value={stage.id}>
                            {stage.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add any relevant notes about this candidate..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Add to Pipeline
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
                <p className="text-sm font-medium text-slate-600">Total Candidates</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{totalCandidates}</p>
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
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{conversionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Time to Hire</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{avgTimeToHire}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Interviews</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{activeInterviews}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search candidates, positions, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Job Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="frontend">Frontend Developer</SelectItem>
                <SelectItem value="backend">Backend Engineer</SelectItem>
                <SelectItem value="product">Product Manager</SelectItem>
                <SelectItem value="designer">UX Designer</SelectItem>
                <SelectItem value="data">Data Scientist</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {pipelineStages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.id}>
                    {stage.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Kanban Board */}
      <div className="overflow-x-auto">
        <div className="flex space-x-6 pb-6" style={{ minWidth: '1400px' }}>
          {pipelineStages.map((stage) => {
            const stageCandidates = getCandidatesByStage(stage.id)
            return (
              <div key={stage.id} className="flex-shrink-0 w-80">
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={stage.color}>
                          {stage.name}
                        </Badge>
                        <span className="text-sm font-medium text-slate-600">
                          {stageCandidates.length}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                    {stageCandidates.map((candidate) => (
                      <Card key={candidate.id} className="hover:shadow-md transition-shadow cursor-move">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={candidate.avatar} />
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {candidate.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-slate-900">{candidate.name}</h4>
                                <p className="text-sm text-slate-600">{candidate.position}</p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Schedule Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex items-center space-x-2 mb-3">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(candidate.score)}`}>
                              <Star className="w-3 h-3 inline mr-1" />
                              {candidate.score}
                            </div>
                            <div className={`flex items-center space-x-1 ${getPriorityColor(candidate.priority)}`}>
                              {getPriorityIcon(candidate.priority)}
                              <span className="text-xs font-medium capitalize">{candidate.priority}</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs text-slate-600">
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {candidate.location}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="w-3 h-3 mr-1" />
                              {candidate.experience} at {candidate.currentCompany}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-3 h-3 mr-1" />
                              {candidate.salary}
                            </div>
                          </div>

                          {candidate.nextStep && (
                            <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                              <p className="font-medium text-blue-800">Next Step:</p>
                              <p className="text-blue-700">{candidate.nextStep}</p>
                            </div>
                          )}

                          {candidate.interviewDate && (
                            <div className="mt-2 flex items-center text-xs text-slate-600">
                              <Calendar className="w-3 h-3 mr-1" />
                              Interview: {new Date(candidate.interviewDate).toLocaleDateString()}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                            <span className="text-xs text-slate-500">
                              {candidate.lastActivity}
                            </span>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <Mail className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <Phone className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <MessageSquare className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {stageCandidates.length === 0 && (
                      <div className="text-center py-8 text-slate-400">
                        <User className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">No candidates in this stage</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common actions to manage your pipeline efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span className="font-medium">Schedule Interviews</span>
              <span className="text-xs text-slate-600">Bulk schedule for multiple candidates</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Mail className="w-6 h-6 text-green-600" />
              <span className="font-medium">Send Updates</span>
              <span className="text-xs text-slate-600">Notify candidates about their status</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Award className="w-6 h-6 text-purple-600" />
              <span className="font-medium">Generate Offers</span>
              <span className="text-xs text-slate-600">Create offer letters for finalists</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}