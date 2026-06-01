'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function CapabilityCard({
  letter, title, desc, color, borderColor,
}: {
  letter: string; title: string; desc: string; color: string; borderColor: string
}) {
  const visual = letter === 'G' ? (
    /* Generate: stacked document pages with subtle float stagger */
    <svg width="96" height="80" viewBox="0 0 48 40" fill="none">
      <rect x="0" y="6" width="28" height="34" rx="5" fill="rgba(65,211,126,0.35)" stroke="rgba(65,211,126,0.72)" strokeWidth="1"
        style={{ animation: 'floatY 6s ease-in-out infinite', animationDelay: '-3.5s' }}/>
      <rect x="6" y="2" width="28" height="34" rx="5" fill="rgba(65,211,126,0.50)" stroke="rgba(65,211,126,0.82)" strokeWidth="1"
        style={{ animation: 'floatY 6s ease-in-out infinite', animationDelay: '-1.5s' }}/>
      <rect x="12" y="0" width="28" height="34" rx="5" fill="rgba(65,211,126,0.65)" stroke="rgba(65,211,126,0.90)" strokeWidth="1"
        style={{ animation: 'floatY 6s ease-in-out infinite', animationDelay: '0s' }}/>
      <line x1="16" y1="10" x2="36" y2="10" stroke="rgba(65,211,126,0.90)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="16" x2="30" y2="16" stroke="rgba(65,211,126,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="22" x2="34" y2="22" stroke="rgba(65,211,126,0.62)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) : letter === 'A' ? (
    /* Animate: timeline with animated playhead */
    <svg width="104" height="72" viewBox="0 0 52 36" fill="none">
      <rect x="2" y="14" width="48" height="3" rx="1.5" fill="rgba(65,211,126,0.50)"/>
      {[8,16,24,32,40].map((x,i) => <rect key={i} x={x} y="12" width="1.5" height="7" rx="0.75" fill="rgba(65,211,126,0.75)"/>)}
      <rect x="4" y="20" width="12" height="8" rx="3" fill="rgba(65,211,126,0.60)" stroke="rgba(65,211,126,0.85)" strokeWidth="1"/>
      <rect x="20" y="20" width="18" height="8" rx="3" fill="rgba(65,211,126,0.70)" stroke="rgba(65,211,126,0.90)" strokeWidth="1"/>
      <rect x="42" y="20" width="8" height="8" rx="3" fill="rgba(65,211,126,0.55)" stroke="rgba(65,211,126,0.80)" strokeWidth="1"/>
      {/* Animated playhead */}
      <g style={{ animation: 'playheadSlide 3.5s ease-in-out infinite' }}>
        <line x1="26" y1="6" x2="26" y2="30" stroke="rgba(65,211,126,0.97)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M23 6 L29 6 L26 10 Z" fill="rgba(65,211,126,0.97)"/>
      </g>
    </svg>
  ) : (
    /* Build: stacking blocks with staggered rise */
    <svg width="96" height="88" viewBox="0 0 48 44" fill="none">
      <rect x="8" y="30" width="32" height="12" rx="4" fill="rgba(65,211,126,0.68)" stroke="rgba(65,211,126,0.90)" strokeWidth="1.5"
        style={{ animation: 'blockRise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '0.6s' }}/>
      <rect x="4" y="18" width="26" height="12" rx="4" fill="rgba(65,211,126,0.55)" stroke="rgba(65,211,126,0.82)" strokeWidth="1.5"
        style={{ animation: 'blockRise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '0.85s' }}/>
      <rect x="10" y="6" width="20" height="12" rx="4" fill="rgba(65,211,126,0.45)" stroke="rgba(65,211,126,0.75)" strokeWidth="1.5"
        style={{ animation: 'blockRise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '1.1s' }}/>
      <rect x="16" y="0" width="14" height="8" rx="3" fill="rgba(65,211,126,0.30)" stroke="rgba(65,211,126,0.62)" strokeWidth="1.5" strokeDasharray="3 2"
        style={{ animation: 'blockRise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '1.35s' }}/>
    </svg>
  )

  return (
    <div className="glass-card" style={{ borderRadius: 22, padding: 32, borderColor }}>
      <div className="card-visual">
        <div style={{ marginBottom: 22, height: 104, display: 'flex', alignItems: 'center' }}>
          {visual}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 12, letterSpacing: '-0.02em' }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

export default function GabPage() {
  const { content } = useContent()
  const { gab } = content

  const cardsReveal = useScrollReveal(0.08)

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 152, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag hero-enter hero-enter-0" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <span className="dot-live" />
            قيد التطوير
          </span>

          <h1 className="hero-enter hero-enter-1" style={{
            fontSize: 'clamp(28px, 4.5vw, 56px)',
            fontWeight: 900,
            color: 'var(--text-main)',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: 24,
            marginTop: 16,
          }}>
            {gab.title}
          </h1>

          <p className="section-subtitle hero-enter hero-enter-2" style={{ marginBottom: 40 }}>
            {gab.subtitle}
          </p>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <div
            ref={cardsReveal.ref}
            className={`reveal-group${cardsReveal.visible ? ' is-visible' : ''}`}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, maxWidth: 960 }}
          >
            <div className="reveal-child">
              <CapabilityCard
                letter="G"
                title="Generate"
                desc={gab.generateDesc}
                color="var(--brand-green)"
                borderColor="rgba(65,211,126,0.2)"
              />
            </div>
            <div className="reveal-child">
              <CapabilityCard
                letter="A"
                title="Animate"
                desc={gab.animateDesc}
                color="var(--brand-green)"
                borderColor="rgba(65,211,126,0.2)"
              />
            </div>
            <div className="reveal-child">
              <CapabilityCard
                letter="B"
                title="Build"
                desc={gab.buildDesc}
                color="rgba(65,211,126,0.75)"
                borderColor="rgba(65,211,126,0.15)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Coming soon banner ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div className="glass-card" style={{
            borderRadius: 24, padding: '40px 40px',
            background: 'linear-gradient(135deg, rgba(32,32,168,0.14) 0%, rgba(0,0,78,0.4) 100%)',
            borderColor: 'rgba(32,32,168,0.35)',
            maxWidth: 680,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span className="dot-live" />
              <span style={{ fontSize: 12, color: 'var(--brand-green)', fontWeight: 700, letterSpacing: '0.06em' }}>
                فرصة مستقبلية
              </span>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85 }}>
              GAB هو الاتجاه القادم لـ GML — نموذج أولي قابل للاختبار بعد اعتماد المكتبة وإثبات قيمتها.
            </p>
          </div>
        </div>
      </section>

      {/* ── Safety line ── */}
      <section style={{ padding: '0 24px 32px' }}>
        <div className="container">
          <div className="glass-card" style={{
            borderRadius: 20,
            padding: '28px 32px',
            borderColor: 'rgba(65,211,126,0.18)',
            maxWidth: 760,
            background: 'linear-gradient(135deg, rgba(32,32,168,0.1) 0%, rgba(0,0,78,0.3) 100%)',
          }}>
            <div className="divider" style={{ marginBottom: 18 }} />
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.9, fontStyle: 'italic' }}>
              {(gab as typeof gab & { safetyLine?: string }).safetyLine ?? ''}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/roadmap" className="btn-primary">خارطة الطريق</Link>
          <Link href="/next-step" className="btn-secondary">الخطوة القادمة</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
