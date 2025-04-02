"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
    Calendar as CalendarIcon,
    Clock,
    Video,
    Phone,
    Search,
    Filter,
    Plus,
    CheckCircle,
    X,
    ArrowRight,
    MessageCircle,
    Calendar as CalendarComponent,
    ChevronLeft,
    ChevronRight,
    User,
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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    format,
    isToday,
    isTomorrow,
    isThisWeek,
    addMinutes,
    parseISO,
    isSameDay,
    differenceInMinutes,
    addHours,
    addDays,
} from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const MainLayout = dynamic(() => import("@/components/layout/MainLayout"), {
    ssr: false,
});

type AppointmentStatus = "upcoming" | "completed" | "cancelled";
type AppointmentType = "video" | "phone";

interface Appointment {
    id: number;
    doctorName: string;
    doctorSpecialty: string;
    doctorImage: string;
    date: Date;
    duration: number; // in minutes
    type: AppointmentType;
    status: AppointmentStatus;
    notes?: string;
}

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    availableDates: string[]; // ISO strings
}

// Sample doctors data
const doctors: Doctor[] = [
    {
        id: 1,
        name: "Dr. Maria Santos",
        specialty: "Cardiologist",
        image: "/images/doctor-1.jpg",
        rating: 4.9,
        availableDates: [
            new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
            new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
            new Date(
                addDays(new Date(), 1).setHours(11, 0, 0, 0),
            ).toISOString(),
            new Date(
                addDays(new Date(), 1).setHours(15, 30, 0, 0),
            ).toISOString(),
            new Date(addDays(new Date(), 2).setHours(9, 0, 0, 0)).toISOString(),
        ],
    },
    {
        id: 2,
        name: "Dr. Jose Reyes",
        specialty: "Endocrinologist",
        image: "/images/doctor-2.jpg",
        rating: 4.7,
        availableDates: [
            new Date(
                addDays(new Date(), 1).setHours(10, 0, 0, 0),
            ).toISOString(),
            new Date(
                addDays(new Date(), 1).setHours(13, 0, 0, 0),
            ).toISOString(),
            new Date(
                addDays(new Date(), 3).setHours(14, 0, 0, 0),
            ).toISOString(),
        ],
    },
    {
        id: 3,
        name: "Dr. Ana Lim",
        specialty: "Dermatologist",
        image: "/images/doctor-3.jpg",
        rating: 4.8,
        availableDates: [
            new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
            new Date(
                addDays(new Date(), 2).setHours(13, 30, 0, 0),
            ).toISOString(),
            new Date(
                addDays(new Date(), 4).setHours(11, 0, 0, 0),
            ).toISOString(),
        ],
    },
    {
        id: 4,
        name: "Dr. Marco Cruz",
        specialty: "Neurologist",
        image: "/images/doctor-4.jpg",
        rating: 4.6,
        availableDates: [
            new Date(
                addDays(new Date(), 1).setHours(14, 30, 0, 0),
            ).toISOString(),
            new Date(
                addDays(new Date(), 2).setHours(10, 0, 0, 0),
            ).toISOString(),
            new Date(
                addDays(new Date(), 3).setHours(15, 0, 0, 0),
            ).toISOString(),
        ],
    },
];

