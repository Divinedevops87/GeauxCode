'use client';

import { useState, useEffect } from 'react';
import { Button } from '@onlook/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@onlook/ui/card';
import { Badge } from '@onlook/ui/badge';
import { Progress } from '@onlook/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { 
    Shield, 
    AlertTriangle, 
    CheckCircle, 
    XCircle, 
    Search, 
    Eye,
    Code,
    FileText,
    Activity,
    Zap,
    Lock,
    Unlock,
    Bug,
    Scan,
    Download,
    RefreshCw
} from 'lucide-react';

interface Vulnerability {
    id: string;
    title: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    type: 'xss' | 'sql-injection' | 'csrf' | 'path-traversal' | 'rce' | 'info-disclosure';
    file: string;
    line: number;
    description: string;
    solution: string;
    cwe: string;
}

interface SecurityMetrics {
    securityScore: number;
    vulnerabilitiesFound: number;
    filesScanned: number;
    linesAnalyzed: number;
    lastScan: string;
}

export function SecuritySuite() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    const [metrics] = useState<SecurityMetrics>({
        securityScore: 78,
        vulnerabilitiesFound: 23,
        filesScanned: 156,
        linesAnalyzed: 45230,
        lastScan: '2024-01-15 14:30:00'
    });

    const [vulnerabilities] = useState<Vulnerability[]>([
        {
            id: '1',
            title: 'Cross-Site Scripting (XSS) vulnerability',
            severity: 'high',
            type: 'xss',
            file: 'components/UserInput.tsx',
            line: 45,
            description: 'User input is not properly sanitized before rendering',
            solution: 'Use proper input validation and output encoding',
            cwe: 'CWE-79'
        },
        {
            id: '2',
            title: 'SQL Injection vulnerability',
            severity: 'critical',
            type: 'sql-injection',
            file: 'api/users.ts',
            line: 23,
            description: 'SQL query constructed using string concatenation',
            solution: 'Use parameterized queries or prepared statements',
            cwe: 'CWE-89'
        },
        {
            id: '3',
            title: 'Path Traversal vulnerability',
            severity: 'medium',
            type: 'path-traversal',
            file: 'utils/fileHandler.ts',
            line: 67,
            description: 'File path not properly validated',
            solution: 'Implement proper path validation and sanitization',
            cwe: 'CWE-22'
        },
        {
            id: '4',
            title: 'Information Disclosure',
            severity: 'low',
            type: 'info-disclosure',
            file: 'config/database.ts',
            line: 12,
            description: 'Sensitive configuration exposed in logs',
            solution: 'Remove sensitive data from logs and error messages',
            cwe: 'CWE-200'
        }
    ]);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'critical': return <XCircle className="w-4 h-4 text-red-400" />;
            case 'high': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
            case 'medium': return <Eye className="w-4 h-4 text-yellow-400" />;
            case 'low': return <CheckCircle className="w-4 h-4 text-blue-400" />;
            default: return <Bug className="w-4 h-4 text-gray-400" />;
        }
    };

    const startScan = async () => {
        setIsScanning(true);
        setScanProgress(0);
        
        // Simulate scanning progress
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                    Security Suite
                </h1>
                <p className="text-gray-400 mt-2">
                    Comprehensive security monitoring, vulnerability scanning, and code analysis
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                {/* Security Score */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Security Score</p>
                                <p className="text-2xl font-bold text-white">{metrics.securityScore}/100</p>
                            </div>
                            <Shield className="w-8 h-8 text-green-400" />
                        </div>
                        <Progress value={metrics.securityScore} className="mt-3" />
                    </CardContent>
                </Card>

                {/* Vulnerabilities */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Vulnerabilities</p>
                                <p className="text-2xl font-bold text-red-400">{metrics.vulnerabilitiesFound}</p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-red-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Found in last scan</p>
                    </CardContent>
                </Card>

                {/* Files Scanned */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Files Scanned</p>
                                <p className="text-2xl font-bold text-blue-400">{metrics.filesScanned}</p>
                            </div>
                            <FileText className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{metrics.linesAnalyzed.toLocaleString()} lines analyzed</p>
                    </CardContent>
                </Card>

                {/* Last Scan */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Last Scan</p>
                                <p className="text-sm font-medium text-white">{metrics.lastScan}</p>
                            </div>
                            <Activity className="w-8 h-8 text-purple-400" />
                        </div>
                        <Button 
                            onClick={startScan} 
                            disabled={isScanning}
                            className="w-full mt-3 bg-red-600 hover:bg-red-700 text-xs"
                        >
                            {isScanning ? (
                                <>
                                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                    Scanning...
                                </>
                            ) : (
                                <>
                                    <Scan className="w-3 h-3 mr-1" />
                                    New Scan
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {isScanning && (
                <Card className="bg-gray-900 border-gray-800 mb-6">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <RefreshCw className="w-5 h-5 text-red-400 animate-spin" />
                            <span className="text-white font-medium">Security scan in progress...</span>
                        </div>
                        <Progress value={scanProgress} className="mb-2" />
                        <p className="text-sm text-gray-400">{scanProgress}% complete</p>
                    </CardContent>
                </Card>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                    <TabsTrigger value="dashboard" className="data-[state=active]:bg-red-600">
                        Security Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="vulnerabilities" className="data-[state=active]:bg-red-600">
                        Vulnerabilities
                    </TabsTrigger>
                    <TabsTrigger value="code-analysis" className="data-[state=active]:bg-red-600">
                        Code Analysis
                    </TabsTrigger>
                    <TabsTrigger value="monitoring" className="data-[state=active]:bg-red-600">
                        Security Monitor
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Bug className="w-5 h-5 text-red-400" />
                                    Vulnerability Breakdown
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {['critical', 'high', 'medium', 'low'].map((severity) => {
                                        const count = vulnerabilities.filter(v => v.severity === severity).length;
                                        return (
                                            <div key={severity} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(severity)}`} />
                                                    <span className="text-white capitalize">{severity}</span>
                                                </div>
                                                <Badge variant="secondary">{count}</Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-green-400" />
                                    Security Features
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">HTTPS Enabled</span>
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">CSP Headers</span>
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">SQL Injection Protection</span>
                                        <XCircle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">XSS Protection</span>
                                        <XCircle className="w-5 h-5 text-red-400" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="vulnerabilities" className="space-y-4">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Search className="w-5 h-5 text-orange-400" />
                                Detected Vulnerabilities
                            </CardTitle>
                            <CardDescription>
                                Review and address security vulnerabilities found in your codebase
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {vulnerabilities.map((vuln) => (
                                    <Card key={vuln.id} className="bg-gray-800 border-gray-700">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    {getSeverityIcon(vuln.severity)}
                                                    <h3 className="text-white font-medium">{vuln.title}</h3>
                                                </div>
                                                <Badge className={`${getSeverityColor(vuln.severity)} text-white`}>
                                                    {vuln.severity.toUpperCase()}
                                                </Badge>
                                            </div>
                                            
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <FileText className="w-4 h-4" />
                                                    <span>{vuln.file}:{vuln.line}</span>
                                                    <Badge variant="outline" className="text-xs">{vuln.cwe}</Badge>
                                                </div>
                                                
                                                <p className="text-gray-300">{vuln.description}</p>
                                                
                                                <div className="bg-gray-900 p-3 rounded">
                                                    <p className="text-xs text-gray-400 mb-1">Recommended Solution:</p>
                                                    <p className="text-green-400 text-sm">{vuln.solution}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="code-analysis" className="space-y-4">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Code className="w-5 h-5 text-blue-400" />
                                Static Code Analysis
                            </CardTitle>
                            <CardDescription>
                                Analyze your codebase for security patterns and potential issues
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium">Analysis Rules</h4>
                                    {[
                                        'SQL Injection Detection',
                                        'XSS Vulnerability Scan',
                                        'CSRF Token Validation',
                                        'Input Validation Checks',
                                        'Authentication Bypass',
                                        'Path Traversal Detection'
                                    ].map((rule, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                                            <span className="text-gray-300 text-sm">{rule}</span>
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="space-y-3">
                                    <h4 className="text-white font-medium">Code Quality Metrics</h4>
                                    <div className="space-y-2">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">Security Coverage</span>
                                                <span className="text-white">85%</span>
                                            </div>
                                            <Progress value={85} />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">Code Quality</span>
                                                <span className="text-white">92%</span>
                                            </div>
                                            <Progress value={92} />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-300">Test Coverage</span>
                                                <span className="text-white">78%</span>
                                            </div>
                                            <Progress value={78} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="monitoring" className="space-y-4">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Activity className="w-5 h-5 text-purple-400" />
                                Real-time Security Monitoring
                            </CardTitle>
                            <CardDescription>
                                Monitor your application for security threats and anomalies
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300 text-sm">Failed Login Attempts</span>
                                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-white">127</p>
                                    <p className="text-xs text-gray-500">Last 24 hours</p>
                                </div>
                                
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300 text-sm">Blocked Requests</span>
                                        <Shield className="w-4 h-4 text-red-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-white">89</p>
                                    <p className="text-xs text-gray-500">Potential attacks</p>
                                </div>
                                
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-300 text-sm">Security Events</span>
                                        <Zap className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <p className="text-2xl font-bold text-white">15</p>
                                    <p className="text-xs text-gray-500">Requires attention</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-8 flex gap-4">
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Security Report
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Eye className="w-4 h-4 mr-2" />
                    View Detailed Logs
                </Button>
            </div>
        </div>
    );
}