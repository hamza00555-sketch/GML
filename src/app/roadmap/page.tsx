'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type VisualType = 'library' | 'workshop' | '3d' | 'vr'
type StatusType = 'current' | 'next' | 'vision'

interface Step {
  number: string
  title: string
  status: string
  statusType: StatusType
  description: string
  tags: string[]
  visualType: VisualType
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'اعتماد المكتبة',
    status: 'الحالية',
    statusType: 'current',
    description: 'توحيد المعايير والهوية البصرية وجودة المحتوى لبناء أساس صلب وقابل للتوسع.',
    tags: ['أساس النظام', 'توحيد الهوية', 'قابل للتوسع'],
    visualType: 'library',
  },
  {
    number: '02',
    title: 'ورش عمل لمكتبة الموشن / الأنيميشن',
    status: 'القادمة',
    statusType: 'next',
    description: 'تمكين الفريق من استخدام المكتبة بكفاءة من خلال ورش تدريبية عملية.',
    tags: ['تمكين الفريق', 'تدريب عملي', 'استخدام فعّال'],
    visualType: 'workshop',
  },
  {
    number: '03',
    title: 'مكتبة 3D',
    status: 'القادمة',
    statusType: 'next',
    description: 'توسيع المكتبة لتشمل نماذج وعناصر ثلاثية الأبعاد عالية الجودة جاهزة للإنتاج.',
    tags: ['عناصر ثلاثية الأبعاد', 'جاهزة للإنتاج', 'توسيع المكتبة'],
    visualType: '3d',
  },
  {
    number: '04',
    title: 'VR / AR',
    status: 'رؤية مستقبلية',
    statusType: 'vision',
    description: 'فتح المسار لاحقًا لتجارب تفاعلية وغامرة تعتمد على الأساس البصري الذي تم بناؤه.',
    tags: ['تجارب غامرة', 'تفاعل', 'رؤية مستقبلية'],
    visualType: 'vr',
  },
]

const STATUS_STYLE: Record<StatusType, { bg: string; color: string; border: string }> = {
  current: { bg: 'rgba(65,211,126,0.12)', color: 'var(--brand-green)',      border: '1px solid rgba(65,211,126,0.3)'  },
  next:    { bg: 'rgba(86,86,216,0.12)',  color: 'var(--brand-cyan)',        border: '1px solid rgba(86,86,216,0.3)'   },
  vision:  { bg: 'rgba(32,32,168,0.18)',  color: 'rgba(140,140,255,0.9)',    border: '1px solid rgba(86,86,216,0.28)'  },
}

