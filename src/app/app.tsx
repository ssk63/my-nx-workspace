import { PersonalVoice, FormProvider } from '@workspace/personal-voice';
import '../styles.css';

export function App() {
  return (
    <FormProvider>
      <PersonalVoice />
    </FormProvider>
  );
}

export default App;
