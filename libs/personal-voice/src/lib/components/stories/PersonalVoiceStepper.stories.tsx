import type { Meta, StoryObj } from '@storybook/react';
import { PersonalVoiceStepper } from '../personal-voice-stepper';

const meta: Meta<typeof PersonalVoiceStepper> = {
  title: 'Personal Voice/Stepper',
  component: PersonalVoiceStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PersonalVoiceStepper>;

const steps = [
  { id: 1, label: 'Profile' },
  { id: 2, label: 'Voice' },
  { id: 3, label: 'Audience' },
  { id: 4, label: 'Fine Tuning' },
  { id: 5, label: 'Preview' },
];

export const Default: Story = {
  args: {
    steps,
    currentStep: 1,
  },
};

export const MiddleStep: Story = {
  args: {
    steps,
    currentStep: 3,
  },
};

export const FinalStep: Story = {
  args: {
    steps,
    currentStep: 5,
  },
}; 