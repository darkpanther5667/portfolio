export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.04] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            &copy; {year} Portfolio
          </span>
          <span className="text-gray-700/50">/</span>
          <span className="text-xs text-gray-600">
            Built with Next.js + TailwindCSS
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#hero"
            className="text-xs text-gray-600 hover:text-gray-300 transition-colors"
          >
            Back to top
          </a>
          <span className="text-gray-700/30 text-xs">Minimal . Clean . Premium</span>
        </div>
      </div>
    </footer>
  );
}
