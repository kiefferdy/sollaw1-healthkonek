'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RequestTestFormProps {
  onSubmit: (data: RequestTestFormData) => void;
  onCancel: () => void;
}

export interface RequestTestFormData {
  testType: string;
  doctor: string;
  facility: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
}

export const testTypeOptions = [
  { id: 'cbc', name: 'Complete Blood Count (CBC)' },
  { id: 'lipid', name: 'Lipid Panel' },
  { id: 'cmp', name: 'Comprehensive Metabolic Panel' },
  { id: 'hba1c', name: 'HbA1c' },
  { id: 'thyroid', name: 'Thyroid Function (TSH, T3, T4)' },
  { id: 'urinalysis', name: 'Urinalysis' },
  { id: 'vitaminD', name: 'Vitamin D' },
  { id: 'xray', name: 'X-Ray' },
  { id: 'mri', name: 'MRI' },
  { id: 'ultrasound', name: 'Ultrasound' },
  { id: 'other', name: 'Other (specify in notes)' },
];

export const doctorOptions = [
  { id: 'dr1', name: 'Dr. Juan Reyes' },
  { id: 'dr2', name: 'Dr. Maria Santos' },
  { id: 'dr3', name: 'Dr. Ana Lim' },
  { id: 'dr4', name: 'Dr. Ricardo Cruz' },
  { id: 'dr5', name: 'Dr. Sofia Mendoza' },
];

export const facilityOptions = [
  { id: 'f1', name: 'MetroLab Manila' },
  { id: 'f2', name: 'HealthFirst Diagnostics' },
  { id: 'f3', name: 'Philippine General Hospital' },
  { id: 'f4', name: 'St. Luke\'s Medical Center' },
  { id: 'f5', name: 'Makati Medical Center' },
];

export const RequestTestForm: React.FC<RequestTestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<RequestTestFormData>({
    testType: '',
    doctor: '',
    facility: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for the min date of the date picker
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="testType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Test Type*
        </label>
        <select
          id="testType"
          name="testType"
          value={formData.testType}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="" disabled>Select a test type</option>
          {testTypeOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Ordering Doctor*
        </label>
        <select
          id="doctor"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="" disabled>Select a doctor</option>
          {doctorOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="facility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Laboratory/Facility*
        </label>
        <select
          id="facility"
          name="facility"
          value={formData.facility}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="" disabled>Select a facility</option>
          {facilityOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Preferred Date*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              min={getTomorrow()}
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 pl-10 pr-3 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Preferred Time*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 pl-10 pr-3 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any specific instructions or concerns..."
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md flex items-start">
        <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          After submitting, you'll receive a confirmation email with your lab order. 
          You may need to present this at the facility. Some tests may require fasting 
          or special preparation.
        </p>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Submit Request
        </Button>
      </div>
    </form>
  );
};
