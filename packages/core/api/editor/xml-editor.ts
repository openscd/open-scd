import { Transactor, TransactedCallback, Commit, CommitOptions } from '@openscd/oscd-api/dist/Transactor.js';
import { EditV2 } from '@openscd/oscd-api/dist/editv2.js';

import { Subject } from './subject.js';
import { handleEditV2 } from '../../foundation.js';

export interface OscdCommit<C> extends Commit<C> {
  time: number;
}

export class XMLEditor implements Transactor<EditV2> {
  public past: OscdCommit<EditV2>[] = [];
  public future: OscdCommit<EditV2>[] = [];

  private commitSubject = new Subject<OscdCommit<EditV2>>();
  private undoSubject = new Subject<OscdCommit<EditV2>>();
  private redoSubject = new Subject<OscdCommit<EditV2>>();

  get canUndo(): boolean {
    return this.past.length > 0;
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  reset(): void {
    this.past = [];
    this.future = [];
  }

  commit(change: EditV2, { title, squash }: CommitOptions = {}): OscdCommit<EditV2> {
    const commit: OscdCommit<EditV2> =
      squash && this.past.length
        ? this.past[this.past.length - 1]
        : { undo: [], redo: [], time: Date.now() };
    // TODO: Fix type once issue is fixed https://github.com/openscd/oscd-api/issues/57
    const undo = handleEditV2(change as any);
    // typed as per https://github.com/microsoft/TypeScript/issues/49280#issuecomment-1144181818 recommendation:
    commit.undo.unshift(...[undo].flat(Infinity as 1));
    commit.redo.push(...[change].flat(Infinity as 1));
    if (title) commit.title = title;
    if (squash && this.past.length) this.past.pop();
    this.past.push(commit);
    this.future = [];
    this.commitSubject.next(commit);
    return commit;
  };

  undo(): OscdCommit<EditV2> | undefined {
    const commit = this.past.pop();
    if (!commit) return;
    // TODO: Fix type once issue is fixed https://github.com/openscd/oscd-api/issues/57
    handleEditV2(commit.undo as any);
    this.future.unshift(commit);
    this.undoSubject.next(commit);
    return commit;
  };

  redo(): OscdCommit<EditV2> | undefined {
    const commit = this.future.shift();
    if (!commit) return;
    // TODO: Fix type once issue is fixed https://github.com/openscd/oscd-api/issues/57
    handleEditV2(commit.redo as any);
    this.past.push(commit);
    this.redoSubject.next(commit);
    return commit;
  };

  subscribe(txCallback: TransactedCallback<EditV2>): () => TransactedCallback<EditV2> {
    return this.commitSubject.subscribe(txCallback) as () => TransactedCallback<EditV2>;
  };

  subscribeUndo(txCallback: TransactedCallback<EditV2>): () => TransactedCallback<EditV2> {
    return this.undoSubject.subscribe(txCallback) as () => TransactedCallback<EditV2>;
  }

  subscribeRedo(txCallback: TransactedCallback<EditV2>): () => TransactedCallback<EditV2> {
    return this.redoSubject.subscribe(txCallback) as () => TransactedCallback<EditV2>;
  }

  subscribeUndoRedo(txCallback: TransactedCallback<EditV2>): () => TransactedCallback<EditV2> {
    const unsubscribeUndo = this.subscribeUndo(txCallback);
    const unsubscribeRedo = this.subscribeRedo(txCallback);

    return () => {
      unsubscribeUndo();
      unsubscribeRedo();
      return txCallback;
    }
  }
}
