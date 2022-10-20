import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import CompasValidateSchema from '../../../src/validators/CompasValidateSchema.js';

describe('CompasValidateSchema', () => {
  if (customElements.get('compas-validate-schema') === undefined)
    customElements.define('compas-validate-schema', CompasValidateSchema);

  let element: CompasValidateSchema;
  let response: Document;
  let doc: Document;

  let issueEvent: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/validators/CompasValidation.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    issueEvent = spy();
    window.addEventListener('issue', issueEvent);

    element = await fixture(
      html`<compas-validate-schema .doc="${doc}"></compas-validate-schema>`
    );
  });

  describe('processValidationResponse', () => {
    const responseBody = `
      <svs:SclValidateResponse xmlns:svs="https://www.lfenergy.org/compas/SclValidatorService/v1">
        <svs:ValidationErrors>
          <svs:Message>Message 1</svs:Message>
          <svs:RuleName>Rule 1</svs:RuleName>
          <svs:LineNumber>1</svs:LineNumber>
          <svs:ColumnNumber>1</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 2</svs:Message>
          <svs:RuleName>Rule 2</svs:RuleName>
          <svs:LineNumber>2</svs:LineNumber>
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
      expect(issueEvent.args[0][0].detail.element).to.be.undefined;
      expect(issueEvent.args[0][0].detail.message).to.equal(
        'Rule: Rule 1, Line: 1, Column: 1'
      );

      expect(issueEvent.args[1][0].type).to.equal('issue');
      expect(issueEvent.args[1][0].detail.title).to.equal('Message 2');
      expect(issueEvent.args[0][0].detail.element).to.be.undefined;
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
          <svs:LineNumber>1</svs:LineNumber>
          <svs:ColumnNumber>2</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message></svs:Message>
          <svs:RuleName>Rule 2</svs:RuleName>
          <svs:LineNumber>1</svs:LineNumber>
          <svs:ColumnNumber>2</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:RuleName>Rule 3</svs:RuleName>
          <svs:LineNumber>1</svs:LineNumber>
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
          <svs:LineNumber></svs:LineNumber>
          <svs:ColumnNumber></svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 2</svs:Message>
          <svs:RuleName>Rule 2</svs:RuleName>
          <svs:LineNumber></svs:LineNumber>
          <svs:ColumnNumber></svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 3</svs:Message>
          <svs:RuleName></svs:RuleName>
          <svs:LineNumber>3</svs:LineNumber>
          <svs:ColumnNumber></svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 4</svs:Message>
          <svs:RuleName></svs:RuleName>
          <svs:LineNumber></svs:LineNumber>
          <svs:ColumnNumber>4</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 5</svs:Message>
          <svs:RuleName>Rule 5</svs:RuleName>
          <svs:LineNumber>5</svs:LineNumber>
          <svs:ColumnNumber>55</svs:ColumnNumber>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 6</svs:Message>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 7</svs:Message>
          <svs:RuleName>Rule 7</svs:RuleName>
          <svs:XPath>/SCL/Substation[1]</svs:XPath>
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

    it('when both rule name, line number and column number are missing then undefined returned', () => {
      const validationError = getValidationError('Message 1');

      const result = element['createMessage'](validationError);
      expect(result).to.be.undefined;
    });

    it('when only rule name is filled then Rule name string returned', () => {
      const validationError = getValidationError('Message 2');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Rule: Rule 2');
    });

    it('when only line number is filled then Line number string returned', () => {
      const validationError = getValidationError('Message 3');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Line: 3');
    });

    it('when only column number is filled then column number string returned', () => {
      const validationError = getValidationError('Message 4');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Column: 4');
    });

    it('when rule name, line number and column number are filled then full message returned', () => {
      const validationError = getValidationError('Message 5');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Rule: Rule 5, Line: 5, Column: 55');
    });

    it('when all elements are missing then undefined returned', () => {
      const validationError = getValidationError('Message 6');

      const result = element['createMessage'](validationError);
      expect(result).to.be.undefined;
    });

    it('when rule name and XPath are filled then full message returned', () => {
      const validationError = getValidationError('Message 7');

      const result = element['createMessage'](validationError);
      expect(result).to.be.equal('Rule: Rule 7, XPath: /SCL/Substation[1]');
    });
  });

  describe('getElement', () => {
    const responseBody = `
      <svs:SclValidateResponse xmlns:svs='https://www.lfenergy.org/compas/SclValidatorService/v1'>
        <svs:ValidationErrors>
          <svs:Message>Message 1</svs:Message>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 2</svs:Message>
          <svs:XPath>/SCL/Unknown</svs:XPath>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 3</svs:Message>
          <svs:XPath>/SCL/Substation[1]</svs:XPath>
        </svs:ValidationErrors>
        <svs:ValidationErrors>
          <svs:Message>Message 4</svs:Message>
          <svs:XPath>/SCL/Private[1]/compas:SclName[1]</svs:XPath>
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

    it('when no XPath value then undefined returned', () => {
      const validationError = getValidationError('Message 1');

      const result = element['getElement'](validationError);
      expect(result).to.be.undefined;
    });

    it('when XPath is invalid element then undefined returned', () => {
      const validationError = getValidationError('Message 2');

      const result = element['getElement'](validationError);
      expect(result).to.be.undefined;
    });

    it('when XPath is a valid SCL XPath then SCL Element returned', () => {
      const validationError = getValidationError('Message 3');

      const result = element['getElement'](validationError);
      expect(result).to.be.equal(doc.querySelector('SCL > Substation'));
    });

    it('when XPath is a valid CoMPAS XPath then CoMPAS Element returned', () => {
      const validationError = getValidationError('Message 4');

      const result = element['getElement'](validationError);
      expect(result).to.be.equal(doc.querySelector('SCL > Private > SclName'));
    });
  });

  describe('rewriteXPathForDefaultNamespace', () => {
    it('when passing in default namespace then prefix is added', () => {
      const result = element['rewriteXPathForDefaultNamespace']('/SCL/Substation[1]');
      expect(result).to.be.equal('/scl:SCL/scl:Substation[1]');
    });

    it('when passing in CoMPAS namespace then only CoMPAS prefix is preserved', () => {
      const result = element['rewriteXPathForDefaultNamespace']('/SCL/Private[1]/compas:SclName');
      expect(result).to.be.equal('/scl:SCL/scl:Private[1]/compas:SclName');
    });
  });
});
