'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

function LibraryItemCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const colors = [
    'rgba(39,184,212,0.18)',
    'rgba(65,211,126,0.15)',
    'rgba(14,94,142,0.22)',
    'rgba(39,184,212,0.12)',
    'rgba(65,211,126,0.1)',
  ]
  const lineColors = ['var(--brand-cyan)', 'var(--brand-green)', 'rgba(39,184,212,0.7)', 'var(--brand-cyan)', 'var(--brand-green)']

  return (
    <div className="glass glass-lift" style={{ borderRadius: 22, padding: 28, height: '100%' }}>
      {/* Abstract visual */}
      <div className="inner-visual" style={{ marginBottom: 20 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: colors[index % colors.length],
          border: `1px solid ${lineColors[index % lineColors.length]}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end' }}>
            {[1, 0.6, 0.85, 0.4].slice(0, 3).map((o, i) => (
              <div key={i} style={{ height: 2, borderRadius: 2, background: lineColors[index % lineColors.length], opacity: o, width: `${[22, 14, 18][i]}px` }} />
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.01em' }}>
          {title}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

export default function LibraryPage() {
  const { content } = useContent()
  const { library } = content

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 152, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>المكتبة</span>
          <h1 className="section-title" style={{ marginBottom: 20, marginTop: 12, maxWidth: 680 }}>
            {library.title}
          </h1>
          <p className="section-subtitle" style={{ marginBottom: 40 }}>
            {library.subtitle}
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#items" className="btn-primary">استكشف العناصر</a>
            <a href="#how" className="btn-secondary">كيفية الاستخدام</a>
          </div>
        </div>
      </section>

      {/* ── Library Items ── */}
      <section id="items" style={{ padding: '16px 24px 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {library.items.map((item, i) => (
              <LibraryItemCard key={i} title={item.title} desc={item.desc} index={i} />
            ))}

            {/* Summary card */}
            <div className="glass" style={{
              borderRadius: 22, padding: 28,
              background: 'linear-gradient(135deg, rgba(65,211,126,0.08) 0%, rgba(14,94,142,0.12) 100%)',
              borderColor: 'rgba(65,211,126,0.2)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <p style={{ fontSize: 12, color: 'var(--brand-green)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                  نظرة عامة
                </p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                  مجموعة متكاملة من عناصر الموشن الجاهزة للاستخدام الفوري في مشاريع الفيديو.
                </p>
              </div>
              <div className="divider" style={{ marginTop: 24 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 56px' }}>
        <div style={{ width: 1, height: 56, background: 'linear-gradient(180deg, var(--glass-border), transparent)' }} />
      </div>

      {/* ── How it works ── */}
      <section id="how" style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>الاستخدام</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>كيفية الاستخدام</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, position: 'relative' }}>
            {library.howItWorks.map((step, i) => (
              <div key={i} className="glass glass-lift" style={{ borderRadius: 22, padding: 32 }}>
                <div className="inner-visual">
                  <div style={{
                    fontSize: 32, fontWeight: 900, color: 'var(--brand-cyan)', opacity: 0.18,
                    lineHeight: 1, marginBottom: 20, letterSpacing: '-0.04em',
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 10 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/experiment" className="btn-primary">شاهد التجربة الميدانية</Link>
            <Link href="/roadmap" className="btn-secondary">خارطة الطريق</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
