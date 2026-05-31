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

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: 'linear-gradient(135deg, var(--brand-green) 0%, rgba(65,211,126,0.6) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 13 L6 8 L9 10.5 L12 6 L15 3" stroke="#061A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="15" cy="3" r="2" fill="#061A2B" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontWeight: 900, fontSize: 17, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>جمل</span>
        <span style={{ fontWeight: 700, fontSize: 9, color: 'var(--brand-green)', letterSpacing: '0.12em', opacity: 0.8 }}>GML</span>
      </div>
    </div>
  )
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(0, 0, 57, 0.88)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      borderBottom: '1px solid var(--glass-border)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: '7px 14px',
                  borderRadius: 9,
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--text-main)' : 'var(--text-muted)',
                  background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  letterSpacing: '-0.01em',
                  position: 'relative',
                }}
              >
                {item.label}
                {active && (
                  <span style={{
                    position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)',
                    width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-green)',
                  }} />
                )}
              </Link>
            )
          })}
        </div>

        <Link href="/library" className="btn-primary" style={{ fontSize: 13, padding: '9px 20px' }}>
          استكشف المكتبة
        </Link>
      </div>
    </nav>
  )
}
