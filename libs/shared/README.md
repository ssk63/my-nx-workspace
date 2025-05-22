# Shared Library

A collection of reusable components and icons for use across the application.

## Components

- `CustomCheckbox`: A styled checkbox component with label and description support
- `CustomRadioButton`: A styled radio button component
- `ToggleSwitch`: A toggle switch component
- `InfoNotice`: An informational notice component
- `ConfirmationDialog`: A dialog component for confirmations

## Icons

- `SvgIcon`: A component for rendering SVG icons from the icon library

## Usage

```tsx
import { CustomCheckbox, SvgIcon } from '@workspace/shared';

function MyComponent() {
  return (
    <div>
      <CustomCheckbox 
        id="my-checkbox" 
        label="My Checkbox" 
        checked={false} 
        onChange={() => console.log('Checkbox clicked')} 
      />
      
      <SvgIcon name="check" size="md" />
    </div>
  );
}
```
