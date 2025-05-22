import React from "react";
import type { FormEvent } from "react";
import type { VoiceProps } from "../models/voice.model";
import { CustomRadioButton, CustomCheckbox } from "@workspace/shared";

/**
 * Presentational component for the Your Voice step
 */
export const PersonalVoiceVoice: React.FC<VoiceProps> = ({
  formData,
  onChange,
  onToggleTone,
  onBack,
  onSubmit
}) => {
  // Tone options with descriptions
  const toneOptions = [
    {
      id: 'professional',
      label: 'Professional',
      description: 'Refines language for a polished, business-oriented tone, ensuring clarity, formality and credibility'
    },
    {
      id: 'conversational',
      label: 'Conversational',
      description: 'Makes content more relaxed and natural, using informal phrasing and a friendly approachable flow'
    },
    {
      id: 'authoritative',
      label: 'Authoritative',
      description: 'Strengthens statements with confident, fact-based language, making the content sound knowledgeable and trustworthy'
    },
    {
      id: 'casual',
      label: 'Casual',
      description: 'Loosens structure, simplifies wording, and adds a relaxed, easygoing feel to the message'
    },
    {
      id: 'inspirational',
      label: 'Inspirational',
      description: 'Elevates the message with uplifting phrasing, storytelling, and encouragement to motivate the audience'
    },
    {
      id: 'persuasive',
      label: 'Persuasive',
      description: 'Strengthens arguments, refines calls to action, and makes content more compelling and influential'
    },
    {
      id: 'empathetic',
      label: 'Empathetic',
      description: 'Softens language, acknowledges different perspectives, and adds warmth to create a deeper emotional connection'
    },
    {
      id: 'humorous',
      label: 'Humorous',
      description: 'Injects wit, playful language, and lighthearted elements to make content more engaging and entertaining'
    },
    {
      id: 'friendlyProfessional',
      label: 'Friendly but Professional',
      description: 'Balances warmth and formality, making content welcoming while maintaining credibility'
    },
    {
      id: 'neutral',
      label: 'Neutral',
      description: 'Keeps language objective, balanced, and free from strong emotions or personal opinions'
    },
    {
      id: 'assertive',
      label: 'Assertive',
      description: 'Uses direct language, removes hesitation, and strengthens phrasing to convey confidence and decisiveness'
    },
    {
      id: 'optimistic',
      label: 'Optimistic',
      description: 'Reframes content with a positive outlook, focusing on opportunities, solutions, and hopeful messaging'
    }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Handle tone toggle with validation
  const handleToneToggle = (toneId: string) => {
    const currentTones = [...formData.tones];
    
    // If tone is already selected, allow removal without restrictions
    if (currentTones.includes(toneId)) {
      onToggleTone(toneId);
      return;
    }
    
    // For adding tones, the UI already prevents selecting more than 4
    // with disabled checkboxes, so we don't need to check max count here
    onToggleTone(toneId);
  };
  
  // Count selected tones
  const selectedTonesCount = formData.tones.length;
  
  // Determine if the form is valid
  const isFormValid = !!formData.creativityLevel && selectedTonesCount > 0;

  return (
    <div className="space-y-6">
      {/* Writing Sample Card */}
      <div className="bg-white rounded-[10px] border border-[#D9DDE2] p-6 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-800">Writing Sample</h2>
          <button 
            type="button"
            className="bg-white border border-gray-300 text-gray-700 font-medium px-5 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            ADD WRITING SAMPLE
          </button>
        </div>
      </div>

      {/* Levels of Creativity and Tone Adjustment Card */}
      <div className="bg-white rounded-[10px] border border-[#D9DDE2] p-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08)]">
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Creativity Level Section */}
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Levels of Creativity</h2>
              <p className="text-gray-600 mb-4">Choose the level of creativity in your writing when sharing posts</p>
              
              <div className="space-y-6">
                {/* Conservative Option */}
                <CustomRadioButton
                  id="creativity-conservative"
                  checked={formData.creativityLevel === 'conservative'}
                  onChange={() => onChange('creativityLevel', 'conservative')}
                  label="Conservative"
                  description="Avoid idioms, slang, and acronyms that may not be recognised by a global audience"
                />

                {/* Balanced Option */}
                <CustomRadioButton
                  id="creativity-balanced"
                  checked={formData.creativityLevel === 'balanced'}
                  onChange={() => onChange('creativityLevel', 'balanced')}
                  label="Balanced"
                  description="Ensure content is free from cultural or religious references to maintain inclusivity"
                />

                {/* Highly Creative Option */}
                <CustomRadioButton
                  id="creativity-highly"
                  checked={formData.creativityLevel === 'highlyCreative'}
                  onChange={() => onChange('creativityLevel', 'highlyCreative')}
                  label="Highly Creative"
                  description="Use gender-neutral nouns and pronouns when the gender of the audience is unknown"
                />
              </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-200" />

            {/* Tone Adjustment Section */}
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Tone Adjustment</h2>
              <p className="text-gray-600 mb-4">
                Choose up to four different tones you want to apply to your writing when sharing posts
                <span className="ml-2 text-orange-500 font-medium">({selectedTonesCount}/4 selected)</span>
              </p>

              <div className="space-y-6">
                {toneOptions.map(tone => (
                  <CustomCheckbox
                    key={tone.id}
                    id={`tone-${tone.id}`}
                    checked={formData.tones.includes(tone.id)}
                    onChange={() => handleToneToggle(tone.id)}
                    label={tone.label}
                    description={tone.description}
                    disabled={!formData.tones.includes(tone.id) && selectedTonesCount >= 4}
                  />
                ))}
              </div>
            </div>

            {/* Divider before buttons */}
            <hr className="border-t border-gray-200" />

            {/* Navigation buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                GO BACK
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-8 py-3 font-medium rounded-md transition-colors ${
                  isFormValid 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}; 