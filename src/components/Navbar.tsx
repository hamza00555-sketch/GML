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
    <svg width="36" height="30" viewBox="0 0 36 28" fill="none" style={{ flexShrink: 0 }}>
      {/* Camel body, neck, head, hump — single filled path */}
      <path
        fill="var(--brand-green)"
        d="M3 10 C2 8 3 5 5 4 C7 3 9 4 10 6 C11 8 13 9 15 8 C17 7 18 4 21 3 C23 2 25 4 26 7 C27 9 27 11 26 13 C26 14 25 15 24 15 L8 15 C6 15 4 14 3 12 Z"
      />
      {/* Front legs */}
      <rect x="7" y="15" width="3" height="10" rx="1.5" fill="var(--brand-green)"/>
      <rect x="12" y="15" width="3" height="10" rx="1.5" fill="var(--brand-green)"/>
      {/* Back legs */}
      <rect x="18" y="15" width="3" height="10" rx="1.5" fill="var(--brand-green)"/>
      <rect x="23" y="15" width="3" height="10" rx="1.5" fill="var(--brand-green)"/>
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
