'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/* ── Challenge visuals ─────────────────────────────── */
function VisualSlowProduction() {
  return (
    <div className="asset-wrap" style={{ height: 110 }}>
      <img
        src="/assets/gml/phase-1/challenge-slow.png"
        alt="الإنتاج البطيء — مشكلة في إنتاج الموشن"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

function VisualInconsistentQuality() {
  return (
    <div className="asset-wrap" style={{ height: 110 }}>
      <img
        src="/assets/gml/phase-1/challenge-quality.png"
        alt="عدم ثبات الجودة — مشكلة في اتساق المخرجات"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

function VisualRepetitiveWork() {
  return (
    <div className="asset-wrap" style={{ height: 110 }}>
      <img
        src="/assets/gml/phase-1/challenge-repetitive.png"
        alt="تكرار العمل — إعادة بناء العناصر في كل مشروع"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

/* ── driftA / driftB keyframes (injected once) ─────── */
const driftStyles = `
@keyframes driftA {
  0%, 100% { transform: translate(0, 0); }
  33%       { transform: translate(2px, -4px); }
  66%       { transform: translate(-2px, 2px); }
}
@keyframes driftB {
  0%, 100% { transform: translate(0, 0); }
  40%       { transform: translate(-3px, -2px); }
  70%       { transform: translate(3px, 3px); }
}
`

/* ── Nav card visuals ──────────────────────────────── */
function VisualLibrary() {
  return (
    <div className="asset-wrap" style={{ borderRadius: 12, marginBottom: 4, overflow: 'hidden' }}>
      <img
        src="/assets/gml/phase-2/mvp-library.png"
        alt="مكتبة GML — الإصدار التجريبي الأول"
        loading="lazy"
        style={{ width: '100%', display: 'block', objectFit: 'contain', maxHeight: 180 }}
      />
    </div>
  )
}

function VisualExperiment() {
  return (
    <div className="card-visual">
      <div style={{
        borderRadius: 14, background: 'rgba(0,0,35,0.65)',
        border: '1px solid rgba(86,86,216,0.32)',
        aspectRatio: '16/9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(86,86,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(86,86,216,0.04) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(65,211,126,0.16)', border: '1.5px solid rgba(65,211,126,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M3 2L12 8L3 14V2Z" fill="rgba(65,211,126,0.9)"/></svg>
        </div>
        <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.07)' }}>
          <div style={{ width: '38%', height: '100%', borderRadius: 2, background: 'rgba(65,211,126,0.75)' }} />
        </div>
        <div style={{ position: 'absolute', top: 8, left: 10, display: 'flex', gap: 4 }}>
          {['rgba(255,80,80,0.6)','rgba(255,180,0,0.5)','rgba(65,211,126,0.5)'].map((c,i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function VisualRoadmap() {
  return (
    <div className="card-visual" style={{ padding: '8px 0 4px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[1, 2, 3, 4].map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: step === 1 ? 'rgba(65,211,126,0.18)' : 'rgba(255,255,255,0.04)',
              border: `2px solid ${step === 1 ? 'rgba(65,211,126,0.75)' : 'rgba(86,86,216,0.22)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800,
              color: step === 1 ? 'rgba(65,211,126,1)' : 'rgba(244,251,255,0.22)',
              boxShadow: step === 1 ? '0 0 14px rgba(65,211,126,0.3)' : 'none',
              position: 'relative', zIndex: 1,
            }}>
              {step}
            </div>
            {i < 3 && (
              <div style={{ flex: 1, height: 2, background: step === 1 ? 'linear-gradient(90deg, rgba(65,211,126,0.55), rgba(86,86,216,0.15))' : 'rgba(86,86,216,0.12)' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function VisualGAB() {
  return (
    <div className="card-visual" style={{ position: 'relative', height: 68, overflow: 'hidden' }}>
      <svg width="100%" height="68" viewBox="0 0 120 68" preserveAspectRatio="xMidYMid slice" fill="none" style={{ position: 'absolute', inset: 0 }}>
        {Array.from({ length: 30 }, (_, i) => {
          const col = i % 6
          const row = Math.floor(i / 6)
          const cx = col * 20 + 10
          const cy = row * 14 + 10
          const lit = (col * 3 + row * 7) % 5 === 0
          const mid = (col * 2 + row * 5) % 7 === 0
          return (
            <circle key={i} cx={cx} cy={cy} r={lit ? 4 : mid ? 3 : 2}
              fill={lit ? 'rgba(65,211,126,0.6)' : mid ? 'rgba(86,86,216,0.45)' : 'rgba(86,86,216,0.18)'}
              opacity={lit ? 1 : 0.8}
            />
          )
        })}
        <line x1="10" y1="10" x2="70" y2="38" stroke="rgba(65,211,126,0.2)" strokeWidth="1"/>
        <line x1="70" y1="10" x2="110" y2="52" stroke="rgba(65,211,126,0.15)" strokeWidth="1"/>
      </svg>
      <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 12, letterSpacing: '0.18em', color: 'rgba(86,86,216,0.55)' }}>G·A·B</span>
      </div>
    </div>
  )
}

function VisualNextStep() {
  return (
    <div className="card-visual" style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="52" height="62" viewBox="0 0 52 62" fill="none">
        <rect x="4" y="4" width="44" height="54" rx="7" stroke="rgba(86,86,216,0.38)" strokeWidth="1.5" fill="rgba(32,32,168,0.14)"/>
        <rect x="8" y="8" width="36" height="46" rx="5" fill="rgba(65,211,126,0.07)" stroke="rgba(65,211,126,0.22)" strokeWidth="1"/>
        <circle cx="34" cy="31" r="3" fill="none" stroke="rgba(65,211,126,0.65)" strokeWidth="1.5"/>
        <path d="M18 31 H30 M26 26 L31 31 L26 36" stroke="rgba(65,211,126,0.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="hero-asset">
      <img
        src="/assets/gml/phase-1/hero-main.png"
        alt="لوحة تحكم مكتبة GML للموشن جرافيكس"
      />
    </div>
  )
}

/* ── Main ──────────────────────────────────────────── */
export default function Home() {
  const { content } = useContent()
  const { home } = content

  const challengeReveal = useScrollReveal(0.1)
  const navReveal = useScrollReveal(0.08)

  return (
    <main style={{ minHeight: '100vh' }}>
      <style>{driftStyles}</style>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ paddingTop: 128, paddingBottom: 80, position: 'relative' }}>
        <div style={{ width: 'min(1180px, calc(100% - 40px))', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48, alignItems: 'center' }}>
            {/* Text */}
            <div>
              <div className="hero-enter hero-enter-0" style={{ marginBottom: 20 }}>
                <span className="label-tag">
                  <span className="dot-live" />
                  نسخة العرض التجريبية
                </span>
              </div>

              <h1 className="section-title hero-enter hero-enter-1" style={{ maxWidth: 640, marginBottom: 20, marginTop: 8 }}>
                {home.hero.title}
              </h1>

              <p className="section-subtitle hero-enter hero-enter-2" style={{ maxWidth: 520, marginBottom: 40 }}>
                {home.hero.subtitle}
              </p>

              <div className="hero-enter hero-enter-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/library" className="btn-primary">{home.hero.primaryCTA}</Link>
                <Link href="/experiment" className="btn-secondary">{home.hero.secondaryCTA}</Link>
              </div>
            </div>

            {/* Visual panel */}
            <div className="hero-enter-visual">
              <HeroVisual />
            </div>
          </div>
        </div>
        <img
          src="/assets/gml/decorative/wave-green.png"
          alt=""
          aria-hidden="true"
          className="wave-decor"
          style={{ bottom: -20, left: '5%', width: '40%', maxWidth: 380 }}
        />
      </section>

      {/* ── Challenge bento ──────────────────────── */}
      <section
        ref={challengeReveal.ref}
        className={`reveal-group${challengeReveal.visible ? ' is-visible' : ''}`}
        style={{ paddingBottom: 80 }}
      >
        <div className="bento-grid">
          {/* Header */}
          <div className="bento-full" style={{ paddingBottom: 8 }}>
            <span className="label-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>المشكلة</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>التحدي الحالي</h2>
          </div>

          <div className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
            <VisualSlowProduction />
            <div style={{ marginTop: 20 }}>
              <div className="num-badge" style={{ marginBottom: 12 }}>01</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                {home.challenges[0].title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                {home.challenges[0].desc}
              </p>
            </div>
          </div>

          <div className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
            <VisualInconsistentQuality />
            <div style={{ marginTop: 20 }}>
              <div className="num-badge" style={{ marginBottom: 12 }}>02</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                {home.challenges[1].title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                {home.challenges[1].desc}
              </p>
            </div>
          </div>

          <div className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
            <VisualRepetitiveWork />
            <div style={{ marginTop: 20 }}>
              <div className="num-badge" style={{ marginBottom: 12 }}>03</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                {home.challenges[2].title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                {home.challenges[2].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Navigation bento ─────────────────────── */}
      <section
        ref={navReveal.ref}
        className={`reveal-group${navReveal.visible ? ' is-visible' : ''}`}
        style={{ paddingBottom: 80 }}
      >
        <div className="bento-grid">
          <div className="bento-full" style={{ paddingBottom: 8 }}>
            <h2 className="section-title">استكشف أقسام المشروع</h2>
          </div>

            <Link href="/library" className="bento-large glass-card reveal-child" style={{ padding: 32, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <VisualLibrary />
              </div>
              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', marginBottom: 10, letterSpacing: '-0.025em' }}>
                  {home.navCards[0].title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16 }}>
                  {home.navCards[0].desc}
                </p>
                <span style={{ fontSize: 13, color: 'var(--brand-cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  استكشف المكتبة
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </Link>

            <Link href="/experiment" className="bento-medium glass-card reveal-child" style={{ padding: 32, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <VisualExperiment />
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <img src="/assets/gml/icons/experiment.png" alt="" aria-hidden="true" className="nav-card-icon" />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', marginBottom: 10, letterSpacing: '-0.025em' }}>
                  {home.navCards[1].title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                  {home.navCards[1].desc}
                </p>
              </div>
            </Link>

            <Link href="/roadmap" className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <VisualRoadmap />
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <img src="/assets/gml/icons/roadmap.png" alt="" aria-hidden="true" className="nav-card-icon" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                  {home.navCards[2].title}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {home.navCards[2].desc}
                </p>
              </div>
            </Link>

            <Link href="/gab" className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <VisualGAB />
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <img src="/assets/gml/icons/gab-arrows.png" alt="" aria-hidden="true" className="nav-card-icon" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                  {home.navCards[3].title}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {home.navCards[3].desc}
                </p>
              </div>
            </Link>

            <Link href="/next-step" className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <VisualNextStep />
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <img src="/assets/gml/icons/next-step.png" alt="" aria-hidden="true" className="nav-card-icon" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                  {home.navCards[4].title}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {home.navCards[4].desc}
                </p>
              </div>
            </Link>

            <div className="bento-full glass-card reveal-child" style={{ padding: '48px 56px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(65,211,126,0.04) 0%, rgba(14,94,142,0.1) 100%)', borderColor: 'rgba(65,211,126,0.18)' }}>
              <div className="divider" style={{ margin: '0 auto 24px' }} />
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', color: 'var(--text-muted)', lineHeight: 1.9, maxWidth: 660, margin: '0 auto', fontWeight: 500 }}>
                {home.closingStatement}
              </p>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
