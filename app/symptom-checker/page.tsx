'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Search, Thermometer, AlertCircle, ThumbsUp, ThumbsDown, X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), { ssr: false });

type Symptom = {
  id: string;
  name: string;
};

type BodyArea = {
  id: string;
  name: string;
  symptoms: Symptom[];
};

type Severity = 'low' | 'medium' | 'high';

type AssessmentResult = {
  possibleConditions: {
    name: string;
    probability: number;
    severity: Severity;
    description: string;
    recommendations: string[];
  }[];
  urgency: Severity;
  recommendations: string[];
};

const bodyAreas: BodyArea[] = [
  {
    id: 'head',
    name: 'Head & Face',
    symptoms: [
      { id: 'headache', name: 'Headache' },
      { id: 'dizziness', name: 'Dizziness' },
      { id: 'facial-pain', name: 'Facial Pain' },
      { id: 'blurred-vision', name: 'Blurred Vision' },
      { id: 'ear-pain', name: 'Ear Pain' },
    ],
  },
  {
    id: 'chest',
    name: 'Chest & Back',
    symptoms: [
      { id: 'chest-pain', name: 'Chest Pain' },
      { id: 'shortness-of-breath', name: 'Shortness of Breath' },
      { id: 'palpitations', name: 'Palpitations' },
      { id: 'cough', name: 'Cough' },
      { id: 'back-pain', name: 'Back Pain' },
    ],
  },
  {
    id: 'abdomen',
    name: 'Abdomen & Digestive',
    symptoms: [
      { id: 'abdominal-pain', name: 'Abdominal Pain' },
      { id: 'nausea', name: 'Nausea' },
      { id: 'vomiting', name: 'Vomiting' },
      { id: 'diarrhea', name: 'Diarrhea' },
      { id: 'constipation', name: 'Constipation' },
    ],
  },
  {
    id: 'limbs',
    name: 'Arms & Legs',
    symptoms: [
      { id: 'joint-pain', name: 'Joint Pain' },
      { id: 'muscle-pain', name: 'Muscle Pain' },
      { id: 'swelling', name: 'Swelling' },
      { id: 'numbness', name: 'Numbness or Tingling' },
      { id: 'weakness', name: 'Weakness' },
    ],
  },
  {
    id: 'general',
    name: 'General & Systemic',
    symptoms: [
      { id: 'fever', name: 'Fever' },
      { id: 'fatigue', name: 'Fatigue' },
      { id: 'chills', name: 'Chills' },
      { id: 'night-sweats', name: 'Night Sweats' },
      { id: 'weight-loss', name: 'Unexplained Weight Loss' },
    ],
  },
];

// Mock assessment result for demo purposes
const mockAssessmentResult: AssessmentResult = {
  possibleConditions: [
    {
      name: 'Common Cold',
      probability: 0.85,
      severity: 'low',
      description:
        'A mild viral infection of the nose and throat, characterized by sneezing, coughing, sore throat, and sometimes fever.',
      recommendations: [
        'Rest and stay hydrated',
        'Take over-the-counter pain relievers if needed',
        'Use a humidifier to ease congestion',
        'Monitor symptoms for 5-7 days',
      ],
    },
    {
      name: 'Seasonal Allergies',
      probability: 0.65,
      severity: 'low',
      description:
        'An allergic response to seasonal triggers like pollen, causing symptoms similar to a cold.',
      recommendations: [
        'Take antihistamines to reduce symptoms',
        'Avoid known allergens when possible',
        'Use nasal saline rinses to clear sinuses',
        'Consider a consultation with an allergist if symptoms persist',
      ],
    },
    {
      name: 'Influenza (Flu)',
      probability: 0.35,
      severity: 'medium',
      description:
        'A viral infection that attacks your respiratory system with more severe symptoms than a common cold.',
      recommendations: [
        'Rest and stay hydrated',
        'Take fever-reducing medication if needed',
        'Monitor for worsening symptoms',
        'Consult a doctor if symptoms worsen or last more than a week',
      ],
    },
  ],
  urgency: 'low',
  recommendations: [
    'Rest and stay hydrated',
    'Monitor symptoms for the next 48-72 hours',
    'If symptoms worsen or you develop high fever, seek medical attention',
    'Over-the-counter medications may help manage symptoms',
  ],
};

