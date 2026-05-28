import React, { useState, useEffect, useRef } from 'react';
import Character from './Character';

const GRAVITY = 0.6;
const JUMP_FORCE = -13;
const MOVE_SPEED = 4;
const CHAR_W = 44;
const GROUND_OFFSET = 72; // px from bottom of lobby to ground surface

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 65,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 3,
}));

const PLATFORMS = [
  { x: 15, y: 35, w: 14 },
  { x: 55, y: 45, w: 12 },
  { x: 75, y: 28, w: 10 },
];

export default function Lobby({ pressedKeys, gamepadState }) {
  const lobbyRef = useRef(null);
  const physRef = useRef({ x: 200, y: 0, velX: 0, velY: 0, onGround: true });
  const keysRef = useRef(pressedKeys);
  const gpRef = useRef(gamepadState);
  const rafRef = useRef(null);

  const [display, setDisplay] = useState({ x: 200, y: 0, facing: 'right', moving: false, jumping: false });

  useEffect(() => { keysRef.current = pressedKeys; }, [pressedKeys]);
  useEffect(() => { gpRef.current = gamepadState; }, [gamepadState]);

  useEffect(() => {
    const loop = () => {
      const keys = keysRef.current;
      const gp = gpRef.current;
      const p = physRef.current;
      const lobby = lobbyRef.current;
      if (!lobby) { rafRef.current = requestAnimationFrame(loop); return; }

      const lobbyW = lobby.offsetWidth;
      const lobbyH = lobby.offsetHeight;
      const groundY = lobbyH - GROUND_OFFSET; // y where ground is (from top)

      // Input
      let moveLeft = keys.has('KeyA') || keys.has('ArrowLeft');
      let moveRight = keys.has('KeyD') || keys.has('ArrowRight');
      let doJump = keys.has('Space') || keys.has('KeyW') || keys.has('ArrowUp');

      if (gp) {
        const ax = gp.axes[0] ?? 0;
        if (ax < -0.25) moveLeft = true;
        if (ax > 0.25) moveRight = true;
        // A button (0) or cross
        if (gp.buttons[0]?.pressed || gp.buttons[12]?.pressed) doJump = true;
      }

      let velX = 0;
      let velY = p.velY + GRAVITY;
      let facing = p.facing;

      if (moveLeft) { velX = -MOVE_SPEED; facing = 'left'; }
      if (moveRight) { velX = MOVE_SPEED; facing = 'right'; }
      if (moveLeft && moveRight) velX = 0;

      if (doJump && p.onGround) velY = JUMP_FORCE;

      let newX = p.x + velX;
      let newY = p.y + velY;
      let onGround = false;

      // Ground collision
      if (newY >= 0) {
        newY = 0;
        velY = 0;
        onGround = true;
      }

      // Platform collisions (newY is offset from ground, negative = above)
      for (const pl of PLATFORMS) {
        const plLeft = (pl.x / 100) * lobbyW;
        const plRight = plLeft + (pl.w / 100) * lobbyW;
        const plTopFromBottom = (pl.y / 100) * lobbyH;
        // plTopFromBottom is height above ground
        const plGroundOffset = plTopFromBottom - GROUND_OFFSET;
        // character's bottom is at (groundY + newY) from top = groundY + newY
        // platform top is at (lobbyH - GROUND_OFFSET - plTopFromBottom) from top
        const plTopFromTop = lobbyH - GROUND_OFFSET - plTopFromBottom;
        const charBottomFromTop = groundY + newY; // newY <= 0

        if (
          newX + CHAR_W > plLeft &&
          newX < plRight &&
          p.velY > 0 &&
          charBottomFromTop <= plTopFromTop + 4 &&
          charBottomFromTop >= plTopFromTop - 10
        ) {
          newY = plTopFromTop - groundY;
          velY = 0;
          onGround = true;
        }
      }

      // Clamp X to lobby bounds
      newX = Math.max(0, Math.min(lobbyW - CHAR_W, newX));

      physRef.current = { x: newX, y: newY, velX, velY, onGround, facing };

      setDisplay({
        x: newX,
        y: newY,
        facing,
        moving: velX !== 0,
        jumping: !onGround,
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const charBottomOffset = GROUND_OFFSET + (-display.y); // px from bottom

  return (
    <div className="lobby" ref={lobbyRef}>
      {/* Background stars */}
      {STARS.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Distant mountains */}
      <div className="mountains">
        <div className="mountain" style={{ left: '5%', width: '20%', height: '45%' }} />
        <div className="mountain" style={{ left: '20%', width: '15%', height: '35%' }} />
        <div className="mountain" style={{ left: '60%', width: '22%', height: '50%' }} />
        <div className="mountain" style={{ left: '75%', width: '18%', height: '38%' }} />
      </div>

      {/* Platforms */}
      {PLATFORMS.map((pl, i) => (
        <div
          key={i}
          className="platform"
          style={{
            left: `${pl.x}%`,
            width: `${pl.w}%`,
            bottom: `calc(${GROUND_OFFSET}px + ${pl.y / 100 * 100}%)`,
          }}
        />
      ))}

      {/* Ground */}
      <div className="ground" />

      {/* Character */}
      <div
        className="char-wrapper"
        style={{ left: display.x, bottom: charBottomOffset }}
      >
        <Character facing={display.facing} moving={display.moving} jumping={display.jumping} />
      </div>

      {/* HUD hint */}
      <div className="lobby-hint">
        WASD / Arrows to move &nbsp;·&nbsp; Space / W to jump
        {gamepadState ? ` · Controller: ${gamepadState.id.split('(')[0].trim()}` : ''}
      </div>
    </div>
  );
}
