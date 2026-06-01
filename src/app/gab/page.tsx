'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const GAB_IMAGES: Record<string, { src: string; alt: string }> = {
  G: { src: '/assets/gml/phase-2/gab-generate.png', alt: 'Generate — توليد المحتوى بأمر واحد' },
  A: { src: '/assets/gml/phase-2/gab-animate.png',  alt: 'Animate — تحريك العناصر تلقائياً' },
  B: { src: '/assets/gml/phase-2/gab-build.png',    alt: 'Build — بناء المشروع النهائي' },
}

function CapabilityCard({
  letter, title, desc, color, borderColor,
}: {
  letter: string; title: string; desc: string; color: string; borderColor: string
}) {
  return (
    <div className="glass-card gab-card" style={{ borderRadius: 22, padding: 32, borderColor, overflow: 'hidden' }}>
      <div className="card-visual">
        <div style={{ margin: '-32px -32px 0 -32px', height: 240, borderRadius: '22px 22px 0 0', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={GAB_IMAGES[letter]?.src ?? ''}
            alt={GAB_IMAGES[letter]?.alt ?? title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
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
      <section style={{ paddingTop: 152, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, position: 'relative' }}>
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
        <img
          src="/assets/gml/decorative/wave-green.png"
          alt=""
          aria-hidden="true"
          className="wave-decor"
          style={{ bottom: 0, right: '8%', width: '35%', maxWidth: 320 }}
        />
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

      {/* ── GAB workflow connector ── */}
      <section style={{ padding: '0 24px 48px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: 480, width: '100%' }}>
            <img
              src="/assets/gml/phase-2/gab-process.png"
              alt="مسار عمل GAB — توليد ثم تحريك ثم بناء"
              loading="lazy"
              style={{
                width: '100%',
                objectFit: 'contain',
                display: 'block',
                opacity: 0.9,
                animation: 'floatY 7s ease-in-out infinite',
              }}
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
