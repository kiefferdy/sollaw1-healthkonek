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
  Filter 
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

const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), { ssr: false });

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

// Sample data for medical records
const medicalRecords = [
  {
    id: 'mr001',
    type: 'Consultation',
    doctor: 'Dr. Maria Santos',
    specialty: 'Cardiologist',
    date: 'Feb 25, 2025',
    diagnoses: ['Essential hypertension', 'Hyperlipidemia'],
    notes: 'Patient presenting with elevated blood pressure. Recommended lifestyle modifications and medication review.',
    attachments: ['Prescription.pdf'],
  },
  {
    id: 'mr002',
    type: 'Laboratory',
    doctor: 'Dr. Juan Reyes',
    specialty: 'Internal Medicine',
    date: 'Jan 18, 2025',
    diagnoses: ['Annual checkup'],
    notes: 'Complete blood count, lipid panel, and comprehensive metabolic panel performed. Results show slightly elevated LDL cholesterol.',
    attachments: ['BloodWorkResults.pdf', 'LipidPanel.pdf'],
  },
  {
    id: 'mr003',
    type: 'Imaging',
    doctor: 'Dr. Ana Lim',
    specialty: 'Radiologist',
    date: 'Dec 10, 2024',
    diagnoses: ['Normal chest radiograph'],
    notes: 'Chest X-ray performed for pre-employment requirements. No significant findings noted.',
    attachments: ['ChestXray.pdf', 'RadiologistReport.pdf'],
  },
  {
    id: 'mr004',
    type: 'Vaccination',
    doctor: 'Dr. Paolo Cruz',
    specialty: 'Family Medicine',
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
    prescribedBy: 'Dr. Juan Reyes',
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
    prescribedBy: 'Dr. Maria Santos',
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
    prescribedBy: 'Dr. Maria Santos',
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
    prescribedBy: 'Dr. Paolo Cruz',
    purpose: 'Bacterial Infection',
    status: 'Completed',
  },
];

