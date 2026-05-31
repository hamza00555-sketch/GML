import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const contentTypes = [
  {
    name: 'خلفيات',
    desc: 'خلفيات حركية بألوان وتصاميم متنوعة تناسب المحتوى السعودي',
    count: 42,
    progress: 85,
    color: '#1A4DFF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="16" height="16" rx="3" stroke="#4D79FF" strokeWidth="1.5" />
        <circle cx="6.5" cy="6.5" r="2" fill="#4D79FF" opacity="0.7" />
        <path d="M2 12L6 9L9 12L13 8L18 13" stroke="#4D79FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'انتقالات',
    desc: 'مؤثرات انتقالية سلسة تربط مقاطع الفيديو بأسلوب احترافي',
    count: 35,
    progress: 72,
    color: '#00D26A',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 10H8L10 6L12 14L14 10H18" stroke="#00D26A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'عبارات نصية',
    desc: 'عبارات تحفيزية وإخبارية جاهزة بتصاميم جذابة وخطوط عربية',
    count: 28,
    progress: 65,
    color: '#FFB800',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 5H16M4 9H12M4 13H14M4 17H10" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'نصوص متحركة',
    desc: 'تايبوغرافي متحرك ومتنوع يناسب الإعلانات والتغطيات الإخبارية',
    count: 24,
    progress: 55,
    color: '#FF6B35',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 15V5H9L12 11L15 5H19V15" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 12H17" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'رسوم متحركة',
    desc: 'إنفوغرافيك متحرك ورسوم توضيحية تشرح وتجذب المشاهد',
    count: 21,
    progress: 45,
    color: '#A855F7',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#A855F7" strokeWidth="1.5" />
        <path d="M10 6V10L13 12" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

const steps = [
  {
    num: '01',
    title: 'اختر العنصر',
    desc: 'تصفح المكتبة واختر العنصر المناسب لمشروعك من بين أكثر من 150 عنصر',
    color: '#1A4DFF',
  },
  {
    num: '02',
    title: 'خصّصه بنقرتك',
    desc: 'عدّل الألوان والنصوص والأحجام لتتناسب مع هوية مشروعك في ثوانٍ',
    color: '#00D26A',
  },
  {
    num: '03',
    title: 'استخدمه في فيديوك',
    desc: 'صدّره بجودة عالية واستخدمه مباشرةً في برامج التصميم والمونتاج',
    color: '#FFB800',
  },
]

function CircleProgress({ value, color }: { value: number; color: string }) {
  const r = 42
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value / 100)
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
      <circle
        cx="50"
        cy="50"
        r={r}
        stroke={color}
        strokeWidth="8"
        fill="none"
        strokeDasharray={`${circ}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
      />
      <text x="50" y="55" textAnchor="middle" fill={color} fontSize="18" fontWeight="700" fontFamily="Cairo, sans-serif">
        {value}%
      </text>
    </svg>
  )
}

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-[#020C1B]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="glow-blue absolute top-0 right-0 w-[500px] h-[500px] opacity-25" />
        <div className="glow-green absolute bottom-0 left-1/4" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#1A4DFF]/15 border border-[#1A4DFF]/25 rounded-full px-4 py-1.5 mb-6">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="1" width="10" height="10" rx="2" stroke="#4D79FF" strokeWidth="1.2" />
                  <path d="M3.5 6L5 7.5L8.5 4" stroke="#4D79FF" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="text-[#4D79FF] text-xs font-bold">المكتبة</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-5">
                كل ما تحتاجه <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #00D26A 0%, #1A4DFF 100%)' }}
                >
                  لبناء فيديو احترافي
                </span>
              </h1>

              <p className="text-white/50 text-lg leading-loose mb-8 max-w-md">
                المكتبة تحتوي على مجموعة المواد والعناصر اللازمة لإنتاج موشن سعودي في
                مستوى الاحترافية المطلوب — جاهزة للاستخدام الفوري.
              </p>

              <div className="flex items-center gap-4">
                <a href="#content" className="btn-green">
                  استكشف المحتوى
                </a>
                <a href="#how" className="btn-outline">
                  كيفية الاستخدام
                </a>
              </div>
            </div>

            {/* Progress visual */}
            <div className="flex items-center justify-center">
              <div className="relative bg-[#071327] border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
                <div className="glow-green absolute inset-0 opacity-20" />
                <div className="relative">
                  <CircleProgress value={75} color="#00D26A" />
                  <p className="text-white/50 text-sm mt-3 font-medium">المكتبة مكتملة</p>
                  <p className="text-[#00D26A] text-2xl font-black mt-1">+150 عنصر</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content Types ── */}
      <section id="content" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">محتوى المكتبة</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              خمسة أقسام متكاملة تغطي كل احتياجات إنتاج الموشن السعودي
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contentTypes.map((type, i) => (
              <div key={i} className="gml-card p-6 group">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${type.color}18` }}
                    >
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="font-black text-white text-base">{type.name}</h3>
                      <p className="text-white/35 text-xs">{type.count} عنصر</p>
                    </div>
                  </div>
                  <span className="text-sm font-black" style={{ color: type.color }}>
                    {type.progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${type.progress}%`,
                      background: `linear-gradient(90deg, ${type.color}88, ${type.color})`,
                    }}
                  />
                </div>

                <p className="text-white/40 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}

            {/* Total card */}
            <div
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #00D26A18 0%, #1A4DFF18 100%)', border: '1px solid rgba(0,210,106,0.2)' }}
            >
              <div className="glow-green absolute -top-10 -right-10 w-40 h-40 opacity-40" />
              <div className="relative">
                <div className="text-5xl font-black text-[#00D26A] mb-2">150+</div>
                <p className="text-white/70 font-bold text-lg mb-1">عنصر موشن</p>
                <p className="text-white/40 text-sm leading-relaxed">
                  مجموع عناصر المكتبة في جميع الأقسام — ويتزايد باستمرار
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mockup Preview ── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#071327] border border-white/8 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="glow-blue absolute top-0 left-0 opacity-20" />
            <div className="glow-green absolute bottom-0 right-0 opacity-15" />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-black text-white mb-4">
                  تصفح وابحث بسرعة
                </h3>
                <p className="text-white/50 leading-loose mb-6">
                  واجهة بسيطة وسريعة للبحث والتصفية في المكتبة. أوجد العنصر المناسب
                  خلال ثوانٍ واستخدمه مباشرةً.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['خلفيات', 'انتقالات', 'نصوص', 'موشن', 'إنفوغرافيك'].map((tag) => (
                    <span key={tag} className="bg-white/5 border border-white/8 text-white/50 text-xs px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini mockup grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { h: 'bg-[#1A4DFF]/20', active: false },
                  { h: 'bg-[#00D26A]/20', active: true },
                  { h: 'bg-[#FF6B35]/20', active: false },
                  { h: 'bg-[#FFB800]/20', active: false },
                  { h: 'bg-[#A855F7]/20', active: false },
                  { h: 'bg-white/5', active: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`h-20 rounded-xl ${item.h} ${item.active ? 'ring-2 ring-[#00D26A]/50' : ''} flex items-center justify-center`}
                  >
                    {item.active && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10L8.5 13.5L15 7" stroke="#00D26A" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Use ── */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">كيفية الاستخدام</h2>
            <p className="section-subtitle max-w-lg mx-auto">
              ثلاث خطوات بسيطة تفصلك عن موشن احترافي
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 right-1/6 left-1/6 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />

            {steps.map((step, i) => (
              <div key={i} className="gml-card p-8 text-center group relative">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${step.color}18`, color: step.color }}
                >
                  {step.num}
                </div>
                <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>

                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -left-3 text-white/15 text-2xl">←</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/40 text-sm mb-3">جاهز للبدء؟</p>
          <h2 className="text-3xl font-black text-white mb-6">
            ابدأ مشروعك الأول مع جمل
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/experiment" className="btn-green">
              شاهد التجربة
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
