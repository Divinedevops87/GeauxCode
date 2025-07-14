'use client';

import { useState } from 'react';
import { Button } from '@onlook/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@onlook/ui/card';
import { Input } from '@onlook/ui/input';
import { Badge } from '@onlook/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@onlook/ui/tabs';
import { 
    FolderOpen, 
    File, 
    Search, 
    Upload, 
    Download, 
    Plus,
    Trash2,
    Edit,
    Copy,
    Move,
    Eye,
    FileText,
    FileImage,
    FileVideo,
    FileAudio,
    Archive,
    Code,
    Folder,
    ArrowLeft,
    Grid,
    List,
    SortAsc,
    Filter,
    Star,
    Share,
    MoreHorizontal
} from 'lucide-react';

interface FileItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    size: number;
    modified: string;
    extension?: string;
    starred: boolean;
    path: string;
}

interface BreadcrumbItem {
    name: string;
    path: string;
}

export function FileManager() {
    const [currentPath, setCurrentPath] = useState('/projects');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [sortBy, setSortBy] = useState<'name' | 'size' | 'modified'>('name');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const [files] = useState<FileItem[]>([
        {
            id: '1',
            name: 'src',
            type: 'folder',
            size: 0,
            modified: '2024-01-15 14:30',
            starred: false,
            path: '/projects/src'
        },
        {
            id: '2',
            name: 'components',
            type: 'folder',
            size: 0,
            modified: '2024-01-15 12:45',
            starred: true,
            path: '/projects/components'
        },
        {
            id: '3',
            name: 'package.json',
            type: 'file',
            size: 2048,
            modified: '2024-01-15 10:20',
            extension: 'json',
            starred: false,
            path: '/projects/package.json'
        },
        {
            id: '4',
            name: 'README.md',
            type: 'file',
            size: 4096,
            modified: '2024-01-14 16:15',
            extension: 'md',
            starred: true,
            path: '/projects/README.md'
        },
        {
            id: '5',
            name: 'app.tsx',
            type: 'file',
            size: 8192,
            modified: '2024-01-14 14:22',
            extension: 'tsx',
            starred: false,
            path: '/projects/app.tsx'
        },
        {
            id: '6',
            name: 'styles.css',
            type: 'file',
            size: 3072,
            modified: '2024-01-13 11:10',
            extension: 'css',
            starred: false,
            path: '/projects/styles.css'
        },
        {
            id: '7',
            name: 'assets',
            type: 'folder',
            size: 0,
            modified: '2024-01-12 09:30',
            starred: false,
            path: '/projects/assets'
        },
        {
            id: '8',
            name: 'demo.mp4',
            type: 'file',
            size: 25600000,
            modified: '2024-01-10 15:45',
            extension: 'mp4',
            starred: false,
            path: '/projects/demo.mp4'
        }
    ]);

    const breadcrumbs: BreadcrumbItem[] = currentPath.split('/').filter(Boolean).reduce((acc, part, index, array) => {
        const path = '/' + array.slice(0, index + 1).join('/');
        acc.push({ name: part, path });
        return acc;
    }, [{ name: 'Root', path: '/' }] as BreadcrumbItem[]);

    const getFileIcon = (item: FileItem) => {
        if (item.type === 'folder') {
            return <Folder className="w-4 h-4 text-blue-400" />;
        }

        switch (item.extension) {
            case 'js':
            case 'ts':
            case 'jsx':
            case 'tsx':
            case 'py':
            case 'java':
            case 'cpp':
                return <Code className="w-4 h-4 text-green-400" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
                return <FileImage className="w-4 h-4 text-purple-400" />;
            case 'mp4':
            case 'avi':
            case 'mov':
                return <FileVideo className="w-4 h-4 text-red-400" />;
            case 'mp3':
            case 'wav':
            case 'flac':
                return <FileAudio className="w-4 h-4 text-orange-400" />;
            case 'zip':
            case 'rar':
            case 'tar':
            case 'gz':
                return <Archive className="w-4 h-4 text-yellow-400" />;
            case 'txt':
            case 'md':
            case 'json':
            case 'xml':
                return <FileText className="w-4 h-4 text-gray-400" />;
            default:
                return <File className="w-4 h-4 text-gray-400" />;
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '-';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const filteredFiles = files.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedFiles = [...filteredFiles].sort((a, b) => {
        // Folders first
        if (a.type !== b.type) {
            return a.type === 'folder' ? -1 : 1;
        }

        switch (sortBy) {
            case 'size':
                return b.size - a.size;
            case 'modified':
                return new Date(b.modified).getTime() - new Date(a.modified).getTime();
            default:
                return a.name.localeCompare(b.name);
        }
    });

    const toggleSelection = (itemId: string) => {
        setSelectedItems(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const toggleStar = (itemId: string) => {
        // In a real app, this would update the backend
        console.log('Toggle star for item:', itemId);
    };

    const navigateToPath = (path: string) => {
        setCurrentPath(path);
        setSelectedItems([]);
    };

    const createNewFolder = () => {
        const name = prompt('Enter folder name:');
        if (name) {
            // In a real app, this would create the folder
            console.log('Create folder:', name);
        }
    };

    const deleteSelected = () => {
        if (selectedItems.length > 0 && confirm(`Delete ${selectedItems.length} items?`)) {
            // In a real app, this would delete the items
            console.log('Delete items:', selectedItems);
            setSelectedItems([]);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                    File Manager
                </h1>
                <p className="text-gray-400 mt-2">
                    Complete file management with navigation, search, upload, and organization
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main File Browser */}
                <div className="lg:col-span-3">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => navigateToPath('/projects')}
                                        className="border-gray-700"
                                    >
                                        <ArrowLeft className="w-3 h-3 mr-1" />
                                        Back
                                    </Button>
                                    <div className="flex items-center gap-1 text-sm">
                                        {breadcrumbs.map((crumb, index) => (
                                            <div key={index} className="flex items-center gap-1">
                                                {index > 0 && <span className="text-gray-500">/</span>}
                                                <button
                                                    onClick={() => navigateToPath(crumb.path)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    {crumb.name}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant={viewMode === 'list' ? 'default' : 'outline'}
                                        onClick={() => setViewMode('list')}
                                        className={viewMode === 'list' ? 'bg-purple-600' : 'border-gray-700'}
                                    >
                                        <List className="w-3 h-3" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                                        onClick={() => setViewMode('grid')}
                                        className={viewMode === 'grid' ? 'bg-purple-600' : 'border-gray-700'}
                                    >
                                        <Grid className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* Toolbar */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search files and folders..."
                                            className="pl-10 bg-gray-800 border-gray-700 text-white w-64"
                                        />
                                    </div>
                                    
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as any)}
                                        className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 text-sm"
                                    >
                                        <option value="name">Sort by Name</option>
                                        <option value="size">Sort by Size</option>
                                        <option value="modified">Sort by Modified</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    {selectedItems.length > 0 && (
                                        <>
                                            <Badge variant="secondary">{selectedItems.length} selected</Badge>
                                            <Button size="sm" variant="outline" className="border-gray-700">
                                                <Download className="w-3 h-3 mr-1" />
                                                Download
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={deleteSelected}
                                                className="border-red-700 hover:bg-red-800"
                                            >
                                                <Trash2 className="w-3 h-3 mr-1" />
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                    
                                    <Button onClick={createNewFolder} size="sm" className="bg-purple-600 hover:bg-purple-700">
                                        <Plus className="w-3 h-3 mr-1" />
                                        New Folder
                                    </Button>
                                    <Button onClick={() => setShowUploadModal(true)} size="sm" className="bg-green-600 hover:bg-green-700">
                                        <Upload className="w-3 h-3 mr-1" />
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {viewMode === 'list' ? (
                                /* List View */
                                <div className="space-y-1">
                                    <div className="grid grid-cols-12 gap-2 text-xs text-gray-400 font-medium pb-2 border-b border-gray-700">
                                        <div className="col-span-1"></div>
                                        <div className="col-span-5">Name</div>
                                        <div className="col-span-2">Size</div>
                                        <div className="col-span-3">Modified</div>
                                        <div className="col-span-1">Actions</div>
                                    </div>
                                    
                                    {sortedFiles.map((item) => (
                                        <div 
                                            key={item.id}
                                            className={`grid grid-cols-12 gap-2 p-2 rounded hover:bg-gray-800 transition-colors ${
                                                selectedItems.includes(item.id) ? 'bg-purple-900/30' : ''
                                            }`}
                                        >
                                            <div className="col-span-1 flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => toggleSelection(item.id)}
                                                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-600"
                                                />
                                            </div>
                                            <div className="col-span-5 flex items-center gap-2">
                                                {getFileIcon(item)}
                                                <span 
                                                    className="text-white cursor-pointer hover:text-purple-400"
                                                    onClick={() => item.type === 'folder' && navigateToPath(item.path)}
                                                >
                                                    {item.name}
                                                </span>
                                                {item.starred && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
                                            </div>
                                            <div className="col-span-2 flex items-center text-gray-400 text-sm">
                                                {formatFileSize(item.size)}
                                            </div>
                                            <div className="col-span-3 flex items-center text-gray-400 text-sm">
                                                {item.modified}
                                            </div>
                                            <div className="col-span-1 flex items-center">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => toggleStar(item.id)}
                                                    className="p-1 h-6 w-6"
                                                >
                                                    <MoreHorizontal className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Grid View */
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {sortedFiles.map((item) => (
                                        <div 
                                            key={item.id}
                                            className={`p-4 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer ${
                                                selectedItems.includes(item.id) ? 'border-purple-500 bg-purple-900/20' : 'bg-gray-800'
                                            }`}
                                            onClick={() => toggleSelection(item.id)}
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div className="mb-2 p-2">
                                                    {React.cloneElement(getFileIcon(item), { className: 'w-8 h-8' })}
                                                </div>
                                                <span className="text-white text-sm font-medium truncate w-full">
                                                    {item.name}
                                                </span>
                                                <span className="text-gray-400 text-xs mt-1">
                                                    {formatFileSize(item.size)}
                                                </span>
                                                {item.starred && (
                                                    <Star className="w-3 h-3 text-yellow-400 fill-current mt-1" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {sortedFiles.length === 0 && (
                                <div className="text-center py-12">
                                    <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400">No files found</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-400" />
                                Quick Access
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {[
                                    { name: 'Recent Files', path: '/recent', icon: FileText },
                                    { name: 'Starred', path: '/starred', icon: Star },
                                    { name: 'Downloads', path: '/downloads', icon: Download },
                                    { name: 'Documents', path: '/documents', icon: FileText },
                                    { name: 'Images', path: '/images', icon: FileImage },
                                    { name: 'Videos', path: '/videos', icon: FileVideo }
                                ].map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => navigateToPath(item.path)}
                                        className="w-full flex items-center gap-2 p-2 text-left hover:bg-gray-800 rounded transition-colors"
                                    >
                                        <item.icon className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-300">{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Upload className="w-5 h-5 text-green-400" />
                                Storage Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-300">Used Space</span>
                                        <span className="text-white">2.4 GB / 10 GB</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Documents</span>
                                        <span className="text-white">1.2 GB</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Images</span>
                                        <span className="text-white">800 MB</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Videos</span>
                                        <span className="text-white">400 MB</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Share className="w-5 h-5 text-blue-400" />
                                File Operations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Files
                                </Button>
                                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Folder
                                </Button>
                                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                                    <Share className="w-4 h-4 mr-2" />
                                    Share Files
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Upload Modal (simplified) */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="bg-gray-900 border-gray-800 w-96">
                        <CardHeader>
                            <CardTitle className="text-white">Upload Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400 mb-4">Drop files here or click to browse</p>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    Select Files
                                </Button>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button 
                                    onClick={() => setShowUploadModal(false)}
                                    variant="outline" 
                                    className="flex-1 border-gray-700"
                                >
                                    Cancel
                                </Button>
                                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                    Upload
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}