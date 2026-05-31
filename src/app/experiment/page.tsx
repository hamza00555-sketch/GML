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

function ComparisonCard({ title, text, color }: { title: string; text: string; color: string }) {
  return (
    <div className="glass-card" style={{ borderRadius: 20, padding: 28 }}>
      <div className="card-visual">
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}1A`, border: `1px solid ${color}33`, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, opacity: 0.8 }} />
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
      <section style={{ padding: '0 24px 64px' }}>
        <div className="container">
          <div className="glass" style={{ borderRadius: 24, padding: 24, borderColor: 'rgba(39,184,212,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4444', opacity: 0.8 }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em' }}>
                TIMELAPSE + SCREEN RECORDING
              </span>
              {experiment.renderTime && (
                <span style={{ fontSize: 11, color: 'var(--brand-cyan)', background: 'rgba(39,184,212,0.1)', padding: '2px 8px', borderRadius: 6, marginRight: 'auto' }}>
                  وقت الإنتاج: {experiment.renderTime}
                </span>
              )}
            </div>
            <VideoEmbed url={experiment.timelapseVideoUrl} title="التسجيل الزمني المتسارع" />
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
              <div key={i} className="glass-card" style={{ borderRadius: 22, padding: 28 }}>
                {/* Video */}
                <div className="card-visual" style={{ marginBottom: 20 }}>
                  <VideoEmbed url={d.videoUrl} title={d.name} />
                </div>

                {/* Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: i === 0 ? 'rgba(39,184,212,0.15)' : 'rgba(65,211,126,0.12)',
                    border: `1px solid ${i === 0 ? 'rgba(39,184,212,0.25)' : 'rgba(65,211,126,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: i === 0 ? 'rgba(39,184,212,0.5)' : 'rgba(65,211,126,0.5)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.role}</div>
                  </div>
                  {d.productionTime && (
                    <div style={{ marginRight: 'auto', fontSize: 11, color: 'var(--brand-green)', background: 'var(--brand-green-soft)', padding: '3px 10px', borderRadius: 8, fontWeight: 700 }}>
                      {d.productionTime}
                    </div>
                  )}
                </div>

                <blockquote style={{
                  fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8,
                  borderRight: `2px solid ${i === 0 ? 'rgba(39,184,212,0.35)' : 'rgba(65,211,126,0.35)'}`,
                  paddingRight: 14,
                }}>
                  {d.quote}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <span className="label-tag" style={{ marginBottom: 16, display: 'inline-flex' }}>النتائج</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>ماذا أثبتت التجربة</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
            <ComparisonCard
              title="مقارنة الوقت"
              text={experiment.timeComparisonText}
              color="var(--brand-cyan)"
            />
            <ComparisonCard
              title="مقارنة الجودة"
              text={experiment.qualityComparisonText}
              color="var(--brand-green)"
            />
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
