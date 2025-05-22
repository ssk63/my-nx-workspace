import React, { useState, useEffect } from "react";
import { useFormContext, StepType } from "./context/form-context";
import type { FormState } from "./context/form-context";
import { IntroStep } from "./steps/intro-step";
import { ProfileStep } from "./steps/profile-step";
import { VoiceStep } from "./steps/voice-step";
import { AudienceStep } from "./steps/audience-step";
import { FineTuningStep } from "./steps/fine-tuning-step";
import { PersonalVoiceStepper } from "./components/personal-voice-stepper";
import { PersonalVoicePreview } from "./components/personal-voice-preview";
import { PersonalVoiceClient } from "./services/personalVoice.service";
import type { PersonalVoiceModel, PersonalVoiceWithId } from "./types/personalVoice.types";
import type { AxiosError } from "axios";

// Convert from API model to form state
const convertToFormState = (model: PersonalVoiceModel | PersonalVoiceWithId): FormState => {
  return {
    profile: {
      jobTitle: model.profile.jobTitle,
      region: model.profile.geographicalFocus,
      skills: model.profile.skillsAndExpertise.join(', ')
    },
    voice: {
      writingSample: model.toneOfVoice.writingSample,
      creativityLevel: 'balanced', // Default value since API doesn't have this
      tones: model.toneOfVoice.toneOfVoiceAttributes
    },
    audience: {
      targetGroups: model.audience.audienceDemographics
    },
    fineTuning: {
      audienceType: '', // Default value since API doesn't have this
      callToAction: model.fineTuning.engagementStyle,
      useEmojis: model.fineTuning.useEmojis,
      translateContent: model.fineTuning.translate,
      translateLanguage: model.fineTuning.translateTo
    }
  };
};

// Convert from form state to API model
const convertToApiModel = (formState: FormState): PersonalVoiceModel => {
  // Make sure we have a non-empty skills array even if skills is empty
  const skillsArray = formState.profile.skills
    ? formState.profile.skills.split(',').filter(skill => skill.trim().length > 0).map(skill => skill.trim())
    : ['General'];
    
  // Ensure we have at least one tone attribute
  const tones = formState.voice.tones.length > 0
    ? formState.voice.tones
    : ['Professional'];
    
  // Ensure we have at least one audience demographic
  const demographics = formState.audience.targetGroups.length > 0
    ? formState.audience.targetGroups
    : ['General Audience'];
    
  return {
    key: `personal-voice-${Date.now()}`, // Generate a unique key
    name: `Personal Voice - ${formState.profile.jobTitle || 'User'}`, // Generate a name with fallback
    enabled: true,
    profile: {
      jobTitle: formState.profile.jobTitle || 'Professional',
      geographicalFocus: formState.profile.region || 'Global',
      skillsAndExpertise: skillsArray
    },
    toneOfVoice: {
      writingSample: formState.voice.writingSample || 'This is a sample text for the personal voice.',
      toneOfVoiceAttributes: tones
    },
    audience: {
      audienceDemographics: demographics
    },
    fineTuning: {
      temperature: 0.7, // Default value
      engagementStyle: formState.fineTuning.callToAction || 'Informative',
      useEmojis: !!formState.fineTuning.useEmojis,
      translate: !!formState.fineTuning.translateContent,
      translateTo: formState.fineTuning.translateLanguage || ''
    }
  };
};

/**
 * Main component for Personal Voice setup
 * Uses Context API for steps, but handles preview mode independently
 */
