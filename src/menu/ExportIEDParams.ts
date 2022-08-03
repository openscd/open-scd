import { LitElement, property } from 'lit-element';

import { stringify } from 'csv-stringify/browser/esm/sync';

import { compareNames } from '../foundation.js';

import { stripExtensionFromName } from '../compas/foundation.js';
import { get } from 'lit-translate';

type ColumnSettings = {
  header: string;
  attributeName?: string;
  selector?: string;
  useOwnerDocument?: boolean;
  dataAttributePath?: string[];
};

export type Settings = {
  columns: ColumnSettings[];
};

export default class ExportIEDParamsPlugin extends LitElement {
  @property() doc!: XMLDocument;
  @property() docName!: string;

  get ieds(): Element[] {
    return Array.from(this.doc.querySelectorAll(`IED`));
  }

  private getSelector(selector: string, iedName: string) {
    return selector.replace(/{{\s*iedName\s*}}/, iedName);
  }

  private getDataElement(typeElement: Element, name: string): Element | null {
    if (typeElement.tagName === 'LNodeType') {
      return typeElement.querySelector(`:scope > DO[name="${name}"]`);
    } else if (typeElement.tagName === 'DOType') {
      return typeElement.querySelector(
        `:scope > SDO[name="${name}"], :scope > DA[name="${name}"]`
      );
    } else {
      return typeElement.querySelector(`:scope > BDA[name="${name}"]`);
    }
  }

  private getValue(
    element: Element,
    attributeName: string | undefined
  ): string {
    if (attributeName) {
      return element.getAttribute(attributeName) ?? '';
    }
    return element.textContent ?? '';
  }

  private getTypeElement(lastElement: Element | null): Element | null {
    if (lastElement) {
      if (['DO', 'SDO'].includes(lastElement.tagName)) {
        const type = lastElement.getAttribute('type') ?? '';
        return this.doc.querySelector(`DOType[id="${type}"]`);
      } else {
        const bType = lastElement.getAttribute('bType') ?? '';
        if (bType === 'Struct') {
          const type = lastElement.getAttribute('type') ?? '';
          return this.doc.querySelector(`DAType[id="${type}"]`);
        }
      }
    }
    return null;
  }

  private getDataAttributeTemplateValue(
    lnElement: Element,
    dataAttributePath: string[]
  ): string | null {
    // This is only useful if the element to start from is the LN(0) Element.
    if (['LN', 'LN0'].includes(lnElement.tagName)) {
      // Search LNodeType Element that is linked to the LN(0) Element.
      const type = lnElement.getAttribute('lnType');
      let typeElement = this.doc.querySelector(`LNodeType[id="${type}"]`);
      let lastElement: Element | null = null;

      // Now start search through the Template section jumping between the type elements.
      dataAttributePath.forEach(name => {
        if (typeElement) {
          lastElement = this.getDataElement(typeElement, name);
          typeElement = this.getTypeElement(lastElement);
        }
      });

      if (lastElement) {
        const valElement = (<Element>lastElement).querySelector('Val');
        return valElement?.textContent ?? null;
      }
    }
    return null;
  }

  private getDataAttributeInstanceValue(
    element: Element,
    dataAttributePath: string[]
  ): string | null {
    const daiSelector = dataAttributePath
      .slice()
      .reverse()
      .map((path, index) => {
        if (index === 0) {
          return `DAI[name="${path}"]`;
        } else if (index === dataAttributePath.length - 1) {
          return `DOI[name="${path}"]`;
        }
        return `SDI[name="${path}"]`;
      })
      .reverse()
      .join(' > ');

    const daiValueElement = element.querySelector(daiSelector + ' Val');
    if (daiValueElement) {
      return daiValueElement.textContent;
    }
    return null;
  }

  private getDataAttributeValue(
    element: Element,
    dataAttributePath: string[]
  ): string {
    let value = this.getDataAttributeInstanceValue(element, dataAttributePath);
    if (!value) {
      value = this.getDataAttributeTemplateValue(element, dataAttributePath);
    }
    return value ?? '';
  }

  private getElements(
    iedElement: Element,
    selector: string | undefined,
    useOwnerDocument: boolean
  ): Element[] {
    let elements: Element[] = [iedElement];
    if (selector) {
      const iedName = iedElement.getAttribute('name') ?? '';
      const substitutedSelector = this.getSelector(selector, iedName);
      if (useOwnerDocument) {
        elements = Array.from(
          iedElement.ownerDocument.querySelectorAll(substitutedSelector)
        );
      } else {
        elements = Array.from(iedElement.querySelectorAll(substitutedSelector));
      }
    }
    return elements;
  }

  private contentIED(settings: Settings, iedElement: Element): string[] {
    return settings.columns.map(value => {
      const elements = this.getElements(
        iedElement,
        value.selector,
        value.useOwnerDocument ?? false
      );

      return elements
        .map(element => {
          if (value.dataAttributePath) {
            return this.getDataAttributeValue(element, value.dataAttributePath);
          }
          return this.getValue(element, value.attributeName);
        })
        .filter(value => value!)
        .join(' / ');
    });
  }

  private content(settings: Settings): string[][] {
    const ieds = this.ieds;
    if (ieds.length > 0) {
      return ieds
        .sort(compareNames)
        .map(iedElement => this.contentIED(settings, iedElement));
    }
    return [[get('compas.exportIEDParams.noIEDs')]];
  }

  private columnHeaders(settings: Settings): string[] {
    return settings.columns.map(value => value.header);
  }

  async getSettings(): Promise<Settings> {
    return await import('../../public/conf/export-ied-parameters.json').then(
      module => module.default
    );
  }

  async run(): Promise<void> {
    // Import the JSON Configuration needed for the import.
    const settings = await this.getSettings();

    // Create the content using a CSV Writer.
    const content = stringify(this.content(settings), {
      header: true,
      columns: this.columnHeaders(settings),
    });
    const blob = new Blob([content], {
      type: 'text/csv',
    });

    // Push the data back to the user.
    const a = document.createElement('a');
    a.download = stripExtensionFromName(this.docName) + '-ied-parameters.csv';
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/csv', a.download, a.href].join(':');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 5000);
  }
}
