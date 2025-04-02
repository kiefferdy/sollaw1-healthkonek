"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
    Heart,
    ThermometerSun,
    Activity,
    Glasses,
    Footprints,
    Sun,
    Watch,
    PlusCircle,
    Settings,
    AlertCircle,
    MoreHorizontal,
    ChevronRight,
    Trash2,
    MoreVertical,
    Zap,
    BatteryMedium,
    ChevronDown,
    History,
    ArrowDownToLine
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const MainLayout = dynamic(() => import("@/components/layout/MainLayout"), {
    ssr: false,
});

export default function WearableDevicesPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <MainLayout title="Wearable Devices">
            <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                    Monitor and manage your connected health devices
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="devices">My Devices</TabsTrigger>
                    <TabsTrigger value="data">Health Data</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    {/* Device Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card variant="default" hoverEffect>
                            <CardContent className="p-4 flex flex-col items-center justify-center">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                                    <Watch className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">3</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Active Devices
                                </p>
                            </CardContent>
                        </Card>

                        <Card variant="default" hoverEffect>
                            <CardContent className="p-4 flex flex-col items-center justify-center">
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                                    <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">7 days</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Avg. Battery Life
                                </p>
                            </CardContent>
                        </Card>

                        <Card variant="default" hoverEffect>
                            <CardContent className="p-4 flex flex-col items-center justify-center">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                                    <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">15 min</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Last Data Sync
                                </p>
                            </CardContent>
                        </Card>

                        <Card variant="default" hoverEffect>
                            <CardContent className="p-4 flex flex-col items-center justify-center">
                                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-3">
                                    <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">1</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Alerts
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Latest Health Data */}
                    <Card variant="default">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Latest Health Data</CardTitle>
                                <div className="flex space-x-2 items-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: 15 minutes ago</span>
                                    <Button variant="ghost" size="sm">
                                        <ArrowDownToLine className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                        <Heart className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Heart Rate
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-xl font-medium text-gray-900 dark:text-white mr-2">
                                                78 BPM
                                            </p>
                                            <Badge variant="success" rounded>Normal</Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Range: 60-100 BPM
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Activity className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Blood Pressure
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-xl font-medium text-gray-900 dark:text-white mr-2">
                                                120/80 mmHg
                                            </p>
                                            <Badge variant="success" rounded>Normal</Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Optimal: Below 120/80
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                        <ThermometerSun className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Body Temperature
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-xl font-medium text-gray-900 dark:text-white mr-2">
                                                36.6°C
                                            </p>
                                            <Badge variant="success" rounded>Normal</Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Normal: 36.1-37.2°C
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                        <Footprints className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Steps
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-xl font-medium text-gray-900 dark:text-white mr-2">
                                                6,243
                                            </p>
                                            <Badge variant="warning" rounded>75%</Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Goal: 8,000 steps
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                        <Glasses className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Eye Health
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-xl font-medium text-gray-900 dark:text-white mr-2">
                                                Clear Vision
                                            </p>
                                            <Badge variant="success" rounded>Good</Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Last check: 2 hours ago
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <Sun className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            UV Exposure
                                        </p>
                                        <div className="flex items-center">
                                            <p className="text-xl font-medium text-gray-900 dark:text-white mr-2">
                                                Moderate
                                            </p>
                                            <Badge variant="warning" rounded>Moderate</Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Limit outdoor time
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" fullWidth>
                                View Detailed Health Report
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </CardFooter>
                    </Card>
                    
                    {/* Quick Actions */}
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Button variant="outline" className="flex flex-col h-24 px-4">
                                    <PlusCircle className="h-6 w-6 mb-2" />
                                    <span>Add Device</span>
                                </Button>
                                <Button variant="outline" className="flex flex-col h-24 px-4">
                                    <Settings className="h-6 w-6 mb-2" />
                                    <span>Device Settings</span>
                                </Button>
                                <Button variant="outline" className="flex flex-col h-24 px-4">
                                    <History className="h-6 w-6 mb-2" />
                                    <span>View History</span>
                                </Button>
                                <Button variant="outline" className="flex flex-col h-24 px-4">
                                    <Heart className="h-6 w-6 mb-2" />
                                    <span>Health Goals</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Health Alerts */}
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Health Alerts</CardTitle>
                            <CardDescription>
                                Important updates from your connected devices
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                    <div className="flex items-start">
                                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
                                        <div>
                                            <h4 className="font-medium text-yellow-800 dark:text-yellow-300">
                                                High UV Exposure Detected
                                            </h4>
                                            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                                                Your spectacles have detected high UV exposure over the last 2 hours. Consider moving indoors or using sun protection.
                                            </p>
                                            <div className="mt-3 flex">
                                                <Button variant="outline" size="sm">Dismiss</Button>
                                                <Button variant="ghost" size="sm" className="ml-2">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                {/* My Devices Tab */}
                <TabsContent value="devices" className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Connected Devices</h3>
                        <Button variant="primary" size="sm" icon={<PlusCircle className="h-4 w-4" />}>
                            Add New Device
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {/* Smartwatch */}
                        <Card variant="default">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                                            <Watch className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Apple Watch Series 7
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Connected • Last synced: 15 minutes ago
                                            </p>
                                            <div className="flex items-center mt-1 space-x-2">
                                                <Badge variant="success" rounded>Active</Badge>
                                                <div className="flex items-center text-green-600 dark:text-green-400">
                                                    <BatteryMedium className="h-4 w-4 mr-1" />
                                                    <span className="text-xs">85%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                        <Button variant="outline" size="sm">Sync Now</Button>
                                        <Button variant="outline" size="sm">Settings</Button>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button variant="ghost" size="sm" className="flex items-center text-gray-500 dark:text-gray-400">
                                        <span className="mr-1">Show Health Data</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Smart Glasses */}
                        <Card variant="default">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-4">
                                            <Glasses className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Smart Spectacles Pro
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Connected • Last synced: 30 minutes ago
                                            </p>
                                            <div className="flex items-center mt-1 space-x-2">
                                                <Badge variant="success" rounded>Active</Badge>
                                                <div className="flex items-center text-green-600 dark:text-green-400">
                                                    <BatteryMedium className="h-4 w-4 mr-1" />
                                                    <span className="text-xs">72%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                        <Button variant="outline" size="sm">Sync Now</Button>
                                        <Button variant="outline" size="sm">Settings</Button>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button variant="ghost" size="sm" className="flex items-center text-gray-500 dark:text-gray-400">
                                        <span className="mr-1">Show Health Data</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Blood Pressure Monitor */}
                        <Card variant="default">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                                            <Activity className="h-8 w-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Blood Pressure Monitor
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Connected • Last synced: Yesterday
                                            </p>
                                            <div className="flex items-center mt-1 space-x-2">
                                                <Badge variant="success" rounded>Active</Badge>
                                                <div className="flex items-center text-green-600 dark:text-green-400">
                                                    <BatteryMedium className="h-4 w-4 mr-1" />
                                                    <span className="text-xs">64%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                        <Button variant="outline" size="sm">Sync Now</Button>
                                        <Button variant="outline" size="sm">Settings</Button>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button variant="ghost" size="sm" className="flex items-center text-gray-500 dark:text-gray-400">
                                        <span className="mr-1">Show Health Data</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg mt-6">
                        <div className="flex flex-col items-center justify-center py-6">
                            <PlusCircle className="h-10 w-10 text-gray-400 dark:text-gray-600 mb-3" />
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Connect a New Device
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4 max-w-md">
                                Add a new wearable or health monitoring device to track more health metrics and get a complete view of your wellbeing.
                            </p>
                            <Button variant="primary">Add Device</Button>
                        </div>
                    </div>
                </TabsContent>

                {/* Health Data Tab */}
                <TabsContent value="data" className="space-y-6">
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Health Data Overview</CardTitle>
                            <CardDescription>
                                Comprehensive view of your health metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Select a metric to view detailed data and trends
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Button variant="outline" className="flex justify-between items-center py-4 h-auto">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                                            <Heart className="h-5 w-5" />
                                        </div>
                                        <span>Heart Rate</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Button>
                                
                                <Button variant="outline" className="flex justify-between items-center py-4 h-auto">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <span>Blood Pressure</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Button>
                                
                                <Button variant="outline" className="flex justify-between items-center py-4 h-auto">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                                            <Footprints className="h-5 w-5" />
                                        </div>
                                        <span>Steps & Activity</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Button>
                                
                                <Button variant="outline" className="flex justify-between items-center py-4 h-auto">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3">
                                            <ThermometerSun className="h-5 w-5" />
                                        </div>
                                        <span>Body Temperature</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Button>
                                
                                <Button variant="outline" className="flex justify-between items-center py-4 h-auto">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-3">
                                            <Glasses className="h-5 w-5" />
                                        </div>
                                        <span>Eye Health</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Button>
                                
                                <Button variant="outline" className="flex justify-between items-center py-4 h-auto">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                                            <Sun className="h-5 w-5" />
                                        </div>
                                        <span>UV Exposure</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" fullWidth>
                                Export Health Data
                                <ArrowDownToLine className="h-4 w-4 ml-2" />
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* History Tab */}
                <TabsContent value="history" className="space-y-6">
                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Device History & Activity</CardTitle>
                            <CardDescription>
                                Review your device usage and data history
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                                            <Watch className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Apple Watch Series 7</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Today, 10:30 AM • Heart rate measurement
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                                
                                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-3">
                                            <Glasses className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Smart Spectacles Pro</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Today, 9:45 AM • High UV exposure alert
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                                
                                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                                            <Watch className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Apple Watch Series 7</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Today, 8:15 AM • Step count update
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                                
                                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Blood Pressure Monitor</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Yesterday, 9:30 PM • Blood pressure reading
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                                
                                <div className="flex justify-between items-center p-4">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                                            <Watch className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Apple Watch Series 7</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Yesterday, 6:15 PM • Device connected
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" fullWidth>
                                View All Activity
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </MainLayout>
    );
}
