'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type StatusType = 'current' | 'next' | 'vision'
interface Step {
  number: string; title: string; status: string; statusType: StatusType
  description: string; tags: string[]
}

const STEPS: Step[] = [
  { number: '01', title: 'اعتماد المكتبة',               status: 'الحالية',        statusType: 'current',
    description: 'توحيد المعايير والهوية البصرية وجودة المحتوى لبناء أساس صلب وقابل للتوسع.',
    tags: ['أساس النظام', 'توحيد الهوية', 'قابل للتوسع'] },
  { number: '02', title: 'ورش عمل لمكتبة الموشن',        status: 'القادمة',        statusType: 'next',
    description: 'تمكين الفريق من استخدام المكتبة بكفاءة من خلال ورش تدريبية عملية ومنظمة.',
    tags: ['تمكين الفريق', 'تدريب عملي', 'استخدام فعّال'] },
  { number: '03', title: 'مكتبة 3D',                     status: 'القادمة',        statusType: 'next',
    description: 'توسيع المكتبة لتشمل نماذج وعناصر ثلاثية الأبعاد عالية الجودة جاهزة للإنتاج.',
    tags: ['عناصر ثلاثية الأبعاد', 'جاهزة للإنتاج', 'توسيع المكتبة'] },
  { number: '04', title: 'VR / AR',                       status: 'رؤية مستقبلية', statusType: 'vision',
    description: 'فتح المسار لاحقًا لتجارب تفاعلية وغامرة تعتمد على الأساس البصري الذي تم بناؤه.',
    tags: ['تجارب غامرة', 'تفاعل', 'رؤية مستقبلية'] },
]

const STATUS_STYLE: Record<StatusType, { bg: string; color: string; border: string }> = {
  current: { bg: 'rgba(65,211,126,0.12)', color: 'var(--brand-green)',      border: '1px solid rgba(65,211,126,0.3)' },
  next:    { bg: 'rgba(86,86,216,0.12)',  color: 'var(--brand-cyan)',        border: '1px solid rgba(86,86,216,0.3)' },
  vision:  { bg: 'rgba(32,32,168,0.18)', color: 'rgba(140,140,255,0.9)',    border: '1px solid rgba(86,86,216,0.28)' },
}

/* ── Injected keyframes ──────────────────────────────── */
const ROADMAP_CSS = `
@keyframes pathDash {
  from { stroke-dashoffset: 600; }
  to   { stroke-dashoffset: 0; }
}
@keyframes pathGlowPulse {
  0%,100% { opacity: 0.55; }
  50%      { opacity: 1; }
}
@keyframes particleRun {
  0%   { transform: translateX(-80px); opacity: 0; }
  8%   { opacity: 1; }
  92%  { opacity: 1; }
  100% { transform: translateX(calc(400vw + 80px)); opacity: 0; }
}
@keyframes stageContentIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes illEnter {
  from { opacity: 0; transform: scale(0.94) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes cubeRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes portalPulse {
  0%,100% { opacity: 0.55; r: 68; }
  50%      { opacity: 0.9;  r: 72; }
}
@keyframes chevronFade {
  0%,100% { opacity: 0.18; }
  50%      { opacity: 0.5; }
}
@keyframes approvalStamp {
  0%   { opacity: 0; transform: scale(1.5); }
  60%  { opacity: 1; transform: scale(0.92); }
  100% { opacity: 1; transform: scale(1); }
}
`

