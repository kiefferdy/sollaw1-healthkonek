"use client";

import dynamic from "next/dynamic";
import {
    Heart,
    ThermometerSun,
    Activity,
    Glasses,
    Footprints,
    Sun,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight } from "lucide-react";

const MainLayout = dynamic(() => import("@/components/layout/MainLayout"), {
    ssr: false,
});

export default function Dashboard() {
    return (
        <MainLayout title="Dashboard">
            <div className="mb-8">
                <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Monday, February 12, 2025
                </h2>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Welcome back, Juan!
                </h3>
            </div>

            {/* IoT Device Data Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Smartwatch Data */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <CardTitle>Smartwatch Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                <Heart className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Heart Rate
                                </p>
                                <p className="text-xl font-medium text-gray-900 dark:text-white">
                                    78 BPM
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center mt-4 space-x-4">
                            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <ThermometerSun className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Body Temperature
                                </p>
                                <p className="text-xl font-medium text-gray-900 dark:text-white">
                                    36.6°C
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center mt-4 space-x-4">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <Footprints className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Steps
                                </p>
                                <p className="text-xl font-medium text-gray-900 dark:text-white">
                                    6,000 Steps
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" fullWidth>
                            View More Data
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </CardFooter>
                </Card>

                {/* Spectacles (for eye health or vision data) */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <CardTitle>Spectacles Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <Glasses className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Eye Health
                                </p>
                                <p className="text-xl font-medium text-gray-900 dark:text-white">
                                    Clear Vision
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center mt-4 space-x-4">
                            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <Sun className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    UV Exposure
                                </p>
                                <p className="text-xl font-medium text-gray-900 dark:text-white">
                                    Moderate
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" fullWidth>
                            View Spectacle Data
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </CardFooter>
                </Card>

                {/* Blood Pressure Monitor Data */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <CardTitle>Blood Pressure Monitor Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <Activity className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Blood Pressure
                                </p>
                                <p className="text-xl font-medium text-gray-900 dark:text-white">
                                    120/80 mmHg
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" fullWidth>
                            View BP Data
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </MainLayout>
    );
}
