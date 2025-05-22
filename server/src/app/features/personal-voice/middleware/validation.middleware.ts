import type { Request, Response, NextFunction } from 'express';

/**
 * Validates data for creating a personal voice
 */
export const validateCreatePersonalVoice = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { key, name, profile, toneOfVoice, audience, fineTuning } = req.body;
  const errors = [];
  
  // Required fields
  if (!key) errors.push('key is required');
  if (!name) errors.push('name is required');
  if (!profile) errors.push('profile is required');
  if (!toneOfVoice) errors.push('toneOfVoice is required');
  if (!audience) errors.push('audience is required');
  if (!fineTuning) errors.push('fineTuning is required');
  
  // Validate nested objects
  if (profile) {
    if (!profile.jobTitle) errors.push('profile.jobTitle is required');
    if (!profile.geographicalFocus) errors.push('profile.geographicalFocus is required');
    if (!Array.isArray(profile.skillsAndExpertise)) errors.push('profile.skillsAndExpertise must be an array');
  }
  
  if (toneOfVoice) {
    if (!toneOfVoice.writingSample) errors.push('toneOfVoice.writingSample is required');
    if (!Array.isArray(toneOfVoice.toneOfVoiceAttributes)) errors.push('toneOfVoice.toneOfVoiceAttributes must be an array');
  }
  
  if (audience) {
    if (!Array.isArray(audience.audienceDemographics)) errors.push('audience.audienceDemographics must be an array');
  }
  
  if (fineTuning) {
    if (typeof fineTuning.temperature !== 'number') errors.push('fineTuning.temperature must be a number');
    if (!fineTuning.engagementStyle) errors.push('fineTuning.engagementStyle is required');
    if (typeof fineTuning.useEmojis !== 'boolean') errors.push('fineTuning.useEmojis must be a boolean');
    if (typeof fineTuning.translate !== 'boolean') errors.push('fineTuning.translate must be a boolean');
  }
  
  if (errors.length > 0) {
    res.status(400).json({
      error: 'ValidationError',
      message: 'Validation failed',
      details: errors
    });
    return;
  }
  
  next();
};

/**
 * Validates data for updating a personal voice
 */
export const validateUpdatePersonalVoice = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { key, profile, toneOfVoice, audience, fineTuning } = req.body;
  const errors = [];
  
  // Validate nested objects if present
  if (profile) {
    if (profile.jobTitle === '') errors.push('profile.jobTitle cannot be empty if provided');
    if (profile.geographicalFocus === '') errors.push('profile.geographicalFocus cannot be empty if provided');
    if (profile.skillsAndExpertise && !Array.isArray(profile.skillsAndExpertise)) 
      errors.push('profile.skillsAndExpertise must be an array');
  }
  
  if (toneOfVoice) {
    if (toneOfVoice.writingSample === '') errors.push('toneOfVoice.writingSample cannot be empty if provided');
    if (toneOfVoice.toneOfVoiceAttributes && !Array.isArray(toneOfVoice.toneOfVoiceAttributes)) 
      errors.push('toneOfVoice.toneOfVoiceAttributes must be an array');
  }
  
  if (audience) {
    if (audience.audienceDemographics && !Array.isArray(audience.audienceDemographics)) 
      errors.push('audience.audienceDemographics must be an array');
  }
  
  if (fineTuning) {
    if (fineTuning.temperature !== undefined && typeof fineTuning.temperature !== 'number') 
      errors.push('fineTuning.temperature must be a number');
    if (fineTuning.engagementStyle === '') 
      errors.push('fineTuning.engagementStyle cannot be empty if provided');
    if (fineTuning.useEmojis !== undefined && typeof fineTuning.useEmojis !== 'boolean') 
      errors.push('fineTuning.useEmojis must be a boolean');
    if (fineTuning.translate !== undefined && typeof fineTuning.translate !== 'boolean') 
      errors.push('fineTuning.translate must be a boolean');
  }
  
  if (errors.length > 0) {
    res.status(400).json({
      error: 'ValidationError',
      message: 'Validation failed',
      details: errors
    });
    return;
  }
  
  next();
}; 