import React from "react";
import type { FormEvent } from "react";
import type { FineTuningProps } from "../models/finetuning.model";
import { ToggleSwitch } from "@workspace/shared";
import { SvgIcon } from "@workspace/shared";

/**
 * Presentational component for the Fine-tuning step
 */
export const PersonalVoiceFineTuning: React.FC<FineTuningProps> = ({
  formData,
  onChange,
  onBack,
  onFinish
}) => {
  // Available audience types
  const audienceTypes = [
    { id: "general", label: "General audience" },
    { id: "technical", label: "Technical audience" },
    { id: "executive", label: "Executive audience" },
    { id: "academic", label: "Academic audience" },
    { id: "creative", label: "Creative audience" },
    { id: "professional", label: "Professional audience" }
  ];

  // Available call-to-action options
  const callToActionOptions = [
    { id: "none", label: "None" },
    { id: "readMore", label: "Read more" },
    { id: "contactUs", label: "Contact us" },
    { id: "learnMore", label: "Learn more" },
    { id: "subscribe", label: "Subscribe" },
    { id: "followUp", label: "Follow up" },
    { id: "getStarted", label: "Get started" },
    { id: "bookDemo", label: "Book a demo" }
  ];

  // Available languages for translation
  const languages = [
    { id: "spanish", label: "Spanish" },
    { id: "french", label: "French" },
    { id: "german", label: "German" },
    { id: "italian", label: "Italian" },
    { id: "portuguese", label: "Portuguese" },
    { id: "russian", label: "Russian" },
    { id: "chinese", label: "Chinese" },
    { id: "japanese", label: "Japanese" },
    { id: "korean", label: "Korean" },
    { id: "arabic", label: "Arabic" }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFinish();
  };

  // Toggle switch handler
  const handleToggle = (field: "useEmojis" | "translateContent") => {
    onChange(field, !formData[field]);
    
    // Reset translate language when translation is turned off
    if (field === "translateContent" && formData.translateContent) {
      onChange("translateLanguage", "");
    }
  };

  return (
    <div className="space-y-6">
      {/* Fine-tuning Card */}
      <div className="bg-white rounded-[10px] border border-[#D9DDE2] p-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08)]">
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Audience Adaptation */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-800">Audience Adaptation</h2>
              <p className="text-gray-600">Choose a type of audience you're reaching for more tailored communication strategies</p>
              
              <div className="relative max-w-lg">
                <select
                  id="audience-type"
                  value={formData.audienceType}
                  onChange={(e) => onChange("audienceType", e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-orange-500"
                >
                  <option value="">Not specified</option>
                  {audienceTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <SvgIcon name="chevron-down" size="sm" className="fill-current h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Engagement Call-to-actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-800">Engagement Call-to-actions (CTA)</h2>
              <p className="text-gray-600">Choose a CTA to encourage engagements on your shared posts</p>
              
              <div className="relative max-w-lg">
                <select
                  id="call-to-action"
                  value={formData.callToAction}
                  onChange={(e) => onChange("callToAction", e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-orange-500"
                >
                  <option value="">Not specified</option>
                  {callToActionOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <SvgIcon name="chevron-down" size="sm" className="fill-current h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Divider after Call-to-actions */}
            <hr className="border-t border-gray-200" />

            {/* Use Emojis Option */}
            <div className="flex py-3" style={{ paddingLeft: '10px', alignItems: 'center', gap: '20px' }}>
              <div>
                <ToggleSwitch 
                  isOn={formData.useEmojis} 
                  onToggle={() => handleToggle("useEmojis")} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '1 0 0' }}>
                <h3 className="text-lg font-medium text-gray-800">Use Emojis</h3>
                <p className="text-gray-500">Insert emojis into content to enhance engagement and express emotions effectively</p>
              </div>
            </div>

            {/* Translate Option */}
            <div className="flex py-3" style={{ paddingLeft: '10px', alignItems: 'center', gap: '20px' }}>
              <div>
                <ToggleSwitch 
                  isOn={formData.translateContent} 
                  onToggle={() => handleToggle("translateContent")} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: '1 0 0' }}>
                <h3 className="text-lg font-medium text-gray-800">Translate to different language</h3>
                <p className="text-gray-500">Quickly turn content written in English into their chosen language of choice</p>
              </div>
            </div>

            {/* Language Selection (conditionally displayed) */}
            <div 
              style={{
                display: 'flex',
                paddingLeft: '81px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '8px',
                alignSelf: 'stretch',
                maxHeight: formData.translateContent ? '200px' : '0px',
                opacity: formData.translateContent ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out',
                marginTop: formData.translateContent ? '16px' : '0px'
              }}
            >
              <p className="text-sm font-medium text-gray-700 uppercase">TRANSLATE TO</p>
              <div className="relative w-full max-w-lg">
                <select
                  id="translate-language"
                  value={formData.translateLanguage}
                  onChange={(e) => onChange("translateLanguage", e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-orange-500"
                >
                  <option value="">Choose language</option>
                  {languages.map(lang => (
                    <option key={lang.id} value={lang.id}>{lang.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <SvgIcon name="chevron-down" size="sm" className="fill-current h-4 w-4" />
                </div>
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
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors"
              >
                FINISH SETUP
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}; 