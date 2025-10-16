export default function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-800/30">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-400/80">
        <div className="inline-flex items-center gap-3">
          <span className="text-slate-400">©</span>
          <span className="text-slate-300 font-medium">All rights reserved</span>
          <span className="text-slate-500">—</span>
          <a href="https://github.com/iamrishaby" className="text-slate-400 hover:underline">
            iamrishaby
          </a>
        </div>
      </div>
    </footer>
  )
}
