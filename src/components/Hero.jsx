import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-screen w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.25),transparent_35%)]" />
      <div className="absolute inset-0 opacity-90">
        <Spline scene="https://prod.spline.design/4TrRyLcIHhcItjnk/scene.splinecode" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-14 md:pb-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1 text-xs text-cyan-300 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> Live Simulation
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(56,189,248,0.25)]">
            The Death Clock — Predict your final countdown
          </h1>
          <p className="mt-4 md:mt-6 text-slate-300 text-lg md:text-xl leading-relaxed">
            Feed the hourglass with your details and reveal a data-driven estimate of your final day.
            This is for fun and reflection — not medical advice.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