function VisualLibrary() {
  return (
    <svg width="148" height="112" viewBox="0 0 148 112" fill="none">
      <rect x="10" y="26" width="92" height="70" rx="9" fill="rgba(86,86,216,0.1)" stroke="rgba(86,86,216,0.28)" strokeWidth="1.5"/>
      <rect x="10" y="14" width="38" height="16" rx="5" fill="rgba(86,86,216,0.18)" stroke="rgba(86,86,216,0.32)" strokeWidth="1.5"/>
      <rect x="17" y="34" width="32" height="22" rx="5" fill="rgba(65,211,126,0.09)" stroke="rgba(65,211,126,0.26)" strokeWidth="1"/>
      <polygon points="25,39 35,45 25,51" fill="rgba(65,211,126,0.65)"/>
      <rect x="55" y="34" width="32" height="22" rx="5" fill="rgba(86,86,216,0.14)" stroke="rgba(86,86,216,0.26)" strokeWidth="1"/>
      <rect x="61" y="42" width="20" height="3" rx="1.5" fill="rgba(86,86,216,0.5)"/>
      <rect x="61" y="48" width="13" height="3" rx="1.5" fill="rgba(86,86,216,0.3)"/>
      <rect x="17" y="64" width="32" height="22" rx="5" fill="rgba(86,86,216,0.09)" stroke="rgba(86,86,216,0.2)" strokeWidth="1"/>
      <path d="M21 75 L24 68 L27 78 L30 65 L33 78 L36 70 L39 75 L43 75" stroke="rgba(86,86,216,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <rect x="55" y="64" width="32" height="22" rx="5" fill="rgba(65,211,126,0.07)" stroke="rgba(65,211,126,0.18)" strokeWidth="1"/>
      <path d="M59 80 L67 71 L73 76 L80 68 L86 74" stroke="rgba(65,211,126,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="116" cy="38" r="20" fill="rgba(65,211,126,0.12)" stroke="rgba(65,211,126,0.4)" strokeWidth="2"/>
      <circle cx="116" cy="38" r="13" fill="rgba(65,211,126,0.06)"/>
      <path d="M108 38 L113 43 L124 30" stroke="var(--brand-green)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function VisualWorkshop() {
  return (
    <svg width="148" height="112" viewBox="0 0 148 112" fill="none">
      <rect x="6" y="6" width="108" height="76" rx="8" fill="rgba(32,32,168,0.18)" stroke="rgba(86,86,216,0.38)" strokeWidth="1.5"/>
      <rect x="12" y="12" width="96" height="64" rx="5" fill="rgba(0,0,40,0.45)"/>
      <rect x="18" y="20" width="56" height="5" rx="2.5" fill="rgba(86,86,216,0.38)"/>
      <rect x="18" y="29" width="38" height="4" rx="2" fill="rgba(86,86,216,0.22)"/>
      <circle cx="72" cy="54" r="15" fill="rgba(65,211,126,0.13)" stroke="rgba(65,211,126,0.38)" strokeWidth="2"/>
      <polygon points="67,47 67,61 83,54" fill="rgba(65,211,126,0.88)"/>
      <rect x="18" y="66" width="84" height="4" rx="2" fill="rgba(255,255,255,0.07)"/>
      <rect x="18" y="66" width="42" height="4" rx="2" fill="rgba(65,211,126,0.45)"/>
      <circle cx="60" cy="68" r="5" fill="var(--brand-green)"/>
      <rect x="54" y="82" width="16" height="12" rx="3" fill="rgba(86,86,216,0.18)"/>
      <rect x="40" y="94" width="40" height="5" rx="2.5" fill="rgba(86,86,216,0.22)"/>
      <rect x="120" y="20" width="26" height="62" rx="6" fill="rgba(86,86,216,0.1)" stroke="rgba(86,86,216,0.24)" strokeWidth="1"/>
      <rect x="124" y="26" width="18" height="3" rx="1.5" fill="rgba(86,86,216,0.38)"/>
      <rect x="124" y="33" width="12" height="3" rx="1.5" fill="rgba(86,86,216,0.22)"/>
      <rect x="124" y="40" width="18" height="3" rx="1.5" fill="rgba(86,86,216,0.22)"/>
      <rect x="124" y="47" width="14" height="3" rx="1.5" fill="rgba(65,211,126,0.38)"/>
      <circle cx="133" cy="68" r="8" fill="rgba(65,211,126,0.1)" stroke="rgba(65,211,126,0.28)" strokeWidth="1.5"/>
      <polygon points="130,64 130,72 139,68" fill="rgba(65,211,126,0.7)"/>
    </svg>
  )
}

function Visual3D() {
  return (
    <svg width="148" height="112" viewBox="0 0 148 112" fill="none">
      <path d="M74 10 L118 34 L74 58 L30 34 Z" fill="rgba(86,86,216,0.2)" stroke="rgba(86,86,216,0.42)" strokeWidth="1.5"/>
      <path d="M118 34 L118 78 L74 102 L74 58 Z" fill="rgba(65,211,126,0.09)" stroke="rgba(65,211,126,0.26)" strokeWidth="1.5"/>
      <path d="M30 34 L30 78 L74 102 L74 58 Z" fill="rgba(32,32,168,0.22)" stroke="rgba(86,86,216,0.32)" strokeWidth="1.5"/>
      <line x1="74" y1="10" x2="74" y2="58" stroke="rgba(65,211,126,0.55)" strokeWidth="2"/>
      <line x1="74" y1="58" x2="74" y2="102" stroke="rgba(65,211,126,0.35)" strokeWidth="1.5"/>
      <line x1="30" y1="34" x2="118" y2="34" stroke="rgba(65,211,126,0.22)" strokeWidth="1" strokeDasharray="3 3"/>
      <rect x="70" y="6"  width="8" height="8" rx="2" fill="rgba(65,211,126,0.28)" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"/>
      <rect x="114" y="30" width="8" height="8" rx="2" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.4)" strokeWidth="1"/>
      <rect x="26"  y="30" width="8" height="8" rx="2" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.4)" strokeWidth="1"/>
      <rect x="70"  y="98" width="8" height="8" rx="2" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.4)" strokeWidth="1"/>
      <path d="M130 14 L142 20 L130 26 L118 20 Z" fill="rgba(86,86,216,0.14)" stroke="rgba(86,86,216,0.28)" strokeWidth="1"/>
      <path d="M142 20 L142 32 L130 38 L130 26 Z" fill="rgba(65,211,126,0.07)" stroke="rgba(65,211,126,0.18)" strokeWidth="1"/>
      <path d="M118 20 L118 32 L130 38 L130 26 Z" fill="rgba(32,32,168,0.14)" stroke="rgba(86,86,216,0.18)" strokeWidth="1"/>
    </svg>
  )
}

