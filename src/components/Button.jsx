export function Button({ children, variant = "primary", onClick, className = "", type = "button" }) {
  const baseStyle = "px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 transform hover:scale-105 flex items-center gap-2 backdrop-blur-md";
  const variants = {
    primary: "bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
    outline: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    accent: "bg-purple-600/30 border border-purple-500/50 text-white hover:bg-purple-600/50 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
