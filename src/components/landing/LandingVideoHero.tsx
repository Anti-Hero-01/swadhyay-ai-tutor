import React, { useEffect, useRef } from "react";

const LandingVideoHero: React.FC = () => {
  // Conservative navbar offset so the video sits fully below the fixed navbar
  const navbarOffset = 64; // px
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof (p as Promise<void>).catch === "function") {
        (p as Promise<void>).catch(() => {
          // If autoplay blocked, ensure muted then try again
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    };

    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <section aria-hidden="true" className="w-full overflow-hidden bg-background" style={{ paddingTop: `${navbarOffset}px` }}>
      <div className="w-full h-[75vh] max-h-[85vh] relative">
        <div className="w-full h-full rounded-2xl overflow-hidden glass-card shadow-elevated border border-border">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={encodeURI("/MC 8051 Transition.mp4")}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            id="landing-hero-video"
          />
        </div>

        {/* Subtle overlay to blend with theme */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none gradient-glow opacity-20" />
      </div>
    </section>
  );
};

export default LandingVideoHero;
