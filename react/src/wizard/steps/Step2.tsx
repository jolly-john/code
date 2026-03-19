import type { WizardStepProps } from '../types';

export default function Step2({ data, update }: WizardStepProps) {
  return (
    <div>
      <div className="field">
        <label className="field__label" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          name="email"
          className="field__input"
          type="email"
          value={data.email ?? ''}
          onChange={(event) => update({ email: event.target.value })}
          autoComplete="email"
          placeholder="jane@example.com"
        />
      </div>

      <p style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
        We’ll send occasional updates about new features. You can unsubscribe at any time.
      </p>
    </div>
  );
}
