import { handleError, handleResponse } from './foundation.js';

interface NsDocFile {
  filename: string;
  id: string;
  name: string;
}

// Temporary solution to map to the old logic
const nsDocfiles: NsDocFile[] = [
  {
    filename: 'IEC_61850-7-2_2007B3-en.nsdoc',
    name: 'IEC 61850-7-2',
    id: '87e5bed8-2f27-4006-8673-f9d00b0a5426',
  },
  {
    filename: 'IEC_61850-7-3_2007B3-en.nsdoc',
    name: 'IEC_61850-7-3',
    id: '315b02ac-c4aa-4495-9b4f-f7175a75c315',
  },
  {
    filename: 'IEC_61850-7-4_2007B3-en.nsdoc',
    name: 'IEC 61850-7-4',
    id: 'da1b2ca0-1263-4b10-9b16-2f148ae3a1f1',
  },
  {
    filename: 'IEC_61850-8-1_2003A2-en.nsdoc',
    name: 'IEC 61850-8-1',
    id: '0c052ea7-a010-4ca8-b2c7-caa665cabc46',
  },
];

const createElement = (
  name: string,
  textContent: string,
  document: XMLDocument
): Element => {
  const element: Element = document.createElement(name);
  element.textContent = textContent;

  return element;
};

/** TODO: Make this return JSON  */
export function CompasNSDocFileService() {
  return {
    listNsdocFiles(): Promise<Document> {
      const document: XMLDocument = new DOMParser().parseFromString(
        '<NsdocListResponse></NsdocListResponse>',
        'text/xml'
      );

      nsDocfiles.forEach(nsDocFile => {
        const nsDocFileElement: Element = document.createElement('NsdocFile');

        nsDocFileElement.appendChild(
          createElement('Id', nsDocFile.id, document)
        );
        nsDocFileElement.appendChild(
          createElement('NsdocId', nsDocFile.name, document)
        );
        nsDocFileElement.appendChild(
          createElement('Checksum', nsDocFile.id, document)
        );
        nsDocFileElement.appendChild(
          createElement('Filename', nsDocFile.filename, document)
        );

        document
          .querySelector('NsdocListResponse')!
          .appendChild(nsDocFileElement);
      });

      return Promise.resolve(document);
    },

    getNsdocFile(id: string): Promise<Document> {
      const nsDocFile: NsDocFile = nsDocfiles.find(f => f.id === id)!;

      if (!nsDocFile) {
        return Promise.reject(`Unable to find nsDoc file with id ${id}`);
      }
      return fetch(`./public/nsdoc/${nsDocFile.filename}`)
        .catch(handleError)
        .then(handleResponse)
        .then(res => {
          const document: XMLDocument = new DOMParser().parseFromString(
            '<NsdocResponse></NsdocResponse>',
            'text/xml'
          );

          document
            .querySelector('NsdocResponse')!
            .appendChild(createElement('NsdocFile', res, document));

          return document;
        });
    },
  };
}
