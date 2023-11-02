import { LitElement, property } from 'lit-element';

import { newIssueEvent } from '../foundation.js';

import {
  CompasSclValidatorService,
  SVS_NAMESPACE,
} from '../compas-services/CompasValidatorService.js';
import { createLogEvent } from '../compas-services/foundation.js';
import { getTypeFromDocName } from '../compas/foundation.js';

export default class CompasValidateSchema extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: String })
  docName!: string;

  @property()
  pluginId!: string;

  // Boolean to prevent running the validation multiple times at the same time.
  private compasValidationSchemaRunning = false;

  async validate(manual: boolean): Promise<void> {
    // We don't want to externally validate every time a save is done. So only start the validation when manually triggered.
    // And also if one is already running we don't want to start another one, wait until it's finished.
    if (!manual || this.compasValidationSchemaRunning) {
      return;
    }

    // Block running another validation until this one is finished.
    this.compasValidationSchemaRunning = true;

    const docType = getTypeFromDocName(this.docName);
    await CompasSclValidatorService()
      .validateSCL(this, docType, this.doc)
      .then(doc => this.processValidationResponse(doc))
      .catch(reason => createLogEvent(this, reason));

    this.compasValidationSchemaRunning = false;
  }

  private processValidationResponse(response: Document): void {
    const validationErrors = Array.from(
      response.querySelectorAll('ValidationErrors') ?? []
    );
    // Check if there are validation errors, if there are we will process them.
    if (validationErrors.length > 0) {
      validationErrors.forEach(validationError => {
        this.dispatchEvent(
          newIssueEvent({
            validatorId: this.pluginId,
            title: this.createTitle(validationError),
            message: this.createMessage(validationError),
            element: this.getElement(validationError),
          })
        );
      });
    }
  }

  private createTitle(validationError: Element): string {
    const message = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'Message')!
      .item(0)?.textContent;
    return message ? message : 'No validation message';
  }

  private createMessage(validationError: Element): string | undefined {
    const ruleName = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'RuleName')!
      .item(0)?.textContent;
    const lineNumber = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'LineNumber')!
      .item(0)?.textContent;
    const columnNumber = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'ColumnNumber')!
      .item(0)?.textContent;
    const xpath = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'XPath')!
      .item(0)?.textContent;

    const messageParts: string[] = [];
    if (ruleName) messageParts.push(`Rule: ${ruleName}`);
    if (lineNumber) messageParts.push(`Line: ${lineNumber}`);
    if (columnNumber) messageParts.push(`Column: ${columnNumber}`);
    if (xpath) messageParts.push(`XPath: ${xpath}`);

    if (messageParts.length == 0) {
      return undefined;
    }
    return messageParts.join(', ');
  }

  private getElement(validationError: Element): Element | undefined {
    const xpath = validationError
      .getElementsByTagNameNS(SVS_NAMESPACE, 'XPath')!
      .item(0)?.textContent;

    if (xpath) {
      const fixedXPath = this.rewriteXPathForDefaultNamespace(xpath);
      const nsResolver = this.doc.createNSResolver(this.doc.documentElement);
      const result = this.doc.evaluate(
        fixedXPath,
        this.doc,
        this.createResolver(nsResolver),
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      if (result.singleNodeValue) {
        return <Element>result.singleNodeValue;
      }
    }
    return undefined;
  }

  /**
   * For XPath to work correctly the default namespace of SCL needs to have a prefix to work.
   * The function evaluate expects HTML to be the default namespace.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/XPath/Introduction_to_using_XPath_in_JavaScript
   * for more information on how XPath is working with evalaute and why this fix is needed.
   *
   * @param xpath - The XPath to rewrite to use a prefix 'scl' for the SCL Namespace.
   */
  private rewriteXPathForDefaultNamespace(xpath: string): string {
    return (
      '/' +
      xpath
        .split('/')
        .filter(part => !!part)
        .map(part => {
          if (part && part.indexOf(':') < 0) {
            return 'scl:' + part;
          }
          return part;
        })
        .join('/')
    );
  }

  /**
   * Create a XPath Namespace Resolver to handle the default and other custom namespaces.
   *
   * @param nsResolver - The automatically created namespace resolver.
   */
  private createResolver(nsResolver: any): XPathNSResolver {
    return {
      lookupNamespaceURI(prefix: string | null): string | null {
        // Handle the fix default namespace.
        if (prefix === 'scl') {
          return 'http://www.iec.ch/61850/2003/SCL';
        }
        // Use the automatically created resolver for other prefixes.
        // The resolver can be used in two different ways.
        if (typeof nsResolver === 'function') {
          return nsResolver(prefix);
        }
        if (typeof nsResolver.lookupNamespaceURI === 'function') {
          return nsResolver.lookupNamespaceURI(prefix);
        }
        return null;
      },
    };
  }
}
