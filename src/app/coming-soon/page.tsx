import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const CS_CSS = `
@keyframes floatYCS { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
@keyframes floatYCSsm { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
`

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#020C1B]">
      <style>{CS_CSS}</style>
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="glow-blue absolute top-1/4 right-1/4 opacity-30" />
        <div className="glow-green absolute bottom-1/4 left-1/4 opacity-20" />

        <div className="relative text-center max-w-2xl mx-auto">
          {/* Robot icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#FFB800]/10 border border-[#FFB800]/20 mb-8 mx-auto" style={{ animation: 'floatYCS 4.5s ease-in-out infinite' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="10" y="16" width="28" height="22" rx="6" stroke="#FFB800" strokeWidth="2" />
              <circle cx="18" cy="26" r="4" stroke="#FFB800" strokeWidth="1.5" />
              <circle cx="30" cy="26" r="4" stroke="#FFB800" strokeWidth="1.5" />
              <path d="M20 26H28" stroke="#FFB800" strokeWidth="1.5" />
              <path d="M18 16V10M30 16V10" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 28H5M38 28H43" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full pulse-dot" />
            <span className="text-[#FFB800] text-xs font-bold">قادم قريبًا</span>
          </div>

          <h1 className="text-5xl font-black text-white mb-4">
            وكيل <span className="text-[#FFB800]">GAB</span>
          </h1>

          <p className="text-white/50 text-lg leading-loose mb-10">
            الذكاء الاصطناعي القادم الذي سيُنتج الموشن تلقائيًا بناءً على محتواك.
            أخبره بفكرتك، وسيبني لك الموشن.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { icon: '✍️', label: 'أدخل المحتوى' },
              { icon: '⚡', label: 'يُنتج الموشن' },
              { icon: '🎬', label: 'فيديو جاهز' },
            ].map((item, i) => (
              <div key={i} className="bg-white/3 border border-white/5 rounded-2xl p-4 text-center" style={{ animation: 'floatYCSsm 4s ease-in-out infinite', animationDelay: `-${i * 1.3}s` }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-white/50 text-xs font-medium">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/" className="btn-green">
              الرئيسية
            </Link>
            <Link href="/library" className="btn-outline">
              استكشف المكتبة
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
