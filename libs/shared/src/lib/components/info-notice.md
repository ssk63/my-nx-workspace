# InfoNotice Component

A reusable notice component that can be used across the application to display informative messages with consistent styling.

## Usage

```jsx
import { InfoNotice } from '../shared/components/ui';

// Default (orange) theme
<InfoNotice>
  This is a notice with the default orange theme.
</InfoNotice>

// Blue theme
<InfoNotice theme="blue">
  This is a notice with the blue theme.
</InfoNotice>

// Green theme
<InfoNotice theme="green">
  This is a notice with the green theme.
</InfoNotice>

// Gray theme
<InfoNotice theme="gray">
  This is a notice with the gray theme.
</InfoNotice>

// With additional custom class
<InfoNotice className="my-8">
  This notice has custom margin.
</InfoNotice>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | Required | The content to display in the notice |
| theme | 'orange' \| 'blue' \| 'green' \| 'gray' | 'orange' | Color theme for the notice |
| className | string | '' | Additional CSS classes to apply | 