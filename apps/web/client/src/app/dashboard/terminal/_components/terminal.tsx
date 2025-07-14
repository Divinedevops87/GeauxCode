'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@onlook/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@onlook/ui/card';
import { Input } from '@onlook/ui/input';
import { Badge } from '@onlook/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { 
    Terminal as TerminalIcon, 
    Plus, 
    X, 
    Copy, 
    Download, 
    Folder, 
    FileText,
    Cpu,
    HardDrive,
    MemoryStick,
    Activity,
    Zap,
    Globe,
    User,
    Server,
    Clock
} from 'lucide-react';

interface TerminalSession {
    id: string;
    name: string;
    active: boolean;
    output: Array<{
        type: 'command' | 'output' | 'error';
        content: string;
        timestamp: string;
    }>;
    currentDirectory: string;
}

interface SystemInfo {
    os: string;
    kernel: string;
    uptime: string;
    cpu: {
        model: string;
        cores: number;
        usage: number;
    };
    memory: {
        total: string;
        used: string;
        free: string;
        usage: number;
    };
    disk: {
        total: string;
        used: string;
        free: string;
        usage: number;
    };
    network: {
        interface: string;
        ip: string;
        status: string;
    };
}

export function Terminal() {
    const [sessions, setSessions] = useState<TerminalSession[]>([
        {
            id: '1',
            name: 'Session 1',
            active: true,
            output: [
                {
                    type: 'output',
                    content: 'Welcome to GeauxCode Terminal v1.0.0',
                    timestamp: new Date().toLocaleTimeString()
                },
                {
                    type: 'output',
                    content: 'Type "help" for available commands',
                    timestamp: new Date().toLocaleTimeString()
                }
            ],
            currentDirectory: '~/projects'
        }
    ]);

    const [activeSessionId, setActiveSessionId] = useState('1');
    const [currentCommand, setCurrentCommand] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalRef = useRef<HTMLDivElement>(null);

    const [systemInfo] = useState<SystemInfo>({
        os: 'Ubuntu 22.04 LTS',
        kernel: '5.15.0-91-generic',
        uptime: '2 days, 14:32',
        cpu: {
            model: 'Intel Core i7-12700K',
            cores: 12,
            usage: 23
        },
        memory: {
            total: '32.0 GB',
            used: '12.4 GB',
            free: '19.6 GB',
            usage: 39
        },
        disk: {
            total: '1.0 TB',
            used: '425 GB',
            free: '575 GB',
            usage: 43
        },
        network: {
            interface: 'eth0',
            ip: '192.168.1.100',
            status: 'connected'
        }
    });

    const activeSession = sessions.find(s => s.id === activeSessionId);

    const scrollToBottom = () => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [sessions]);

    const addSession = () => {
        const newSession: TerminalSession = {
            id: Date.now().toString(),
            name: `Session ${sessions.length + 1}`,
            active: false,
            output: [
                {
                    type: 'output',
                    content: 'New terminal session started',
                    timestamp: new Date().toLocaleTimeString()
                }
            ],
            currentDirectory: '~'
        };

        setSessions(prev => prev.map(s => ({ ...s, active: false })).concat({ ...newSession, active: true }));
        setActiveSessionId(newSession.id);
    };

    const closeSession = (sessionId: string) => {
        if (sessions.length === 1) return; // Don't close the last session
        
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        
        if (sessionId === activeSessionId) {
            const remainingSessions = sessions.filter(s => s.id !== sessionId);
            setActiveSessionId(remainingSessions[0]?.id || '');
        }
    };

    const executeCommand = (command: string) => {
        if (!command.trim()) return;

        // Add command to history
        setCommandHistory(prev => [...prev, command]);
        setHistoryIndex(-1);

        // Add command to output
        const timestamp = new Date().toLocaleTimeString();
        const commandOutput = {
            type: 'command' as const,
            content: `${activeSession?.currentDirectory} $ ${command}`,
            timestamp
        };

        // Process command and generate response
        const response = processCommand(command);

        setSessions(prev => prev.map(session => {
            if (session.id === activeSessionId) {
                return {
                    ...session,
                    output: [...session.output, commandOutput, ...response]
                };
            }
            return session;
        }));

        setCurrentCommand('');
    };

    const processCommand = (command: string) => {
        const timestamp = new Date().toLocaleTimeString();
        const args = command.split(' ');
        const cmd = args[0].toLowerCase();

        switch (cmd) {
            case 'help':
                return [
                    {
                        type: 'output' as const,
                        content: 'Available commands:',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '  help - Show this help message',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '  ls - List directory contents',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '  pwd - Print working directory',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '  cd <dir> - Change directory',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '  clear - Clear terminal',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '  sysinfo - Show system information',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '  ps - Show running processes',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '  whoami - Show current user',
                        timestamp
                    }
                ];

            case 'ls':
                return [
                    {
                        type: 'output' as const,
                        content: 'drwxr-xr-x  5 user user 4096 Jan 15 14:30 project1',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: 'drwxr-xr-x  3 user user 4096 Jan 14 09:15 project2',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '-rw-r--r--  1 user user  234 Jan 13 16:45 README.md',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: '-rw-r--r--  1 user user 1024 Jan 12 11:20 package.json',
                        timestamp
                    }
                ];

            case 'pwd':
                return [
                    {
                        type: 'output' as const,
                        content: activeSession?.currentDirectory || '~',
                        timestamp
                    }
                ];

            case 'cd':
                const dir = args[1] || '~';
                setSessions(prev => prev.map(session => {
                    if (session.id === activeSessionId) {
                        return {
                            ...session,
                            currentDirectory: dir
                        };
                    }
                    return session;
                }));
                return [];

            case 'clear':
                setSessions(prev => prev.map(session => {
                    if (session.id === activeSessionId) {
                        return {
                            ...session,
                            output: []
                        };
                    }
                    return session;
                }));
                return [];

            case 'whoami':
                return [
                    {
                        type: 'output' as const,
                        content: 'geauxcode-user',
                        timestamp
                    }
                ];

            case 'sysinfo':
                return [
                    {
                        type: 'output' as const,
                        content: `OS: ${systemInfo.os}`,
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: `Kernel: ${systemInfo.kernel}`,
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: `Uptime: ${systemInfo.uptime}`,
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: `CPU: ${systemInfo.cpu.model} (${systemInfo.cpu.cores} cores)`,
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: `Memory: ${systemInfo.memory.used}/${systemInfo.memory.total} (${systemInfo.memory.usage}%)`,
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: `Disk: ${systemInfo.disk.used}/${systemInfo.disk.total} (${systemInfo.disk.usage}%)`,
                        timestamp
                    }
                ];

            case 'ps':
                return [
                    {
                        type: 'output' as const,
                        content: '  PID TTY          TIME CMD',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: ' 1234 pts/0    00:00:01 bash',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: ' 5678 pts/0    00:00:00 node',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: ' 9012 pts/0    00:00:02 geauxcode',
                        timestamp
                    },
                    {
                        type: 'output' as const,
                        content: ' 3456 pts/0    00:00:00 ps',
                        timestamp
                    }
                ];

            default:
                return [
                    {
                        type: 'error' as const,
                        content: `Command not found: ${command}`,
                        timestamp
                    }
                ];
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            executeCommand(currentCommand);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCurrentCommand('');
            }
        }
    };

    const copyOutput = () => {
        const output = activeSession?.output.map(line => line.content).join('\n') || '';
        navigator.clipboard.writeText(output);
    };

    const downloadLog = () => {
        const output = activeSession?.output.map(line => `[${line.timestamp}] ${line.content}`).join('\n') || '';
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `terminal-log-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-400 to-slate-500 bg-clip-text text-transparent">
                    Terminal
                </h1>
                <p className="text-gray-400 mt-2">
                    Advanced terminal with CLI commands, system info, and multiple sessions
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Terminal Panel */}
                <div className="lg:col-span-3">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-white flex items-center gap-2">
                                    <TerminalIcon className="w-5 h-5 text-green-400" />
                                    Terminal Sessions
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button onClick={copyOutput} size="sm" variant="outline" className="border-gray-700">
                                        <Copy className="w-3 h-3 mr-1" />
                                        Copy
                                    </Button>
                                    <Button onClick={downloadLog} size="sm" variant="outline" className="border-gray-700">
                                        <Download className="w-3 h-3 mr-1" />
                                        Download
                                    </Button>
                                    <Button onClick={addSession} size="sm" className="bg-green-600 hover:bg-green-700">
                                        <Plus className="w-3 h-3 mr-1" />
                                        New Session
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Session Tabs */}
                            <div className="flex gap-1 mt-3">
                                {sessions.map((session) => (
                                    <div 
                                        key={session.id}
                                        className={`flex items-center gap-2 px-3 py-1 rounded-t-lg cursor-pointer transition-colors ${
                                            session.id === activeSessionId 
                                                ? 'bg-gray-800 text-white' 
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                        onClick={() => setActiveSessionId(session.id)}
                                    >
                                        <span className="text-sm">{session.name}</span>
                                        {sessions.length > 1 && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    closeSession(session.id);
                                                }}
                                                className="p-0 h-4 w-4 hover:bg-red-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div 
                                ref={terminalRef}
                                className="bg-black text-green-400 font-mono text-sm p-4 h-96 overflow-y-auto"
                            >
                                {activeSession?.output.map((line, index) => (
                                    <div key={index} className={`${
                                        line.type === 'command' ? 'text-blue-400' :
                                        line.type === 'error' ? 'text-red-400' : 'text-green-400'
                                    }`}>
                                        {line.content}
                                    </div>
                                ))}
                                
                                {/* Command Input */}
                                <div className="flex items-center mt-2">
                                    <span className="text-blue-400 mr-2">
                                        {activeSession?.currentDirectory} $
                                    </span>
                                    <Input
                                        value={currentCommand}
                                        onChange={(e) => setCurrentCommand(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="bg-transparent border-none text-green-400 font-mono focus:ring-0 p-0 h-auto"
                                        placeholder="Enter command..."
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* System Info Panel */}
                <div className="space-y-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Server className="w-5 h-5 text-blue-400" />
                                System Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Cpu className="w-4 h-4 text-orange-400" />
                                        <span className="text-gray-300 text-sm">CPU Usage</span>
                                    </div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">{systemInfo.cpu.model}</span>
                                        <span className="text-white">{systemInfo.cpu.usage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${systemInfo.cpu.usage}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <MemoryStick className="w-4 h-4 text-blue-400" />
                                        <span className="text-gray-300 text-sm">Memory</span>
                                    </div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">{systemInfo.memory.used}/{systemInfo.memory.total}</span>
                                        <span className="text-white">{systemInfo.memory.usage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${systemInfo.memory.usage}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <HardDrive className="w-4 h-4 text-green-400" />
                                        <span className="text-gray-300 text-sm">Disk Usage</span>
                                    </div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">{systemInfo.disk.used}/{systemInfo.disk.total}</span>
                                        <span className="text-white">{systemInfo.disk.usage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${systemInfo.disk.usage}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-gray-700">
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">OS</span>
                                            <span className="text-white">{systemInfo.os}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Uptime</span>
                                            <span className="text-white">{systemInfo.uptime}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">IP</span>
                                            <span className="text-white">{systemInfo.network.ip}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Activity className="w-5 h-5 text-purple-400" />
                                Quick Commands
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {[
                                    { cmd: 'ls -la', desc: 'List all files' },
                                    { cmd: 'ps aux', desc: 'Show processes' },
                                    { cmd: 'df -h', desc: 'Disk usage' },
                                    { cmd: 'top', desc: 'System monitor' },
                                    { cmd: 'whoami', desc: 'Current user' },
                                    { cmd: 'uname -a', desc: 'System info' }
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => setCurrentCommand(item.cmd)}
                                        className="p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="text-white text-xs font-mono">{item.cmd}</div>
                                        <div className="text-gray-400 text-xs">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Clock className="w-5 h-5 text-yellow-400" />
                                Command History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                                {commandHistory.slice(-10).reverse().map((cmd, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => setCurrentCommand(cmd)}
                                        className="text-xs font-mono text-gray-400 p-1 hover:text-white cursor-pointer hover:bg-gray-800 rounded"
                                    >
                                        {cmd}
                                    </div>
                                ))}
                                {commandHistory.length === 0 && (
                                    <div className="text-xs text-gray-500">No commands yet</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}