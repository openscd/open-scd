import {CompasSettings} from "../compas/CompasSettings.js";
import {extractSclFromResponse, handleError, handleResponse, parseXml} from "./foundation.js";

export const SAA_NAMESPACE = 'https://www.lfenergy.org/compas/SclAutoAlignmentService/v1';

export function CompasSclAutoAlignmentService() {
  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  return {
    updateSCL(doc: Document, substationNames: string[]): Promise<Document> {
      const saaUrl = getCompasSettings().sclAutoAlignmentServiceUrl + '/auto/alignment/v1';
      return fetch(saaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml'
        },
        body: `<?xml version="1.0" encoding="UTF-8"?>
               <saa:SclAutoAlignRequest xmlns:saa="${SAA_NAMESPACE}">
                 ${substationNames.map(substationName => {
                    return `
                        <saa:SubstationName>${substationName}</saa:SubstationName>
                    `;
                 })}
                 <saa:SclData><![CDATA[${new XMLSerializer().serializeToString(doc.documentElement)}]]></saa:SclData>
               </saa:SclAutoAlignRequest>`
      }).catch(handleError)
        .then(handleResponse)
        .then(parseXml)
        .then(extractSclFromResponse);
    },
  }
}
