import type { WizardStepProps } from '../types';

export default function Step5({ data }: WizardStepProps) {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.15rem' }}>You're all set!</h3>
        <p style={{ margin: '0.8rem 0 1.25rem', color: 'var(--muted)' }}>
          Thanks for providing your details. We’ll keep you updated based on the plan you selected.
        </p>
      </div>

      <div className="field">
        <label className="field__label">Summary</label>
        <div style={{ padding: '0.95rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
          <p style={{ margin: 0 }}>
            <strong>Name:</strong> {data.firstName ?? ''} {data.lastName ?? ''}
          </p>
          <p style={{ margin: '0.5rem 0 0' }}>
            <strong>Email:</strong> {data.email ?? ''}
          </p>
          <p style={{ margin: '0.5rem 0 0' }}>
            <strong>Plan:</strong> {data.plan ?? '—'}
          </p>
        </div>
      </div>

      <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>
        If you want to make changes, click “Start Over” and go back to any step.
      </p>
    </div>
  );
}
