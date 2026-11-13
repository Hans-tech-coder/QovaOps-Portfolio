"use client";

import { useEffect, useState } from "react";
import { heroStartDelay, prefersReducedMotion } from "./gsap";

const TYPE_MS = 90; // per character typed
const DELETE_MS = 45; // per character backspaced (quicker than typing)
const HOLD_MS = 1800; // full word stays before backspacing
const GAP_MS = 400; // empty pause before the next word
const AFTER_HERO_MS = 1400; // the opening word stays readable this long after the hero starts

/**
 * Types each word, holds it, backspaces it, then types the next, forever.
 * It opens on the last word in full (what no-JS and reduced-motion visitors keep,
 * e.g. "I'm Hans"); after the intro loader + hero (heroStartDelay()) it backspaces
 * that and types the first word, and so on.
 * No reserved width: the tag around it grows and shrinks with each character
 * (Hans's call), with the blinking caret (.qo-caret) right after the text.
 * Decorative: the caller gives screen readers the words once (sr-only).
 */
export function TypeCycler({
  words,
  caretClassName = "",
}: {
  words: readonly string[];
  caretClassName?: string;
}) {
  const [text, setText] = useState(words[words.length - 1] ?? "");

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;

    let timer: ReturnType<typeof setTimeout>;
    // Start on the word already shown, ready to backspace it.
    let word = words.length - 1;
    let chars = words[word].length;
    let deleting = true;

    const tick = () => {
      const current = words[word];
      if (!deleting) {
        chars += 1;
        setText(current.slice(0, chars));
        if (chars === current.length) {
          deleting = true;
          timer = setTimeout(tick, HOLD_MS);
          return;
        }
        timer = setTimeout(tick, TYPE_MS);
      } else {
        chars -= 1;
        setText(current.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          word = (word + 1) % words.length;
          timer = setTimeout(tick, GAP_MS);
          return;
        }
        timer = setTimeout(tick, DELETE_MS);
      }
    };

    timer = setTimeout(tick, heroStartDelay() * 1000 + AFTER_HERO_MS);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className="whitespace-pre">
      {text}
      <span className={`qo-caret ${caretClassName}`}>_</span>
    </span>
  );
}
