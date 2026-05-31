import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function VideoMockup() {
  return (
    <div className="relative bg-[#071327] border border-white/10 rounded-2xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center">
      {/* Fake timeline/screen recording UI */}
      <div className="absolute inset-0">
        {/* Recording header */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white/50 text-xs font-mono">REC 00:04:32</span>
          </div>
          <span className="text-white/30 text-xs">Timelapse + Screen Recording</span>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1 bg-white/10 rounded" />
            <div className="w-6 h-1 bg-white/10 rounded" />
            <div className="w-6 h-1 bg-white/10 rounded" />
          </div>
        </div>

        {/* Screen area */}
        <div className="flex gap-3 p-4 h-[calc(100%-80px)]">
          {/* Left panel - dark app */}
          <div className="flex-1 bg-[#0A1628] rounded-lg border border-white/5 flex flex-col gap-2 p-3 overflow-hidden">
            <div className="flex gap-2 mb-1">
              {['خلفيات', 'موشن', 'نصوص'].map((t) => (
                <span key={t} className="text-[9px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-10 rounded-lg flex items-center px-2 gap-2 ${i === 1 ? 'bg-[#00D26A]/15 border border-[#00D26A]/25' : 'bg-white/3'}`}>
                <div className={`w-6 h-6 rounded ${i === 1 ? 'bg-[#00D26A]/30' : 'bg-white/5'} shrink-0`} />
                <div className="flex-1">
                  <div className={`h-1.5 rounded w-3/4 ${i === 1 ? 'bg-[#00D26A]/40' : 'bg-white/10'}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Right panel - preview */}
          <div className="w-1/2 bg-black rounded-lg border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Simulated video content */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A4DFF]/30 to-[#00D26A]/20" />
                <div className="absolute bottom-4 left-4 right-4 h-8 bg-black/60 rounded-lg flex items-center px-3 gap-2">
                  <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[#00D26A] rounded-full" />
                  </div>
                  <span className="text-white/50 text-[9px] font-mono">2:48</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline bar */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/60 border-t border-white/5 flex items-center px-4 gap-2">
          <div className="flex gap-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: i < 13 ? (i % 3 === 0 ? '#00D26A33' : '#1A4DFF22') : 'rgba(255,255,255,0.04)',
                }}
              />
            ))}
          </div>
          <div className="mr-auto flex items-center gap-2">
            <div className="w-px h-4 bg-[#00D26A]" />
            <span className="text-[#00D26A] text-[9px] font-mono">جمل GML</span>
          </div>
        </div>
      </div>

      {/* Center play button */}
      <div className="z-10 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L16 10L7 15V5Z" fill="white" />
        </svg>
      </div>
    </div>
  )
}

const designers = [
  {
    name: 'المصمم الأول',
    role: 'مصمم موشن — 3 سنوات خبرة',
    avatar: '👨‍💻',
    color: '#1A4DFF',
    quote:
      'استخدام المكتبة قلّص وقت إنتاجي من 6 ساعات إلى أقل من ساعتين. العناصر احترافية ولا تحتاج تعديلات كبيرة.',
    stats: [
      { label: 'وقت المشروع', before: '6 ساعات', after: '1.8 ساعة' },
      { label: 'عدد المراجعات', before: '5 مراجعات', after: 'مراجعة واحدة' },
    ],
  },
  {
    name: 'المصممة الثانية',
    role: 'منتجة محتوى — 4 سنوات خبرة',
    avatar: '👩‍💻',
    color: '#00D26A',
    quote:
      'المكتبة وفّرت علي جهد كبير في إعادة ابتكار عناصر موجودة. الآن أركّز على الإبداع والقصة لا على التفاصيل التقنية.',
    stats: [
      { label: 'جودة المنتج', before: '70%', after: '95%' },
      { label: 'رضا العميل', before: 'متوسط', after: 'ممتاز' },
    ],
  },
]

const comparisons = [
  {
    label: 'الوقت المستغرق',
    before: { value: 85, label: '8 ساعات', color: '#FF4444' },
    after: { value: 25, label: '2 ساعة', color: '#00D26A' },
  },
  {
    label: 'جودة المنتج',
    before: { value: 55, label: '55%', color: '#FFB800' },
    after: { value: 95, label: '95%', color: '#00D26A' },
  },
  {
    label: 'عدد المراجعات',
    before: { value: 80, label: '5 مراجعات', color: '#FF4444' },
    after: { value: 20, label: 'مراجعة واحدة', color: '#00D26A' },
  },
]

export default function ExperimentPage() {
  return (
    <main className="min-h-screen bg-[#020C1B]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="glow-blue absolute top-0 left-1/3 opacity-25" />
        <div className="glow-green absolute top-20 right-0 opacity-15" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#00D26A]/10 border border-[#00D26A]/20 rounded-full px-4 py-1.5 mb-6">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#00D26A" strokeWidth="1.2" />
              <path d="M4 6L5.5 7.5L8.5 4.5" stroke="#00D26A" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[#00D26A] text-xs font-bold">التجربة العملية</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
            اختبار عملي يُثبت <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #00D26A 0%, #1A4DFF 100%)' }}
            >
              قيمة المكتبة
            </span>
          </h1>

          <p className="text-white/50 text-lg leading-loose max-w-2xl mx-auto mb-10">
            اختار مصممان محترفان من النخبة المشاركة في تجربة فعلية من مشروع حقيقي، وتابعا
            قدرة الأدوات والمكتبة على مساعدتهما وتسهيل عملهما وقياس النتائج.
          </p>
        </div>
      </section>

      {/* ── Video Mockup ── */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <VideoMockup />
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-white/30 text-sm">
              <div className="w-2 h-2 bg-red-500/60 rounded-full" />
              تسجيل الشاشة
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2 text-white/30 text-sm">
              <div className="w-2 h-2 bg-[#00D26A]/60 rounded-full" />
              تايم-لابس
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="text-white/30 text-sm">مشروع حقيقي</div>
          </div>
        </div>
      </section>

      {/* ── Designers ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">المصممان يتحدثان عن تجربتهما</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              آراء حقيقية من محترفين استخدموا جمل في مشاريعهم
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {designers.map((d, i) => (
              <div key={i} className="gml-card p-7 group">
                {/* Avatar + info */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${d.color}18` }}
                  >
                    {d.avatar}
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">{d.name}</h3>
                    <p className="text-white/40 text-xs mt-0.5">{d.role}</p>
                  </div>
                  <div
                    className="mr-auto text-2xl font-black opacity-20"
                    style={{ color: d.color }}
                  >
                    "
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-white/60 leading-loose text-sm mb-6 border-r-2 pr-4"
                  style={{ borderColor: `${d.color}40` }}>
                  {d.quote}
                </blockquote>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {d.stats.map((s, j) => (
                    <div key={j} className="bg-white/3 rounded-xl p-3">
                      <p className="text-white/30 text-xs mb-1.5">{s.label}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-red-400/70 text-xs line-through">{s.before}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 6H9M6 3L9 6L6 9" stroke="#00D26A" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <span className="text-[#00D26A] text-xs font-bold">{s.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">مقارنة الوقت والجودة</h2>
            <p className="section-subtitle max-w-lg mx-auto">
              الأرقام تتحدث — الفرق قبل وبعد استخدام جمل
            </p>
          </div>

          {/* Before/After labels */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/3 border border-white/5 rounded-2xl p-5 text-center">
              <div className="text-white/40 text-sm font-bold mb-1">قبل جمل</div>
              <div className="text-white/25 text-xs">بدون مكتبة</div>
            </div>
            <div className="bg-[#00D26A]/8 border border-[#00D26A]/20 rounded-2xl p-5 text-center">
              <div className="text-[#00D26A] text-sm font-bold mb-1">بعد جمل</div>
              <div className="text-[#00D26A]/50 text-xs">مع المكتبة</div>
            </div>
          </div>

          <div className="space-y-5">
            {comparisons.map((comp, i) => (
              <div key={i} className="gml-card p-6">
                <p className="text-white/50 text-sm font-bold mb-4">{comp.label}</p>
                <div className="space-y-3">
                  {/* Before bar */}
                  <div className="flex items-center gap-4">
                    <span className="text-white/30 text-xs w-28 text-left shrink-0">{comp.before.label}</span>
                    <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${comp.before.value}%`, backgroundColor: comp.before.color, opacity: 0.6 }}
                      />
                    </div>
                  </div>
                  {/* After bar */}
                  <div className="flex items-center gap-4">
                    <span className="text-[#00D26A] text-xs font-bold w-28 text-left shrink-0">{comp.after.label}</span>
                    <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${comp.after.value}%`, backgroundColor: comp.after.color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary banner */}
          <div
            className="mt-8 rounded-3xl p-8 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #00D26A18 0%, #1A4DFF18 100%)', border: '1px solid rgba(0,210,106,0.15)' }}
          >
            <div className="glow-green absolute inset-0 opacity-20" />
            <div className="relative">
              <div className="text-5xl font-black text-[#00D26A] mb-2">×3</div>
              <p className="text-white/60 text-lg">أسرع في الإنتاج مع جمل GML</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            جرّب الفرق بنفسك
          </h2>
          <p className="text-white/40 mb-8">
            استكشف المكتبة وابدأ أول مشروع موشن احترافي
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/library" className="btn-green">
              استكشف المكتبة
            </Link>
            <Link href="/roadmap" className="btn-outline">
              خارطة الطريق
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
