'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Calendar as CalendarIcon, Clock, Video, Phone, Search, Filter, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Calendar from 'react-calendar';
import { format, isToday, isTomorrow, isThisWeek, addMinutes } from 'date-fns';

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

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterAppointments = (): Appointment[] => {
    return appointments.filter((appointment) => {
      // Filter by status
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

  return (
    <MainLayout title="Appointments">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Calendar and filters */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                onChange={setSelectedDate}
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
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-white px-3 py-2 text-sm"
                  >
                    <option value="all">All Appointments</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      placeholder="Search by doctor or specialty"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-white px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <Button
                  variant="secondary"
                  fullWidth
                  icon={<Plus className="h-4 w-4" />}
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
              <div className="divide-y divide-gray-200">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
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
                              <h4 className="font-medium text-gray-900">
                                {appointment.doctorName}
                              </h4>
                              <p className="text-sm text-gray-600">
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
                          <div className="mt-2 text-sm text-gray-600">
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
                            <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                              <p className="font-medium">Notes:</p>
                              <p>{appointment.notes}</p>
                            </div>
                          )}
                          {appointment.status === 'upcoming' && (
                            <div className="mt-3 flex gap-2">
                              <Button variant="primary" size="sm">
                                {appointment.type === 'video' ? 'Join Call' : 'Call'}
                              </Button>
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm">
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 mb-4">No appointments found for the selected criteria.</p>
                    <Button variant="primary" icon={<Plus className="h-4 w-4" />}>
                      Book New Appointment
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}