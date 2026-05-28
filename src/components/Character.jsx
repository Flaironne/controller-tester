import React from 'react';

export default function Character({ facing, moving, jumping }) {
  const animClass = jumping ? 'char-jump' : moving ? 'char-walk' : 'char-idle';
  const flip = facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)';

  return (
    <div style={{ transform: flip, display: 'inline-block' }}>
    <div className={`character ${animClass}`}>
      <svg width="44" height="60" viewBox="0 0 44 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="22" cy="58" rx="12" ry="3" fill="rgba(0,0,0,0.3)" />

        {/* Left leg */}
        <rect x="14" y="40" width="7" height="16" rx="3.5" fill="#1a1a2e" className="leg-left" />
        {/* Right leg */}
        <rect x="23" y="40" width="7" height="16" rx="3.5" fill="#1a1a2e" className="leg-right" />

        {/* Left shoe */}
        <rect x="12" y="51" width="10" height="6" rx="3" fill="#e74c3c" />
        {/* Right shoe */}
        <rect x="22" y="51" width="10" height="6" rx="3" fill="#e74c3c" />

        {/* Body */}
        <rect x="12" y="22" width="20" height="20" rx="5" fill="#6c5ce7" />

        {/* Stripe on body */}
        <rect x="12" y="34" width="20" height="4" rx="1" fill="#a29bfe" />

        {/* Left arm */}
        <rect x="3" y="23" width="9" height="6" rx="3" fill="#fdcb6e" />
        {/* Right arm */}
        <rect x="32" y="23" width="9" height="6" rx="3" fill="#fdcb6e" />

        {/* Neck */}
        <rect x="19" y="17" width="6" height="6" rx="1" fill="#fdcb6e" />

        {/* Head */}
        <ellipse cx="22" cy="12" rx="12" ry="12" fill="#fdcb6e" />

        {/* Hair */}
        <path d="M10 10 Q11 2 22 2 Q33 2 34 10" fill="#2d3436" />
        <rect x="10" y="8" width="3" height="5" rx="1.5" fill="#2d3436" />

        {/* Left eye */}
        <ellipse cx="17" cy="11" rx="2.5" ry="3" fill="white" />
        <circle cx="17" cy="12" r="1.5" fill="#2d3436" />
        <circle cx="17.7" cy="11.3" r="0.6" fill="white" />

        {/* Right eye */}
        <ellipse cx="27" cy="11" rx="2.5" ry="3" fill="white" />
        <circle cx="27" cy="12" r="1.5" fill="#2d3436" />
        <circle cx="27.7" cy="11.3" r="0.6" fill="white" />

        {/* Mouth */}
        <path d="M18 17 Q22 20 26 17" stroke="#2d3436" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
    </div>
  );
}
