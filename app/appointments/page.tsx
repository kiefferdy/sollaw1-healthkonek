'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Calendar as CalendarIcon, Clock, Video, Phone, Search, Filter, Plus, CheckCircle, X, ArrowRight, MessageCircle, Calendar as CalendarComponent, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isToday, isTomorrow, isThisWeek, addMinutes, parseISO, isSameDay, differenceInMinutes, addHours, addDays } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), { ssr: false });

type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';
type AppointmentType = 'video' | 'phone';

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
    name: 'Dr. Maria Santos',
    specialty: 'Cardiologist',
    image: '/images/doctor-1.jpg',
    rating: 4.9,
    availableDates: [
      new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
      new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 1).setHours(11, 0, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 1).setHours(15, 30, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 2).setHours(9, 0, 0, 0)).toISOString(),
    ]
  },
  {
    id: 2,
    name: 'Dr. Jose Reyes',
    specialty: 'Endocrinologist',
    image: '/images/doctor-2.jpg',
    rating: 4.7,
    availableDates: [
      new Date(addDays(new Date(), 1).setHours(10, 0, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 1).setHours(13, 0, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 3).setHours(14, 0, 0, 0)).toISOString(),
    ]
  },
  {
    id: 3,
    name: 'Dr. Ana Lim',
    specialty: 'Dermatologist',
    image: '/images/doctor-3.jpg',
    rating: 4.8,
    availableDates: [
      new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 2).setHours(13, 30, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 4).setHours(11, 0, 0, 0)).toISOString(),
    ]
  },
  {
    id: 4,
    name: 'Dr. Marco Cruz',
    specialty: 'Neurologist',
    image: '/images/doctor-4.jpg',
    rating: 4.6,
    availableDates: [
      new Date(addDays(new Date(), 1).setHours(14, 30, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 2).setHours(10, 0, 0, 0)).toISOString(),
      new Date(addDays(new Date(), 3).setHours(15, 0, 0, 0)).toISOString(),
    ]
  },
];

const appointments: Appointment[] = [
  {
    id: 1,
    doctorName: 'Dr. Maria Santos',
    doctorSpecialty: 'Cardiologist',
    doctorImage: '/images/doctor-1.jpg',
    date: new Date(new Date().setHours(14, 0, 0, 0)), // Today at 2:00 PM
    duration: 30,
    type: 'video',
    status: 'upcoming',
    notes: 'Regular check-up and medication review.',
  },
  {
    id: 2,
    doctorName: 'Dr. Jose Reyes',
    doctorSpecialty: 'Endocrinologist',
    doctorImage: '/images/doctor-2.jpg',
    date: new Date(new Date().setDate(new Date().getDate() + 2)), // Day after tomorrow
    duration: 45,
    type: 'video',
    status: 'upcoming',
    notes: 'Discuss latest lab results and adjust medication if needed.',
  },
  {
    id: 3,
    doctorName: 'Dr. Ana Lim',
    doctorSpecialty: 'Dermatologist',
    doctorImage: '/images/doctor-3.jpg',
    date: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
    duration: 30,
    type: 'phone',
    status: 'completed',
    notes: 'Follow-up on skin condition and treatment effectiveness.',
  },
  {
    id: 4,
    doctorName: 'Dr. Marco Cruz',
    doctorSpecialty: 'Neurologist',
    doctorImage: '/images/doctor-4.jpg',
    date: new Date(new Date().setDate(new Date().getDate() - 10)), // 10 days ago
    duration: 60,
    type: 'video',
    status: 'completed',
    notes: 'Comprehensive neurological assessment.',
  },
  {
    id: 5,
    doctorName: 'Dr. Sofia Garcia',
    doctorSpecialty: 'Pediatrician',
    doctorImage: '/images/doctor-5.jpg',
    date: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
    duration: 30,
    type: 'phone',
    status: 'cancelled',
    notes: 'Routine check-up for child.',
  },
];