export default function HealthRecordsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const toggleRecordExpansion = (recordId: string) => {
    setExpandedRecord(expandedRecord === recordId ? null : recordId);
  };

  return (
    <MainLayout title="Health Records">
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your comprehensive health records, medical history, and health metrics all in one place.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4 mr-1" />}>
              Filter
            </Button>
            <Button variant="outline" size="sm" icon={<Download className="h-4 w-4 mr-1" />}>
              Export
            </Button>
          </div>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default" hoverEffect>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary mr-4">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Medical Records</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default" hoverEffect>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                    <Pill className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Medications</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">3</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default" hoverEffect>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Next Checkup</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Mar 15, 2025</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Dr. Santos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default" hoverEffect>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mr-4">
                    <Activity className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Health Status</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Good</p>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Stable</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card variant="default">
            <CardHeader>
              <CardTitle>Recent Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={vitalsData.slice(-5)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
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
                        color: "var(--text-color)"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="heartRate"
                      stroke="#ef4444"
                      name="Heart Rate (BPM)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="bloodPressureSystolic"
                      stroke="#3b82f6"
                      name="Blood Pressure (Systolic)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Recent Medical Records</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {medicalRecords.slice(0, 3).map((record) => (
                    <div key={record.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{record.type}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {record.doctor} - {record.date}
                          </p>
                        </div>
                        <Badge variant="primary" rounded>{record.diagnoses[0]}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="ghost" 
                  fullWidth 
                  className="text-primary"
                  onClick={() => setActiveTab('medical-records')}
                >
                  View All Records
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card variant="default">
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {medications.filter(med => med.status === 'Active').slice(0, 3).map((medication) => (
                    <div key={medication.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{medication.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {medication.dosage} - {medication.frequency}
                          </p>
                        </div>
                        <Badge variant="success" rounded>{medication.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="ghost" 
                  fullWidth 
                  className="text-primary"
                  onClick={() => setActiveTab('medications')}
                >
                  View All Medications
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Medical Records Tab */}
        <TabsContent value="medical-records" className="space-y-6">
          <Card variant="default">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Medical Records</CardTitle>
                <Button size="sm" variant="primary">Request Records</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {medicalRecords.map((record) => {
                  const isExpanded = expandedRecord === record.id;
                  return (
                    <div key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div 
                        className="p-4 cursor-pointer" 
                        onClick={() => toggleRecordExpansion(record.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-4">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center mt-1 ${
                              record.type === 'Consultation' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                              record.type === 'Laboratory' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                              record.type === 'Imaging' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' :
                              'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                              {record.type === 'Consultation' ? <FileText className="h-5 w-5" /> :
                              record.type === 'Laboratory' ? <Activity className="h-5 w-5" /> :
                              record.type === 'Imaging' ? <Thermometer className="h-5 w-5" /> :
                              <Heart className="h-5 w-5" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{record.type}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {record.doctor} ({record.specialty})
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-500">{record.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="primary" rounded>{record.diagnoses[0]}</Badge>
                            <ChevronRight className={`h-5 w-5 ml-2 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                          </div>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0">
                          <div className="pl-14 border-l-2 border-gray-200 dark:border-gray-700 ml-5 mb-4">
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Diagnoses</h4>
                              <div className="flex flex-wrap gap-2">
                                {record.diagnoses.map((diagnosis, index) => (
                                  <Badge key={index} variant="outline" rounded>{diagnosis}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Notes</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {record.notes}
                              </p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Attachments</h4>
                              <div className="flex flex-wrap gap-2">
                                {record.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{attachment}</span>
                                    <Download className="h-4 w-4 text-gray-500 dark:text-gray-400 ml-2 cursor-pointer hover:text-primary" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pl-14 ml-5">
                            <Button variant="outline" size="sm" icon={<Share2 className="h-4 w-4 mr-1" />}>
                              Share
                            </Button>
                            <Button variant="outline" size="sm" icon={<Download className="h-4 w-4 mr-1" />}>
                              Download
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medications Tab */}
        <TabsContent value="medications" className="space-y-6">
          <Card variant="default">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Medication History</CardTitle>
                <div className="flex items-center space-x-2">
                  <select className="text-sm rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>All Medications</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                  <Button size="sm" variant="primary">Add Medication</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Medication
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Dosage & Frequency
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Prescribed By
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {medications.map((medication) => (
                      <tr key={medication.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900 dark:text-white">{medication.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{medication.purpose}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">{medication.dosage}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{medication.frequency}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">Start: {medication.startDate}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">End: {medication.endDate}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {medication.prescribedBy}
                        </td>
                        <td className="px-4 py-4">
                          <Badge 
                            variant={medication.status === 'Active' ? 'success' : 'gray'} 
                            rounded
                          >
                            {medication.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="space-y-6">
          <Card variant="default">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Vital Signs History</CardTitle>
                <div className="flex items-center space-x-2">
                  <select className="text-sm rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>All Time</option>
                  </select>
                  <Button size="sm" variant="primary">Add Measurement</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-1" />
                      Heart Rate
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={vitalsData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
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
                              color: "var(--text-color)"
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="heartRate"
                            stroke="#ef4444"
                            name="Heart Rate (BPM)"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Current:</span>
                        <span className="ml-1 text-gray-600 dark:text-gray-400">
                          {vitalsData[vitalsData.length - 1].heartRate} BPM
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Average:</span>
                        <span className="ml-1 text-gray-600 dark:text-gray-400">
                          {Math.round(vitalsData.reduce((acc, curr) => acc + curr.heartRate, 0) / vitalsData.length)} BPM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Activity className="h-4 w-4 text-blue-500 mr-1" />
                      Blood Pressure
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={vitalsData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
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
                              color: "var(--text-color)"
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="bloodPressureSystolic"
                            stroke="#3b82f6"
                            name="Systolic (mmHg)"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="bloodPressureDiastolic"
                            stroke="#93c5fd"
                            name="Diastolic (mmHg)"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Current:</span>
                        <span className="ml-1 text-gray-600 dark:text-gray-400">
                          {vitalsData[vitalsData.length - 1].bloodPressureSystolic}/
                          {vitalsData[vitalsData.length - 1].bloodPressureDiastolic} mmHg
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">Average:</span>
                        <span className="ml-1 text-gray-600 dark:text-gray-400">
                          {Math.round(vitalsData.reduce((acc, curr) => acc + curr.bloodPressureSystolic, 0) / vitalsData.length)}/
                          {Math.round(vitalsData.reduce((acc, curr) => acc + curr.bloodPressureDiastolic, 0) / vitalsData.length)} mmHg
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Thermometer className="h-4 w-4 text-orange-500 mr-1" />
                  Body Temperature
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={vitalsData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
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
                        domain={[36, 38]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "var(--bg-color)", 
                          borderColor: "var(--border-color)",
                          color: "var(--text-color)"
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#f97316"
                        name="Temperature (°C)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Current:</span>
                    <span className="ml-1 text-gray-600 dark:text-gray-400">
                      {vitalsData[vitalsData.length - 1].temperature}°C
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Average:</span>
                    <span className="ml-1 text-gray-600 dark:text-gray-400">
                      {(vitalsData.reduce((acc, curr) => acc + curr.temperature, 0) / vitalsData.length).toFixed(1)}°C
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}