export type WizardData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  plan?: 'free' | 'pro' | 'enterprise';
  agreeToTerms?: boolean;
};

export type WizardStepProps = {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
};