// Custom component for the video call UI
const VideoCallUI = ({ 
  appointment, 
  onEndCall 
}: { 
  appointment: Appointment, 
  onEndCall: () => void 
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-900">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
            {appointment.doctorName.split(' ')[1][0]}
          </div>
          <div>
            <h3 className="text-white font-medium">{appointment.doctorName}</h3>
            <p className="text-gray-400 text-sm">{appointment.doctorSpecialty}</p>
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
            <p className="text-sm">{isVideoOn ? 'Video connected' : 'Video off'}</p>
          </div>
        </div>
        
        {/* Self view */}
        <div className="absolute bottom-20 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600 shadow-lg">
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <User size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">You {isVideoOn ? '' : '(Video off)'}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-900 flex justify-center items-center space-x-4">
        <button 
          className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          )}
        </button>
        
        <button 
          className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600'}`}
          onClick={() => setIsVideoOn(!isVideoOn)}
        >
          {isVideoOn ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M13 16V8a4 4 0 0 1 4 4v0"></path>
              <rect x="1" y="5" width="12" height="14" rx="2" ry="2"></rect>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
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
  onDismiss
}: {
  appointment: Appointment,
  onDismiss: () => void
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Call Summary</CardTitle>
          <CardDescription>Your call with {appointment.doctorName} has ended</CardDescription>
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
                appointment.doctorName.split(' ').map(name => name[0]).join('')
              )}
            </div>
            <div>
              <h4 className="font-medium">{appointment.doctorName}</h4>
              <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{format(appointment.date, 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time</span>
              <span className="font-medium">{format(appointment.date, 'h:mm a')} - {format(addMinutes(appointment.date, appointment.duration), 'h:mm a')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">30:15</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium mb-2">Doctor's Notes</h5>
            <p className="text-gray-700 text-sm">
              Patient reported improvement in symptoms. Continue with current medication regimen. 
              Schedule follow-up appointment in 2 weeks to assess progress.
            </p>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" fullWidth icon={<MessageCircle className="h-4 w-4" />}>
              Message
            </Button>
            <Button variant="primary" fullWidth icon={<CalendarComponent className="h-4 w-4" />}>
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
  onBook
}: {
  isOpen: boolean;
  onClose: () => void;
  onBook: (doctor: Doctor, date: Date, type: AppointmentType) => void;
}) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('video');
  const [reason, setReason] = useState('');
  
  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSelectedDoctor(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setAppointmentType('video');
      setReason('');
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleBook = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(hours, minutes, 0, 0);
      
      onBook(selectedDoctor, appointmentDate, appointmentType);
    }
  };
  
  const availableTimes = selectedDoctor && selectedDate 
    ? selectedDoctor.availableDates
        .map(dateStr => new Date(dateStr))
        .filter(date => isSameDay(date, selectedDate))
        .map(date => format(date, 'HH:mm'))
    : [];
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
          <div className="flex items-center mt-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select a Doctor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedDoctor?.id === doctor.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setSelectedDoctor(doctor)}
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
                          doctor.name.split(' ').map(name => name[0]).join('')
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{doctor.name}</h4>
                        <p className="text-sm text-gray-500">{doctor.specialty}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm text-gray-600">{doctor.rating}</span>
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
              <h3 className="text-lg font-medium">Select Date & Time</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Calendar
                    onChange={(value) => {
                      // Handle both single date and date range
                      if (value instanceof Date) {
                        setSelectedDate(value);
                      } else if (Array.isArray(value) && value.length > 0) {
                        // If it's a range, use the first date
                        setSelectedDate(value[0]);
                      }
                    }}
                    value={selectedDate}
                    className="w-full border-none"
                    tileDisabled={({ date }) => !selectedDoctor.availableDates.some(d => isSameDay(parseISO(d), date))}
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium mb-2">Available Times</h4>
                  {selectedDate ? (
                    availableTimes.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimes.map((time) => (
                          <div
                            key={time}
                            className={`border rounded p-2 text-center cursor-pointer ${selectedTime === time ? 'border-primary bg-primary/5' : 'hover:border-gray-300'}`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {format(new Date(`2000-01-01T${time}`), 'h:mm a')}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No available times for this date</p>
                    )
                  ) : (
                    <p className="text-gray-500 text-center py-4">Please select a date first</p>
                  )}
                  
                  <h4 className="font-medium mt-4 mb-2">Appointment Type</h4>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`flex-1 flex items-center justify-center gap-2 p-2 border rounded ${appointmentType === 'video' ? 'border-primary bg-primary/5' : 'hover:border-gray-300'}`}
                      onClick={() => setAppointmentType('video')}
                    >
                      <Video className="h-4 w-4" />
                      <span>Video Call</span>
                    </button>
                    <button
                      type="button"
                      className={`flex-1 flex items-center justify-center gap-2 p-2 border rounded ${appointmentType === 'phone' ? 'border-primary bg-primary/5' : 'hover:border-gray-300'}`}
                      onClick={() => setAppointmentType('phone')}
                    >
                      <Phone className="h-4 w-4" />
                      <span>Phone Call</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && selectedDoctor && selectedDate && selectedTime && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appointment Details</h3>
              
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
                      selectedDoctor.name.split(' ').map(name => name[0]).join('')
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedDoctor.name}</h4>
                    <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-medium">{format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">30 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium">
                      {appointmentType === 'video' ? 'Video Call' : 'Phone Call'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reason for Visit
                </label>
                <textarea
                  id="reason"
                  rows={3}
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm"
                  placeholder="Briefly describe your symptoms or reason for the appointment"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
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
              disabled={(step === 1 && !selectedDoctor) || (step === 2 && (!selectedDate || !selectedTime))}
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

// Week day selector component has been removed as requested

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [inCall, setInCall] = useState<Appointment | null>(null);
  const [showPostCallSummary, setShowPostCallSummary] = useState<Appointment | null>(null);
  
  const filterAppointments = (): Appointment[] => {
    return appointments.filter((appointment) => {
      // Filter by tab (status)
      if (activeTab === 'upcoming' && appointment.status !== 'upcoming') {
        return false;
      }
      
      if (activeTab === 'past' && appointment.status !== 'completed') {
        return false;
      }
      
      if (activeTab === 'cancelled' && appointment.status !== 'cancelled') {
        return false;
      }
      
      // Filter by selected status (if not 'all')
      if (selectedStatus !== 'all' && appointment.status !== selectedStatus) {
        return false;
      }

      // Filter by date
      if (selectedDate) {
        const appointmentDate = new Date(appointment.date);
        const selectedDateObj = new Date(selectedDate);
        
        if (
          appointmentDate.getDate() !== selectedDateObj.getDate() ||
          appointmentDate.getMonth() !== selectedDateObj.getMonth() ||
          appointmentDate.getFullYear() !== selectedDateObj.getFullYear()
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
          (appointment.notes && appointment.notes.toLowerCase().includes(query))
        );
      }

      return true;
    });
  };

  const filteredAppointments = filterAppointments();

  const formatAppointmentDate = (date: Date): string => {
    if (isToday(date)) {
      return `Today, ${format(date, 'h:mm a')}`;
    } else if (isTomorrow(date)) {
      return `Tomorrow, ${format(date, 'h:mm a')}`;
    } else if (isThisWeek(date)) {
      return format(date, 'EEEE, h:mm a');
    } else {
      return format(date, 'MMMM d, yyyy - h:mm a');
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
  
  const handleBookAppointment = (doctor: Doctor, date: Date, type: AppointmentType) => {
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Calendar and filters */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                onChange={(value) => {
                  // Handle both single date and date range
                  if (value instanceof Date) {
                    setSelectedDate(value);
                  } else if (Array.isArray(value) && value.length > 0) {
                    // If it's a range, use the first date
                    setSelectedDate(value[0]);
                  }
                }}
                value={selectedDate}
                className="w-full border-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm"
                  >
                    <option value="all">All Appointments</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      placeholder="Search by doctor or specialty"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  icon={<Plus className="h-4 w-4" />}
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book New Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Appointments list */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {filteredAppointments.length} Appointment{filteredAppointments.length !== 1 ? 's' : ''}
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
                    icon={<CalendarIcon className="h-4 w-4" />}
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
                    <div key={appointment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 overflow-hidden">
                            {appointment.doctorImage ? (
                              <img
                                src={appointment.doctorImage}
                                alt={appointment.doctorName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              appointment.doctorName.split(' ').map(name => name[0]).join('')
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {appointment.doctorName}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {appointment.doctorSpecialty}
                              </p>
                            </div>
                            <Badge
                              variant={
                                appointment.status === 'upcoming'
                                  ? 'primary'
                                  : appointment.status === 'completed'
                                  ? 'success'
                                  : 'danger'
                              }
                              rounded
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center mb-1">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span>
                                {formatAppointmentDate(appointment.date)}
                              </span>
                            </div>
                            <div className="flex items-center mb-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{appointment.duration} minutes</span>
                            </div>
                            <div className="flex items-center">
                              {appointment.type === 'video' ? (
                                <Video className="h-4 w-4 mr-1" />
                              ) : (
                                <Phone className="h-4 w-4 mr-1" />
                              )}
                              <span>
                                {appointment.type === 'video'
                                  ? 'Video Consultation'
                                  : 'Phone Consultation'}
                              </span>
                            </div>
                          </div>
                          {appointment.notes && (
                            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400">
                              <p className="font-medium">Notes:</p>
                              <p>{appointment.notes}</p>
                            </div>
                          )}
                          {appointment.status === 'upcoming' && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => startCall(appointment)}
                              >
                                {appointment.type === 'video' ? 'Join Video Call' : 'Start Phone Call'}
                              </Button>
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm">
                                Cancel
                              </Button>
                            </div>
                          )}
                          {appointment.status === 'completed' && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" icon={<MessageCircle className="h-4 w-4" />}>
                                Message Doctor
                              </Button>
                              <Button variant="primary" size="sm" icon={<CalendarComponent className="h-4 w-4" />}>
                                Book Follow-up
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No appointments found for the selected criteria.</p>
                    <Button 
                      variant="primary" 
                      icon={<Plus className="h-4 w-4" />}
                      onClick={() => setIsBookingModalOpen(true)}
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