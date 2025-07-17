import React, { useState } from 'react'
import { 
  Search, 
  Filter,
  Plus,
  MoreHorizontal,
  Star,
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  Download,
  Eye,
  MessageSquare,
  UserPlus,
  Archive,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  GraduationCap,
  Building,
  Users,
  Bot,
  Zap
} from 'lucide-react'
import AIScreening from '../components/AIScreening'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'

export default function Candidates() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [positionFilter, setPositionFilter] = useState('all')
  const [scoreFilter, setScoreFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('candidates')

  const candidates = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      score: 92,
      status: 'Technical Interview',
      stage: 'technical',
      appliedDate: '2024-01-15',
      location: 'San Francisco, CA',
      experience: '6 years',
      currentCompany: 'Google',
      education: 'Stanford University',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      salary: '$140k',
      notes: 'Strong technical background, excellent cultural fit. Previous experience with similar tech stack.',
      resumeUrl: '/resumes/sarah-chen.pdf',
      linkedinUrl: 'https://linkedin.com/in/sarahchen',
      source: 'LinkedIn'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      phone: '+1 (555) 234-5678',
      position: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      score: 88,
      status: 'Phone Screen',
      stage: 'phone',
      appliedDate: '2024-01-14',
      location: 'New York, NY',
      experience: '8 years',
      currentCompany: 'Meta',
      education: 'MIT',
      skills: ['Product Strategy', 'Data Analysis', 'Agile', 'User Research', 'SQL'],
      salary: '$160k',
      notes: 'Excellent product strategy background. Strong metrics-driven approach.',
      resumeUrl: '/resumes/marcus-johnson.pdf',
      linkedinUrl: 'https://linkedin.com/in/marcusjohnson',
      source: 'Referral'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      email: 'elena.r@email.com',
      phone: '+1 (555) 345-6789',
      position: 'UX Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      score: 85,
      status: 'AI Screening',
      stage: 'screening',
      appliedDate: '2024-01-13',
      location: 'Austin, TX',
      experience: '4 years',
      currentCompany: 'Airbnb',
      education: 'RISD',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
      salary: '$95k',
      notes: 'Great portfolio, strong design thinking. Needs to discuss timeline flexibility.',
      resumeUrl: '/resumes/elena-rodriguez.pdf',
      linkedinUrl: 'https://linkedin.com/in/elenarodriguez',
      source: 'Company Website'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 456-7890',
      position: 'Backend Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      score: 90,
      status: 'Final Interview',
      stage: 'final',
      appliedDate: '2024-01-12',
      location: 'Seattle, WA',
      experience: '5 years',
      currentCompany: 'Amazon',
      education: 'UC Berkeley',
      skills: ['Python', 'Go', 'Kubernetes', 'PostgreSQL', 'Microservices'],
      salary: '$125k',
      notes: 'Excellent system design skills. Strong background in distributed systems.',
      resumeUrl: '/resumes/david-kim.pdf',
      linkedinUrl: 'https://linkedin.com/in/davidkim',
      source: 'Indeed'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      email: 'lisa.wang@email.com',
      phone: '+1 (555) 567-8901',
      position: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      score: 87,
      status: 'Offer Extended',
      stage: 'offer',
      appliedDate: '2024-01-10',
      location: 'Boston, MA',
      experience: '3 years',
      currentCompany: 'Netflix',
      education: 'Harvard PhD',
      skills: ['Python', 'R', 'Machine Learning', 'Statistics', 'TensorFlow'],
      salary: '$110k',
      notes: 'PhD in Statistics, strong ML background. Excellent research experience.',
      resumeUrl: '/resumes/lisa-wang.pdf',
      linkedinUrl: 'https://linkedin.com/in/lisawang',
      source: 'Glassdoor'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      email: 'alex.t@email.com',
      phone: '+1 (555) 678-9012',
      position: 'DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      score: 89,
      status: 'Applied',
      stage: 'applied',
      appliedDate: '2024-01-16',
      location: 'Denver, CO',
      experience: '7 years',
      currentCompany: 'Spotify',
      education: 'Georgia Tech',
      skills: ['AWS', 'Docker', 'Terraform', 'Jenkins', 'Monitoring'],
      salary: '$130k',
      notes: 'Strong DevOps background at scale. Experience with cloud infrastructure.',
      resumeUrl: '/resumes/alex-thompson.pdf',
      linkedinUrl: 'https://linkedin.com/in/alexthompson',
      source: 'LinkedIn'
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
      case 'Applied':
        return 'bg-slate-100 text-slate-800'
      case 'AI Screening':
        return 'bg-blue-100 text-blue-800'
      case 'Phone Screen':
        return 'bg-yellow-100 text-yellow-800'
      case 'Technical Interview':
        return 'bg-purple-100 text-purple-800'
      case 'Final Interview':
        return 'bg-orange-100 text-orange-800'
      case 'Offer Extended':
        return 'bg-green-100 text-green-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || candidate.status.toLowerCase().includes(statusFilter.toLowerCase())
    const matchesPosition = positionFilter === 'all' || candidate.position.toLowerCase().includes(positionFilter.toLowerCase())
    const matchesScore = scoreFilter === 'all' || 
                        (scoreFilter === '90+' && candidate.score >= 90) ||
                        (scoreFilter === '80-89' && candidate.score >= 80 && candidate.score < 90) ||
                        (scoreFilter === '70-79' && candidate.score >= 70 && candidate.score < 80) ||
                        (scoreFilter === '<70' && candidate.score < 70)
    return matchesSearch && matchesStatus && matchesPosition && matchesScore
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Candidates</h1>
          <p className="text-slate-600 mt-1">Manage and track all your candidates in one place</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Bot className="w-4 h-4 mr-2" />
            AI Screen All
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
                <DialogTitle>Add New Candidate</DialogTitle>
                <DialogDescription>
                  Manually add a candidate to your database
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="john.doe@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <Input placeholder="e.g. Senior Developer" />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Add Candidate
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
                <p className="text-2xl font-bold text-slate-900 mt-1">{candidates.length}</p>
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
                <p className="text-sm font-medium text-slate-600">High Scores (90+)</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {candidates.filter(c => c.score >= 90).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">In Interview</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {candidates.filter(c => c.status.includes('Interview')).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Offers Extended</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {candidates.filter(c => c.status === 'Offer Extended').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="candidates">All Candidates</TabsTrigger>
          <TabsTrigger value="ai-screening">
            <Bot className="w-4 h-4 mr-2" />
            AI Screening
          </TabsTrigger>
        </TabsList>

        <TabsContent value="candidates" className="space-y-6">
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="screening">AI Screening</SelectItem>
                    <SelectItem value="phone">Phone Screen</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="final">Final Interview</SelectItem>
                    <SelectItem value="offer">Offer Extended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Position" />
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
                <Select value={scoreFilter} onValueChange={setScoreFilter}>
                  <SelectTrigger className="w-full md:w-32">
                    <SelectValue placeholder="Score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="90+">90+</SelectItem>
                    <SelectItem value="80-89">80-89</SelectItem>
                    <SelectItem value="70-79">70-79</SelectItem>
                    <SelectItem value="<70">&lt;70</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Candidates List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <CardDescription>{candidate.position}</CardDescription>
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
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Move to Pipeline
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bot className="w-4 h-4 mr-2" />
                          AI Screen
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status}
                    </Badge>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(candidate.score)}`}>
                      <Star className="w-3 h-3 inline mr-1" />
                      {candidate.score}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {candidate.phone}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {candidate.location}
                    </div>
                  </div>

                  {/* Experience & Education */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {candidate.experience} at {candidate.currentCompany}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {candidate.education}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Building className="w-4 h-4 mr-2" />
                      Source: {candidate.source}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {candidate.notes && (
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-600">
                        💭 {candidate.notes}
                      </p>
                    </div>
                  )}

                  {/* Application Details */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Applied {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                    <span>Expected: {candidate.salary}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredCandidates.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No candidates found</h3>
                <p className="text-slate-600 mb-4">
                  {searchQuery || statusFilter !== 'all' || positionFilter !== 'all' || scoreFilter !== 'all'
                    ? 'Try adjusting your filters to see more results.'
                    : 'Start by adding candidates or posting jobs to attract applications.'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && positionFilter === 'all' && scoreFilter === 'all' && (
                  <div className="flex justify-center space-x-3">
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Candidate
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Post a Job
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="ai-screening">
          <AIScreening candidates={candidates} />
        </TabsContent>
      </Tabs>
    </div>
  )
}