import { SDS_NAMESPACE } from '../../../src/compas-services/CompasSclDataService.js';
import sinon, { SinonStub } from 'sinon';

export const TYPE_ENTRY_ELEMENT_NAME = 'Type';
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

export const ITEM_ENTRY_ELEMENT_NAME = 'Item';
export const BASIC_ITEM_LIST_RESPONSE = `
             <ListResponse xmlns="${SDS_NAMESPACE}">
                <Item>
                    <Id>9883eabb-2e3c-471c-9036-95045d01e3fc</Id>
                    <Name>Station-Utrecht-0001</Name>
                    <Version>2.1.0</Version>
                </Item>
                <Item>
                    <Id>771d8940-9024-4c8b-a103-9566f1ba845e</Id>
                    <Name>Station-Utrecht-0002</Name>
                    <Version>1.3.0</Version>
                </Item>
             </ListResponse>`;
export const ITEM_LIST_WITH_LABELS_RESPONSE = `
             <ListResponse xmlns="${SDS_NAMESPACE}">
                <Item>
                    <Id>9883eabb-2e3c-471c-9036-95045d01e3fc</Id>
                    <Name>Station-Utrecht-0001</Name>
                    <Version>2.1.0</Version>
                    <Label>Netherlands</Label>
                    <Label>Utrecht</Label>
                </Item>
                <Item>
                    <Id>771d8940-9024-4c8b-a103-9566f1ba845e</Id>
                    <Name>Station-Amsterdam-0001</Name>
                    <Version>1.3.0</Version>
                    <Label>Netherlands</Label>
                    <Label>Amsterdam</Label>
                </Item>
             </ListResponse>`;

export const VERSION_ENTRY_ELEMENT_NAME = 'HistoryItem';
export const BASIC_VERSIONS_LIST_RESPONSE = `
             <ListResponse xmlns="${SDS_NAMESPACE}">
                <HistoryItem>
                  <Id>3b572a56-51cc-479b-97fd-e404ebf9ae67</Id>
                  <Name>demo_station1</Name>
                  <Version>1.0.0</Version>
                  <Who>Mr Editor</Who>
                  <When>2021-11-22T03:47:00+01:00</When>
                  <What>SCL created, test configuration for station 0001</What>
                </HistoryItem>
                <HistoryItem>
                  <Id>3b572a56-51cc-479b-97fd-e404ebf9ae67</Id>
                  <Name>demo_station1</Name>
                  <Version>2.0.0</Version>
                  <Who>Mr Editor</Who>
                  <When>2021-11-22T03:47:16+01:00</When>
                  <What>SCL updated, Updated the Station with breakers</What>
                </HistoryItem>
                <HistoryItem>
                  <Id>3b572a56-51cc-479b-97fd-e404ebf9ae67</Id>
                  <Version>2.1.0</Version>
                  <Who>Mr Editor</Who>
                  <When>2021-11-22T03:47:18+01:00</When>
                  <What>SCL updated, Updated the Station with breakers</What>
                </HistoryItem>
             </ListResponse>`;

export function stubFetchResponseFunction(
  element: any,
  functionName: string,
  response: string | undefined,
  listElementName: string,
  callback: (result: Element[]) => any
): SinonStub<any[], void> {
  return sinon.stub(element, functionName).callsFake(() => {
    if (response) {
      const parser = new DOMParser();
      const document = parser.parseFromString(response, 'text/xml');
      callback(Array.from(document.querySelectorAll(listElementName) ?? []));
    } else {
      callback([]);
    }
  });
}
