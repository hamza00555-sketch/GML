'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useContent } from '@/components/ContentProvider'

function VideoEmbed({ url, title }: { url: string; title: string }) {
  if (!url) {
    return (
      <div className="video-placeholder">
        <div className="play-btn">
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

function ComparisonCard({ title, text, color, type }: { title: string; text: string; color: string; type: 'time' | 'quality' }) {
  return (
    <div className="glass-card" style={{ borderRadius: 20, padding: 28 }}>
      <div className="card-visual">
        {/* Visual */}
        <div style={{ marginBottom: 20 }}>
          {type === 'time' ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              {/* Before bar */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: 'rgba(244,251,255,0.35)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 5, textAlign: 'center' }}>بدون GML</div>
                <div style={{ height: 68, borderRadius: '8px 8px 0 0', background: 'rgba(86,86,216,0.22)', border: '1px solid rgba(86,86,216,0.38)', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(90deg, rgba(86,86,216,0.1) 0px, rgba(86,86,216,0.1) 4px, transparent 4px, transparent 8px)' }} />
                </div>
              </div>
              {/* Separator */}
              <div style={{ width: 1, height: 68, background: 'rgba(255,255,255,0.07)', alignSelf: 'flex-end' }} />
              {/* After bar */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, color: 'rgba(65,211,126,0.65)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 5, textAlign: 'center' }}>مع GML</div>
                <div style={{ height: 28, borderRadius: '8px 8px 0 0', background: 'rgba(65,211,126,0.18)', border: '1px solid rgba(65,211,126,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    <div key={i} style={{ height: 14, borderRadius: 3, background: `rgba(86,86,216,${o * 0.35})`, border: `1px solid rgba(86,86,216,${o * 0.5})` }} />
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'rgba(65,211,126,0.6)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 4 }}>مع GML — متسق</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 3 }}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} style={{ height: 14, borderRadius: 3, background: 'rgba(65,211,126,0.2)', border: '1px solid rgba(65,211,126,0.4)' }} />
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

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: 152, paddingBottom: 64, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>التجربة</span>
          <h1 className="section-title" style={{ marginBottom: 20, marginTop: 12, maxWidth: 700 }}>
            {experiment.title}
          </h1>
          <p className="section-subtitle">
            {experiment.subtitle}
          </p>
        </div>
      </section>

      {/* ── Timelapse video ── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div className="container">
          <div className="glass-card" style={{
            borderRadius: 28, padding: 36,
            borderColor: 'rgba(65,211,126,0.25)',
            background: 'linear-gradient(145deg, rgba(32,32,168,0.22) 0%, rgba(0,0,57,0.6) 100%)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.32), 0 0 60px rgba(65,211,126,0.06)',
          }}>
            {/* Header row */}
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
            {/* Video area */}
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 14 }}>
            {[experiment.designer1, experiment.designer2].map((d, i) => (
              <div key={i} className="glass-card" style={{
                borderRadius: 22, padding: 0, overflow: 'hidden',
                borderColor: i === 0 ? 'rgba(86,86,216,0.25)' : 'rgba(65,211,126,0.2)',
              }}>
                {/* Video area — full width, no padding */}
                <div style={{ position: 'relative' }}>
                  <VideoEmbed url={d.videoUrl} title={d.name} />
                  {/* Camera/REC indicator overlay on placeholder */}
                  {!d.videoUrl && (
                    <div style={{
                      position: 'absolute', top: 12, right: 14,
                      display: 'flex', alignItems: 'center', gap: 5,
                      background: 'rgba(0,0,0,0.45)', borderRadius: 20, padding: '4px 10px',
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4444', opacity: 0.85 }} />
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '0.1em' }}>REC</span>
                    </div>
                  )}
                </div>
                {/* Info row */}
                <div style={{ padding: '20px 24px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: i === 0 ? 'rgba(86,86,216,0.18)' : 'rgba(65,211,126,0.12)',
                      border: `1px solid ${i === 0 ? 'rgba(86,86,216,0.32)' : 'rgba(65,211,126,0.22)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: i === 0 ? 'rgba(86,86,216,0.55)' : 'rgba(65,211,126,0.55)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.role}</div>
                    </div>
                    {d.productionTime && (
                      <div style={{
                        fontSize: 11, color: 'var(--brand-green)',
                        background: 'var(--brand-green-soft)',
                        padding: '4px 10px', borderRadius: 8, fontWeight: 700,
                        border: '1px solid rgba(65,211,126,0.2)',
                      }}>
                        {d.productionTime}
                      </div>
                    )}
                  </div>
                  <blockquote style={{
                    fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.85,
                    borderRight: `2px solid ${i === 0 ? 'rgba(86,86,216,0.35)' : 'rgba(65,211,126,0.35)'}`,
                    paddingRight: 14, margin: 0,
                  }}>
                    {d.quote}
                  </blockquote>
                </div>
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
