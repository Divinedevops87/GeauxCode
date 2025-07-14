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
    Brain, 
    Eye, 
    Upload, 
    Download, 
    Play, 
    Settings, 
    Activity,
    Zap,
    FileImage,
    Code,
    Database,
    Globe,
    Cpu,
    BarChart3
} from 'lucide-react';

interface AIModel {
    id: string;
    name: string;
    type: 'face-recognition' | 'object-detection' | 'text-analysis' | 'custom';
    status: 'training' | 'ready' | 'error';
    accuracy: number;
    lastTrained: string;
}

export function AIStudio() {
    const [activeTab, setActiveTab] = useState('face-recognition');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [models] = useState<AIModel[]>([
        {
            id: '1',
            name: 'Face Recognition Model',
            type: 'face-recognition',
            status: 'ready',
            accuracy: 94.2,
            lastTrained: '2024-01-15'
        },
        {
            id: '2',
            name: 'Object Detection Model',
            type: 'object-detection',
            status: 'training',
            accuracy: 87.8,
            lastTrained: '2024-01-14'
        },
        {
            id: '3',
            name: 'Sentiment Analysis',
            type: 'text-analysis',
            status: 'ready',
            accuracy: 91.5,
            lastTrained: '2024-01-13'
        }
    ]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!selectedImage) return;
        
        setIsAnalyzing(true);
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setAnalysisResult({
            faces: [
                { confidence: 0.95, age: 28, emotion: 'happy', gender: 'female' },
                { confidence: 0.89, age: 32, emotion: 'neutral', gender: 'male' }
            ],
            objects: [
                { type: 'person', confidence: 0.98, count: 2 },
                { type: 'building', confidence: 0.87, count: 1 }
            ]
        });
        setIsAnalyzing(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready': return 'bg-green-500';
            case 'training': return 'bg-yellow-500';
            case 'error': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    AI Wrapper Studio
                </h1>
                <p className="text-gray-400 mt-2">
                    Advanced AI tools for face recognition, custom models, and API management
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Panel */}
                <div className="lg:col-span-2">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-400" />
                                AI Processing Studio
                            </CardTitle>
                            <CardDescription>
                                Upload and analyze content with advanced AI models
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                                    <TabsTrigger value="face-recognition" className="data-[state=active]:bg-purple-600">
                                        Face Recognition
                                    </TabsTrigger>
                                    <TabsTrigger value="object-detection" className="data-[state=active]:bg-purple-600">
                                        Object Detection
                                    </TabsTrigger>
                                    <TabsTrigger value="text-analysis" className="data-[state=active]:bg-purple-600">
                                        Text Analysis
                                    </TabsTrigger>
                                    <TabsTrigger value="custom-models" className="data-[state=active]:bg-purple-600">
                                        Custom Models
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="face-recognition" className="space-y-4">
                                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                                        {selectedImage ? (
                                            <div className="space-y-4">
                                                <img src={selectedImage} alt="Upload" className="max-w-full max-h-64 mx-auto rounded-lg" />
                                                <Button 
                                                    onClick={analyzeImage} 
                                                    disabled={isAnalyzing}
                                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                                >
                                                    {isAnalyzing ? (
                                                        <>
                                                            <Activity className="w-4 h-4 mr-2 animate-spin" />
                                                            Analyzing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            Analyze Image
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <FileImage className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                                <p className="text-gray-400 mb-4">Upload an image for face recognition analysis</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    id="image-upload"
                                                />
                                                <label htmlFor="image-upload">
                                                    <Button className="bg-purple-600 hover:bg-purple-700 cursor-pointer">
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        Upload Image
                                                    </Button>
                                                </label>
                                            </div>
                                        )}
                                    </div>

                                    {analysisResult && (
                                        <Card className="bg-gray-800 border-gray-700">
                                            <CardHeader>
                                                <CardTitle className="text-white text-lg">Analysis Results</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-white font-medium mb-2">Detected Faces ({analysisResult.faces.length})</h4>
                                                        {analysisResult.faces.map((face: any, index: number) => (
                                                            <div key={index} className="bg-gray-900 p-3 rounded-lg">
                                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                                    <span className="text-gray-400">Confidence: <span className="text-green-400">{(face.confidence * 100).toFixed(1)}%</span></span>
                                                                    <span className="text-gray-400">Age: <span className="text-white">{face.age}</span></span>
                                                                    <span className="text-gray-400">Emotion: <span className="text-blue-400">{face.emotion}</span></span>
                                                                    <span className="text-gray-400">Gender: <span className="text-pink-400">{face.gender}</span></span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-medium mb-2">Detected Objects</h4>
                                                        {analysisResult.objects.map((obj: any, index: number) => (
                                                            <div key={index} className="bg-gray-900 p-3 rounded-lg flex justify-between items-center">
                                                                <span className="text-white">{obj.type}</span>
                                                                <div className="flex gap-2">
                                                                    <Badge variant="secondary">Count: {obj.count}</Badge>
                                                                    <Badge variant="outline">{(obj.confidence * 100).toFixed(1)}%</Badge>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </TabsContent>

                                <TabsContent value="object-detection" className="space-y-4">
                                    <div className="text-center p-8 bg-gray-800 rounded-lg">
                                        <Cpu className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                                        <h3 className="text-white text-lg mb-2">Object Detection Model</h3>
                                        <p className="text-gray-400 mb-4">Detect and classify objects in images with high accuracy</p>
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload Image for Object Detection
                                        </Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="text-analysis" className="space-y-4">
                                    <div>
                                        <Label htmlFor="text-input" className="text-gray-300">Text to Analyze</Label>
                                        <Textarea
                                            id="text-input"
                                            placeholder="Enter text for sentiment analysis, entity recognition, or topic modeling..."
                                            className="bg-gray-800 border-gray-700 text-white min-h-32"
                                        />
                                    </div>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        <BarChart3 className="w-4 h-4 mr-2" />
                                        Analyze Text
                                    </Button>
                                </TabsContent>

                                <TabsContent value="custom-models" className="space-y-4">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="model-name" className="text-gray-300">Model Name</Label>
                                            <Input
                                                id="model-name"
                                                placeholder="My Custom AI Model"
                                                className="bg-gray-800 border-gray-700 text-white"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="model-type" className="text-gray-300">Model Type</Label>
                                            <Select>
                                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                                    <SelectValue placeholder="Select model type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-gray-800 border-gray-700">
                                                    <SelectItem value="classification">Image Classification</SelectItem>
                                                    <SelectItem value="detection">Object Detection</SelectItem>
                                                    <SelectItem value="segmentation">Image Segmentation</SelectItem>
                                                    <SelectItem value="nlp">Natural Language Processing</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                            <Play className="w-4 h-4 mr-2" />
                                            Train Custom Model
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Models Panel */}
                <div className="space-y-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Database className="w-5 h-5 text-blue-400" />
                                Available Models
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {models.map((model) => (
                                    <div key={model.id} className="p-3 bg-gray-800 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-white font-medium text-sm">{model.name}</h4>
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(model.status)}`} />
                                        </div>
                                        <div className="text-xs text-gray-400 space-y-1">
                                            <div>Accuracy: <span className="text-green-400">{model.accuracy}%</span></div>
                                            <div>Status: <span className="text-blue-400">{model.status}</span></div>
                                            <div>Last trained: {model.lastTrained}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Globe className="w-5 h-5 text-green-400" />
                                API Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
                                    <div className="flex items-center gap-2">
                                        <Code className="w-4 h-4 text-blue-400" />
                                        <span className="text-white text-sm">REST API</span>
                                    </div>
                                    <Badge variant="secondary" className="text-xs bg-green-600">Active</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-yellow-400" />
                                        <span className="text-white text-sm">GraphQL</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">Available</Badge>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-gray-800 rounded">
                                    <div className="flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-purple-400" />
                                        <span className="text-white text-sm">Webhooks</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">Configured</Badge>
                                </div>
                            </div>
                            
                            <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                                <Settings className="w-4 h-4 mr-2" />
                                Manage APIs
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}