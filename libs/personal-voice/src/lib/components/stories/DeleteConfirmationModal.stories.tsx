import type { Meta, StoryObj } from '@storybook/react';
import { DeleteConfirmationModal } from '../delete-confirmation-modal';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof DeleteConfirmationModal> = {
  title: 'Personal Voice/DeleteConfirmationModal',
  component: DeleteConfirmationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeleteConfirmationModal>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
    onConfirm: action('onConfirm'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: action('onClose'),
    onConfirm: action('onConfirm'),
  },
}; 