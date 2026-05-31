'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

/* ── Abstract hero visual ──────────────────────────── */
function HeroVisual() {
  return (
    <div
      className="glass inner-visual"
      style={{
        borderRadius: 24,
        height: '100%',
        minHeight: 300,
        position: 'relative',
        overflow: 'hidden',
        borderColor: 'rgba(65,211,126,0.18)',
        background: 'linear-gradient(145deg, rgba(32,32,168,0.14) 0%, rgba(0,0,78,0.35) 100%)',
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Blue radial glow — top right */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(32,32,168,0.55) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Green radial glow — bottom left */}
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(65,211,126,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Large outer ring */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 240, height: 240,
        border: '1px solid rgba(86,86,216,0.18)',
        borderRadius: '50%',
      }} />

      {/* Medium ring */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 156, height: 156,
        border: '1px solid rgba(65,211,126,0.22)',
        borderRadius: '50%',
      }} />

      {/* Inner ring */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 72, height: 72,
        border: '1px solid rgba(65,211,126,0.35)',
        borderRadius: '50%',
        background: 'rgba(65,211,126,0.04)',
      }} />

      {/* Center dot */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 12, height: 12, borderRadius: '50%',
        background: 'var(--brand-green)',
        opacity: 0.65,
        boxShadow: '0 0 24px rgba(65,211,126,0.45)',
      }} />

      {/* Horizontal axis line */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 5%, rgba(86,86,216,0.2) 40%, rgba(86,86,216,0.2) 60%, transparent 95%)',
      }} />

      {/* Vertical axis line */}
      <div style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(180deg, transparent 5%, rgba(65,211,126,0.12) 35%, rgba(65,211,126,0.12) 65%, transparent 95%)',
      }} />

      {/* Corner accents */}
      {[
        { top: 20, left: 20, c: 'rgba(86,86,216,0.55)' },
        { top: 20, right: 20, c: 'rgba(65,211,126,0.55)' },
        { bottom: 20, left: 20, c: 'rgba(65,211,126,0.3)' },
        { bottom: 20, right: 20, c: 'rgba(86,86,216,0.3)' },
      ].map((dot, i) => (
        <div key={i} style={{
          position: 'absolute', ...dot,
          width: 6, height: 6, borderRadius: '50%',
          background: dot.c,
        }} />
      ))}

      {/* Horizontal tick marks around the circle */}
      {[-90, 0, 90, 180].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const r = 78
        const cx = 50, cy = 50
        const x = cx + r * Math.cos(rad)
        const y = cy + r * Math.sin(rad)
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${x}%`, top: `${y}%`,
            transform: 'translate(-50%, -50%)',
            width: 6, height: 6, borderRadius: '50%',
            background: 'rgba(65,211,126,0.45)',
            border: '1px solid rgba(65,211,126,0.6)',
          }} />
        )
      })}

      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: 18, right: 0, left: 0,
        textAlign: 'center',
        fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
        color: 'rgba(244,251,255,0.2)',
        fontFamily: 'monospace',
        textTransform: 'uppercase',
      }}>
        GML — NEXT PHASE
      </div>
    </div>
  )
}

/* ── Support card ──────────────────────────────────── */
function SupportCard({
  num, title, desc,
  accentColor = 'var(--brand-green)',
}: {
  num: string; title: string; desc: string; accentColor?: string
}) {
  return (
    <div
      className="glass glass-lift"
      style={{ borderRadius: 24, padding: '36px 36px 32px', height: '100%' }}
    >
      <div className="inner-visual" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Number + accent bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
            color: accentColor,
            background: `${accentColor}14`,
            border: `1px solid ${accentColor}28`,
            borderRadius: 8, width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {num}
          </div>
          <div style={{
            flex: 1, height: 1,
            background: `linear-gradient(90deg, ${accentColor}30, transparent)`,
          }} />
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 18,
          fontWeight: 800,
          color: 'var(--text-main)',
          marginBottom: 14,
          lineHeight: 1.35,
          letterSpacing: '-0.02em',
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 14,
          color: 'var(--text-muted)',
          lineHeight: 1.85,
          flex: 1,
        }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

/* ── Main page ─────────────────────────────────────── */
export default function NextStepPage() {
  const { content } = useContent()
  const { nextStep } = content as typeof content & {
    nextStep: { closingText?: string }
  }

  const closingText =
    (nextStep as { closingText?: string }).closingText ??
    'GML ليست مجرد مكتبة ملفات، بل بداية نظام إنتاج بصري يمكن أن يخدم الفريق، يسرّع العمل، ويحافظ على جودة الهوية في كل مخرج.'

  const cardAccents = [
    'var(--brand-green)',
    'var(--brand-cyan)',
    'var(--brand-cyan)',
    'var(--brand-green)',
  ]

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{ paddingTop: 152, paddingBottom: 88, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: 40,
            alignItems: 'center',
          }}>
            {/* Text */}
            <div>
              <span className="label-tag" style={{ marginBottom: 24, display: 'inline-flex' }}>
                الخطوة القادمة
              </span>

              <h1 style={{
                fontSize: 'clamp(28px, 3.8vw, 50px)',
                fontWeight: 900,
                color: 'var(--text-main)',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                marginBottom: 24,
                marginTop: 8,
                maxWidth: 580,
              }}>
                {nextStep.title}
              </h1>

              <p style={{
                fontSize: 16,
                color: 'var(--text-muted)',
                lineHeight: 1.9,
                maxWidth: 520,
              }}>
                {nextStep.subtitle}
              </p>
            </div>

            {/* Abstract visual */}
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ── Bento cards ──────────────────────────────── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
            maxWidth: 900,
          }}>
            {nextStep.items.map((item, i) => (
              <SupportCard
                key={i}
                num={`0${i + 1}`}
                title={item.title}
                desc={item.desc}
                accentColor={cardAccents[i]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing statement ────────────────────────── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div className="container">
          <div
            className="glass"
            style={{
              borderRadius: 28,
              padding: '52px 56px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(65,211,126,0.05) 0%, rgba(32,32,168,0.1) 100%)',
              borderColor: 'rgba(65,211,126,0.2)',
              maxWidth: 820,
            }}
          >
            {/* Green accent line */}
            <div style={{
              width: 36, height: 2,
              background: 'linear-gradient(90deg, var(--brand-green), transparent)',
              borderRadius: 2,
              margin: '0 auto 28px',
            }} />

            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 20px)',
              color: 'var(--text-muted)',
              lineHeight: 1.95,
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}>
              {closingText}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ padding: '0 24px 104px' }}>
        <div className="container" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/library" className="btn-primary">
            العودة إلى المكتبة
          </Link>
          <Link href="/roadmap" className="btn-secondary">
            استعراض خارطة الطريق
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
