import React from "react";
import { useFormStep } from "../hooks/useFormStep";
import { validateProfile } from "../utils/validators";
import { PersonalVoiceProfile as ProfileComponent } from "../components/personal-voice-profile";
import type { ProfileFormErrors } from "../models/profile.model";
import type { ProfileData } from "../context/form-context";
import { StepType } from "../context/form-context";

/**
 * Profile step for Personal Voice setup
 * Uses custom hook for form management
 */
export const ProfileStep: React.FC = () => {
  // Map generic errors to typed errors
  const mapErrors = (errors: Record<string, string>): ProfileFormErrors => ({
    jobTitle: errors.jobTitle || '',
    region: errors.region || '',
    skills: errors.skills || ''
  });
  
  // Use our custom hook
  const { 
    formData, 
    errors, 
    handleChange, 
    handleSubmit 
  } = useFormStep<ProfileData, ProfileFormErrors>(
    validateProfile,
    StepType.VOICE, // next step
    null,           // no previous step
    'profile',
    mapErrors
  );
  
  return (
    <ProfileComponent
      formData={formData as ProfileData}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}; 