import { html } from '../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { getCustomField } from './foundation/dai-field-type.js';
import '../../../openscd/src/wizard-textfield.js';
import { SCL_NAMESPACE } from '../../../openscd/src/schemas.js';
export function updateValue(element, val) {
    return (inputs) => {
        const bType = element.getAttribute('bType');
        const newValue = getCustomField()[bType].value(inputs);
        const daiName = val.parentElement?.getAttribute('name') ?? '';
        const complexAction = {
            actions: [],
            title: get('dai.action.updatedai', { daiName }),
        };
        const newVal = val.cloneNode(false);
        newVal.textContent = newValue;
        complexAction.actions.push({
            old: { element: val },
            new: { element: newVal },
        });
        return [complexAction];
    };
}
export function createValue(parent, element, newElement, instanceElement, numberOfmultipleSettings) {
    return (inputs) => {
        const bType = element.getAttribute('bType');
        if (numberOfmultipleSettings) {
            //Should we remove all Val elements before adding new ones?
            Array.from(instanceElement.querySelectorAll('Val')).forEach(item => item.remove());
            // Adds a new Val element for each sGroup value from the wizard
            [...Array(numberOfmultipleSettings)].forEach((item, i) => {
                const newValue = getCustomField()[bType].value(inputs, i + 1);
                const valElement = parent.ownerDocument.createElementNS(SCL_NAMESPACE, 'Val');
                valElement.textContent = newValue;
                valElement.setAttribute('sGroup', `${i + 1}`);
                instanceElement.append(valElement);
            });
        }
        else {
            const newValue = getCustomField()[bType].value(inputs);
            let valElement = instanceElement.querySelector('Val');
            if (!valElement) {
                valElement = parent.ownerDocument.createElementNS(SCL_NAMESPACE, 'Val');
                instanceElement.append(valElement);
            }
            valElement.textContent = newValue;
        }
        const name = instanceElement.getAttribute('name');
        const complexAction = {
            actions: [{ new: { parent, element: newElement } }],
            title: get('dai.action.createdai', { daiName: name }),
        };
        return [complexAction];
    };
}
export function renderDAIWizard(element, instanceElement, numberOfmultipleSettings = null) {
    const bType = element.getAttribute('bType');
    const daValue = element.querySelector('Val')?.textContent?.trim() ?? '';
    return [
        html ` ${getCustomField()[bType].render(element, instanceElement, numberOfmultipleSettings)}
    ${daValue
            ? html `<wizard-textfield
          id="daVal"
          label="DA Template Value"
          .maybeValue=${daValue}
          readonly
          disabled
        >
        </wizard-textfield>`
            : nothing}`,
    ];
}
/**
 * Checks if the DAI corresponds to a multiple setting group
 *
 * @param parent The parent element of the DAI
 * @param element The BDA/DA element
 * @returns The number of setting groups if the DAI is a multiple setting group, null otherwise
 */
function checkForMultipleSettings(parent, element) {
    // Look for the DA element to validate that the DAI has the functional constraint SG or SE
    let da = element;
    if (element.tagName === 'BDA')
        da = element.getRootNode().querySelector(`DOType>DA[type="${element.parentElement.id}"]`);
    const fc = da.getAttribute('fc') ?? '';
    // Check if the closest IED to the parent element has a SettingControl element with a numOfSGs attribute
    const ied = parent.closest('IED');
    const settingControl = ied?.querySelector('SettingControl');
    const numOfSGsAttribute = settingControl?.getAttribute('numOfSGs') ?? '';
    const numberOfmultipleSettings = parseInt(numOfSGsAttribute);
    // If the DA has the functional constraint SG or SE and the IED has a SettingControl element with a numOfSGs attribute, then the DAI is a multiple setting group
    return (fc === 'SG' || fc === 'SE') &&
        numOfSGsAttribute !== '' &&
        !isNaN(numberOfmultipleSettings)
        ? numberOfmultipleSettings
        : undefined;
}
export function createDAIWizard(parent, newElement, element) {
    // Retrieve the created DAI, can be the new element or one of the child elements below.
    const numberOfmultipleSettings = checkForMultipleSettings(parent, element);
    const instanceElement = newElement.tagName === 'DAI'
        ? newElement
        : newElement.querySelector('DAI');
    return [
        {
            title: get('dai.wizard.title.create', {
                daiName: instanceElement?.getAttribute('name') ?? '',
            }),
            element: instanceElement,
            primary: {
                icon: 'edit',
                label: get('save'),
                action: createValue(parent, element, newElement, instanceElement, numberOfmultipleSettings),
            },
            content: renderDAIWizard(element, instanceElement, numberOfmultipleSettings),
        },
    ];
}
export function editDAIWizard(element, instanceElement) {
    const daiName = instanceElement?.tagName === 'DAI'
        ? instanceElement?.getAttribute('name') ?? ''
        : instanceElement?.parentElement?.getAttribute('name') ?? '';
    return [
        {
            title: get('dai.wizard.title.edit', {
                daiName,
            }),
            element: instanceElement,
            primary: {
                icon: 'edit',
                label: get('save'),
                action: updateValue(element, instanceElement),
            },
            content: renderDAIWizard(element, instanceElement),
        },
    ];
}
//# sourceMappingURL=dai.js.map