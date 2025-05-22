import React from "react";
import { useFormStep } from "../hooks/useFormStep";
import type { AudienceData } from "../context/form-context";
import { StepType } from "../context/form-context";
import { PersonalVoiceAudience as AudienceComponent } from "../components/personal-voice-audience";

/**
 * Audience step for Personal Voice setup
 * Uses custom hook for form management
 */
export const AudienceStep: React.FC = () => {
  // Custom validation for audience step
  const validateAudience = (data: AudienceData) => {
    const errors: Record<string, string> = {};
    
    if (!data.targetGroups || data.targetGroups.length === 0) {
      errors.targetGroups = 'Please select at least one audience group';
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Use our custom hook
  const { 
    formData, 
    handleChange,
    handleSubmit,
    handleBack 
  } = useFormStep<AudienceData, Record<string, string>>(
    validateAudience,
    StepType.FINE_TUNING, // next step
    StepType.VOICE,       // previous step
    'audience',
    errors => errors
  );
  
  // Special handling for group toggles
  const handleToggleGroup = (group: string) => {
    const audienceData = formData as AudienceData;
    const targetGroups = audienceData.targetGroups || [];
    
    // If group is already selected, remove it
    if (targetGroups.includes(group)) {
      const updatedGroups = targetGroups.filter((g: string) => g !== group);
      handleChange('targetGroups', updatedGroups);
      return;
    }
    
    // Otherwise add the group (UI already prevents selecting more than 4)
    handleChange('targetGroups', [...targetGroups, group]);
  };
  
  return (
    <AudienceComponent
      formData={formData as AudienceData}
      onToggleGroup={handleToggleGroup}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}; 