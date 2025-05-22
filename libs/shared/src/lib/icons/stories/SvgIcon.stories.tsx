import type { Meta, StoryObj } from '@storybook/react';
import { SvgIcon } from '../svg-icon';

const meta: Meta<typeof SvgIcon> = {
  title: 'Shared/SvgIcon',
  component: SvgIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SvgIcon>;

export const Default: Story = {
  args: {
    name: 'close',
    size: 'md',
  },
};

export const Info: Story = {
  args: {
    name: 'info',
    size: 'md',
    color: '#3B82F6',
  },
};

export const Star: Story = {
  args: {
    name: 'star',
    size: 'lg',
    color: '#F59E0B',
  },
};

export const StepActive: Story = {
  args: {
    name: 'step-active',
    size: 'md',
    color: '#E85427',
  },
};

export const StepInactive: Story = {
  args: {
    name: 'step-inactive',
    size: 'md',
    color: '#D9D9D9',
  },
}; 