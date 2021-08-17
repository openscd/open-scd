import {CompasSettings} from "./CompasSettingsElement.js";
import {getJwtToken} from "../state/auth/KeycloakManager.js";

export const CMS_NAMESPACE = 'https://www.lfenergy.org/compas/CimMappingService/v1';

export interface CimData {
  name: string,
  doc: Document;
}

export interface MapRequestBody {
  cimData: CimData[]
}

export function CompasCimMappingService() {

  function getCompasSettings() {
    return CompasSettings().compasSettings;
  }

  return {
    map(body: MapRequestBody): Promise<Document> {
      const cmsUrl = getCompasSettings().cimMappingServiceUrl + '/cim/v1/map';
      return fetch(cmsUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + getJwtToken(),
          'Content-Type': 'application/xml'
        },
        body: `<?xml version="1.0" encoding="UTF-8"?>
               <cms:MapRequest xmlns:cms="${CMS_NAMESPACE}">
               ${body.cimData.map(cimData => {
                  return `
                    <cms:CimData>
                        <cms:Name>${cimData.name}</cms:Name>
                        ${new XMLSerializer().serializeToString(cimData.doc.documentElement)}
                    </cms:CimData>`;
                }) }
               </cms:MapRequest>`
      })
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'))
    },
  }
}
