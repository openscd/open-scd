import { Transactor, TransactedCallback, Commit, CommitOptions } from '@openscd/oscd-api/dist/Transactor.js';
import { EditV2 } from '@openscd/oscd-api/dist/editv2.js';

import { handleEditV2 } from '../../foundation.js';


export class XMLEditor implements Transactor<EditV2> {
  public past: Commit<EditV2>[] = [];
  public future: Commit<EditV2>[] = [];

  private subscribers: TransactedCallback<EditV2>[] = [];

  commit(change: EditV2, { title, squash }: CommitOptions = {}): Commit<EditV2> {
    const commit: Commit<EditV2> =
      squash && this.past.length
        ? this.past[this.past.length - 1]
        : { undo: [], redo: [] };
    const undo = handleEditV2(change as any);
    // typed as per https://github.com/microsoft/TypeScript/issues/49280#issuecomment-1144181818 recommendation:
    commit.undo.unshift(...[undo].flat(Infinity as 1));
    commit.redo.push(...[change].flat(Infinity as 1));
    if (title) commit.title = title;
    if (squash && this.past.length) this.past.pop();
    this.past.push(commit);
    this.future = [];
    this.subscribers.forEach((subscriber) => subscriber(commit));
    return commit;
  };

  undo(): Commit<EditV2> | undefined {
    const commit = this.past.pop();
    if (!commit) return;
    handleEditV2(commit.undo as any);
    this.future.unshift(commit);
    return commit;
  };

  redo(): Commit<EditV2> | undefined {
    const commit = this.future.shift();
    if (!commit) return;
    handleEditV2(commit.redo as any);
    this.past.push(commit);
    return commit;
  };

  subscribe(txCallback: TransactedCallback<EditV2>): () => TransactedCallback<EditV2> {
    this.subscribers.push(txCallback);

    return () => {
      const indexToRemove = this.subscribers.findIndex(t => t === txCallback);

      if (indexToRemove > -1) {
        this.subscribers.splice(indexToRemove, 1);
      }

      return txCallback;
    };
  };
}
