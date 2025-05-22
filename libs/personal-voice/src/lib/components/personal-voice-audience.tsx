import React from "react";
import type { FormEvent } from "react";
import type { AudienceProps } from "../models/audience.model";
import { CustomCheckbox } from "@workspace/shared";

/**
 * Presentational component for the Audience Targeting step
 */
export const PersonalVoiceAudience: React.FC<AudienceProps> = ({
  formData,
  onToggleGroup,
  onBack,
  onSubmit
}) => {
  // Audience groups with descriptions
  const audienceGroups = [
    {
      id: 'marketing',
      label: 'Marketing',
      description: 'Professionals in branding, advertising, and social media management'
    },
    {
      id: 'sales',
      label: 'Sales',
      description: 'Sales reps, account managers, business development professionals'
    },
    {
      id: 'finance',
      label: 'Finance',
      description: 'Financial analysts, CFOs, accountants, and finance managers'
    },
    {
      id: 'hr',
      label: 'Human Resources (HR)',
      description: 'Recruiters, talent acquisition specialists, HR managers'
    },
    {
      id: 'it',
      label: 'Information Technology (IT)',
      description: 'IT professionals, developers, network engineers'
    },
    {
      id: 'operations',
      label: 'Operations',
      description: 'Operations managers, supply chain, and logistics coordinators'
    },
    {
      id: 'engineering',
      label: 'Engineering',
      description: 'Engineers in mechanical, electrical, software, and civil disciplines'
    },
    {
      id: 'legal',
      label: 'Legal',
      description: 'Lawyers, legal counsels, paralegals'
    },
    {
      id: 'consulting',
      label: 'Consulting',
      description: 'Professionals in consulting across industries'
    },
    {
      id: 'executive',
      label: 'Executive Leadership',
      description: 'C-level executives and senior leadership'
    },
    {
      id: 'customerService',
      label: 'Customer Service',
      description: 'Service representatives, support specialists, and customer success managers'
    },
    {
      id: 'research',
      label: 'Research & Development',
      description: 'Scientists, researchers, product developers'
    }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Handle audience group toggle with validation
  const handleGroupToggle = (groupId: string) => {
    const currentGroups = [...formData.targetGroups];
    
    // If group is already selected, allow removal without restrictions
    if (currentGroups.includes(groupId)) {
      onToggleGroup(groupId);
      return;
    }
    
    // For adding groups, the UI already prevents selecting more than 4
    // with disabled checkboxes, so we don't need to check max count here
    onToggleGroup(groupId);
  };
  
  // Count selected audience groups
  const selectedGroupsCount = formData.targetGroups.length;
  
  // Determine if the form is valid (at least one group selected)
  const isFormValid = selectedGroupsCount > 0;

  return (
    <div className="space-y-6">
      {/* Audience Targeting Card */}
      <div className="bg-white rounded-[10px] border border-[#D9DDE2] p-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08)]">
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Audience Targeting Section */}
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Audience Targeting</h2>
              <p className="text-gray-600 mb-4">
                Choose up to four different audience groups you are looking to reach when sharing content
                <span className="ml-2 text-orange-500 font-medium">({selectedGroupsCount}/4 selected)</span>
              </p>

              <div className="space-y-6">
                {audienceGroups.map(group => (
                  <CustomCheckbox
                    key={group.id}
                    id={`audience-${group.id}`}
                    checked={formData.targetGroups.includes(group.id)}
                    onChange={() => handleGroupToggle(group.id)}
                    label={group.label}
                    description={group.description}
                    disabled={!formData.targetGroups.includes(group.id) && selectedGroupsCount >= 4}
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