function VisualVR() {
  return (
    <svg width="148" height="112" viewBox="0 0 148 112" fill="none">
      <ellipse cx="74" cy="56" rx="68" ry="20" fill="none" stroke="rgba(65,211,126,0.13)" strokeWidth="1.5" strokeDasharray="5 3"/>
      <ellipse cx="74" cy="56" rx="52" ry="14" fill="none" stroke="rgba(65,211,126,0.08)" strokeWidth="1" strokeDasharray="4 4"/>
      <path d="M22 44 C22 32 36 26 74 26 C112 26 126 32 126 44 L126 68 C126 80 112 86 74 86 C36 86 22 80 22 68 Z"
        fill="rgba(32,32,168,0.2)" stroke="rgba(86,86,216,0.42)" strokeWidth="2"/>
      <ellipse cx="50" cy="56" rx="17" ry="13" fill="rgba(65,211,126,0.11)" stroke="rgba(65,211,126,0.38)" strokeWidth="2"/>
      <ellipse cx="50" cy="56" rx="10" ry="8"  fill="rgba(65,211,126,0.07)" stroke="rgba(65,211,126,0.18)" strokeWidth="1"/>
      <circle  cx="50" cy="56" r="4" fill="rgba(65,211,126,0.22)"/>
      <ellipse cx="98" cy="56" rx="17" ry="13" fill="rgba(65,211,126,0.11)" stroke="rgba(65,211,126,0.38)" strokeWidth="2"/>
      <ellipse cx="98" cy="56" rx="10" ry="8"  fill="rgba(65,211,126,0.07)" stroke="rgba(65,211,126,0.18)" strokeWidth="1"/>
      <circle  cx="98" cy="56" r="4" fill="rgba(65,211,126,0.22)"/>
      <rect x="67" y="53" width="14" height="6" rx="3" fill="rgba(86,86,216,0.28)"/>
      <rect x="2"  y="33" width="18" height="13" rx="3" fill="rgba(86,86,216,0.13)" stroke="rgba(86,86,216,0.28)" strokeWidth="1"/>
      <line x1="20" y1="39" x2="30" y2="48" stroke="rgba(86,86,216,0.22)" strokeWidth="1" strokeDasharray="3 2"/>
      <rect x="128" y="33" width="18" height="13" rx="3" fill="rgba(86,86,216,0.13)" stroke="rgba(86,86,216,0.28)" strokeWidth="1"/>
      <line x1="128" y1="39" x2="118" y2="48" stroke="rgba(86,86,216,0.22)" strokeWidth="1" strokeDasharray="3 2"/>
      <circle cx="74"  cy="16" r="4" fill="rgba(65,211,126,0.5)" stroke="rgba(65,211,126,0.75)" strokeWidth="1.5"/>
      <circle cx="20"  cy="16" r="3" fill="rgba(65,211,126,0.28)" stroke="rgba(65,211,126,0.48)" strokeWidth="1"/>
      <circle cx="128" cy="16" r="3" fill="rgba(65,211,126,0.28)" stroke="rgba(65,211,126,0.48)" strokeWidth="1"/>
      <line x1="20" y1="16" x2="74"  y2="16" stroke="rgba(65,211,126,0.22)" strokeWidth="1"/>
      <line x1="74" y1="16" x2="128" y2="16" stroke="rgba(65,211,126,0.22)" strokeWidth="1"/>
    </svg>
  )
}

