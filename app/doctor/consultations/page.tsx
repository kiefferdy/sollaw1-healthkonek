'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Phone, 
  FileText, 
  Clipboard, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  MessageCircle,
  Info,
  ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { format, addMinutes, isBefore } from 'date-fns';
import DoctorLayout from '@/app/components/layout/DoctorLayout';

const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), { ssr: false });

type ConsultationType = 'video' | 'phone';
type ConsultationStatus = 'scheduled' | 'completed' | 'missed' | 'cancelled';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

interface Consultation {
  id: number;
  doctor: Doctor;
  date: Date;
  duration: number; // in minutes
  type: ConsultationType;
  status: ConsultationStatus;
  reason?: string;
  notes?: string;
  recording?: string; // URL to recording if available
  summary?: string; // Consultation summary
  questionnaire?: {
    completed: boolean;
    questions: Question[];
  };
}

interface Question {
  id: number;
  text: string;
  type: 'text' | 'checkbox' | 'radio' | 'scale';
  options?: string[];
  answer?: string | string[] | number;
}

// Mock data for consultations
const consultations: Consultation[] = [
    {
      id: 1,
      doctor: {
        id: 1,
        name: 'John Smith',
        specialty: 'Discuss recent heart palpitations and review ECG results',
        image: '/images/patient-1.jpg',
      },
      date: new Date(new Date().setHours(new Date().getHours() + 2)), // 2 hours from now
      duration: 30,
      type: 'video',
      status: 'scheduled',
      reason: 'Discuss recent heart palpitations and review ECG results',
    },
    {
      id: 2,
      doctor: {
        id: 2,
        name: 'Emily Davis',
        specialty: 'Regular diabetes check-up and medication review',
        image: '/images/patient-2.jpg',
      },
      date: new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days from now
      duration: 45,
      type: 'video',
      status: 'scheduled',
      reason: 'Regular diabetes check-up and medication review',
    },
    {
      id: 3,
      doctor: {
        id: 3,
        name: 'Michael Johnson',
        specialty: 'Follow-up on skin condition and treatment effectiveness',
        image: '/images/patient-3.jpg',
      },
      date: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
      duration: 30,
      type: 'phone',
      status: 'completed',
      reason: 'Follow-up on skin condition and treatment effectiveness',
      notes: 'Patient reports improvement with prescribed cream. Continue current treatment for 2 more weeks.',
      summary: 'The patient reports that the prescribed hydrocortisone cream has reduced skin inflammation and itching. The rash is approximately 70% improved. Continue with current treatment for 2 more weeks, applying cream twice daily to affected areas. Follow up if symptoms worsen or don\'t continue to improve.'
    },
    {
      id: 4,
      doctor: {
        id: 4,
        name: 'Sarah Lee',
        specialty: 'Comprehensive neurological assessment for frequent migraines',
        image: '/images/patient-4.jpg',
      },
      date: new Date(new Date().setDate(new Date().getDate() - 12)), // 12 days ago
      duration: 60,
      type: 'video',
      status: 'completed',
      reason: 'Comprehensive neurological assessment for frequent migraines',
      recording: '/recordings/consultation-4.mp4',
      summary: 'Patient presents with history of frequent migraine attacks (3-4 per month), typically lasting 8-12 hours and accompanied by photophobia, nausea, and occasionally visual aura. Triggers include stress, lack of sleep, and certain foods. No significant findings on neurological examination. Recommended: 1) Start preventive medication (Propranolol 40mg daily), 2) Continue acute treatment with Sumatriptan as needed, 3) Maintain headache diary, 4) Consider lifestyle modifications including regular sleep schedule and stress reduction.'
    },
    {
      id: 5,
      doctor: {
        id: 2,
        name: 'Emily Davis',
        specialty: 'Review recent lab results and adjust medication if needed',
        image: '/images/patient-2.jpg',
      },
      date: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
      duration: 30,
      type: 'video',
      status: 'missed',
      reason: 'Review recent lab results and adjust medication if needed',
    },
  ];
  

