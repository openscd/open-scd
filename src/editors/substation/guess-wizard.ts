import {
  Wizard,
  WizardAction,
  WizardInput,
  CloseableElement,
  EditorAction,
  sortElementByNameAttribute,
} from '../../foundation.js';
import { html } from 'lit-html';

import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-textfield';
import { List } from '@material/mwc-list';
import { get } from 'lit-translate';

let bayNum = 1;
let cbNum = 1;
let dsNum = 1;

function addLNode(condEq: Element, cswi: Element): void {
  // switchgear ideally is a composition of lnClass CILO,CSWI,XSWI
  cswi.parentElement
    ?.querySelectorAll(
      `LN[lnClass="CSWI"]${
        cswi.getAttribute('prefix')
          ? `[prefix="${cswi.getAttribute('prefix')}"]`
          : ``
      }${
        cswi.getAttribute('inst') ? `[inst="${cswi.getAttribute('inst')}"]` : ``
      },LN[lnClass="CILO"]${
        cswi.getAttribute('prefix')
          ? `[prefix="${cswi.getAttribute('prefix')}"]`
          : ``
      }${
        cswi.getAttribute('inst') ? `[inst="${cswi.getAttribute('inst')}"]` : ``
      },LN[lnClass="XCBR"]${
        cswi.getAttribute('prefix')
          ? `[prefix="${cswi.getAttribute('prefix')}"]`
          : ``
      }${
        cswi.getAttribute('inst') ? `[inst="${cswi.getAttribute('inst')}"]` : ``
      },LN[lnClass="XSWI"]${
        cswi.getAttribute('prefix')
          ? `[prefix="${cswi.getAttribute('prefix')}"]`
          : ``
      }${
        cswi.getAttribute('inst') ? `[inst="${cswi.getAttribute('inst')}"]` : ``
      }`
    )
    .forEach(ln =>
      condEq.appendChild(
        new DOMParser().parseFromString(
          `<LNode iedName="${ln.parentElement?.parentElement?.parentElement?.parentElement?.getAttribute(
            'name'
          )}" ldInst="${cswi.parentElement?.getAttribute('inst')}" prefix="${
            ln.getAttribute('prefix') ? ln.getAttribute('prefix') : ''
          }" lnClass="${ln.getAttribute('lnClass')}" lnInst="${
            ln.getAttribute('inst') ? ln.getAttribute('inst') : ''
          }"></LNode>
          `,
          'application/xml'
        ).documentElement
      )
    );
}

function getSwitchGearType(cswi: Element): string {
  if (
    cswi.parentElement?.querySelector(
      `LN[lnClass="XCBR"]${
        cswi.getAttribute('prefix')
          ? `[prefix="${cswi.getAttribute('prefix')}"]`
          : ``
      }${
        cswi.getAttribute('inst') ? `[inst="${cswi.getAttribute('inst')}"]` : ``
      }`
    )
  )
    return 'CBR';

  if (
    cswi.parentElement?.querySelector(
      `LN[lnClass="XSWI"]${
        cswi.getAttribute('prefix')
          ? `[prefix="${cswi.getAttribute('prefix')}"]`
          : ``
      }${
        cswi.getAttribute('inst') ? `[inst="${cswi.getAttribute('inst')}"]` : ``
      }`
    )
  )
    return 'DIS';

  return 'DIS';
}

function getSwitchGearName(ln: Element): string {
  if (ln.getAttribute('prefix') && ln.getAttribute('inst'))
    return ln.getAttribute('prefix')! + ln.getAttribute('inst');

  if (ln.getAttribute('inst') && getSwitchGearType(ln) === 'CBR')
    return 'QA' + cbNum++;

  return 'QB' + dsNum++;
}

function isSwitchGear(ln: Element, selectedCtlModel: string[]): boolean {
  if (!ln || !ln.ownerDocument) return false;

  // ctlModel can be configured in IED section.
  if (
    Array.from(
      ln.querySelectorAll('DOI[name="Pos"] > DAI[name="ctlModel"] > Val')
    ).filter(val => selectedCtlModel.includes(val.innerHTML.trim())).length
  )
    return true;

  // ctlModel can be configured as type in DataTypeTemplate section
  const doc = ln.ownerDocument;
  if (
    Array.from(
      doc.querySelectorAll(
        `DataTypeTemplates > LNodeType[id="${ln.getAttribute(
          'lnType'
        )}"] > DO[name="Pos"]`
      )
    )
      .map(DO => (<Element>DO).getAttribute('type'))
      .flatMap(doType =>
        Array.from(
          doc.querySelectorAll(
            `DOType[id="${doType}"] > DA[name="ctlModel"] > Val`
          )
        )
      )
      .filter(val => selectedCtlModel.includes((<Element>val).innerHTML.trim()))
      .length
  )
    return true;

  return false;
}

