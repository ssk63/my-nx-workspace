import React, { useState } from "react";
import { useFormContext, StepType } from "../context/form-context";
import { useFormStep } from "../hooks/useFormStep";
import type { FineTuningData } from "../context/form-context";
import { PersonalVoiceFineTuning } from "../components/personal-voice-fine-tuning";
import { PersonalVoicePreview } from "../components/personal-voice-preview";

interface FineTuningStepProps {
  onSetupComplete?: () => void;
}

/**
 * Fine Tuning step for Personal Voice setup
 * Uses custom hook for form management
 */
export const FineTuningStep: React.FC<FineTuningStepProps> = ({ onSetupComplete }) => {
  const { formState, resetForm, goToStep } = useFormContext();
  const [isComplete, setIsComplete] = useState(false);
  
  // Simple validation that always passes
  const validateFineTuning = () => ({
    valid: true,
    errors: {}
  });
  
  // Use our custom hook
  const { 
    formData, 
    handleChange,
    handleBack 
  } = useFormStep<FineTuningData, Record<string, string>>(
    validateFineTuning,
    null,                // No next step (we'll handle it manually)
    StepType.AUDIENCE,   // previous step
    'fineTuning',
    errors => errors
  );
  
  // Custom submit handler for final step
  const handleSubmit = () => {
    // Show completion status with preview
    setIsComplete(true);
    
    // Call the setup complete callback if provided
    if (onSetupComplete) {
      onSetupComplete();
    }
  };
  
  // Handlers for the preview component
  const handleDelete = () => {
    resetForm();
    goToStep(StepType.INTRO);
  };
  
  const handleEdit = () => {
    setIsComplete(false);
  };
  
  const handleTest = () => {
    // In a real app, this would trigger a test of the configured voice
    alert("Testing your personal voice settings...");
  };
  
  if (isComplete) {
    return (
      <PersonalVoicePreview
        formData={formState}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onTest={handleTest}
      />
    );
  }
  
  return (
    <PersonalVoiceFineTuning
      formData={formData as unknown as FineTuningData}
      onChange={handleChange}
      onBack={handleBack}
      onFinish={handleSubmit}
    />
  );
}; 