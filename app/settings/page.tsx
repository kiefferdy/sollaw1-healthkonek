'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  Smartphone, 
  Globe, 
  Lock, 
  Edit3, 
  LogOut,
  Save,
  X,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Heart
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import ThemeToggle from '@/components/ui/ThemeToggle';

const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), { ssr: false });

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handlePasswordChange = () => {
    // Validate inputs
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordChangeStatus('error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordChangeStatus('error');
      return;
    }
    
    // In a real app, this would call an API to change the password
    setPasswordChangeStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordChangeStatus('idle');
    }, 3000);
  };
  
  return (
    <MainLayout title="Settings">
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings, preferences, and security options.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>
        
        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <input
                        type="email"
                        value="juan.delacruz@email.com"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <Button variant="outline" size="sm" className="ml-2" icon={<Edit3 className="h-4 w-4" />} />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Your email address is also your username
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <input
                        type="tel"
                        value="+63 912 345 6789"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <Button variant="outline" size="sm" className="ml-2" icon={<Edit3 className="h-4 w-4" />} />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Used for account recovery and notifications
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Connected Accounts
                  </label>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h21.351C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0zm-3.999 7.288l.001 1.286c0 3.186-2.434 6.855-6.855 6.855-1.359 0-2.633-.4-3.699-1.083.511.06 1.031.081 1.55.067 3.037-.057 5.29-1.471 6.635-3.639-.98.059-1.941-.517-2.396-1.381.309.059.635.09.967.078.328-.012.646-.098.944-.242 1.336-.644 2.074-2.079 2.051-3.541-.315.188-.665.301-1.034.312.609-.409 1.095-.977 1.371-1.667.276-.685.345-1.435.197-2.158-1.267 1.555-3.131 2.556-5.182 2.662-1.566-1.63-4.159-1.683-5.796-.118-1.099 1.048-1.55 2.587-1.178 4.029-1.789-.085-3.514-.735-4.993-1.889-1.48-1.153-2.636-2.764-3.362-4.659-.532.981-.678 2.1-.417 3.173.524 2.152 2.299 3.807 4.461 4.15-.624.175-1.277.222-1.917.133.602 1.872 2.304 3.178 4.29 3.276-1.624 1.266-3.678 1.946-5.79 1.932-.376-.005-.752-.035-1.124-.088 2.152 1.338 4.63 2.046 7.167 2.036 4.429.013 8.626-1.824 11.639-5.037 3.007-3.213 4.693-7.463 4.695-11.909z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Twitter</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Facebook</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Connected as Juan Dela Cruz</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.607,1.972-2.101,3.467-4.26,3.866 c-3.431,0.635-6.862-1.865-7.403-5.092c-0.662-3.947,2.107-7.301,6.08-7.301c3.034,0,5.492,1.906,6.072,5.097h-5.926 C13.4,10.247,12.545,11.102,12.545,12.151z"></path><path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M17.907,17.907 c-3.327,3.328-8.713,3.326-12.04,0c-3.327-3.326-3.327-8.713,0-12.04s8.713-3.327,12.04,0C21.234,9.194,21.234,14.58,17.907,17.907 z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Google</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="mt-4"
                    icon={<LogOut className="h-4 w-4 mr-1" />}
                  >
                    Log Out of All Devices
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Language & Timezone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="en">English</option>
                    <option value="fil">Filipino</option>
                    <option value="ceb">Cebuano</option>
                    <option value="ilo">Ilocano</option>
                    <option value="hil">Hiligaynon</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Choose your preferred language for the app interface
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Timezone
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="Asia/Manila">(GMT+8:00) Philippines Time</option>
                    <option value="Asia/Singapore">(GMT+8:00) Singapore Time</option>
                    <option value="Asia/Tokyo">(GMT+9:00) Japan Time</option>
                    <option value="America/Los_Angeles">(GMT-8:00) Pacific Time</option>
                    <option value="Europe/London">(GMT+0:00) London Time</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Used for scheduling appointments and reminders
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h3 className="text-md font-medium text-red-800 dark:text-red-300 mb-2">Delete Account</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Once you delete your account, there is no going back. All of your data will be permanently removed.
                  </p>
                  <Button variant="danger" size="sm">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and special characters
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                
                {passwordChangeStatus === 'success' && (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Password updated successfully!</span>
                  </div>
                )}
                
                {passwordChangeStatus === 'error' && (
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Please check your inputs and try again.</span>
                  </div>
                )}
                
                <div className="pt-2">
                  <Button 
                    variant="primary" 
                    onClick={handlePasswordChange}
                    disabled={!oldPassword || !newPassword || !confirmPassword}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 mr-3">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <Badge variant="danger" rounded>Disabled</Badge>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      SMS Authentication
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Receive a code via SMS to verify your identity
                    </p>
                    <Button variant="outline" size="sm">Setup</Button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Authenticator App
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Use an authentication app to generate verification codes
                    </p>
                    <Button variant="outline" size="sm">Setup</Button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Once you've enabled two-factor authentication, you'll need both your password and access to your phone to log in.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Login Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Manila, Philippines</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Today, 10:30 AM • Chrome on Windows
                      </p>
                    </div>
                    <Badge variant="success" rounded>Current Session</Badge>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Manila, Philippines</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Yesterday, 8:45 PM • Safari on iPhone
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Logout</Button>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Makati, Philippines</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        March 25, 2025, 3:15 PM • Chrome on Android
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Logout</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Appointment Reminders</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified about upcoming appointments
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Medication Reminders</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified about medication schedules
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Lab Results</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when new lab results are available
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Doctor Messages</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when doctors send you messages
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Newsletter & Updates</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive health tips and HealthKonek updates
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Appointment Reminders</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get SMS reminders for appointments
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Medication Reminders</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get SMS reminders for medications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Lab Results</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get SMS notifications for lab results
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Enable Push Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications on your device
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Do Not Disturb</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Enable Do Not Disturb</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Pause notifications during specified hours
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          defaultValue="22:00"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          defaultValue="07:00"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Color Theme</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer">
                      <div className="h-20 w-full bg-white border border-gray-200 rounded-md mb-4 flex items-center justify-center">
                        <Sun className="h-6 w-6 text-yellow-500" />
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">Light Mode</p>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center hover:border-primary cursor-pointer">
                      <div className="h-20 w-full bg-gray-900 border border-gray-700 rounded-md mb-4 flex items-center justify-center">
                        <Moon className="h-6 w-6 text-gray-300" />
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                    </div>
                    
                    <div className="border border-primary/50 dark:border-primary/50 rounded-lg p-4 flex flex-col items-center bg-gray-50 dark:bg-gray-800">
                      <div className="h-20 w-full bg-gradient-to-r from-white to-gray-900 border border-gray-200 dark:border-gray-700 rounded-md mb-4 flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Sun className="h-6 w-6 text-yellow-500" />
                          <Moon className="h-6 w-6 text-gray-300" />
                        </div>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">System Default</p>
                      <Badge variant="primary" className="mt-2">Current</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center">
                    <span className="mr-4 text-gray-700 dark:text-gray-300">Toggle Theme:</span>
                    <ThemeToggle />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Font Size</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="font-size-range" className="text-gray-700 dark:text-gray-300">
                        Text Size
                      </label>
                      <span className="text-gray-900 dark:text-white font-medium">Medium</span>
                    </div>
                    <input
                      id="font-size-range"
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                      step="1"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Small</span>
                      <span>Medium</span>
                      <span>Large</span>
                    </div>
                    
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">This is a heading</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        This is sample text that shows how the content will appear with your selected font size.
                        You can adjust the slider above to change the size of all text throughout the application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white">High Contrast Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Increases contrast for better visibility
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white">Reduce Motion</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Minimizes animation effects
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 dark:text-white">Screen Reader Support</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Optimizes content for screen readers
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mt-1 mr-3">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">iPhone 13 Pro</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last active: Today, 10:30 AM
                        </p>
                        <div className="flex items-center mt-1">
                          <Badge variant="success" rounded>Current Device</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-1 mr-3">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Chrome on Windows</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last active: Yesterday, 7:45 PM
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mt-1 mr-3">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Samsung Galaxy S22</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last active: March 25, 2025
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Wearable Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mt-1 mr-3">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16.5,12A4.5,4.5,0,0,0,12,7.5H11a4.5,4.5,0,0,0,0,9h1A4.5,4.5,0,0,0,16.5,12Z"></path><path d="M8.25,12a3.75,3.75,0,0,1,3.75-3.75h.75a3.75,3.75,0,0,1,0,7.5H12A3.75,3.75,0,0,1,8.25,12Z"></path><path d="M12,2.25A9.75,9.75,0,1,0,21.75,12,9.76,9.76,0,0,0,12,2.25Zm1,15.75H11a5.25,5.25,0,0,1,0-10.5h2a5.25,5.25,0,0,1,0,10.5Z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Apple Watch Series 7</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Connected • Last synced: 15 minutes ago
                        </p>
                        <div className="flex items-center mt-1">
                          <Badge variant="success" rounded>Active</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Settings</Button>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center">
                  <p className="text-gray-700 dark:text-gray-300">Connect a new wearable device</p>
                  <Button variant="primary" size="sm">Connect Device</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Health Monitoring Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-1 mr-3">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Blood Pressure Monitor</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Connected • Last synced: Yesterday
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Settings</Button>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center">
                  <p className="text-gray-700 dark:text-gray-300">Connect a new health monitoring device</p>
                  <Button variant="primary" size="sm">Connect Device</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}