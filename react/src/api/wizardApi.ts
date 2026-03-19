import type { WizardData } from '../wizard/types';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

function buildUrl(stepId: string) {
  // Example: `${apiBaseUrl}/wizard/${stepId}`
  return `${apiBaseUrl.replace(/\/+$/, '')}/wizard/${encodeURIComponent(stepId)}`;
}

export async function fetchStepData(stepId: string): Promise<Partial<WizardData>> {
  if (!apiBaseUrl) {
    return {};
  }

  const response = await fetch(buildUrl(stepId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch step data (${response.status}): ${await response.text()}`);
  }

  return (await response.json()) as Partial<WizardData>;
}

export async function submitStepData(stepId: string, payload: Partial<WizardData>): Promise<void> {
  if (!apiBaseUrl) {
    return;
  }

  const response = await fetch(buildUrl(stepId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit step data (${response.status}): ${await response.text()}`);
  }
}