const appointments: Appointment[] = [
    {
        id: 1,
        doctorName: "Dr. Bob Stevens",
        doctorSpecialty: "Cardiologist",
        doctorImage: "/images/doctor-1.jpg",
        date: new Date(new Date().setHours(14, 0, 0, 0)), // Today at 2:00 PM
        duration: 30,
        type: "video",
        status: "upcoming",
        notes: "Regular check-up and medication review.",
    },
    {
        id: 2,
        doctorName: "Dr. Jose Reyes",
        doctorSpecialty: "Endocrinologist",
        doctorImage: "/images/doctor-2.jpg",
        date: new Date(new Date().setDate(new Date().getDate() + 2)), // Day after tomorrow
        duration: 45,
        type: "video",
        status: "upcoming",
        notes: "Discuss latest lab results and adjust medication if needed.",
    },
    {
        id: 3,
        doctorName: "Dr. Ana Lim",
        doctorSpecialty: "Dermatologist",
        doctorImage: "/images/doctor-3.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
        duration: 30,
        type: "phone",
        status: "completed",
        notes: "Follow-up on skin condition and treatment effectiveness.",
    },
    {
        id: 4,
        doctorName: "Dr. Marco Cruz",
        doctorSpecialty: "Neurologist",
        doctorImage: "/images/doctor-4.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 10)), // 10 days ago
        duration: 60,
        type: "video",
        status: "completed",
        notes: "Comprehensive neurological assessment.",
    },
    {
        id: 5,
        doctorName: "Dr. Sofia Garcia",
        doctorSpecialty: "Pediatrician",
        doctorImage: "/images/doctor-5.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
        duration: 30,
        type: "phone",
        status: "cancelled",
        notes: "Routine check-up for child.",
    },
    // Additional past appointments
    {
        id: 6,
        doctorName: "Dr. James Wilson",
        doctorSpecialty: "Orthopedic Surgeon",
        doctorImage: "/images/doctor-1.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 15)), // 15 days ago
        duration: 45,
        type: "video",
        status: "completed",
        notes: "Post-surgery follow-up for knee replacement. Patient showing good progress with physical therapy.",
    },
    {
        id: 7,
        doctorName: "Dr. Elizabeth Chen",
        doctorSpecialty: "Psychiatrist",
        doctorImage: "/images/doctor-2.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days ago
        duration: 60,
        type: "video",
        status: "completed",
        notes: "Therapy session. Patient showing improvement with current medication regimen.",
    },
    {
        id: 8,
        doctorName: "Dr. Michael Patel",
        doctorSpecialty: "Ophthalmologist",
        doctorImage: "/images/doctor-4.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 20)), // 20 days ago
        duration: 30,
        type: "video",
        status: "completed",
        notes: "Annual eye examination. Prescription updated for reading glasses.",
    },
    // Additional cancelled appointments
    {
        id: 9,
        doctorName: "Dr. Maria Santos",
        doctorSpecialty: "Cardiologist",
        doctorImage: "/images/doctor-3.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
        duration: 30,
        type: "video",
        status: "cancelled",
        notes: "Routine heart check-up. Cancelled due to doctor's emergency.",
    },
    {
        id: 10,
        doctorName: "Dr. Carlos Rodriguez",
        doctorSpecialty: "Gastroenterologist",
        doctorImage: "/images/doctor-5.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 8)), // 8 days ago
        duration: 45,
        type: "phone",
        status: "cancelled",
        notes: "Follow-up on digestive issues. Cancelled by patient due to scheduling conflict.",
    },
    {
        id: 11,
        doctorName: "Dr. Sarah Johnson",
        doctorSpecialty: "Allergist",
        doctorImage: "/images/doctor-2.jpg",
        date: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
        duration: 30,
        type: "video",
        status: "cancelled",
        notes: "Seasonal allergy consultation. Rescheduled for next week.",
    },
    // Additional upcoming appointments
    {
        id: 12,
        doctorName: "Dr. David Williams",
        doctorSpecialty: "Pulmonologist",
        doctorImage: "/images/doctor-4.jpg",
        date: new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days from now
        duration: 45,
        type: "video",
        status: "upcoming",
        notes: "Respiratory assessment and treatment follow-up.",
    },
    {
        id: 13,
        doctorName: "Dr. Emily Taylor",
        doctorSpecialty: "Rheumatologist",
        doctorImage: "/images/doctor-3.jpg",
        date: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
        duration: 30,
        type: "phone",
        status: "upcoming",
        notes: "Joint pain consultation and medication review.",
    },
    // Multiple appointments on the same day (today)
    {
        id: 14,
        doctorName: "Dr. Robert Johnson",
        doctorSpecialty: "Neurologist",
        doctorImage: "/images/doctor-1.jpg",
        date: new Date(new Date().setHours(10, 0, 0, 0)), // Today at 10:00 AM
        duration: 40,
        type: "video",
        status: "upcoming",
        notes: "Follow-up on recent headaches and medication effectiveness.",
    },
    {
        id: 15,
        doctorName: "Dr. Alicia Gomez",
        doctorSpecialty: "Psychiatrist",
        doctorImage: "/images/doctor-5.jpg",
        date: new Date(new Date().setHours(13, 0, 0, 0)), // Today at 1:00 PM
        duration: 60,
        type: "video",
        status: "upcoming",
        notes: "Monthly therapy session and medication check.",
    },
];

