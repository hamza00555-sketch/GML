'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

const STATUS_CHIP: Record<string, string> = {
  current: 'chip-current',
  next: 'chip-next',
  future: 'chip-future',
  vision: 'chip-vision',
}

const STATUS_LABEL: Record<string, string> = {
  current: 'الآن',
  next: 'قادمًا',
  future: 'مستقبل قريب',
  vision: 'رؤية مستقبلية',
}

const STATUS_LINE: Record<string, string> = {
  current: 'var(--brand-green)',
  next: 'var(--brand-cyan)',
  future: 'rgba(255,255,255,0.15)',
  vision: 'rgba(14,94,142,0.5)',
}

export default function RoadmapPage() {
  const { content } = useContent()
  const { roadmap } = content

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 152, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>خارطة الطريق</span>
          <h1 className="section-title" style={{ marginBottom: 20, marginTop: 12 }}>
            {roadmap.title}
          </h1>
          <p className="section-subtitle">
            {roadmap.subtitle}
          </p>
        </div>
      </section>

      {/* ── Stages ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <div style={{ maxWidth: 820, position: 'relative' }}>
            {roadmap.stages.map((stage, i) => (
              <div key={i} style={{ display: 'flex', gap: 0, marginBottom: i < roadmap.stages.length - 1 ? 0 : 0 }}>
                {/* Left timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
                  {/* Node */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: stage.status === 'current' ? 'var(--brand-green-soft)' : 'rgba(255,255,255,0.05)',
                    border: `1.5px solid ${STATUS_LINE[stage.status]}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                    position: 'relative', zIndex: 1,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: STATUS_LINE[stage.status], letterSpacing: '-0.01em' }}>
                      {stage.num}
                    </span>
                    {stage.status === 'current' && (
                      <div style={{ position: 'absolute', inset: -4, borderRadius: 16, border: '1px solid rgba(65,211,126,0.2)', animation: 'none' }} />
                    )}
                  </div>
                  {/* Connector */}
                  {i < roadmap.stages.length - 1 && (
                    <div style={{ width: 1.5, flex: 1, minHeight: 28, background: `linear-gradient(180deg, ${STATUS_LINE[stage.status]}, rgba(255,255,255,0.04))`, margin: '6px 0' }} />
                  )}
                </div>

                {/* Card */}
                <div className="glass-card" style={{
                  flex: 1,
                  borderRadius: 20,
                  padding: 28,
                  marginRight: 16,
                  marginBottom: 14,
                  borderColor: stage.status === 'current' ? 'rgba(65,211,126,0.2)' : 'var(--glass-border)',
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                      {stage.title}
                    </h3>
                    <span className={`chip ${STATUS_CHIP[stage.status]}`}>
                      {STATUS_LABEL[stage.status]}
                    </span>
                    {stage.status === 'current' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginRight: 4 }}>
                        <span className="dot-live" />
                        <span style={{ fontSize: 11, color: 'var(--brand-green)', fontWeight: 600 }}>جارٍ التنفيذ</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, opacity: 0.7 }}>
                    {stage.subtitle}
                  </p>

                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18 }}>
                    {stage.desc}
                  </p>

                  {/* Features */}
                  {stage.features && stage.features.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {stage.features.map((f, j) => (
                        <span key={j} style={{
                          fontSize: 12, color: 'var(--text-muted)',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid var(--glass-border)',
                          padding: '4px 12px', borderRadius: 8,
                        }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div className="glass-card" style={{
            borderRadius: 24, padding: '48px 48px',
            background: 'linear-gradient(135deg, rgba(32,32,168,0.16) 0%, rgba(0,0,78,0.5) 100%)',
            borderColor: 'rgba(32,32,168,0.35)',
            maxWidth: 720,
          }}>
            <div className="divider" style={{ marginBottom: 24 }} />
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', marginBottom: 14 }}>
              الرؤية
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85 }}>
              GML يبدأ كمكتبة موشن، ثم يتوسع تدريجيًا إلى نظام إنتاج بصري يدعم الفريق في العمل بسرعة أعلى وجودة أكثر اتساقًا.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/gab" className="btn-primary">اكتشف GAB</Link>
          <Link href="/next-step" className="btn-secondary">الخطوة القادمة</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
