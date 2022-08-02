import { LitElement, property } from 'lit-element';

import { stringify } from 'csv-stringify/browser/esm/sync';

import { compareNames } from '../foundation.js';

import { stripExtensionFromName } from '../compas/foundation.js';

import settings from '../../public/conf/export-ied-parameters.json';

function getDataElement(typeElement: Element, name: string): Element | null {
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

function getValue(element: Element, attributeName: string | undefined): string {
  if (attributeName) {
    return element.getAttribute(attributeName) ?? '';
  }
  return element.textContent ?? '';
}

function getSelector(selector: string, iedName: string) {
  return selector.replace('{{ iedName }}', iedName);
}

function getElements(
  iedElement: Element,
  selector: string | undefined,
  useOwnerDocument: boolean
): Element[] {
  let elements: Element[] = [iedElement];
  if (selector) {
    const iedName = iedElement.getAttribute('name') ?? '';
    const substitutedSelector = getSelector(selector, iedName);
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

export default class ExportIEDParametersPlugin extends LitElement {
  @property() doc!: XMLDocument;
  @property() docName!: string;

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
    element: Element,
    dataAttributePath: string[]
  ): string | null {
    // This is only useful if the element to start from is the LN(0) Element.
    if (['LN', 'LN0'].includes(element.tagName)) {
      // Search LNodeType Element that is linked to the LN(0) Element.
      const type = element.getAttribute('lnType');
      let typeElement = this.doc.querySelector(`LNodeType[id="${type}"]`);
      let lastElement: Element | null = null;

      // Now start search through the Template section jumping between the type elements.
      dataAttributePath.forEach(name => {
        if (typeElement) {
          lastElement = getDataElement(typeElement, name);
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

  private content(): string[][] {
    return Array.from(this.doc.querySelectorAll(`IED`))
      .sort(compareNames)
      .map(iedElement => {
        return settings.columns.map(value => {
          const elements = getElements(
            iedElement,
            value.selector,
            value.useOwnerDocument ?? false
          );

          return elements
            .map(element => {
              if (value.dataAttributePath) {
                return this.getDataAttributeValue(
                  element,
                  value.dataAttributePath
                );
              }
              return getValue(element, value.attributeName);
            })
            .filter(value => value!)
            .join(' / ');
        });
      });
  }

  private columnHeaders(): string[] {
    return settings.columns.map(value => value.header);
  }

  async run(): Promise<void> {
    const content = stringify(this.content(), {
      header: true,
      columns: this.columnHeaders(),
    });
    const blob = new Blob([content], {
      type: 'text/csv',
    });

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
