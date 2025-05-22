import type { FineTuningData } from '../context/form-context';

/**
 * Props for the fine-tuning component
 */
export interface FineTuningProps {
  formData: FineTuningData;
  onChange: <K extends keyof FineTuningData>(field: K, value: FineTuningData[K]) => void;
  onBack: () => void;
  onFinish: () => void;
} 