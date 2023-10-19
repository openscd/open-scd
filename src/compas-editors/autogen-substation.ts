import { LitElement, property } from 'lit-element';
import { createElement, newActionEvent, newLogEvent } from '../foundation.js';
import { get } from 'lit-translate';

let cbNum = 1;
let dsNum = 1;

//TODO : Got this from guess-wizard, it's unclear if this functionality will stay the same in the guess wizard
//       Check on a later point if implementation of an export of this function will remain valid.
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

//TODO : Got this from guess-wizard, it's unclear if this functionality will stay the same in the guess wizard
//       Check on a later point if implementation of an export of this function will remain valid.
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

//TODO : Got this from guess-wizard, it's unclear if this functionality will stay the same in the guess wizard
//       Check on a later point if implementation of an export of this function will remain valid.
function getSwitchGearName(ln: Element): string {
  if (ln.getAttribute('prefix') && ln.getAttribute('inst'))
    return ln.getAttribute('prefix')! + ln.getAttribute('inst');

  if (ln.getAttribute('inst') && getSwitchGearType(ln) === 'CBR')
    return 'QA' + cbNum++;

  return 'QB' + dsNum++;
}

//TODO : Got this from guess-wizard, it's unclear if this functionality will stay the same in the guess wizard
//       Check on a later point if implementation of an export of this function will remain valid.
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

//TODO : Got this from guess-wizard, it's unclear if this functionality will stay the same in the guess wizard
//       Check on a later point if implementation of an export of this function will remain valid.
function getCSWI(ied: Element): Element[] {
  return Array.from(
    ied.querySelectorAll('AccessPoint > Server > LDevice > LN[lnClass="CSWI"]')
  );
}

//TODO : Got this from guess-wizard, it's unclear if this functionality will stay the same in the guess wizard
//       Check on a later point if implementation of an export of this function will remain valid.
function getValidCSWI(ied: Element, selectedCtlModel: string[]): Element[] {
  if (!ied.parentElement) return [];

  return getCSWI(ied).filter(cswi => isSwitchGear(cswi, selectedCtlModel));
}

export default class CompasAutogenerateSubstation extends LitElement {
  @property() doc!: XMLDocument;
  @property() iedNames!: string[];
  @property() substationNameLength = 5;
  @property() voltageLevelNameLength = 3;
  @property() iedStartChar = 'A';

  async run(): Promise<void> {
    //Get the lNodes inside the document that are already linked to and IED
    const lNodes = this.extractNames(
      Array.from(this.doc.querySelectorAll('LNode')).map(
        value => value.getAttribute('iedName') || ''
      )
    );

    //Get name attribute from all the IEDs that aren't linked in the document
    this.iedNames = Array.from(this.doc.querySelectorAll('IED'))
      .map(IED => IED.getAttribute('name') || '')
      .filter(value => !lNodes.includes(value));

    /**
     * Get all the substation names by getting the first substationNameLength of characters.
     * If the voltageLevel element starts with A00 it can be skipped and if '_' characters are used after the substation name its invalid and will be skipped.
     * The optional underscore seperators will be left out to get a more visible appealing substation name.
     **/
    const substationNames = this.extractNames(
      this.iedNames
        .filter(
          value =>
            !value?.substring(this.substationNameLength)?.startsWith('A00') &&
            !value?.substring(this.substationNameLength)?.includes('_')
        )
        .map(FullName =>
          FullName?.substring(0, this.substationNameLength).replace(/_/g, '')
        )
    );

    this.createLog(
      substationNames.length == 0 ? 1 : 0,
      get('compas.autogensubstation.substationAmount', {
        amount: substationNames.length,
      })
    );

    this.createSubstations(substationNames);
  }

  /**
   * Creating substations based on the list of names. First check if a substation with that name already exists.
   * If the substation element doesn't exist yet, a substation element will be created with the given name and a default
   * description.
   *
   * The created substation element with its name and optional underscore seperators will be used to create voltageLevels as child elements to the substations.
   * Afterwards the substation elements will be added to the document.
   */
  createSubstations(substationNames: string[]) {
    substationNames.forEach(async name => {
      if (this.doc.querySelector(`Substation[name=${name}]`) === null) {
        const desc = 'Substation generated by CoMPAS';
        const substation = createElement(this.doc, 'Substation', {
          name,
          desc,
        });

        await this.createVoltageLevels(
          substation,
          name + '_'.repeat(this.substationNameLength - name.length)
        );

        this.dispatchEvent(
          newActionEvent({
            new: {
              parent: this.doc.querySelector('SCL')!,
              element: substation,
            },
          })
        );
        this.createLog(
          0,
          get('compas.autogensubstation.substationGen', {
            substationname: name,
          })
        );
      }
    });
  }

