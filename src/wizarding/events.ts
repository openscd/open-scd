import { Wizard, WizardFactory, isWizardFactory } from "./wizard.js";

/** If `wizard === null`, close the current wizard, else queue `wizard`. */
export interface WizardDetail {
  wizard: WizardFactory | null;
  subwizard?: boolean;
}
export type WizardEvent = CustomEvent<WizardDetail>;

// why do we require a wizard factory as a parameter
// then again one in the event detail?
export function newWizardEvent(
  wizardOrFactory?: Wizard | WizardFactory,
  eventInitDict?: CustomEventInit<Partial<WizardDetail>>
): WizardEvent {

  if (!wizardOrFactory)
    return new CustomEvent<WizardDetail>('wizard', {
      bubbles: true,
      composed: true,
      ...eventInitDict,
      // TODO: shouldn't wizard:null overwrite eventinitdict's detail?
      // this only sets wizard to null if the eventinitDict's detail
      // does not contain wizard. If it has a wizard=undefined it will
      // set wizard to undefined and wizard: null hast no effect
      detail: { wizard: null, ...eventInitDict?.detail },
    });

  const wizard = isWizardFactory(wizardOrFactory)
    ? wizardOrFactory
    : () => wizardOrFactory;

  return new CustomEvent<WizardDetail>('wizard', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    // TODO: should the eventInitDict overwrite the wizard?
    // At this point the wizardOrFactory seams unnecessary
    // or the eventInitDict should not have a wizard property
    detail: { wizard, ...eventInitDict?.detail },
  });
}

export function newSubWizardEvent(
  wizardOrFactory?: Wizard | WizardFactory
): WizardEvent {
  return newWizardEvent(wizardOrFactory, { detail: { subwizard: true } });
}
