'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  FileText, 
  Calendar, 
  Activity, 
  Heart, 
  Thermometer, 
  Pill, 
  ChevronRight, 
  Download, 
  Share2, 
  Filter,
  Search,
  User
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useRouter } from 'next/navigation';

const DoctorLayout = dynamic(() => import('@/components/layout/DoctorLayout'), { ssr: false });

// Sample data for vitals chart
const vitalsData = [
  { date: '01/15', heartRate: 78, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, temperature: 36.6 },
  { date: '01/22', heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78, temperature: 36.5 },
  { date: '01/29', heartRate: 75, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, temperature: 36.7 },
  { date: '02/05', heartRate: 80, bloodPressureSystolic: 125, bloodPressureDiastolic: 85, temperature: 37.0 },
  { date: '02/12', heartRate: 76, bloodPressureSystolic: 119, bloodPressureDiastolic: 79, temperature: 36.6 },
  { date: '02/19', heartRate: 73, bloodPressureSystolic: 121, bloodPressureDiastolic: 81, temperature: 36.4 },
  { date: '02/26', heartRate: 77, bloodPressureSystolic: 123, bloodPressureDiastolic: 83, temperature: 36.5 },
];

// Sample data for patients
const patients = [
  {
    id: 'p001',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    lastVisit: 'Feb 25, 2025',
    healthStatus: 'Good',
    nextAppointment: 'Mar 15, 2025',
    primaryCondition: 'Hypertension',
  },
  {
    id: 'p002',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    lastVisit: 'Feb 20, 2025',
    healthStatus: 'Fair',
    nextAppointment: 'Mar 10, 2025',
    primaryCondition: 'Type 2 Diabetes',
  },
  {
    id: 'p003',
    name: 'Michael Chen',
    age: 58,
    gender: 'Male',
    lastVisit: 'Feb 15, 2025',
    healthStatus: 'Good',
    nextAppointment: 'Mar 20, 2025',
    primaryCondition: 'Arthritis',
  },
];

// Sample data for medical records
const medicalRecords = [
  {
    id: 'mr001',
    type: 'Consultation',
    date: 'Feb 25, 2025',
    diagnoses: ['Essential hypertension', 'Hyperlipidemia'],
    notes: 'Patient presenting with elevated blood pressure. Recommended lifestyle modifications and medication review.',
    attachments: ['Prescription.pdf'],
  },
  {
    id: 'mr002',
    type: 'Laboratory',
    date: 'Jan 18, 2025',
    diagnoses: ['Annual checkup'],
    notes: 'Complete blood count, lipid panel, and comprehensive metabolic panel performed. Results show slightly elevated LDL cholesterol.',
    attachments: ['BloodWorkResults.pdf', 'LipidPanel.pdf'],
  },
  {
    id: 'mr003',
    type: 'Imaging',
    date: 'Dec 10, 2024',
    diagnoses: ['Normal chest radiograph'],
    notes: 'Chest X-ray performed for pre-employment requirements. No significant findings noted.',
    attachments: ['ChestXray.pdf', 'RadiologistReport.pdf'],
  },
  {
    id: 'mr004',
    type: 'Vaccination',
    date: 'Nov 15, 2024',
    diagnoses: ['Immunization'],
    notes: 'Annual influenza vaccination administered. No adverse reactions observed.',
    attachments: ['VaccinationRecord.pdf'],
  },
];

// Sample data for medications
const medications = [
  {
    id: 'med001',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: 'Jan 15, 2025',
    endDate: 'Ongoing',
    purpose: 'Type 2 Diabetes Management',
    status: 'Active',
  },
  {
    id: 'med002',
    name: 'Losartan',
    dosage: '50mg',
    frequency: 'Once daily',
    startDate: 'Feb 25, 2025',
    endDate: 'Ongoing',
    purpose: 'Hypertension Management',
    status: 'Active',
  },
  {
    id: 'med003',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    startDate: 'Feb 25, 2025',
    endDate: 'Ongoing',
    purpose: 'Cholesterol Management',
    status: 'Active',
  },
  {
    id: 'med004',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Three times daily',
    startDate: 'Nov 05, 2024',
    endDate: 'Nov 12, 2024',
    purpose: 'Bacterial Infection',
    status: 'Completed',
  },
];

export default function PatientRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.primaryCondition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'upcoming' && patient.nextAppointment) ||
                         (filterStatus === 'recent' && patient.lastVisit);
    return matchesSearch && matchesStatus;
  });

  return (
    <DoctorLayout title="Patient Records">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 max-w-md w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients by name or condition..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={filterStatus === 'all' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All Patients
            </Button>
            <Button 
              variant={filterStatus === 'upcoming' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('upcoming')}
            >
              Upcoming Appointments
            </Button>
            <Button 
              variant={filterStatus === 'recent' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('recent')}
            >
              Recent Visits
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <Card 
              key={patient.id} 
              variant="default" 
              hoverEffect
              className="cursor-pointer"
              onClick={() => router.push(`/doctor/records/${patient.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{patient.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {patient.age} years • {patient.gender}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">Last Visit:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{patient.lastVisit}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Activity className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600 dark:text-gray-400">Next Appointment:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{patient.nextAppointment}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge 
                    variant={patient.healthStatus === 'Good' ? 'success' : 'warning'} 
                    rounded
                  >
                    {patient.healthStatus}
                  </Badge>
                  <Badge variant="outline" rounded>
                    {patient.primaryCondition}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No patients found matching your criteria.</p>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
}