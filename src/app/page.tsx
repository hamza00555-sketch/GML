'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

/* ── Challenge visuals ─────────────────────────────── */
function VisualSlowProduction() {
  return (
    <div className="card-visual" style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="44" height="76" viewBox="0 0 44 76" fill="none">
        <rect x="4" y="2" width="36" height="7" rx="3.5" fill="rgba(86,86,216,0.45)" stroke="rgba(86,86,216,0.55)" strokeWidth="1"/>
        <rect x="4" y="67" width="36" height="7" rx="3.5" fill="rgba(86,86,216,0.45)" stroke="rgba(86,86,216,0.55)" strokeWidth="1"/>
        <path d="M8 9 L36 9 L26 33 L18 33 Z" fill="rgba(86,86,216,0.12)" stroke="rgba(86,86,216,0.28)" strokeWidth="0.8"/>
        <path d="M8 9 L18 9 L17 14 L8 9 Z" fill="rgba(86,86,216,0.4)"/>
        <path d="M18 41 L26 41 L36 67 L8 67 Z" fill="rgba(65,211,126,0.15)" stroke="rgba(65,211,126,0.22)" strokeWidth="0.8"/>
        <path d="M12 67 L32 67 L26 53 L18 53 Z" fill="rgba(65,211,126,0.25)"/>
        <rect x="19" y="33" width="6" height="8" rx="3" fill="rgba(86,86,216,0.5)"/>
        <line x1="22" y1="41" x2="22" y2="47" stroke="rgba(65,211,126,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3"/>
      </svg>
    </div>
  )
}

