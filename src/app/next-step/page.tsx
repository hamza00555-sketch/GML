'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

export default function NextStepPage() {
  const { content } = useContent()
  const { nextStep } = content

  const itemAccents = [
    { bg: 'rgba(65,211,126,0.1)', border: 'rgba(65,211,126,0.22)', dot: 'var(--brand-green)' },
    { bg: 'rgba(39,184,212,0.1)', border: 'rgba(39,184,212,0.22)', dot: 'var(--brand-cyan)' },
    { bg: 'rgba(14,94,142,0.16)', border: 'rgba(14,94,142,0.3)', dot: 'var(--brand-cyan)' },
    { bg: 'rgba(65,211,126,0.07)', border: 'rgba(65,211,126,0.15)', dot: 'var(--brand-green)' },
  ]

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 152, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>الخطوة القادمة</span>
          <h1 className="section-title" style={{ marginBottom: 20, marginTop: 12, maxWidth: 640 }}>
            {nextStep.title}
          </h1>
          <p className="section-subtitle">
            {nextStep.subtitle}
          </p>
        </div>
      </section>

      {/* ── Support items ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14, maxWidth: 900 }}>
            {nextStep.items.map((item, i) => {
              const accent = itemAccents[i % itemAccents.length]
              return (
                <div key={i} className="glass glass-lift" style={{ borderRadius: 22, padding: 32, borderColor: accent.border }}>
                  <div className="inner-visual">
                    {/* Number indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent.dot }} />
                      <span style={{ fontSize: 11, color: accent.dot, fontWeight: 800, letterSpacing: '0.08em' }}>
                        0{i + 1}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-main)', marginBottom: 10, lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Closing statement ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div className="glass" style={{
            borderRadius: 24,
            padding: '44px 44px',
            background: 'linear-gradient(135deg, rgba(65,211,126,0.06) 0%, rgba(14,94,142,0.1) 100%)',
            borderColor: 'rgba(65,211,126,0.18)',
            maxWidth: 680,
          }}>
            <div className="divider" style={{ marginBottom: 24 }} />
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 28 }}>
              GML مشروع في مرحلة بناء — كل دعم يساهم في تحويله من نموذج أولي إلى أداة إنتاج فعلية يستخدمها الفريق.
            </p>
            <Link href="/" className="btn-secondary" style={{ fontSize: 13 }}>
              العودة إلى الرئيسية
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
