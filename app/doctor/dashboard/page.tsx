"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
    Calendar,
    Clock,
    FileText,
    User,
    Stethoscope,
    Pill,
    MessageSquare,
    ChevronRight,
    ArrowRight,
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
import { format } from "date-fns";
import DoctorLayout from "@/app/components/layout/DoctorLayout";

const MainLayout = dynamic(() => import("@/components/layout/MainLayout"), {
    ssr: false,
});

export default function DoctorDashboard() {
    const today = new Date();
    const formattedDate = format(today, "EEEE, MMMM d, yyyy");

    return (
        <DoctorLayout title="Doctor Dashboard">
            <div className="mb-8">
                <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {formattedDate}
                </h2>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Welcome back, Dr. Derek!
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Upcoming Appointments */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Upcoming Appointments</CardTitle>
                            <Badge variant="primary" rounded>
                                Today
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Juan Dela Cruz
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Diabetes follow-up
                                        </p>
                                    </div>
                                    <Badge variant="success" rounded>
                                        2:00 PM
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            Maria Lopez
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Hypertension consultation
                                        </p>
                                    </div>
                                    <Badge variant="warning" rounded>
                                        3:30 PM
                                    </Badge>
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

                {/* Recent Patient Activity */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <CardTitle>Recent Patient Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        New Lab Result
                                    </p>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        Juan Dela Cruz - CBC Test
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                                    <MessageSquare className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        New Patient Message
                                    </p>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        Maria Lopez - Follow-up question
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href="/patients">
                            <Button variant="outline" fullWidth>
                                View Patient Records
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Pending Prescriptions */}
                <Card variant="default" hoverEffect>
                    <CardHeader>
                        <CardTitle>Pending Prescriptions</CardTitle>
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
                                            Juan Dela Cruz
                                        </p>
                                    </div>
                                    <Badge variant="warning" rounded>
                                        Needs Approval
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href="/prescriptions">
                            <Button variant="outline" fullWidth>
                                Approve Prescriptions
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/patients">
                        <Button variant="outline" fullWidth>
                            View Patients
                            <Stethoscope className="h-5 w-5 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/messages">
                        <Button variant="outline" fullWidth>
                            Message Patients
                            <MessageSquare className="h-5 w-5 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/lab-results">
                        <Button variant="outline" fullWidth>
                            Lab Results
                            <FileText className="h-5 w-5 ml-2" />
                        </Button>
                    </Link>
                    <Link href="/prescriptions">
                        <Button variant="outline" fullWidth>
                            Prescriptions
                            <Pill className="h-5 w-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </DoctorLayout>
    );
}
