'use client';
import { useEffect, type RefObject } from 'react';

const NON_TEXT_INPUTS = ['radio', 'checkbox', 'button', 'submit'];

/** True while the learner is typing, so shortcuts never steal keystrokes. */
function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  if (target instanceof HTMLTextAreaElement) return true;
  if (target instanceof HTMLSelectElement) return true;
  return (
    target instanceof HTMLInputElement && !NON_TEXT_INPUTS.includes(target.type)
  );
}

/**
 * Duolingo-style keyboard flow for an exercise form:
 * 1–9 pick the matching answer, Enter checks or continues.
 */
export function useLessonHotkeys(form: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const node = form.current;
      if (
        !node ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isTyping(event.target)
      )
        return;
      if (/^[1-9]$/.test(event.key)) {
        const options = node.querySelectorAll<HTMLInputElement>(
          'input[type="radio"]:not(:disabled)',
        );
        const option = options[Number(event.key) - 1];
        if (!option) return;
        event.preventDefault();
        option.click();
        option.focus();
        return;
      }
      if (
        event.key === 'Enter' &&
        !(event.target instanceof HTMLButtonElement) &&
        !(event.target instanceof HTMLAnchorElement)
      ) {
        const submit = node.querySelector<HTMLButtonElement>(
          'button[type="submit"]:not(:disabled)',
        );
        if (!submit) return;
        event.preventDefault();
        submit.click();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [form]);
}
