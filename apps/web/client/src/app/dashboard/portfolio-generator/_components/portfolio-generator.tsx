'use client';

import { useState } from 'react';
import { Button } from '@onlook/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@onlook/ui/card';
import { Input } from '@onlook/ui/input';
import { Label } from '@onlook/ui/label';
import { Textarea } from '@onlook/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@onlook/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { Badge } from '@onlook/ui/badge';
import { 
    Palette, 
    Eye, 
    Download, 
    Upload, 
    Plus,
    Trash2,
    Edit,
    ExternalLink,
    Github,
    Globe,
    Briefcase,
    User,
    Star,
    Image,
    Code,
    Zap,
    Monitor,
    Smartphone,
    Tablet
} from 'lucide-react';

interface PortfolioData {
    personal: {
        name: string;
        title: string;
        bio: string;
        email: string;
        phone: string;
        location: string;
        avatar: string;
    };
    projects: Array<{
        id: string;
        title: string;
        description: string;
        image: string;
        technologies: string[];
        liveUrl: string;
        githubUrl: string;
        featured: boolean;
    }>;
    skills: Array<{
        name: string;
        level: number;
        category: string;
    }>;
    experience: Array<{
        company: string;
        position: string;
        duration: string;
        description: string;
    }>;
}

interface Theme {
    id: string;
    name: string;
    preview: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    style: 'modern' | 'minimalist' | 'creative' | 'corporate';
}

