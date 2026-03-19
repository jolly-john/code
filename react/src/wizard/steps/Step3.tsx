import type { WizardStepProps } from '../types';

const plans: Array<{ value: 'free' | 'pro' | 'enterprise'; label: string; description: string }> = [
  {
    value: 'free',
    label: 'Free',
    description: 'A good way to try the product with no cost.',
  },
  {
    value: 'pro',
    label: 'Pro',
    description: 'Best for individuals who need extra features.',
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: 'For teams and businesses with advanced needs.',
  },
];

export default function Step3({ data, update }: WizardStepProps) {
  return (
    <div>
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend className="field__label">Select your plan</legend>
        {plans.map((plan) => (
          <label
            key={plan.value}
            style={{
              display: 'block',
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '0.95rem 0.9rem',
              marginTop: '0.75rem',
              cursor: 'pointer',
              background: data.plan === plan.value ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
            }}
          >
            <input
              type="radio"
              name="plan"
              value={plan.value}
              checked={data.plan === plan.value}
              onChange={() => update({ plan: plan.value })}
              style={{ marginRight: '0.65rem' }}
            />
            <span style={{ fontWeight: 600 }}>{plan.label}</span>
            <span style={{ display: 'block', color: 'var(--muted)', marginTop: '0.25rem' }}>
              {plan.description}
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
