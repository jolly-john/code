import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import type { WizardData, WizardStepProps } from './types';

export type WizardStep = {
  id: string;
  title: string;
  subtitle?: string;
  component: React.ComponentType<WizardStepProps>;
  /**
   * Optional validation function for the step.
   * Return a string error message to display, or undefined if valid.
   */
  validate?: (data: WizardData) => string | undefined;
};

export const wizardSteps: WizardStep[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    subtitle: 'Tell us a little about yourself to get started.',
    component: Step1,
    validate: (data) => {
      if (!data.firstName?.trim()) return 'First name is required.';
      if (!data.lastName?.trim()) return 'Last name is required.';
      return undefined;
    },
  },
  {
    id: 'contact',
    title: 'Contact details',
    subtitle: 'We will use this to keep you in the loop.',
    component: Step2,
    validate: (data) => {
      if (!data.email?.trim()) return 'Email is required.';
      if (!data.email?.includes('@')) return 'Please enter a valid email address.';
      return undefined;
    },
  },
  {
    id: 'plan',
    title: 'Choose a plan',
    subtitle: 'Pick the option that fits your needs.',
    component: Step3,
    validate: (data) => {
      if (!data.plan) return 'Please select a plan.';
      return undefined;
    },
  },
  {
    id: 'review',
    title: 'Review & confirm',
    subtitle: 'Double-check your information before submission.',
    component: Step4,
    validate: (data) => {
      if (!data.agreeToTerms) return 'You must agree to the terms before continuing.';
      return undefined;
    },
  },
  {
    id: 'complete',
    title: 'All set!',
    subtitle: 'Your information has been captured.',
    component: Step5,
  },
];
