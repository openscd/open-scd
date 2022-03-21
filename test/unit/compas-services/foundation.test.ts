import {expect} from "@open-wc/testing";

import {
  processErrorMessage,
} from "../../../src/compas-services/foundation.js";

const errorBody =
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 <compas-commons:ErrorResponse xmlns:compas-commons="https://www.lfenergy.org/compas/commons/v1">
   <compas-commons:ErrorMessage>
     <compas-commons:Code>CORE-8000</compas-commons:Code>
     <compas-commons:Message>Name is not a correct name to be used later as filename.</compas-commons:Message>
     <compas-commons:Property>create.request.name</compas-commons:Property>
   </compas-commons:ErrorMessage>
 </compas-commons:ErrorResponse>`;

describe('compas-services-foundation', () => {
  it('when there is no body in the response, the status text will be returned', async () => {
    const statusText = 'some status text';
    const response = new Response(null, <ResponseInit>{statusText: statusText});
    const result = await processErrorMessage(response);
    expect(result).to.be.equal(statusText);
  })
  it('when there is a body in the response, the message is retrieved from the body', async () => {
    const expectedMessage = 'Name is not a correct name to be used later as filename. (CORE-8000)'
    const statusText = 'some status text';
    const response = new Response(errorBody, <ResponseInit>{statusText: statusText});
    const result = await processErrorMessage(response);
    expect(result).to.be.equal(expectedMessage);

  })
});

