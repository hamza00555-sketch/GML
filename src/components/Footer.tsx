import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      padding: '40px 24px',
      background: 'rgba(6,26,43,0.6)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M3 13 L6 8 L9 10.5 L12 6 L15 3" stroke="#061A2B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
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
            style={{ fontSize: 11, color: 'rgba(39,184,212,0.5)', textDecoration: 'none', padding: '3px 8px', border: '1px solid rgba(39,184,212,0.15)', borderRadius: 5, transition: 'all 0.15s' }}
          >
            الإدارة
          </Link>
        </div>
      </div>
    </footer>
  )
}
