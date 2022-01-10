import { expect } from '@open-wc/testing';
import {getFixedCoordinateValue} from "../../../../../src/editors/singlelinediagram/wizards/foundation.js";

describe('Single Line Diagram Wizard foundation', () => {
  describe('defines a getFixedCoordinateValue function that', () => {
    it("when calling with value null, null will be returned", () => {
      expect(getFixedCoordinateValue(null)).to.be.null;
    });

    it("when calling with a positive number, number will be returned", () => {
      expect(getFixedCoordinateValue("2")).to.be.equal("2");
    });

    it("when calling with zero, zero will be returned", () => {
      expect(getFixedCoordinateValue("0")).to.be.equal("0");
    });

    it("when calling with a negative number, zero will be returned", () => {
      expect(getFixedCoordinateValue("-2")).to.be.equal("0");
    });

    it("when calling with a invalid number, zero will be returned", () => {
      expect(getFixedCoordinateValue("A2")).to.be.equal("0");
    });
  });
});
