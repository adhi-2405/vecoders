import { useEffect, useRef } from 'react';

export default function useCursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || 'ontouchstart' in window) {
      if (glow) glow.style.display = 'none';
      return;
    }

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let animId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    document.addEventListener('mousemove', onMouseMove);

    function loop() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.transform = `translate3d(${cx - 175}px, ${cy - 175}px, 0)`;
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return glowRef;
}