export default function SymptomCheckerPage() {
  const [step, setStep] = useState<'select' | 'details' | 'result'>('select');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleStartAssessment = () => {
    setStep('details');
  };

  const handleSubmitAssessment = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setAssessmentResult(mockAssessmentResult);
      setIsLoading(false);
      setStep('result');
    }, 2000);
  };

  const filteredBodyAreas = bodyAreas.map((area) => ({
    ...area,
    symptoms: area.symptoms.filter((symptom) =>
      searchQuery
        ? symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    ),
  })).filter((area) => area.symptoms.length > 0);

  return (
    <MainLayout title="Symptom Checker">
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          Our AI-powered symptom checker can help you understand your symptoms and provide guidance
          on next steps. This is not a replacement for professional medical advice.
        </p>
      </div>

      {step === 'select' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Select Your Symptoms</CardTitle>
              <Badge variant={selectedSymptoms.length > 0 ? 'primary' : 'gray'} rounded>
                {selectedSymptoms.length} selected
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredBodyAreas.map((area) => (
                <div key={area.id}>
                  <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">{area.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {area.symptoms.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom.id);
                      return (
                        <div
                          key={symptom.id}
                          className={`p-3 rounded-md border cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                              : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => handleSymptomToggle(symptom.id)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm dark:text-gray-200">{symptom.name}</span>
                            {isSelected && <Check className="h-4 w-4 text-primary" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedSymptoms.length === 0
                ? 'Select at least one symptom to continue'
                : `${selectedSymptoms.length} symptom${
                    selectedSymptoms.length !== 1 ? 's' : ''
                  } selected`}
            </div>
            <Button
              variant="primary"
              disabled={selectedSymptoms.length === 0}
              onClick={handleStartAssessment}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'details' && (
        <Card>
          <CardHeader>
            <CardTitle>Provide Additional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  How long have you been experiencing these symptoms?
                </label>
                <select className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Less than a day</option>
                  <option>1-3 days</option>
                  <option>3-7 days</option>
                  <option>1-2 weeks</option>
                  <option>More than 2 weeks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  How would you rate the severity of your symptoms?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="border dark:border-gray-700 rounded-md p-3 cursor-pointer hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-center">
                    <span className="block text-sm font-medium dark:text-white">Mild</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Noticeable but not disruptive</span>
                  </div>
                  <div className="border dark:border-gray-700 rounded-md p-3 cursor-pointer hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-center border-primary-500 bg-primary-50 dark:bg-primary-900/50">
                    <span className="block text-sm font-medium dark:text-white">Moderate</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Disruptive to daily activities</span>
                  </div>
                  <div className="border dark:border-gray-700 rounded-md p-3 cursor-pointer hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-center">
                    <span className="block text-sm font-medium dark:text-white">Severe</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Significantly impacts daily life</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Have you recently taken any medication for these symptoms?
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="medication"
                      value="yes"
                      className="form-radio text-primary focus:ring-primary"
                    />
                    <span className="ml-2 dark:text-white">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="medication"
                      value="no"
                      className="form-radio text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <span className="ml-2 dark:text-white">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Do you have any existing medical conditions?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Thyroid Issues'].map(
                    (condition) => (
                      <label key={condition} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm dark:text-white">{condition}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Any additional notes about your symptoms?
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Add any details that might be relevant..."
                ></textarea>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <Button variant="outline" onClick={() => setStep('select')}>
              Back
            </Button>
            <Button variant="primary" onClick={handleSubmitAssessment}>
              Submit for Assessment
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'result' && assessmentResult && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">Analyzing your symptoms...</p>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI is processing your information to provide you with insights.
              </p>
            </div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Assessment Results</CardTitle>
                    <Badge
                      variant={
                        assessmentResult.urgency === 'high'
                          ? 'danger'
                          : assessmentResult.urgency === 'medium'
                          ? 'warning'
                          : 'success'
                      }
                      rounded
                      className="capitalize"
                    >
                      {assessmentResult.urgency} Urgency
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Based on your symptoms</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Here are the potential conditions that match your symptoms. This is not a
                      diagnosis, and you should consult with a healthcare professional for proper
                      evaluation.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {assessmentResult.possibleConditions.map((condition, index) => (
                      <div
                        key={index}
                        className="border dark:border-gray-700 rounded-lg overflow-hidden"
                      >
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                          <div className="flex items-center">
                            <div
                              className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                                condition.severity === 'high'
                                  ? 'bg-red-100 text-red-600'
                                  : condition.severity === 'medium'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-green-100 text-green-600'
                              }`}
                            >
                              {condition.severity === 'high' ? (
                                <AlertCircle className="h-5 w-5" />
                              ) : condition.severity === 'medium' ? (
                                <Thermometer className="h-5 w-5" />
                              ) : (
                                <ThumbsUp className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{condition.name}</h4>
                              <div className="flex items-center">
                                <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                                  <div
                                    className={`h-full rounded-full ${
                                      condition.probability > 0.7
                                        ? 'bg-red-500'
                                        : condition.probability > 0.4
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                    }`}
                                    style={{ width: `${condition.probability * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {Math.round(condition.probability * 100)}% match
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              condition.severity === 'high'
                                ? 'danger'
                                : condition.severity === 'medium'
                                ? 'warning'
                                : 'success'
                            }
                            size="sm"
                            rounded
                            className="capitalize"
                          >
                            {condition.severity} severity
                          </Badge>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{condition.description}</p>
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommendations:</h5>
                            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {condition.recommendations.map((rec, i) => (
                                <li key={i}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">
                        General Recommendations
                      </h3>
                      <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        {assessmentResult.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Would you like to consult with a doctor?
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                          variant="primary"
                          fullWidth
                          className="h-auto py-3"
                        >
                          <div className="text-left">
                            <span className="block font-medium">Schedule Video Consultation</span>
                            <span className="text-xs opacity-90">
                              Connect with a doctor via video call
                            </span>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          fullWidth
                          className="h-auto py-3"
                        >
                          <div className="text-left">
                            <span className="block font-medium">Message a Doctor</span>
                            <span className="text-xs opacity-90">
                              Send your assessment to a doctor
                            </span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="w-full flex justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Was this assessment helpful?
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<ThumbsUp className="h-4 w-4 mr-1" />}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<ThumbsDown className="h-4 w-4 mr-1" />}
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep('select')}>
                  New Assessment
                </Button>
                <Button variant="secondary">Save to Health Record</Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h3 className="text-md font-medium text-yellow-800 dark:text-yellow-300 mb-2">Important Disclaimer</h3>
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          This symptom checker is for informational purposes only and is not a qualified medical
          opinion. It should not be used for self-diagnosis. Always consult with a healthcare
          professional for proper diagnosis and treatment. Seek immediate medical attention for
          serious or life-threatening conditions.
        </p>
      </div>
    </MainLayout>
  );
}