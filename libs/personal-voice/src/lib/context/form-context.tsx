import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define types for your form data
export interface ProfileData {
  jobTitle: string;
  region: string;
  skills: string;
}

export interface VoiceData {
  writingSample: string;
  creativityLevel: 'conservative' | 'balanced' | 'highlyCreative';
  tones: string[];
}

export interface AudienceData {
  targetGroups: string[];
}

export interface FineTuningData {
  audienceType: string;
  callToAction: string;
  useEmojis: boolean;
  translateContent: boolean;
  translateLanguage: string;
}

export interface FormState {
  profile: ProfileData;
  voice: VoiceData;
  audience: AudienceData;
  fineTuning: FineTuningData;
}

// Step management using enum instead of string literals
export enum StepType {
  INTRO = 'intro',
  PROFILE = 'profile',
  VOICE = 'voice',
  AUDIENCE = 'audience',
  FINE_TUNING = 'fine-tuning'
}

// Define step order once for navigation
const STEP_ORDER = [
  StepType.INTRO,
  StepType.PROFILE,
  StepType.VOICE,
  StepType.AUDIENCE,
  StepType.FINE_TUNING
];

// Initial form state
const initialFormState: FormState = {
  profile: {
    jobTitle: '',
    region: '',
    skills: ''
  },
  voice: {
    writingSample: '',
    creativityLevel: 'balanced',
    tones: []
  },
  audience: {
    targetGroups: []
  },
  fineTuning: {
    audienceType: '',
    callToAction: '',
    useEmojis: false,
    translateContent: false,
    translateLanguage: ''
  }
};

interface FormContextType {
  formState: FormState;
  currentStep: StepType;
  updateProfile: (data: Partial<ProfileData>) => void;
  updateVoice: (data: Partial<VoiceData>) => void;
  updateAudience: (data: Partial<AudienceData>) => void;
  updateFineTuning: (data: Partial<FineTuningData>) => void;
  resetForm: () => void;
  goToStep: (step: StepType) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create the provider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [currentStep, setCurrentStep] = useState<StepType>(StepType.INTRO);

  const updateProfile = (data: Partial<ProfileData>) => {
    setFormState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...data }
    }));
  };

  const updateVoice = (data: Partial<VoiceData>) => {
    setFormState(prev => ({
      ...prev,
      voice: { ...prev.voice, ...data }
    }));
  };

  const updateAudience = (data: Partial<AudienceData>) => {
    setFormState(prev => ({
      ...prev,
      audience: { ...prev.audience, ...data }
    }));
  };

  const updateFineTuning = (data: Partial<FineTuningData>) => {
    setFormState(prev => ({
      ...prev,
      fineTuning: { ...prev.fineTuning, ...data }
    }));
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setCurrentStep(StepType.INTRO);
  };
  
  const goToStep = (step: StepType) => {
    setCurrentStep(step);
  };
  
  const goToNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  };
  
  const goToPreviousStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
    }
  };

  return (
    <FormContext.Provider value={{
      formState,
      currentStep,
      updateProfile,
      updateVoice,
      updateAudience,
      updateFineTuning,
      resetForm,
      goToStep,
      goToNextStep,
      goToPreviousStep
    }}>
      {children}
    </FormContext.Provider>
  );
};

// Create a custom hook for using the form context
export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}; 