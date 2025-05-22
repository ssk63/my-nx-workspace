import type { Meta, StoryObj } from '@storybook/react';
import { PersonalVoiceProfile } from '../personal-voice-profile';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof PersonalVoiceProfile> = {
  title: 'Personal Voice/Profile',
  component: PersonalVoiceProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PersonalVoiceProfile>;

// Default state with empty form
export const Default: Story = {
  args: {
    formData: {
      jobTitle: '',
      region: '',
      skills: '',
    },
    errors: {
      jobTitle: '',
      region: '',
      skills: '',
    },
    onChange: action('onChange'),
    onSubmit: action('onSubmit'),
  },
};

// Form with data filled in
export const Filled: Story = {
  args: {
    formData: {
      jobTitle: 'Software Engineer',
      region: 'north_america',
      skills: 'JavaScript, React, Node.js, TypeScript',
    },
    errors: {
      jobTitle: '',
      region: '',
      skills: '',
    },
    onChange: action('onChange'),
    onSubmit: action('onSubmit'),
  },
};

// Form with validation errors
export const WithErrors: Story = {
  args: {
    formData: {
      jobTitle: '',
      region: '',
      skills: '',
    },
    errors: {
      jobTitle: 'Job title is required',
      region: 'Please select a region',
      skills: 'Skills field cannot be empty',
    },
    onChange: action('onChange'),
    onSubmit: action('onSubmit'),
  },
}; 