// Pre-consultation questionnaire component
const QuestionnaireForm = ({
  consultation,
  onSubmit
}: {
  consultation: Consultation;
  onSubmit: () => void;
}) => {
  const [answers, setAnswers] = useState<Record<number, string | string[] | number>>({});

  const handleTextChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleScaleChange = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId: number, option: string, checked: boolean) => {
    setAnswers(prev => {
      const currentAnswers = (prev[questionId] as string[]) || [];
      
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, option]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(item => item !== option)
        };
      }
    });
  };

  const handleRadioChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the answers to the backend
    console.log('Submitting answers:', answers);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Pre-Consultation Questionnaire</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Please complete this questionnaire before your appointment with {consultation.doctor.name}. 
        Your answers will help the doctor prepare for your consultation.
      </p>

      {consultation.questionnaire?.questions.map((question) => (
        <div key={question.id} className="space-y-2">
          <label className="block font-medium">
            {question.text}
          </label>

          {question.type === 'text' && (
            <input
              type="text"
              className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2"
              value={(answers[question.id] as string) || ''}
              onChange={(e) => handleTextChange(question.id, e.target.value)}
            />
          )}

          {question.type === 'scale' && (
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    answers[question.id] === num
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleScaleChange(question.id, num)}
                >
                  {num}
                </button>
              ))}
            </div>
          )}

          {question.type === 'checkbox' && question.options && (
            <div className="space-y-2">
              {question.options.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`question-${question.id}-${option}`}
                    className="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                    checked={Array.isArray(answers[question.id]) && (answers[question.id] as string[])?.includes(option)}
                    onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
                  />
                  <label htmlFor={`question-${question.id}-${option}`} className="ml-2 text-gray-700 dark:text-gray-300">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}

          {question.type === 'radio' && question.options && (
            <div className="space-y-2">
              {question.options.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={`question-${question.id}-${option}`}
                    name={`question-${question.id}`}
                    className="border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800"
                    checked={answers[question.id] === option}
                    onChange={() => handleRadioChange(question.id, option)}
                  />
                  <label htmlFor={`question-${question.id}-${option}`} className="ml-2 text-gray-700 dark:text-gray-300">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Submit Questionnaire
        </Button>
      </div>
    </form>
  );
};

// Consultation details component
const ConsultationDetails = ({
  consultation
}: {
  consultation: Consultation;
}) => {
  const isPast = isBefore(consultation.date, new Date());

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Consultation Details</CardTitle>
        <CardDescription>
          {isPast 
            ? `Past consultation with ${consultation.doctor.name} on ${format(consultation.date, 'MMMM d, yyyy')}`
            : `Upcoming consultation with ${consultation.doctor.name} on ${format(consultation.date, 'MMMM d, yyyy')}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {consultation.doctor.image ? (
              <img
                src={consultation.doctor.image}
                alt={consultation.doctor.name}
                className="h-full w-full object-cover"
              />
            ) : (
              consultation.doctor.name.split(' ').map(name => name[0]).join('')
            )}
          </div>
          <div>
            <h3 className="font-medium">{consultation.doctor.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{consultation.doctor.specialty}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
            <p className="font-medium">{format(consultation.date, 'MMMM d, yyyy')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
            <p className="font-medium">{format(consultation.date, 'h:mm a')} - {format(addMinutes(consultation.date, consultation.duration), 'h:mm a')}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
            <div className="flex items-center">
              {consultation.type === 'video' ? (
                <>
                  <Video className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium">Video Consultation</span>
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium">Phone Consultation</span>
                </>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
            <p className="font-medium">{consultation.duration} minutes</p>
          </div>
        </div>

        {consultation.reason && (
          <div>
            <h4 className="font-medium mb-1">Reason for Consultation</h4>
            <p className="text-gray-700 dark:text-gray-300">{consultation.reason}</p>
          </div>
        )}

        {consultation.status === 'completed' && consultation.summary && (
          <div>
            <h4 className="font-medium mb-1">Consultation Summary</h4>
            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{consultation.summary}</p>
            </div>
          </div>
        )}

        {consultation.status === 'completed' && consultation.recording && (
          <div>
            <h4 className="font-medium mb-1">Consultation Recording</h4>
            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                  <span>Consultation Recording - {format(consultation.date, 'MMMM d, yyyy')}</span>
                </div>
                <Button variant="outline" size="sm">
                  Watch Recording
                </Button>
              </div>
            </div>
          </div>
        )}

        {!isPast && consultation.status === 'scheduled' && (
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <Button variant="primary" icon={consultation.type === 'video' ? <Video className="h-4 w-4" /> : <Phone className="h-4 w-4" />}>
              {consultation.type === 'video' ? 'Join Video Call' : 'Join Phone Call'}
            </Button>
            <Button variant="outline" icon={<MessageCircle className="h-4 w-4" />}>
              Message Doctor
            </Button>
            <Button variant="outline">
              Reschedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Consultation card component for list views
const ConsultationCard = ({
  consultation,
  onSelect
}: {
  consultation: Consultation;
  onSelect: () => void;
}) => {
  const isPast = isBefore(consultation.date, new Date());
  
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onSelect}>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 overflow-hidden">
              {consultation.doctor.image ? (
                <img
                  src={consultation.doctor.image}
                  alt={consultation.doctor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                consultation.doctor.name.split(' ').map(name => name[0]).join('')
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {consultation.doctor.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {consultation.doctor.specialty}
                </p>
              </div>
              <Badge
                variant={
                  consultation.status === 'scheduled'
                    ? 'primary'
                    : consultation.status === 'completed'
                    ? 'success'
                    : consultation.status === 'missed'
                    ? 'danger'
                    : 'default'
                }
                rounded
              >
                {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
              </Badge>
            </div>
            
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center mb-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{format(consultation.date, 'MMMM d, yyyy - h:mm a')}</span>
              </div>
              <div className="flex items-center mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span>{consultation.duration} minutes</span>
              </div>
              <div className="flex items-center">
                {consultation.type === 'video' ? (
                  <Video className="h-4 w-4 mr-1" />
                ) : (
                  <Phone className="h-4 w-4 mr-1" />
                )}
                <span>
                  {consultation.type === 'video'
                    ? 'Video Consultation'
                    : 'Phone Consultation'}
                </span>
              </div>
            </div>
            
            {!isPast && consultation.status === 'scheduled' && (
              <div className="mt-3 flex flex-wrap gap-2">
                {consultation.questionnaire && !consultation.questionnaire.completed && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<FileText className="h-4 w-4" />}
                  >
                    Complete Questionnaire
                  </Button>
                )}
                {consultation.questionnaire && consultation.questionnaire.completed && (
                  <Badge variant="success" size="sm" className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Questionnaire Completed
                  </Badge>
                )}
              </div>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 self-center ml-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  
  const upcomingConsultations = consultations.filter(c => 
    c.status === 'scheduled' && !isBefore(c.date, new Date())
  );
  
  const pastConsultations = consultations.filter(c => 
    c.status === 'completed' || isBefore(c.date, new Date())
  );
  
  const missedConsultations = consultations.filter(c => 
    c.status === 'missed' || c.status === 'cancelled'
  );
  
  const handleSelectConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    
    // Show questionnaire if it's incomplete and upcoming
    if (
      consultation.status === 'scheduled' && 
      consultation.questionnaire && 
      !consultation.questionnaire.completed &&
      !isBefore(consultation.date, new Date())
    ) {
      setShowQuestionnaire(true);
    } else {
      setShowQuestionnaire(false);
    }
  };
  
  const handleQuestionnaireSubmit = () => {
    setShowQuestionnaire(false);
    // In a real app, you would update the consultation data
  };
  
  const handleBack = () => {
    setSelectedConsultation(null);
    setShowQuestionnaire(false);
  };

  return (
    <DoctorLayout title="Consultations">
      {!selectedConsultation ? (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcomingConsultations.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastConsultations.length})</TabsTrigger>
              <TabsTrigger value="missed">Missed/Cancelled ({missedConsultations.length})</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 gap-4">
            {activeTab === 'upcoming' && (
              <>
                {upcomingConsultations.length > 0 ? (
                  upcomingConsultations.map(consultation => (
                    <ConsultationCard 
                      key={consultation.id}
                      consultation={consultation}
                      onSelect={() => handleSelectConsultation(consultation)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You don't have any upcoming consultations scheduled.
                      </p>
                      <Button variant="primary">
                        Book New Consultation
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
            
            {activeTab === 'past' && (
              <>
                {pastConsultations.length > 0 ? (
                  pastConsultations.map(consultation => (
                    <ConsultationCard 
                      key={consultation.id}
                      consultation={consultation}
                      onSelect={() => handleSelectConsultation(consultation)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        You don't have any past consultations.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
            
            {activeTab === 'missed' && (
              <>
                {missedConsultations.length > 0 ? (
                  missedConsultations.map(consultation => (
                    <ConsultationCard 
                      key={consultation.id}
                      consultation={consultation}
                      onSelect={() => handleSelectConsultation(consultation)}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        You don't have any missed or cancelled consultations.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <Button variant="ghost" onClick={handleBack} className="pl-0">
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to All Consultations
            </Button>
          </div>
          
          {showQuestionnaire ? (
            <Card>
              <CardContent className="p-6">
                <QuestionnaireForm 
                  consultation={selectedConsultation}
                  onSubmit={handleQuestionnaireSubmit}
                />
              </CardContent>
            </Card>
          ) : (
            <ConsultationDetails consultation={selectedConsultation} />
          )}
        </>
      )}
    </DoctorLayout>
  );
}