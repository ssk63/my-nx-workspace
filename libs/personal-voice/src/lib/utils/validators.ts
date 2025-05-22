import type { ProfileData, VoiceData } from "../context/form-context";

// Validation functions
export const validateProfile = (profile: ProfileData) => {
  const errors: Record<string, string> = {};
  
  if (!profile.jobTitle) errors.jobTitle = 'Job title is required';
  if (!profile.region) errors.region = 'Please select a region';
  if (!profile.skills) errors.skills = 'Please describe your skills';
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateVoice = (voice: VoiceData) => {
  const errors: Record<string, string> = {};
  
  if (!voice.creativityLevel) errors.creativityLevel = 'Please select a creativity level';
  if (!voice.tones || voice.tones.length === 0) errors.tones = 'Please select at least one tone';
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}; 