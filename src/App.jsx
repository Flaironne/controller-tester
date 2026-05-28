import { useEffect, useMemo, useState } from 'react'
import './App.css'

const CONTROLS = [
  {
    id: 'up',
    label: 'Move up',
    keyboardCodes: ['ArrowUp', 'KeyW'],
    keyboardLabel: '↑ / W',
  },
  {
    id: 'down',
    label: 'Move down',
    keyboardCodes: ['ArrowDown', 'KeyS'],
    keyboardLabel: '↓ / S',
  },
  {
    id: 'left',
    label: 'Move left',
    keyboardCodes: ['ArrowLeft', 'KeyA'],
    keyboardLabel: '← / A',
  },
  {
    id: 'right',
    label: 'Move right',
    keyboardCodes: ['ArrowRight', 'KeyD'],
    keyboardLabel: '→ / D',
  },
  {
    id: 'a',
    label: 'Action A',
    keyboardCodes: ['Space', 'Enter'],
    keyboardLabel: 'Space / Enter',
  },
  {
    id: 'b',
    label: 'Action B',
    keyboardCodes: ['ShiftLeft', 'ShiftRight'],
    keyboardLabel: 'Shift',
  },
  {
    id: 'start',
    label: 'Start',
    keyboardCodes: ['Escape'],
    keyboardLabel: 'Esc',
  },
]

const EMPTY_GAMEPAD_STATE = {
  up: false,
  down: false,
  left: false,
  right: false,
  a: false,
  b: false,
  start: false,
}

function App() {
  const [pressedKeys, setPressedKeys] = useState(() => new Set())
  const [gamepadState, setGamepadState] = useState(EMPTY_GAMEPAD_STATE)
  const [isGamepadConnected, setIsGamepadConnected] = useState(false)

  useEffect(() => {
    const onKeyDown = (event) => {
      setPressedKeys((previous) => {
        if (previous.has(event.code)) {
          return previous
        }

        const next = new Set(previous)
        next.add(event.code)
        return next
      })
    }

    const onKeyUp = (event) => {
      setPressedKeys((previous) => {
        if (!previous.has(event.code)) {
          return previous
        }

        const next = new Set(previous)
        next.delete(event.code)
        return next
      })
    }

    const onBlur = () => {
      setPressedKeys(new Set())
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  useEffect(() => {
    let frameId

    const pollGamepad = () => {
      const firstGamepad = navigator.getGamepads?.()[0]
      const connected = Boolean(firstGamepad)
      setIsGamepadConnected(connected)

      const nextGamepadState = connected
        ? {
            up:
              firstGamepad.axes[1] < -0.5 ||
              Boolean(firstGamepad.buttons[12]?.pressed),
            down:
              firstGamepad.axes[1] > 0.5 ||
              Boolean(firstGamepad.buttons[13]?.pressed),
            left:
              firstGamepad.axes[0] < -0.5 ||
              Boolean(firstGamepad.buttons[14]?.pressed),
            right:
              firstGamepad.axes[0] > 0.5 ||
              Boolean(firstGamepad.buttons[15]?.pressed),
            a: Boolean(firstGamepad.buttons[0]?.pressed),
            b: Boolean(firstGamepad.buttons[1]?.pressed),
            start: Boolean(firstGamepad.buttons[9]?.pressed),
          }
        : EMPTY_GAMEPAD_STATE

      setGamepadState((previous) => {
        const isIdentical = Object.keys(previous).every(
          (key) => previous[key] === nextGamepadState[key],
        )

        return isIdentical ? previous : nextGamepadState
      })

      frameId = window.requestAnimationFrame(pollGamepad)
    }

    frameId = window.requestAnimationFrame(pollGamepad)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  const controls = useMemo(
    () =>
      CONTROLS.map((control) => {
        const keyboardActive = control.keyboardCodes.some((code) =>
          pressedKeys.has(code),
        )

        return {
          ...control,
          active: keyboardActive || gamepadState[control.id],
        }
      }),
    [gamepadState, pressedKeys],
  )

  const directionX = Number(controls.find((control) => control.id === 'right')?.active) -
    Number(controls.find((control) => control.id === 'left')?.active)
  const directionY = Number(controls.find((control) => control.id === 'down')?.active) -
    Number(controls.find((control) => control.id === 'up')?.active)

  return (
    <main className="app">
      <section className="lobby">
        <h1>Controller tester lobby</h1>
        <p>
          Press keyboard keys or gamepad buttons to check if your controller is
          responding.
        </p>

        <div className="stage" aria-label="Character stage">
          <div
            className="character"
            style={{
              transform: `translate(${directionX * 14}px, ${directionY * 14}px)`,
            }}
            aria-hidden="true"
          >
            🕹️
          </div>
        </div>

        <p className={isGamepadConnected ? 'status status--connected' : 'status'}>
          {isGamepadConnected
            ? 'Gamepad detected'
            : 'No gamepad detected (keyboard still works)'}
        </p>
      </section>

      <section className="controls" aria-label="Control bindings">
        {controls.map((control) => (
          <article
            key={control.id}
            className={control.active ? 'control control--active' : 'control'}
          >
            <h2>{control.label}</h2>
            <p>Keyboard: {control.keyboardLabel}</p>
            <p>Gamepad: {control.id.toUpperCase()}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
