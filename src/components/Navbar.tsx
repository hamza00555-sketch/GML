'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المكتبة', href: '/library' },
  { label: 'التجربة', href: '/experiment' },
  { label: 'خارطة الطريق', href: '/roadmap' },
  { label: 'الصفحة القادمة', href: '/coming-soon', badge: true },
]

function GMLLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#00D26A" />
      <path d="M8 24 L13 17 L17 20.5 L22 13 L28 9" stroke="#020C1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="9" r="2.5" fill="#020C1B" />
      <path d="M11 27 C11 27 16 23 18 25 C20 27 21 24 24 22" stroke="#020C1B" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#020C1B]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <GMLLogo />
          <span className="font-black text-xl text-white tracking-tight">جمل</span>
          <span className="text-[#00D26A] text-xs font-bold tracking-widest opacity-70">GML</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/55 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="bg-[#00D26A] text-[#020C1B] text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    قريبًا
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-1 h-1 bg-[#00D26A] rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <Link
          href="/library"
          className="hidden md:inline-flex items-center gap-2 bg-[#00D26A] text-[#020C1B] font-bold px-5 py-2.5 rounded-xl hover:bg-[#00B85E] transition-all duration-200 text-sm"
        >
          ابدأ الآن
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10 7H4M7 4L4 7L7 10" stroke="#020C1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </nav>
  )
}
