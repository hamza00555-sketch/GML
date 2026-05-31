'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

/* ── Challenge visuals ─────────────────────────────── */
function VisualSlowProduction() {
  return (
    <div className="card-visual" style={{ paddingBottom: 4 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[78, 48, 22].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: `rgba(32,32,168,${0.25 + i * 0.1})`, flexShrink: 0 }} />
            <div style={{ flex: 1, height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ height: '100%', width: `${w}%`, borderRadius: 4, background: `rgba(32,32,168,${0.18 + i * 0.06})` }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {[1, 1, 0, 0, 0].map((active, i) => (
          <div key={i} style={{ flex: 1, height: 24, borderRadius: 6, background: active ? 'rgba(32,32,168,0.18)' : 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,${active ? 0.1 : 0.04})` }} />
        ))}
      </div>
    </div>
  )
}

function VisualInconsistentQuality() {
  const heights = [55, 85, 32, 70, 44, 90, 50]
  return (
    <div className="card-visual" style={{ display: 'flex', alignItems: 'flex-end', gap: 7, paddingBottom: 2 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ flex: 1, borderRadius: '5px 5px 0 0', height: `${h * 0.85}px`, background: i === 1 || i === 5 ? 'rgba(65,211,126,0.22)' : 'rgba(32,32,168,0.18)', border: `1px solid rgba(255,255,255,${i === 1 || i === 5 ? 0.12 : 0.05})`, minHeight: 8 }} />
      ))}
    </div>
  )
}

function VisualRepetitiveWork() {
  return (
    <div className="card-visual" style={{ position: 'relative', height: 86 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute',
          top: i * 14,
          right: i * 10,
          left: 0,
          height: 56,
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.09)',
          background: `rgba(255,255,255,${0.025 + i * 0.015})`,
        }}>
          {i === 2 && (
            <div style={{ position: 'absolute', top: 10, right: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ height: 5, background: 'rgba(39,184,212,0.2)', borderRadius: 3, width: '65%' }} />
              <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, width: '45%' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Nav card visuals ──────────────────────────────── */
function VisualLibrary() {
  return (
    <div className="card-visual" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7, marginBottom: 4 }}>
      {Array.from({ length: 8 }, (_, i) => {
        const highlight = i === 2 || i === 5
        return (
          <div key={i} style={{
            height: 40, borderRadius: 10,
            background: highlight ? 'rgba(65,211,126,0.18)' : 'rgba(255,255,255,0.05)',
            border: `1px solid rgba(255,255,255,${highlight ? 0.15 : 0.06})`,
          }}>
            {highlight && (
              <div style={{ margin: '10px auto 0', width: 14, height: 2, background: 'rgba(65,211,126,0.6)', borderRadius: 2 }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function VisualExperiment() {
  return (
    <div className="card-visual" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div>
        <div style={{ fontSize: 9, color: 'rgba(244,251,255,0.3)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 8 }}>قبل</div>
        {[88, 72, 60, 82].map((w, i) => (
          <div key={i} style={{ height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.06)', marginBottom: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${w}%`, background: 'rgba(255,255,255,0.14)' }} />
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 9, color: 'rgba(65,211,126,0.6)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 8 }}>بعد</div>
        {[30, 24, 18, 28].map((w, i) => (
          <div key={i} style={{ height: 7, borderRadius: 4, background: 'rgba(65,211,126,0.07)', marginBottom: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${w}%`, background: 'rgba(65,211,126,0.38)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function VisualRoadmap() {
  return (
    <div className="card-visual" style={{ display: 'flex', alignItems: 'center', gap: 0, paddingBottom: 4 }}>
      {[1, 2, 3, 4].map((step, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            border: `1.5px solid ${step === 1 ? 'rgba(65,211,126,0.6)' : 'rgba(255,255,255,0.14)'}`,
            background: step === 1 ? 'rgba(65,211,126,0.14)' : 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 800,
            color: step === 1 ? 'rgba(65,211,126,0.85)' : 'rgba(244,251,255,0.3)',
          }}>
            {step}
          </div>
          {i < 3 && <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.09)' }} />}
        </div>
      ))}
    </div>
  )
}

function VisualGAB() {
  return (
    <div className="card-visual" style={{ display: 'flex', gap: 8, paddingBottom: 4 }}>
      {['G', 'A', 'B'].map((letter, i) => (
        <div key={i} style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(32,32,168,0.1)',
          border: '1px solid rgba(32,32,168,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 900,
          color: `rgba(32,32,168,${0.45 + i * 0.1})`,
          fontFamily: 'monospace',
          letterSpacing: '-0.02em',
        }}>
          {letter}
        </div>
      ))}
    </div>
  )
}

function VisualNextStep() {
  return (
    <div className="card-visual" style={{ display: 'flex', alignItems: 'flex-end', gap: 8, paddingBottom: 2 }}>
      {[28, 44, 60, 80].map((h, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: '6px 6px 0 0', height: `${h}px`,
          background: i === 3 ? 'rgba(65,211,126,0.22)' : 'rgba(65,211,126,0.07)',
          border: `1px solid rgba(65,211,126,${0.08 + i * 0.04})`,
        }} />
      ))}
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="glass-card" style={{
      borderRadius: 28,
      padding: 32,
      minHeight: 380,
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(145deg, rgba(32,32,168,0.22) 0%, rgba(0,0,78,0.4) 100%)',
      borderColor: 'rgba(65,211,126,0.18)',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      {/* Blue glow top right */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,32,168,0.55) 0%, transparent 65%)', pointerEvents: 'none' }} />
      {/* Green glow bottom left */}
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(65,211,126,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* GML wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M2 11.5L5 7.5L8 9.5L11 5.5L14 3" stroke="#00004E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="14" cy="3" r="1.5" fill="#00004E"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 17, color: 'var(--text-main)', lineHeight: 1.1 }}>جمل</div>
            <div style={{ fontWeight: 700, fontSize: 9, color: 'var(--brand-green)', letterSpacing: '0.14em', opacity: 0.8 }}>GML</div>
          </div>
        </div>

        {/* Library element tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, margin: '28px 0' }}>
          {[
            { label: 'خلفيات', bg: 'rgba(32,32,168,0.38)', border: 'rgba(32,32,168,0.5)' },
            { label: 'انتقالات', bg: 'rgba(65,211,126,0.14)', border: 'rgba(65,211,126,0.25)' },
            { label: 'عدادات', bg: 'rgba(32,32,168,0.28)', border: 'rgba(32,32,168,0.4)' },
            { label: 'نصوص', bg: 'rgba(65,211,126,0.1)', border: 'rgba(65,211,126,0.2)' },
            { label: 'رسوم', bg: 'rgba(32,32,168,0.22)', border: 'rgba(32,32,168,0.35)' },
            { label: 'موشن', bg: 'rgba(65,211,126,0.08)', border: 'rgba(65,211,126,0.16)' },
          ].map((tile, i) => (
            <div key={i} style={{
              borderRadius: 12, padding: '14px 8px', textAlign: 'center',
              background: tile.bg, border: `1px solid ${tile.border}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '-0.01em' }}>
                {tile.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot-live" />
          <span style={{ fontSize: 11, color: 'rgba(65,211,126,0.75)', fontWeight: 600, letterSpacing: '0.04em' }}>نظام إنتاج بصري</span>
        </div>
      </div>
    </div>
  )
}

/* ── Main ──────────────────────────────────────────── */
export default function Home() {
  const { content } = useContent()
  const { home } = content

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ paddingTop: 128, paddingBottom: 80 }}>
        <div style={{ width: 'min(1180px, calc(100% - 40px))', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48, alignItems: 'center' }}>
            {/* Text */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <span className="label-tag">
                  <span className="dot-live" />
                  نسخة العرض التجريبية
                </span>
              </div>

              <h1 className="section-title" style={{ maxWidth: 640, marginBottom: 20, marginTop: 8 }}>
                {home.hero.title}
              </h1>

              <p className="section-subtitle" style={{ maxWidth: 520, marginBottom: 40 }}>
                {home.hero.subtitle}
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/library" className="btn-primary">{home.hero.primaryCTA}</Link>
                <Link href="/experiment" className="btn-secondary">{home.hero.secondaryCTA}</Link>
              </div>
            </div>

            {/* Visual panel */}
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ── Challenge bento ──────────────────────── */}
      <section style={{ paddingBottom: 80 }}>
        <div className="bento-grid">
          {/* Header */}
          <div className="bento-full" style={{ paddingBottom: 8 }}>
            <span className="label-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>المشكلة</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>التحدي الحالي</h2>
          </div>

          {/* Card 1 */}
          <div className="bento-small glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
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

          {/* Card 2 */}
          <div className="bento-small glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
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

          {/* Card 3 */}
          <div className="bento-small glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
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
      <section style={{ paddingBottom: 80 }}>
        <div className="bento-grid">
          {/* Header */}
          <div className="bento-full" style={{ paddingBottom: 8 }}>
            <h2 className="section-title">استكشف أقسام المشروع</h2>
          </div>

          {/* المكتبة — large */}
          <Link href="/library" className="bento-large glass-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
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

          {/* التجربة — medium */}
          <Link href="/experiment" className="bento-medium glass-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <VisualExperiment />
            </div>
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', marginBottom: 10, letterSpacing: '-0.025em' }}>
                {home.navCards[1].title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                {home.navCards[1].desc}
              </p>
            </div>
          </Link>

          {/* خارطة الطريق — small */}
          <Link href="/roadmap" className="bento-small glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <VisualRoadmap />
            </div>
            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                {home.navCards[2].title}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {home.navCards[2].desc}
              </p>
            </div>
          </Link>

          {/* GAB — small */}
          <Link href="/gab" className="bento-small glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <VisualGAB />
            </div>
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  {home.navCards[3].title}
                </h3>
                <span className="chip chip-next">قريبًا</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {home.navCards[3].desc}
              </p>
            </div>
          </Link>

          {/* الخطوة القادمة — small */}
          <Link href="/next-step" className="bento-small glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <VisualNextStep />
            </div>
            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                {home.navCards[4].title}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {home.navCards[4].desc}
              </p>
            </div>
          </Link>

          {/* Closing statement */}
          <div className="bento-full glass-card" style={{ padding: '48px 56px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(65,211,126,0.04) 0%, rgba(14,94,142,0.1) 100%)', borderColor: 'rgba(65,211,126,0.18)' }}>
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