export const PersonalVoice: React.FC = () => {
  const { currentStep, formState, updateProfile, updateVoice, updateAudience, updateFineTuning, goToStep } = useFormContext();
  const [personalVoiceData, setPersonalVoiceData] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [voiceId, setVoiceId] = useState<string | null>(null);
  
  // Fetch personal voice data on component mount - ONLY ONCE
  useEffect(() => {
    // Only fetch if we haven't fetched yet
    if (!hasFetched) {
      const fetchData = async () => {
        try {
          setLoading(true);
          
          // Get all voices and use the first one if available
          const voices = await PersonalVoiceClient.getAllVoices();
          
          if (voices.length > 0) {
            // Get the first voice as an example
            const voiceModel = voices[0] as PersonalVoiceWithId;
            const formState = convertToFormState(voiceModel);
            
            setPersonalVoiceData(formState);
            setVoiceId(voiceModel.id);
          } else {
            setPersonalVoiceData(null);
          }
          
          setHasFetched(true);
        } catch (error) {
          console.error('Error fetching personal voice data:', error);
          setHasFetched(true); // Set this to true so we don't keep trying
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [hasFetched]);
  
  // Define steps for the stepper
  const steps = [
    { id: 1, label: "Your Profile" },
    { id: 2, label: "Your Voice" },
    { id: 3, label: "Audience" },
    { id: 4, label: "Fine-tuning" }
  ];
  
  // Map steps to step numbers for the stepper
  const stepToNumberMapping: Record<string, number> = {
    [StepType.PROFILE]: 1,
    [StepType.VOICE]: 2,
    [StepType.AUDIENCE]: 3,
    [StepType.FINE_TUNING]: 4
  };
  
  // Determine current step number for stepper
  const currentStepNumber = stepToNumberMapping[currentStep] || 0;
  
  // Handle actions from the preview component
  const handleDelete = async () => {
    try {
      setLoading(true);
      if (voiceId) {
        await PersonalVoiceClient.deleteVoice(voiceId);
      }
      setPersonalVoiceData(null);
      setVoiceId(null);
    } catch (error) {
      console.error('Error deleting voice:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = () => {
    // When editing, initialize form with current data
    if (personalVoiceData) {
      // Set all values in the form context
      const { profile, voice, audience, fineTuning } = personalVoiceData;
      
      // Update each section of the form
      if (profile) {
        updateProfile({
          jobTitle: profile.jobTitle,
          region: profile.region,
          skills: profile.skills
        });
      }
      
      if (voice) {
        updateVoice({
          writingSample: voice.writingSample,
          creativityLevel: voice.creativityLevel,
          tones: [...voice.tones]
        });
      }
      
      if (audience) {
        updateAudience({
          targetGroups: [...audience.targetGroups]
        });
      }
      
      if (fineTuning) {
        updateFineTuning({
          audienceType: fineTuning.audienceType,
          callToAction: fineTuning.callToAction,
          useEmojis: fineTuning.useEmojis,
          translateContent: fineTuning.translateContent,
          translateLanguage: fineTuning.translateLanguage
        });
      }
      
      // Start editing at the profile step
      goToStep(StepType.PROFILE);
      
      // Set edit mode (displays the form)
      setEditMode(true);
    }
  };
  
  const handleTest = () => {
    // For demo purposes, just alert
    alert("Testing your personal voice settings...");
  };
  
  // Render the appropriate step based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case StepType.INTRO:
        return <IntroStep />;
      case StepType.PROFILE:
        return <ProfileStep />;
      case StepType.VOICE:
        return <VoiceStep />;
      case StepType.AUDIENCE:
        return <AudienceStep />;
      case StepType.FINE_TUNING:
        return <FineTuningStep onSetupComplete={async () => {
          try {
            setLoading(true);
            
            // Convert form state to API model
            const apiModel = convertToApiModel(formState);
            
            // Debug log to see what we're sending
            console.log("Sending to API:", apiModel);
            
            // Create or update the voice
            let savedVoice;
            if (voiceId) {
              savedVoice = await PersonalVoiceClient.updateVoice(voiceId, apiModel);
            } else {
              savedVoice = await PersonalVoiceClient.createVoice(apiModel);
            }
            
            // Convert back to form state for the preview
            const updatedFormState = convertToFormState(savedVoice);
            setPersonalVoiceData(updatedFormState);
            setVoiceId((savedVoice as PersonalVoiceWithId).id);
            setEditMode(false);
          } catch (error) {
            console.error('Error saving voice:', error);
            if ((error as AxiosError).isAxiosError) {
              console.log('Error details:', (error as AxiosError).response?.data);
            }
          } finally {
            setLoading(false);
          }
        }} />;
      default:
        return <IntroStep />;
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
          Personal Voice
        </h1>
        <div className="text-center py-10">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Determine what to render based on personal voice data and edit mode
  const renderContent = () => {
    // In edit mode or when no personal voice exists, show the form flow
    if (editMode || !personalVoiceData) {
      return (
        <>
          {/* Only show stepper if not on the intro page */}
          {currentStep !== StepType.INTRO && (
            <PersonalVoiceStepper 
              steps={steps} 
              currentStep={currentStepNumber} 
            />
          )}
          
          {/* Render the current step */}
          {renderStep()}
        </>
      );
    }
    
    // Otherwise show the preview
    return (
      <PersonalVoicePreview
        formData={personalVoiceData}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onTest={handleTest}
      />
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
        Personal Voice
      </h1>
      
      <div className="mt-8">
        {renderContent()}
      </div>
    </div>
  );
}; 