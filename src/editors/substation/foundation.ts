import { css } from 'lit-element';

import { newActionEvent } from '../../foundation.js';

export type EditorElement = Element & {
  container: Element;
  element: Element | null;
  parent: Element;
};

export function startMove<E extends EditorElement, P extends EditorElement>(
  editor: E,
  Child: new () => E,
  Parent: new () => P
): void {
  if (!editor.element) return;

  editor.container.classList.add('moving');

  const moveToTarget = (e: MouseEvent | KeyboardEvent) => {
    if (
      e instanceof KeyboardEvent &&
      e.key !== 'Escape' &&
      e.key !== ' ' &&
      e.key !== 'Enter'
    )
      return;

    e.preventDefault();
    e.stopImmediatePropagation();
    editor.container.classList.remove('moving');

    window.removeEventListener('keydown', moveToTarget, true);
    window.removeEventListener('click', moveToTarget, true);

    if (e instanceof KeyboardEvent && e.key === 'Escape') return;

    const targetEditor = e
      .composedPath()
      .find(e => e instanceof Child || e instanceof Parent);

    if (targetEditor === undefined || targetEditor === editor) return;

    const destination =
      targetEditor instanceof Child
        ? { parent: targetEditor.parent, reference: targetEditor.element }
        : { parent: (<P>targetEditor).element, reference: null };

    if (!destination.parent) return;

    if (
      editor.parent !== destination.parent ||
      editor.element!.nextElementSibling !== destination.reference
    )
      editor.dispatchEvent(
        newActionEvent({
          old: {
            element: editor.element!,
            parent: editor.parent,
            reference: editor.element!.nextElementSibling,
          },
          new: destination,
        })
      );
  };

  window.addEventListener('click', moveToTarget, true);
  window.addEventListener('keydown', moveToTarget, true);
}

export const styles = css`
  main,
  section {
    background-color: var(--mdc-theme-surface);
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
    margin: 8px 12px 16px;
    overflow: auto;
    opacity: 1;
  }

  main.moving,
  section.moving {
    opacity: 0.3;
  }

  main:focus,
  section:focus {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  main:focus-within,
  section:focus-within {
    outline: 2px solid var(--mdc-theme-primary);
  }

  h1,
  h2,
  h3 {
    color: var(--mdc-theme-on-surface);
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    line-height: 48px;
    padding-left: 0.3em;
  }

  main:focus-within > h1,
  section:focus-within > h2,
  section:focus-within > h3 {
    color: var(--mdc-theme-surface);
    background-color: var(--mdc-theme-primary);
  }

  h1 > nav,
  h2 > nav,
  h3 > nav,
  h1 > mwc-icon-button,
  h2 > mwc-icon-button,
  h3 > mwc-icon-button {
    float: right;
  }
`;