export function PortfolioGenerator() {
    const [activeTab, setActiveTab] = useState('personal');
    const [selectedTheme, setSelectedTheme] = useState('modern-dark');
    const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const [portfolioData, setPortfolioData] = useState<PortfolioData>({
        personal: {
            name: 'John Doe',
            title: 'Full Stack Developer',
            bio: 'Passionate developer with 5+ years of experience building web applications with modern technologies.',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            avatar: ''
        },
        projects: [
            {
                id: '1',
                title: 'E-commerce Platform',
                description: 'Full-featured e-commerce platform built with React, Node.js, and PostgreSQL',
                image: '',
                technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
                liveUrl: 'https://example.com',
                githubUrl: 'https://github.com/johndoe/ecommerce',
                featured: true
            },
            {
                id: '2',
                title: 'Task Management App',
                description: 'Collaborative task management application with real-time updates',
                image: '',
                technologies: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
                liveUrl: 'https://tasks.example.com',
                githubUrl: 'https://github.com/johndoe/tasks',
                featured: false
            }
        ],
        skills: [
            { name: 'JavaScript', level: 95, category: 'Frontend' },
            { name: 'React', level: 90, category: 'Frontend' },
            { name: 'Node.js', level: 85, category: 'Backend' },
            { name: 'Python', level: 80, category: 'Backend' },
            { name: 'PostgreSQL', level: 75, category: 'Database' },
            { name: 'AWS', level: 70, category: 'DevOps' }
        ],
        experience: [
            {
                company: 'Tech Startup Inc.',
                position: 'Senior Full Stack Developer',
                duration: '2022 - Present',
                description: 'Lead development of web applications using React and Node.js'
            },
            {
                company: 'Digital Agency',
                position: 'Frontend Developer',
                duration: '2020 - 2022',
                description: 'Developed responsive websites and web applications for various clients'
            }
        ]
    });

    const themes: Theme[] = [
        {
            id: 'modern-dark',
            name: 'Modern Dark',
            preview: '/themes/modern-dark.jpg',
            colors: {
                primary: '#3B82F6',
                secondary: '#1F2937',
                accent: '#10B981',
                background: '#111827'
            },
            style: 'modern'
        },
        {
            id: 'minimalist-light',
            name: 'Minimalist Light',
            preview: '/themes/minimal-light.jpg',
            colors: {
                primary: '#6366F1',
                secondary: '#F9FAFB',
                accent: '#EF4444',
                background: '#FFFFFF'
            },
            style: 'minimalist'
        },
        {
            id: 'creative-gradient',
            name: 'Creative Gradient',
            preview: '/themes/creative-gradient.jpg',
            colors: {
                primary: '#8B5CF6',
                secondary: '#EC4899',
                accent: '#F59E0B',
                background: '#1E1B4B'
            },
            style: 'creative'
        },
        {
            id: 'corporate-blue',
            name: 'Corporate Blue',
            preview: '/themes/corporate-blue.jpg',
            colors: {
                primary: '#1E40AF',
                secondary: '#F8FAFC',
                accent: '#059669',
                background: '#FFFFFF'
            },
            style: 'corporate'
        }
    ];

    const deploymentOptions = [
        { name: 'Netlify', icon: Globe, color: 'bg-teal-600' },
        { name: 'Vercel', icon: Zap, color: 'bg-black' },
        { name: 'GitHub Pages', icon: Github, color: 'bg-gray-800' },
        { name: 'AWS S3', icon: Globe, color: 'bg-orange-600' }
    ];

    const addProject = () => {
        const newProject = {
            id: Date.now().toString(),
            title: 'New Project',
            description: 'Project description',
            image: '',
            technologies: [],
            liveUrl: '',
            githubUrl: '',
            featured: false
        };
        setPortfolioData(prev => ({
            ...prev,
            projects: [...prev.projects, newProject]
        }));
    };

    const removeProject = (id: string) => {
        setPortfolioData(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== id)
        }));
    };

    const addSkill = () => {
        const newSkill = {
            name: 'New Skill',
            level: 70,
            category: 'Other'
        };
        setPortfolioData(prev => ({
            ...prev,
            skills: [...prev.skills, newSkill]
        }));
    };

    const getDeviceIcon = (device: string) => {
        switch (device) {
            case 'desktop': return Monitor;
            case 'tablet': return Tablet;
            case 'mobile': return Smartphone;
            default: return Monitor;
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    Portfolio Generator
                </h1>
                <p className="text-gray-400 mt-2">
                    Create stunning portfolio websites with custom themes and deployment options
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Configuration Panel */}
                <div className="lg:col-span-2">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-teal-400" />
                                Portfolio Configuration
                            </CardTitle>
                            <CardDescription>
                                Customize your portfolio content and settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-5 bg-gray-800">
                                    <TabsTrigger value="personal" className="data-[state=active]:bg-teal-600">
                                        Personal
                                    </TabsTrigger>
                                    <TabsTrigger value="projects" className="data-[state=active]:bg-teal-600">
                                        Projects
                                    </TabsTrigger>
                                    <TabsTrigger value="skills" className="data-[state=active]:bg-teal-600">
                                        Skills
                                    </TabsTrigger>
                                    <TabsTrigger value="themes" className="data-[state=active]:bg-teal-600">
                                        Themes
                                    </TabsTrigger>
                                    <TabsTrigger value="deploy" className="data-[state=active]:bg-teal-600">
                                        Deploy
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="personal" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={portfolioData.personal.name}
                                                onChange={(e) => setPortfolioData(prev => ({
                                                    ...prev,
                                                    personal: { ...prev.personal, name: e.target.value }
                                                }))}
                                                className="bg-gray-800 border-gray-700 text-white"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="title" className="text-gray-300">Professional Title</Label>
                                            <Input
                                                id="title"
                                                value={portfolioData.personal.title}
                                                onChange={(e) => setPortfolioData(prev => ({
                                                    ...prev,
                                                    personal: { ...prev.personal, title: e.target.value }
                                                }))}
                                                className="bg-gray-800 border-gray-700 text-white"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            value={portfolioData.personal.bio}
                                            onChange={(e) => setPortfolioData(prev => ({
                                                ...prev,
                                                personal: { ...prev.personal, bio: e.target.value }
                                            }))}
                                            className="bg-gray-800 border-gray-700 text-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={portfolioData.personal.email}
                                                onChange={(e) => setPortfolioData(prev => ({
                                                    ...prev,
                                                    personal: { ...prev.personal, email: e.target.value }
                                                }))}
                                                className="bg-gray-800 border-gray-700 text-white"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="location" className="text-gray-300">Location</Label>
                                            <Input
                                                id="location"
                                                value={portfolioData.personal.location}
                                                onChange={(e) => setPortfolioData(prev => ({
                                                    ...prev,
                                                    personal: { ...prev.personal, location: e.target.value }
                                                }))}
                                                className="bg-gray-800 border-gray-700 text-white"
                                            />
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="projects" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white font-medium">Your Projects</h3>
                                        <Button onClick={addProject} className="bg-teal-600 hover:bg-teal-700">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Project
                                        </Button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {portfolioData.projects.map((project) => (
                                            <Card key={project.id} className="bg-gray-800 border-gray-700">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <Briefcase className="w-4 h-4 text-teal-400" />
                                                            <Input
                                                                value={project.title}
                                                                onChange={(e) => {
                                                                    const updatedProjects = portfolioData.projects.map(p =>
                                                                        p.id === project.id ? { ...p, title: e.target.value } : p
                                                                    );
                                                                    setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
                                                                }}
                                                                className="bg-gray-900 border-gray-600 text-white font-medium"
                                                            />
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant={project.featured ? "default" : "outline"}
                                                                onClick={() => {
                                                                    const updatedProjects = portfolioData.projects.map(p =>
                                                                        p.id === project.id ? { ...p, featured: !p.featured } : p
                                                                    );
                                                                    setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
                                                                }}
                                                            >
                                                                <Star className="w-3 h-3" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => removeProject(project.id)}
                                                                className="border-red-700 hover:bg-red-800"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    
                                                    <Textarea
                                                        value={project.description}
                                                        onChange={(e) => {
                                                            const updatedProjects = portfolioData.projects.map(p =>
                                                                p.id === project.id ? { ...p, description: e.target.value } : p
                                                            );
                                                            setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
                                                        }}
                                                        placeholder="Project description"
                                                        className="bg-gray-900 border-gray-600 text-white mb-3"
                                                    />
                                                    
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Input
                                                            value={project.liveUrl}
                                                            onChange={(e) => {
                                                                const updatedProjects = portfolioData.projects.map(p =>
                                                                    p.id === project.id ? { ...p, liveUrl: e.target.value } : p
                                                                );
                                                                setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
                                                            }}
                                                            placeholder="Live URL"
                                                            className="bg-gray-900 border-gray-600 text-white"
                                                        />
                                                        <Input
                                                            value={project.githubUrl}
                                                            onChange={(e) => {
                                                                const updatedProjects = portfolioData.projects.map(p =>
                                                                    p.id === project.id ? { ...p, githubUrl: e.target.value } : p
                                                                );
                                                                setPortfolioData(prev => ({ ...prev, projects: updatedProjects }));
                                                            }}
                                                            placeholder="GitHub URL"
                                                            className="bg-gray-900 border-gray-600 text-white"
                                                        />
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {project.technologies.map((tech, index) => (
                                                            <Badge key={index} variant="secondary" className="bg-teal-600 text-white">
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="skills" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white font-medium">Your Skills</h3>
                                        <Button onClick={addSkill} className="bg-teal-600 hover:bg-teal-700">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Skill
                                        </Button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {portfolioData.skills.map((skill, index) => (
                                            <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Input
                                                        value={skill.name}
                                                        onChange={(e) => {
                                                            const updatedSkills = [...portfolioData.skills];
                                                            updatedSkills[index] = { ...skill, name: e.target.value };
                                                            setPortfolioData(prev => ({ ...prev, skills: updatedSkills }));
                                                        }}
                                                        className="bg-gray-900 border-gray-600 text-white font-medium mr-2"
                                                    />
                                                    <Badge variant="outline">{skill.category}</Badge>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                                                        <div 
                                                            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${skill.level}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-white text-sm font-medium w-10">{skill.level}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="themes" className="space-y-4">
                                    <div>
                                        <h3 className="text-white font-medium mb-4">Choose Your Theme</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {themes.map((theme) => (
                                                <Card 
                                                    key={theme.id} 
                                                    className={`bg-gray-800 border-gray-700 cursor-pointer transition-all hover:border-teal-500 ${
                                                        selectedTheme === theme.id ? 'border-teal-500 ring-2 ring-teal-500/20' : ''
                                                    }`}
                                                    onClick={() => setSelectedTheme(theme.id)}
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="aspect-video bg-gray-900 rounded-lg mb-3 flex items-center justify-center">
                                                            <Image className="w-8 h-8 text-gray-600" />
                                                        </div>
                                                        <h4 className="text-white font-medium">{theme.name}</h4>
                                                        <p className="text-gray-400 text-sm capitalize">{theme.style} style</p>
                                                        <div className="flex gap-1 mt-2">
                                                            {Object.values(theme.colors).map((color, index) => (
                                                                <div 
                                                                    key={index}
                                                                    className="w-4 h-4 rounded-full border border-gray-600"
                                                                    style={{ backgroundColor: color }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="deploy" className="space-y-4">
                                    <div>
                                        <h3 className="text-white font-medium mb-4">Deployment Options</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {deploymentOptions.map((option, index) => (
                                                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-teal-500 cursor-pointer transition-colors">
                                                    <CardContent className="p-4 text-center">
                                                        <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                                                            <option.icon className="w-6 h-6 text-white" />
                                                        </div>
                                                        <h4 className="text-white font-medium">{option.name}</h4>
                                                        <Button className="w-full mt-3 bg-teal-600 hover:bg-teal-700">
                                                            Deploy to {option.name}
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <Card className="bg-gray-800 border-gray-700">
                                        <CardHeader>
                                            <CardTitle className="text-white text-lg">Custom Domain</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label htmlFor="domain" className="text-gray-300">Domain Name</Label>
                                                    <Input
                                                        id="domain"
                                                        placeholder="yourdomain.com"
                                                        className="bg-gray-900 border-gray-600 text-white"
                                                    />
                                                </div>
                                                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                                                    <Globe className="w-4 h-4 mr-2" />
                                                    Configure Custom Domain
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview Panel */}
                <div className="space-y-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-teal-400" />
                                    Live Preview
                                </CardTitle>
                                <div className="flex gap-1">
                                    {(['desktop', 'tablet', 'mobile'] as const).map((device) => {
                                        const Icon = getDeviceIcon(device);
                                        return (
                                            <Button
                                                key={device}
                                                size="sm"
                                                variant={previewDevice === device ? "default" : "outline"}
                                                onClick={() => setPreviewDevice(device)}
                                                className={previewDevice === device ? "bg-teal-600" : "border-gray-700"}
                                            >
                                                <Icon className="w-3 h-3" />
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className={`bg-gray-800 rounded-lg overflow-hidden ${
                                previewDevice === 'desktop' ? 'aspect-video' :
                                previewDevice === 'tablet' ? 'aspect-[3/4]' : 'aspect-[9/16]'
                            }`}>
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-white text-lg font-semibold">{portfolioData.personal.name}</h3>
                                        <p className="text-gray-400">{portfolioData.personal.title}</p>
                                        <div className="mt-4 space-y-2">
                                            <Badge className="bg-teal-600 text-white">{portfolioData.projects.length} Projects</Badge>
                                            <br />
                                            <Badge className="bg-purple-600 text-white">{portfolioData.skills.length} Skills</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Code className="w-5 h-5 text-green-400" />
                                Export Options
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download HTML/CSS
                                </Button>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                    <Github className="w-4 h-4 mr-2" />
                                    Export to GitHub
                                </Button>
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Generate Live Link
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                Quick Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Projects</span>
                                    <span className="text-white font-medium">{portfolioData.projects.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Featured</span>
                                    <span className="text-white font-medium">{portfolioData.projects.filter(p => p.featured).length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Skills</span>
                                    <span className="text-white font-medium">{portfolioData.skills.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Theme</span>
                                    <span className="text-white font-medium">{themes.find(t => t.id === selectedTheme)?.name}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}