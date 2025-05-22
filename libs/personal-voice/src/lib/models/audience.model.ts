import type { AudienceData } from '../context/form-context';

/**
 * Props for the audience component
 */
export interface AudienceProps {
  formData: AudienceData;
  onToggleGroup: (group: string) => void;
  onBack: () => void;
  onSubmit: () => void;
} 