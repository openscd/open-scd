import { get } from 'lit-translate';

import {
  LitElementConstructor,
  Mixin,
  newLogEvent,
  newActionEvent,
  SimpleAction,
  createElement,
} from './foundation.js';

/** Mixin that handles IED import*/
export type ImportingElement = Mixin<typeof Importing>;

/** @typeParam TBase - a type extending `LitElement`
 * @returns `Base` dispatching [[`LogEvent`]]s and [[`EditorActionEvent`]]s. */
export function Importing<TBase extends LitElementConstructor>(Base: TBase) {
  class ImportingElement extends Base {
    private addLNodeType(
      lNodeType: Element,
      doc: Document
    ): SimpleAction | undefined {
      const existLNodeType = doc.querySelector(
        `:root > DataTypeTemplates > LNodeType[id="${lNodeType.getAttribute(
          'id'
        )}"]`
      );

      if (existLNodeType && lNodeType.isEqualNode(existLNodeType)) return;

      if (existLNodeType) {
        //INFO: id's within DataTypeTemplate must be unique. This is not the case here.
        //Rename the id by adding IED name at the beginning
        const ied: Element = lNodeType.parentElement!.parentElement!.querySelector(
          ':root > IED'
        )!;

        const idOld = lNodeType.getAttribute('id')!;
        const idNew = ied.getAttribute('name')!.concat(idOld);

        lNodeType.setAttribute('id', idNew);
        ied
          .querySelectorAll(
            `AccessPoint > Server > LDevice > LN0[lnType="${idOld}"], AccessPoint > Server > LDevice > LN[lnType="${idOld}"]`
          )
          .forEach(ln => ln.setAttribute('lnType', idNew));
      }

      return {
        new: {
          parent: doc.querySelector(':root > DataTypeTemplates')!,
          element: lNodeType,
          reference: doc.querySelector(':root > DataTypeTemplates > DOType'),
        },
      };
    }

    private addDOType(
      doType: Element,
      doc: Document
    ): SimpleAction | undefined {
      const existDOType = doc.querySelector(
        `:root > DataTypeTemplates > DOType[id="${doType.getAttribute('id')}"]`
      );

      if (existDOType && doType.isEqualNode(existDOType)) return;

      if (existDOType) {
        //INFO: id's within DataTypeTemplate must be unique. This is not the case here.
        //Rename the id by adding IED name at the beginning
        const ied: Element = doType.parentElement!.parentElement!.querySelector(
          ':root > IED'
        )!;
        const data: Element = doType.parentElement!;

        const idOld = doType.getAttribute('id');
        const idNew = ied.getAttribute('name')! + idOld;
        doType.setAttribute('id', idNew);
        data
          .querySelectorAll(
            `LNodeType > DO[type="${idOld}"], DOType > SDO[type="${idOld}"]`
          )
          .forEach(type => type.setAttribute('type', idNew));
      }

      return {
        new: {
          parent: doc.querySelector(':root > DataTypeTemplates')!,
          element: doType,
          reference: doc.querySelector(':root > DataTypeTemplates > DAType'),
        },
      };
    }

    private addDAType(
      daType: Element,
      doc: Document
    ): SimpleAction | undefined {
      const existDAType = doc.querySelector(
        `:root > DataTypeTemplates > DAType[id="${daType.getAttribute('id')}"]`
      );

      if (existDAType && daType.isEqualNode(existDAType)) return;

      if (existDAType) {
        //INFO: id's within DataTypeTemplate must be unique. This is not the case here.
        //Rename the id by adding IED name at the beginning
        const ied: Element = daType.parentElement!.parentElement!.querySelector(
          ':root > IED'
        )!;
        const data: Element | null = daType.parentElement!;

        const idOld = daType.getAttribute('id');
        const idNew = ied.getAttribute('name')! + idOld;

        daType.setAttribute('id', idNew);
        data
          .querySelectorAll(
            `DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`
          )
          .forEach(type => type.setAttribute('type', idNew));
      }

      return {
        new: {
          parent: doc.querySelector(':root > DataTypeTemplates')!,
          element: daType,
          reference: doc.querySelector(':root > DataTypeTemplates > EnumType'),
        },
      };
    }

    private addEnumType(enumType: Element, doc: Document) {
      const existEnumType = doc.querySelector(
        `:root > DataTypeTemplates > EnumType[id="${enumType.getAttribute(
          'id'
        )}"]`
      );

      if (existEnumType && enumType.isEqualNode(existEnumType)) return;

      if (existEnumType) {
        //INFO: id's within DataTypeTemplate must be unique. This is not the case here.
        //Rename the id by adding IED name at the beginning
        const ied: Element = enumType.parentElement!.parentElement!.querySelector(
          ':root > IED'
        )!;
        const data: Element = enumType.parentElement!;

        const idOld = enumType.getAttribute('id');
        const idNew = ied.getAttribute('name')! + idOld;

        enumType.setAttribute('id', idNew);
        data
          .querySelectorAll(
            `DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`
          )
          .forEach(type => type.setAttribute('type', idNew));
      }

      return {
        new: {
          parent: doc.querySelector(':root > DataTypeTemplates')!,
          element: enumType,
          reference: null,
        },
      };
    }

    private addIED(ied: Element, templates: Element, doc: Document): void {
      const actions: (SimpleAction | undefined)[] = [];

      templates
        .querySelectorAll(':root > DataTypeTemplates > LNodeType')
        .forEach(lNodeType => actions.push(this.addLNodeType(lNodeType, doc)));

      templates
        .querySelectorAll(':root > DataTypeTemplates > DOType')
        .forEach(doType => actions.push(this.addDOType(doType, doc)));

      templates
        .querySelectorAll(':root > DataTypeTemplates > DAType')
        .forEach(daType => actions.push(this.addDAType(daType, doc)));

      templates
        .querySelectorAll(':root > DataTypeTemplates > EnumType')
        .forEach(enumType => actions.push(this.addEnumType(enumType, doc)));

      actions.push({
        new: {
          parent: doc!.querySelector(':root')!,
          element: ied,
          reference: doc!.querySelector(':root > DataTypeTemplates')!,
        },
      });

      this.dispatchEvent(
        newActionEvent({
          title: 'Import IED ' + ied.getAttribute('name'),
          actions: <SimpleAction[]>(
            actions.filter(action => action !== undefined)
          ),
        })
      );
    }

    private isValidIED(ied: Element | null, doc: Document): boolean {
      if (!ied) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('import.log.missingied'),
          })
        );
        return false;
      }
      if (
        Array.from(doc.querySelectorAll(':root > IED'))
          .map(ied => ied.getAttribute('name'))
          .filter(iedName => iedName === ied.getAttribute('name')).length
      ) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('import.log.nouniqueied', {
              name: ied.getAttribute('name')!,
            }),
          })
        );
        return false; //IED name must be unique
      }

      return true;
    }

    /** Loads and parses an `XMLDocument` after [[`srcIED`]] has changed. */
    async importIED(src: string, doc: Document): Promise<string> {
      let iedDoc: Document | null = null;

      const response = await fetch(src);
      const text = await response.text();
      iedDoc = new DOMParser().parseFromString(text, 'application/xml');

      if (!iedDoc || iedDoc.querySelector('parsererror')) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('import.log.parsererror'),
          })
        );
        throw new Error(get('import.log.loaderror'));
      }

      if (!doc.querySelector(':root > DataTypeTemplates')) {
        const element = createElement(doc, 'DataTypeTemplates', {});
        this.dispatchEvent(
          newActionEvent({
            new: {
              parent: doc.documentElement,
              element,
              reference: null,
            },
          })
        );
      }

      const msg: string =
        'IED ' +
        iedDoc.querySelector(':root > IED')?.getAttribute('name') +
        ' loaded';

      const isSuccessful = this.isValidIED(
        iedDoc.querySelector(':root > IED'),
        doc
      );
      if (isSuccessful) {
        this.addIED(
          iedDoc.querySelector(':root > IED')!,
          iedDoc.querySelector(':root > DataTypeTemplates')!,
          doc
        );
      }

      if (src.startsWith('blob:')) URL.revokeObjectURL(src);

      if (isSuccessful) return msg;

      throw new Error(get('import.log.importerror'));
    }
  }

  return ImportingElement;
}
