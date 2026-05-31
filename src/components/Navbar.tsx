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
    <div style={{
      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
      background: 'linear-gradient(135deg, var(--brand-green) 0%, rgba(65,211,126,0.7) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 11.5L5 7.5L8 9.5L11 5.5L14 3" stroke="var(--bg-900)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="3" r="1.5" fill="var(--bg-900)"/>
      </svg>
    </div>
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
