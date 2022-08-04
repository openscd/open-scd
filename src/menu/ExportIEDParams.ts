import { LitElement, property } from 'lit-element';

import { stringify } from 'csv-stringify/browser/esm/sync';

import { compareNames } from '../foundation.js';

import { stripExtensionFromName } from '../compas/foundation.js';
import { get } from 'lit-translate';

// Structure of the Configuration file defined by both types.
type ColumnConfiguration = {
  header: string;
  attributeName?: string;
  selector?: string;
  useOwnerDocument?: boolean;
  dataAttributePath?: string[];
};

export type Configuration = {
  columns: ColumnConfiguration[];
};

/**
 * Menu item to create a CSV File containing a line per IED holding the parameters of that IED.
 * Which columns are being returned is configured in the file 'public/conf/export-ied-params.json'.
 */
export default class ExportIEDParamsPlugin extends LitElement {
  @property() doc!: XMLDocument;
  @property() docName!: string;

  get ieds(): Element[] {
    return Array.from(this.doc.querySelectorAll(`IED`));
  }

  private getSelector(selector: string, iedName: string) {
    return selector.replace(/{{\s*iedName\s*}}/, iedName);
  }

  /**
   * Find the DO/DA/BDA element with the passed name defined below the type element passed.
   * Depending on the type of Type element the query will search for the DO/DA/BDA element.
   *
   * @param dataTypeTemplate - The type element, this can be a LNodeType, DOType or DAType element.
   * @param name             - The name of the element to search for below the type element.
   */
  private getDataTypeChildElement(
    dataTypeTemplate: Element,
    name: string
  ): Element | null {
    if (dataTypeTemplate.tagName === 'LNodeType') {
      return dataTypeTemplate.querySelector(`:scope > DO[name="${name}"]`);
    } else if (dataTypeTemplate.tagName === 'DOType') {
      return dataTypeTemplate.querySelector(
        `:scope > SDO[name="${name}"], :scope > DA[name="${name}"]`
      );
    } else {
      return dataTypeTemplate.querySelector(`:scope > BDA[name="${name}"]`);
    }
  }

  /**
   * Retrieve the value that will be added to the CSV file. If an attribute name is passed the value of the
   * attribute is returned. Otherwise, the textContent of the element is returned.
   * @param element       - The element to retrieve the value from.
   * @param attributeName - Optional the name of the attribute.
   */
  private getValue(
    element: Element,
    attributeName: string | undefined
  ): string {
    if (attributeName) {
      return element.getAttribute(attributeName) ?? '';
    }
    return element.textContent ?? '';
  }

  /**
   * Use the DO/SDO/DA/BDA data element to search for the type element. In case of the DO/SDO a DOType is search
   * for and otherwise a DAType is searched for if the data element is a struct type.
   *
   * @param leafElement - The data element to retrieve its type definition.
   */
  private getDataTypeTemplateElement(
    leafElement: Element | null
  ): Element | null {
    if (leafElement) {
      if (['DO', 'SDO'].includes(leafElement.tagName)) {
        const type = leafElement.getAttribute('type') ?? '';
        return this.doc.querySelector(`DOType[id="${type}"]`);
      } else {
        const bType = leafElement.getAttribute('bType') ?? '';
        if (bType === 'Struct') {
          const type = leafElement.getAttribute('type') ?? '';
          return this.doc.querySelector(`DAType[id="${type}"]`);
        }
      }
    }
    return null;
  }

  /**
   * Search for the DO/SDO/DA/BDA element in the Template section of the document using the path array passed.
   * The LN element is the starting point for the search in the Template section.
   *
   * @param lnElement         - The LN Element used as starting point in the Template section.
   * @param dataAttributePath - The list of elements to search for, the names of the elements.
   */
  private getDataAttributeTemplateValue(
    lnElement: Element,
    dataAttributePath: string[]
  ): string | null {
    // This is only useful if the element to start from is the LN(0) Element.
    if (
      ['LN', 'LN0'].includes(lnElement.tagName) &&
      dataAttributePath.length >= 2
    ) {
      // Search LNodeType Element that is linked to the LN(0) Element.
      const type = lnElement.getAttribute('lnType');
      let dataTypeTemplate = this.doc.querySelector(`LNodeType[id="${type}"]`);
      let leafElement: Element | null = null;

      // Now start search through the Template section jumping between the type elements.
      dataAttributePath.forEach(name => {
        if (dataTypeTemplate) {
          leafElement = this.getDataTypeChildElement(dataTypeTemplate, name);
          dataTypeTemplate = this.getDataTypeTemplateElement(leafElement);
        }
      });

      if (leafElement) {
        const valElement = (<Element>leafElement).querySelector('Val');
        return valElement?.textContent?.trim() ?? null;
      }
    }
    return null;
  }