function getCSWI(ied: Element): Element[] {
  return Array.from(
    ied.querySelectorAll('AccessPoint > Server > LDevice > LN[lnClass="CSWI"]')
  );
}

function getValidCSWI(ied: Element, selectedCtlModel: string[]): Element[] {
  if (!ied || !ied.parentElement) return [];

  return getCSWI(ied).filter(cswi => isSwitchGear(cswi, selectedCtlModel));
}

function createBayElement(
  ied: Element,
  ctlModelList: string[]
): Element | null {
  const switchGear = getValidCSWI(ied, ctlModelList);
  cbNum = 1;
  dsNum = 1;

  if (switchGear.length) {
    const bayElement = new DOMParser().parseFromString(
      `<Bay name="Q${bayNum++}" desc="Bay for controller ${
        ied.getAttribute('name') ?? ''
      }"></Bay>`,
      'application/xml'
    ).documentElement;

    const condEq = switchGear.map(cswi => {
      const condEq = new DOMParser().parseFromString(
        `<ConductingEquipment name="${getSwitchGearName(
          cswi
        )}" type="${getSwitchGearType(cswi)}"></ConductingEquipment>`,
        'application/xml'
      ).documentElement;
      addLNode(condEq, cswi);
      return condEq;
    });

    condEq.forEach(condEq => bayElement.appendChild(condEq));

    return bayElement;
  }
  return null;
}

function guessBasedOnCSWI(doc: XMLDocument): WizardAction {
  return (inputs: WizardInput[], wizard: CloseableElement): EditorAction[] => {
    const actions: EditorAction[] = [];

    const ctlModelList = (<List>(
      wizard.shadowRoot!.querySelector('#ctlModelList')
    )).items
      .filter(item => item.selected)
      .map(item => item.value);

    const root = doc.querySelector('SCL');

    if (root && doc.querySelectorAll(':root > Substation')) {
      Array.from(doc.querySelectorAll(':root > Substation')).forEach(
        substation => {
          actions.push({
            old: {
              parent: root,
              element: substation,
              reference: substation.nextElementSibling,
            },
          });
        }
      );
    }

    const substation: Element = new DOMParser().parseFromString(
      `<Substation
          name="AA1" desc="substation guessed by OpenSCD"> 
        </Substation>`,
      'application/xml'
    ).documentElement;

    const voltageLevel: Element = new DOMParser().parseFromString(
      `<VoltageLevel name="E1" desc="voltage level guessed by OpenSCD" nomFreq="50.0" numPhases="3">
        <Voltage unit="V" multiplier="k">110.00</Voltage>
      </VoltageLevel>`,
      'application/xml'
    ).documentElement;

    substation.appendChild(voltageLevel);

    Array.from(doc.querySelectorAll(':root > IED'))
      .sort(sortElementByNameAttribute)
      .map(ied => createBayElement(ied, ctlModelList))
      .forEach(bay => {
        if (bay) voltageLevel.appendChild(bay);
      });

    actions.push({
      new: {
        parent: root!,
        element: substation,
        reference:
          root!.querySelector(':root > Communication') ||
          root!.querySelector(':root > IED') ||
          root!.querySelector(':root > DataTypeTemplates'),
      },
    });

    wizard.close();
    return actions;
  };
}

/** @returns a Wizard for guessing `Substation` stucture based on `lnClass` beeing a bay controller */
export function guessSubstation(doc: XMLDocument): Wizard {
  return [
    {
      title: get('guess.wizard.title.switchgear'),
      primary: {
        icon: 'play_arrow',
        label: get('start'),
        action: guessBasedOnCSWI(doc),
      },
      content: [
        html`<mwc-list multi id="ctlModelList"
          ><mwc-check-list-item value="status-only"
            >status-only</mwc-check-list-item
          ><mwc-check-list-item value="direct-with-normal-security"
            >direct-with-normal-security</mwc-check-list-item
          ><mwc-check-list-item value="direct-with-enhanced-security"
            >direct-with-enhanced-security</mwc-check-list-item
          ><mwc-check-list-item value="sbo-with-normal-security"
            >sbo-with-normal-security</mwc-check-list-item
          ><mwc-check-list-item selected value="sbo-with-enhanced-security"
            >sbo-with-enhanced-security</mwc-check-list-item
          ></mwc-list
        >`,
      ],
    },
  ];
}
