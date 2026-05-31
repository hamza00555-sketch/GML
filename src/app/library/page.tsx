'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

function LibraryItemCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const visuals = [
    /* 0 خلفيات - layered panels */
    <svg key={0} width="44" height="36" viewBox="0 0 44 36" fill="none">
      <rect x="0" y="8" width="34" height="24" rx="5" fill="rgba(86,86,216,0.12)" stroke="rgba(86,86,216,0.28)" strokeWidth="1"/>
      <rect x="4" y="4" width="34" height="24" rx="5" fill="rgba(86,86,216,0.18)" stroke="rgba(86,86,216,0.36)" strokeWidth="1"/>
      <rect x="8" y="0" width="34" height="24" rx="5" fill="rgba(86,86,216,0.24)" stroke="rgba(86,86,216,0.45)" strokeWidth="1"/>
      <circle cx="16" cy="8" r="3" fill="rgba(86,86,216,0.45)"/>
      <path d="M8 20 L14 13 L19 17 L25 11 L40 18" stroke="rgba(86,86,216,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    /* 1 انتقالات - arrow between panels */
    <svg key={1} width="52" height="32" viewBox="0 0 52 32" fill="none">
      <rect x="0" y="2" width="20" height="28" rx="4" fill="rgba(65,211,126,0.1)" stroke="rgba(65,211,126,0.3)" strokeWidth="1"/>
      <line x1="3" y1="10" x2="17" y2="10" stroke="rgba(65,211,126,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="16" x2="17" y2="16" stroke="rgba(65,211,126,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="22" x2="12" y2="22" stroke="rgba(65,211,126,0.18)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M23 16 H29 M26 12 L30 16 L26 20" stroke="rgba(65,211,126,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="32" y="2" width="20" height="28" rx="4" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.42)" strokeWidth="1"/>
    </svg>,
    /* 2 عدادات - circular progress */
    <svg key={2} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="18" stroke="rgba(86,86,216,0.2)" strokeWidth="3.5"/>
      <path d="M22 4 A18 18 0 0 1 40 22 A18 18 0 0 1 30 37.6" stroke="rgba(65,211,126,0.72)" strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="22" cy="22" r="5" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.45)" strokeWidth="1.5"/>
    </svg>,
    /* 3 نصوص - T in editable frame */
    <svg key={3} width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="2" y="2" width="40" height="40" rx="6" fill="rgba(86,86,216,0.1)" stroke="rgba(86,86,216,0.38)" strokeWidth="1.5" strokeDasharray="4 3"/>
      <text x="22" y="30" textAnchor="middle" fill="rgba(86,86,216,0.9)" fontSize="26" fontWeight="900" fontFamily="Georgia,serif">T</text>
      <line x1="8" y1="36" x2="36" y2="36" stroke="rgba(65,211,126,0.4)" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>,
    /* 4 رسوم متحركة - starburst */
    <svg key={4} width="44" height="44" viewBox="0 0 44 44" fill="none">
      {[0,45,90,135,22,67,112,157].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const inner = i < 4 ? 8 : 10
        const outer = i < 4 ? 18 : 14
        return <line key={i} x1={22 + inner * Math.cos(rad)} y1={22 + inner * Math.sin(rad)} x2={22 + outer * Math.cos(rad)} y2={22 + outer * Math.sin(rad)} stroke={i < 4 ? 'rgba(65,211,126,0.6)' : 'rgba(86,86,216,0.4)'} strokeWidth={i < 4 ? 2 : 1.5} strokeLinecap="round"/>
      })}
      <circle cx="22" cy="22" r="7" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.6)" strokeWidth="1.5"/>
      <path d="M32 12 C36 16 36 24 32 28" stroke="rgba(65,211,126,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
    </svg>,
  ]

  const visual = visuals[index % visuals.length]

  return (
    <div className="glass-card" style={{ borderRadius: 22, padding: 28, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-visual" style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 20, height: 52, display: 'flex', alignItems: 'center' }}>
          {visual}
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
            <div className="glass-card" style={{
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
            {library.howItWorks.map((step, i) => {
              const stepIcons = [
                <svg key={0} width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="2" width="18" height="18" rx="5" stroke="rgba(86,86,216,0.45)" strokeWidth="1.5"/>
                  <path d="M11 6 L11 13 M8 11 L11 14 L14 11" stroke="rgba(86,86,216,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key={1} width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9" stroke="rgba(65,211,126,0.45)" strokeWidth="1.5"/>
                  <circle cx="11" cy="11" r="3.5" fill="rgba(65,211,126,0.2)" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"/>
                  <line x1="11" y1="2" x2="11" y2="20" stroke="rgba(65,211,126,0.15)" strokeWidth="1" strokeDasharray="2 2"/>
                  <line x1="2" y1="11" x2="20" y2="11" stroke="rgba(65,211,126,0.15)" strokeWidth="1" strokeDasharray="2 2"/>
                </svg>,
                <svg key={2} width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9" stroke="rgba(65,211,126,0.45)" strokeWidth="1.5"/>
                  <path d="M7 11 L9.5 13.5 L15 8" stroke="rgba(65,211,126,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
              ]
              return (
                <div key={i} className="glass-card" style={{ borderRadius: 22, padding: 32 }}>
                  <div className="card-visual">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                      {stepIcons[i] ?? stepIcons[0]}
                      <div style={{
                        fontSize: 28, fontWeight: 900, color: 'var(--brand-cyan)', opacity: 0.4,
                        lineHeight: 1, letterSpacing: '-0.04em',
                      }}>
                        {step.num}
                      </div>
                      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(86,86,216,0.18), transparent)' }} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 10 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
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
