'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const EXP_CSS = `
@keyframes waveBar {
  0%,100% { transform: scaleY(0.15); }
  50%      { transform: scaleY(1);    }
}
@keyframes voiceGlow {
  0%,100% { opacity: 0.5; }
  50%      { opacity: 1;   }
}
@keyframes idleWave {
  0%,100% { transform: scaleY(0.25); }
  50%      { transform: scaleY(0.55); }
}
`

const WAVE_HEIGHTS = [0.3,0.65,0.45,0.9,0.55,0.35,0.8,0.5,1.0,0.7,0.4,0.85,0.6,0.95,0.5,0.75,0.3,0.8,0.6,0.45,0.7,0.5,0.35,0.65]

function AudioPlayer({
  name, role, quote, accent, src,
}: {
  name: string; role: string; quote: string; accent: 0 | 1; src: string
}) {
  const [playing, setPlaying]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent]   = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const ac = accent === 0 ? '86,86,216' : '65,211,126'
  const borderColor = accent === 0 ? 'rgba(86,86,216,0.25)' : 'rgba(65,211,126,0.22)'

  const toggle = () => {
    if (!audioRef.current || !src) return
    if (playing) { audioRef.current.pause() } else { void audioRef.current.play() }
    setPlaying(p => !p)
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * duration
  }

  return (
    <div className="glass-card" style={{ borderRadius: 22, overflow: 'hidden', borderColor, padding: 0 }}>
      {src && (
        <audio
          ref={audioRef} src={src}
          onTimeUpdate={() => { const a = audioRef.current; if (a) { setCurrent(a.currentTime); setProgress(a.currentTime / a.duration) } }}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onEnded={() => { setPlaying(false); setProgress(0); setCurrent(0) }}
        />
      )}

      {/* Visual area */}
      <div style={{
        background: accent === 0
          ? 'linear-gradient(135deg,rgba(32,32,168,0.28) 0%,rgba(0,0,57,0.55) 100%)'
          : 'linear-gradient(135deg,rgba(0,48,24,0.28) 0%,rgba(0,0,57,0.55) 100%)',
        padding: '26px 26px 18px',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Ambient glow blob */}
        <div style={{
          position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
          width: 220, height: 80,
          background: `radial-gradient(ellipse,rgba(${ac},0.18) 0%,transparent 70%)`,
          animation: playing ? `voiceGlow 1.8s ease-in-out infinite` : 'none',
          pointerEvents: 'none',
        }} />

        {/* Row: play button + waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>

          {/* Play/Pause */}
          <button
            onClick={toggle}
            style={{
              width: 50, height: 50, borderRadius: '50%', flexShrink: 0, cursor: src ? 'pointer' : 'default',
              background: `rgba(${ac},${playing ? 0.22 : 0.12})`,
              border: `1.5px solid rgba(${ac},${playing ? 0.65 : 0.32})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              outline: 'none', transition: 'all 0.2s ease',
              animation: playing ? 'playBtnPulse 2.2s ease-in-out infinite' : 'none',
              opacity: src ? 1 : 0.45,
            }}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2"   y="2" width="4" height="10" rx="1.5" fill={`rgba(${ac},0.95)`}/>
                <rect x="8.5" y="2" width="4" height="10" rx="1.5" fill={`rgba(${ac},0.95)`}/>
              </svg>
            ) : (
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path d="M3 2L12.5 8L3 14V2Z" fill={`rgba(${ac},${src ? 0.95 : 0.5})`}/>
              </svg>
            )}
          </button>

          {/* Waveform bars */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, height: 48 }}>
            {WAVE_HEIGHTS.map((h, i) => (
              <div key={i} style={{
                flex: 1, maxWidth: 5, borderRadius: 3,
                height: `${h * (playing ? 100 : 35)}%`,
                background: `rgba(${ac},${playing ? 0.55 + h * 0.45 : 0.3})`,
                transformOrigin: 'center',
                animation: playing
                  ? `waveBar ${0.55 + h * 0.45}s ease-in-out ${i * 0.055}s infinite`
                  : `idleWave ${1.8 + h * 1.2}s ease-in-out ${i * 0.08}s infinite`,
                transition: 'height 0.35s ease, background 0.35s ease',
              }}/>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 14 }}>
          <div
            onClick={seekTo}
            style={{ height: 4, borderRadius: 2, background: `rgba(${ac},0.15)`, overflow: 'hidden', cursor: src ? 'pointer' : 'default' }}
          >
            <div style={{ height: '100%', width: `${progress * 100}%`, background: `rgba(${ac},0.72)`, borderRadius: 2, transition: 'width 0.1s linear' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: `rgba(${ac},0.5)`, fontWeight: 700, fontFamily: 'monospace' }}>
            <span>{fmt(current)}</span>
            <span>{duration ? fmt(duration) : '--:--'}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '18px 24px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: `rgba(${ac},0.12)`,
            border: `1px solid rgba(${ac},0.28)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: `rgba(${ac},0.55)` }}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{role}</div>
          </div>
          {!src && (
            <div style={{ fontSize: 10, color: `rgba(${ac},0.6)`, background: `rgba(${ac},0.08)`, padding: '3px 9px', borderRadius: 6, border: `1px solid rgba(${ac},0.18)`, fontWeight: 700 }}>
              قريباً
            </div>
          )}
        </div>
        <blockquote style={{
          fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.85,
          borderRight: `2px solid rgba(${ac},0.32)`,
          paddingRight: 14, margin: 0,
        }}>
          {quote}
        </blockquote>
      </div>
    </div>
  )
}

function VideoEmbed({ url, title }: { url: string; title: string }) {
  if (!url) {
    return (
      <div className="video-placeholder">
        <div className="play-btn play-btn-pulse">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="rgba(244,251,255,0.6)" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 14, fontSize: 11, color: 'rgba(244,251,255,0.3)', fontWeight: 600 }}>
          {title}
        </div>
      </div>
    )
  }

  const isYouTube = url.includes('youtube') || url.includes('youtu.be')
  const isVimeo = url.includes('vimeo')

  if (isYouTube || isVimeo) {
    let embedUrl = url
    if (url.includes('watch?v=')) embedUrl = url.replace('watch?v=', 'embed/')
    if (url.includes('youtu.be/')) embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/')
    return (
      <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', background: '#000' }}>
        <iframe src={embedUrl} title={title} allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
    )
  }

  return (
    <video src={url} controls
      style={{ width: '100%', aspectRatio: '16/9', borderRadius: 16, background: '#000', display: 'block' }} />
  )
}

function ComparisonCard({ title, text, color, type }: {
  title: string; text: string; color: string; type: 'time' | 'quality'
}) {
  const { ref, visible } = useScrollReveal(0.2)

  return (
    <div
      ref={ref}
      className={`glass-card reveal-scale${visible ? ' is-visible' : ''}`}
      style={{ borderRadius: 20, padding: 28 }}
    >
      <div className="card-visual">
        <div style={{ marginBottom: 20 }}>
          {type === 'time' ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              {/* Before bar */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: 'rgba(244,251,255,0.35)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 5, textAlign: 'center' }}>بدون GML</div>
                <div style={{
                  height: visible ? 68 : 0,
                  borderRadius: '8px 8px 0 0',
                  background: 'rgba(86,86,216,0.22)',
                  border: '1px solid rgba(86,86,216,0.38)',
                  overflow: 'hidden',
                  transition: 'height 900ms cubic-bezier(0.22, 1, 0.36, 1) 150ms',
                }}>
                  <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(90deg, rgba(86,86,216,0.1) 0px, rgba(86,86,216,0.1) 4px, transparent 4px, transparent 8px)' }} />
                </div>
              </div>
              <div style={{ width: 1, height: 68, background: 'rgba(255,255,255,0.07)', alignSelf: 'flex-end' }} />
              {/* After bar */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: 'rgba(65,211,126,0.65)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 5, textAlign: 'center' }}>مع GML</div>
                <div style={{
                  height: visible ? 28 : 0,
                  borderRadius: '8px 8px 0 0',
                  background: 'rgba(65,211,126,0.18)',
                  border: '1px solid rgba(65,211,126,0.42)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'height 900ms cubic-bezier(0.22, 1, 0.36, 1) 420ms',
                  overflow: 'hidden',
                }}>
                  <div style={{ width: 28, height: 4, borderRadius: 2, background: 'rgba(65,211,126,0.55)' }} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 9, color: 'rgba(244,251,255,0.3)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 4 }}>بدون GML — غير متسق</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 3 }}>
                  {[0.5,0.8,0.3,0.9,0.4,0.7].map((o, i) => (
                    <div key={i} style={{
                      height: 14, borderRadius: 3,
                      background: `rgba(86,86,216,${o * 0.35})`,
                      border: `1px solid rgba(86,86,216,${o * 0.5})`,
                      opacity: visible ? 1 : 0,
                      transition: `opacity 500ms ease ${100 + i * 60}ms`,
                    }} />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'rgba(65,211,126,0.6)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 4 }}>مع GML — متسق</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 3 }}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} style={{
                      height: 14, borderRadius: 3,
                      background: 'rgba(65,211,126,0.2)',
                      border: '1px solid rgba(65,211,126,0.4)',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(6px)',
                      transition: `opacity 500ms ease ${520 + i * 70}ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${520 + i * 70}ms`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Accent dot */}
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}1A`, border: `1px solid ${color}33`, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, opacity: 0.8 }} />
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--brand-cyan)', marginBottom: 10, letterSpacing: '-0.01em' }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75 }}>
          {text}
        </p>
      </div>
    </div>
  )
}

