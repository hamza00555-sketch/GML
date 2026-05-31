import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/* ── SVG Icons ── */
function IconHourglass() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M7 4h14M7 24h14M8 4C8 4 8 10 14 14C8 18 8 24 8 24M20 4C20 4 20 10 14 14C20 18 20 24 20 24" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconQuality() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4L16.5 10H23L17.8 13.8L20 20L14 16.4L8 20L10.2 13.8L5 10H11.5L14 4Z" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconRedo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M20 8C18 6 15.5 5 13 5C7.5 5 3 9.5 3 15C3 20.5 7.5 25 13 25C18.5 25 23 20.5 23 15" stroke="#4D79FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 5L25 8L20 11" stroke="#4D79FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── App Mockup ── */
function AppMockup() {
  const assetRows = [
    { label: 'خلفية كاليدوسكوب', tag: 'خلفيات', w: '85%', active: true },
    { label: 'انتقال زووم إن', tag: 'انتقالات', w: '72%', active: false },
    { label: 'عبارة ترحيبية', tag: 'نصوص', w: '65%', active: false },
    { label: 'رسوم بيانية', tag: 'موشن', w: '58%', active: false },
  ]

  return (
    <div className="relative">
      {/* Main app card */}
      <div className="bg-[#071327] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* App bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <div className="flex-1 bg-white/5 rounded-md h-5 mx-3" />
          <div className="w-5 h-5 rounded bg-[#00D26A]/20 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#00D26A]" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">مكتبة الموشن</h3>
              <p className="text-xs text-white/40 mt-0.5">+150 عنصر متاح</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-[#00D26A] text-xs font-bold">75%</div>
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="13" stroke="#071327" strokeWidth="3" fill="none" />
                <circle cx="16" cy="16" r="13" stroke="#00D26A" strokeWidth="3" fill="none"
                  strokeDasharray="81.68 81.68" strokeDashoffset="20" strokeLinecap="round"
                  transform="rotate(-90 16 16)" />
              </svg>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {['الكل', 'خلفيات', 'انتقالات', 'نصوص', 'موشن'].map((tab, i) => (
              <span key={tab}
                className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-semibold cursor-pointer transition-colors ${
                  i === 0
                    ? 'bg-[#00D26A] text-[#020C1B]'
                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Asset list */}
          <div className="space-y-2.5">
            {assetRows.map((row, i) => (
              <div key={i}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  row.active
                    ? 'bg-[#00D26A]/10 border border-[#00D26A]/25'
                    : 'bg-white/3 hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  row.active ? 'bg-[#00D26A]/20' : 'bg-white/8'
                }`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1" width="12" height="12" rx="2"
                      stroke={row.active ? '#00D26A' : '#8BA0BB'} strokeWidth="1.5" />
                    <path d="M4.5 7L6 8.5L9.5 5" stroke={row.active ? '#00D26A' : '#8BA0BB'} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white truncate">{row.label}</span>
                    <span className={`text-[10px] font-bold ml-2 ${row.active ? 'text-[#00D26A]' : 'text-white/40'}`}>
                      {row.w}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${row.active ? 'bg-[#00D26A]' : 'bg-white/20'}`}
                      style={{ width: row.w }}
                    />
                  </div>
                </div>
                <span className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full shrink-0">
                  {row.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="float-badge absolute -bottom-5 -left-5 bg-[#00D26A] text-[#020C1B] rounded-2xl px-5 py-4 shadow-2xl shadow-[#00D26A]/30">
        <div className="text-2xl font-black leading-none">+150</div>
        <div className="text-xs font-bold mt-0.5">عنصر موشن</div>
      </div>

      <div className="float-badge absolute -top-4 -right-4 bg-[#071327] border border-white/15 rounded-xl px-4 py-3 shadow-xl"
        style={{ animationDelay: '1.5s' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00D26A] rounded-full pulse-dot" />
          <span className="text-xs font-semibold text-white/70">جاهز للاستخدام</span>
        </div>
      </div>
    </div>
  )
}

/* ── Challenge Card ── */
function ChallengeCard({
  icon,
  title,
  desc,
  color,
  delay,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
  delay: string
}) {
  return (
    <div className="gml-card p-7 group" style={{ animationDelay: delay }}>
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}18` }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-black text-white mb-3">{title}</h3>
      <p className="text-white/45 leading-relaxed text-sm">{desc}</p>
    </div>
  )
}

/* ── Explore Card ── */
function ExploreCard({
  title,
  desc,
  href,
  color,
  icon,
  tag,
}: {
  title: string
  desc: string
  href: string
  color: string
  icon: React.ReactNode
  tag?: string
}) {
  return (
    <Link href={href} className="gml-card p-6 block group relative overflow-hidden">
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}0D 0%, transparent 60%)` }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${color}18` }}
      >
        {icon}
      </div>

      {tag && (
        <span className="inline-block text-[10px] font-bold bg-[#00D26A]/15 text-[#00D26A] px-2 py-0.5 rounded-full mb-3">
          {tag}
        </span>
      )}

      <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#00D26A] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed mb-4">{desc}</p>

      <div className="flex items-center gap-1.5 text-white/30 group-hover:text-[#00D26A] transition-colors duration-200">
        <span className="text-sm font-semibold">اكتشف</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M4 7H10M7 4L10 7L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  )
}

/* ── Main Page ── */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#020C1B]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Glow blobs */}
        <div className="glow-blue absolute top-0 right-1/4 -translate-y-1/4" />
        <div className="glow-green absolute top-40 left-10 w-64 h-64" />
        <div className="glow-blue absolute bottom-0 left-1/3" style={{ opacity: 0.5 }} />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
                <span className="w-2 h-2 bg-[#00D26A] rounded-full pulse-dot" />
                <span className="text-sm text-white/60 font-medium">الإصدار الأول — متاح الآن</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black leading-[1.15] mb-6">
                <span className="text-white">موشن أسرع،</span>
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #00D26A 0%, #1A4DFF 100%)' }}
                >
                  إنتاج أذكى
                </span>
              </h1>

              <p className="text-white/55 text-lg leading-loose mb-10 max-w-lg">
                جمل GML هي مكتبة موشن مبنية للمحتوى السعودي. تمكّن منشئي المحتوى والمصممين من إنتاج موشن
                احترافي بدون الحاجة إلى تصميم كل عنصر من الصفر.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/library" className="btn-green text-base">
                  ابدأ الآن
                </Link>
                <Link href="/experiment" className="btn-outline text-base">
                  شاهد التجربة
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/5">
                {[
                  { value: '+150', label: 'عنصر موشن' },
                  { value: '5', label: 'أنواع محتوى' },
                  { value: '75%', label: 'المكتبة مكتملة' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-[#00D26A]">{stat.value}</div>
                    <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup */}
            <div className="relative lg:pl-8">
              <AppMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Challenge ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="glow-blue absolute -top-40 left-1/2 -translate-x-1/2 opacity-30" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#FF6B35] text-xs font-bold">المشكلة</span>
            </div>
            <h2 className="section-title mb-4">التحدي الحالي</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              منشئو المحتوى يواجهون هذه العقبات في كل مشروع موشن
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ChallengeCard
              icon={<IconHourglass />}
              title="إنتاج بطيء"
              desc="تصميم كل عنصر من الصفر يستغرق ساعات طويلة ويعيق سرعة الإنتاج ويضغط على المواعيد النهائية."
              color="#FF6B35"
              delay="0ms"
            />
            <ChallengeCard
              icon={<IconQuality />}
              title="جودة غير ثابتة"
              desc="صعوبة الوصول إلى جودة منتج احترافي ثابت بين المشاريع المختلفة وأعضاء الفريق."
              color="#FFB800"
              delay="100ms"
            />
            <ChallengeCard
              icon={<IconRedo />}
              title="إعادة الاختراع"
              desc="إعادة تصميم نفس العناصر في كل مشروع جديد بدون مرجع موحد يزيد الجهد ويقلل الكفاءة."
              color="#4D79FF"
              delay="200ms"
            />
          </div>
        </div>
      </section>

      {/* ── Solution Banner ── */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-3xl p-12 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #071327 0%, #0B1E3D 100%)' }}
          >
            <div className="glow-green absolute -top-20 right-20 w-64 h-64 opacity-40" />
            <div className="glow-blue absolute -bottom-20 left-20 w-64 h-64 opacity-30" />

            <div className="relative text-center max-w-2xl mx-auto">
              <div
                className="inline-block text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #00D26A 0%, #1A4DFF 100%)' }}
              >
                الحل في جمل
              </div>
              <p className="text-white/55 text-lg leading-loose">
                مكتبة عناصر موشن جاهزة، مصممة خصيصًا للمحتوى السعودي، تختصر الوقت وترفع الجودة
                وتضمن الثبات في كل مشروع.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore Sections ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">استكشف أقسام جمل</h2>
            <p className="section-subtitle max-w-lg mx-auto">
              كل قسم مصمم ليأخذك خطوة نحو إنتاج موشن احترافي
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ExploreCard
              title="المكتبة"
              desc="أكثر من 150 عنصر موشن جاهز: خلفيات، انتقالات، نصوص، ورسوم متحركة."
              href="/library"
              color="#1A4DFF"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="4" width="18" height="3" rx="1.5" fill="#4D79FF" />
                  <rect x="2" y="9.5" width="18" height="3" rx="1.5" fill="#4D79FF" opacity="0.7" />
                  <rect x="2" y="15" width="12" height="3" rx="1.5" fill="#4D79FF" opacity="0.4" />
                </svg>
              }
            />
            <ExploreCard
              title="التجربة"
              desc="شاهد كيف يستخدم مصممون محترفون المكتبة في مشاريع حقيقية مع مقارنة الوقت والجودة."
              href="/experiment"
              color="#00D26A"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="3" width="18" height="13" rx="2.5" stroke="#00D26A" strokeWidth="1.5" />
                  <path d="M9 8.5L14 11L9 13.5V8.5Z" fill="#00D26A" />
                  <path d="M6 19H16" stroke="#00D26A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
            <ExploreCard
              title="خارطة الطريق"
              desc="الخطة المستقبلية لتطوير جمل من مكتبة الموشن إلى عالم AR و VR."
              href="/roadmap"
              color="#FF6B35"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="4" cy="11" r="2" fill="#FF6B35" />
                  <circle cx="11" cy="5" r="2" fill="#FF6B35" opacity="0.7" />
                  <circle cx="18" cy="11" r="2" fill="#FF6B35" opacity="0.5" />
                  <circle cx="11" cy="17" r="2" fill="#FF6B35" opacity="0.3" />
                  <path d="M6 11H9M13 5H16M16 11H19M11 7V15" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                </svg>
              }
            />
            <ExploreCard
              title="وكيل GAB"
              desc="الذكاء الاصطناعي القادم الذي سيُنتج الموشن تلقائيًا بناءً على المحتوى."
              href="/coming-soon"
              color="#FFB800"
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="5" y="7" width="12" height="9" rx="3" stroke="#FFB800" strokeWidth="1.5" />
                  <circle cx="8.5" cy="11" r="1.5" fill="#FFB800" />
                  <circle cx="13.5" cy="11" r="1.5" fill="#FFB800" />
                  <path d="M8 7V5M14 7V5" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9 16L9 18M13 16L13 18" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
              tag="قريبًا"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            خطوتك الأولى تبدأ هنا
          </h2>
          <p className="text-white/50 text-lg mb-8 leading-loose">
            استكشف مكتبة جمل وابدأ بتحويل فيديوهاتك إلى مستوى احترافي جديد
          </p>
          <Link href="/library" className="btn-green text-lg">
            استكشف المكتبة
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
