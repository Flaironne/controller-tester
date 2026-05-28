import React from 'react';
import { useKeyboard } from './hooks/useKeyboard';
import { useGamepad } from './hooks/useGamepad';
import Lobby from './components/Lobby';
import ControlsDisplay from './components/ControlsDisplay';

export default function App() {
  const pressedKeys = useKeyboard();
  const gamepadState = useGamepad();

  return (
    <div className="app">
      <Lobby pressedKeys={pressedKeys} gamepadState={gamepadState} />
      <ControlsDisplay pressedKeys={pressedKeys} gamepadState={gamepadState} />
    </div>
  );
}
