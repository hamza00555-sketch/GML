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
  return (
    <div className="glass glass-lift" style={{ borderRadius: 22, padding: 32, borderColor }}>
      <div className="inner-visual">
        {/* Letter badge */}
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: `${color}18`,
          border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 22,
        }}>
          <span style={{ fontSize: 22, fontWeight: 900, color, letterSpacing: '-0.03em', fontFamily: 'monospace' }}>
            {letter}
          </span>
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
            fontSize: 'clamp(56px, 9vw, 96px)',
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

          {/* G·A·B spelled out */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { letter: 'G', label: 'Generate', color: 'var(--brand-cyan)' },
              { letter: 'A', label: 'Animate', color: 'var(--brand-green)' },
              { letter: 'B', label: 'Build', color: 'var(--brand-cyan)' },
            ].map(item => (
              <div key={item.letter} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 900, fontSize: 15, color: item.color, fontFamily: 'monospace' }}>{item.letter}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.label}</span>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--glass-border)' }} />
              </div>
            ))}
          </div>
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
              color="var(--brand-cyan)"
              borderColor="rgba(39,184,212,0.2)"
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
              color="rgba(39,184,212,0.8)"
              borderColor="rgba(14,94,142,0.35)"
            />
          </div>
        </div>
      </section>

      {/* ── Coming soon banner ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div className="glass" style={{
            borderRadius: 24, padding: '40px 40px',
            background: 'linear-gradient(135deg, rgba(14,94,142,0.12) 0%, rgba(6,26,43,0.5) 100%)',
            borderColor: 'rgba(14,94,142,0.3)',
            maxWidth: 680,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span className="dot-live" />
              <span style={{ fontSize: 12, color: 'var(--brand-green)', fontWeight: 700, letterSpacing: '0.06em' }}>
                COMING SOON
              </span>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85 }}>
              GAB هو الرؤية القادمة لـ GML — نظام يقلّص المسافة بين الفكرة والمنتج البصري من ساعات إلى ثوانٍ.
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
