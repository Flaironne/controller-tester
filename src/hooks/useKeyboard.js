import { useState, useEffect } from 'react';

const NO_SCROLL = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

export function useKeyboard() {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  useEffect(() => {
    const onDown = (e) => {
      if (NO_SCROLL.has(e.code)) e.preventDefault();
      setPressedKeys(prev => new Set([...prev, e.code]));
    };
    const onUp = (e) => {
      setPressedKeys(prev => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };
    const onBlur = () => setPressedKeys(new Set());

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return pressedKeys;
}
