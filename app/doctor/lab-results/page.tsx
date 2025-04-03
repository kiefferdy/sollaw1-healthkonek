'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  FileText, 
  Calendar, 
  AlertCircle, 
  Download, 
  Share2, 
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogFooter } from '@/components/ui/Dialog';
import { RequestTestForm, RequestTestFormData } from '@/components/lab-results/RequestTestForm';
import { doctorOptions, testTypeOptions } from '@/components/lab-results/RequestTestForm';
import { useToast } from '@/components/ui/Toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const DoctorLayout = dynamic(() => import('@/components/layout/DoctorLayout'), { ssr: false });

// Type definitions
type LabResultStatus = 'normal' | 'abnormal' | 'borderline';
type TestCategory = 'Blood' | 'Urine' | 'Imaging' | 'Other';

interface LabTest {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status: LabResultStatus;
}

interface LabReport {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  category: TestCategory;
  description: string;
  tests: LabTest[];
  status: 'completed' | 'pending';
  file: string;
}

// Sample data for lab results
const labReports: LabReport[] = [
  {
    id: 'lr001',
    patientId: 'p001',
    patientName: 'John Smith',
    date: '2025-02-15',
    category: 'Blood',
    description: 'Complete Blood Count (CBC)',
    status: 'completed',
    file: 'cbc_results_feb2025.pdf',
    tests: [
      {
        id: 't1',
        name: 'WBC (White Blood Cell Count)',
        value: 8.2,
        unit: 'x10^9/L',
        referenceRange: '4.5-11.0',
        status: 'normal',
      },
      {
        id: 't2',
        name: 'RBC (Red Blood Cell Count)',
        value: 5.1,
        unit: 'x10^12/L',
        referenceRange: '4.5-5.9',
        status: 'normal',
      },
      {
        id: 't3',
        name: 'Hemoglobin',
        value: 14.8,
        unit: 'g/dL',
        referenceRange: '13.5-17.5',
        status: 'normal',
      },
      {
        id: 't4',
        name: 'Hematocrit',
        value: 44.2,
        unit: '%',
        referenceRange: '41.0-50.0',
        status: 'normal',
      },
      {
        id: 't5',
        name: 'Platelet Count',
        value: 245,
        unit: 'x10^9/L',
        referenceRange: '150-450',
        status: 'normal',
      },
    ],
  },
  {
    id: 'lr002',
    patientId: 'p002',
    patientName: 'Sarah Johnson',
    date: '2025-02-15',
    category: 'Blood',
    description: 'Lipid Panel',
    status: 'completed',
    file: 'lipid_panel_feb2025.pdf',
    tests: [
      {
        id: 't1',
        name: 'Total Cholesterol',
        value: 210,
        unit: 'mg/dL',
        referenceRange: '<200',
        status: 'borderline',
      },
      {
        id: 't2',
        name: 'HDL Cholesterol',
        value: 52,
        unit: 'mg/dL',
        referenceRange: '>40',
        status: 'normal',
      },
      {
        id: 't3',
        name: 'LDL Cholesterol',
        value: 142,
        unit: 'mg/dL',
        referenceRange: '<130',
        status: 'abnormal',
      },
      {
        id: 't4',
        name: 'Triglycerides',
        value: 120,
        unit: 'mg/dL',
        referenceRange: '<150',
        status: 'normal',
      },
    ],
  },
  {
    id: 'lr003',
    patientId: 'p003',
    patientName: 'Michael Chen',
    date: '2025-02-15',
    category: 'Blood',
    description: 'Comprehensive Metabolic Panel',
    status: 'completed',
    file: 'cmp_feb2025.pdf',
    tests: [
      {
        id: 't1',
        name: 'Glucose',
        value: 98,
        unit: 'mg/dL',
        referenceRange: '70-99',
        status: 'normal',
      },
      {
        id: 't2',
        name: 'Sodium',
        value: 142,
        unit: 'mmol/L',
        referenceRange: '136-145',
        status: 'normal',
      },
      {
        id: 't3',
        name: 'Potassium',
        value: 4.5,
        unit: 'mmol/L',
        referenceRange: '3.5-5.0',
        status: 'normal',
      },
      {
        id: 't4',
        name: 'Calcium',
        value: 9.2,
        unit: 'mg/dL',
        referenceRange: '8.5-10.5',
        status: 'normal',
      },
      {
        id: 't5',
        name: 'Creatinine',
        value: 1.1,
        unit: 'mg/dL',
        referenceRange: '0.7-1.3',
        status: 'normal',
      },
      {
        id: 't6',
        name: 'ALT',
        value: 32,
        unit: 'U/L',
        referenceRange: '7-56',
        status: 'normal',
      },
    ],
  },
  {
    id: 'lr004',
    patientId: 'p001',
    patientName: 'John Smith',
    date: '2024-12-10',
    category: 'Imaging',
    description: 'Chest X-Ray',
    status: 'completed',
    file: 'chest_xray_dec2024.pdf',
    tests: [
      {
        id: 't1',
        name: 'Chest X-Ray Findings',
        value: 'Normal',
        unit: '',
        referenceRange: 'Normal',
        status: 'normal',
      },
    ],
  },
  {
    id: 'lr005',
    patientId: 'p002',
    patientName: 'Sarah Johnson',
    date: '2025-03-05',
    category: 'Blood',
    description: 'HbA1c Test',
    status: 'pending',
    file: '',
    tests: [],
  },
];

