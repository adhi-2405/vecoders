import React from 'react';

/**
 * Renders individual letters with interactive glowing hover effects.
 * @param {string} text - Text to render
 * @param {string} colorClass - CSS color variant class:
 *   'glow-yellow' (About - Yellow/Gold)
 *   'glow-cyan'   (Events - Electric Cyan)
 *   'glow-purple' (Achievements - Neon Purple)
 *   'glow-emerald'(Blog - Neon Green)
 *   'glow-orange' (Timeline - Sunset Fire Orange)
 *   'glow-blue'   (Register - Cyber Ice Blue)
 *   'glow-crimson'(Admin - Crimson Flame)
 */
export function renderGlowLetters(text, colorClass = 'glow-yellow') {
  if (!text) return null;
  return text.split('').map((char, idx) => {
    if (char === ' ') {
      return ' ';
    }
    return (
      <span key={idx} className={`hover-glow-letter ${colorClass}`}>
        {char}
      </span>
    );
  });
}

export default function GlowText({ text, color = 'glow-yellow', as = 'span', className = '', style = {} }) {
  const Tag = as;
  return (
    <Tag className={`glow-text-container ${className}`} style={style}>
      {renderGlowLetters(text, color)}
    </Tag>
  );
}
