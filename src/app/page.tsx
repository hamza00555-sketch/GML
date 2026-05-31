'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

/* ── Geometric shape placeholders ─────────────────── */
function ShapeA() {
  return (
    <div style={{ width: 44, height: 44, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(135deg, rgba(39,184,212,0.25) 0%, rgba(14,94,142,0.1) 100%)', border: '1px solid rgba(39,184,212,0.2)' }} />
      <div style={{ position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, borderRadius: 6, background: 'rgba(39,184,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 2, height: 16, background: 'var(--brand-cyan)', borderRadius: 2, opacity: 0.7 }} />
      </div>
    </div>
  )
}

function ShapeB() {
  return (
    <div style={{ width: 44, height: 44, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(135deg, rgba(65,211,126,0.2) 0%, rgba(14,94,142,0.1) 100%)', border: '1px solid rgba(65,211,126,0.2)' }} />
      <div style={{ position: 'absolute', inset: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        {[0.9,0.4,0.6,0.7].map((o,i) => (
          <div key={i} style={{ borderRadius: 2, background: `rgba(65,211,126,${o * 0.5})` }} />
        ))}
      </div>
    </div>
  )
}

function ShapeC() {
  return (
    <div style={{ width: 44, height: 44, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(135deg, rgba(14,94,142,0.3) 0%, rgba(39,184,212,0.1) 100%)', border: '1px solid rgba(14,94,142,0.35)' }} />
      <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1.5px solid rgba(39,184,212,0.5)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 8, height: 8, borderRadius: '50%', background: 'rgba(39,184,212,0.6)' }} />
      </div>
    </div>
  )
}

const CARD_ICONS = [ShapeA, ShapeB, ShapeC, ShapeA, ShapeB]

export default function Home() {
  const { content } = useContent()
  const { home } = content

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ───────────────────────────────────────── */}
      <section style={{ paddingTop: 160, paddingBottom: 96, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 24 }}>
              <span className="label-tag">
                <span className="dot-live" />
                نسخة العرض التجريبية
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5.5vw, 62px)',
              fontWeight: 900,
              lineHeight: 1.15,
              color: 'var(--text-main)',
              marginBottom: 24,
              letterSpacing: '-0.025em',
            }}>
              {home.hero.title}
            </h1>

            <p style={{
              fontSize: 18,
              color: 'var(--text-muted)',
              lineHeight: 1.85,
              marginBottom: 40,
              maxWidth: 600,
            }}>
              {home.hero.subtitle}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/library" className="btn-primary">{home.hero.primaryCTA}</Link>
              <Link href="/experiment" className="btn-secondary">{home.hero.secondaryCTA}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Challenge ──────────────────────────────────── */}
      <section className="section-sm" style={{ paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>المشكلة</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>التحدي الحالي</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {home.challenges.map((card, i) => (
              <div key={i} className="glass glass-lift" style={{ borderRadius: 20, padding: 28 }}>
                <div className="inner-visual" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <span className="num-badge">0{i + 1}</span>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section divider ────────────────────────────── */}
      <div style={{ padding: '8px 24px 40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 1, height: 64, background: 'linear-gradient(180deg, var(--glass-border), transparent)' }} />
      </div>

      {/* ── Bento Nav Cards ────────────────────────────── */}
      <section style={{ paddingBottom: 96, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <h2 className="section-title" style={{ marginBottom: 12 }}>ما الذي ستجده هنا</h2>
            <p className="section-subtitle">
              خمسة أقسام تأخذك من فهم المشكلة إلى رؤية الحل الكامل.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {home.navCards.map((card, i) => {
              const Icon = CARD_ICONS[i] || ShapeA
              const isLast = i === home.navCards.length - 1
              const isSecondLast = i === home.navCards.length - 2
              return (
                <Link
                  key={i}
                  href={card.href}
                  className="glass glass-lift"
                  style={{
                    borderRadius: 22,
                    padding: '28px 28px 24px',
                    textDecoration: 'none',
                    display: 'block',
                    ...(isLast ? { gridColumn: '3 / 4' } : {}),
                    ...(isSecondLast ? { gridColumn: '1 / 3' } : {}),
                  }}
                >
                  <div className="inner-visual">
                    <Icon />
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', margin: '16px 0 8px', letterSpacing: '-0.02em' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                      {card.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--brand-cyan)', fontSize: 12, fontWeight: 600 }}>
                      <span>استكشف</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Closing ────────────────────────────────────── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div className="glass" style={{
            borderRadius: 24,
            padding: '48px 48px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(14,94,142,0.12) 0%, rgba(6,26,43,0.6) 100%)',
            borderColor: 'rgba(14,94,142,0.3)',
          }}>
            <div className="divider" style={{ margin: '0 auto 24px', width: 32 }} />
            <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 28px', fontWeight: 500 }}>
              {home.closingStatement}
            </p>
            <Link href="/roadmap" className="btn-secondary" style={{ fontSize: 13 }}>
              شاهد خارطة الطريق
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