// Custom component for the video call UI
const VideoCallUI = ({
    appointment,
    onEndCall,
}: {
    appointment: Appointment;
    onEndCall: () => void;
}) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-gray-900">
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                        {appointment.doctorName.split(" ")[1][0]}
                    </div>
                    <div>
                        <h3 className="text-white font-medium">
                            {appointment.doctorName}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {appointment.doctorSpecialty}
                        </p>
                    </div>
                </div>
                <div className="flex items-center text-white">
                    <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                        {formatTime(elapsedTime)}
                    </span>
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center relative">
                {/* Doctor's video (mock) */}
                <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                        <User size={80} className="mx-auto mb-4 opacity-30" />
                        <p className="text-xl">{appointment.doctorName}</p>
                        <p className="text-sm">
                            {isVideoOn ? "Video connected" : "Video off"}
                        </p>
                    </div>
                </div>

                {/* Self view */}
                <div className="absolute bottom-20 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600 shadow-lg">
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                            <User
                                size={32}
                                className="mx-auto mb-2 opacity-50"
                            />
                            <p className="text-xs">
                                You {isVideoOn ? "" : "(Video off)"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-900 flex justify-center items-center space-x-4">
                <button
                    className={`p-3 rounded-full ${
                        isMuted ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                    onClick={() => setIsMuted(!isMuted)}
                >
                    {isMuted ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    )}
                </button>

                <button
                    className={`p-3 rounded-full ${
                        isVideoOn
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-red-600"
                    }`}
                    onClick={() => setIsVideoOn(!isVideoOn)}
                >
                    {isVideoOn ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect
                                x="1"
                                y="5"
                                width="15"
                                height="14"
                                rx="2"
                                ry="2"
                            ></rect>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                            <path d="M13 16V8a4 4 0 0 1 4 4v0"></path>
                            <rect
                                x="1"
                                y="5"
                                width="12"
                                height="14"
                                rx="2"
                                ry="2"
                            ></rect>
                        </svg>
                    )}
                </button>

                <button
                    className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
                    onClick={() => {}}
                >
                    <MessageCircle className="text-white" />
                </button>

                <button
                    className="p-3 rounded-full bg-red-600 hover:bg-red-700"
                    onClick={onEndCall}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
                        <line x1="23" y1="1" x2="1" y2="23"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
};

// Custom component for the post-call summary
const PostCallSummary = ({
    appointment,
    onDismiss,
}: {
    appointment: Appointment;
    onDismiss: () => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Call Summary</CardTitle>
                    <CardDescription>
                        Your call with {appointment.doctorName} has ended
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                            {appointment.doctorImage ? (
                                <img
                                    src={appointment.doctorImage}
                                    alt={appointment.doctorName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                appointment.doctorName
                                    .split(" ")
                                    .map((name) => name[0])
                                    .join("")
                            )}
                        </div>
                        <div>
                            <h4 className="font-medium">
                                {appointment.doctorName}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {appointment.doctorSpecialty}
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-b border-gray-200 py-4 space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Date</span>
                            <span className="font-medium">
                                {format(appointment.date, "MMMM d, yyyy")}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Time</span>
                            <span className="font-medium">
                                {format(appointment.date, "h:mm a")} -{" "}
                                {format(
                                    addMinutes(
                                        appointment.date,
                                        appointment.duration,
                                    ),
                                    "h:mm a",
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Duration</span>
                            <span className="font-medium">30:15</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium mb-2">Doctor's Notes</h5>
                        <p className="text-gray-700 text-sm">
                            Patient reported improvement in symptoms. Continue
                            with current medication regimen. Schedule follow-up
                            appointment in 2 weeks to assess progress.
                        </p>
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            fullWidth
                            icon={<MessageCircle className="h-4 w-4" />}
                        >
                            Message
                        </Button>
                        <Button
                            variant="primary"
                            fullWidth
                            icon={<CalendarComponent className="h-4 w-4" />}
                        >
                            Book Follow-up
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="ghost" onClick={onDismiss}>
                        Close
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

// Component for scheduling new appointments
const BookAppointmentModal = ({
    isOpen,
    onClose,
    onBook,
}: {
    isOpen: boolean;
    onClose: () => void;
    onBook: (doctor: Doctor, date: Date, type: AppointmentType) => void;
}) => {
    const [step, setStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [appointmentType, setAppointmentType] =
        useState<AppointmentType>("video");
    const [reason, setReason] = useState("");

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setStep(1);
            setSelectedDoctor(null);
            setSelectedDate(null);
            setSelectedTime(null);
            setAppointmentType("video");
            setReason("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBook = () => {
        if (selectedDoctor && selectedDate && selectedTime) {
            const [hours, minutes] = selectedTime.split(":").map(Number);
            const appointmentDate = new Date(selectedDate);
            appointmentDate.setHours(hours, minutes, 0, 0);

            onBook(selectedDoctor, appointmentDate, appointmentType);
        }
    };

    const availableTimes =
        selectedDoctor && selectedDate
            ? selectedDoctor.availableDates
                  .map((dateStr) => new Date(dateStr))
                  .filter((date) => isSameDay(date, selectedDate))
                  .map((date) => format(date, "HH:mm"))
            : [];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>Book an Appointment</CardTitle>
                    <div className="flex items-center mt-2">
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                step >= 1
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            1
                        </div>
                        <div
                            className={`flex-1 h-1 mx-2 ${
                                step >= 2 ? "bg-primary" : "bg-gray-200"
                            }`}
                        ></div>
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                step >= 2
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            2
                        </div>
                        <div
                            className={`flex-1 h-1 mx-2 ${
                                step >= 3 ? "bg-primary" : "bg-gray-200"
                            }`}
                        ></div>
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                step >= 3
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            3
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {step === 1 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Select a Doctor
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {doctors.map((doctor) => (
                                    <div
                                        key={doctor.id}
                                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                            selectedDoctor?.id === doctor.id
                                                ? "border-primary bg-primary/5"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        onClick={() =>
                                            setSelectedDoctor(doctor)
                                        }
                                    >
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                                                {doctor.image ? (
                                                    <img
                                                        src={doctor.image}
                                                        alt={doctor.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    doctor.name
                                                        .split(" ")
                                                        .map((name) => name[0])
                                                        .join("")
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-medium">
                                                    {doctor.name}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {doctor.specialty}
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <span className="text-yellow-500 mr-1">
                                                        ★
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        {doctor.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && selectedDoctor && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Select Date & Time
                            </h3>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Calendar
                                        onChange={(value) => {
                                            // Handle both single date and date range
                                            if (value instanceof Date) {
                                                setSelectedDate(new Date(value));
                                            } else if (
                                                Array.isArray(value) &&
                                                value.length > 0 &&
                                                value[0] instanceof Date
                                            ) {
                                                // If it's a range, use the first date
                                                setSelectedDate(new Date(value[0]));
                                            }
                                        }}
                                        value={selectedDate}
                                        className="w-full border-none"
                                        tileDisabled={({ date, view }: { date: Date; view: string }) => 
                                            // Only disable tiles in month view
                                            view === 'month' && 
                                            !selectedDoctor.availableDates.some(
                                                (d) =>
                                                    isSameDay(
                                                        parseISO(d),
                                                        new Date(date),
                                                    ),
                                            )
                                        }
                                    />
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-medium mb-2">
                                        Available Times
                                    </h4>
                                    {selectedDate ? (
                                        availableTimes.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-2">
                                                {availableTimes.map((time) => (
                                                    <div
                                                        key={time}
                                                        className={`border rounded p-2 text-center cursor-pointer ${
                                                            selectedTime ===
                                                            time
                                                                ? "border-primary bg-primary/5"
                                                                : "hover:border-gray-300"
                                                        }`}
                                                        onClick={() =>
                                                            setSelectedTime(
                                                                time,
                                                            )
                                                        }
                                                    >
                                                        {format(
                                                            new Date(
                                                                `2000-01-01T${time}`,
                                                            ),
                                                            "h:mm a",
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">
                                                No available times for this date
                                            </p>
                                        )
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">
                                            Please select a date first
                                        </p>
                                    )}

                                    <h4 className="font-medium mt-4 mb-2">
                                        Appointment Type
                                    </h4>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className={`flex-1 flex items-center justify-center gap-2 p-2 border rounded ${
                                                appointmentType === "video"
                                                    ? "border-primary bg-primary/5"
                                                    : "hover:border-gray-300"
                                            }`}
                                            onClick={() =>
                                                setAppointmentType("video")
                                            }
                                        >
                                            <Video className="h-4 w-4" />
                                            <span>Video Call</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`flex-1 flex items-center justify-center gap-2 p-2 border rounded ${
                                                appointmentType === "phone"
                                                    ? "border-primary bg-primary/5"
                                                    : "hover:border-gray-300"
                                            }`}
                                            onClick={() =>
                                                setAppointmentType("phone")
                                            }
                                        >
                                            <Phone className="h-4 w-4" />
                                            <span>Phone Call</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 &&
                        selectedDoctor &&
                        selectedDate &&
                        selectedTime && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Appointment Details
                                </h3>

                                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
                                            {selectedDoctor.image ? (
                                                <img
                                                    src={selectedDoctor.image}
                                                    alt={selectedDoctor.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                selectedDoctor.name
                                                    .split(" ")
                                                    .map((name) => name[0])
                                                    .join("")
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                {selectedDoctor.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {selectedDoctor.specialty}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Date:
                                            </span>
                                            <span className="font-medium">
                                                {format(
                                                    selectedDate,
                                                    "MMMM d, yyyy",
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Time:
                                            </span>
                                            <span className="font-medium">
                                                {format(
                                                    new Date(
                                                        `2000-01-01T${selectedTime}`,
                                                    ),
                                                    "h:mm a",
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Duration:
                                            </span>
                                            <span className="font-medium">
                                                30 minutes
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Type:
                                            </span>
                                            <span className="font-medium">
                                                {appointmentType === "video"
                                                    ? "Video Call"
                                                    : "Phone Call"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="reason"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    >
                                        Reason for Visit
                                    </label>
                                    <textarea
                                        id="reason"
                                        rows={3}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm"
                                        placeholder="Briefly describe your symptoms or reason for the appointment"
                                        value={reason}
                                        onChange={(e) =>
                                            setReason(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 ? (
                        <Button
                            variant="outline"
                            onClick={() => setStep(step - 1)}
                        >
                            Back
                        </Button>
                    ) : (
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    )}

                    {step < 3 ? (
                        <Button
                            variant="primary"
                            onClick={() => setStep(step + 1)}
                            disabled={
                                (step === 1 && !selectedDoctor) ||
                                (step === 2 && (!selectedDate || !selectedTime))
                            }
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleBook}>
                            Confirm Booking
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default function AppointmentsPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedStatus, setSelectedStatus] = useState<
        AppointmentStatus | "all"
    >("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("upcoming");
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [inCall, setInCall] = useState<Appointment | null>(null);
    const [showPostCallSummary, setShowPostCallSummary] =
        useState<Appointment | null>(null);

    const filterAppointments = (): Appointment[] => {
        const filtered = appointments.filter((appointment) => {
            // Filter by tab (status)
            if (activeTab === "upcoming" && appointment.status !== "upcoming") {
                return false;
            }

            if (activeTab === "past" && appointment.status !== "completed") {
                return false;
            }

            if (
                activeTab === "cancelled" &&
                appointment.status !== "cancelled"
            ) {
                return false;
            }

            // Filter by selected status (if not 'all')
            if (
                selectedStatus !== "all" &&
                appointment.status !== selectedStatus
            ) {
                return false;
            }

            // Filter by date
            if (selectedDate) {
                const appointmentDate = new Date(appointment.date);
                const selectedDateObj = new Date(selectedDate);

                if (
                    appointmentDate.getDate() !== selectedDateObj.getDate() ||
                    appointmentDate.getMonth() !== selectedDateObj.getMonth() ||
                    appointmentDate.getFullYear() !==
                        selectedDateObj.getFullYear()
                ) {
                    return false;
                }
            }

            // Filter by search query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    appointment.doctorName.toLowerCase().includes(query) ||
                    appointment.doctorSpecialty.toLowerCase().includes(query) ||
                    (appointment.notes &&
                        appointment.notes.toLowerCase().includes(query))
                );
            }

            return true;
        });

        // Sort appointments by time
        return filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
    };

    const filteredAppointments = filterAppointments();

    const formatAppointmentDate = (date: Date): string => {
        if (isToday(date)) {
            return `Today, ${format(date, "h:mm a")}`;
        } else if (isTomorrow(date)) {
            return `Tomorrow, ${format(date, "h:mm a")}`;
        } else if (isThisWeek(date)) {
            return format(date, "EEEE, h:mm a");
        } else {
            return format(date, "MMMM d, yyyy - h:mm a");
        }
    };

    const startCall = (appointment: Appointment) => {
        setInCall(appointment);
    };

    const endCall = () => {
        if (inCall) {
            setShowPostCallSummary(inCall);
            setInCall(null);
        }
    };

    const handleBookAppointment = (
        doctor: Doctor,
        date: Date,
        type: AppointmentType,
    ) => {
        // In a real app, this would make an API call to book the appointment
        // For demo purposes, we'll just close the modal
        setIsBookingModalOpen(false);

        // You could show a success message here
        // toast.success('Appointment booked successfully!');
    };

    // If in a call, show the video call UI
    if (inCall) {
        return <VideoCallUI appointment={inCall} onEndCall={endCall} />;
    }

    return (
        <MainLayout title="Appointments">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full sm:w-auto"
                >
                    <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex">
                        <TabsTrigger value="upcoming" className="px-4 py-2">Upcoming</TabsTrigger>
                        <TabsTrigger value="past" className="px-4 py-2">Past</TabsTrigger>
                        <TabsTrigger value="cancelled" className="px-4 py-2">Cancelled</TabsTrigger>
                    </TabsList>
                </Tabs>
                
                <div className="hidden sm:flex gap-2">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search appointments"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 pl-10 rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm"
                        />
                    </div>
                    <Button
                        variant="primary"
                        icon={<Plus className="h-4 w-4" />}
                        onClick={() => setIsBookingModalOpen(true)}
                    >
                        New Appointment
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left column - Calendar and filters */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Calendar</span>
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    {selectedDate && format(selectedDate, "MMMM yyyy")}
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                onChange={(value) => {
                                    // Handle both single date and date range
                                    if (value instanceof Date) {
                                        setSelectedDate(new Date(value));
                                    } else if (
                                        Array.isArray(value) &&
                                        value.length > 0 &&
                                        value[0] instanceof Date
                                    ) {
                                        // If it's a range, use the first date
                                        setSelectedDate(new Date(value[0]));
                                    }
                                }}
                                value={selectedDate}
                                className="w-full border-none text-base calendar-enhanced"
                                tileClassName={({ date, view }: { date: Date; view: string }) => {
                                    // Only add extra classes to month view
                                    return view === 'month' ? 'relative calendar-tile' : null;
                                }}
                                tileContent={({ date, view }: { date: Date; view: string }) => {
                                    // Only show indicators in month view
                                    if (view !== 'month') return null;
                                    
                                    // Count appointments by status for this date
                                    const appointmentsOnDay = appointments.filter(appointment => 
                                        isSameDay(new Date(appointment.date), new Date(date))
                                    );
                                    
                                    if (appointmentsOnDay.length === 0) return null;
                                    
                                    // Check for each type of appointment
                                    const hasUpcoming = appointmentsOnDay.some(a => a.status === 'upcoming');
                                    const hasCompleted = appointmentsOnDay.some(a => a.status === 'completed');
                                    const hasCancelled = appointmentsOnDay.some(a => a.status === 'cancelled');
                                    
                                    return (
                                        <div className="dots-container">
                                            {hasUpcoming && <div className="dot upcoming-dot" title="Upcoming appointment"></div>}
                                            {hasCompleted && <div className="dot completed-dot" title="Completed appointment"></div>}
                                            {hasCancelled && <div className="dot cancelled-dot" title="Cancelled appointment"></div>}
                                        </div>
                                    );
                                }}
                            />
                            <style jsx global>{`
                                /* Custom styles for larger calendar */
                                .calendar-enhanced {
                                    font-size: 1.1rem;
                                }
                                .react-calendar {
                                    width: 100%;
                                    max-width: 100%;
                                    font-family: inherit;
                                    line-height: 1.75;
                                    border: 1px solid #e5e7eb;
                                    border-radius: 0.5rem;
                                    padding: 0.5rem;
                                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                                }
                                .dark .react-calendar {
                                    border-color: #374151;
                                    background-color: #1f2937;
                                    color: #e5e7eb;
                                }
                                .react-calendar abbr {
                                    text-decoration: none;
                                }
                                .react-calendar__month-view__weekdays__weekday {
                                    padding: 0.75rem 0;
                                    font-weight: 600;
                                    text-decoration: none;
                                    font-size: 0.9rem;
                                }
                                .react-calendar__month-view__weekdays__weekday abbr {
                                    text-decoration: none;
                                }
                                .react-calendar__month-view__days__day {
                                    padding: 0.75rem 0 1.2rem 0;
                                    font-size: 1rem;
                                    position: relative;
                                }
                                .react-calendar__navigation button {
                                    font-size: 1.1rem;
                                    padding: 0.5rem 0;
                                    background: none;
                                    border-radius: 0.375rem;
                                }
                                .react-calendar__navigation button:hover,
                                .react-calendar__navigation button:focus {
                                    background-color: #f3f4f6;
                                }
                                .dark .react-calendar__navigation button:hover,
                                .dark .react-calendar__navigation button:focus {
                                    background-color: #374151;
                                }
                                .react-calendar__month-view__days__day--weekend {
                                    color: #ef4444;
                                }
                                .dark .react-calendar__month-view__days__day--weekend {
                                    color: #f87171;
                                }
                                .react-calendar__tile--active,
                                .react-calendar__tile--active:enabled:hover {
                                    background: #2563eb;
                                    border-radius: 9999px;
                                    color: white;
                                }
                                .react-calendar__tile--now {
                                    background: rgba(37, 99, 235, 0.1);
                                    border-radius: 9999px;
                                }
                                .dark .react-calendar__tile--now {
                                    background: rgba(37, 99, 235, 0.2);
                                }
                                .react-calendar__tile:enabled:hover {
                                    background-color: #f3f4f6;
                                    border-radius: 9999px;
                                }
                                .dark .react-calendar__tile:enabled:hover {
                                    background-color: #374151;
                                }
                                
                                /* Appointment indicator styles */
                                .calendar-tile {
                                    height: 100%;
                                }
                                .dots-container {
                                    position: absolute;
                                    bottom: 10px;
                                    left: 0;
                                    right: 0;
                                    display: flex;
                                    gap: 3px;
                                    justify-content: center;
                                    pointer-events: none;
                                }
                                .dot {
                                    width: 5px;
                                    height: 5px;
                                    border-radius: 50%;
                                }
                                .upcoming-dot {
                                    background-color: #2563eb;
                                }
                                .completed-dot {
                                    background-color: #10b981;
                                }
                                .cancelled-dot {
                                    background-color: #f87272;
                                }
                            `}</style>
                            <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 mt-4 space-x-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                                    <span>Upcoming</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <span>Completed</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                                    <span>Cancelled</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Next appointment */}
                                <div className="border-l-4 border-primary rounded-r-lg p-4 bg-primary/5">
                                    <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400">Next Appointment</h3>
                                    {appointments.filter(a => a.status === 'upcoming' && new Date(a.date) > new Date()).length > 0 ? (
                                        (() => {
                                            const nextAppointment = appointments
                                                .filter(a => a.status === 'upcoming' && new Date(a.date) > new Date())
                                                .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
                                            return (
                                                <div className="mt-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                            {nextAppointment.type === 'video' ? 
                                                                <Video className="h-4 w-4 text-primary" /> : 
                                                                <Phone className="h-4 w-4 text-primary" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">{nextAppointment.doctorName}</p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">{nextAppointment.doctorSpecialty}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-3 mt-2">
                                                        <div className="flex items-center">
                                                            <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                                                            <span>{formatAppointmentDate(nextAppointment.date)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                                            <span>{nextAppointment.duration} min</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()
                                    ) : (
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">No upcoming appointments scheduled</p>
                                    )}
                                </div>

                                {/* Appointment counts */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                                        <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                            {appointments.filter(a => a.status === 'upcoming').length}
                                        </span>
                                        <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">Upcoming</p>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                                        <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                            {appointments.filter(a => a.status === 'completed').length}
                                        </span>
                                        <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1">Completed</p>
                                    </div>
                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
                                        <span className="text-lg font-semibold text-red-500 dark:text-red-400">
                                            {appointments.filter(a => a.status === 'cancelled').length}
                                        </span>
                                        <p className="text-xs text-red-500/70 dark:text-red-400/70 mt-1">Cancelled</p>
                                    </div>
                                </div>

                                {/* This week stats */}
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    <h3 className="text-sm uppercase font-semibold text-gray-500 dark:text-gray-400 mb-3">This Week</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Appointments</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {appointments.filter(a => isThisWeek(new Date(a.date))).length}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Video Consultations</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {appointments.filter(a => isThisWeek(new Date(a.date)) && a.type === 'video').length}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Phone Consultations</span>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {appointments.filter(a => isThisWeek(new Date(a.date)) && a.type === 'phone').length}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Book appointment button */}
                                <Button
                                    variant="primary"
                                    fullWidth
                                    size="lg"
                                    icon={<Plus className="h-5 w-5" />}
                                    onClick={() => setIsBookingModalOpen(true)}
                                >
                                    Book New Appointment
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column - Appointments list */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>
                                    {filteredAppointments.length} Appointment
                                    {filteredAppointments.length !== 1
                                        ? "s"
                                        : ""}
                                    {selectedDate && (
                                        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                            for {format(selectedDate, "MMMM d, yyyy")}
                                        </span>
                                    )}
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        icon={<Filter className="h-4 w-4" />}
                                    >
                                        Filter
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        icon={
                                            <CalendarIcon className="h-4 w-4" />
                                        }
                                    >
                                        Date
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="px-0 py-0">
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map((appointment) => (
                                        <div
                                        key={appointment.id}
                                        className="p-4 sm:p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-l-4 rounded-r-lg my-3 shadow-sm"
                                            style={{
                                                    borderLeftColor: appointment.status === 'upcoming' 
                                                        ? '#2563EB' 
                                                        : appointment.status === 'completed' 
                                                            ? '#10B981' 
                                                            : '#F87272'
                                                }}
                                            >
                                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 overflow-hidden shadow-md border-2 border-white dark:border-gray-800">
                                                        {appointment.doctorImage ? (
                                                            <img
                                                                src={
                                                                    appointment.doctorImage
                                                                }
                                                                alt={
                                                                    appointment.doctorName
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            appointment.doctorName
                                                                .split(" ")
                                                                .map(
                                                                    (name) =>
                                                                        name[0],
                                                                )
                                                                .join("")
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                                {
                                                                    appointment.doctorName
                                                                }
                                                            </h4>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {
                                                                    appointment.doctorSpecialty
                                                                }
                                                            </p>
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                appointment.status ===
                                                                "upcoming"
                                                                    ? "primary"
                                                                    : appointment.status ===
                                                                      "completed"
                                                                    ? "success"
                                                                    : "danger"
                                                            }
                                                            rounded
                                                        >
                                                            {appointment.status
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                appointment.status.slice(
                                                                    1,
                                                                )}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
                                                        <div className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                                            <CalendarIcon className="h-4 w-4 mr-1" />
                                                            <span>
                                                                {formatAppointmentDate(
                                                                    appointment.date,
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            <span>
                                                                {
                                                                    appointment.duration
                                                                }{" "}
                                                                minutes
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                                                            {appointment.type ===
                                                            "video" ? (
                                                                <Video className="h-4 w-4 mr-1" />
                                                            ) : (
                                                                <Phone className="h-4 w-4 mr-1" />
                                                            )}
                                                            <span>
                                                                {appointment.type ===
                                                                "video"
                                                                    ? "Video Consultation"
                                                                    : "Phone Consultation"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {appointment.notes && (
                                                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                                                            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                                Notes:
                                                            </p>
                                                            <p>
                                                                {appointment.notes}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {appointment.status ===
                                                        "upcoming" && (
                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            <Button
                                                                variant="primary"
                                                                size="sm"
                                                                onClick={() =>
                                                                    startCall(
                                                                        appointment,
                                                                    )
                                                                }
                                                            >
                                                                {appointment.type ===
                                                                "video"
                                                                    ? "Join Video Call"
                                                                    : "Start Phone Call"}
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Reschedule
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    )}
                                                    {appointment.status ===
                                                        "completed" && (
                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                icon={
                                                                    <MessageCircle className="h-4 w-4" />
                                                                }
                                                            >
                                                                Message Doctor
                                                            </Button>
                                                            <Button
                                                                variant="primary"
                                                                size="sm"
                                                                icon={
                                                                    <CalendarComponent className="h-4 w-4" />
                                                                }
                                                            >
                                                                Book Follow-up
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center">
                                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
                                            No appointments found for the
                                            selected criteria.
                                        </p>
                                        <Button
                                            variant="primary"
                                            icon={<Plus className="h-4 w-4" />}
                                            onClick={() =>
                                                setIsBookingModalOpen(true)
                                            }
                                        >
                                            Book New Appointment
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Modals */}
            {isBookingModalOpen && (
                <BookAppointmentModal
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    onBook={handleBookAppointment}
                />
            )}

            {showPostCallSummary && (
                <PostCallSummary
                    appointment={showPostCallSummary}
                    onDismiss={() => setShowPostCallSummary(null)}
                />
            )}
        </MainLayout>
    );
}