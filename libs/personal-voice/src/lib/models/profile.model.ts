import type { ProfileData } from '../context/form-context';

/**
 * Errors have the same shape as the form data, but all string values
 */
export type ProfileFormErrors = {
  [K in keyof ProfileData]: string;
};

/**
 * Props for the profile component
 */
export interface ProfileProps {
  formData: ProfileData;
  errors: ProfileFormErrors;
  onChange: (field: keyof ProfileData, value: string) => void;
  onSubmit: () => void;
} 