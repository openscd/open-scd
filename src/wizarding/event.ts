import { Wizard, WizardFactory, isWizardFactory } from "./wizard.js";

/** If `wizard === null`, close the current wizard, else queue `wizard`. */
export interface WizardDetail {
  wizard: WizardFactory | null;
  subwizard?: boolean;
}
export type WizardEvent = CustomEvent<WizardDetail>;
export function newWizardEvent(
  wizardOrFactory?: Wizard | WizardFactory,
  eventInitDict?: CustomEventInit<Partial<WizardDetail>>
): WizardEvent {
  if (!wizardOrFactory)
    return new CustomEvent<WizardDetail>('wizard', {
      bubbles: true,
      composed: true,
      ...eventInitDict,
      detail: { wizard: null, ...eventInitDict?.detail },
    });

  const wizard = isWizardFactory(wizardOrFactory)
    ? wizardOrFactory
    : () => wizardOrFactory;

  return new CustomEvent<WizardDetail>('wizard', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { wizard, ...eventInitDict?.detail },
  });
}

export function newSubWizardEvent(
  wizardOrFactory?: Wizard | WizardFactory
): WizardEvent {
  return newWizardEvent(wizardOrFactory, { detail: { subwizard: true } });
}
