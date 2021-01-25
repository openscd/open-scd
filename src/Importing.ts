import {
  LitElementConstructor,
  Mixin,
  newLogEvent,
  newActionEvent,
  SimpleAction,
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

      if (existLNodeType && !lNodeType.isEqualNode(existLNodeType)) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'warning',
            title: `There are LNodeType elements with the same id but different structure. OpenSCD does not have a procedure to unifiy DataTypeTempate id's, yet.`,
          })
        );
        return;
      }

      if (existLNodeType) return;

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
        `:root > DataTypeTemplates > DOtype[id="${doType.getAttribute('id')}"]`
      );

      if (existDOType && !doType.isEqualNode(existDOType)) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'warning',
            title: `There are DOType elements with the same id but different structure. OpenSCD does not have a procedure to unifiy DataTypeTempate id's, yet.`,
          })
        );
        return;
      }

      if (existDOType) return;

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

      if (existDAType && !daType.isEqualNode(existDAType)) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'warning',
            title: `There are DAType elements with the same id but different structure. OpenSCD does not have a procedure to unifiy DataTypeTempate id's, yet.`,
          })
        );
      }

      if (existDAType) return;

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

      if (existEnumType && !enumType.isEqualNode(existEnumType)) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'warning',
            title: `There are EnumType elements with the same id but different structure. OpenSCD does not have a procedure to unifiy DataTypeTempate id's, yet.`,
          })
        );
      }

      if (existEnumType) return;

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
            title: 'There is no IED in the file',
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
            title: `There is already an IED with this name in the project. ${ied.getAttribute(
              'name'
            )} could not be loaded!`,
          })
        );
        return false; //IED name must be unique
      }

      return true;
    }

    /** Loads and parses an `XMLDocument` after [[`src`]] has changed. */
    async importIED(src: string, doc: Document | null): Promise<string> {
      if (!doc)
        return 'Cannot load IED without a valid project. Please open or create a new project first';

      let iedDoc: Document | null = null;

      const response = await fetch(src);
      const text = await response.text();
      iedDoc = new DOMParser().parseFromString(text, 'application/xml');

      if (!iedDoc) return 'Parsing error with while opening the file.';

      if (!doc.querySelector(':root > DataTypeTemplates'))
        this.dispatchEvent(
          newActionEvent({
            new: {
              element: new DOMParser().parseFromString(
                `<DataTypeTemplates></DataTypeTemplates>`,
                'application/xml'
              ).documentElement,
              parent: doc.documentElement,
              reference: null,
            },
          })
        );

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
      return new Promise((resolve, reject) => {
        if (!isSuccessful) reject('Import IED unsucessful');

        resolve(msg);
      });
    }
  }

  return ImportingElement;
}
