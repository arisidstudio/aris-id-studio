export function CreativeBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none bg-black z-0">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob-bounce {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes blob-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="absolute inset-0 opacity-[0.15] z-20 mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

      <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]"></div>

      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/40 blur-[100px] animate-[blob-bounce_20s_infinite_ease-in-out] mix-blend-screen"></div>
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] rounded-full bg-indigo-500/30 blur-[80px] animate-[blob-bounce_25s_infinite_reverse_ease-in-out] mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[100px] animate-[blob-pulse_15s_infinite_ease-in-out] mix-blend-screen"></div>
    </div>
  );
}
