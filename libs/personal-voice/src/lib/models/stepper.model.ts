/**
 * Defines a step in the multi-step process
 */
export interface Step {
  id: number;
  label: string;
}

/**
 * Props for the stepper component
 */
export interface StepperProps {
  steps: Step[];
  currentStep: number;
} 