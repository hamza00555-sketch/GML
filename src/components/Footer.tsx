import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      padding: '40px 24px',
      background: 'rgba(0,0,50,0.7)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="22" viewBox="0 0 36 28" fill="none">
            <path
              fill="var(--brand-green)"
              d="M3 10 C2 8 3 5 5 4 C7 3 9 4 10 6 C11 8 13 9 15 8 C17 7 18 4 21 3 C23 2 25 4 26 7 C27 9 27 11 26 13 C26 14 25 15 24 15 L8 15 C6 15 4 14 3 12 Z"
            />
            <rect x="7" y="15" width="3" height="10" rx="1.5" fill="var(--brand-green)"/>
            <rect x="12" y="15" width="3" height="10" rx="1.5" fill="var(--brand-green)"/>
            <rect x="18" y="15" width="3" height="10" rx="1.5" fill="var(--brand-green)"/>
            <rect x="23" y="15" width="3" height="10" rx="1.5" fill="var(--brand-green)"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-main)' }}>جمل</span>
          <span style={{ fontWeight: 700, fontSize: 9, color: 'var(--brand-green)', letterSpacing: '0.1em', opacity: 0.7 }}>GML</span>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { label: 'المكتبة', href: '/library' },
            { label: 'التجربة', href: '/experiment' },
            { label: 'خارطة الطريق', href: '/roadmap' },
            { label: 'GAB', href: '/gab' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', padding: '5px 10px', borderRadius: 6, transition: 'color 0.15s' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'rgba(244,251,255,0.25)' }}>نسخة العرض التجريبية</span>
          <Link href="/admin"
            style={{ fontSize: 11, color: 'rgba(65,211,126,0.5)', textDecoration: 'none', padding: '3px 8px', border: '1px solid rgba(65,211,126,0.15)', borderRadius: 5, transition: 'all 0.15s' }}
          >
            الإدارة
          </Link>
        </div>
      </div>
    </footer>
  )
}
