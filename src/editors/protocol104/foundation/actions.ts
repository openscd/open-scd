import { Create, newWizardEvent } from '../../../foundation.js';

import { editAddressWizard } from '../wizards/address.js';
import { TiInformation } from './cdc.js';

/**
 * Create a list of Create Actions using the parameters passed. First search for the DAI Elements
 * that can be effected. Next create the action and add it to this list, also start the Edit
 * Address Element wizard for all Address Elements created.
 *
 * @param doiElement     - The DOI Element.
 * @param wizard         - The Wizard to dispatch the Open Wizard event on.
 * @param ti             - The TI Value set on the new Address Elements.
 * @param inverted       - Indicates if the Engineer want to create inverted Address Elements, if applicable.
 * @param tiInformation  - Information about how to create the Address Elements for the passed TI.
 * @returns A list of Create Action that will be added to the complex action.
 */
export function createActions(
  doiElement: Element,
  wizard: Element,
  ti: string,
  inverted: boolean,
  tiInformation: TiInformation
): Create[] {
  const actions: Create[] = [];
  const daiElements = doiElement.querySelectorAll(tiInformation.filter);
  if (daiElements.length > 0) {
    daiElements.forEach(daiElement => {
      const createActions = tiInformation.create(
        daiElement,
        ti,
        tiInformation.inverted ? inverted : false // If the TI Allows it and the Engineer selected it, true will be passed.
      );
      actions.push(...createActions);

      createActions.forEach(createAction => {
        const privateElement = <Element>createAction.new.element;
        Array.from(privateElement.querySelectorAll('Address')).forEach(
          addressElement => {
            wizard.dispatchEvent(
              newWizardEvent(() =>
                editAddressWizard(daiElement, addressElement)
              )
            );
          }
        );
      });
    });
  }
  return actions;
}

/**
 * Create a list of Create Actions using the parameters passed. First search for the DAI Elements [name="Check"].
 * Next create the action and add it to this list, also start the Edit Address Element wizard for all Address Elements
 * created.
 *
 * @param doiElement     - The DOI Element.
 * @param wizard         - The Wizard to dispatch the Open Wizard event on.
 * @param ti             - The TI Value set on the new Address Elements.
 * @param tiInformation  - Information about how to create the Address Elements for the passed TI.
 * @returns A list of Create Action that will be added to the complex action.
 */
export function createCheckActions(
  doiElement: Element,
  wizard: Element,
  ti: string,
  tiInformation: TiInformation
): Create[] {
  const actions: Create[] = [];
  if (tiInformation.checkFilter) {
    const daiElements = doiElement.querySelectorAll(tiInformation.checkFilter);
    if (daiElements.length > 0) {
      daiElements.forEach(daiElement => {
        if (tiInformation.checkCreate) {
          const createActions = tiInformation.checkCreate(daiElement, ti);
          actions.push(...createActions);

          createActions.forEach(createAction => {
            const privateElement = <Element>createAction.new.element;
            Array.from(privateElement.querySelectorAll('Address')).forEach(
              addressElement => {
                wizard.dispatchEvent(
                  newWizardEvent(() =>
                    editAddressWizard(daiElement, addressElement)
                  )
                );
              }
            );
          });
        }
      });
    }
  }
  return actions;
}
