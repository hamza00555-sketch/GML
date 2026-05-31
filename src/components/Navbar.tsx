'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المكتبة', href: '/library' },
  { label: 'التجربة', href: '/experiment' },
  { label: 'خارطة الطريق', href: '/roadmap' },
  { label: 'GAB', href: '/gab' },
  { label: 'الخطوة القادمة', href: '/next-step' },
]

function LogoMark() {
  return (
    <svg width="48" height="33" viewBox="0 0 64 44" fill="none" style={{ flexShrink: 0 }}>
      {/* Body + hump + neck + head */}
      <path fill="var(--brand-green)"
        d="M6 28 C4 24 4 19 8 17 C12 14 15 15 19 13 C23 11 27 7 33 5 C39 3 43 6 47 10 C49 11 51 10 53 8 C55 6 57 4 60 4 C62 4 64 6 63 9 C62 12 60 14 58 15 C55 16 52 18 50 20 L51 28 L8 28 Z"
      />
      {/* Tail */}
      <path fill="var(--brand-green)" d="M6 24 C2 22 1 26 3 29 C4 30 5 28 6 28 Z"/>
      {/* Back legs */}
      <rect x="10" y="28" width="4" height="16" rx="2" fill="var(--brand-green)"/>
      <rect x="17" y="28" width="4" height="16" rx="2" fill="var(--brand-green)"/>
      {/* Front legs */}
      <rect x="37" y="28" width="4" height="16" rx="2" fill="var(--brand-green)"/>
      <rect x="44" y="28" width="4" height="16" rx="2" fill="var(--brand-green)"/>
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="top-bar">
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
        <LogoMark />
        <span style={{ fontWeight: 900, fontSize: 15, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>جمل</span>
        <span style={{ fontWeight: 700, fontSize: 9, color: 'var(--brand-green)', letterSpacing: '0.14em', opacity: 0.8 }}>GML</span>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`top-bar-link${pathname === item.href ? ' active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <Link href="/library" className="btn-primary" style={{ fontSize: 12, padding: '7px 18px', borderRadius: 999 }}>
        استكشف
      </Link>
    </header>
  )
}
