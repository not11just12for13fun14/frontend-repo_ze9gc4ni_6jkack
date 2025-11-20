function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-8 text-slate-400 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p>Built for fun and reflection. Not medical advice.</p>
        <p className="opacity-70">© {new Date().getFullYear()} Death Clock Remake</p>
      </div>
    </footer>
  )
}

export default Footer
