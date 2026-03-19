import { useEffect, useState } from 'react';
import { wizardSteps } from './steps';
import type { WizardData } from './types';
import { fetchStepData, submitStepData } from '../api/wizardApi';

function Stepper({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="stepper" aria-label="wizard progress">
      {wizardSteps.map((_, index) => (
        <span
          key={`step-dot-${index}`}
          className={`stepper__dot ${index === currentIndex ? 'stepper__dot--active' : ''}`}
          aria-current={index === currentIndex ? 'step' : undefined}
        />
      ))}
    </div>
  );
}

export default function Wizard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<WizardData>({});
  const [error, setError] = useState<string | undefined>(undefined);
  const [apiError, setApiError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === wizardSteps.length - 1;
  const step = wizardSteps[currentIndex];

  const Component = step.component;

  const onUpdate = (patch: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setError(undefined);
    setApiError(undefined);
  };

  const validateCurrentStep = () => {
    if (!step.validate) return true;
    const validationError = step.validate(data);
    if (validationError) {
      setError(validationError);
      return false;
    }
    setError(undefined);
    return true;
  };

  const loadStep = async () => {
    setApiError(undefined);
    if (!step.id) return;

    try {
      setLoading(true);
      const fetched = await fetchStepData(step.id);
      setData((prev) => ({ ...prev, ...fetched }));
    } catch (err) {
      setApiError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const goNext = async () => {
    if (!validateCurrentStep()) return;

    try {
      setLoading(true);
      setApiError(undefined);
      await submitStepData(step.id, data);
      setCurrentIndex((prev) => Math.min(prev + 1, wizardSteps.length - 1));
    } catch (err) {
      setApiError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setError(undefined);
    setApiError(undefined);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setData({});
    setError(undefined);
    setApiError(undefined);
    setCurrentIndex(0);
  };

  useEffect(() => {
    loadStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const title = step.title;
  const subtitle = step.subtitle;

  const showNextLabel = isLastStep ? 'Finish' : 'Next';

  const canAdvance = isLastStep || !step.validate || !error;

  return (
    <div className="wizard">
      <div className="wizard__header">
        <div>
          <h2 className="wizard__title">{title}</h2>
          {subtitle ? <p className="wizard__subtitle">{subtitle}</p> : null}
        </div>
        <div aria-hidden="true">{currentIndex + 1}/{wizardSteps.length}</div>
      </div>

      <Stepper currentIndex={currentIndex} />

      <div className="wizard__body" style={{ position: 'relative' }}>
        {loading ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.8)',
              zIndex: 1,
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
          >
            Loading…
          </div>
        ) : null}

        <Component data={data} update={onUpdate} />

        {apiError ? (
          <div className="alert" role="alert">
            {apiError}
          </div>
        ) : null}

        {error ? <div className="alert" role="alert">{error}</div> : null}

        <div className="wizard__actions">
          <button
            className="button button--secondary"
            type="button"
            onClick={goBack}
            disabled={isFirstStep || loading}
          >
            Back
          </button>

          {isLastStep ? (
            <button
              className="button button--primary"
              type="button"
              onClick={reset}
              disabled={loading}
            >
              Start Over
            </button>
          ) : (
            <button
              className="button button--primary"
              type="button"
              onClick={goNext}
              disabled={!canAdvance || loading}
            >
              {showNextLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
