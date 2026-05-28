import React from 'react';

// Standard US keyboard layout. null = small gap
const KEY_ROWS = [
  [
    { code: 'Escape', label: 'ESC', w: 1.2 },
    null,
    { code: 'F1', label: 'F1' }, { code: 'F2', label: 'F2' },
    { code: 'F3', label: 'F3' }, { code: 'F4', label: 'F4' },
    null,
    { code: 'F5', label: 'F5' }, { code: 'F6', label: 'F6' },
    { code: 'F7', label: 'F7' }, { code: 'F8', label: 'F8' },
    null,
    { code: 'F9', label: 'F9' }, { code: 'F10', label: 'F10' },
    { code: 'F11', label: 'F11' }, { code: 'F12', label: 'F12' },
  ],
  [
    { code: 'Backquote', label: '`' },
    { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' },
    { code: 'Digit3', label: '3' }, { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' }, { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' }, { code: 'Digit0', label: '0' },
    { code: 'Minus', label: '-' }, { code: 'Equal', label: '=' },
    { code: 'Backspace', label: '⌫', w: 2 },
  ],
  [
    { code: 'Tab', label: 'TAB', w: 1.5 },
    { code: 'KeyQ', label: 'Q' }, { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' }, { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' }, { code: 'KeyY', label: 'Y' },
    { code: 'KeyU', label: 'U' }, { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' }, { code: 'KeyP', label: 'P' },
    { code: 'BracketLeft', label: '[' }, { code: 'BracketRight', label: ']' },
    { code: 'Backslash', label: '\\', w: 1.5 },
  ],
  [
    { code: 'CapsLock', label: 'CAPS', w: 1.75 },
    { code: 'KeyA', label: 'A' }, { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' }, { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' }, { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' }, { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' }, { code: 'Semicolon', label: ';' },
    { code: 'Quote', label: "'" },
    { code: 'Enter', label: '↵', w: 2.25 },
  ],
  [
    { code: 'ShiftLeft', label: '⇧ SHIFT', w: 2.25 },
    { code: 'KeyZ', label: 'Z' }, { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' }, { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' }, { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' }, { code: 'Comma', label: ',' },
    { code: 'Period', label: '.' }, { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: '⇧ SHIFT', w: 2.75 },
  ],
  [
    { code: 'ControlLeft', label: 'CTRL', w: 1.5 },
    { code: 'MetaLeft', label: 'WIN', w: 1.25 },
    { code: 'AltLeft', label: 'ALT', w: 1.25 },
    { code: 'Space', label: 'SPACE', w: 6.5 },
    { code: 'AltRight', label: 'ALT', w: 1.25 },
    { code: 'MetaRight', label: 'WIN', w: 1.25 },
    { code: 'ContextMenu', label: '☰', w: 1.25 },
    { code: 'ControlRight', label: 'CTRL', w: 1.5 },
  ],
];

const ARROW_CLUSTER = [
  [null, { code: 'ArrowUp', label: '↑' }, null],
  [{ code: 'ArrowLeft', label: '←' }, { code: 'ArrowDown', label: '↓' }, { code: 'ArrowRight', label: '→' }],
];

// Xbox-style button layout
const GP_BUTTONS = {
  // [index, label, color-class]
  a:  [0,  'A',  'gp-a'],
  b:  [1,  'B',  'gp-b'],
  x:  [2,  'X',  'gp-x'],
  y:  [3,  'Y',  'gp-y'],
  lb: [4,  'LB', ''],
  rb: [5,  'RB', ''],
  lt: [6,  'LT', ''],
  rt: [7,  'RT', ''],
  sel:[8,  'SEL',''],
  sta:[9,  'STA',''],
  ls: [10, 'LS', ''],
  rs: [11, 'RS', ''],
  du: [12, '▲',  ''],
  dd: [13, '▼',  ''],
  dl: [14, '◄',  ''],
  dr: [15, '►',  ''],
  hm: [16, '⊙',  'gp-home'],
};

const KEY_UNIT = 36;
const KEY_H = 32;
const KEY_GAP = 3;

function Key({ code, label, w = 1, pressed }) {
  const width = Math.round(w * KEY_UNIT + (w - 1) * KEY_GAP);
  return (
    <div
      className={`key${pressed ? ' key-pressed' : ''}`}
      style={{ width, height: KEY_H, minWidth: width }}
      title={code}
    >
      {label}
    </div>
  );
}

function GapKey({ w = 0.5 }) {
  const width = Math.round(w * KEY_UNIT + (w - 1) * KEY_GAP);
  return <div style={{ width, height: KEY_H, minWidth: width, flexShrink: 0 }} />;
}

function GpBtn({ label, colorClass, pressed, w, h }) {
  return (
    <div
      className={`gp-btn ${colorClass ?? ''}${pressed ? ' gp-pressed' : ''}`}
      style={w ? { width: w, height: h ?? w } : {}}
    >
      {label}
    </div>
  );
}

function GamepadDisplay({ gp }) {
  const btn = (idx) => gp.buttons[idx]?.pressed ?? false;
  const ax = gp.axes;

  return (
    <div className="gamepad-layout">
      {/* Triggers row */}
      <div className="gp-triggers">
        <GpBtn label="LT" pressed={btn(6)} w={52} h={20} />
        <GpBtn label="RT" pressed={btn(7)} w={52} h={20} />
      </div>
      {/* Bumpers row */}
      <div className="gp-bumpers">
        <GpBtn label="LB" pressed={btn(4)} w={52} h={22} />
        <GpBtn label="RB" pressed={btn(5)} w={52} h={22} />
      </div>

      {/* Main body */}
      <div className="gp-body">
        {/* Left stick */}
        <div className="gp-stick-group">
          <div className="gp-stick">
            <div
              className="gp-stick-dot"
              style={{
                transform: `translate(${(ax[0] ?? 0) * 14}px, ${(ax[1] ?? 0) * 14}px)`,
              }}
            />
          </div>
          <div className="gp-stick-label">L {btn(10) ? '●' : '○'}</div>
        </div>

        {/* D-pad */}
        <div className="gp-dpad">
          <div className="gp-dpad-row">
            <div className="gp-dpad-gap" />
            <GpBtn label="▲" pressed={btn(12)} w={26} h={26} />
            <div className="gp-dpad-gap" />
          </div>
          <div className="gp-dpad-row">
            <GpBtn label="◄" pressed={btn(14)} w={26} h={26} />
            <div className="gp-dpad-center" />
            <GpBtn label="►" pressed={btn(15)} w={26} h={26} />
          </div>
          <div className="gp-dpad-row">
            <div className="gp-dpad-gap" />
            <GpBtn label="▼" pressed={btn(13)} w={26} h={26} />
            <div className="gp-dpad-gap" />
          </div>
        </div>

        {/* Center buttons */}
        <div className="gp-center">
          <GpBtn label="SEL" pressed={btn(8)} w={30} h={18} />
          <GpBtn label="⊙" colorClass="gp-home" pressed={btn(16)} w={28} h={28} />
          <GpBtn label="STA" pressed={btn(9)} w={30} h={18} />
        </div>

        {/* Right stick */}
        <div className="gp-stick-group">
          <div className="gp-stick">
            <div
              className="gp-stick-dot"
              style={{
                transform: `translate(${(ax[2] ?? 0) * 14}px, ${(ax[3] ?? 0) * 14}px)`,
              }}
            />
          </div>
          <div className="gp-stick-label">R {btn(11) ? '●' : '○'}</div>
        </div>

        {/* Face buttons */}
        <div className="gp-face">
          <div className="gp-face-row">
            <GpBtn label="Y" colorClass="gp-y" pressed={btn(3)} w={28} h={28} />
          </div>
          <div className="gp-face-row">
            <GpBtn label="X" colorClass="gp-x" pressed={btn(2)} w={28} h={28} />
            <GpBtn label="B" colorClass="gp-b" pressed={btn(1)} w={28} h={28} />
          </div>
          <div className="gp-face-row">
            <GpBtn label="A" colorClass="gp-a" pressed={btn(0)} w={28} h={28} />
          </div>
        </div>
      </div>

      <div className="gp-id">{gp.id.length > 48 ? gp.id.slice(0, 48) + '…' : gp.id}</div>
    </div>
  );
}

export default function ControlsDisplay({ pressedKeys, gamepadState }) {
  return (
    <div className="controls-display">
      {/* Keyboard */}
      <div className="keyboard-section">
        <div className="section-label">Keyboard</div>
        <div className="keyboard">
          {KEY_ROWS.map((row, ri) => (
            <div key={ri} className="key-row">
              {row.map((k, ki) =>
                k === null
                  ? <GapKey key={ki} />
                  : <Key key={ki} {...k} pressed={pressedKeys.has(k.code)} />
              )}
            </div>
          ))}
          {/* Arrow cluster */}
          <div className="arrow-cluster">
            {ARROW_CLUSTER.map((row, ri) => (
              <div key={ri} className="key-row">
                {row.map((k, ki) =>
                  k === null
                    ? <GapKey key={ki} />
                    : <Key key={ki} {...k} pressed={pressedKeys.has(k.code)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamepad */}
      <div className="gamepad-section">
        <div className="section-label">Gamepad</div>
        {gamepadState
          ? <GamepadDisplay gp={gamepadState} />
          : (
            <div className="no-gamepad">
              <div className="no-gamepad-icon">🎮</div>
              <div>No controller detected</div>
              <div className="no-gamepad-sub">Press any button on your gamepad</div>
            </div>
          )
        }
      </div>
    </div>
  );
}
