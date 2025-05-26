import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';

// Mock the personal-voice components
jest.mock('@workspace/personal-voice', () => ({
  PersonalVoice: () => <div data-testid="mock-personal-voice">Personal Voice Component</div>,
  FormProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a heading with "My App"', () => {
    const { getByText } = render(<App />);
    expect(getByText('My App')).toBeTruthy();
  });

  it('should render the personal voice component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('mock-personal-voice')).toBeTruthy();
  });
});
