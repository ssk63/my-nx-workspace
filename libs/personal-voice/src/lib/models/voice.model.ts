import type { VoiceData } from '../context/form-context';

/**
 * Props for the voice component
 */
export interface VoiceProps {
  formData: VoiceData;
  onChange: <K extends keyof VoiceData>(field: K, value: VoiceData[K]) => void;
  onToggleTone: (tone: string) => void;
  onBack: () => void;
  onSubmit: () => void;
} 