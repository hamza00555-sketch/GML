import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const stages = [
  {
    num: '01',
    title: 'اعتماد المكتبة',
    subtitle: 'المرحلة الحالية',
    desc: 'بناء وتطوير مكتبة الموشن السعودية وإثبات حضور جمل في السوق. إنتاج أكثر من 150 عنصر موشن جاهز للاستخدام، مع اختبار التجربة من مصممين محترفين.',
    features: [
      '+150 عنصر موشن جاهز',
      'خلفيات وانتقالات ونصوص',
      'رسوم متحركة وإنفوغرافيك',
      'اختبار حقيقي مع مصممين',
    ],
    status: 'current',
    color: '#00D26A',
    glow: 'rgba(0,210,106,0.15)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="#00D26A" strokeWidth="2" />
        <path d="M10 14L14 18L22 11" stroke="#00D26A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'ورش عمل الموشن',
    subtitle: 'المرحلة القادمة',
    desc: 'توسيع نطاق المكتبة وتنظيم ورش عمل تعليمية للمصممين السعوديين. نقل المعرفة وبناء مجتمع مصممي الموشن في المنطقة.',
    features: [
      'ورش عمل لمصممي الموشن',
      'توسيع محتوى المكتبة',
      'دعم مجتمع المصممين',
      'شراكات مع شركات الإنتاج',
    ],
    status: 'next',
    color: '#1A4DFF',
    glow: 'rgba(26,77,255,0.15)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 6L28 12V20C28 24.4 22.6 27.6 16 30C9.4 27.6 4 24.4 4 20V12L16 6Z" stroke="#1A4DFF" strokeWidth="2" />
        <path d="M11 16L14.5 19.5L21 13" stroke="#1A4DFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'مكتبة 3D',
    subtitle: 'المستقبل القريب',
    desc: 'إضافة عناصر ثلاثية الأبعاد إلى مكتبة جمل. نقل الإنتاج إلى بُعد جديد كليًا مع موشن ثلاثي الأبعاد يناسب أعلى مستويات الإنتاج.',
    features: [
      'عناصر موشن 3D احترافية',
      'شخصيات ثلاثية الأبعاد',
      'بيئات وخلفيات 3D',
      'تكامل مع أدوات الإنتاج',
    ],
    status: 'future',
    color: '#FF6B35',
    glow: 'rgba(255,107,53,0.12)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="#FF6B35" strokeWidth="2" />
        <path d="M16 4V28M4 10L28 22M28 10L4 22" stroke="#FF6B35" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'AR و VR',
    subtitle: 'الرؤية المستقبلية',
    desc: 'دمج الواقع المعزز والافتراضي في أدوات جمل. نحو مستقبل يجعلنا الأداة الأكثر شمولًا في عالم الموشن والأنيميشن متعدد الأبعاد.',
    features: [
      'محتوى AR للشبكات الاجتماعية',
      'بيئات VR تفاعلية',
      'تكامل مع نظارات الواقع المختلط',
      'تجارب موشن غامرة',
    ],
    status: 'vision',
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.12)',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="24" height="10" rx="5" stroke="#A855F7" strokeWidth="2" />
        <circle cx="11" cy="17" r="3" stroke="#A855F7" strokeWidth="1.5" />
        <circle cx="21" cy="17" r="3" stroke="#A855F7" strokeWidth="1.5" />
        <path d="M14 17H18" stroke="#A855F7" strokeWidth="1.5" />
        <path d="M4 17H1M28 17H31" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  current: { label: 'الآن', bg: '#00D26A18', text: '#00D26A' },
  next: { label: 'قادمًا', bg: '#1A4DFF18', text: '#4D79FF' },
  future: { label: 'مستقبل قريب', bg: '#FF6B3518', text: '#FF6B35' },
  vision: { label: 'رؤية مستقبلية', bg: '#A855F718', text: '#A855F7' },
}

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-[#020C1B]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="glow-blue absolute top-0 right-1/4 opacity-25" />
        <div className="glow-green absolute bottom-0 left-0 opacity-15" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full px-4 py-1.5 mb-6">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#FF6B35" strokeWidth="1.2" />
              <path d="M6 3V6L8 8" stroke="#FF6B35" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[#FF6B35] text-xs font-bold">خارطة الطريق</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-5">
            <span className="text-white">خارطة </span>
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #FF6B35 0%, #1A4DFF 100%)' }}
            >
              الطريق
            </span>
          </h1>

          <p className="text-white/50 text-lg leading-loose max-w-2xl mx-auto">
            رحلة نحو مستقبل يجعل جمل الأداة الأكثر شمولًا في عالم الموشن والأنيميشن —
            من مكتبة العناصر اليوم إلى عالم الأبعاد المختلطة غدًا.
          </p>
        </div>
      </section>

      {/* ── Timeline Overview ── */}
      <section className="pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="hidden lg:flex items-center justify-between gap-2 mb-4 px-8">
            {stages.map((s, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 border-2"
                  style={{
                    color: s.color,
                    borderColor: s.status === 'current' ? s.color : `${s.color}40`,
                    backgroundColor: s.status === 'current' ? `${s.color}18` : 'transparent',
                  }}
                >
                  {s.num}
                </div>
                {i < stages.length - 1 && (
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${s.color}40, ${stages[i+1].color}20)` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stages ── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {stages.map((stage, i) => {
            const statusBadge = statusConfig[stage.status]
            return (
              <div
                key={i}
                className="gml-card p-8 relative overflow-hidden group"
                style={stage.status === 'current' ? { borderColor: `${stage.color}30` } : {}}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 10% 50%, ${stage.glow} 0%, transparent 50%)` }}
                />
                {stage.status === 'current' && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ background: `radial-gradient(circle at 5% 50%, ${stage.glow} 0%, transparent 40%)` }}
                  />
                )}

                <div className="relative grid md:grid-cols-[auto_1fr_auto] gap-8 items-start">
                  {/* Number + Icon */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${stage.color}18` }}
                    >
                      {stage.icon}
                    </div>
                    <div
                      className="text-3xl font-black opacity-20"
                      style={{ color: stage.color }}
                    >
                      {stage.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-black text-white">{stage.title}</h3>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ backgroundColor: statusBadge.bg, color: statusBadge.text }}
                      >
                        {statusBadge.label}
                      </span>
                      {stage.status === 'current' && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#00D26A] pulse-dot" />
                          <span className="text-[#00D26A] text-xs">جارٍ التنفيذ</span>
                        </div>
                      )}
                    </div>
                    <p className="text-white/30 text-sm mb-4">{stage.subtitle}</p>
                    <p className="text-white/50 leading-loose mb-5 max-w-lg">{stage.desc}</p>

                    {/* Features */}
                    <div className="grid sm:grid-cols-2 gap-2">
                      {stage.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2.5">
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: stage.color }}
                          />
                          <span className="text-white/55 text-sm">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage visual */}
                  <div
                    className="hidden lg:flex w-24 h-24 rounded-2xl items-center justify-center shrink-0"
                    style={{ backgroundColor: `${stage.color}08`, border: `1px solid ${stage.color}20` }}
                  >
                    <div style={{ transform: 'scale(1.4)' }}>{stage.icon}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Vision Statement ── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-12 relative overflow-hidden text-center"
            style={{ background: 'linear-gradient(135deg, #071327 0%, #0B1E3D 100%)' }}
          >
            <div className="glow-blue absolute top-0 right-0 opacity-30" />
            <div className="glow-green absolute bottom-0 left-0 opacity-20" />

            <div className="relative max-w-3xl mx-auto">
              <div className="text-5xl mb-6">🌟</div>
              <h2 className="text-3xl font-black text-white mb-4">
                رؤيتنا لمستقبل الموشن السعودي
              </h2>
              <p className="text-white/50 text-lg leading-loose">
                نؤمن بأن المحتوى السعودي يستحق أدوات موشن على مستوى عالمي —
                مصممة خصيصًا لثقافتنا وإبداعنا. جمل هي الخطوة الأولى نحو هذا المستقبل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            كن جزءًا من الرحلة
          </h2>
          <p className="text-white/40 mb-8">
            ابدأ باستخدام جمل اليوم وشكّل معنا مستقبل الموشن السعودي
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/library" className="btn-green">
              استكشف المكتبة
            </Link>
            <Link href="/experiment" className="btn-outline">
              شاهد التجربة
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
