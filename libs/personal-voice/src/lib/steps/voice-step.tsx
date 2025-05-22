import React from "react";
import { useFormStep } from "../hooks/useFormStep";
import { validateVoice } from "../utils/validators";
import { PersonalVoiceVoice as VoiceComponent } from "../components/personal-voice-voice";
import type { VoiceData } from "../context/form-context";
import { StepType } from "../context/form-context";

/**
 * Voice step for Personal Voice setup
 * Uses custom hook for form management
 */
export const VoiceStep: React.FC = () => {
  // Use our custom hook
  const { 
    formData, 
    handleChange: baseHandleChange, 
    handleSubmit,
    handleBack 
  } = useFormStep<VoiceData, Record<string, string>>(
    validateVoice,
    StepType.AUDIENCE, // next step
    StepType.PROFILE,  // previous step
    'voice',
    errors => errors
  );
  
  // Wrapper for handleChange to correctly cast the type
  const handleChange = <T extends string | string[]>(field: string, value: T) => {
    baseHandleChange(field, value);
  };

  // Special handling for tone toggles
  const handleToggleTone = (tone: string) => {
    const voiceData = formData as VoiceData;
    const tones = voiceData.tones || [];
    
    // If tone is already selected, remove it
    if (tones.includes(tone)) {
      const updatedTones = tones.filter((t: string) => t !== tone);
      handleChange('tones', updatedTones);
      return;
    }
    
    // Otherwise add the tone (UI already prevents selecting more than 4)
    handleChange('tones', [...tones, tone]);
  };
  
  return (
    <VoiceComponent
      formData={formData as unknown as VoiceData}
      onChange={handleChange}
      onToggleTone={handleToggleTone}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}; 