function NavButton({ onClick, dir }: { onClick: () => void; dir: 'next' | 'prev' }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'next' ? 'الخطوة التالية' : 'الخطوة السابقة'}
      style={{
        width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
        background: 'rgba(255,255,255,0.055)',
        border: '1px solid rgba(255,255,255,0.13)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(244,251,255,0.5)',
        transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={e => {
        const b = e.currentTarget
        b.style.borderColor = 'rgba(65,211,126,0.48)'
        b.style.background = 'rgba(65,211,126,0.1)'
        b.style.boxShadow = '0 0 24px rgba(65,211,126,0.18)'
        b.style.color = 'var(--brand-green)'
        b.style.transform = 'scale(1.08)'
      }}
      onMouseLeave={e => {
        const b = e.currentTarget
        b.style.borderColor = 'rgba(255,255,255,0.13)'
        b.style.background = 'rgba(255,255,255,0.055)'
        b.style.boxShadow = ''
        b.style.color = 'rgba(244,251,255,0.5)'
        b.style.transform = 'scale(1)'
      }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === 'next' ? (
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </button>
  )
}

function StepCard({ step, isMobile }: { step: Step; isMobile: boolean }) {
  const s = STATUS_STYLE[step.statusType]
  return (
    <div className="glass-card" style={{
      borderRadius: 28,
      padding: isMobile ? '32px 24px' : '44px 52px',
      borderColor: step.statusType === 'current' ? 'rgba(65,211,126,0.22)' : 'var(--glass-border)',
      background: step.statusType === 'current'
        ? 'linear-gradient(145deg, rgba(65,211,126,0.05) 0%, rgba(0,0,50,0.58) 100%)'
        : 'linear-gradient(145deg, rgba(32,32,168,0.1) 0%, rgba(0,0,50,0.55) 100%)',
      boxShadow: step.statusType === 'current'
        ? '0 24px 80px rgba(0,0,0,0.32), 0 0 60px rgba(65,211,126,0.07)'
        : '0 24px 80px rgba(0,0,0,0.28)',
      minHeight: isMobile ? 'auto' : 500,
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: 'monospace', fontSize: 11, fontWeight: 800,
          color: 'var(--brand-green)', letterSpacing: '0.08em',
          background: 'rgba(65,211,126,0.08)', padding: '4px 10px',
          border: '1px solid rgba(65,211,126,0.2)', borderRadius: 8,
        }}>المرحلة {step.number}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '4px 12px',
          borderRadius: 100, letterSpacing: '0.04em',
          background: s.bg, color: s.color, border: s.border,
        }}>{step.status}</span>
        {step.statusType === 'current' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="dot-live"/>
            <span style={{ fontSize: 11, color: 'var(--brand-green)', fontWeight: 600 }}>جارٍ التنفيذ</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
        gap: isMobile ? 28 : 44,
        alignItems: 'center',
      }}>
        <div>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontWeight: 900, color: 'var(--text-main)',
            letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 18,
          }}>{step.title}</h2>
          <p style={{
            fontSize: 15, color: 'var(--text-muted)',
            lineHeight: 1.9, marginBottom: 28, maxWidth: 440,
          }}>{step.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {step.tags.map((tag, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 600,
                color: i === 0 ? 'var(--brand-green)' : 'var(--text-muted)',
                background: i === 0 ? 'rgba(65,211,126,0.1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i === 0 ? 'rgba(65,211,126,0.25)' : 'var(--glass-border)'}`,
                padding: '5px 14px', borderRadius: 100,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{
          width: isMobile ? '100%' : 210,
          height: isMobile ? 160 : 210,
          borderRadius: 18,
          background: 'rgba(0,0,40,0.35)',
          border: '1px solid rgba(255,255,255,0.055)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden', flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(65,211,126,0.055) 0%, transparent 68%)',
            pointerEvents: 'none',
          }}/>
          {step.visualType === 'library'  && <VisualLibrary />}
          {step.visualType === 'workshop' && <VisualWorkshop />}
          {step.visualType === '3d'       && <Visual3D />}
          {step.visualType === 'vr'       && <VisualVR />}
        </div>
      </div>
    </div>
  )
}

