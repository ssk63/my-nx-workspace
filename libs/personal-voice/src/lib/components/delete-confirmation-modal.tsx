import React from 'react';

// Mock ConfirmationDialog for Storybook
const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-800">{title}</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Personal Voice"
    >
      <div className="py-2">
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete your Personal Voice?
        </p>
        
        <div className="flex gap-4 justify-end">
          <button 
            onClick={onConfirm}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            DELETE
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
          >
            NO, KEEP IT
          </button>
        </div>
      </div>
    </ConfirmationDialog>
  );
} 