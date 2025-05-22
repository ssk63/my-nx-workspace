# Personal Voice Library

A library for creating, editing and managing personal voice profiles.

## Features

- Multi-step form for setting up a personal voice
- Profile management for specifying job title, region and skills
- Voice customization for tone and style
- Audience targeting
- Fine-tuning options including translation support

## Components

### Main Component
- `PersonalVoice`: The main component that orchestrates the entire flow

### Step Components
- `IntroStep`: Introduction step
- `ProfileStep`: Profile setup step
- `VoiceStep`: Voice customization step
- `AudienceStep`: Audience targeting step
- `FineTuningStep`: Fine-tuning options step

### UI Components
- `PersonalVoiceStepper`: Stepper component for the form
- `PersonalVoicePreview`: Preview component for the created voice
- Various other UI components for each step

### Context and Hooks
- `FormProvider`: Context provider for the form
- `useFormContext`: Hook for accessing the form context
- `useFormStep`: Hook for managing form step interactions

## Usage

```tsx
import { PersonalVoice, FormProvider } from '@workspace/personal-voice';

function App() {
  return (
    <div>
      <h1>Personal Voice Setup</h1>
      <FormProvider>
        <PersonalVoice />
      </FormProvider>
    </div>
  );
}
```
