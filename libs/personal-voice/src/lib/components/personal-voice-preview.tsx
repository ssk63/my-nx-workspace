import React, { useState } from 'react';
import type { FormState } from '../context/form-context';
import { InfoNotice } from '@workspace/shared';
import { DeleteConfirmationModal } from './delete-confirmation-modal';

interface PersonalVoicePreviewProps {
  formData: FormState;
  onDelete: () => void;
  onEdit: () => void;
  onTest: () => void;
}

export const PersonalVoicePreview: React.FC<PersonalVoicePreviewProps> = ({
  formData,
  onDelete,
  onEdit,
  onTest
}) => {
  const { profile, voice, audience, fineTuning } = formData;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="mt-8 bg-white rounded-[10px] border border-[#D9DDE2] p-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Profile Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3">Personal Profile</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Job:</span> {profile.jobTitle}</p>
              <p><span className="font-medium">Geographical focus:</span> {profile.region}</p>
              <p><span className="font-medium">Skills:</span> {profile.skills}</p>
            </div>
          </div>
          
          {/* Level of Creativity Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3">Level of Creativity</h2>
            <p className="text-gray-600">
              {voice.creativityLevel === 'conservative' && 'Conservative - Carefully avoiding idioms, slang, and acronyms'}
              {voice.creativityLevel === 'balanced' && 'Balanced - Moderately creative, introducing new ideas or rephrasing content'}
              {voice.creativityLevel === 'highlyCreative' && 'Highly Creative - Using innovative language and fresh approaches'}
            </p>
          </div>
          
          {/* Personal Voice Tone Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3">Personal Voice Tone</h2>
            <p className="text-gray-600">
              {voice.tones.join(': ')}
            </p>
          </div>
          
          {/* Audience Targeting Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3">Audience Targeting</h2>
            <p className="text-gray-600">
              {audience.targetGroups.join(': ')}
            </p>
          </div>
          
          {/* Engagement CTA Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3">Engagement CTA</h2>
            <p className="text-gray-600">
              {fineTuning.callToAction || 'Encourage Discussion'}
            </p>
          </div>
          
          {/* Language Section */}
          <div>
            <h2 className="text-lg font-medium text-gray-700 mb-3">Language</h2>
            <p className="text-gray-600">
              {fineTuning.translateContent ? fineTuning.translateLanguage : '-'}
            </p>
          </div>
        </div>
        
        {/* Info Notice */}
        <InfoNotice className="mt-6">
          Applying Personal Voice is available when sharing posts from your feed
        </InfoNotice>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button 
            onClick={handleOpenDeleteModal}
            className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            DELETE
          </button>
          <button 
            onClick={onEdit}
            className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            EDIT SETTINGS
          </button>
          <button 
            onClick={onTest}
            className="ml-auto px-5 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
          >
            TEST SAMPLE
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}; 