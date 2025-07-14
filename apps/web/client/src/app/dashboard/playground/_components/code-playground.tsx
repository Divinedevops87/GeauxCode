'use client';

import { useState } from 'react';
import { Button } from '@onlook/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@onlook/ui/card';
import { Badge } from '@onlook/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@onlook/ui/select';
import { 
    Code, 
    Play, 
    Download, 
    Share, 
    Save,
    Eye,
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    Github,
    Copy,
    RefreshCw,
    Settings,
    Zap,
    FileText,
    Palette,
    Layout
} from 'lucide-react';

interface CodeFile {
    id: string;
    name: string;
    language: string;
    content: string;
}

interface Template {
    id: string;
    name: string;
    description: string;
    language: string;
    files: CodeFile[];
    preview: string;
}

export function CodePlayground() {
    const [activeFile, setActiveFile] = useState('index.html');
    const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('blank-html');

    const [files, setFiles] = useState<CodeFile[]>([
        {
            id: 'index.html',
            name: 'index.html',
            language: 'html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to Code Playground</h1>
        <p>Start coding and see your changes live!</p>
        <button onclick="sayHello()">Click me!</button>
        <div id="output"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>`
        },
        {
            id: 'style.css',
            name: 'style.css',
            language: 'css',
            content: `body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 500px;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
}

p {
    color: #666;
    margin-bottom: 1.5rem;
}

button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.2s;
}

button:hover {
    transform: translateY(-2px);
}

#output {
    margin-top: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 5px;
    min-height: 40px;
}`
        },
        {
            id: 'script.js',
            name: 'script.js',
            language: 'javascript',
            content: `function sayHello() {
    const output = document.getElementById('output');
    const messages = [
        'Hello, World! 👋',
        'Welcome to coding! 🚀',
        'Keep coding! 💻',
        'You are awesome! ⭐',
        'Code is poetry! 🎨'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    output.innerHTML = \`<h3 style="color: #667eea; margin: 0;">\${randomMessage}</h3>\`;
    
    // Add some animation
    output.style.transform = 'scale(0.9)';
    setTimeout(() => {
        output.style.transform = 'scale(1)';
    }, 150);
}

// Add some interactivity on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Code Playground loaded! 🎉');
});`
        }
    ]);

    const templates: Template[] = [
        {
            id: 'blank-html',
            name: 'Blank HTML',
            description: 'Start with a basic HTML template',
            language: 'html',
            files: files,
            preview: '/templates/blank-html.jpg'
        },
        {
            id: 'react-app',
            name: 'React App',
            description: 'React component with hooks',
            language: 'jsx',
            files: [
                {
                    id: 'App.jsx',
                    name: 'App.jsx',
                    language: 'jsx',
                    content: `import React, { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);
    
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>React Counter App</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
        </div>
    );
}

export default App;`
                }
            ],
            preview: '/templates/react-app.jpg'
        },
        {
            id: 'vue-component',
            name: 'Vue Component',
            description: 'Vue 3 composition API component',
            language: 'vue',
            files: [
                {
                    id: 'App.vue',
                    name: 'App.vue',
                    language: 'vue',
                    content: `<template>
  <div class="app">
    <h1>Vue Todo App</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add todo...">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const todos = ref([])
    const newTodo = ref('')
    
    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodo.value
        })
        newTodo.value = ''
      }
    }
    
    const removeTodo = (id) => {
      todos.value = todos.value.filter(todo => todo.id !== id)
    }
    
    return {
      todos,
      newTodo,
      addTodo,
      removeTodo
    }
  }
}
</script>`
                }
            ],
            preview: '/templates/vue-component.jpg'
        },
        {
            id: 'python-script',
            name: 'Python Script',
            description: 'Basic Python data analysis',
            language: 'python',
            files: [
                {
                    id: 'main.py',
                    name: 'main.py',
                    language: 'python',
                    content: `# Python Data Analysis Example
import math
import random

def analyze_data(data):
    """Analyze a list of numbers"""
    if not data:
        return "No data provided"
    
    mean = sum(data) / len(data)
    maximum = max(data)
    minimum = min(data)
    
    # Calculate standard deviation
    variance = sum((x - mean) ** 2 for x in data) / len(data)
    std_dev = math.sqrt(variance)
    
    return {
        'count': len(data),
        'mean': round(mean, 2),
        'max': maximum,
        'min': minimum,
        'std_dev': round(std_dev, 2)
    }

# Generate sample data
sample_data = [random.randint(1, 100) for _ in range(20)]
result = analyze_data(sample_data)

print("Sample Data:", sample_data)
print("Analysis Results:", result)`
                }
            ],
            preview: '/templates/python-script.jpg'
        }
    ];

    const runCode = async () => {
        setIsRunning(true);
        // Simulate code execution
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsRunning(false);
    };

    const saveProject = () => {
        // In a real app, this would save to backend
        console.log('Saving project...');
    };

    const shareProject = () => {
        // In a real app, this would generate a share link
        const shareUrl = `https://playground.geauxcode.com/share/${Date.now()}`;
        navigator.clipboard.writeText(shareUrl);
        alert('Share link copied to clipboard!');
    };

    const downloadProject = () => {
        // In a real app, this would download as zip
        console.log('Downloading project...');
    };

    const loadTemplate = (templateId: string) => {
        const template = templates.find(t => t.id === templateId);
        if (template) {
            setFiles(template.files);
            setActiveFile(template.files[0]?.id || '');
            setSelectedTemplate(templateId);
        }
    };

    const updateFileContent = (fileId: string, content: string) => {
        setFiles(prev => prev.map(file => 
            file.id === fileId ? { ...file, content } : file
        ));
    };

    const addNewFile = () => {
        const name = prompt('Enter file name (with extension):');
        if (name) {
            const extension = name.split('.').pop()?.toLowerCase() || 'txt';
            const languageMap: Record<string, string> = {
                'html': 'html',
                'css': 'css',
                'js': 'javascript',
                'jsx': 'jsx',
                'ts': 'typescript',
                'tsx': 'tsx',
                'py': 'python',
                'vue': 'vue',
                'json': 'json'
            };

            const newFile: CodeFile = {
                id: name,
                name,
                language: languageMap[extension] || 'text',
                content: ''
            };

            setFiles(prev => [...prev, newFile]);
            setActiveFile(name);
        }
    };

    const getDeviceIcon = (device: string) => {
        switch (device) {
            case 'desktop': return Monitor;
            case 'tablet': return Tablet;
            case 'mobile': return Smartphone;
            default: return Monitor;
        }
    };

    const activeFileData = files.find(f => f.id === activeFile);

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                    Code Playground
                </h1>
                <p className="text-gray-400 mt-2">
                    Real-time code editing, preview, and deployment with multiple languages
                </p>
            </div>

            {/* Toolbar */}
            <Card className="bg-gray-900 border-gray-800 mb-6">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Select value={selectedTemplate} onValueChange={loadTemplate}>
                                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                                    <SelectValue placeholder="Choose template" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    {templates.map((template) => (
                                        <SelectItem key={template.id} value={template.id}>
                                            {template.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button onClick={runCode} disabled={isRunning} className="bg-green-600 hover:bg-green-700">
                                {isRunning ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2" />
                                        Run Code
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button onClick={saveProject} size="sm" variant="outline" className="border-gray-700">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                            </Button>
                            <Button onClick={shareProject} size="sm" variant="outline" className="border-gray-700">
                                <Share className="w-3 h-3 mr-1" />
                                Share
                            </Button>
                            <Button onClick={downloadProject} size="sm" variant="outline" className="border-gray-700">
                                <Download className="w-3 h-3 mr-1" />
                                Download
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Editor */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-white flex items-center gap-2">
                                <Code className="w-5 h-5 text-rose-400" />
                                Code Editor
                            </CardTitle>
                            <Button onClick={addNewFile} size="sm" className="bg-rose-600 hover:bg-rose-700">
                                <FileText className="w-3 h-3 mr-1" />
                                New File
                            </Button>
                        </div>

                        {/* File Tabs */}
                        <div className="flex gap-1 mt-3 overflow-x-auto">
                            {files.map((file) => (
                                <button
                                    key={file.id}
                                    onClick={() => setActiveFile(file.id)}
                                    className={`flex items-center gap-2 px-3 py-1 rounded-t-lg text-sm transition-colors ${
                                        activeFile === file.id
                                            ? 'bg-gray-800 text-white border-b-2 border-rose-500'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    <Code className="w-3 h-3" />
                                    {file.name}
                                </button>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="bg-gray-950 text-gray-300 font-mono text-sm">
                            <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                        {activeFileData?.language.toUpperCase()}
                                    </Badge>
                                    <span className="text-xs text-gray-400">{activeFileData?.name}</span>
                                </div>
                                <Button size="sm" variant="ghost">
                                    <Copy className="w-3 h-3" />
                                </Button>
                            </div>
                            
                            <textarea
                                value={activeFileData?.content || ''}
                                onChange={(e) => activeFileData && updateFileContent(activeFileData.id, e.target.value)}
                                className="w-full h-96 p-4 bg-transparent resize-none focus:outline-none"
                                placeholder="Start coding..."
                                spellCheck={false}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Preview Panel */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-white flex items-center gap-2">
                                <Eye className="w-5 h-5 text-blue-400" />
                                Live Preview
                            </CardTitle>
                            <div className="flex gap-1">
                                {(['desktop', 'tablet', 'mobile'] as const).map((device) => {
                                    const Icon = getDeviceIcon(device);
                                    return (
                                        <Button
                                            key={device}
                                            size="sm"
                                            variant={previewMode === device ? "default" : "outline"}
                                            onClick={() => setPreviewMode(device)}
                                            className={previewMode === device ? "bg-blue-600" : "border-gray-700"}
                                        >
                                            <Icon className="w-3 h-3" />
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className={`bg-white rounded-lg overflow-hidden ${
                            previewMode === 'desktop' ? 'aspect-video' :
                            previewMode === 'tablet' ? 'aspect-[3/4]' : 'aspect-[9/16]'
                        }`}>
                            <iframe
                                srcDoc={files.find(f => f.name === 'index.html')?.content || '<p>No HTML file found</p>'}
                                className="w-full h-full border-0"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Panel - Templates & Deployment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Templates */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Layout className="w-5 h-5 text-purple-400" />
                            Quick Templates
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => loadTemplate(template.id)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-purple-500 ${
                                        selectedTemplate === template.id 
                                            ? 'border-purple-500 bg-purple-900/20' 
                                            : 'border-gray-700 bg-gray-800'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Code className="w-4 h-4 text-purple-400" />
                                        <h4 className="text-white font-medium text-sm">{template.name}</h4>
                                    </div>
                                    <p className="text-gray-400 text-xs">{template.description}</p>
                                    <Badge variant="outline" className="mt-2 text-xs">
                                        {template.language.toUpperCase()}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Deployment Options */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Globe className="w-5 h-5 text-green-400" />
                            Deploy & Share
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <Button className="bg-black hover:bg-gray-800 text-white">
                                    <Github className="w-4 h-4 mr-2" />
                                    GitHub Pages
                                </Button>
                                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Netlify
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Vercel
                                </Button>
                                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                                    <Globe className="w-4 h-4 mr-2" />
                                    CodePen
                                </Button>
                            </div>
                            
                            <div className="border-t border-gray-700 pt-3">
                                <h4 className="text-white text-sm font-medium mb-2">Project Settings</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Auto-save</span>
                                        <Button size="sm" variant="outline" className="border-gray-700">
                                            <Settings className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Live reload</span>
                                        <Badge className="bg-green-600 text-white">ON</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Public project</span>
                                        <Badge variant="outline">Private</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}