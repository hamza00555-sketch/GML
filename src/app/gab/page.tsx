'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

function CapabilityCard({
  letter, title, desc, color, borderColor,
}: {
  letter: string; title: string; desc: string; color: string; borderColor: string
}) {
  const visual = letter === 'G' ? (
    /* Generate: document/asset creation */
    <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
      <rect x="0" y="6" width="28" height="34" rx="5" fill="rgba(65,211,126,0.08)" stroke="rgba(65,211,126,0.28)" strokeWidth="1"/>
      <rect x="6" y="2" width="28" height="34" rx="5" fill="rgba(65,211,126,0.12)" stroke="rgba(65,211,126,0.35)" strokeWidth="1"/>
      <rect x="12" y="0" width="28" height="34" rx="5" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.45)" strokeWidth="1"/>
      <line x1="16" y1="10" x2="36" y2="10" stroke="rgba(65,211,126,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="16" x2="30" y2="16" stroke="rgba(65,211,126,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="22" x2="34" y2="22" stroke="rgba(65,211,126,0.22)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) : letter === 'A' ? (
    /* Animate: timeline with playhead */
    <svg width="52" height="36" viewBox="0 0 52 36" fill="none">
      <rect x="2" y="14" width="48" height="3" rx="1.5" fill="rgba(65,211,126,0.15)"/>
      {[8,16,24,32,40].map((x,i) => <rect key={i} x={x} y="12" width="1.5" height="7" rx="0.75" fill="rgba(65,211,126,0.3)"/>)}
      {/* Segments */}
      <rect x="4" y="20" width="12" height="8" rx="3" fill="rgba(65,211,126,0.22)" stroke="rgba(65,211,126,0.4)" strokeWidth="1"/>
      <rect x="20" y="20" width="18" height="8" rx="3" fill="rgba(65,211,126,0.3)" stroke="rgba(65,211,126,0.5)" strokeWidth="1"/>
      <rect x="42" y="20" width="8" height="8" rx="3" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.35)" strokeWidth="1"/>
      {/* Playhead */}
      <line x1="26" y1="6" x2="26" y2="30" stroke="rgba(65,211,126,0.8)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M23 6 L29 6 L26 10 Z" fill="rgba(65,211,126,0.8)"/>
    </svg>
  ) : (
    /* Build: stacking blocks */
    <svg width="48" height="44" viewBox="0 0 48 44" fill="none">
      <rect x="8" y="30" width="32" height="12" rx="4" fill="rgba(65,211,126,0.25)" stroke="rgba(65,211,126,0.45)" strokeWidth="1.5"/>
      <rect x="4" y="18" width="26" height="12" rx="4" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.38)" strokeWidth="1.5"/>
      <rect x="10" y="6" width="20" height="12" rx="4" fill="rgba(65,211,126,0.12)" stroke="rgba(65,211,126,0.3)" strokeWidth="1.5"/>
      <rect x="16" y="0" width="14" height="8" rx="3" fill="rgba(65,211,126,0.08)" stroke="rgba(65,211,126,0.22)" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  )

  return (
    <div className="glass-card" style={{ borderRadius: 22, padding: 32, borderColor }}>
      <div className="card-visual">
        <div style={{ marginBottom: 22, height: 52, display: 'flex', alignItems: 'center' }}>
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

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 152, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <span className="dot-live" />
            قيد التطوير
          </span>

          <h1 style={{
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

          <p className="section-subtitle" style={{ marginBottom: 40 }}>
            {gab.subtitle}
          </p>

        </div>
      </section>

      {/* ── Capabilities ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, maxWidth: 960 }}>
            <CapabilityCard
              letter="G"
              title="Generate"
              desc={gab.generateDesc}
              color="var(--brand-green)"
              borderColor="rgba(65,211,126,0.2)"
            />
            <CapabilityCard
              letter="A"
              title="Animate"
              desc={gab.animateDesc}
              color="var(--brand-green)"
              borderColor="rgba(65,211,126,0.2)"
            />
            <CapabilityCard
              letter="B"
              title="Build"
              desc={gab.buildDesc}
              color="rgba(65,211,126,0.75)"
              borderColor="rgba(65,211,126,0.15)"
            />
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
