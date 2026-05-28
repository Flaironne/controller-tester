import { useState, useEffect, useRef } from 'react';

export function useGamepad() {
  const [gamepadState, setGamepadState] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const poll = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
      let found = null;

      for (const gp of gamepads) {
        if (gp && gp.connected) {
          found = {
            id: gp.id,
            buttons: Array.from(gp.buttons).map(b => ({ pressed: b.pressed, value: b.value })),
            axes: Array.from(gp.axes),
          };
          break;
        }
      }

      setGamepadState(found);
      rafRef.current = requestAnimationFrame(poll);
    };

    rafRef.current = requestAnimationFrame(poll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return gamepadState;
}
