// Export the main component
export { PersonalVoice } from './lib/personal-voice';

// Export the step components
export { IntroStep } from './lib/steps/intro-step';
export { ProfileStep } from './lib/steps/profile-step';
export { VoiceStep } from './lib/steps/voice-step';
export { AudienceStep } from './lib/steps/audience-step';
export { FineTuningStep } from './lib/steps/fine-tuning-step';

// Export the UI components
export { PersonalVoiceStepper } from './lib/components/personal-voice-stepper';
export { PersonalVoiceProfile } from './lib/components/personal-voice-profile';
export { PersonalVoiceVoice } from './lib/components/personal-voice-voice';
export { PersonalVoiceAudience } from './lib/components/personal-voice-audience';
export { PersonalVoiceFineTuning } from './lib/components/personal-voice-fine-tuning';
export { PersonalVoicePreview } from './lib/components/personal-voice-preview';

// Export services
export { PersonalVoiceClient } from './lib/services/personalVoice.service';

// Export context and hooks
export { FormProvider, useFormContext, StepType } from './lib/context/form-context';
export { useFormStep } from './lib/hooks/useFormStep';

// Export types
export type { PersonalVoiceModel, PersonalVoiceWithId } from './lib/types/personalVoice.types';
