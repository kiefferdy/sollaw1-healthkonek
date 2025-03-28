'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Heart, 
  AlertCircle,
  Edit,
  Shield,
  FileText,
  Download,
  Upload,
  Save,
  X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), { ssr: false });

// Sample user profile data
const userProfile = {
  id: 'u1001',
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  email: 'juan.delacruz@email.com',
  phone: '+63 912 345 6789',
  dateOfBirth: '1985-05-15',
  gender: 'Male',
  bloodType: 'O+',
  address: {
    street: '123 Bonifacio St.',
    barangay: 'San Antonio',
    city: 'Makati City',
    province: 'Metro Manila',
    postalCode: '1200',
  },
  emergencyContact: {
    name: 'Maria Dela Cruz',
    relationship: 'Spouse',
    phone: '+63 912 987 6543',
  },
  medicalInfo: {
    allergies: ['Penicillin', 'Shellfish'],
    chronicConditions: ['Hypertension', 'Hyperlipidemia'],
    medications: ['Metformin', 'Losartan', 'Atorvastatin'],
    surgicalHistory: ['Appendectomy (2010)'],
  },
  insurance: {
    provider: 'PhilHealth',
    memberID: 'PH-12345678901',
    groupNumber: 'G-7890',
    coverageType: 'Premium',
    expirationDate: '2025-12-31',
  },
  preferences: {
    language: 'English',
    communicationMethod: 'Email',
    appointmentReminders: true,
    medicationReminders: true,
    newsletterSubscription: false,
  },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  
  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === 'root') {
      setEditedProfile({
        ...editedProfile,
        [field]: value,
      });
    } else {
      setEditedProfile({
        ...editedProfile,
        [section]: {
          ...editedProfile[section as keyof typeof editedProfile],
          [field]: value,
        },
      });
    }
  };
  
  const cancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };
  
  const saveChanges = () => {
    // In a real app, this would send the updated profile to the backend
    // For now, just exit edit mode
    setIsEditing(false);
  };
  
  return (
    <MainLayout title="Profile">
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your personal information, medical history, and account preferences.
        </p>
      </div>
      
      {/* Profile Summary Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <Avatar 
              size="xl" 
              alt={`${userProfile.firstName} ${userProfile.lastName}`} 
              fallback={`${userProfile.firstName.charAt(0)}${userProfile.lastName.charAt(0)}`} 
              className="mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userProfile.firstName} {userProfile.lastName}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-2">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">{userProfile.email}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{userProfile.phone}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" rounded className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(userProfile.dateOfBirth).toLocaleDateString()}
                </Badge>
                <Badge variant="outline" rounded className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {userProfile.gender}
                </Badge>
                <Badge variant="outline" rounded className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  {userProfile.bloodType}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={<X className="h-4 w-4 mr-1" />}
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  icon={<Save className="h-4 w-4 mr-1" />}
                  onClick={saveChanges}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                icon={<Edit className="h-4 w-4 mr-1" />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        
        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.firstName}
                        onChange={(e) => handleInputChange('root', 'firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('root', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedProfile.dateOfBirth}
                        onChange={(e) => handleInputChange('root', 'dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{new Date(userProfile.dateOfBirth).toLocaleDateString()}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Blood Type
                    </label>
                    {isEditing ? (
                      <select
                        value={editedProfile.bloodType}
                        onChange={(e) => handleInputChange('root', 'bloodType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.bloodType}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.lastName}
                        onChange={(e) => handleInputChange('root', 'lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.lastName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('root', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        value={editedProfile.gender}
                        onChange={(e) => handleInputChange('root', 'gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.gender}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Street Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.address.street}
                        onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.address.street}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.address.city}
                        onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.address.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Postal Code
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.address.postalCode}
                        onChange={(e) => handleInputChange('address', 'postalCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.address.postalCode}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Barangay
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.address.barangay}
                        onChange={(e) => handleInputChange('address', 'barangay', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.address.barangay}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Province
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.address.province}
                        onChange={(e) => handleInputChange('address', 'province', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{userProfile.address.province}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {!isEditing && (
                <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {userProfile.address.street}, {userProfile.address.barangay}, {userProfile.address.city}, {userProfile.address.province} {userProfile.address.postalCode}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.emergencyContact.name}
                      onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.emergencyContact.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Relationship
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.emergencyContact.relationship}
                      onChange={(e) => handleInputChange('emergencyContact', 'relationship', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.emergencyContact.relationship}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.emergencyContact.phone}
                      onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.emergencyContact.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Medical Information Tab */}
        <TabsContent value="medical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Allergies</h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      {editedProfile.medicalInfo.allergies.map((allergy, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={allergy}
                            onChange={(e) => {
                              const newAllergies = [...editedProfile.medicalInfo.allergies];
                              newAllergies[index] = e.target.value;
                              setEditedProfile({
                                ...editedProfile,
                                medicalInfo: {
                                  ...editedProfile.medicalInfo,
                                  allergies: newAllergies,
                                },
                              });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <button 
                            className="ml-2 p-2 text-gray-500 hover:text-red-500"
                            onClick={() => {
                              const newAllergies = editedProfile.medicalInfo.allergies.filter((_, i) => i !== index);
                              setEditedProfile({
                                ...editedProfile,
                                medicalInfo: {
                                  ...editedProfile.medicalInfo,
                                  allergies: newAllergies,
                                },
                              });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditedProfile({
                            ...editedProfile,
                            medicalInfo: {
                              ...editedProfile.medicalInfo,
                              allergies: [...editedProfile.medicalInfo.allergies, ''],
                            },
                          });
                        }}
                      >
                        Add Allergy
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {userProfile.medicalInfo.allergies.length > 0 ? (
                        userProfile.medicalInfo.allergies.map((allergy, index) => (
                          <Badge key={index} variant="outline" className="mr-2">
                            {allergy}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No known allergies</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Chronic Conditions</h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      {editedProfile.medicalInfo.chronicConditions.map((condition, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="text"
                            value={condition}
                            onChange={(e) => {
                              const newConditions = [...editedProfile.medicalInfo.chronicConditions];
                              newConditions[index] = e.target.value;
                              setEditedProfile({
                                ...editedProfile,
                                medicalInfo: {
                                  ...editedProfile.medicalInfo,
                                  chronicConditions: newConditions,
                                },
                              });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <button 
                            className="ml-2 p-2 text-gray-500 hover:text-red-500"
                            onClick={() => {
                              const newConditions = editedProfile.medicalInfo.chronicConditions.filter((_, i) => i !== index);
                              setEditedProfile({
                                ...editedProfile,
                                medicalInfo: {
                                  ...editedProfile.medicalInfo,
                                  chronicConditions: newConditions,
                                },
                              });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditedProfile({
                            ...editedProfile,
                            medicalInfo: {
                              ...editedProfile.medicalInfo,
                              chronicConditions: [...editedProfile.medicalInfo.chronicConditions, ''],
                            },
                          });
                        }}
                      >
                        Add Condition
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {userProfile.medicalInfo.chronicConditions.length > 0 ? (
                        userProfile.medicalInfo.chronicConditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="mr-2">
                            {condition}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No chronic conditions</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Current Medications</h3>
                {isEditing ? (
                  <div className="space-y-2">
                    {editedProfile.medicalInfo.medications.map((medication, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          value={medication}
                          onChange={(e) => {
                            const newMedications = [...editedProfile.medicalInfo.medications];
                            newMedications[index] = e.target.value;
                            setEditedProfile({
                              ...editedProfile,
                              medicalInfo: {
                                ...editedProfile.medicalInfo,
                                medications: newMedications,
                              },
                            });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <button 
                          className="ml-2 p-2 text-gray-500 hover:text-red-500"
                          onClick={() => {
                            const newMedications = editedProfile.medicalInfo.medications.filter((_, i) => i !== index);
                            setEditedProfile({
                              ...editedProfile,
                              medicalInfo: {
                                ...editedProfile.medicalInfo,
                                medications: newMedications,
                              },
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditedProfile({
                          ...editedProfile,
                          medicalInfo: {
                            ...editedProfile.medicalInfo,
                            medications: [...editedProfile.medicalInfo.medications, ''],
                          },
                        });
                      }}
                    >
                      Add Medication
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {userProfile.medicalInfo.medications.length > 0 ? (
                      userProfile.medicalInfo.medications.map((medication, index) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {medication}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No current medications</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Surgical History</h3>
                {isEditing ? (
                  <div className="space-y-2">
                    {editedProfile.medicalInfo.surgicalHistory.map((surgery, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          value={surgery}
                          onChange={(e) => {
                            const newSurgicalHistory = [...editedProfile.medicalInfo.surgicalHistory];
                            newSurgicalHistory[index] = e.target.value;
                            setEditedProfile({
                              ...editedProfile,
                              medicalInfo: {
                                ...editedProfile.medicalInfo,
                                surgicalHistory: newSurgicalHistory,
                              },
                            });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                        <button 
                          className="ml-2 p-2 text-gray-500 hover:text-red-500"
                          onClick={() => {
                            const newSurgicalHistory = editedProfile.medicalInfo.surgicalHistory.filter((_, i) => i !== index);
                            setEditedProfile({
                              ...editedProfile,
                              medicalInfo: {
                                ...editedProfile.medicalInfo,
                                surgicalHistory: newSurgicalHistory,
                              },
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditedProfile({
                          ...editedProfile,
                          medicalInfo: {
                            ...editedProfile.medicalInfo,
                            surgicalHistory: [...editedProfile.medicalInfo.surgicalHistory, ''],
                          },
                        });
                      }}
                    >
                      Add Surgery
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {userProfile.medicalInfo.surgicalHistory.length > 0 ? (
                      userProfile.medicalInfo.surgicalHistory.map((surgery, index) => (
                        <p key={index} className="text-gray-900 dark:text-white">
                          {surgery}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No surgical history</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Insurance Tab */}
        <TabsContent value="insurance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Insurance Provider
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.insurance.provider}
                      onChange={(e) => handleInputChange('insurance', 'provider', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.insurance.provider}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Member ID
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.insurance.memberID}
                      onChange={(e) => handleInputChange('insurance', 'memberID', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.insurance.memberID}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Group Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.insurance.groupNumber}
                      onChange={(e) => handleInputChange('insurance', 'groupNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.insurance.groupNumber}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Coverage Type
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.insurance.coverageType}
                      onChange={(e) => handleInputChange('insurance', 'coverageType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.insurance.coverageType}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiration Date
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedProfile.insurance.expirationDate}
                      onChange={(e) => handleInputChange('insurance', 'expirationDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{new Date(userProfile.insurance.expirationDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
              
              {!isEditing && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Coverage Information</h4>
                      <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                        Your PhilHealth Premium coverage includes inpatient care, outpatient services, and emergency care.
                        For detailed information about your benefits, please contact PhilHealth directly or visit their website.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Preferred Language
                  </label>
                  {isEditing ? (
                    <select
                      value={editedProfile.preferences.language}
                      onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="English">English</option>
                      <option value="Filipino">Filipino</option>
                      <option value="Cebuano">Cebuano</option>
                      <option value="Ilocano">Ilocano</option>
                      <option value="Hiligaynon">Hiligaynon</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.preferences.language}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Preferred Communication Method
                  </label>
                  {isEditing ? (
                    <select
                      value={editedProfile.preferences.communicationMethod}
                      onChange={(e) => handleInputChange('preferences', 'communicationMethod', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="Email">Email</option>
                      <option value="SMS">SMS</option>
                      <option value="Phone Call">Phone Call</option>
                      <option value="Push Notification">Push Notification</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 dark:text-white">{userProfile.preferences.communicationMethod}</p>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Notification Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 dark:text-white">Appointment Reminders</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive reminders about upcoming appointments
                      </p>
                    </div>
                    {isEditing ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={editedProfile.preferences.appointmentReminders}
                          onChange={(e) => {
                            setEditedProfile({
                              ...editedProfile,
                              preferences: {
                                ...editedProfile.preferences,
                                appointmentReminders: e.target.checked,
                              },
                            });
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    ) : (
                      <Badge variant={userProfile.preferences.appointmentReminders ? 'success' : 'gray'} rounded>
                        {userProfile.preferences.appointmentReminders ? 'Enabled' : 'Disabled'}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 dark:text-white">Medication Reminders</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive reminders to take your medications
                      </p>
                    </div>
                    {isEditing ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={editedProfile.preferences.medicationReminders}
                          onChange={(e) => {
                            setEditedProfile({
                              ...editedProfile,
                              preferences: {
                                ...editedProfile.preferences,
                                medicationReminders: e.target.checked,
                              },
                            });
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    ) : (
                      <Badge variant={userProfile.preferences.medicationReminders ? 'success' : 'gray'} rounded>
                        {userProfile.preferences.medicationReminders ? 'Enabled' : 'Disabled'}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 dark:text-white">Newsletter Subscription</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive health tips and updates
                      </p>
                    </div>
                    {isEditing ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={editedProfile.preferences.newsletterSubscription}
                          onChange={(e) => {
                            setEditedProfile({
                              ...editedProfile,
                              preferences: {
                                ...editedProfile.preferences,
                                newsletterSubscription: e.target.checked,
                              },
                            });
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    ) : (
                      <Badge variant={userProfile.preferences.newsletterSubscription ? 'success' : 'gray'} rounded>
                        {userProfile.preferences.newsletterSubscription ? 'Enabled' : 'Disabled'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Medical Documents</CardTitle>
                <Button size="sm" variant="primary" icon={<Upload className="h-4 w-4 mr-1" />}>
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Medical Certificate.pdf</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Uploaded on March 10, 2025 • 245 KB
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} />
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Vaccination_Record.pdf</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Uploaded on February 5, 2025 • 320 KB
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} />
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Insurance_Card.pdf</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Uploaded on January 15, 2025 • 150 KB
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={<Download className="h-4 w-4" />} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Setup
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Download Your Data</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get a copy of your personal health records
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" icon={<Download className="h-4 w-4 mr-1" />}>
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}