import useCursorGlow from '../hooks/useCursorGlow';

export default function NoiseOverlay() {
  const glowRef = useCursorGlow();

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
    </>
  );
}
