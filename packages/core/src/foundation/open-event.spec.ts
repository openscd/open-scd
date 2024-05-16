import { OpenDetail, OpenEvent, newOpenEvent } from "./open-event";

const doc: XMLDocument = new DOMParser().parseFromString(
  `<Document></Document>`,
  "application/xml"
);

describe("open-event.ts", () => {
  const docName: string = "test.xml";

  describe("newOpenEvent", () => {
    it("Should have name `oscd-open`", () => {
      const res: OpenEvent = newOpenEvent(doc, docName);

      expect(res.type).toEqual("oscd-open");
    });

    it("Should be composed", () => {
      const res: OpenEvent = newOpenEvent(doc, docName);

      expect(res.composed).toBeTruthy();
    });

    it("Should be bubble-able", () => {
      const res: OpenEvent = newOpenEvent(doc, docName);

      expect(res.bubbles).toBeTruthy();
    });

    it("Should have Edit as Detail", () => {
      const res: OpenEvent = newOpenEvent(doc, docName);

      expect(res.detail).toEqual({
        docName: docName,
        doc: doc,
      });
    });
  });
});
