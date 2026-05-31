import Link from 'next/link'

function GMLLogoSmall() {
  return (
    <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#00D26A" />
      <path d="M8 24 L13 17 L17 20.5 L22 13 L28 9" stroke="#020C1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="9" r="2.5" fill="#020C1B" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <GMLLogoSmall />
            <span className="font-black text-lg text-white">جمل</span>
            <span className="text-[#00D26A] text-xs font-bold tracking-widest opacity-70">GML</span>
          </Link>

          <div className="flex items-center gap-6">
            {[
              { label: 'المكتبة', href: '/library' },
              { label: 'التجربة', href: '/experiment' },
              { label: 'خارطة الطريق', href: '/roadmap' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="text-white/25 text-sm">
            © 2025 جمل GML. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