/* ═══════════════════════════════════════════════════════
   Stage Illustrations
═══════════════════════════════════════════════════════ */
function IllustrationLibrary({ active }: { active: boolean }) {
  const tr = (d: number) => active ? `opacity 0.45s ${d}s ease-out` : 'none'
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <filter id="libGlow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="libGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(20,20,140,0.95)"/>
          <stop offset="100%" stopColor="rgba(0,0,60,0.98)"/>
        </linearGradient>
      </defs>

      {/* Outer floating glow */}
      <ellipse cx="200" cy="155" rx="195" ry="145" fill="rgba(65,211,126,0.04)" style={{ opacity: active ? 1 : 0, transition: tr(0) }}/>

      {/* Main panel */}
      <rect x="10" y="10" width="380" height="280" rx="18" fill="url(#libGrad)"
        stroke="rgba(86,86,216,0.85)" strokeWidth="2"/>

      {/* Header bar */}
      <rect x="10" y="10" width="380" height="38" rx="18" fill="rgba(20,20,140,0.98)"/>
      <rect x="10" y="32" width="380" height="16" fill="rgba(20,20,140,0.98)"/>
      <circle cx="36" cy="29" r="5.5" fill="rgba(255,80,80,0.9)"/>
      <circle cx="55" cy="29" r="5.5" fill="rgba(255,180,0,0.9)"/>
      <circle cx="74" cy="29" r="5.5" fill="rgba(65,211,126,0.9)"/>
      <text x="200" y="34" textAnchor="middle" fill="rgba(244,251,255,0.7)"
        fontSize="10" fontFamily="monospace" letterSpacing="0.1em">GML MOTION LIBRARY v1.0</text>

      {/* Cards — 3×2 grid */}
      {[
        { x: 22,  y: 56, w: 110, h: 76, label: 'Lower Third', icon: 'lt',   c: 'rgba(65,211,126,0.2)',  bc: 'rgba(65,211,126,0.9)' },
        { x: 145, y: 56, w: 110, h: 76, label: 'Counter',      icon: 'cnt',  c: 'rgba(86,86,216,0.25)',  bc: 'rgba(86,86,216,0.9)' },
        { x: 268, y: 56, w: 110, h: 76, label: 'Transition',   icon: 'tr',   c: 'rgba(86,86,216,0.2)',   bc: 'rgba(86,86,216,0.75)' },
        { x: 22,  y: 146, w: 110, h: 76, label: 'Text Box',   icon: 'txt',  c: 'rgba(86,86,216,0.2)',   bc: 'rgba(86,86,216,0.75)' },
        { x: 145, y: 146, w: 110, h: 76, label: 'Icon Card',  icon: 'icon', c: 'rgba(40,40,180,0.5)',   bc: 'rgba(86,86,216,0.85)' },
        { x: 268, y: 146, w: 110, h: 76, label: 'Background', icon: 'bg',   c: 'rgba(65,211,126,0.15)', bc: 'rgba(65,211,126,0.7)' },
      ].map((card, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: tr(i * 0.07) }}>
          <rect x={card.x} y={card.y} width={card.w} height={card.h} rx="10"
            fill={card.c} stroke={card.bc} strokeWidth="1.5"/>
          {card.icon === 'lt' && <>
            <rect x={card.x+8} y={card.y+14} width={card.w-16} height="9" rx="3" fill="rgba(65,211,126,0.95)"/>
            <rect x={card.x+8} y={card.y+27} width={(card.w-16)*0.65} height="6" rx="3" fill="rgba(65,211,126,0.55)"/>
          </>}
          {card.icon === 'cnt' && <>
            <text x={card.x+card.w/2} y={card.y+34} textAnchor="middle" fill="rgba(120,120,255,1)"
              fontSize="24" fontWeight="900" fontFamily="monospace">42</text>
            <rect x={card.x+14} y={card.y+42} width={card.w-28} height="4" rx="2" fill="rgba(86,86,216,0.35)"/>
            <rect x={card.x+14} y={card.y+42} width={(card.w-28)*0.6} height="4" rx="2" fill="rgba(86,86,216,0.95)"/>
          </>}
          {card.icon === 'tr' && <>
            <rect x={card.x+14} y={card.y+16} width="30" height="42" rx="5" fill="rgba(86,86,216,0.75)"/>
            <path d={`M ${card.x+52} ${card.y+37} L ${card.x+66} ${card.y+37}`} stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
            <path d={`M ${card.x+62} ${card.y+31} L ${card.x+66} ${card.y+37} L ${card.x+62} ${card.y+43}`} stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x={card.x+70} y={card.y+16} width="28" height="42" rx="5" fill="rgba(86,86,216,0.5)"/>
          </>}
          {card.icon === 'txt' && <>
            <rect x={card.x+8} y={card.y+14} width={card.w-16} height="5" rx="2.5" fill="rgba(120,120,255,0.9)"/>
            <rect x={card.x+8} y={card.y+23} width={card.w-28} height="5" rx="2.5" fill="rgba(120,120,255,0.65)"/>
            <rect x={card.x+8} y={card.y+32} width={card.w-20} height="5" rx="2.5" fill="rgba(120,120,255,0.45)"/>
            <rect x={card.x+8} y={card.y+41} width={card.w-38} height="5" rx="2.5" fill="rgba(120,120,255,0.25)"/>
          </>}
          {card.icon === 'icon' && <>
            {[0,1,2,3].map(j => (
              <rect key={j} x={card.x+10+(j%2)*30} y={card.y+12+Math.floor(j/2)*26} width="24" height="20" rx="5"
                fill={j===0?'rgba(65,211,126,0.75)':j===1?'rgba(86,86,216,0.7)':'rgba(86,86,216,0.55)'}/>
            ))}
          </>}
          {card.icon === 'bg' && <>
            <rect x={card.x+8} y={card.y+10} width={card.w-16} height={card.h-22} rx="6"
              fill="rgba(20,20,120,0.7)" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"/>
            <ellipse cx={card.x+card.w/2} cy={card.y+card.h/2-4} rx="24" ry="15"
              fill="rgba(65,211,126,0.3)" stroke="rgba(65,211,126,0.8)" strokeWidth="1.5"/>
          </>}
          <text x={card.x+card.w/2} y={card.y+card.h-7} textAnchor="middle"
            fill="rgba(244,251,255,0.55)" fontSize="8" fontFamily="monospace" letterSpacing="0.04em">{card.label}</text>
        </g>
      ))}

      {/* Approval stamp */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.52) }}>
        <circle cx="200" cy="155" r="54" fill="rgba(0,0,40,0.88)" stroke="rgba(65,211,126,0.9)" strokeWidth="2.5" filter="url(#libGlow)"/>
        <circle cx="200" cy="155" r="46" fill="none" stroke="rgba(65,211,126,0.4)" strokeWidth="1" strokeDasharray="6 4"/>
        <path d="M 179 156 L 195 173 L 225 142" stroke="rgba(65,211,126,1)" strokeWidth="5"
          strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#libGlow)"/>
        <text x="200" y="208" textAnchor="middle" fill="rgba(65,211,126,0.85)"
          fontSize="9" fontFamily="monospace" letterSpacing="0.14em">APPROVED</text>
      </g>

      {/* Status bar */}
      <rect x="22" y="234" width="356" height="44" rx="8" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <circle cx="42" cy="256" r="5.5" fill="rgba(65,211,126,0.95)" filter="url(#libGlow)" style={{ animation: 'pathGlowPulse 2s infinite' }}/>
      <text x="56" y="260" fill="rgba(65,211,126,0.95)" fontSize="11" fontWeight="700" fontFamily="monospace">جارٍ التنفيذ</text>
      <text x="368" y="260" textAnchor="end" fill="rgba(244,251,255,0.5)" fontSize="10" fontFamily="monospace">6 عناصر جاهزة</text>

      {/* Floating orbs outside the panel */}
      {[
        { cx: -18, cy: 80,  r: 8,  c: 'rgba(65,211,126,0.7)',  d: 0.0 },
        { cx: -22, cy: 160, r: 5,  c: 'rgba(86,86,216,0.8)',   d: 0.15 },
        { cx: 418, cy: 100, r: 7,  c: 'rgba(86,86,216,0.7)',   d: 0.1 },
        { cx: 422, cy: 200, r: 5,  c: 'rgba(65,211,126,0.65)', d: 0.2 },
        { cx: 80,  cy: -14, r: 4,  c: 'rgba(65,211,126,0.6)',  d: 0.05 },
        { cx: 320, cy: -18, r: 6,  c: 'rgba(86,86,216,0.75)',  d: 0.12 },
        { cx: 140, cy: 316, r: 5,  c: 'rgba(65,211,126,0.55)', d: 0.18 },
        { cx: 280, cy: 314, r: 4,  c: 'rgba(86,86,216,0.65)',  d: 0.08 },
      ].map((o, i) => (
        <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.c} filter="url(#libGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.3 + o.d), animation: `pathGlowPulse ${2.2 + i * 0.3}s ${i * 0.2}s ease-in-out infinite` }}/>
      ))}

      {/* Floating tags outside */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.65) }}>
        <rect x="-60" y="120" width="52" height="22" rx="11" fill="rgba(65,211,126,0.15)" stroke="rgba(65,211,126,0.7)" strokeWidth="1"/>
        <text x="-34" y="135" textAnchor="middle" fill="rgba(65,211,126,0.9)" fontSize="7.5" fontFamily="monospace">READY</text>
      </g>
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.75) }}>
        <rect x="410" y="155" width="64" height="22" rx="11" fill="rgba(86,86,216,0.15)" stroke="rgba(86,86,216,0.7)" strokeWidth="1"/>
        <text x="442" y="170" textAnchor="middle" fill="rgba(120,120,255,0.9)" fontSize="7.5" fontFamily="monospace">v 1.0</text>
      </g>
    </svg>
  )
}

