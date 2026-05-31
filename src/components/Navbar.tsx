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
    <img src="/logo-camel.png" alt="GML camel logo" width={40} height={40} style={{ flexShrink: 0, objectFit: 'contain' }} />
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
