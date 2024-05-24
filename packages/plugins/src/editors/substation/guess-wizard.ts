import { html } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';

import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import {
  compareNames,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

import {
  createElement,
} from '@openscd/xml';

import { EditorAction } from '@openscd/core/foundation/deprecated/editor.js';

let bayNum = 1;
let cbNum = 1;
let dsNum = 1;

function addLNodes(condEq: Element, cswi: Element): Element {
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
    .forEach(ln => {
      condEq.appendChild(
        createElement(cswi.ownerDocument, 'LNode', {
          iedName:
            ln.parentElement?.parentElement?.parentElement?.parentElement?.getAttribute(
              'name'
            ) ?? null,
          ldInst: cswi.parentElement?.getAttribute('inst') ?? null,
          prefix: ln.getAttribute('prefix'),
          lnClass: ln.getAttribute('lnClass'),
          lnInst: ln.getAttribute('inst'),
        })
      );
    });

  return condEq;
}

function getSwitchGearType(cswi: Element): string {
  return cswi.parentElement?.querySelector(
    `LN[lnClass="XCBR"]${
      cswi.getAttribute('prefix')
        ? `[prefix="${cswi.getAttribute('prefix')}"]`
        : ``
    }${
      cswi.getAttribute('inst') ? `[inst="${cswi.getAttribute('inst')}"]` : ``
    }`
  )
    ? 'CBR'
    : 'DIS';
}

function getSwitchGearName(ln: Element): string {
  if (ln.getAttribute('prefix') && ln.getAttribute('inst'))
    return ln.getAttribute('prefix')! + ln.getAttribute('inst');

  if (ln.getAttribute('inst') && getSwitchGearType(ln) === 'CBR')
    return 'QA' + cbNum++;

  return 'QB' + dsNum++;
}

function isSwitchGear(ln: Element, selectedCtlModel: string[]): boolean {
  // ctlModel can be configured in IED section.
  if (
    Array.from(
      ln.querySelectorAll('DOI[name="Pos"] > DAI[name="ctlModel"] > Val')
    ).filter(val => selectedCtlModel.includes(val.innerHTML.trim())).length
  )
    return true;

  // ctlModel can be configured as type in DataTypeTemplate section
  const doc = ln.ownerDocument;
  return (
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
      .length > 0
  );
}

function getCSWI(ied: Element): Element[] {
  return Array.from(
    ied.querySelectorAll('AccessPoint > Server > LDevice > LN[lnClass="CSWI"]')
  );
}

function getValidCSWI(ied: Element, selectedCtlModel: string[]): Element[] {
  if (!ied.parentElement) return [];

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
    const bay = createElement(ied.ownerDocument, 'Bay', {
      name: 'Q' + bayNum++,
      desc: 'Bay for controller ' + ied.getAttribute('name'),
    });

    const condEq = switchGear.map(cswi => {
      return addLNodes(
        createElement(ied.ownerDocument, 'ConductingEquipment', {
          name: getSwitchGearName(cswi),
          type: getSwitchGearType(cswi),
        }),
        cswi
      );
    });

    condEq.forEach(condEq => bay.appendChild(condEq));

    return bay;
  }
  return null;
}

function guessBasedOnCSWI(doc: XMLDocument, substation: Element): WizardActor {
  return (
    inputs: WizardInputElement[],
    wizard: Element,
    list?: List | null
  ): EditorAction[] => {
    const actions: EditorAction[] = [];

    const ctlModelList = (<ListItemBase[]>list!.selected).map(
      item => item.value
    );

    const voltageLevel = createElement(doc, 'VoltageLevel', {
      name: 'E1',
      desc: 'guessed by OpenSCD',
      nomFreq: '50.0',
      numPhases: '3',
    });
    const voltage = createElement(doc, 'Voltage', {
      unit: 'V',
      multiplier: 'k',
    });
    voltage.textContent = '110.00';
    voltageLevel.appendChild(voltage);

    actions.push({
      new: { parent: doc.querySelector('SCL')!, element: substation },
    });

    actions.push({
      new: {
        parent: substation,
        element: voltageLevel,
      },
    });

    Array.from(doc.querySelectorAll(':root > IED'))
      .sort(compareNames)
      .map(ied => createBayElement(ied, ctlModelList))
      .forEach(bay => {
        if (bay) actions.push({ new: { parent: voltageLevel, element: bay } });
      });

    return actions;
  };
}

/** @returns a Wizard for guessing `VoltageLevel` stucture assuming each
 * `LN[lnClass="CSWI"]` represents a bay controller */
export function guessVoltageLevel(
  doc: XMLDocument,
  substation: Element
): Wizard {
  return [
    {
      title: get('guess.wizard.title'),
      primary: {
        icon: 'play_arrow',
        label: get('guess.wizard.primary'),
        action: guessBasedOnCSWI(doc, substation),
      },
      content: [
        html`<p>${get('guess.wizard.description')}</p>`,
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
