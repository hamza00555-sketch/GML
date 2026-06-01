'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/* ── Challenge visuals ─────────────────────────────── */
function VisualSlowProduction() {
  return (
    <div className="card-visual" style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="44" height="76" viewBox="0 0 44 76" fill="none" style={{ animation: 'floatY 6s ease-in-out infinite' }}>
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
    { x: 4,  y: 36, w: 30, h: 9, o: 0.42, drift: 'driftA 5s ease-in-out infinite' },
    { x: 24, y: 14, w: 22, h: 9, o: 0.28, drift: 'driftB 6.5s ease-in-out infinite' },
    { x: 0,  y: 60, w: 34, h: 9, o: 0.18, drift: 'driftA 7s ease-in-out infinite -2s' },
    { x: 40, y: 48, w: 16, h: 9, o: 0.38, drift: 'driftB 5.5s ease-in-out infinite -3s' },
    { x: 14, y: 4,  w: 24, h: 9, o: 0.22, drift: 'driftA 6s ease-in-out infinite -1.5s' },
    { x: 42, y: 26, w: 20, h: 9, o: 0.32, drift: 'driftB 7.5s ease-in-out infinite -0.5s' },
  ]
  return (
    <div className="card-visual" style={{ height: 86, position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" height="86" viewBox="0 0 64 78" preserveAspectRatio="xMidYMid slice" fill="none" style={{ position: 'absolute', inset: 0 }}>
        {items.map((s, i) => (
          <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx="4"
            fill={`rgba(86,86,216,${s.o})`} stroke={`rgba(86,86,216,${Math.min(s.o + 0.2, 0.65)})`} strokeWidth="1"
            style={{ animation: s.drift }}/>
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
      <div style={{
        position: 'absolute', bottom: 12, left: 42,
        fontSize: 20, color: 'rgba(86,86,216,0.38)', lineHeight: 1,
        display: 'inline-block',
        animation: 'recycleNudge 4s ease-in-out infinite',
        transformOrigin: 'center',
      }}>↺</div>
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
    <div className="card-visual" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 4 }}>
      {[
        { bg: 'rgba(65,211,126,0.14)', border: 'rgba(65,211,126,0.3)', icon: 'play', delay: '0s' },
        { bg: 'rgba(32,32,168,0.38)',  border: 'rgba(86,86,216,0.42)', icon: 'T',    delay: '-1.8s' },
        { bg: 'rgba(32,32,168,0.28)',  border: 'rgba(86,86,216,0.32)', icon: 'wave', delay: '-3.5s' },
        { bg: 'rgba(32,32,168,0.22)',  border: 'rgba(86,86,216,0.28)', icon: 'grid', delay: '-0.9s' },
        { bg: 'rgba(65,211,126,0.08)', border: 'rgba(65,211,126,0.2)', icon: 'img',  delay: '-2.7s' },
        { bg: 'rgba(32,32,168,0.32)',  border: 'rgba(86,86,216,0.38)', icon: 'bars', delay: '-4.2s' },
      ].map((tile, i) => (
        <div key={i} style={{
          height: 56, borderRadius: 12, background: tile.bg, border: `1px solid ${tile.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px',
          animation: `floatY ${5 + i * 0.4}s ease-in-out infinite`,
          animationDelay: tile.delay,
        }}>
          {tile.icon === 'play' && <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 4L14.5 9L5 14V4Z" fill="rgba(65,211,126,0.85)"/></svg>}
          {tile.icon === 'T'    && <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 24, color: 'rgba(86,86,216,0.9)', lineHeight: 1 }}>T</span>}
          {tile.icon === 'wave' && <svg width="38" height="18" viewBox="0 0 38 18" fill="none"><path d="M2 9 C6 2 10 16 14 9 C18 2 22 16 26 9 C30 2 34 16 36 9" stroke="rgba(86,86,216,0.72)" strokeWidth="1.5" strokeLinecap="round"/></svg>}
          {tile.icon === 'grid' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>{[0,1,2,3].map(j => <div key={j} style={{ width: 10, height: 10, borderRadius: 3, background: j === 0 ? 'rgba(65,211,126,0.55)' : 'rgba(86,86,216,0.42)' }} />)}</div>}
          {tile.icon === 'img'  && <svg width="30" height="24" viewBox="0 0 30 24" fill="none"><rect x="1" y="1" width="28" height="22" rx="4" stroke="rgba(65,211,126,0.4)" strokeWidth="1.5"/><circle cx="8" cy="8" r="3" fill="rgba(65,211,126,0.3)"/><path d="M1 18 L7 11 L12 15 L18 9 L29 17" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          {tile.icon === 'bars' && <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, padding: '0 2px 4px' }}>{[8,14,10,20,13].map((h, j) => <div key={j} style={{ width: 7, borderRadius: '2px 2px 0 0', height: `${h}px`, background: j === 3 ? 'rgba(65,211,126,0.55)' : 'rgba(86,86,216,0.48)' }}/>)}</div>}
        </div>
      ))}
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
  const nodes: Array<{ label: string; icon: string; x: string; y: string; delay: string; dur: string; green: boolean }> = [
    { label: 'خلفيات',   icon: 'layers', x: '50%', y: '10%', delay: '0s',    dur: '5.5s', green: true  },
    { label: 'انتقالات', icon: 'arrow',  x: '84%', y: '38%', delay: '-2.2s', dur: '7s',   green: false },
    { label: 'عدادات',   icon: 'circle', x: '72%', y: '76%', delay: '-4s',   dur: '6.2s', green: false },
    { label: 'نصوص',     icon: 'text',   x: '16%', y: '72%', delay: '-1.1s', dur: '6.8s', green: false },
    { label: 'رسوم',     icon: 'star',   x: '14%', y: '26%', delay: '-3.5s', dur: '5.8s', green: true  },
  ]

  return (
    <div style={{ position: 'relative', padding: '22px 0' }}>
      {/* Overflow badge — floats above card top edge */}
      <div style={{
        position: 'absolute', top: 2, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 14px', borderRadius: 100,
        background: 'rgba(22,22,148,0.65)',
        border: '1px solid rgba(86,86,216,0.48)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 4px 22px rgba(22,22,148,0.5)',
        animation: 'floatY 6s ease-in-out infinite',
        animationDelay: '-1s',
        zIndex: 4,
        whiteSpace: 'nowrap',
      }}>
        <span className="dot-live" style={{ width: 5, height: 5 }} />
        <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(150,150,255,0.9)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          قيد التطوير
        </span>
      </div>

      {/* Overflow chip — floats below card bottom edge */}
      <div style={{
        position: 'absolute', bottom: 2, left: 28,
        padding: '4px 12px', borderRadius: 8,
        background: 'rgba(65,211,126,0.1)',
        border: '1px solid rgba(65,211,126,0.3)',
        backdropFilter: 'blur(12px)',
        fontSize: 9, fontWeight: 800,
        color: 'rgba(65,211,126,0.82)',
        letterSpacing: '0.1em',
        animation: 'floatY 7s ease-in-out infinite',
        animationDelay: '-4s',
        zIndex: 4,
        boxShadow: '0 4px 16px rgba(65,211,126,0.14)',
      }}>
        v 1.0
      </div>

      <div className="glass-card" style={{
        borderRadius: 28, padding: 0,
        minHeight: 440,
        position: 'relative',
        overflow: 'visible',
        background: 'linear-gradient(145deg, rgba(32,32,168,0.22) 0%, rgba(0,0,57,0.52) 100%)',
        borderColor: 'rgba(65,211,126,0.2)',
      }}>
        {/* Grid overlay — clipped inside card shape */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 28, overflow: 'hidden',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Ambient blobs */}
        <div style={{ position: 'absolute', top: -70, right: -70, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,32,168,0.42) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(65,211,126,0.1) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* SVG connector lines — center (200,220) to each node */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
          viewBox="0 0 400 440"
          preserveAspectRatio="xMidYMid meet"
        >
          <line x1="200" y1="220" x2="200" y2="46"  stroke="rgba(65,211,126,0.15)" strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="200" y1="220" x2="336" y2="167" stroke="rgba(86,86,216,0.12)"  strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="200" y1="220" x2="288" y2="334" stroke="rgba(86,86,216,0.12)"  strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="200" y1="220" x2="64"  y2="317" stroke="rgba(86,86,216,0.12)"  strokeWidth="1" strokeDasharray="4 5"/>
          <line x1="200" y1="220" x2="56"  y2="114" stroke="rgba(65,211,126,0.15)" strokeWidth="1" strokeDasharray="4 5"/>
          <circle cx="200" cy="220" r="138" stroke="rgba(86,86,216,0.07)" strokeWidth="1" fill="none" strokeDasharray="6 8"/>
        </svg>

        {/* Central hub */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 96, height: 96,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}>
          <div style={{ position: 'absolute', width: 96, height: 96, borderRadius: '50%', border: '1px solid rgba(65,211,126,0.18)', animation: 'floatY 9s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 72, height: 72, borderRadius: '50%', border: '1px solid rgba(65,211,126,0.28)', background: 'rgba(65,211,126,0.03)', animation: 'floatY 7s ease-in-out infinite', animationDelay: '-3s' }} />
          <div style={{
            position: 'relative', zIndex: 1,
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(32,32,168,0.65) 0%, rgba(0,0,78,0.88) 100%)',
            border: '1.5px solid rgba(65,211,126,0.52)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 32px rgba(65,211,126,0.22), inset 0 0 18px rgba(65,211,126,0.06)',
            animation: 'playBtnPulse 4s ease-in-out infinite',
          }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: 'rgba(65,211,126,0.95)', letterSpacing: '0.06em', fontFamily: 'monospace' }}>GML</span>
          </div>
        </div>

        {/* Module nodes */}
        {nodes.map((node, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: node.y, left: node.x,
            transform: 'translate(-50%, -50%)',
            animation: `floatY ${node.dur} ease-in-out infinite`,
            animationDelay: node.delay,
            zIndex: 2,
          }}>
            <div style={{
              borderRadius: 12, padding: '9px 13px',
              background: node.green ? 'rgba(65,211,126,0.1)' : 'rgba(32,32,168,0.48)',
              border: `1px solid ${node.green ? 'rgba(65,211,126,0.32)' : 'rgba(86,86,216,0.44)'}`,
              backdropFilter: 'blur(14px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              minWidth: 62,
              boxShadow: node.green ? '0 4px 20px rgba(65,211,126,0.14)' : '0 4px 20px rgba(32,32,168,0.28)',
            }}>
              <div style={{ height: 20, display: 'flex', alignItems: 'center' }}>
                {node.icon === 'layers' && (
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <rect x="0" y="5" width="14" height="11" rx="3" fill="rgba(65,211,126,0.22)" stroke="rgba(65,211,126,0.42)" strokeWidth="1"/>
                    <rect x="2" y="2.5" width="14" height="11" rx="3" fill="rgba(65,211,126,0.15)" stroke="rgba(65,211,126,0.32)" strokeWidth="1"/>
                    <rect x="4" y="0" width="14" height="11" rx="3" fill="rgba(65,211,126,0.1)" stroke="rgba(65,211,126,0.25)" strokeWidth="1"/>
                  </svg>
                )}
                {node.icon === 'arrow' && (
                  <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
                    <rect x="0" y="1" width="9" height="12" rx="2.5" fill="rgba(86,86,216,0.22)" stroke="rgba(86,86,216,0.44)" strokeWidth="1"/>
                    <path d="M11 7H15M13 4L16 7L13 10" stroke="rgba(86,86,216,0.72)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="17" y="1" width="9" height="12" rx="2.5" fill="rgba(86,86,216,0.32)" stroke="rgba(86,86,216,0.54)" strokeWidth="1"/>
                  </svg>
                )}
                {node.icon === 'circle' && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="rgba(86,86,216,0.25)" strokeWidth="2.5"/>
                    <path d="M10 2 A8 8 0 0 1 18 10 A8 8 0 0 1 13.9 17.1" stroke="rgba(65,211,126,0.72)" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="10" cy="10" r="2.5" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.45)" strokeWidth="1"/>
                  </svg>
                )}
                {node.icon === 'text' && (
                  <span style={{ fontFamily: 'Georgia,serif', fontWeight: 900, fontSize: 18, color: 'rgba(86,86,216,0.88)', lineHeight: 1 }}>T</span>
                )}
                {node.icon === 'star' && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="3.5" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.45)" strokeWidth="1.2"/>
                    {[0, 60, 120, 180, 240, 300].map((deg, j) => {
                      const r = (deg * Math.PI) / 180
                      return <line key={j} x1={10 + 4.5 * Math.cos(r)} y1={10 + 4.5 * Math.sin(r)} x2={10 + 8 * Math.cos(r)} y2={10 + 8 * Math.sin(r)} stroke="rgba(65,211,126,0.38)" strokeWidth="1.2" strokeLinecap="round"/>
                    })}
                  </svg>
                )}
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(244,251,255,0.62)', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
                {node.label}
              </div>
            </div>
          </div>
        ))}

        {/* Status bar */}
        <div style={{
          position: 'absolute', bottom: 18, left: 18, right: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 14px', borderRadius: 10,
          background: 'rgba(0,0,0,0.22)',
          border: '1px solid rgba(255,255,255,0.06)',
          zIndex: 2,
        }}>
          <span style={{ fontSize: 10, color: 'rgba(244,251,255,0.28)', fontWeight: 600, letterSpacing: '0.03em' }}>نظام إنتاج بصري</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, color: 'rgba(86,86,216,0.55)', fontWeight: 600 }}>5 عناصر</span>
            <div style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.1)' }} />
            <span className="dot-live" style={{ width: 5, height: 5 }} />
            <span style={{ fontSize: 10, color: 'rgba(65,211,126,0.68)', fontWeight: 700 }}>جاهز</span>
          </div>
        </div>
      </div>

      {/* Floating decorative asset */}
      <img
        src="/assets/gml/decorative/wave-green.png"
        className="floating-asset floating-asset--sm floating-asset--decorative"
        style={{ '--asset-rotate': '-6deg', bottom: '18%', left: '-20px' } as React.CSSProperties}
        alt=""
        aria-hidden="true"
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
      <section style={{ paddingTop: 128, paddingBottom: 80 }}>
        <div style={{ width: 'min(1180px, calc(100% - 40px))', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'center' }}>
            {/* Text */}
            <div>
              <div className="hero-enter hero-enter-0" style={{ marginBottom: 20 }}>
                <span className="label-tag">
                  <span className="dot-live" />
                  نظام الإنتاج البصري
                </span>
              </div>

              <h1 className="section-title hero-enter hero-enter-1" style={{ maxWidth: 640, marginBottom: 20, marginTop: 8 }}>
                {home.hero.title}
              </h1>

              <p className="section-subtitle hero-enter hero-enter-2" style={{ maxWidth: 520, marginBottom: 32 }}>
                {home.hero.subtitle}
              </p>

              {/* Metric chips */}
              <div className="hero-enter hero-enter-3" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                {[
                  { num: '3×',   label: 'سرعة الإنتاج' },
                  { num: '+50',  label: 'عنصر جاهز' },
                  { num: '100%', label: 'اتساق الهوية' },
                ].map((m, i) => (
                  <div key={i} className="metric-chip">
                    <span className="metric-chip-num">{m.num}</span>
                    <span className="metric-chip-label">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="hero-enter hero-enter-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/library" className="btn-primary">{home.hero.primaryCTA}</Link>
                <Link href="/experiment" className="btn-secondary">{home.hero.secondaryCTA}</Link>
              </div>
            </div>

            {/* Visual panel */}
            <div className="hero-enter-visual hero-visual-col">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Challenge Section — Phase 2 ──────────── */}
      <section style={{ paddingBottom: 96, position: 'relative' }}>
        {/* Floating decorative asset */}
        <img
          src="/assets/gml/phase-1/challenge-slow.png"
          className="floating-asset floating-asset--sm floating-asset--decorative"
          style={{ '--asset-rotate': '10deg', top: '4%', right: '-4px' } as React.CSSProperties}
          alt=""
          aria-hidden="true"
        />
        <div className="bento-grid">

          {/* Section header */}
          <div className="bento-full" style={{ paddingBottom: 20 }}>
            <span className="label-tag" style={{ marginBottom: 14, display: 'inline-flex' }}>المشكلة</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>لماذا نحتاج GML؟</h2>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.85, marginTop: 16, maxWidth: 660 }}>
              التحدي ليس في إنتاج فيديو واحد، بل في تكرار نفس الجهد مع كل مشروع جديد، واختلاف جودة المخرجات حسب الوقت والمصمم.
            </p>
          </div>

          {/* 4 Challenge cards */}
          <div
            ref={challengeReveal.ref}
            className={`bento-full reveal-group${challengeReveal.visible ? ' is-visible' : ''}`}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}
          >
            {/* Card 1 — كل مشروع يبدأ من الصفر */}
            <div className="glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
              <div className="card-visual" style={{ height: 76, display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="17" stroke="rgba(86,86,216,0.28)" strokeWidth="1.5"/>
                  <line x1="24" y1="24" x2="24" y2="12" stroke="rgba(86,86,216,0.65)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="24" y1="24" x2="33" y2="24" stroke="rgba(86,86,216,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="2.5" fill="rgba(86,86,216,0.55)"/>
                  <path d="M37 12 C42 18 42 30 37 36" stroke="rgba(65,211,126,0.55)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <path d="M34.5 10 L38.5 13.5 L36 17" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 800, color: 'var(--brand-green)',
                letterSpacing: '0.06em', marginBottom: 12,
                background: 'rgba(65,211,126,0.08)', border: '1px solid rgba(65,211,126,0.22)',
                display: 'inline-flex', padding: '4px 11px', borderRadius: 100, width: 'fit-content',
              }}>
                حتى 3–4 ساعات
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                كل مشروع يبدأ من الصفر
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                وقت يُصرف على بناء عناصر متكررة بدل التركيز على الرسالة والمحتوى.
              </p>
            </div>

            {/* Card 2 — تفاوت في الشكل النهائي */}
            <div className="glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
              <div className="card-visual" style={{ height: 76, display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
                  <rect x="0" y="2" width="23" height="36" rx="4" fill="rgba(86,86,216,0.1)" stroke="rgba(86,86,216,0.35)" strokeWidth="1"/>
                  <line x1="4" y1="11" x2="19" y2="11" stroke="rgba(86,86,216,0.52)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="4" y1="18" x2="19" y2="18" stroke="rgba(86,86,216,0.36)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="4" y1="25" x2="14" y2="25" stroke="rgba(86,86,216,0.22)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="27" y1="20" x2="29" y2="20" stroke="rgba(65,211,126,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="33" y="2" width="23" height="36" rx="4" fill="rgba(86,86,216,0.06)" stroke="rgba(86,86,216,0.18)" strokeWidth="1"/>
                  <line x1="37" y1="14" x2="52" y2="14" stroke="rgba(86,86,216,0.2)" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="37" y1="22" x2="44" y2="22" stroke="rgba(86,86,216,0.12)" strokeWidth="1" strokeLinecap="round"/>
                  <line x1="37" y1="29" x2="50" y2="29" stroke="rgba(86,86,216,0.18)" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 800, color: 'var(--brand-cyan)',
                letterSpacing: '0.06em', marginBottom: 12,
                background: 'rgba(86,86,216,0.1)', border: '1px solid rgba(86,86,216,0.22)',
                display: 'inline-flex', padding: '4px 11px', borderRadius: 100, width: 'fit-content',
              }}>
                جودة غير موحدة
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                تفاوت في الشكل النهائي
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                اختلاف الأسلوب البصري بين المخرجات يضعف ثبات الهوية عبر الفيديوهات.
              </p>
            </div>

            {/* Card 3 — إعادة بناء نفس العناصر */}
            <div className="glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
              <div className="card-visual" style={{ height: 76, display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect x="0" y="10" width="28" height="30" rx="4" fill="rgba(86,86,216,0.08)" stroke="rgba(86,86,216,0.2)" strokeWidth="1"/>
                  <rect x="4" y="6" width="28" height="30" rx="4" fill="rgba(86,86,216,0.12)" stroke="rgba(86,86,216,0.28)" strokeWidth="1"/>
                  <rect x="8" y="2" width="28" height="30" rx="4" fill="rgba(86,86,216,0.18)" stroke="rgba(86,86,216,0.38)" strokeWidth="1"/>
                  <line x1="13" y1="12" x2="32" y2="12" stroke="rgba(86,86,216,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13" y1="18" x2="27" y2="18" stroke="rgba(86,86,216,0.38)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13" y1="24" x2="30" y2="24" stroke="rgba(86,86,216,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M33 33 C38 31 38 39 33 41" stroke="rgba(65,211,126,0.6)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                  <path d="M31 31 L34.5 34 L37 31.5" stroke="rgba(65,211,126,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 800, color: 'var(--brand-cyan)',
                letterSpacing: '0.06em', marginBottom: 12,
                background: 'rgba(86,86,216,0.1)', border: '1px solid rgba(86,86,216,0.22)',
                display: 'inline-flex', padding: '4px 11px', borderRadius: 100, width: 'fit-content',
              }}>
                تكرار غير ضروري
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                إعادة بناء نفس العناصر
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                الخلفيات، الانتقالات، العدادات، والنصوص تُعاد صناعتها بدل إعادة استخدامها.
              </p>
            </div>

            {/* Card 4 — صعوبة نقل المعرفة */}
            <div className="glass-card reveal-child" style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
              <div className="card-visual" style={{ height: 76, display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                <svg width="52" height="44" viewBox="0 0 52 44" fill="none">
                  <circle cx="26" cy="22" r="9" fill="rgba(86,86,216,0.14)" stroke="rgba(86,86,216,0.42)" strokeWidth="1.5"/>
                  <circle cx="26" cy="19" r="2.8" fill="rgba(86,86,216,0.45)"/>
                  <path d="M19 29 Q26 25 33 29" stroke="rgba(86,86,216,0.42)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                  <circle cx="6" cy="8" r="4" fill="rgba(65,211,126,0.08)" stroke="rgba(65,211,126,0.28)" strokeWidth="1"/>
                  <circle cx="46" cy="8" r="4" fill="rgba(65,211,126,0.08)" stroke="rgba(65,211,126,0.28)" strokeWidth="1"/>
                  <circle cx="6" cy="36" r="4" fill="rgba(65,211,126,0.08)" stroke="rgba(65,211,126,0.28)" strokeWidth="1"/>
                  <circle cx="46" cy="36" r="4" fill="rgba(65,211,126,0.08)" stroke="rgba(65,211,126,0.28)" strokeWidth="1"/>
                  <line x1="18" y1="17" x2="10" y2="11" stroke="rgba(86,86,216,0.2)" strokeWidth="1" strokeDasharray="3 2"/>
                  <line x1="34" y1="17" x2="42" y2="11" stroke="rgba(86,86,216,0.2)" strokeWidth="1" strokeDasharray="3 2"/>
                  <line x1="18" y1="27" x2="10" y2="33" stroke="rgba(86,86,216,0.2)" strokeWidth="1" strokeDasharray="3 2"/>
                  <line x1="34" y1="27" x2="42" y2="33" stroke="rgba(86,86,216,0.2)" strokeWidth="1" strokeDasharray="3 2"/>
                </svg>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 800, color: 'var(--brand-cyan)',
                letterSpacing: '0.06em', marginBottom: 12,
                background: 'rgba(86,86,216,0.1)', border: '1px solid rgba(86,86,216,0.22)',
                display: 'inline-flex', padding: '4px 11px', borderRadius: 100, width: 'fit-content',
              }}>
                اعتماد على الأفراد
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, letterSpacing: '-0.015em' }}>
                صعوبة نقل المعرفة
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75 }}>
                بدون مكتبة منظمة، تبقى المعرفة مرتبطة بالأشخاص بدل أن تتحول إلى نظام واضح يمكن للفريق استخدامه وتطويره.
              </p>
            </div>
          </div>

          {/* Disclaimer note */}
          <div className="bento-full" style={{ paddingTop: 6 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', opacity: 0.5, letterSpacing: '0.02em', fontStyle: 'italic' }}>
              * مؤشرات تشغيلية أولية قابلة للقياس بعد تجربة الفريق.
            </p>
          </div>

          {/* Transition statement + CTA */}
          <div className="bento-full glass-card" style={{
            marginTop: 12,
            padding: '36px 40px',
            background: 'linear-gradient(135deg, rgba(65,211,126,0.05) 0%, rgba(32,32,168,0.1) 100%)',
            borderColor: 'rgba(65,211,126,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 24,
          }}>
            <div style={{ maxWidth: 580 }}>
              <div className="divider" style={{ marginBottom: 18 }} />
              <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 500 }}>
                هنا يأتي دور GML: تحويل العناصر المتكررة إلى نظام إنتاج قابل لإعادة الاستخدام.
              </p>
            </div>
            <Link href="/library" className="btn-primary" style={{ flexShrink: 0 }}>
              استعرض المكتبة
            </Link>
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
