import { expect } from '@open-wc/testing';

import { Subject } from '../api/editor/subject.js';

describe('Subject', () => {
  let subject: Subject<string>;

  let subOneValues: string[];
  let subTwoValues: string[];

  beforeEach(() => {
    subject = new Subject<string>();

    subOneValues = [];
    subTwoValues = [];
  });

  it('should call subscribers on next', () => {
    const subscriberOne = (v: string) => subOneValues.push(v);
    const subscriberTwo = (v: string) => subTwoValues.push(v);

    subject.subscribe(subscriberOne);

    subject.next('first');

    expect(subOneValues).to.deep.equal([ 'first' ]);
    expect(subTwoValues).to.deep.equal([]);

    subject.subscribe(subscriberTwo);

    subject.next('second');

    expect(subOneValues).to.deep.equal([ 'first', 'second' ]);
    expect(subTwoValues).to.deep.equal([ 'second' ]);
  });

  it('should remove correct subscriber on unsubscribe', () => {
    const subscriberOne = (v: string) => subOneValues.push(v);
    const subscriberTwo = (v: string) => subTwoValues.push(v);

    const unsubscribeOne = subject.subscribe(subscriberOne);
    const unsubscribeTwo = subject.subscribe(subscriberTwo);

    subject.next('first');

    expect(subOneValues).to.deep.equal([ 'first' ]);
    expect(subTwoValues).to.deep.equal([ 'first' ]);

    unsubscribeOne();

    subject.next('second');

    expect(subOneValues).to.deep.equal([ 'first' ]);
    expect(subTwoValues).to.deep.equal([ 'first', 'second' ]);

    unsubscribeTwo();

    subject.next('third');

    expect(subOneValues).to.deep.equal([ 'first' ]);
    expect(subTwoValues).to.deep.equal([ 'first', 'second' ]);
  });
});
