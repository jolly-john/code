import React from 'react';
import type { WizardStepProps } from '../types';

export default function Step1({ data, update }: WizardStepProps) {
  const [selectedFileName, setSelectedFileName] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const onChooseFileClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFileName('');
      return;
    }

    setSelectedFileName(file.name);
    // optional: send selected filename up the wizard data state
    // update({ fileName: file.name });
  };

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

      <div className="field" style={{ marginTop: '1rem' }}>
        <button type="button" onClick={onChooseFileClick} className="field__button">
          Choose file
        </button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={onFileChange}
          accept="*"
        />
        {selectedFileName && (
          <p style={{ marginTop: '0.5rem' }}>Selected file: {selectedFileName}</p>
        )}
      </div>
    </div>
  );
}
