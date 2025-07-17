import React, { useState } from 'react'
import { 
  Search, 
  Plus,
  MoreHorizontal,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Users,
  Eye,
  Edit,
  Copy,
  Archive,
  Share2,
  Clock,
  Building,
  Filter,
  Download,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
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

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'Active',
      postedDate: '2024-01-10',
      applications: 45,
      views: 234,
      salary: '$120k - $160k',
      description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building user-facing features using React, TypeScript, and modern web technologies.',
      requirements: [
        '5+ years of React experience',
        'Strong TypeScript skills',
        'Experience with modern build tools',
        'Knowledge of testing frameworks'
      ],
      benefits: [
        'Health, dental, and vision insurance',
        'Flexible work arrangements',
        '401(k) matching',
        'Professional development budget'
      ],
      urgency: 'high',
      remote: true,
      experienceLevel: 'Senior',
      hiringManager: 'Sarah Johnson',
      budget: 160000,
      deadline: '2024-02-15'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'Active',
      postedDate: '2024-01-08',
      applications: 67,
      views: 412,
      salary: '$130k - $180k',
      description: 'Join our product team to drive the vision and strategy for our core platform. You will work closely with engineering, design, and business stakeholders.',
      requirements: [
        '3+ years of product management experience',
        'Strong analytical skills',
        'Experience with agile methodologies',
        'Excellent communication skills'
      ],
      benefits: [
        'Comprehensive health coverage',
        'Stock options',
        'Unlimited PTO',
        'Learning and development stipend'
      ],
      urgency: 'medium',
      remote: false,
      experienceLevel: 'Mid-Senior',
      hiringManager: 'Michael Chen',
      budget: 180000,
      deadline: '2024-02-20'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'Austin, TX',
      type: 'Full-time',
      status: 'Draft',
      postedDate: '2024-01-12',
      applications: 0,
      views: 0,
      salary: '$80k - $120k',
      description: 'We are seeking a talented UX Designer to create intuitive and engaging user experiences for our digital products.',
      requirements: [
        '3+ years of UX design experience',
        'Proficiency in Figma and design systems',
        'Strong portfolio demonstrating user-centered design',
        'Experience with user research and testing'
      ],
      benefits: [
        'Health and wellness benefits',
        'Flexible working hours',
        'Creative workspace',
        'Design conference attendance'
      ],
      urgency: 'low',
      remote: true,
      experienceLevel: 'Mid-level',
      hiringManager: 'Lisa Wang',
      budget: 120000,
      deadline: '2024-03-01'
    },
    {
      id: 4,
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Seattle, WA',
      type: 'Full-time',
      status: 'Paused',
      postedDate: '2024-01-05',
      applications: 23,
      views: 156,
      salary: '$110k - $150k',
      description: 'Looking for a Backend Engineer to build scalable systems and APIs that power our platform.',
      requirements: [
        '4+ years of backend development experience',
        'Strong knowledge of Python or Go',
        'Experience with cloud platforms (AWS/GCP)',
        'Database design and optimization skills'
      ],
      benefits: [
        'Competitive salary and equity',
        'Remote-first culture',
        'Health and dental coverage',
        'Professional growth opportunities'
      ],
      urgency: 'medium',
      remote: true,
      experienceLevel: 'Senior',
      hiringManager: 'David Kim',
      budget: 150000,
      deadline: '2024-02-28'
    },
    {
      id: 5,
      title: 'Data Scientist',
      department: 'Data',
      location: 'Boston, MA',
      type: 'Full-time',
      status: 'Closed',
      postedDate: '2024-01-01',
      applications: 89,
      views: 567,
      salary: '$100k - $140k',
      description: 'Join our data team to extract insights from large datasets and build machine learning models.',
      requirements: [
        'PhD or Masters in relevant field',
        'Strong Python and R skills',
        'Experience with ML frameworks',
        'Statistical analysis expertise'
      ],
      benefits: [
        'Research-focused environment',
        'Conference and publication support',
        'Flexible schedule',
        'Cutting-edge tools and resources'
      ],
      urgency: 'low',
      remote: false,
      experienceLevel: 'Senior',
      hiringManager: 'Alex Thompson',
      budget: 140000,
      deadline: '2024-01-31'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Denver, CO',
      type: 'Contract',
      status: 'Active',
      postedDate: '2024-01-14',
      applications: 31,
      views: 198,
      salary: '$90k - $130k',
      description: 'We need a DevOps Engineer to help us scale our infrastructure and improve our deployment processes.',
      requirements: [
        '3+ years of DevOps experience',
        'Strong knowledge of Docker and Kubernetes',
        'Experience with CI/CD pipelines',
        'Cloud infrastructure management'
      ],
      benefits: [
        'Flexible contract terms',
        'Remote work options',
        'Competitive hourly rate',
        'Opportunity for full-time conversion'
      ],
      urgency: 'high',
      remote: true,
      experienceLevel: 'Mid-Senior',
      hiringManager: 'Emma Davis',
      budget: 130000,
      deadline: '2024-02-10'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'Paused':
        return 'bg-orange-100 text-orange-800'
      case 'Closed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Zap className="w-4 h-4" />
      case 'medium':
        return <AlertCircle className="w-4 h-4" />
      case 'low':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesDepartment = departmentFilter === 'all' || job.department.toLowerCase() === departmentFilter.toLowerCase()
    const matchesLocation = locationFilter === 'all' || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    return matchesSearch && matchesStatus && matchesDepartment && matchesLocation
  })

  const activeJobs = jobs.filter(job => job.status === 'Active').length
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0)
  const totalViews = jobs.reduce((sum, job) => sum + job.views, 0)
  const avgApplicationsPerJob = totalApplications / jobs.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Jobs</h1>
          <p className="text-slate-600 mt-1">Create and manage job postings to attract top talent</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Job Posting</DialogTitle>
                <DialogDescription>
                  Fill out the details below to create a new job posting
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g. Senior Frontend Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="data">Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. San Francisco, CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Employment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead/Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary-min">Salary Range</Label>
                    <div className="flex space-x-2">
                      <Input id="salary-min" placeholder="Min (e.g. 80000)" />
                      <Input placeholder="Max (e.g. 120000)" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="List the required skills, experience, and qualifications..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits & Perks</Label>
                  <Textarea 
                    id="benefits" 
                    placeholder="Describe the benefits, perks, and company culture..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Save as Draft</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Publish Job
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
                <p className="text-sm font-medium text-slate-600">Active Jobs</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{activeJobs}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Applications</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{totalApplications}</p>
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
                <p className="text-sm font-medium text-slate-600">Total Views</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Applications</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{avgApplicationsPerJob.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
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
                  placeholder="Search jobs, departments, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="data">Data</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="austin">Austin</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
                <SelectItem value="boston">Boston</SelectItem>
                <SelectItem value="denver">Denver</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        <div className={`flex items-center space-x-1 ${getUrgencyColor(job.urgency)}`}>
                          {getUrgencyIcon(job.urgency)}
                          <span className="text-sm font-medium capitalize">{job.urgency} Priority</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                        {job.remote && (
                          <Badge variant="outline" className="text-xs">
                            Remote OK
                          </Badge>
                        )}
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
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Job
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-slate-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-slate-700">Applications</span>
                      </div>
                      <span className="text-lg font-bold text-slate-900">{job.applications}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                        <Eye className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-slate-700">Views</span>
                      </div>
                      <span className="text-lg font-bold text-slate-900">{job.views}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-slate-700">Deadline</span>
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Hiring Manager: {job.hiringManager}</span>
                      <span>•</span>
                      <span>Budget: ${job.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Users className="w-4 h-4 mr-1" />
                        View Applications
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No jobs found</h3>
            <p className="text-slate-600 mb-4">
              {searchQuery || statusFilter !== 'all' || departmentFilter !== 'all' || locationFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'Start by creating your first job posting to attract candidates.'
              }
            </p>
            {!searchQuery && statusFilter === 'all' && departmentFilter === 'all' && locationFilter === 'all' && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Job
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}