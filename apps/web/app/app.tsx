import React from 'react';
import { PersonalVoice, FormProvider } from '@workspace/personal-voice';
import '../src/styles/styles.css';

export function App() {
  return (
    <FormProvider>
      <PersonalVoice />
    </FormProvider>
  );
}

export default App; 