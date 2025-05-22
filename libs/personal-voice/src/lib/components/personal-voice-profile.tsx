import React from "react";
import type { ProfileProps } from "../models/profile.model";

// Mock SvgIcon for Storybook
const SvgIcon = ({ name, color, size, className }: { 
  name: string; 
  color?: string; 
  size?: string; 
  className?: string 
}) => (
  <div
    data-testid={`mock-icon-${name}`}
    style={{
      width: size || '20px',
      height: size || '20px',
      backgroundColor: color || '#ccc',
      borderRadius: '50%',
    }}
    className={className}
  />
);

/**
 * Presentational component for the Personal Profile form
 */
export const PersonalVoiceProfile: React.FC<ProfileProps> = ({
  formData,
  errors,
  onChange,
  onSubmit
}) => {
  return (
    <div className="bg-white rounded-[10px] border border-[#D9DDE2] p-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08)]">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Personal Profile</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="jobTitle" className="block text-xs font-medium text-gray-700 uppercase mb-2">
              Your Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              placeholder="Write a comment"
              className={`w-full p-3 border ${
                errors.jobTitle ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500`}
            />
            {errors.jobTitle && <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>}
          </div>
          
          <div>
            <label htmlFor="region" className="block text-xs font-medium text-gray-700 uppercase mb-2">
              Geographical Focus
            </label>
            <div className="relative">
              <select
                id="region"
                value={formData.region}
                onChange={(e) => onChange('region', e.target.value)}
                className={`w-full p-3 pr-8 border ${
                  errors.region ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white`}
              >
                <option value="" disabled>Choose Region</option>
                <option value="north_america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="south_america">South America</option>
                <option value="oceania">Oceania</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <SvgIcon name="chevron-down" size="sm" className="fill-current h-4 w-4" />
              </div>
            </div>
            {errors.region && <p className="mt-1 text-xs text-red-500">{errors.region}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="skills" className="block text-xs font-medium text-gray-700 uppercase mb-2">
            Your Skills and Expertise
          </label>
          <textarea
            id="skills"
            value={formData.skills}
            onChange={(e) => onChange('skills', e.target.value)}
            placeholder="Describe what you're good at"
            className={`w-full p-3 border ${
              errors.skills ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 min-h-[100px]`}
          />
          {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
        </div>
        
        <div className="flex justify-end mt-8">
          <button
            onClick={onSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-md transition-colors"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}; 