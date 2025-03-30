"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
    Calendar,
    Clock,
    Activity,
    Heart,
    ThermometerSun,
    ArrowRight,
    FileText,
    Pill,
    MessageSquare,
    ChevronRight,
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
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

const MainLayout = dynamic(() => import("@/components/layout/MainLayout"), {
    ssr: false,
});

// Sample data for charts
const healthData = [
    { date: "01/15", heartRate: 78, bloodPressure: 120, steps: 6000 },
    { date: "01/16", heartRate: 72, bloodPressure: 118, steps: 8000 },
    { date: "01/17", heartRate: 75, bloodPressure: 122, steps: 7500 },
    { date: "01/18", heartRate: 80, bloodPressure: 125, steps: 5000 },
    { date: "01/19", heartRate: 76, bloodPressure: 119, steps: 9000 },
    { date: "01/20", heartRate: 73, bloodPressure: 121, steps: 8500 },
    { date: "01/21", heartRate: 77, bloodPressure: 123, steps: 7000 },
];

export default function Dashboard() {
    const today = new Date();
    const formattedDate = format(today, "EEEE, MMMM d, yyyy");

    return (
        <MainLayout title="Dashboard">
            <div className="mb-8">
                <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {formattedDate}
                </h2>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Welcome back, Juan!
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Upcoming Appointment */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Next Appointment</CardTitle>
                            <Badge variant="primary" rounded>
                                Today
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start mb-4">
                            <div className="flex-shrink-0 mr-4">
                                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                                    <Calendar className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                    Dr. Maria Santos
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Cardiologist
                                </p>
                                <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>2:00 PM - 2:30 PM</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href="/appointments">
                            <Button variant="outline" fullWidth>
                                View All Appointments
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Health Stats */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <CardTitle>Health Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                                    <Heart className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Heart Rate
                                    </p>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        78 BPM
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                                    <Activity className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Blood Pressure
                                    </p>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        120/80 mmHg
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-3">
                                    <ThermometerSun className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Body Temperature
                                    </p>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        36.6°C
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full gap-8">
                            <Link href="/records">
                                <Button variant="outline" fullWidth>
                                    View Health Records
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                            <Link href="/wearable-devices">
                                <Button variant="outline" fullWidth>
                                    Wearable-Devices
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

                {/* Medication Schedule */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <CardTitle>Today's Medications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Metformin
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            500mg - 1 tablet
                                        </p>
                                    </div>
                                    <Badge variant="success" rounded>
                                        Taken
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    8:00 AM - After breakfast
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Losartan
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            50mg - 1 tablet
                                        </p>
                                    </div>
                                    <Badge variant="warning" rounded>
                                        Upcoming
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    8:00 PM - After dinner
                                </p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Atorvastatin
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            20mg - 1 tablet
                                        </p>
                                    </div>
                                    <Badge variant="warning" rounded>
                                        Upcoming
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    8:00 PM - After dinner
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href="/pharmacy">
                            <Button variant="outline" fullWidth>
                                View All Medications
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>

            {/* Health Trends */}
            <div className="mb-6">
                <Card variant="default">
                    <CardHeader>
                        <CardTitle>Health Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={healthData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e5e7eb"
                                        className="dark:stroke-gray-700"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#6b7280"
                                        className="dark:text-gray-400"
                                        tick={{ fill: "currentColor" }}
                                    />
                                    <YAxis
                                        stroke="#6b7280"
                                        className="dark:text-gray-400"
                                        tick={{ fill: "currentColor" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "var(--bg-color)",
                                            borderColor: "var(--border-color)",
                                            color: "var(--text-color)",
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="heartRate"
                                        stroke="#ef4444"
                                        activeDot={{ r: 8 }}
                                        name="Heart Rate (BPM)"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="bloodPressure"
                                        stroke="#3b82f6"
                                        name="Blood Pressure (Systolic)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="h-80 mt-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={healthData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e5e7eb"
                                        className="dark:stroke-gray-700"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#6b7280"
                                        className="dark:text-gray-400"
                                        tick={{ fill: "currentColor" }}
                                    />
                                    <YAxis
                                        stroke="#6b7280"
                                        className="dark:text-gray-400"
                                        tick={{ fill: "currentColor" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "var(--bg-color)",
                                            borderColor: "var(--border-color)",
                                            color: "var(--text-color)",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="steps"
                                        stroke="#10b981"
                                        fill="#d1fae5"
                                        className="dark:fill-green-900/30"
                                        name="Daily Steps"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/appointments" className="block">
                        <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all">
                            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary mb-3">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Book Appointment
                            </p>
                        </div>
                    </Link>
                    <Link href="/messages" className="block">
                        <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all">
                            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary mb-3">
                                <MessageSquare className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Message Doctor
                            </p>
                        </div>
                    </Link>
                    <Link href="/symptom-checker" className="block">
                        <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all">
                            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary mb-3">
                                <ThermometerSun className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Symptom Checker
                            </p>
                        </div>
                    </Link>
                    <Link href="/pharmacy" className="block">
                        <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all">
                            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary mb-3">
                                <Pill className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Order Medication
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Activities */}
            <div>
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                    Recent Activities
                </h3>
                <Card variant="default">
                    <CardContent className="px-0 py-0">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            <div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Lab Results Uploaded
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Complete Blood Count (CBC) results are
                                        now available
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    2 hours ago
                                </p>
                            </div>
                            <div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                                    <Pill className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Prescription Filled
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Your prescription for Metformin has been
                                        filled
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    Yesterday
                                </p>
                            </div>
                            <div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                                    <MessageSquare className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Doctor's Message
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Dr. Santos sent you a message about your
                                        treatment plan
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    2 days ago
                                </p>
                            </div>
                            <div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-3">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Appointment Completed
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Follow-up consultation with Dr. Reyes
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    3 days ago
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 dark:border-gray-700">
                        <Button
                            variant="ghost"
                            fullWidth
                            className="text-primary"
                        >
                            View All Activities
                            <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </MainLayout>
    );
}