  /**
   * Search for the DAI element below the LN element using the path passed. The list of names is converted
   * to a CSS Selector to search for the DAI Element and its Val Element.
   *
   * @param lnElement         - The LN Element used as starting point for the search.
   * @param dataAttributePath - The names of the DOI/SDI/DAI Elements to search for.
   */
  private getDataAttributeInstanceValue(
    lnElement: Element,
    dataAttributePath: string[]
  ): string | null {
    if (
      ['LN', 'LN0'].includes(lnElement.tagName) &&
      dataAttributePath.length >= 2
    ) {
      const daiSelector = dataAttributePath
        .map((path, index) => {
          if (index === 0) {
            // The first element is always a DOI element.
            return `DOI[name="${path}"]`;
          } else if (index === dataAttributePath.length - 1) {
            // The last element is always a DAI element.
            return `DAI[name="${path}"]`;
          }
          // Every element(s) between the DOI and DAI element is always a SDI element.
          return `SDI[name="${path}"]`;
        })
        .join(' > ');

      const daiValueElement = lnElement.querySelector(daiSelector + ' Val');
      return daiValueElement?.textContent?.trim() ?? null;
    }
    return null;
  }

  /**
   * First check if there is an instance element found (DAI) found, otherwise search in the Template section.
   *
   * @param lnElement         - The LN Element used as starting point for the search.
   * @param dataAttributePath - The names of the DO(I)/SD(I)/DA(I) Elements to search for.
   */
  private getDataAttributeValue(
    lnElement: Element,
    dataAttributePath: string[]
  ): string {
    let value = this.getDataAttributeInstanceValue(
      lnElement,
      dataAttributePath
    );
    if (!value) {
      value = this.getDataAttributeTemplateValue(lnElement, dataAttributePath);
    }
    return value ?? '';
  }

  /**
   * Retrieve the list of elements found by the selector or if no selector defined the IED element.
   *
   * @param iedElement       - The IED element that will be used to search below if useOwnerDocument is false.
   * @param selector         - If passed the CSS selector to search for the elements.
   * @param useOwnerDocument - If false will use the IED element to search below, otherwise the full document.
   */
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

  /**
   * Create a single line of values for the CSV File.
   *
   * @param configuration - The configuration with values to retrieve.
   * @param iedElement    - The IED Element for which to retrieve the values.
   */
  private cvsLine(configuration: Configuration, iedElement: Element): string[] {
    return configuration.columns.map(column => {
      const elements = this.getElements(
        iedElement,
        column.selector,
        column.useOwnerDocument ?? false
      );

      return elements
        .map(element => {
          if (column.dataAttributePath) {
            return this.getDataAttributeValue(
              element,
              column.dataAttributePath
            );
          }
          return this.getValue(element, column.attributeName);
        })
        .filter(value => value!)
        .join(' / ');
    });
  }

  /**
   * Create the full content of the CSV file, for each IED found a line of values is returned.
   *
   * @param configuration - The configuration of the values to retrieve.
   */
  private cvsLines(configuration: Configuration): string[][] {
    const ieds = this.ieds;
    if (ieds.length > 0) {
      return ieds
        .sort(compareNames)
        .map(iedElement => this.cvsLine(configuration, iedElement));
    }
    return [[get('compas.exportIEDParams.noIEDs')]];
  }

  /**
   * Return the headers values from the configuration.
   *
   * @param configuration - The configuration containing the header names.
   */
  private columnHeaders(configuration: Configuration): string[] {
    return configuration.columns.map(column => column.header);
  }

  /**
   * Read the configuration file.
   */
  async getConfiguration(): Promise<Configuration> {
    return await import('../../public/conf/export-ied-params.json').then(
      module => module.default
    );
  }

  async run(): Promise<void> {
    // Retrieve the JSON Configuration.
    const configuration = await this.getConfiguration();

    // Create the content using a CSV Library.
    const content = stringify(this.cvsLines(configuration), {
      header: true,
      columns: this.columnHeaders(configuration),
    });
    const blob = new Blob([content], {
      type: 'text/csv',
    });

    // Push the data back to the user.
    const a = document.createElement('a');
    a.download = stripExtensionFromName(this.docName) + '-ied-params.csv';
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
