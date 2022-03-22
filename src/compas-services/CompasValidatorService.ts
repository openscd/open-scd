import {CompasSettings} from "../compas/CompasSettings.js";
import {handleError, handleResponse, parseXml} from "./foundation.js";

export const SVS_NAMESPACE = 'https://www.lfenergy.org/compas/SclValidatorService/v1';

export function CompasSclValidatorService() {
  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  return {
    validateSCL(type: string, doc: Document): Promise<Document> {
      const saaUrl = getCompasSettings().sclValidatorServiceUrl + '/validate/v1/' + type;
      return fetch(saaUrl, {
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
  }
}
