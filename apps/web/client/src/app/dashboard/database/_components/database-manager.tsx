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
    Database, 
    Server, 
    Play, 
    Save, 
    Download, 
    Upload,
    Plus,
    Trash2,
    Edit,
    Eye,
    Copy,
    RefreshCw,
    Activity,
    HardDrive,
    Zap,
    Table,
    FileText,
    Settings
} from 'lucide-react';

interface DatabaseConnection {
    id: string;
    name: string;
    type: 'mysql' | 'postgresql' | 'mongodb' | 'sqlite' | 'redis';
    host: string;
    port: number;
    database: string;
    status: 'connected' | 'disconnected' | 'error';
    lastConnected: string;
}

interface QueryResult {
    columns: string[];
    rows: any[][];
    executionTime: number;
    rowsAffected: number;
}

export function DatabaseManager() {
    const [activeTab, setActiveTab] = useState('connections');
    const [selectedConnection, setSelectedConnection] = useState<string>('');
    const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;');
    const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
    const [isExecuting, setIsExecuting] = useState(false);

    const [connections] = useState<DatabaseConnection[]>([
        {
            id: '1',
            name: 'Main PostgreSQL',
            type: 'postgresql',
            host: 'localhost',
            port: 5432,
            database: 'app_db',
            status: 'connected',
            lastConnected: '2024-01-15 14:30:00'
        },
        {
            id: '2',
            name: 'Analytics MySQL',
            type: 'mysql',
            host: 'analytics.db.com',
            port: 3306,
            database: 'analytics',
            status: 'connected',
            lastConnected: '2024-01-15 14:25:00'
        },
        {
            id: '3',
            name: 'Cache Redis',
            type: 'redis',
            host: 'cache.redis.com',
            port: 6379,
            database: '0',
            status: 'disconnected',
            lastConnected: '2024-01-15 12:15:00'
        },
        {
            id: '4',
            name: 'MongoDB Logs',
            type: 'mongodb',
            host: 'logs.mongo.com',
            port: 27017,
            database: 'logs',
            status: 'error',
            lastConnected: '2024-01-15 10:45:00'
        }
    ]);

    const getDatabaseIcon = (type: string) => {
        switch (type) {
            case 'postgresql': return <Database className="w-4 h-4 text-blue-400" />;
            case 'mysql': return <Database className="w-4 h-4 text-orange-400" />;
            case 'mongodb': return <Database className="w-4 h-4 text-green-400" />;
            case 'sqlite': return <Database className="w-4 h-4 text-purple-400" />;
            case 'redis': return <HardDrive className="w-4 h-4 text-red-400" />;
            default: return <Database className="w-4 h-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'connected': return 'bg-green-500';
            case 'disconnected': return 'bg-gray-500';
            case 'error': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'connected': return <Badge className="bg-green-600 text-white">Connected</Badge>;
            case 'disconnected': return <Badge variant="secondary">Disconnected</Badge>;
            case 'error': return <Badge className="bg-red-600 text-white">Error</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const executeQuery = async () => {
        if (!query.trim() || !selectedConnection) return;
        
        setIsExecuting(true);
        
        // Simulate query execution
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock result
        setQueryResult({
            columns: ['id', 'name', 'email', 'created_at'],
            rows: [
                [1, 'John Doe', 'john@example.com', '2024-01-01'],
                [2, 'Jane Smith', 'jane@example.com', '2024-01-02'],
                [3, 'Bob Johnson', 'bob@example.com', '2024-01-03'],
                [4, 'Alice Brown', 'alice@example.com', '2024-01-04'],
                [5, 'Charlie Wilson', 'charlie@example.com', '2024-01-05']
            ],
            executionTime: 142,
            rowsAffected: 5
        });
        
        setIsExecuting(false);
    };

    const sampleQueries = [
        'SELECT * FROM users LIMIT 10;',
        'SELECT COUNT(*) FROM orders WHERE status = "completed";',
        'SELECT u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id;',
        'UPDATE users SET last_login = NOW() WHERE id = 1;',
        'INSERT INTO users (name, email) VALUES ("New User", "new@example.com");'
    ];

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                    Database Manager
                </h1>
                <p className="text-gray-400 mt-2">
                    Multi-database management with powerful query builder and admin tools
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                    <TabsTrigger value="connections" className="data-[state=active]:bg-indigo-600">
                        Connections
                    </TabsTrigger>
                    <TabsTrigger value="query-builder" className="data-[state=active]:bg-indigo-600">
                        Query Builder
                    </TabsTrigger>
                    <TabsTrigger value="admin-panel" className="data-[state=active]:bg-indigo-600">
                        Admin Panel
                    </TabsTrigger>
                    <TabsTrigger value="backup-tools" className="data-[state=active]:bg-indigo-600">
                        Backup Tools
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="connections" className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white">Database Connections</h2>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Connection
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {connections.map((conn) => (
                            <Card key={conn.id} className="bg-gray-900 border-gray-800 hover:border-indigo-700 transition-colors">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getDatabaseIcon(conn.type)}
                                            <CardTitle className="text-white text-lg">{conn.name}</CardTitle>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${getStatusColor(conn.status)}`} />
                                    </div>
                                    <CardDescription>
                                        {conn.type.toUpperCase()} • {conn.host}:{conn.port}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Status</span>
                                            {getStatusBadge(conn.status)}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Database</span>
                                            <span className="text-white text-sm">{conn.database}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Last Connected</span>
                                            <span className="text-gray-300 text-xs">{conn.lastConnected}</span>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <Button 
                                                size="sm" 
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                                onClick={() => setSelectedConnection(conn.id)}
                                            >
                                                <Play className="w-3 h-3 mr-1" />
                                                Connect
                                            </Button>
                                            <Button size="sm" variant="outline" className="border-gray-700">
                                                <Edit className="w-3 h-3" />
                                            </Button>
                                            <Button size="sm" variant="outline" className="border-gray-700">
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="query-builder" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Query Editor */}
                        <div className="lg:col-span-2">
                            <Card className="bg-gray-900 border-gray-800">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-white flex items-center gap-2">
                                            <Database className="w-5 h-5 text-indigo-400" />
                                            SQL Query Editor
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Select value={selectedConnection} onValueChange={setSelectedConnection}>
                                                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                                                    <SelectValue placeholder="Select database" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border-gray-700">
                                                    {connections.filter(c => c.status === 'connected').map((conn) => (
                                                        <SelectItem key={conn.id} value={conn.id}>
                                                            {conn.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="query" className="text-gray-300 mb-2 block">SQL Query</Label>
                                            <Textarea
                                                id="query"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Enter your SQL query here..."
                                                className="bg-gray-800 border-gray-700 text-white font-mono min-h-32"
                                            />
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <Button 
                                                onClick={executeQuery} 
                                                disabled={isExecuting || !selectedConnection}
                                                className="bg-indigo-600 hover:bg-indigo-700"
                                            >
                                                {isExecuting ? (
                                                    <>
                                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                        Executing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="w-4 h-4 mr-2" />
                                                        Execute Query
                                                    </>
                                                )}
                                            </Button>
                                            <Button variant="outline" className="border-gray-700">
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Query
                                            </Button>
                                            <Button variant="outline" className="border-gray-700">
                                                <Copy className="w-4 h-4 mr-2" />
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Query Results */}
                            {queryResult && (
                                <Card className="bg-gray-900 border-gray-800 mt-6">
                                    <CardHeader>
                                        <CardTitle className="text-white flex items-center gap-2">
                                            <Table className="w-5 h-5 text-green-400" />
                                            Query Results
                                        </CardTitle>
                                        <CardDescription>
                                            Executed in {queryResult.executionTime}ms • {queryResult.rowsAffected} rows affected
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b border-gray-700">
                                                        {queryResult.columns.map((col) => (
                                                            <th key={col} className="text-left py-2 px-3 text-gray-300 font-medium">
                                                                {col}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {queryResult.rows.map((row, index) => (
                                                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                                                            {row.map((cell, cellIndex) => (
                                                                <td key={cellIndex} className="py-2 px-3 text-gray-300">
                                                                    {cell}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        <div className="flex gap-2 mt-4">
                                            <Button size="sm" variant="outline" className="border-gray-700">
                                                <Download className="w-3 h-3 mr-1" />
                                                Export CSV
                                            </Button>
                                            <Button size="sm" variant="outline" className="border-gray-700">
                                                <Download className="w-3 h-3 mr-1" />
                                                Export JSON
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Query Templates */}
                        <div>
                            <Card className="bg-gray-900 border-gray-800">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-yellow-400" />
                                        Query Templates
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {sampleQueries.map((sampleQuery, index) => (
                                            <div 
                                                key={index}
                                                onClick={() => setQuery(sampleQuery)}
                                                className="p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition-colors"
                                            >
                                                <code className="text-xs text-gray-300 break-all">
                                                    {sampleQuery}
                                                </code>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-900 border-gray-800 mt-4">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-purple-400" />
                                        Query History
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {[
                                            'SELECT * FROM users WHERE...',
                                            'UPDATE orders SET status...',
                                            'DELETE FROM temp_table...',
                                            'INSERT INTO logs VALUES...'
                                        ].map((historyQuery, index) => (
                                            <div 
                                                key={index}
                                                className="p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition-colors"
                                            >
                                                <code className="text-xs text-gray-400">
                                                    {historyQuery}
                                                </code>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    2 minutes ago
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="admin-panel" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-blue-400" />
                                    Database Administration
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                                        <Table className="w-4 h-4 mr-2" />
                                        Manage Tables
                                    </Button>
                                    <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Index
                                    </Button>
                                    <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Schema
                                    </Button>
                                    <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700">
                                        <Activity className="w-4 h-4 mr-2" />
                                        Performance Monitor
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <HardDrive className="w-5 h-5 text-green-400" />
                                    Storage Analytics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-300">Database Size</span>
                                            <span className="text-white">2.4 GB</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-300">Index Usage</span>
                                            <span className="text-white">87%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-300">Cache Hit Rate</span>
                                            <span className="text-white">94%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="backup-tools" className="space-y-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <HardDrive className="w-5 h-5 text-indigo-400" />
                                Database Backup & Restore
                            </CardTitle>
                            <CardDescription>
                                Manage database backups and restoration processes
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-white font-medium">Create Backup</h3>
                                    <div>
                                        <Label htmlFor="backup-name" className="text-gray-300">Backup Name</Label>
                                        <Input
                                            id="backup-name"
                                            placeholder="backup_2024_01_15"
                                            className="bg-gray-800 border-gray-700 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="backup-db" className="text-gray-300">Database</Label>
                                        <Select>
                                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                <SelectValue placeholder="Select database" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-800 border-gray-700">
                                                <SelectItem value="main">Main PostgreSQL</SelectItem>
                                                <SelectItem value="analytics">Analytics MySQL</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                        <Download className="w-4 h-4 mr-2" />
                                        Create Backup
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-white font-medium">Restore Database</h3>
                                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                        <p className="text-gray-400 text-sm">Drop backup file here or click to browse</p>
                                        <Button className="mt-3 bg-green-600 hover:bg-green-700">
                                            Select Backup File
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-white font-medium mb-4">Recent Backups</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: 'backup_main_2024_01_15', size: '450 MB', date: '2024-01-15 14:30' },
                                        { name: 'backup_analytics_2024_01_14', size: '1.2 GB', date: '2024-01-14 23:00' },
                                        { name: 'backup_main_2024_01_13', size: '440 MB', date: '2024-01-13 14:30' },
                                        { name: 'backup_logs_2024_01_12', size: '2.1 GB', date: '2024-01-12 02:00' }
                                    ].map((backup, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <HardDrive className="w-4 h-4 text-indigo-400" />
                                                <div>
                                                    <p className="text-white text-sm font-medium">{backup.name}</p>
                                                    <p className="text-gray-400 text-xs">{backup.size} • {backup.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="border-gray-700">
                                                    <Download className="w-3 h-3 mr-1" />
                                                    Download
                                                </Button>
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                    <RefreshCw className="w-3 h-3 mr-1" />
                                                    Restore
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}