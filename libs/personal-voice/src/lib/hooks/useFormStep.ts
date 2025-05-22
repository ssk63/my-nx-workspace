import { useState } from 'react';
import { useFormContext, StepType } from '../context/form-context';

type ValidationFn<T> = (data: T) => { valid: boolean; errors: Record<string, string> };
type ErrorMapping<E> = (errors: Record<string, string>) => E;

/**
 * Custom hook to handle common form step logic
 * 
 * @param validationFn - Function to validate the form data
 * @param nextStep - The next step to navigate to
 * @param prevStep - The previous step to navigate to
 * @param sectionKey - The section key in the form state
 * @param mapErrors - Function to map generic errors to typed errors
 */
export function useFormStep<T, E>(
  validationFn: ValidationFn<T>,
  nextStep: StepType | null,
  prevStep: StepType | null,
  sectionKey: 'profile' | 'voice' | 'audience' | 'fineTuning',
  mapErrors: ErrorMapping<E>
) {
  const { 
    formState, 
    updateProfile, 
    updateVoice, 
    updateAudience, 
    updateFineTuning, 
    goToStep 
  } = useFormContext();
  
  const [errors, setErrors] = useState<E>(mapErrors({}));
  
  // Get the correct data and updater based on section
  const formData = formState[sectionKey];
  const updateData = {
    'profile': updateProfile,
    'voice': updateVoice,
    'audience': updateAudience,
    'fineTuning': updateFineTuning
  }[sectionKey];
  
  // Handle field changes
  const handleChange = (field: string, value: unknown) => {
    updateData({ [field]: value });
    
    // Clear error when user types
    if (errors && Object.prototype.hasOwnProperty.call(errors, field)) {
      setErrors({
        ...errors,
        [field]: ''
      } as E);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    const validation = validationFn(formData as T);
    
    if (validation.valid && nextStep) {
      // Navigate to next step
      goToStep(nextStep);
    } else {
      // Show validation errors
      setErrors(mapErrors(validation.errors));
    }
  };
  
  // Handle back navigation
  const handleBack = () => {
    if (prevStep) {
      goToStep(prevStep);
    }
  };
  
  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleBack
  };
} 