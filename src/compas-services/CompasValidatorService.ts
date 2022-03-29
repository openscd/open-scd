import {CompasSettings} from "../compas/CompasSettings.js";
import {handleError, handleResponse, parseXml} from "./foundation.js";

export const SVS_NAMESPACE = 'https://www.lfenergy.org/compas/SclValidatorService/v1';

export function CompasSclValidatorService() {
  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  return {
    validateSCL(type: string, doc: Document): Promise<Document> {
      const svsUrl = getCompasSettings().sclValidatorServiceUrl + '/validate/v1/' + type;
      return fetch(svsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: `<?xml version="1.0" encoding="UTF-8"?>
               <svs:SclValidateRequest xmlns:svs="${SVS_NAMESPACE}">
                 <svs:SclData><![CDATA[${new XMLSerializer().serializeToString(doc.documentElement)}]]></svs:SclData>
               </svs:SclValidateRequest>`
      }).catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    listNsdocFiles(): Promise<Document> {
      const svsUrl = getCompasSettings().sclValidatorServiceUrl + '/nsdoc/v1';
      return fetch(svsUrl).catch(handleError)
        .then(handleResponse)
        .then(parseXml);
    },

    getNsdocFile(id: string): Promise<string> {
      const svsUrl = getCompasSettings().sclValidatorServiceUrl + '/nsdoc/v1/' + id;
      return fetch(svsUrl).catch(handleError)
        .then(handleResponse);
    },
  }
}
