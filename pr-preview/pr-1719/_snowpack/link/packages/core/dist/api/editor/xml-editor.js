import { Subject } from './subject.js';
import { handleEditV2 } from '../../foundation.js';
export class XMLEditor {
    constructor() {
        this.past = [];
        this.future = [];
        this.commitSubject = new Subject();
        this.undoSubject = new Subject();
        this.redoSubject = new Subject();
    }
    get canUndo() {
        return this.past.length > 0;
    }
    get canRedo() {
        return this.future.length > 0;
    }
    reset() {
        this.past = [];
        this.future = [];
    }
    commit(change, { title, squash } = {}) {
        const commit = squash && this.past.length
            ? this.past[this.past.length - 1]
            : { undo: [], redo: [], time: Date.now() };
        // TODO: Fix type once issue is fixed https://github.com/openscd/oscd-api/issues/57
        const undo = handleEditV2(change);
        // typed as per https://github.com/microsoft/TypeScript/issues/49280#issuecomment-1144181818 recommendation:
        commit.undo.unshift(...[undo].flat(Infinity));
        commit.redo.push(...[change].flat(Infinity));
        if (title)
            commit.title = title;
        if (squash && this.past.length)
            this.past.pop();
        this.past.push(commit);
        this.future = [];
        this.commitSubject.next(commit);
        return commit;
    }
    ;
    undo() {
        const commit = this.past.pop();
        if (!commit)
            return;
        // TODO: Fix type once issue is fixed https://github.com/openscd/oscd-api/issues/57
        handleEditV2(commit.undo);
        this.future.unshift(commit);
        this.undoSubject.next(commit);
        return commit;
    }
    ;
    redo() {
        const commit = this.future.shift();
        if (!commit)
            return;
        // TODO: Fix type once issue is fixed https://github.com/openscd/oscd-api/issues/57
        handleEditV2(commit.redo);
        this.past.push(commit);
        this.redoSubject.next(commit);
        return commit;
    }
    ;
    subscribe(txCallback) {
        return this.commitSubject.subscribe(txCallback);
    }
    ;
    subscribeUndo(txCallback) {
        return this.undoSubject.subscribe(txCallback);
    }
    subscribeRedo(txCallback) {
        return this.redoSubject.subscribe(txCallback);
    }
    subscribeUndoRedo(txCallback) {
        const unsubscribeUndo = this.subscribeUndo(txCallback);
        const unsubscribeRedo = this.subscribeRedo(txCallback);
        return () => {
            unsubscribeUndo();
            unsubscribeRedo();
            return txCallback;
        };
    }
}
//# sourceMappingURL=xml-editor.js.map