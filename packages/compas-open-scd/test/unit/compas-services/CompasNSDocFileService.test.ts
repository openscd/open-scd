import { expect } from '@open-wc/testing';

import { CompasNSDocFileService } from '../../../src/compas-services/CompasNSDocFileService.js';

describe('compas-nsdocfile-service', () => {
  it('Should list all NSDoc files', async () => {
    const res = await CompasNSDocFileService().listNsdocFiles();

    const nsDocFiles: Element[] = Array.from(res.querySelectorAll('NsdocFile'));

    expect(nsDocFiles.length).to.equal(4);
  });

  it('Should fail on invalid request', done => {
    const id = '315b02ac-c4aa-4495-9b4f-f7175a75c315';
    CompasNSDocFileService()
      .getNsdocFile(id)
      .then(() => done('Failed'))
      .catch(err => {
        expect(err.status).to.equal(404);
        expect(err.type).to.equal('NotFoundError');
        done();
      });
  });
  it('Should fail on invalid id', done => {
    const id = '1';

    CompasNSDocFileService()
      .getNsdocFile(id)
      .then(() => done('Failed'))
      .catch(err => {
        expect(err).to.equal(`Unable to find nsDoc file with id ${id}`);
        done();
      });
  });
});
