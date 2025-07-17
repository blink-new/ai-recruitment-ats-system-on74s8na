import React, { useState } from 'react'
import { 
  Search, 
  Filter,
  Plus,
  MoreHorizontal,
  MapPin,
  Briefcase,
  GraduationCap,
  Building,
  Mail,
  MessageSquare,
  UserPlus,
  Star,
  Eye,
  Download,
  RefreshCw,
  Zap,
  Target,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Linkedin,
  Globe,
  Phone,
  Calendar,
  Bookmark,
  Send,
  Bot,
  DollarSign,
  Edit
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
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
import { Slider } from '../components/ui/slider'
import { Switch } from '../components/ui/switch'
import { Checkbox } from '../components/ui/checkbox'

export default function Sourcing() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [experienceRange, setExperienceRange] = useState([3, 8])
  const [salaryRange, setSalaryRange] = useState([80, 150])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [activeTab, setActiveTab] = useState('search')

  const sourcingProfiles = [
    {
      id: 1,
      name: 'Alexandra Chen',
      title: 'Senior Frontend Developer',
      company: 'Google',
      location: 'San Francisco, CA',
      experience: '6 years',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
      education: 'Stanford University - MS Computer Science',
      currentSalary: '$145k',
      openToWork: true,
      lastActive: '2 days ago',
      connections: 847,
      profileViews: 1234,
      linkedinUrl: 'https://linkedin.com/in/alexandrachen',
      email: 'alexandra.chen@email.com',
      phone: '+1 (555) 123-4567',
      summary: 'Passionate frontend developer with 6+ years of experience building scalable web applications. Led multiple high-impact projects at Google, focusing on user experience and performance optimization.',
      aiScore: 94,
      matchReasons: [
        'Strong React and TypeScript experience',
        'Previous experience at top tech companies',
        'Located in target geography',
        'Open to new opportunities'
      ],
      source: 'LinkedIn',
      contacted: false,
      saved: true,
      responseRate: 85
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'Product Manager',
      company: 'Meta',
      location: 'New York, NY',
      experience: '8 years',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      skills: ['Product Strategy', 'Data Analysis', 'Agile', 'User Research', 'SQL', 'A/B Testing'],
      education: 'MIT - MBA, UC Berkeley - BS Engineering',
      currentSalary: '$165k',
      openToWork: false,
      lastActive: '1 week ago',
      connections: 1205,
      profileViews: 2156,
      linkedinUrl: 'https://linkedin.com/in/marcusrodriguez',
      email: 'marcus.rodriguez@email.com',
      phone: '+1 (555) 234-5678',
      summary: 'Strategic product manager with a track record of launching successful products that serve millions of users. Expert in data-driven decision making and cross-functional team leadership.',
      aiScore: 91,
      matchReasons: [
        'Extensive product management experience',
        'Strong analytical background',
        'Experience with large-scale products',
        'Leadership experience'
      ],
      source: 'LinkedIn',
      contacted: true,
      saved: false,
      responseRate: 72
    },
    {
      id: 3,
      name: 'Sarah Kim',
      title: 'UX Designer',
      company: 'Airbnb',
      location: 'Austin, TX',
      experience: '4 years',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing', 'Sketch'],
      education: 'RISD - MFA Design, UCLA - BA Psychology',
      currentSalary: '$98k',
      openToWork: true,
      lastActive: '3 days ago',
      connections: 623,
      profileViews: 892,
      linkedinUrl: 'https://linkedin.com/in/sarahkim',
      email: 'sarah.kim@email.com',
      phone: '+1 (555) 345-6789',
      summary: 'Creative UX designer passionate about creating intuitive and delightful user experiences. Specialized in design systems and user research methodologies.',
      aiScore: 88,
      matchReasons: [
        'Strong design portfolio',
        'Experience with design systems',
        'User research expertise',
        'Currently open to opportunities'
      ],
      source: 'Behance',
      contacted: false,
      saved: true,
      responseRate: 78
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'Backend Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      experience: '5 years',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      skills: ['Python', 'Go', 'Kubernetes', 'PostgreSQL', 'Microservices', 'Redis'],
      education: 'UC Berkeley - BS Computer Science',
      currentSalary: '$128k',
      openToWork: false,
      lastActive: '5 days ago',
      connections: 456,
      profileViews: 678,
      linkedinUrl: 'https://linkedin.com/in/davidthompson',
      email: 'david.thompson@email.com',
      phone: '+1 (555) 456-7890',
      summary: 'Backend engineer with expertise in distributed systems and microservices architecture. Built and scaled systems serving millions of requests per day.',
      aiScore: 89,
      matchReasons: [
        'Strong backend development skills',
        'Experience with scalable systems',
        'Relevant technology stack',
        'Previous experience at Amazon'
      ],
      source: 'GitHub',
      contacted: true,
      saved: false,
      responseRate: 65
    },
    {
      id: 5,
      name: 'Lisa Wang',
      title: 'Data Scientist',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      experience: '3 years',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      skills: ['Python', 'R', 'Machine Learning', 'Statistics', 'TensorFlow', 'Spark'],
      education: 'Harvard - PhD Statistics, Stanford - MS Mathematics',
      currentSalary: '$115k',
      openToWork: true,
      lastActive: '1 day ago',
      connections: 789,
      profileViews: 1456,
      linkedinUrl: 'https://linkedin.com/in/lisawang',
      email: 'lisa.wang@email.com',
      phone: '+1 (555) 567-8901',
      summary: 'Data scientist with a PhD in Statistics and extensive experience in machine learning and predictive modeling. Passionate about turning data into actionable insights.',
      aiScore: 92,
      matchReasons: [
        'PhD in relevant field',
        'Strong ML background',
        'Experience at top tech company',
        'Open to new opportunities'
      ],
      source: 'Kaggle',
      contacted: false,
      saved: true,
      responseRate: 88
    },
    {
      id: 6,
      name: 'Alex Johnson',
      title: 'DevOps Engineer',
      company: 'Spotify',
      location: 'Denver, CO',
      experience: '7 years',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      skills: ['AWS', 'Docker', 'Terraform', 'Jenkins', 'Monitoring', 'Kubernetes'],
      education: 'Georgia Tech - MS Computer Science',
      currentSalary: '$135k',
      openToWork: false,
      lastActive: '1 week ago',
      connections: 934,
      profileViews: 1123,
      linkedinUrl: 'https://linkedin.com/in/alexjohnson',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 678-9012',
      summary: 'DevOps engineer with 7+ years of experience building and maintaining cloud infrastructure. Expert in automation, monitoring, and scalable deployment strategies.',
      aiScore: 87,
      matchReasons: [
        'Extensive DevOps experience',
        'Strong cloud infrastructure skills',
        'Experience with automation tools',
        'Previous experience at Spotify'
      ],
      source: 'Stack Overflow',
      contacted: true,
      saved: false,
      responseRate: 71
    }
  ]

  const campaigns = [
    {
      id: 1,
      name: 'Senior Frontend Developers - Q1 2024',
      status: 'Active',
      sent: 45,
      responses: 12,
      responseRate: 27,
      hired: 2,
      created: '2024-01-10',
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Product Managers - Growth Team',
      status: 'Paused',
      sent: 23,
      responses: 8,
      responseRate: 35,
      hired: 1,
      created: '2024-01-08',
      lastActivity: '3 days ago'
    },
    {
      id: 3,
      name: 'UX Designers - Design System',
      status: 'Draft',
      sent: 0,
      responses: 0,
      responseRate: 0,
      hired: 0,
      created: '2024-01-15',
      lastActivity: '1 day ago'
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
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredProfiles = sourcingProfiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         profile.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLocation = !locationFilter || profile.location.toLowerCase().includes(locationFilter.toLowerCase())
    const experienceYears = parseInt(profile.experience)
    const matchesExperience = experienceYears >= experienceRange[0] && experienceYears <= experienceRange[1]
    const salary = parseInt(profile.currentSalary.replace(/[^0-9]/g, ''))
    const matchesSalary = salary >= salaryRange[0] * 1000 && salary <= salaryRange[1] * 1000
    const matchesRemote = !remoteOnly || profile.openToWork
    
    return matchesSearch && matchesLocation && matchesExperience && matchesSalary && matchesRemote
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sourcing</h1>
          <p className="text-slate-600 mt-1">Find and engage with top talent using AI-powered sourcing</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Leads
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Sourcing Campaign</DialogTitle>
                <DialogDescription>
                  Set up an automated outreach campaign to engage with potential candidates
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Campaign Name</Label>
                  <Input id="campaign-name" placeholder="e.g. Senior Frontend Developers - Q1 2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-role">Target Role</Label>
                  <Input id="target-role" placeholder="e.g. Senior Frontend Developer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message-template">Message Template</Label>
                  <Textarea 
                    id="message-template" 
                    placeholder="Hi {name}, I came across your profile and was impressed by your experience at {company}..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Save as Draft</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Create Campaign
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
                <p className="text-sm font-medium text-slate-600">Profiles Found</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{filteredProfiles.length}</p>
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
                <p className="text-sm font-medium text-slate-600">Contacted</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {sourcingProfiles.filter(p => p.contacted).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Response Rate</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {Math.round(sourcingProfiles.reduce((sum, p) => sum + p.responseRate, 0) / sourcingProfiles.length)}%
                </p>
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
                <p className="text-sm font-medium text-slate-600">Saved Profiles</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {sourcingProfiles.filter(p => p.saved).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Search & Filter</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="saved">Saved Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {/* LinkedIn-Style Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2 text-blue-600" />
                AI-Powered LinkedIn-Style Sourcing
              </CardTitle>
              <CardDescription>
                Advanced candidate discovery with AI matching and automated outreach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Keywords & Skills</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="search"
                        placeholder="e.g. React, TypeScript, Senior Developer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="location"
                        placeholder="e.g. San Francisco, New York, Remote..."
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Experience Level ({experienceRange[0]} - {experienceRange[1]} years)</Label>
                    <Slider
                      value={experienceRange}
                      onValueChange={setExperienceRange}
                      max={15}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Salary Range (${salaryRange[0]}k - ${salaryRange[1]}k)</Label>
                    <Slider
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      max={300}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="remote-only"
                      checked={remoteOnly}
                      onCheckedChange={setRemoteOnly}
                    />
                    <Label htmlFor="remote-only">Open to work only</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Company Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup (1-50)</SelectItem>
                        <SelectItem value="small">Small (51-200)</SelectItem>
                        <SelectItem value="medium">Medium (201-1000)</SelectItem>
                        <SelectItem value="large">Large (1000+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Bot className="w-4 h-4" />
                  <span>AI-powered matching enabled</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Filters
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Search className="w-4 h-4 mr-2" />
                    Search Profiles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{profile.name}</CardTitle>
                        <CardDescription>{profile.title} at {profile.company}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(profile.aiScore)}`}>
                        <Star className="w-3 h-3 inline mr-1" />
                        {profile.aiScore}
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
                            View Full Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add to Pipeline
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bookmark className="w-4 h-4 mr-2" />
                            {profile.saved ? 'Remove from Saved' : 'Save Profile'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mt-2">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {profile.experience}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {profile.currentSalary}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status Indicators */}
                  <div className="flex items-center space-x-2">
                    {profile.openToWork && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Open to Work
                      </Badge>
                    )}
                    {profile.contacted && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Mail className="w-3 h-3 mr-1" />
                        Contacted
                      </Badge>
                    )}
                    {profile.saved && (
                      <Badge className="bg-purple-100 text-purple-800">
                        <Bookmark className="w-3 h-3 mr-1" />
                        Saved
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {profile.source}
                    </Badge>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-600 line-clamp-2">{profile.summary}</p>

                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">Top Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {profile.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{profile.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Education & Experience */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-slate-600">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {profile.education}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Building className="w-4 h-4 mr-2" />
                      {profile.company} • {profile.connections} connections
                    </div>
                  </div>

                  {/* AI Match Reasons */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-blue-800 mb-2">
                      🤖 AI Match Insights
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      {profile.matchReasons.slice(0, 2).map((reason, index) => (
                        <li key={index}>• {reason}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Profile Stats */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Last active: {profile.lastActive}</span>
                    <span>Response rate: {profile.responseRate}%</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProfiles.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No profiles found</h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search criteria or filters to find more candidates.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Search
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          {/* Campaigns List */}
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{campaign.name}</h3>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-2xl font-bold text-slate-900">{campaign.sent}</p>
                          <p className="text-sm text-slate-600">Sent</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-2xl font-bold text-slate-900">{campaign.responses}</p>
                          <p className="text-sm text-slate-600">Responses</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-2xl font-bold text-slate-900">{campaign.responseRate}%</p>
                          <p className="text-sm text-slate-600">Response Rate</p>
                        </div>
                        <div className="text-center p-3 bg-slate-50 rounded-lg">
                          <p className="text-2xl font-bold text-slate-900">{campaign.hired}</p>
                          <p className="text-sm text-slate-600">Hired</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
                        <span>Created {new Date(campaign.created).toLocaleDateString()}</span>
                        <span>Last activity: {campaign.lastActivity}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-6">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          {/* Saved Profiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sourcingProfiles.filter(p => p.saved).map((profile) => (
              <Card key={profile.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{profile.name}</CardTitle>
                        <CardDescription>{profile.title} at {profile.company}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}