  /**
   * The name-content of the child elements will be extracted by getting the substring after the substationNameLength of characters.
   * VoltageLevel elements will be created by getting the first voltageLevelNameLength characters of each element in the name content.
   * The elements will be created based on the name and some default values.
   *
   * Afterwards the first voltageLevelNameLength of characters will be filtered out of the name content and the remaining content
   * will be used to create bay elements.
   * The elements will be appended to the substation element
   * @param substation substation(parent) element
   * @param substationName name of the substation
   */
  createVoltageLevels(substation: Element, substationName: string) {
    const substationContent = this.iedNames
      .filter(value => value.includes(substationName))
      .map(FullName => FullName?.substring(this.substationNameLength));

    const voltageLevelNames = this.extractNames(
      substationContent.map(FullName =>
        FullName?.substring(0, this.voltageLevelNameLength)
      )
    ).filter(value => !value.startsWith('A00'));

    this.createLog(
      voltageLevelNames.length == 0 ? 1 : 0,
      get('compas.autogensubstation.voltagelevelAmount', {
        amount: voltageLevelNames.length,
        substationname: substationName.replace(/_/g, ''),
      })
    );

    if (voltageLevelNames.length == 0) return;

    voltageLevelNames.forEach(name => {
      const desc = 'Voltage Level generated by CoMPAS';
      const nomFreq = '50.0';
      const numPhases = '3';
      const voltageLevel = createElement(
        substation.ownerDocument,
        'VoltageLevel',
        {
          name,
          desc,
          nomFreq,
          numPhases,
        }
      );

      const voltageLevelContent = substationContent
        .filter(value => value?.startsWith(name))
        .map(FullName =>
          FullName?.substring(this.voltageLevelNameLength, FullName.length)
        );

      this.createBays(voltageLevel, voltageLevelContent, substationName + name);
      substation.appendChild(voltageLevel);
    });
  }

  /**
   * Bay elements will be created by getting the characters before the IED start character of each element in the remaining name content.
   * Afterwards the IED names that contain in the bay will be determined by filtering out the Voltage Level content that start with the bayname.
   * The IED element will be found by doing a query with the full IED name (substationVoltageLevelName + IED name).
   * The IED element will be used the create LNode elements. The guessLNodes will create elements based on if the IED contains switchgear.
   * If the element doesn't contain switchgear a deafult LNode element will be created as child and appended to the bay.
   *
   * @param voltageLevel voltageLevel(parent) element
   * @param voltageLevelContent remaining content extracted from the IEDs (name without substation name and voltageLevel name)
   * @param substationVoltageLevelName The name of the substation + voltageLevel
   */
  createBays(
    voltageLevel: Element,
    voltageLevelContent: string[],
    substationVoltageLevelName: string
  ) {
    const bayNames = this.extractNames(
      voltageLevelContent.map(iedName => iedName.split(this.iedStartChar)[0])
    );

    this.createLog(
      bayNames.length == 0 ? 1 : 0,
      get('compas.autogensubstation.bayAmount', {
        amount: bayNames.length,
        voltagelevelname: substationVoltageLevelName.substring(
          this.substationNameLength
        ),
      })
    );

    bayNames.forEach(name => {
      const desc = 'Bay generated by CoMPAS';
      const bayElement = createElement(voltageLevel.ownerDocument, 'Bay', {
        name,
        desc,
      });

      const iedNames = voltageLevelContent.filter(value =>
        value.startsWith(name)
      );
      iedNames.forEach(iedName => {
        const currentIed = this.doc.querySelector(
          `IED[name=${substationVoltageLevelName + iedName}]`
        );

        const guessLNodes = this.createLNodeElements(currentIed!, [
          'sbo-with-enhanced-security',
        ]);

        guessLNodes
          ? guessLNodes.forEach(lNode => bayElement.appendChild(lNode))
          : bayElement.prepend(this.addDefaultLNodes(currentIed!));
      });
      voltageLevel.appendChild(bayElement);
    });
  }

  /**
   * Create ConductingEquipment with LNode children based on whether the IED contains switchgear
   * @param ied
   * @param ctlModelList
   * @returns ConductingEquipment with LNode child elements or null
   */
  createLNodeElements(ied: Element, ctlModelList: string[]): Element[] | null {
    const switchGear = getValidCSWI(ied, ctlModelList);

    if (switchGear.length) {
      const condEq = switchGear.map(cswi => {
        return addLNodes(
          createElement(ied.ownerDocument, 'ConductingEquipment', {
            name: getSwitchGearName(cswi),
            type: getSwitchGearType(cswi),
          }),
          cswi
        );
      });

      return condEq;
    }
    return null;
  }

  /**
   * Create default LNode element with default values
   * @param currentIed
   * @returns LNode element
   */
  addDefaultLNodes(currentIed: Element): Element {
    const ln = currentIed.querySelector('LN0');

    return createElement(currentIed.ownerDocument, 'LNode', {
      iedName: currentIed.getAttribute('name'),
      ldInst: currentIed.parentElement?.getAttribute('inst') ?? null,
      prefix: ln?.getAttribute('prefix') ?? null,
      lnClass: ln?.getAttribute('lnClass') ?? null,
      lnInst: ln?.getAttribute('inst') ?? null,
    });
  }

  /**
   * Helper function to filter out empty and duplicate elements
   * @param content
   * @returns filtered content
   */
  extractNames(content: string[]) {
    //return list of names after filtering out the empty and duplicate elements
    return content.filter(
      (value, index) => value && content.indexOf(value) === index
    );
  }

  createLog(type: number, content: string) {
    this.dispatchEvent(
      newLogEvent({
        kind: type == 0 ? 'info' : 'error',
        title: content,
      })
    );
  }
}