export default function RoadmapPage() {
  const [active, setActive]           = useState(0)
  const [displayIdx, setDisplayIdx]   = useState(0)
  const [direction, setDirection]     = useState<'next' | 'prev'>('next')
  const [overlay, setOverlay]         = useState<{ step: Step; key: number } | null>(null)
  const [isLocked, setIsLocked]       = useState(false)
  const [isMobile, setIsMobile]       = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const navigate = useCallback((dir: 'next' | 'prev', target?: number) => {
    if (isLocked) return
    const newIdx = target !== undefined
      ? target
      : dir === 'next'
        ? (active + 1) % STEPS.length
        : (active - 1 + STEPS.length) % STEPS.length

    if (newIdx === active) return

    setIsLocked(true)
    setDirection(dir)
    setActive(newIdx)
    setOverlay({ step: STEPS[newIdx], key: Date.now() })

    setTimeout(() => {
      setDisplayIdx(newIdx)
      setOverlay(null)
      setIsLocked(false)
    }, 900)
  }, [active, isLocked])

  const goToStep = useCallback((i: number) => {
    if (i === active) return
    navigate(i > active ? 'next' : 'prev', i)
  }, [active, navigate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft')  navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 152, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag hero-enter hero-enter-0" style={{ marginBottom: 20, display: 'inline-flex' }}>خارطة الطريق</span>
          <h1 className="section-title hero-enter hero-enter-1" style={{ marginBottom: 16, marginTop: 12 }}>
            خارطة الطريق
          </h1>
          <p className="section-subtitle hero-enter hero-enter-2" style={{ maxWidth: 580 }}>
            رحلة نمو مستمرة نحو بناء مكتبة أكثر شمولًا، من مكتبة الموشن إلى مكتبة 3D ثم تجارب VR / AR.
          </p>
        </div>
      </section>

      {/* ── Carousel ── */}
      <section style={{ padding: '0 24px 72px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(65,211,126,0.12), transparent)',
          pointerEvents: 'none',
          transition: 'opacity 500ms ease',
        }}/>

        <div className="container">
          {!isMobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <NavButton onClick={() => navigate('prev')} dir="prev" />

              {/* Dual-card carousel: base fades out, overlay enters */}
              <div style={{ flex: 1, position: 'relative', minHeight: 500 }}>
                {/* Base card — fades out when overlay is active */}
                <div style={{
                  opacity: overlay ? 0 : 1,
                  transition: 'opacity 280ms ease',
                  pointerEvents: overlay ? 'none' : 'auto',
                }}>
                  <StepCard step={STEPS[displayIdx]} isMobile={false} />
                </div>

                {/* Overlay card — animates in */}
                {overlay && (
                  <div
                    key={overlay.key}
                    className={`carousel-enter-${direction}`}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <StepCard step={overlay.step} isMobile={false} />
                  </div>
                )}
              </div>

              <NavButton onClick={() => navigate('next')} dir="next" />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  opacity: overlay ? 0 : 1,
                  transition: 'opacity 280ms ease',
                  pointerEvents: overlay ? 'none' : 'auto',
                }}>
                  <StepCard step={STEPS[displayIdx]} isMobile={true} />
                </div>
                {overlay && (
                  <div
                    key={overlay.key}
                    className={`carousel-enter-${direction}`}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <StepCard step={overlay.step} isMobile={true} />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
                <NavButton onClick={() => navigate('prev')} dir="prev" />
                <NavButton onClick={() => navigate('next')} dir="next" />
              </div>
            </div>
          )}

          {/* Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 28 }}>
            {STEPS.map((_, i) => (
              <button key={i} onClick={() => goToStep(i)}
                aria-current={i === active ? 'step' : undefined}
                style={{
                  width: i === active ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === active ? 'var(--brand-green)' : 'rgba(255,255,255,0.18)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                  boxShadow: i === active ? '0 0 12px rgba(65,211,126,0.45)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Step counter */}
          <p style={{ textAlign: 'center', marginTop: 14, fontSize: 11, color: 'rgba(244,251,255,0.28)', fontFamily: 'monospace', letterSpacing: '0.1em', transition: 'opacity 300ms ease' }}>
            {String(active + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
          </p>
        </div>
      </section>

      {/* ── Vision ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div className="glass-card" style={{
            borderRadius: 24, padding: isMobile ? '36px 28px' : '48px 52px',
            background: 'linear-gradient(135deg, rgba(32,32,168,0.16) 0%, rgba(0,0,78,0.5) 100%)',
            borderColor: 'rgba(32,32,168,0.35)',
            maxWidth: 720,
          }}>
            <div className="divider" style={{ marginBottom: 24 }} />
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', marginBottom: 14 }}>الرؤية</h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85 }}>
              GML يبدأ كمكتبة موشن، ثم يتوسع تدريجيًا إلى نظام إنتاج بصري يدعم الفريق في العمل بسرعة أعلى وجودة أكثر اتساقًا.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/next-step" className="btn-primary">الخطوة القادمة</Link>
          <Link href="/library"   className="btn-secondary">المكتبة</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
