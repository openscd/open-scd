import {expect} from "@open-wc/testing";

import {isSCLNamespace, SCL_NAMESPACE} from "../../src/schemas.js";

describe('schema', () => {
  it('when element belongs to SCL Namespace, function should return true', () => {
    const doc = document.implementation.createDocument(SCL_NAMESPACE, null, null);
    const element = doc.createElementNS(SCL_NAMESPACE, "SCL");

    expect(isSCLNamespace(element)).to.be.true;
  });

  it('when element not belonging to SCL Namespace, function should return false', () => {
    const doc = document.implementation.createDocument(SCL_NAMESPACE, null, null);
    const element = doc.createElementNS("https://someother.namespace.com", "SCL");

    expect(isSCLNamespace(element)).to.be.false;
  });
});