export default function ExperimentPage() {
  const { content } = useContent()
  const { experiment } = content

  const timelapseReveal = useScrollReveal(0.08)
  const designerReveal = useScrollReveal(0.08)

  return (
    <main style={{ minHeight: '100vh' }}>
      <style>{EXP_CSS}</style>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 152, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag hero-enter hero-enter-0" style={{ marginBottom: 20, display: 'inline-flex' }}>التجربة</span>
          <h1 className="section-title hero-enter hero-enter-1" style={{ marginBottom: 20, marginTop: 12, maxWidth: 700 }}>
            {experiment.title}
          </h1>
          <p className="section-subtitle hero-enter hero-enter-2">
            {experiment.subtitle}
          </p>
        </div>
      </section>

      {/* ── Timelapse video ── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div className="container">
          <div
            ref={timelapseReveal.ref}
            className={`glass-card reveal-scale${timelapseReveal.visible ? ' is-visible' : ''}`}
            style={{
              borderRadius: 28, padding: 36,
              borderColor: 'rgba(65,211,126,0.25)',
              background: 'linear-gradient(145deg, rgba(32,32,168,0.22) 0%, rgba(0,0,57,0.6) 100%)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.32), 0 0 60px rgba(65,211,126,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#FF4444','#FFBE00','#41D37E'].map((c,i) => (
                  <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.75 }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Timelapse · Screen Recording
              </span>
              {experiment.renderTime && (
                <span style={{
                  marginRight: 'auto', fontSize: 11, fontWeight: 700,
                  color: 'var(--brand-green)', background: 'rgba(65,211,126,0.1)',
                  padding: '3px 10px', borderRadius: 8, border: '1px solid rgba(65,211,126,0.2)',
                }}>
                  وقت الإنتاج: {experiment.renderTime}
                </span>
              )}
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <VideoEmbed url={experiment.timelapseVideoUrl} title="التسجيل الزمني المتسارع" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics row ── */}
      <section style={{ padding: '0 24px 56px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { label: 'وقت المصمم الأول',        value: experiment.designer1.productionTime || '—', accent: 'rgba(65,211,126,0.7)' },
              { label: 'وقت المصمم الثاني',       value: experiment.designer2.productionTime || '—', accent: 'rgba(65,211,126,0.7)' },
              { label: 'وقت الإنتاج الكلي',       value: experiment.renderTime              || '—', accent: 'rgba(86,86,216,0.7)'  },
              { label: 'نسبة التوفير في الوقت',    value: '—',                                        accent: 'rgba(86,86,216,0.7)'  },
            ].map((m, i) => (
              <div key={i} style={{
                borderRadius: 16, padding: '20px 24px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(12px)',
                opacity: timelapseReveal.visible ? 1 : 0,
                transform: timelapseReveal.visible ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${600 + i * 110}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${600 + i * 110}ms`,
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: m.accent, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>
                  {m.value}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(244,251,255,0.45)', fontWeight: 600, letterSpacing: '0.04em' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Designer testimonials ── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>الشهادات</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>المصممان يتحدثان</h2>
          </div>

          <div
            ref={designerReveal.ref}
            className={`reveal-group${designerReveal.visible ? ' is-visible' : ''}`}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 14 }}
          >
            {[experiment.designer1, experiment.designer2].map((d, i) => (
              <div key={i} className="reveal-child">
                <AudioPlayer
                  name={d.name}
                  role={d.role}
                  quote={d.quote}
                  accent={i as 0 | 1}
                  src={d.audioUrl ?? ''}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>المقارنة</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>مقارنة الوقت والجودة</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
            <ComparisonCard title="مقارنة الوقت" text={experiment.timeComparisonText} color="var(--brand-cyan)" type="time" />
            <ComparisonCard title="مقارنة الجودة" text={experiment.qualityComparisonText} color="var(--brand-green)" type="quality" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div className="container" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/library" className="btn-primary">استكشف المكتبة</Link>
          <Link href="/roadmap" className="btn-secondary">خارطة الطريق</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