function VisualInconsistentQuality() {
  const items = [
    { x: 4,  y: 36, w: 30, h: 9, o: 0.42 },
    { x: 24, y: 14, w: 22, h: 9, o: 0.28 },
    { x: 0,  y: 60, w: 34, h: 9, o: 0.18 },
    { x: 40, y: 48, w: 16, h: 9, o: 0.38 },
    { x: 14, y: 4,  w: 24, h: 9, o: 0.22 },
    { x: 42, y: 26, w: 20, h: 9, o: 0.32 },
  ]
  return (
    <div className="card-visual" style={{ height: 86, position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="86" viewBox="0 0 64 78" preserveAspectRatio="xMidYMid slice" fill="none" style={{ position: 'absolute', inset: 0 }}>
        {items.map((s, i) => (
          <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx="4"
            fill={`rgba(86,86,216,${s.o})`} stroke={`rgba(86,86,216,${Math.min(s.o + 0.2, 0.65)})`} strokeWidth="1"/>
        ))}
        <rect x="16" y="28" width="32" height="11" rx="5"
          fill="rgba(65,211,126,0.16)" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"/>
        <line x1="22" y1="33.5" x2="42" y2="33.5" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function VisualRepetitiveWork() {
  return (
    <div className="card-visual" style={{ position: 'relative', height: 86, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 4, right: 0, width: 58, height: 46,
        borderRadius: 12, background: 'rgba(32,32,168,0.28)',
        border: '1px solid rgba(86,86,216,0.38)',
      }}>
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, height: 4, background: 'rgba(86,86,216,0.42)', borderRadius: 2 }} />
        <div style={{ position: 'absolute', top: 20, left: 10, right: 18, height: 4, background: 'rgba(86,86,216,0.26)', borderRadius: 2 }} />
        <div style={{ position: 'absolute', top: 30, left: 10, right: 24, height: 4, background: 'rgba(86,86,216,0.16)', borderRadius: 2 }} />
      </div>
      <div style={{
        position: 'absolute', top: 2, right: -2, width: 62, height: 50,
        borderRadius: 14, border: '1.5px dashed rgba(65,211,126,0.55)',
      }} />
      <div style={{ position: 'absolute', bottom: 6, left: 4 }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" fill="rgba(65,211,126,0.1)" stroke="rgba(65,211,126,0.42)" strokeWidth="1.5"/>
          <line x1="16" y1="9" x2="16" y2="23" stroke="rgba(65,211,126,0.8)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="9" y1="16" x2="23" y2="16" stroke="rgba(65,211,126,0.8)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 12, left: 42, fontSize: 20, color: 'rgba(86,86,216,0.38)', lineHeight: 1 }}>↺</div>
    </div>
  )
}

/* ── Nav card visuals ──────────────────────────────── */
function VisualLibrary() {
  return (
    <div className="card-visual" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 4 }}>
      {/* Play tile */}
      <div style={{ height: 56, borderRadius: 12, background: 'rgba(65,211,126,0.14)', border: '1px solid rgba(65,211,126,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 4L14.5 9L5 14V4Z" fill="rgba(65,211,126,0.85)"/></svg>
      </div>
      {/* Text/T tile */}
      <div style={{ height: 56, borderRadius: 12, background: 'rgba(32,32,168,0.38)', border: '1px solid rgba(86,86,216,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 24, color: 'rgba(86,86,216,0.9)', lineHeight: 1 }}>T</span>
      </div>
      {/* Waveform tile */}
      <div style={{ height: 56, borderRadius: 12, background: 'rgba(32,32,168,0.28)', border: '1px solid rgba(86,86,216,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px' }}>
        <svg width="38" height="18" viewBox="0 0 38 18" fill="none">
          <path d="M2 9 C6 2 10 16 14 9 C18 2 22 16 26 9 C30 2 34 16 36 9" stroke="rgba(86,86,216,0.72)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Asset grid tile */}
      <div style={{ height: 56, borderRadius: 12, background: 'rgba(32,32,168,0.22)', border: '1px solid rgba(86,86,216,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {[0,1,2,3].map(j => <div key={j} style={{ width: 10, height: 10, borderRadius: 3, background: j === 0 ? 'rgba(65,211,126,0.55)' : 'rgba(86,86,216,0.42)' }} />)}
        </div>
      </div>
      {/* Image tile */}
      <div style={{ height: 56, borderRadius: 12, background: 'rgba(65,211,126,0.08)', border: '1px solid rgba(65,211,126,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
        <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
          <rect x="1" y="1" width="28" height="22" rx="4" stroke="rgba(65,211,126,0.4)" strokeWidth="1.5"/>
          <circle cx="8" cy="8" r="3" fill="rgba(65,211,126,0.3)"/>
          <path d="M1 18 L7 11 L12 15 L18 9 L29 17" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Bar chart tile */}
      <div style={{ height: 56, borderRadius: 12, background: 'rgba(32,32,168,0.32)', border: '1px solid rgba(86,86,216,0.38)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, padding: '0 10px 8px' }}>
        {[8,14,10,20,13].map((h, j) => (
          <div key={j} style={{ flex: 1, borderRadius: '2px 2px 0 0', height: `${h}px`, background: j === 3 ? 'rgba(65,211,126,0.55)' : 'rgba(86,86,216,0.48)' }}/>
        ))}
      </div>
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
        {/* Connecting lines between lit dots */}
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
        {/* Door frame */}
        <rect x="4" y="4" width="44" height="54" rx="7" stroke="rgba(86,86,216,0.38)" strokeWidth="1.5" fill="rgba(32,32,168,0.14)"/>
        {/* Door panel with inner glow */}
        <rect x="8" y="8" width="36" height="46" rx="5" fill="rgba(65,211,126,0.07)" stroke="rgba(65,211,126,0.22)" strokeWidth="1"/>
        {/* Handle */}
        <circle cx="34" cy="31" r="3" fill="none" stroke="rgba(65,211,126,0.65)" strokeWidth="1.5"/>
        {/* Forward arrow */}
        <path d="M18 31 H30 M26 26 L31 31 L26 36" stroke="rgba(65,211,126,0.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

function HeroVisual() {
  return (
    <div className="glass-card" style={{
      borderRadius: 28, padding: 0, minHeight: 400,
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(145deg, rgba(32,32,168,0.28) 0%, rgba(0,0,57,0.55) 100%)',
      borderColor: 'rgba(65,211,126,0.2)',
    }}>
      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
      {/* Blue glow */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,32,168,0.5) 0%, transparent 65%)', pointerEvents: 'none' }} />
      {/* Green glow bottom */}
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(65,211,126,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Window chrome bar */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['rgba(255,80,80,0.55)','rgba(255,180,0,0.45)','rgba(65,211,126,0.5)'].map((c,i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', maxWidth: 120 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="dot-live" />
          <span style={{ fontSize: 9, color: 'rgba(65,211,126,0.65)', fontWeight: 700, letterSpacing: '0.06em' }}>GML</span>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ padding: '20px 20px 24px', position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(86,86,216,0.7)', textTransform: 'uppercase', marginBottom: 14 }}>
          مكتبة العناصر
        </div>

        {/* Asset tiles 3x2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { label: 'خلفيات', icon: 'layers', bg: 'rgba(32,32,168,0.42)', border: 'rgba(86,86,216,0.45)' },
            { label: 'انتقالات', icon: 'arrow', bg: 'rgba(65,211,126,0.14)', border: 'rgba(65,211,126,0.3)' },
            { label: 'عدادات', icon: 'circle', bg: 'rgba(32,32,168,0.32)', border: 'rgba(86,86,216,0.35)' },
            { label: 'نصوص', icon: 'text', bg: 'rgba(32,32,168,0.26)', border: 'rgba(86,86,216,0.28)' },
            { label: 'رسوم', icon: 'star', bg: 'rgba(65,211,126,0.1)', border: 'rgba(65,211,126,0.22)' },
            { label: 'موشن', icon: 'wave', bg: 'rgba(32,32,168,0.2)', border: 'rgba(86,86,216,0.22)' },
          ].map((tile, i) => (
            <div key={i} style={{ borderRadius: 14, padding: '12px 8px 10px', background: tile.bg, border: `1px solid ${tile.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {tile.icon === 'layers' && <svg width="22" height="18" viewBox="0 0 22 18" fill="none"><rect x="0" y="6" width="18" height="12" rx="3" fill="rgba(86,86,216,0.35)" stroke="rgba(86,86,216,0.5)" strokeWidth="1"/><rect x="2" y="3" width="18" height="12" rx="3" fill="rgba(86,86,216,0.28)" stroke="rgba(86,86,216,0.42)" strokeWidth="1"/><rect x="4" y="0" width="18" height="12" rx="3" fill="rgba(86,86,216,0.2)" stroke="rgba(86,86,216,0.35)" strokeWidth="1"/></svg>}
                {tile.icon === 'arrow' && <svg width="28" height="16" viewBox="0 0 28 16" fill="none"><rect x="0" y="2" width="10" height="12" rx="2" fill="rgba(65,211,126,0.2)" stroke="rgba(65,211,126,0.4)" strokeWidth="1"/><path d="M12 8H16M14 5L17 8L14 11" stroke="rgba(65,211,126,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="18" y="2" width="10" height="12" rx="2" fill="rgba(65,211,126,0.3)" stroke="rgba(65,211,126,0.55)" strokeWidth="1"/></svg>}
                {tile.icon === 'circle' && <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke="rgba(86,86,216,0.28)" strokeWidth="2.5"/><path d="M11 2 A9 9 0 0 1 20 11" stroke="rgba(86,86,216,0.72)" strokeWidth="2.5" strokeLinecap="round"/></svg>}
                {tile.icon === 'text' && <span style={{ fontFamily: 'Georgia,serif', fontWeight: 900, fontSize: 20, color: 'rgba(86,86,216,0.85)', lineHeight: 1 }}>T</span>}
                {tile.icon === 'star' && <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="4" fill="rgba(65,211,126,0.25)" stroke="rgba(65,211,126,0.55)" strokeWidth="1.2"/>{[0,60,120,180,240,300].map((deg,j)=>{ const r=(deg*Math.PI)/180; return <line key={j} x1={11+5*Math.cos(r)} y1={11+5*Math.sin(r)} x2={11+9*Math.cos(r)} y2={11+9*Math.sin(r)} stroke="rgba(65,211,126,0.45)" strokeWidth="1.5" strokeLinecap="round"/>})}</svg>}
                {tile.icon === 'wave' && <svg width="32" height="14" viewBox="0 0 32 14" fill="none"><path d="M2 7 C5 2 9 12 13 7 C17 2 21 12 25 7 C27 4 29 8 30 7" stroke="rgba(86,86,216,0.65)" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(244,251,255,0.55)', letterSpacing: '0.02em' }}>{tile.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom status bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontSize: 10, color: 'rgba(244,251,255,0.35)', fontWeight: 600 }}>نظام إنتاج بصري</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="dot-live" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: 10, color: 'rgba(65,211,126,0.65)', fontWeight: 700, letterSpacing: '0.04em' }}>v1.0</span>
          </div>
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
              <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {home.navCards[3].title}
              </h3>
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
