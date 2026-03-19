import type { WizardStepProps } from '../types';

export default function Step4({ data, update }: WizardStepProps) {
  return (
    <div>
      <section style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Your details</h3>
        <dl style={{ margin: '0.85rem 0 0', lineHeight: 1.5 }}>
          <dt style={{ fontWeight: 600 }}>Name</dt>
          <dd style={{ margin: 0 }}>
            {data.firstName ?? '—'} {data.lastName ?? ''}
          </dd>
          <dt style={{ fontWeight: 600, marginTop: '0.75rem' }}>Email</dt>
          <dd style={{ margin: 0 }}>{data.email ?? '—'}</dd>
          <dt style={{ fontWeight: 600, marginTop: '0.75rem' }}>Plan</dt>
          <dd style={{ margin: 0 }}>{data.plan ?? '—'}</dd>
        </dl>
      </section>

      <div className="field">
        <label className="field__label" htmlFor="agreeToTerms">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            checked={data.agreeToTerms ?? false}
            onChange={(event) => update({ agreeToTerms: event.target.checked })}
            style={{ marginRight: '0.5rem' }}
          />
          I agree to the terms and conditions.
        </label>
      </div>

      <p style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
        Confirming helps ensure your information is correct and allows us to follow up if needed.
      </p>
    </div>
  );
}
