/**
 * Create a list of Create Actions using the parameters passed. First search for the DAI Elements
 * that can be effected. Next create the action and add it to this list, also start the Edit
 * Address Element wizard for all Address Elements created.
 *
 * @param lnElement       - The LN Element.
 * @param lnClonedElement - The Cloned LN Element, used to create new structure and determine which Create actions are needed.
 * @param doElement       - The DO Element.
 * @param wizard          - The Wizard to dispatch the Open Wizard event on.
 * @param ti              - The TI Value set on the new Address Elements.
 * @param inverted        - Indicates if the Engineer want to create inverted Address Elements, if applicable.
 * @param tiInformation   - Information about how to create the Address Elements for the passed TI.
 * @returns A list of Create Action that will be added to the complex action.
 */
export function createActions(lnElement, lnClonedElement, doElement, wizard, ti, inverted, tiInformation) {
    return tiInformation.create(lnElement, lnClonedElement, doElement, wizard, ti, tiInformation.daPaths, 
    // If the TI Allows inverted and the Engineer selected it, true will be passed.
    tiInformation.inverted ? inverted : false);
}
/**
 * Create a list of Create Actions using the parameters passed. First search for the DAI Elements [name="Check"].
 * Next create the action and add it to this list, also start the Edit Address Element wizard for all Address Elements
 * created.
 *
 * @param lnElement       - The LN Element.
 * @param lnClonedElement - The Cloned LN Element, used to create new structure and determine which Create actions are needed.
 * @param doElement       - The DO Element.
 * @param wizard          - The Wizard to dispatch the Open Wizard event on.
 * @param ti              - The TI Value set on the new Address Elements.
 * @param tiInformation   - Information about how to create the Address Elements for the passed TI.
 * @returns A list of Create Action that will be added to the complex action.
 */
export function createCheckActions(lnElement, lnClonedElement, doElement, wizard, ti, tiInformation) {
    if (tiInformation.checkDaPaths && tiInformation.checkCreate) {
        return tiInformation.checkCreate(lnElement, lnClonedElement, doElement, wizard, ti, tiInformation.checkDaPaths);
    }
    return [];
}
//# sourceMappingURL=actions.js.map