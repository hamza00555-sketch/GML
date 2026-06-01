'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/* ── Challenge visuals ─────────────────────────────── */
function VisualSlowProduction() {
  return (
    <div style={{ margin: '-28px -28px 0 -28px', height: 240, borderRadius: '32px 32px 0 0', overflow: 'hidden', flexShrink: 0 }}>
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
    <div style={{ margin: '-28px -28px 0 -28px', height: 240, borderRadius: '32px 32px 0 0', overflow: 'hidden', flexShrink: 0 }}>
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
    <div style={{ margin: '-28px -28px 0 -28px', height: 240, borderRadius: '32px 32px 0 0', overflow: 'hidden', flexShrink: 0 }}>
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
    <div style={{ margin: '-32px -32px 0 -32px', height: 280, borderRadius: '32px 32px 0 0', overflow: 'hidden', flexShrink: 0 }}>
      <img
        src="/assets/gml/phase-2/mvp-library.png"
        alt="مكتبة GML — الإصدار التجريبي الأول"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}

function VisualExperiment() {
  return (
    <div style={{ margin: '-32px -32px 0 -32px', height: 220, borderRadius: '32px 32px 0 0', overflow: 'hidden', flexShrink: 0 }}>
      <img
        src="/assets/gml/phase-1/experiment-timelapse.png"
        alt="التجربة الميدانية — تسجيل شاشة التايم لابس"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}

function VisualRoadmap() {
  return (
    <div style={{ margin: '-28px -28px 0 -28px', height: 160, borderRadius: '32px 32px 0 0', overflow: 'hidden', flexShrink: 0 }}>
      <img
        src="/assets/gml/phase-1/roadmap-library.png"
        alt="خارطة الطريق — مراحل نمو المكتبة"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}

function VisualGAB() {
  return (
    <div style={{ margin: '-28px -28px 0 -28px', height: 160, borderRadius: '32px 32px 0 0', overflow: 'hidden', flexShrink: 0 }}>
      <img
        src="/assets/gml/phase-2/gab-future.png"
        alt="GAB — الذكاء الاصطناعي في إنتاج الموشن"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}

function VisualNextStep() {
  return (
    <div style={{ margin: '-28px -28px 0 -28px', height: 160, borderRadius: '32px 32px 0 0', overflow: 'hidden', flexShrink: 0 }}>
      <img
        src="/assets/gml/phase-2/next-step-prototype.png"
        alt="الخطوة القادمة — نماذج أولية وتطوير"
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
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

          <div className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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

          <div className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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

          <div className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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

            <Link href="/library" className="bento-large glass-card reveal-child" style={{ padding: 32, display: 'flex', flexDirection: 'column', textDecoration: 'none', overflow: 'hidden' }}>
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

            <Link href="/experiment" className="bento-medium glass-card reveal-child" style={{ padding: 32, display: 'flex', flexDirection: 'column', textDecoration: 'none', overflow: 'hidden' }}>
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

            <Link href="/roadmap" className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none', overflow: 'hidden' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
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

            <Link href="/gab" className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none', overflow: 'hidden' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
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

            <Link href="/next-step" className="bento-small glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none', overflow: 'hidden' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
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
