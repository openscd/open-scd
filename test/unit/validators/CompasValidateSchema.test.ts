import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import CompasValidateSchema from '../../../src/validators/CompasValidateSchema.js';

describe('CompasValidateSchema', () => {
  if (customElements.get('compas-validate-schema') === undefined)
    customElements.define('compas-validate-schema', CompasValidateSchema);

  let element: CompasValidateSchema;
  let response: Document;

  let issueEvent: SinonSpy;

  beforeEach(async () => {
    issueEvent = spy();
    window.addEventListener('issue', issueEvent);

    element = await fixture(
      html`<compas-validate-schema></compas-validate-schema>`
    );
  });

  describe('processValidationResponse', () => {
    const responseBody = `
      <svs:SclValidateResponse xmlns:svs="https://www.lfenergy.org/compas/SclValidatorService/v1">
        <svs:ValidationErrors>
          <svs:Message>Message 1</svs:Message>
          <svs:RuleName>Rule 1</svs:RuleName>
          <svs:Linenumber>1</svs:Linenumber>
          <svs:ColumnNumber>1</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 2</svs:Message>
          <svs:RuleName>Rule 2</svs:RuleName>
          <svs:Linenumber>2</svs:Linenumber>
          <svs:ColumnNumber>2</svs:ColumnNumber>
        </svs:ValidationErrors>
      </svs:SclValidateResponse>
    `;

    beforeEach(async () => {
      response = new DOMParser().parseFromString(
        responseBody,
        'application/xml'
      );
    });

    it('when processing the response then expect an issue event for each Validation Error', () => {
      element['processValidationResponse'](response);

      expect(issueEvent).to.have.been.calledTwice;

      expect(issueEvent.args[0][0].type).to.equal('issue');
      expect(issueEvent.args[0][0].detail.title).to.equal('Message 1');
      expect(issueEvent.args[0][0].detail.message).to.equal(
        'Rule: Rule 1, Line: 1, Column: 1'
      );

      expect(issueEvent.args[1][0].type).to.equal('issue');
      expect(issueEvent.args[1][0].detail.title).to.equal('Message 2');
      expect(issueEvent.args[1][0].detail.message).to.equal(
        'Rule: Rule 2, Line: 2, Column: 2'
      );
    });
  });

  describe('createTitle', () => {
    const responseBody = `
      <svs:SclValidateResponse xmlns:svs="https://www.lfenergy.org/compas/SclValidatorService/v1">
        <svs:ValidationErrors>
          <svs:Message>Message 1</svs:Message>
          <svs:RuleName>Rule 1</svs:RuleName>
          <svs:Linenumber>1</svs:Linenumber>
          <svs:ColumnNumber>2</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message></svs:Message>
          <svs:RuleName>Rule 2</svs:RuleName>
          <svs:Linenumber>1</svs:Linenumber>
          <svs:ColumnNumber>2</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:RuleName>Rule 3</svs:RuleName>
          <svs:Linenumber>1</svs:Linenumber>
          <svs:ColumnNumber>2</svs:ColumnNumber>
        </svs:ValidationErrors>
      </svs:SclValidateResponse>
    `;

    beforeEach(async () => {
      response = new DOMParser().parseFromString(
        responseBody,
        'application/xml'
      );
    });

    function getValidationError(ruleName: string): Element {
      return Array.from(response.querySelectorAll('ValidationErrors')).filter(
        element => {
          return ruleName === element.querySelector('RuleName')?.textContent;
        }
      )[0];
    }

    it('when message exists in response then message returned as title', () => {
      const validationError = getValidationError('Rule 1');

      const result = element['createTitle'](validationError);
      expect(result).to.be.equal('Message 1');
    });

    it('when no message exists in response then default message returned as title', () => {
      const validationError = getValidationError('Rule 2');

      const result = element['createTitle'](validationError);
      expect(result).to.be.equal('No validation message');
    });

    it('when no message element exists in response then default message returned as title', () => {
      const validationError = getValidationError('Rule 3');

      const result = element['createTitle'](validationError);
      expect(result).to.be.equal('No validation message');
    });
  });

  describe('createMessage', () => {
    const responseBody = `
      <svs:SclValidateResponse xmlns:svs="https://www.lfenergy.org/compas/SclValidatorService/v1">
        <svs:ValidationErrors>
          <svs:Message>Message 1</svs:Message>
          <svs:RuleName></svs:RuleName>
          <svs:Linenumber></svs:Linenumber>
          <svs:ColumnNumber></svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 2</svs:Message>
          <svs:RuleName>Rule 2</svs:RuleName>
          <svs:Linenumber></svs:Linenumber>
          <svs:ColumnNumber></svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 3</svs:Message>
          <svs:RuleName></svs:RuleName>
          <svs:Linenumber>3</svs:Linenumber>
          <svs:ColumnNumber></svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 4</svs:Message>
          <svs:RuleName></svs:RuleName>
          <svs:Linenumber></svs:Linenumber>
          <svs:ColumnNumber>4</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 5</svs:Message>
          <svs:RuleName>Rule 5</svs:RuleName>
          <svs:Linenumber>5</svs:Linenumber>
          <svs:ColumnNumber>55</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 6</svs:Message>
        </svs:ValidationErrors>
      </svs:SclValidateResponse>
    `;

    beforeEach(async () => {
      response = new DOMParser().parseFromString(
        responseBody,
        'application/xml'
      );
    });

    function getValidationError(message: string): Element {
      return Array.from(response.querySelectorAll('ValidationErrors')).filter(
        element => {
          return message === element.querySelector('Message')?.textContent;
        }
      )[0];
    }

    it('when both rule name, linenumber and column number are missing then undefined returned', () => {
      const validationError = getValidationError('Message 1');

      const result = element['createMessage'](validationError);
      expect(result).to.be.undefined;
    });

    it('when only rule name is filled then Rule name string returned', () => {
      const validationError = getValidationError('Message 2');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Rule: Rule 2');
    });

    it('when only linenumber is filled then Linenumber string returned', () => {
      const validationError = getValidationError('Message 3');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Line: 3');
    });

    it('when only column number is filled then column number string returned', () => {
      const validationError = getValidationError('Message 4');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Column: 4');
    });

    it('when rule name, linenumber and column number are filled then full message returned', () => {
      const validationError = getValidationError('Message 5');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Rule: Rule 5, Line: 5, Column: 55');
    });

    it('when all elements are missing then undefined returned', () => {
      const validationError = getValidationError('Message 6');

      const result = element['createMessage'](validationError);
      expect(result).to.be.undefined;
    });
  });
});