// Sample data for historical cholesterol trends
const cholesterolTrends = [
  { date: '2023-09', total: 220, ldl: 155, hdl: 48 },
  { date: '2024-03', total: 215, ldl: 150, hdl: 50 },
  { date: '2024-09', total: 212, ldl: 145, hdl: 51 },
  { date: '2025-02', total: 210, ldl: 142, hdl: 52 },
];

export default function LabResultsPage() {
  const [activeTab, setActiveTab] = useState('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedReport, setExpandedReport] = useState<string | null>('lr002');
  const [isInsightPanelOpen, setIsInsightPanelOpen] = useState(true);
  const [isRequestTestDialogOpen, setIsRequestTestDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { toast, toastComponent } = useToast();
  
  // We need to be able to modify the lab reports for the demo
  const [labReportsState, setLabReportsState] = useState<LabReport[]>(labReports);
  
  // Filter lab reports based on search query and selected patient
  const filteredReports = labReportsState.filter(
    (report) =>
      (report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedPatient || report.patientId === selectedPatient)
  );
  
  const toggleReportExpansion = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };
  
  // Get status counts for summary
  const statusCounts = {
    normal: 0,
    abnormal: 0,
    borderline: 0,
    total: 0,
  };
  
  labReportsState.forEach((report) => {
    report.tests.forEach((test) => {
      statusCounts.total++;
      statusCounts[test.status]++;
    });
  });
  
  return (
    <DoctorLayout title="Lab Results">
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          View and manage laboratory test results for your patients. Track changes over time and get insights about their health.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            {activeTab === 'reports' && (
              <>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by patient name or test..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <select
                  value={selectedPatient || ''}
                  onChange={(e) => setSelectedPatient(e.target.value || null)}
                  className="text-sm rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">All Patients</option>
                  <option value="p001">John Smith</option>
                  <option value="p002">Sarah Johnson</option>
                  <option value="p003">Michael Chen</option>
                </select>
                <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4 mr-1" />}>
                  Filter
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card variant="default" hoverEffect>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary mr-4">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Tests</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">{statusCounts.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default" hoverEffect>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Normal Results</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">{statusCounts.normal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default" hoverEffect>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-4">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Borderline</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">{statusCounts.borderline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card variant="default" hoverEffect>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mr-4">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Abnormal</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">{statusCounts.abnormal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Lab Reports List */}
          <Card variant="default">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Lab Reports</CardTitle>
                <Button size="sm" variant="primary" onClick={() => setIsRequestTestDialogOpen(true)}>Order New Test</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReports.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No lab reports found matching your criteria
                  </div>
                ) : (
                  filteredReports.map((report) => {
                    const isExpanded = expandedReport === report.id;
                    return (
                      <div key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div
                          className="p-4 cursor-pointer"
                          onClick={() => toggleReportExpansion(report.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                                report.category === 'Blood' 
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                                  : report.category === 'Urine'
                                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                  : report.category === 'Imaging'
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                  : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                              }`}>
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium text-gray-900 dark:text-white">{report.description}</p>
                                  {report.status === 'pending' && (
                                    <Badge variant="warning" rounded className="ml-2">Pending</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {report.patientName} • {new Date(report.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Badge
                                variant={
                                  report.tests.some((test) => test.status === 'abnormal')
                                    ? 'danger'
                                    : report.tests.some((test) => test.status === 'borderline')
                                    ? 'warning'
                                    : 'success'
                                }
                                rounded
                              >
                                {report.tests.some((test) => test.status === 'abnormal')
                                  ? 'Abnormal'
                                  : report.tests.some((test) => test.status === 'borderline')
                                  ? 'Borderline'
                                  : 'Normal'}
                              </Badge>
                              {isExpanded ? (
                                <ChevronDown className="h-5 w-5 ml-2 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-5 w-5 ml-2 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {isExpanded && report.status !== 'pending' && (
                          <div className="px-4 pb-4">
                            <div className="ml-14">
                              {/* Test Results Table */}
                              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                      <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                          Test
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                          Result
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                          Reference Range
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                      {report.tests.map((test) => (
                                        <tr key={test.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {test.name}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {test.value} {test.unit}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {test.referenceRange} {test.unit}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Badge
                                              variant={
                                                test.status === 'normal'
                                                  ? 'success'
                                                  : test.status === 'borderline'
                                                  ? 'warning'
                                                  : 'danger'
                                              }
                                              rounded
                                            >
                                              {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                                            </Badge>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              
                              {/* Action buttons */}
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" icon={<Share2 className="h-4 w-4 mr-1" />}>
                                  Share with Patient
                                </Button>
                                <Button variant="outline" size="sm" icon={<Download className="h-4 w-4 mr-1" />}>
                                  Download
                                </Button>
                                <Button variant="primary" size="sm">
                                  Add to Patient Record
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card variant="default">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Health Metrics Trends</CardTitle>
                <div className="flex items-center space-x-2">
                  <select className="text-sm rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>Last 2 Years</option>
                    <option>All Time</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Cholesterol Trends */}
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Cholesterol Levels</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={cholesterolTrends}
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
                          domain={[0, 250]}
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
                          dataKey="total"
                          name="Total Cholesterol"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="ldl"
                          name="LDL Cholesterol"
                          stroke="#ef4444"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="hdl"
                          name="HDL Cholesterol"
                          stroke="#22c55e"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* WBC Trend */}
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">White Blood Cell Count</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { date: '2023-09', wbc: 7.8 },
                          { date: '2024-03', wbc: 8.0 },
                          { date: '2024-09', wbc: 7.9 },
                          { date: '2025-02', wbc: 8.2 },
                        ]}
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
                          domain={[4, 11]}
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
                          dataKey="wbc"
                          name="WBC (x10^9/L)"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Blood Glucose Trend */}
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Blood Glucose</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { date: '2023-09', glucose: 101 },
                          { date: '2024-03', glucose: 100 },
                          { date: '2024-09', glucose: 99 },
                          { date: '2025-02', glucose: 98 },
                        ]}
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
                          domain={[70, 120]}
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
                          dataKey="glucose"
                          name="Glucose (mg/dL)"
                          stroke="#f59e0b"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card variant="default">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Lab Test Requests</CardTitle>
                <Button size="sm" variant="primary" onClick={() => setIsRequestTestDialogOpen(true)}>New Request</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mt-1 mr-4">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">HbA1c Test</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Patient: Sarah Johnson • Scheduled for Mar 5, 2025
                        </p>
                        <div className="flex items-center mt-1">
                          <Badge variant="warning" rounded>Pending</Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            Appointment confirmed at MetroLab Manila
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" icon={<Download className="h-4 w-4 mr-1" />}>
                        Lab Order
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mt-1 mr-4">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Lipid Panel, CBC, CMP</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Patient: John Smith • Completed on Feb 15, 2025
                        </p>
                        <div className="flex items-center mt-1">
                          <Badge variant="success" rounded>Completed</Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            Results available in Reports tab
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<FileText className="h-4 w-4 mr-1" />}
                        onClick={() => {
                          setActiveTab('reports');
                          setExpandedReport('lr002');
                        }}
                      >
                        View Results
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mt-1 mr-4">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Chest X-Ray</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Patient: John Smith • Completed on Dec 10, 2024
                        </p>
                        <div className="flex items-center mt-1">
                          <Badge variant="success" rounded>Completed</Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                            Results available in Reports tab
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<FileText className="h-4 w-4 mr-1" />}
                        onClick={() => {
                          setActiveTab('reports');
                          setExpandedReport('lr004');
                        }}
                      >
                        View Results
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="default">
            <CardHeader>
              <CardTitle>Common Lab Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                These are common laboratory tests you might consider ordering for your patients. Always consider the patient's specific needs and medical history.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Complete Blood Count (CBC)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Screens for various disorders such as anemia, infection, and many other diseases.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Recommended frequency: Annually or as advised
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Lipid Panel</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Measures cholesterol and triglycerides to assess heart disease risk.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Recommended frequency: Every 4-6 years for average risk adults
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Comprehensive Metabolic Panel (CMP)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Assesses kidney and liver function, electrolyte and fluid balance, and blood sugar levels.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Recommended frequency: Annually or as advised
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">HbA1c</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Measures average blood glucose levels over the past 2-3 months to screen for diabetes.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Recommended frequency: Annually for at-risk individuals
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button size="sm" variant="outline" fullWidth>View All Test Types</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Request New Test Dialog */}
      <Dialog
        isOpen={isRequestTestDialogOpen}
        onClose={() => setIsRequestTestDialogOpen(false)}
        title="Order New Laboratory Test"
        size="lg"
      >
        <RequestTestForm
          onSubmit={(data: RequestTestFormData) => {
            console.log('Form submitted:', data);
            // Here you would typically send this data to your backend
            // For now, we'll just close the dialog and show a fake success state
            setIsRequestTestDialogOpen(false);
            
            // Create a new lab report request
            const today = new Date();
            const appointmentDate = new Date(data.appointmentDate);
            
            // Find the doctor name based on the selected ID
            const doctorName = doctorOptions.find(doc => doc.id === data.doctor)?.name || 'Unknown Doctor';
            
            // Find the test name based on the selected ID
            const testTypeName = testTypeOptions.find(test => test.id === data.testType)?.name || 'Lab Test';
            
            // Create a new pending lab report
            const newLabReport: LabReport = {
              id: `lr${Math.floor(Math.random() * 10000)}`,
              patientId: data.patientId,
              patientName: data.patientName,
              date: appointmentDate.toISOString().split('T')[0],
              category: data.testType === 'xray' || data.testType === 'mri' || data.testType === 'ultrasound' 
                ? 'Imaging' 
                : data.testType === 'urinalysis' 
                ? 'Urine' 
                : 'Blood',
              description: testTypeName,
              status: 'pending',
              file: '',
              tests: [],
            };
            
            // Add the new report to the state
            setLabReportsState(prev => [newLabReport, ...prev]);
            
            // Switch to the requests tab to show the new request
            setActiveTab('requests');
            
            // Show success notification
            toast('success', 'Test order submitted successfully! You will receive a confirmation email shortly.');
          }}
          onCancel={() => setIsRequestTestDialogOpen(false)}
        />
      </Dialog>
      
      {/* Toast notifications */}
      {toastComponent}
    </DoctorLayout>
  );
}