function IllustrationWorkshop({ active }: { active: boolean }) {
  const tr = (d: number) => active ? `opacity 0.45s ${d}s ease-out` : 'none'
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,50,0.95)"/>
          <stop offset="100%" stopColor="rgba(20,20,160,0.6)"/>
        </linearGradient>
        <filter id="wsGlow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Floor */}
      <line x1="0" y1="248" x2="400" y2="248" stroke="rgba(86,86,216,0.45)" strokeWidth="1.5"/>
      <line x1="0" y1="252" x2="400" y2="252" stroke="rgba(86,86,216,0.15)" strokeWidth="1"/>

      {/* Screen */}
      <rect x="108" y="56" width="184" height="126" rx="10" fill="url(#screenGrad)"
        stroke="rgba(86,86,216,0.95)" strokeWidth="2.5"/>
      <rect x="108" y="56" width="184" height="16" rx="10" fill="rgba(20,20,150,0.98)"/>
      <rect x="108" y="66" width="184" height="6" fill="rgba(20,20,150,0.98)"/>
      {/* Screen dots */}
      <circle cx="122" cy="64" r="3" fill="rgba(255,80,80,0.85)"/>
      <circle cx="133" cy="64" r="3" fill="rgba(255,180,0,0.85)"/>
      <circle cx="144" cy="64" r="3" fill="rgba(65,211,126,0.85)"/>

      {/* Screen content */}
      <rect x="118" y="79" width="52" height="38" rx="5" fill="rgba(65,211,126,0.3)" stroke="rgba(65,211,126,0.85)" strokeWidth="1.5"
        style={{ opacity: active ? 1 : 0, transition: tr(0.2) }}/>
      <rect x="178" y="79" width="52" height="38" rx="5" fill="rgba(86,86,216,0.4)" stroke="rgba(86,86,216,0.9)" strokeWidth="1.5"
        style={{ opacity: active ? 1 : 0, transition: tr(0.3) }}/>
      <rect x="238" y="79" width="44" height="38" rx="5" fill="rgba(86,86,216,0.3)" stroke="rgba(86,86,216,0.75)" strokeWidth="1.5"
        style={{ opacity: active ? 1 : 0, transition: tr(0.4) }}/>
      {/* Progress bar */}
      <rect x="118" y="125" width="164" height="6" rx="3" fill="rgba(86,86,216,0.3)"/>
      <rect x="118" y="125" width="95" height="6" rx="3" fill="rgba(65,211,126,0.85)" filter="url(#wsGlow)"
        style={{ opacity: active ? 1 : 0, transition: tr(0.5) }}/>
      <rect x="118" y="138" width="164" height="3" rx="1.5" fill="rgba(255,255,255,0.12)"/>

      {/* Screen stand */}
      <rect x="192" y="182" width="16" height="26" rx="3" fill="rgba(86,86,216,0.65)"/>
      <rect x="170" y="206" width="60" height="8" rx="4" fill="rgba(86,86,216,0.75)"/>

      {/* Person left */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.1) }}>
        <circle cx="54" cy="144" r="16" fill="rgba(30,30,180,0.85)" stroke="rgba(86,86,216,0.9)" strokeWidth="2"/>
        <rect x="32" y="166" width="44" height="60" rx="12" fill="rgba(30,30,180,0.75)" stroke="rgba(86,86,216,0.8)" strokeWidth="1.5"/>
        <path d="M 76 192 L 108 164" stroke="rgba(86,86,216,0.85)" strokeWidth="7" strokeLinecap="round"/>
        {/* Name tag */}
        <rect x="14" y="215" width="62" height="18" rx="9" fill="rgba(65,211,126,0.15)" stroke="rgba(65,211,126,0.7)" strokeWidth="1"/>
        <text x="45" y="228" textAnchor="middle" fill="rgba(65,211,126,0.9)" fontSize="7.5" fontFamily="monospace">DESIGNER</text>
      </g>

      {/* Person right */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.15) }}>
        <circle cx="346" cy="144" r="16" fill="rgba(20,20,140,0.8)" stroke="rgba(86,86,216,0.85)" strokeWidth="2"/>
        <rect x="324" y="166" width="44" height="60" rx="12" fill="rgba(20,20,140,0.7)" stroke="rgba(86,86,216,0.7)" strokeWidth="1.5"/>
        <path d="M 324 192 L 292 164" stroke="rgba(86,86,216,0.75)" strokeWidth="7" strokeLinecap="round"/>
        <rect x="322" y="215" width="62" height="18" rx="9" fill="rgba(86,86,216,0.15)" stroke="rgba(86,86,216,0.7)" strokeWidth="1"/>
        <text x="353" y="228" textAnchor="middle" fill="rgba(120,120,255,0.9)" fontSize="7.5" fontFamily="monospace">DIRECTOR</text>
      </g>

      {/* Floating asset blocks */}
      {[
        { x: 10, y: 100, w: 36, h: 24, c: 'rgba(65,211,126,0.55)', bc: 'rgba(65,211,126,0.9)', d: 0.3 },
        { x: 14, y: 132, w: 30, h: 22, c: 'rgba(86,86,216,0.6)',   bc: 'rgba(86,86,216,0.9)', d: 0.38 },
        { x: 354, y: 100, w: 36, h: 24, c: 'rgba(86,86,216,0.55)', bc: 'rgba(86,86,216,0.9)', d: 0.35 },
        { x: 358, y: 132, w: 28, h: 22, c: 'rgba(65,211,126,0.45)', bc: 'rgba(65,211,126,0.8)', d: 0.42 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="5" fill={b.c}
          stroke={b.bc} strokeWidth="1.5"
          style={{ opacity: active ? 1 : 0, transition: tr(b.d) }}/>
      ))}

      {/* Connection dashed lines */}
      <line x1="46" y1="112" x2="108" y2="100" stroke="rgba(65,211,126,0.5)" strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="44" y1="143" x2="108" y2="128" stroke="rgba(86,86,216,0.45)" strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="354" y1="112" x2="292" y2="100" stroke="rgba(86,86,216,0.45)" strokeWidth="1.5" strokeDasharray="4 3"/>
      <line x1="358" y1="143" x2="292" y2="128" stroke="rgba(65,211,126,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>

      {/* Top floating tags */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.6) }}>
        <rect x="120" y="22" width="72" height="24" rx="12" fill="rgba(65,211,126,0.15)" stroke="rgba(65,211,126,0.75)" strokeWidth="1.5"/>
        <circle cx="133" cy="34" r="3.5" fill="rgba(65,211,126,0.9)" style={{ animation: 'pathGlowPulse 1.8s infinite' }}/>
        <text x="168" y="38" textAnchor="middle" fill="rgba(65,211,126,0.95)" fontSize="8" fontFamily="monospace">LIVE SESSION</text>
      </g>
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.7) }}>
        <rect x="208" y="22" width="72" height="24" rx="12" fill="rgba(86,86,216,0.15)" stroke="rgba(86,86,216,0.75)" strokeWidth="1.5"/>
        <text x="244" y="38" textAnchor="middle" fill="rgba(120,120,255,0.95)" fontSize="8" fontFamily="monospace">3 MEMBERS</text>
      </g>

      {/* Floating orbs outside */}
      {[
        { cx: -16, cy: 90,  r: 7, c: 'rgba(65,211,126,0.75)', d: 0.0 },
        { cx: -20, cy: 190, r: 5, c: 'rgba(86,86,216,0.8)',   d: 0.15 },
        { cx: 416, cy: 85,  r: 6, c: 'rgba(86,86,216,0.75)',  d: 0.1 },
        { cx: 420, cy: 195, r: 5, c: 'rgba(65,211,126,0.65)', d: 0.2 },
        { cx: 200, cy: -16, r: 5, c: 'rgba(86,86,216,0.7)',   d: 0.08 },
        { cx: 200, cy: 316, r: 5, c: 'rgba(65,211,126,0.6)',  d: 0.18 },
      ].map((o, i) => (
        <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.c} filter="url(#wsGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.3 + o.d), animation: `pathGlowPulse ${2 + i * 0.4}s ${i * 0.2}s ease-in-out infinite` }}/>
      ))}
    </svg>
  )
}

