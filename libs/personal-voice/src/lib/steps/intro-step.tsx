import React from "react";
import { useFormContext, StepType } from "../context/form-context";
import { SvgIcon } from "@workspace/shared";

/**
 * Intro step for Personal Voice setup
 * Uses Context API for state and navigation
 */
export const IntroStep: React.FC = () => {
  const { resetForm, goToStep } = useFormContext();
  
  const handleStartSetup = () => {
    // Reset form data before starting a new setup
    resetForm();
    // Navigate to the profile step
    goToStep(StepType.PROFILE);
  };

  return (
    <div className="mt-8 bg-white rounded-[10px] border border-[#D9DDE2] p-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08)]">
      <div className="flex items-start gap-3 mb-4">
        <div className="text-orange-500 mt-1">
          <SvgIcon name="star" color="#FB7147" />
        </div>
        <h2 className="text-xl font-medium text-gray-700">Setup Personal Voice</h2>
      </div>
      
      <p className="text-gray-600 mb-8 pl-9">
        Setup your Personal Voice AI to further personalise and customise content based on your
        preferences, ensuring the content shared aligns with your own professional style and tone
      </p>
      
      <div className="pl-9">
        <button 
          onClick={handleStartSetup}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-md transition-colors"
        >
          START SETUP
        </button>
      </div>
    </div>
  );
}; 