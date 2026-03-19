import type { WizardStepProps } from '../types';

export default function Step1({ data, update }: WizardStepProps) {
  return (
    <div>
      <div className="field">
        <label className="field__label" htmlFor="firstName">
          First name
        </label>
        <input
          id="firstName"
          name="firstName"
          className="field__input"
          type="text"
          value={data.firstName ?? ''}
          onChange={(event) => update({ firstName: event.target.value })}
          autoComplete="given-name"
          placeholder="Jane"
        />
      </div>

      <div className="field" style={{ marginTop: '1rem' }}>
        <label className="field__label" htmlFor="lastName">
          Last name
        </label>
        <input
          id="lastName"
          name="lastName"
          className="field__input"
          type="text"
          value={data.lastName ?? ''}
          onChange={(event) => update({ lastName: event.target.value })}
          autoComplete="family-name"
          placeholder="Doe"
        />
      </div>
    </div>
  );
}
