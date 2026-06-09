'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useContent } from '@/components/ContentProvider'
import { defaultContent, SiteContent } from '@/data/siteContent'

type Tab = 'home' | 'library' | 'experiment' | 'roadmap' | 'gab' | 'nextStep'

const TABS: { key: Tab; label: string }[] = [
  { key: 'home', label: 'الرئيسية' },
  { key: 'library', label: 'المكتبة' },
  { key: 'experiment', label: 'التجربة' },
  { key: 'roadmap', label: 'خارطة الطريق' },
  { key: 'gab', label: 'GAB' },
  { key: 'nextStep', label: 'الخطوة القادمة' },
]

function Field({
  label, value, onChange, multiline = false, placeholder = ''
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string
}) {
  const base: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, color: 'var(--text-main)', padding: '10px 14px', fontSize: 14,
    fontFamily: 'Cairo, sans-serif', outline: 'none', resize: 'vertical' as const, direction: 'rtl',
    transition: 'border-color 0.2s',
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600 }}>
        {label}
      </label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          rows={3} style={{ ...base, minHeight: 80 }}
          onFocus={e => (e.target.style.borderColor = 'var(--brand-green)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={base}
          onFocus={e => (e.target.style.borderColor = 'var(--brand-green)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')} />
      )}
    </div>
  )
}

function SectionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
      <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-cyan)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function AdminPage() {
  const { content, setContent } = useContent()
  const [local, setLocal] = useState<SiteContent>(defaultContent)
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [mounted, setMounted] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [importText, setImportText] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLocal(content)
  }, [content])

  if (!mounted) return null

  const update = (path: string[], value: string) => {
    const next = JSON.parse(JSON.stringify(local)) as SiteContent
    let obj: Record<string, unknown> = next as unknown as Record<string, unknown>
    for (let i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]] as Record<string, unknown>
    }
    obj[path[path.length - 1]] = value
    setLocal(next)
  }

  const updateArr = (path: string[], idx: number, key: string, value: string) => {
    const next = JSON.parse(JSON.stringify(local)) as SiteContent
    let obj: Record<string, unknown> = next as unknown as Record<string, unknown>
    for (const p of path) { obj = obj[p] as Record<string, unknown> }
    (obj as unknown as Record<string, string>[])[idx][key] = value
    setLocal(next)
  }

  const handleSave = () => {
    setContent(local)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (confirm('إعادة تعيين كل المحتوى إلى الإعدادات الافتراضية؟')) {
      localStorage.removeItem('gml-content')
      setLocal(defaultContent)
      setContent(defaultContent)
    }
  }

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText)
      setLocal(parsed)
      setContent(parsed)
      setImportText('')
      alert('تم الاستيراد بنجاح')
    } catch { alert('JSON غير صالح') }
  }

  const s = local

  const tabContent: Record<Tab, React.ReactNode> = {
    home: (
      <>
        <SectionBox title="Hero">
          <Field label="العنوان الرئيسي" value={s.home.hero.title} onChange={v => update(['home','hero','title'], v)} />
          <Field label="النص الفرعي" value={s.home.hero.subtitle} onChange={v => update(['home','hero','subtitle'], v)} multiline />
          <Field label="الزر الأساسي" value={s.home.hero.primaryCTA} onChange={v => update(['home','hero','primaryCTA'], v)} />
          <Field label="الزر الثانوي" value={s.home.hero.secondaryCTA} onChange={v => update(['home','hero','secondaryCTA'], v)} />
        </SectionBox>
        <SectionBox title="بطاقات التحدي">
          {s.home.challenges.map((c, i) => (
            <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <Field label={`البطاقة ${i+1} — العنوان`} value={c.title} onChange={v => updateArr(['home','challenges'], i, 'title', v)} />
              <Field label={`البطاقة ${i+1} — الوصف`} value={c.desc} onChange={v => updateArr(['home','challenges'], i, 'desc', v)} multiline />
            </div>
          ))}
        </SectionBox>
        <SectionBox title="بطاقات التنقل">
          {s.home.navCards.map((c, i) => (
            <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < s.home.navCards.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <Field label={`${c.title} — العنوان`} value={c.title} onChange={v => updateArr(['home','navCards'], i, 'title', v)} />
              <Field label={`${c.title} — الوصف`} value={c.desc} onChange={v => updateArr(['home','navCards'], i, 'desc', v)} multiline />
            </div>
          ))}
        </SectionBox>
        <SectionBox title="الجملة الختامية">
          <Field label="النص" value={s.home.closingStatement} onChange={v => update(['home','closingStatement'], v)} multiline />
        </SectionBox>
      </>
    ),
    library: (
      <>
        <SectionBox title="Hero المكتبة">
          <Field label="العنوان" value={s.library.title} onChange={v => update(['library','title'], v)} />
          <Field label="النص الفرعي" value={s.library.subtitle} onChange={v => update(['library','subtitle'], v)} multiline />
        </SectionBox>
        <SectionBox title="عناصر المكتبة">
          {s.library.items.map((item, i) => (
            <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < s.library.items.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <Field label={`العنصر ${i+1} — الاسم`} value={item.title} onChange={v => updateArr(['library','items'], i, 'title', v)} />
              <Field label={`العنصر ${i+1} — الوصف`} value={item.desc} onChange={v => updateArr(['library','items'], i, 'desc', v)} multiline />
            </div>
          ))}
        </SectionBox>
        <SectionBox title="كيفية الاستخدام">
          {s.library.howItWorks.map((step, i) => (
            <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < s.library.howItWorks.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <Field label={`خطوة ${step.num} — العنوان`} value={step.title} onChange={v => updateArr(['library','howItWorks'], i, 'title', v)} />
              <Field label={`خطوة ${step.num} — الوصف`} value={step.desc} onChange={v => updateArr(['library','howItWorks'], i, 'desc', v)} multiline />
            </div>
          ))}
        </SectionBox>
      </>
    ),
    experiment: (
      <>
        <SectionBox title="Hero التجربة">
          <Field label="العنوان" value={s.experiment.title} onChange={v => update(['experiment','title'], v)} />
          <Field label="النص الفرعي" value={s.experiment.subtitle} onChange={v => update(['experiment','subtitle'], v)} multiline />
        </SectionBox>
        <SectionBox title="فيديو التايم-لابس">
          <Field label="رابط الفيديو (YouTube embed / MP4 URL)" value={s.experiment.timelapseVideoUrl} onChange={v => update(['experiment','timelapseVideoUrl'], v)} placeholder="https://www.youtube.com/embed/..." />
        </SectionBox>
        <SectionBox title="المصمم الأول">
          <Field label="الاسم" value={s.experiment.designer1.name} onChange={v => update(['experiment','designer1','name'], v)} />
          <Field label="الدور" value={s.experiment.designer1.role} onChange={v => update(['experiment','designer1','role'], v)} />
          <Field label="رابط الصوت (فويس نوت)" value={s.experiment.designer1.audioUrl} onChange={v => update(['experiment','designer1','audioUrl'], v)} placeholder="/audio/designer1.m4a أو رابط مباشر" />
          <Field label="الاقتباس" value={s.experiment.designer1.quote} onChange={v => update(['experiment','designer1','quote'], v)} multiline />
          <Field label="وقت الإنتاج" value={s.experiment.designer1.productionTime} onChange={v => update(['experiment','designer1','productionTime'], v)} placeholder="مثال: ساعتان" />
        </SectionBox>
        <SectionBox title="المصممة الثانية">
          <Field label="الاسم" value={s.experiment.designer2.name} onChange={v => update(['experiment','designer2','name'], v)} />
          <Field label="الدور" value={s.experiment.designer2.role} onChange={v => update(['experiment','designer2','role'], v)} />
          <Field label="رابط الصوت (فويس نوت)" value={s.experiment.designer2.audioUrl} onChange={v => update(['experiment','designer2','audioUrl'], v)} placeholder="/audio/designer2.m4a أو رابط مباشر" />
          <Field label="الاقتباس" value={s.experiment.designer2.quote} onChange={v => update(['experiment','designer2','quote'], v)} multiline />
          <Field label="وقت الإنتاج" value={s.experiment.designer2.productionTime} onChange={v => update(['experiment','designer2','productionTime'], v)} placeholder="مثال: ساعة واحدة" />
        </SectionBox>
        <SectionBox title="بيانات المقارنة">
          <Field label="وقت الإنتاج الكلي (Render Time)" value={s.experiment.renderTime} onChange={v => update(['experiment','renderTime'], v)} placeholder="مثال: 3 ساعات" />
          <Field label="نص مقارنة الوقت" value={s.experiment.timeComparisonText} onChange={v => update(['experiment','timeComparisonText'], v)} multiline />
          <Field label="نص مقارنة الجودة" value={s.experiment.qualityComparisonText} onChange={v => update(['experiment','qualityComparisonText'], v)} multiline />
        </SectionBox>
      </>
    ),
    roadmap: (
      <>
        <SectionBox title="Hero خارطة الطريق">
          <Field label="العنوان" value={s.roadmap.title} onChange={v => update(['roadmap','title'], v)} />
          <Field label="النص الفرعي" value={s.roadmap.subtitle} onChange={v => update(['roadmap','subtitle'], v)} multiline />
        </SectionBox>
        {s.roadmap.stages.map((stage, i) => (
          <SectionBox key={i} title={`المرحلة ${stage.num} — ${stage.title}`}>
            <Field label="العنوان" value={stage.title} onChange={v => updateArr(['roadmap','stages'], i, 'title', v)} />
            <Field label="التسمية الفرعية" value={stage.subtitle} onChange={v => updateArr(['roadmap','stages'], i, 'subtitle', v)} />
            <Field label="الوصف" value={stage.desc} onChange={v => updateArr(['roadmap','stages'], i, 'desc', v)} multiline />
            <Field label="المميزات (سطر لكل ميزة)" multiline
              value={(stage.features || []).join('\n')}
              onChange={v => {
                const next = JSON.parse(JSON.stringify(local)) as SiteContent
                next.roadmap.stages[i].features = v.split('\n').filter(Boolean)
                setLocal(next)
              }} />
          </SectionBox>
        ))}
      </>
    ),
    gab: (
      <>
        <SectionBox title="صفحة GAB">
          <Field label="العنوان" value={s.gab.title} onChange={v => update(['gab','title'], v)} />
          <Field label="النص الفرعي" value={s.gab.subtitle} onChange={v => update(['gab','subtitle'], v)} multiline />
          <Field label="Generate — الوصف" value={s.gab.generateDesc} onChange={v => update(['gab','generateDesc'], v)} multiline />
          <Field label="Animate — الوصف" value={s.gab.animateDesc} onChange={v => update(['gab','animateDesc'], v)} multiline />
          <Field label="Build — الوصف" value={s.gab.buildDesc} onChange={v => update(['gab','buildDesc'], v)} multiline />
          <Field label="الجملة التحذيرية (Safety Line)" value={(s.gab as typeof s.gab & { safetyLine?: string }).safetyLine ?? ''} onChange={v => update(['gab','safetyLine'], v)} multiline />
        </SectionBox>
      </>
    ),
    nextStep: (
      <>
        <SectionBox title="Hero الخطوة القادمة">
          <Field label="العنوان" value={s.nextStep.title} onChange={v => update(['nextStep','title'], v)} />
          <Field label="النص الفرعي" value={s.nextStep.subtitle} onChange={v => update(['nextStep','subtitle'], v)} multiline />
          <Field label="الجملة الختامية" value={(s.nextStep as typeof s.nextStep & { closingText?: string }).closingText ?? ''} onChange={v => update(['nextStep','closingText'], v)} multiline />
        </SectionBox>
        <SectionBox title="بطاقات الدعم">
          {s.nextStep.items.map((item, i) => (
            <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < s.nextStep.items.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <Field label={`${i+1} — العنوان`} value={item.title} onChange={v => updateArr(['nextStep','items'], i, 'title', v)} />
              <Field label={`${i+1} — الوصف`} value={item.desc} onChange={v => updateArr(['nextStep','items'], i, 'desc', v)} multiline />
            </div>
          ))}
        </SectionBox>
      </>
    ),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #000039 0%, #00004E 60%, #0A0A72 100%)', fontFamily: 'Cairo, sans-serif', direction: 'rtl', color: 'var(--text-main)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--glass-border)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,78,0.92)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#00004E', fontWeight: 900, fontSize: 11 }}>GML</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 15 }}>لوحة الإدارة</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 20 }}>للعرض التجريبي فقط</span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/" target="_blank" style={{ fontSize: 12, color: 'var(--brand-green)', textDecoration: 'none', padding: '6px 14px', border: '1px solid rgba(65,211,126,0.28)', borderRadius: 8, transition: 'all 0.2s' }}>
            معاينة الموقع
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          {TABS.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                border: activeTab === tab.key ? '1px solid var(--brand-green)' : '1px solid var(--glass-border)',
                background: activeTab === tab.key ? 'var(--brand-green-soft)' : 'transparent',
                color: activeTab === tab.key ? 'var(--brand-green)' : 'var(--text-muted)',
                cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.2s',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>{tabContent[activeTab]}</div>

        {/* Action bar */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
          <button onClick={handleSave}
            style={{ background: saved ? 'rgba(65,211,126,0.3)' : 'var(--brand-green)', color: saved ? 'var(--brand-green)' : '#00004E', border: saved ? '1px solid var(--brand-green)' : 'none', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, fontFamily: 'Cairo, sans-serif', cursor: 'pointer', transition: 'all 0.3s' }}>
            {saved ? 'تم الحفظ' : 'حفظ التغييرات'}
          </button>
          <button onClick={() => setShowExport(!showExport)}
            style={{ background: 'transparent', color: 'var(--brand-green)', border: '1px solid rgba(65,211,126,0.28)', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, fontFamily: 'Cairo, sans-serif', cursor: 'pointer' }}>
            {showExport ? 'إخفاء JSON' : 'تصدير JSON'}
          </button>
          <button onClick={handleReset}
            style={{ background: 'transparent', color: 'rgba(255,100,100,0.7)', border: '1px solid rgba(255,100,100,0.2)', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, fontFamily: 'Cairo, sans-serif', cursor: 'pointer' }}>
            إعادة تعيين
          </button>
        </div>

        {/* Export JSON */}
        {showExport && (
          <div style={{ marginTop: 20, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>JSON الحالي</span>
              <button onClick={() => navigator.clipboard.writeText(JSON.stringify(local, null, 2))}
                style={{ fontSize: 11, color: 'var(--brand-green)', background: 'transparent', border: '1px solid rgba(65,211,126,0.25)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
                نسخ
              </button>
            </div>
            <textarea readOnly value={JSON.stringify(local, null, 2)}
              style={{ width: '100%', height: 200, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'monospace', padding: 12, resize: 'vertical', outline: 'none', direction: 'ltr' }} />
          </div>
        )}

        {/* Import JSON */}
        <div style={{ marginTop: 20, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 16, padding: 20 }}>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>
            استيراد JSON (الصق المحتوى هنا)
          </label>
          <textarea value={importText} onChange={e => setImportText(e.target.value)}
            placeholder='{"home": {...}, "library": {...}, ...}'
            style={{ width: '100%', height: 100, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: 'rgba(255,255,255,0.6)', fontSize: 11, fontFamily: 'monospace', padding: 12, resize: 'vertical', outline: 'none', direction: 'ltr', marginBottom: 10 }} />
          <button onClick={handleImport} disabled={!importText}
            style={{ background: importText ? 'rgba(65,211,126,0.12)' : 'rgba(255,255,255,0.05)', color: importText ? 'var(--brand-green)' : 'var(--text-muted)', border: `1px solid ${importText ? 'rgba(65,211,126,0.28)' : 'transparent'}`, padding: '8px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, fontFamily: 'Cairo, sans-serif', cursor: importText ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
            تطبيق الاستيراد
          </button>
        </div>
      </div>
    </div>
  )
}
