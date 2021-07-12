import {SDS_NAMESPACE} from "../../../src/compas/CompasSclDataService.js";
import sinon, {SinonStub} from "sinon";

export const BASIC_TYPE_LIST_RESPONSE = `
             <TypeListResponse xmlns="${SDS_NAMESPACE}">
                  <Type>
                      <Code>SED</Code>
                      <Description>System Exchange Description</Description>
                  </Type>
                  <Type>
                      <Code>SSD</Code>
                      <Description>Substation Specification Description</Description>
                  </Type>
             </TypeListResponse>`;

export function stubFetchResponseFunction(element: any, functionName: string, response: string | undefined, callback: (result: Element[]) => any): SinonStub<any[], void> {
  return sinon.stub(element, functionName).callsFake(() => {
    if (response) {
      const parser = new DOMParser();
      const document = parser.parseFromString(response, "text/xml");
      callback(Array.from(document.querySelectorAll('Type') ?? []));
    } else {
      callback([]);
    }
  });
}
