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
          <svg width="36" height="25" viewBox="0 0 64 44" fill="none">
            <path fill="var(--brand-green)"
              d="M6 28 C4 24 4 19 8 17 C12 14 15 15 19 13 C23 11 27 7 33 5 C39 3 43 6 47 10 C49 11 51 10 53 8 C55 6 57 4 60 4 C62 4 64 6 63 9 C62 12 60 14 58 15 C55 16 52 18 50 20 L51 28 L8 28 Z"
            />
            <path fill="var(--brand-green)" d="M6 24 C2 22 1 26 3 29 C4 30 5 28 6 28 Z"/>
            <rect x="10" y="28" width="4" height="16" rx="2" fill="var(--brand-green)"/>
            <rect x="17" y="28" width="4" height="16" rx="2" fill="var(--brand-green)"/>
            <rect x="37" y="28" width="4" height="16" rx="2" fill="var(--brand-green)"/>
            <rect x="44" y="28" width="4" height="16" rx="2" fill="var(--brand-green)"/>
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
