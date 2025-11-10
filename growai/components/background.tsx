// src/components/background.tsx 

export default function Background() { 

  return ( 

    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10"> 

      {/* Base gradient */} 

      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-emerald-50" /> 

 

      {/* Glow blobs */} 

      <div 

        className="absolute -top-40 left-1/2 h-[700px] w-[1400px] -translate-x-1/2 rounded-full blur-3xl opacity-40" 

        style={{ 

          background: 

            "radial-gradient(closest-side, rgba(16,185,129,0.25), transparent 70%)", 

        }} 

      /> 

      <div 

        className="absolute top-[35%] -left-40 h-[500px] w-[500px] rounded-full blur-3xl opacity-25" 

        style={{ 

          background: 

            "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)", 

        }} 

      /> 

      <div 

        className="absolute top-[45%] right-0 h-[500px] w-[700px] rounded-full blur-3xl opacity-25" 

        style={{ 

          background: 

            "radial-gradient(circle, rgba(16,185,129,0.18), transparent 70%)", 

        }} 

      /> 

 

      {/* Faint grid */} 

      <div 

        className="absolute inset-0" 

        style={{ 

          backgroundImage: 

            "linear-gradient(to right, rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.05) 1px, transparent 1px)", 

          backgroundSize: "32px 32px", 

          WebkitMaskImage: 

            "radial-gradient(ellipse at center, black, transparent 80%)", 

          maskImage: 

            "radial-gradient(ellipse at center, black, transparent 80%)", 

          opacity: 0.5, 

        }} 

      /> 

    </div> 

  ); 

} 

 

 