function Illustration3D({ active }: { active: boolean }) {
  const tr = (d: number) => active ? `opacity 0.45s ${d}s ease-out` : 'none'
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <filter id="tdGlow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Isometric grid floor */}
      {Array.from({ length: 7 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => {
          const x = 60 + col * 56 - row * 28
          const y = 200 + row * 16 - col * 8
          return (
            <path key={`${row}-${col}`}
              d={`M ${x},${y} L ${x+28},${y-8} L ${x+56},${y} L ${x+28},${y+8} Z`}
              fill="rgba(20,20,120,0.18)" stroke="rgba(86,86,216,0.38)" strokeWidth="0.8"/>
          )
        })
      )}

      {/* Small isometric cubes */}
      {[
        { tx: 38,  ty: 148, s: 1.0,  c1: 'rgba(86,86,216,0.85)',  c2: 'rgba(20,20,140,0.95)', c3: 'rgba(86,86,216,0.65)',  d: 0.1 },
        { tx: 96,  ty: 128, s: 0.8,  c1: 'rgba(65,211,126,0.75)', c2: 'rgba(20,140,70,0.65)', c3: 'rgba(65,211,126,0.55)', d: 0.2 },
        { tx: 300, ty: 148, s: 1.0,  c1: 'rgba(86,86,216,0.8)',   c2: 'rgba(20,20,140,0.9)',  c3: 'rgba(86,86,216,0.6)',   d: 0.15 },
        { tx: 346, ty: 126, s: 0.75, c1: 'rgba(65,211,126,0.65)', c2: 'rgba(20,140,70,0.55)', c3: 'rgba(65,211,126,0.5)',  d: 0.25 },
        { tx: 56,  ty: 208, s: 0.7,  c1: 'rgba(86,86,216,0.7)',   c2: 'rgba(20,20,140,0.8)',  c3: 'rgba(86,86,216,0.55)',  d: 0.3 },
        { tx: 316, ty: 208, s: 0.7,  c1: 'rgba(86,86,216,0.7)',   c2: 'rgba(20,20,140,0.8)',  c3: 'rgba(86,86,216,0.55)',  d: 0.35 },
        { tx: 148, ty: 50,  s: 0.55, c1: 'rgba(65,211,126,0.6)',  c2: 'rgba(20,140,70,0.5)',  c3: 'rgba(65,211,126,0.45)', d: 0.4 },
        { tx: 248, ty: 46,  s: 0.5,  c1: 'rgba(86,86,216,0.65)',  c2: 'rgba(20,20,140,0.75)', c3: 'rgba(86,86,216,0.5)',   d: 0.45 },
      ].map((cube, i) => {
        const s = cube.s * 30
        const { tx: cx, ty: cy } = cube
        return (
          <g key={i} style={{ opacity: active ? 1 : 0, transition: tr(cube.d) }}>
            <path d={`M ${cx},${cy} L ${cx+s},${cy-s*0.5} L ${cx+s*2},${cy} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c1}/>
            <path d={`M ${cx+s*2},${cy} L ${cx+s*2},${cy+s*0.9} L ${cx+s},${cy+s*1.4} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c2}/>
            <path d={`M ${cx},${cy} L ${cx},${cy+s*0.9} L ${cx+s},${cy+s*1.4} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c3}/>
          </g>
        )
      })}

      {/* Central wireframe cube */}
      <g transform="translate(200, 142)" style={active ? { animation: 'cubeRotate 8s linear infinite' } : {}}>
        <rect x="-44" y="-44" width="88" height="88" rx="5"
          fill="rgba(20,20,160,0.45)" stroke="rgba(86,86,216,0.95)" strokeWidth="2"/>
        <path d="M -44,-44 L -24,-60 L 64,-60 L 44,-44" stroke="rgba(86,86,216,0.85)" strokeWidth="2" fill="rgba(86,86,216,0.22)"/>
        <path d="M 44,-44 L 64,-60 L 64,28 L 44,44"   stroke="rgba(86,86,216,0.75)" strokeWidth="2" fill="rgba(20,20,140,0.3)"/>
        <circle cx="0" cy="0" r="26" fill="rgba(65,211,126,0.12)" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"/>
        <circle cx="0" cy="0" r="13" fill="rgba(65,211,126,0.2)" stroke="rgba(65,211,126,0.9)" strokeWidth="2" filter="url(#tdGlow)"/>
        <line x1="-44" y1="-44" x2="44" y2="44" stroke="rgba(86,86,216,0.35)" strokeWidth="1.5" strokeDasharray="3 4"/>
        <line x1="44" y1="-44" x2="-44" y2="44" stroke="rgba(86,86,216,0.35)" strokeWidth="1.5" strokeDasharray="3 4"/>
      </g>

      {/* Labels */}
      {[
        { x: 18, y: 88, label: '3D ASSETS', c: 'rgba(86,86,216,0.9)', bg: 'rgba(86,86,216,0.15)' },
        { x: 298, y: 88, label: 'MODELS',   c: 'rgba(65,211,126,0.9)', bg: 'rgba(65,211,126,0.12)' },
      ].map((tag, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: tr(0.5 + i * 0.1) }}>
          <rect x={tag.x} y={tag.y-16} width={tag.label.length * 8 + 18} height="22" rx="6"
            fill={tag.bg} stroke={tag.c} strokeWidth="1.5"/>
          <text x={tag.x+9} y={tag.y} fill={tag.c} fontSize="9" fontFamily="monospace" letterSpacing="0.08em">{tag.label}</text>
        </g>
      ))}

      {/* Orbit ring around center cube */}
      <ellipse cx="200" cy="142" rx="75" ry="22" fill="none"
        stroke="rgba(65,211,126,0.3)" strokeWidth="1" strokeDasharray="6 4"
        style={{ opacity: active ? 1 : 0, transition: tr(0.4) }}/>

      {/* Particles inside */}
      {[{ cx: 155, cy: 58 }, { cx: 245, cy: 52 }, { cx: 165, cy: 250 }, { cx: 240, cy: 256 }, { cx: 100, cy: 170 }, { cx: 310, cy: 165 }].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="3" fill={i % 2 === 0 ? 'rgba(65,211,126,0.75)' : 'rgba(86,86,216,0.8)'}
          filter="url(#tdGlow)"
          style={{ animation: `pathGlowPulse ${2 + i * 0.35}s ${i * 0.3}s ease-in-out infinite` }}/>
      ))}

      {/* Floating orbs outside */}
      {[
        { cx: -18, cy: 100, r: 8,  c: 'rgba(86,86,216,0.8)',   d: 0.0 },
        { cx: -14, cy: 180, r: 5,  c: 'rgba(65,211,126,0.75)', d: 0.12 },
        { cx: 418, cy: 95,  r: 7,  c: 'rgba(65,211,126,0.8)',  d: 0.08 },
        { cx: 415, cy: 185, r: 5,  c: 'rgba(86,86,216,0.75)',  d: 0.18 },
        { cx: 200, cy: -18, r: 6,  c: 'rgba(86,86,216,0.8)',   d: 0.05 },
        { cx: 90,  cy: 318, r: 4,  c: 'rgba(65,211,126,0.65)', d: 0.2 },
        { cx: 310, cy: 316, r: 4,  c: 'rgba(86,86,216,0.7)',   d: 0.15 },
      ].map((o, i) => (
        <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.c} filter="url(#tdGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.35 + o.d), animation: `pathGlowPulse ${2.2 + i * 0.3}s ${i * 0.18}s ease-in-out infinite` }}/>
      ))}
    </svg>
  )
}

function IllustrationVR({ active }: { active: boolean }) {
  const tr = (d: number) => active ? `opacity 0.45s ${d}s ease-out` : 'none'
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <radialGradient id="portalGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(65,211,126,0.45)"/>
          <stop offset="55%" stopColor="rgba(20,20,160,0.25)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="vrGlow">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="vrGlowSoft">
          <feGaussianBlur stdDeviation="10" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background rings */}
      {[140, 112, 84].map((r, i) => (
        <circle key={i} cx="200" cy="148" r={r}
          stroke={i === 0 ? 'rgba(86,86,216,0.3)' : i === 1 ? 'rgba(86,86,216,0.45)' : 'rgba(65,211,126,0.5)'}
          strokeWidth={i === 2 ? '2' : '1.5'}
          fill={i === 0 ? 'url(#portalGrad)' : 'none'}
          strokeDasharray={i === 0 ? '8 6' : i === 1 ? '5 4' : 'none'}
          style={{
            opacity: active ? 1 : 0,
            transition: tr(i * 0.25),
            animation: active ? `pathGlowPulse ${3 + i}s ${i * 0.3}s ease-in-out infinite` : 'none',
          }}/>
      ))}

      {/* Portal body */}
      <circle cx="200" cy="148" r="60" fill="rgba(0,0,50,0.85)"
        stroke="rgba(65,211,126,0.9)" strokeWidth="3" filter="url(#vrGlow)"
        style={{ opacity: active ? 1 : 0, transition: tr(0.1) }}/>
      <circle cx="200" cy="148" r="48" fill="rgba(20,20,160,0.55)"
        stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"
        style={{ opacity: active ? 1 : 0, transition: tr(0.15) }}/>

      {/* Portal inner */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.2) }}>
        <circle cx="200" cy="148" r="32" fill="rgba(65,211,126,0.12)"
          style={active ? { animation: 'portalPulse 2.5s ease-in-out infinite' } : {}}/>
        <text x="200" y="145" textAnchor="middle" fill="rgba(65,211,126,0.95)"
          fontSize="10" fontFamily="monospace" fontWeight="700" letterSpacing="0.16em">VR / AR</text>
        <text x="200" y="160" textAnchor="middle" fill="rgba(65,211,126,0.55)"
          fontSize="7.5" fontFamily="monospace" letterSpacing="0.08em">FUTURE</text>
      </g>

      {/* Paths entering portal */}
      <path d="M 0,148 Q 90,148 140,148" stroke="rgba(65,211,126,0.85)" strokeWidth="3"
        fill="none" filter="url(#vrGlow)"
        style={{ opacity: active ? 1 : 0, transition: tr(0.3) }}/>
      <path d="M 0,148 Q 90,148 140,148" stroke="rgba(65,211,126,0.35)" strokeWidth="10"
        fill="none" filter="url(#vrGlowSoft)"
        style={{ opacity: active ? 1 : 0, transition: tr(0.3) }}/>
      <path d="M 400,148 Q 310,148 260,148" stroke="rgba(86,86,216,0.7)" strokeWidth="2.5"
        fill="none" filter="url(#vrGlow)"
        style={{ opacity: active ? 1 : 0, transition: tr(0.35) }}/>

      {/* Floating UI panels */}
      {[
        { x: 10,  y: 52,  w: 96, h: 64, accent: 'rgba(65,211,126,0.8)', d: 0.2 },
        { x: 10,  y: 184, w: 82, h: 50, accent: 'rgba(86,86,216,0.8)',  d: 0.35 },
        { x: 294, y: 52,  w: 96, h: 64, accent: 'rgba(86,86,216,0.8)',  d: 0.25 },
        { x: 308, y: 184, w: 82, h: 50, accent: 'rgba(65,211,126,0.75)', d: 0.4 },
      ].map((panel, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: tr(panel.d) }}>
          <rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx="10"
            fill="rgba(20,20,150,0.55)" stroke={panel.accent} strokeWidth="2"/>
          <rect x={panel.x+7} y={panel.y+8} width={panel.w-14} height="5" rx="2.5" fill={panel.accent}/>
          <rect x={panel.x+7} y={panel.y+17} width={(panel.w-14)*0.65} height="3.5" rx="1.5" fill="rgba(255,255,255,0.25)"/>
          {panel.h > 55 && <>
            <rect x={panel.x+7} y={panel.y+25} width={(panel.w-14)*0.8} height="3.5" rx="1.5" fill="rgba(255,255,255,0.18)"/>
            <rect x={panel.x+7} y={panel.y+33} width={(panel.w-14)*0.5} height="3.5" rx="1.5" fill="rgba(255,255,255,0.12)"/>
            <rect x={panel.x+7} y={panel.y+48} width={panel.w-14} height="5" rx="2.5" fill="rgba(0,0,0,0.3)"/>
            <rect x={panel.x+7} y={panel.y+48} width={(panel.w-14)*0.45} height="5" rx="2.5" fill={panel.accent} style={{ opacity: 0.8 }}/>
          </>}
          <circle cx={panel.x + panel.w - 6} cy={panel.y + 6} r="5" fill={panel.accent} filter="url(#vrGlow)"/>
        </g>
      ))}

      {/* Connecting lines panels → portal */}
      {[
        { x1: 106, y1: 84,  x2: 148, y2: 122 },
        { x1: 92,  y1: 208, x2: 148, y2: 172 },
        { x1: 294, y1: 84,  x2: 252, y2: 122 },
        { x1: 308, y1: 208, x2: 254, y2: 172 },
      ].map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={i % 2 === 0 ? 'rgba(65,211,126,0.45)' : 'rgba(86,86,216,0.45)'}
          strokeWidth="1.5" strokeDasharray="5 3"/>
      ))}

      {/* Light pulses */}
      {[{ cx: 148, cy: 78 }, { cx: 258, cy: 214 }, { cx: 136, cy: 218 }, { cx: 268, cy: 70 }, { cx: 200, cy: 30 }, { cx: 200, cy: 268 }].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="3.5" fill={i % 2 === 0 ? 'rgba(65,211,126,0.85)' : 'rgba(86,86,216,0.9)'}
          filter="url(#vrGlow)"
          style={{ animation: `pathGlowPulse ${1.5 + i * 0.45}s ${i * 0.35}s ease-in-out infinite` }}/>
      ))}

      {/* Floating orbs outside */}
      {[
        { cx: -20, cy: 110, r: 8,  c: 'rgba(65,211,126,0.8)',  d: 0.0 },
        { cx: -16, cy: 190, r: 5,  c: 'rgba(86,86,216,0.85)', d: 0.12 },
        { cx: 420, cy: 105, r: 7,  c: 'rgba(86,86,216,0.8)',  d: 0.08 },
        { cx: 416, cy: 192, r: 5,  c: 'rgba(65,211,126,0.75)', d: 0.18 },
        { cx: 80,  cy: -16, r: 5,  c: 'rgba(65,211,126,0.75)', d: 0.06 },
        { cx: 320, cy: -18, r: 6,  c: 'rgba(86,86,216,0.8)',  d: 0.14 },
        { cx: 100, cy: 318, r: 4,  c: 'rgba(86,86,216,0.7)',  d: 0.1 },
        { cx: 300, cy: 316, r: 5,  c: 'rgba(65,211,126,0.7)', d: 0.2 },
      ].map((o, i) => (
        <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.c} filter="url(#vrGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.3 + o.d), animation: `pathGlowPulse ${2 + i * 0.3}s ${i * 0.18}s ease-in-out infinite` }}/>
      ))}
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════
   Connected Path — spans full track behind all stages
═══════════════════════════════════════════════════════ */
function RoadmapConnectedPath({ activeIndex }: { activeIndex: number }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
      overflow: 'hidden',
    }}>
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <filter id="pathGlowFilter">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="pathGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%"   stopColor="rgba(65,211,126,0.6)"/>
            <stop offset="30%"  stopColor="rgba(65,211,126,0.8)"/>
            <stop offset="50%"  stopColor="rgba(86,86,216,0.7)"/>
            <stop offset="70%"  stopColor="rgba(65,211,126,0.7)"/>
            <stop offset="100%" stopColor="rgba(140,140,255,0.5)"/>
          </linearGradient>
        </defs>

        {/* Faint wide glow track */}
        <line x1="0" y1="50%" x2="100%" y2="50%"
          stroke="rgba(65,211,126,0.06)" strokeWidth="40"/>

        {/* Base track line */}
        <line x1="0" y1="50%" x2="100%" y2="50%"
          stroke="rgba(86,86,216,0.18)" strokeWidth="1.5"/>

        {/* Animated glowing dashes */}
        <line x1="0" y1="50%" x2="100%" y2="50%"
          stroke="url(#pathGradient)" strokeWidth="2"
          strokeDasharray="12 28"
          style={{ animation: 'pathDash 1.8s linear infinite' }}
          filter="url(#pathGlowFilter)"/>

        {/* Stage node circles at 12.5%, 37.5%, 62.5%, 87.5% of track width */}
        {STEPS.map((step, i) => {
          const cx = `${12.5 + i * 25}%`
          const isActive = i === activeIndex
          const isPast   = i < activeIndex
          return (
            <g key={i}>
              {/* Outer glow ring */}
              {isActive && (
                <circle cx={cx} cy="50%" r="22" fill="none"
                  stroke="rgba(65,211,126,0.25)" strokeWidth="1.5"
                  style={{ animation: 'portalPulse 2s ease-in-out infinite' }}/>
              )}
              {/* Node circle */}
              <circle cx={cx} cy="50%" r={isActive ? 12 : 8}
                fill={isActive ? 'rgba(0,0,50,0.9)' : isPast ? 'rgba(65,211,126,0.12)' : 'rgba(32,32,168,0.15)'}
                stroke={isActive ? 'rgba(65,211,126,0.9)' : isPast ? 'rgba(65,211,126,0.5)' : 'rgba(86,86,216,0.4)'}
                strokeWidth={isActive ? 2 : 1.5}
                filter={isActive ? 'url(#pathGlowFilter)' : undefined}
                style={{ transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)' }}/>
              {/* Active node inner dot */}
              {isActive && <circle cx={cx} cy="50%" r="4" fill="rgba(65,211,126,0.9)"/>}
              {/* Stage number */}
              <text x={cx} dy="-20" textAnchor="middle"
                fill={isActive ? 'rgba(65,211,126,0.85)' : 'rgba(244,251,255,0.28)'}
                fontSize="9" fontFamily="monospace" letterSpacing="0.06em"
                style={{ transition: 'all 0.4s ease' }}>
                {step.number}
              </text>
            </g>
          )
        })}

        {/* Chevrons between stages */}
        {[25, 50, 75].map((pct, i) => (
          <g key={i} transform={`translate(${pct}%, 50%)`}
            style={{ animation: `chevronFade ${2.2 + i * 0.3}s ${i * 0.2}s ease-in-out infinite` }}>
            <path d="M -5,-7 L 5,0 L -5,7" stroke="rgba(86,86,216,0.45)" strokeWidth="1.5"
              fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        ))}

        {/* Moving particles along path */}
        {[0, 1, 2].map(i => (
          <circle key={i} cx="0" cy="50%" r="3" fill="rgba(65,211,126,0.8)"
            filter="url(#pathGlowFilter)"
            style={{ animation: `particleRun ${4 + i * 1.5}s ${i * 1.2}s linear infinite` }}/>
        ))}
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Progress Route Indicator
═══════════════════════════════════════════════════════ */
function RoadmapProgressRoute({ active, onGoTo }: { active: number; onGoTo: (i: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '16px 0' }}>
      {STEPS.map((step, i) => {
        const isActive = i === active
        const isPast   = i < active
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Connecting segment */}
            {i > 0 && (
              <div style={{
                width: 48, height: 2, borderRadius: 1,
                background: isPast
                  ? 'linear-gradient(90deg, rgba(65,211,126,0.7), rgba(65,211,126,0.4))'
                  : 'rgba(255,255,255,0.1)',
                transition: 'background 0.5s ease',
              }}/>
            )}
            {/* Stage node button */}
            <button
              onClick={() => onGoTo(i)}
              title={step.title}
              style={{
                width: isActive ? 36 : 28, height: isActive ? 36 : 28,
                borderRadius: '50%',
                background: isActive
                  ? 'rgba(0,0,50,0.9)'
                  : isPast ? 'rgba(65,211,126,0.08)' : 'rgba(255,255,255,0.04)',
                border: isActive
                  ? '2px solid rgba(65,211,126,0.9)'
                  : isPast ? '1.5px solid rgba(65,211,126,0.45)' : '1.5px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: isActive ? '0 0 20px rgba(65,211,126,0.3), 0 0 8px rgba(65,211,126,0.2)' : 'none',
                flexShrink: 0,
              }}
            >
              <span style={{
                fontSize: isActive ? 10 : 9, fontWeight: 800, fontFamily: 'monospace',
                color: isActive ? 'rgba(65,211,126,0.95)' : isPast ? 'rgba(65,211,126,0.55)' : 'rgba(244,251,255,0.3)',
                letterSpacing: '0.04em',
                transition: 'all 0.3s ease',
              }}>{step.number}</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Nav Button
═══════════════════════════════════════════════════════ */
function NavButton({ onClick, dir, disabled }: { onClick: () => void; dir: 'next' | 'prev'; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'next' ? 'الخطوة التالية' : 'الخطوة السابقة'}
      style={{
        width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: disabled ? 'rgba(244,251,255,0.2)' : 'rgba(244,251,255,0.5)',
        transition: 'all 350ms cubic-bezier(0.22,1,0.36,1)',
        opacity: disabled ? 0.4 : 1,
      }}
      onMouseEnter={e => {
        if (disabled) return
        const b = e.currentTarget
        b.style.borderColor = 'rgba(65,211,126,0.48)'
        b.style.background = 'rgba(65,211,126,0.1)'
        b.style.boxShadow = '0 0 24px rgba(65,211,126,0.18)'
        b.style.color = 'var(--brand-green)'
        b.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={e => {
        const b = e.currentTarget
        b.style.borderColor = 'rgba(255,255,255,0.12)'
        b.style.background = 'rgba(255,255,255,0.05)'
        b.style.boxShadow = ''
        b.style.color = 'rgba(244,251,255,0.5)'
        b.style.transform = 'scale(1)'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === 'next' ? (
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        ) : (
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        )}
      </svg>
    </button>
  )
}

/* ═══════════════════════════════════════════════════════
   Single Stage Content
═══════════════════════════════════════════════════════ */
function RoadmapStage({ step, index, activeIndex, isMobile }: {
  step: Step; index: number; activeIndex: number; isMobile: boolean
}) {
  const s = STATUS_STYLE[step.statusType]
  const isActive = index === activeIndex

  const illustrations = [IllustrationLibrary, IllustrationWorkshop, Illustration3D, IllustrationVR]
  const IllComp = illustrations[index]

  return (
    <div
      style={{
        width: '25%',  /* 25% of 400% track = 100vw */
        flexShrink: 0,
        direction: 'rtl',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gridTemplateRows: isMobile ? 'auto auto' : '1fr',
        gap: isMobile ? 24 : 0,
        alignItems: 'center',
        height: '100%',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Text column — right side in RTL */}
      <div style={{
        padding: isMobile ? '32px 24px 24px' : '48px 52px',
      }}>
        {/* Status row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
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

        {/* Title */}
        <h2 style={{
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontWeight: 900, color: 'var(--text-main)',
          letterSpacing: '-0.03em', lineHeight: 1.18,
          marginBottom: 20,
        }}>{step.title}</h2>

        {/* Description */}
        <p style={{
          fontSize: 15, color: 'var(--text-muted)',
          lineHeight: 1.9, marginBottom: 32, maxWidth: 400,
        }}>{step.description}</p>

        {/* Tags */}
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

      {/* Illustration column — left side in RTL */}
      <div style={{
        padding: isMobile ? '0 24px 32px' : '24px 32px 24px 16px',
        height: isMobile ? 260 : '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: '100%', maxWidth: 480, aspectRatio: '4/3' }}>
          <IllComp active={isActive} />
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   Main Journey Section
═══════════════════════════════════════════════════════ */
function RoadmapJourneySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile]       = useState(false)
  const [isLocked, setIsLocked]       = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (isLocked) return
    const next =
      dir === 'next'
        ? Math.min(activeIndex + 1, STEPS.length - 1)
        : Math.max(activeIndex - 1, 0)
    if (next === activeIndex) return
    setIsLocked(true)
    setActiveIndex(next)
    setTimeout(() => setIsLocked(false), 900)
  }, [activeIndex, isLocked])

  const goToStep = useCallback((i: number) => {
    if (isLocked || i === activeIndex) return
    setIsLocked(true)
    setActiveIndex(i)
    setTimeout(() => setIsLocked(false), 900)
  }, [activeIndex, isLocked])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  navigate('next')
      if (e.key === 'ArrowRight') navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const trackOffset = activeIndex * 25 /* % of 400% track */

  return (
    <section style={{ padding: '0 0 72px', position: 'relative' }}>
      {/* Outer glow — follows active stage */}
      <div style={{
        position: 'absolute',
        top: '20%', height: '60%',
        width: '35%',
        left: `${activeIndex * 25}%`,
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(65,211,126,0.06) 0%, transparent 70%)',
        transition: 'left 0.85s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 0,
      }}/>

      {/* Journey viewport — direction:ltr so overflow origin is on the left */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        direction: 'ltr',
        margin: '0 24px',
        borderRadius: 28,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'linear-gradient(145deg, rgba(32,32,168,0.08) 0%, rgba(0,0,50,0.55) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 32px 100px rgba(0,0,40,0.5), inset 0 1.5px 0 rgba(255,255,255,0.1)',
        minHeight: isMobile ? 'auto' : 580,
      }}>
        {/* Sliding track — direction:ltr forces LTR flex order so translateX(-N%) works correctly */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          direction: 'ltr',
          width: '400%',
          height: isMobile ? 'auto' : 580,
          transform: `translateX(-${trackOffset}%)`,
          transition: 'transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative',
          willChange: 'transform',
        }}>
          {/* Connected glowing path — behind stages */}
          <RoadmapConnectedPath activeIndex={activeIndex} />

          {/* Stages */}
          {STEPS.map((step, i) => (
            <RoadmapStage
              key={i}
              step={step}
              index={i}
              activeIndex={activeIndex}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Edge fade overlays — hint at adjacent stages */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 80,
          background: 'linear-gradient(to left, rgba(0,0,50,0.45), transparent)',
          pointerEvents: 'none', zIndex: 2,
        }}/>
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: 80,
          background: 'linear-gradient(to right, rgba(0,0,50,0.45), transparent)',
          pointerEvents: 'none', zIndex: 2,
        }}/>
      </div>

      {/* Controls row */}
      <div className="container" style={{ marginTop: 20 }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          {/* Next button (RTL: left side) */}
          <NavButton onClick={() => navigate('next')} dir="next" disabled={activeIndex === STEPS.length - 1}/>

          {/* Progress route */}
          <RoadmapProgressRoute active={activeIndex} onGoTo={goToStep}/>

          {/* Prev button (RTL: right side) */}
          <NavButton onClick={() => navigate('prev')} dir="prev" disabled={activeIndex === 0}/>
        </div>

        {/* Step counter */}
        <p style={{
          textAlign: 'center', marginTop: 8,
          fontSize: 11, color: 'rgba(244,251,255,0.25)',
          fontFamily: 'monospace', letterSpacing: '0.1em',
        }}>
          {String(activeIndex + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   Vision Card
═══════════════════════════════════════════════════════ */
function VisionCard() {
  return (
    <section style={{ padding: '0 24px 96px', position: 'relative' }}>
      {/* Visual connector from roadmap to vision */}
      <div style={{
        width: 2, height: 40, margin: '0 auto',
        background: 'linear-gradient(180deg, rgba(65,211,126,0.5), rgba(65,211,126,0.1))',
        borderRadius: 2, marginBottom: -2,
      }}/>
      <div className="container">
        <div className="glass-card" style={{
          borderRadius: 24,
          padding: '48px 52px',
          background: 'linear-gradient(135deg, rgba(32,32,168,0.16) 0%, rgba(0,0,78,0.5) 100%)',
          borderColor: 'rgba(65,211,126,0.22)',
          maxWidth: 720, margin: '0 auto',
          boxShadow: '0 24px 80px rgba(0,0,50,0.4), 0 0 40px rgba(65,211,126,0.05)',
        }}>
          <div className="divider" style={{ marginBottom: 24 }} />
          <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 800, color: 'var(--text-main)', marginBottom: 14 }}>الرؤية</h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.85 }}>
            GML يبدأ كمكتبة موشن، ثم يتوسع تدريجيًا إلى نظام إنتاج بصري يدعم الفريق في العمل بسرعة أعلى وجودة أكثر اتساقًا — وصولًا إلى تجارب VR/AR تُبنى على الأساس ذاته.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════
   Page
═══════════════════════════════════════════════════════ */
export default function RoadmapPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <style>{ROADMAP_CSS}</style>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: 152, paddingBottom: 56, paddingLeft: 24, paddingRight: 24 }}>
        <div className="container">
          <span className="label-tag hero-enter hero-enter-0" style={{ marginBottom: 20, display: 'inline-flex' }}>خارطة الطريق</span>
          <h1 className="section-title hero-enter hero-enter-1" style={{ marginBottom: 16, marginTop: 12 }}>
            رحلة إنتاج بصري متكاملة
          </h1>
          <p className="section-subtitle hero-enter hero-enter-2" style={{ maxWidth: 580 }}>
            من مكتبة الموشن إلى 3D ثم VR/AR — كل مرحلة تبني على السابقة في مسار نمو واضح ومتواصل.
          </p>
        </div>
      </section>

      {/* Journey */}
      <RoadmapJourneySection />

      {/* Vision */}
      <VisionCard />

      {/* CTA */}
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
