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
@keyframes cubeRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes portalPulse {
  0%,100% { opacity: 0.7; }
  50%      { opacity: 1; }
}
@keyframes chevronFade {
  0%,100% { opacity: 0.18; }
  50%      { opacity: 0.5; }
}
@keyframes floatY {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-9px); }
}
@keyframes floatYSlow {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-5px); }
}
@keyframes floatYFast {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-12px); }
}
@keyframes dashFlow {
  to { stroke-dashoffset: -22; }
}
@keyframes spinRing {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes spinRingCCW {
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
}
@keyframes scanLine {
  0%   { transform: translateY(-90px); opacity: 0; }
  12%  { opacity: 0.55; }
  88%  { opacity: 0.55; }
  100% { transform: translateY(90px); opacity: 0; }
}
@keyframes counterTick {
  0%,18%  { opacity: 1; }
  20%,38% { opacity: 0; }
  40%,58% { opacity: 1; }
  60%,78% { opacity: 0; }
  80%,100%{ opacity: 1; }
}
@keyframes progressLoop {
  0%   { transform: scaleX(0.12); }
  55%  { transform: scaleX(0.9); }
  80%  { transform: scaleX(0.9); }
  100% { transform: scaleX(0.12); }
}
@keyframes orbitCW {
  from { transform: rotate(0deg) translateX(68px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(68px) rotate(-360deg); }
}
@keyframes orbitCCW {
  from { transform: rotate(0deg) translateX(55px) rotate(0deg); }
  to   { transform: rotate(-360deg) translateX(55px) rotate(360deg); }
}
@keyframes stampPulse {
  0%,100% { transform: scale(1);    opacity: 1; }
  50%      { transform: scale(1.04); opacity: 0.85; }
}
@keyframes portalSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
`

/* ═══════════════════════════════════════════════════════
   Stage Illustrations
═══════════════════════════════════════════════════════ */
function IllustrationLibrary({ active }: { active: boolean }) {
  const tr = (d: number) => active ? `opacity 0.45s ${d}s ease-out` : 'none'
  const cards = [
    { x: 22,  y: 56,  w: 110, h: 76, label: 'Lower Third', icon: 'lt',   c: 'rgba(65,211,126,0.2)',  bc: 'rgba(65,211,126,0.9)',  float: 'floatY 3.2s 0s ease-in-out infinite' },
    { x: 145, y: 56,  w: 110, h: 76, label: 'Counter',      icon: 'cnt',  c: 'rgba(86,86,216,0.25)',  bc: 'rgba(86,86,216,0.9)',   float: 'floatY 2.8s 0.4s ease-in-out infinite' },
    { x: 268, y: 56,  w: 110, h: 76, label: 'Transition',   icon: 'tr',   c: 'rgba(86,86,216,0.2)',   bc: 'rgba(86,86,216,0.8)',   float: 'floatYSlow 3.6s 0.8s ease-in-out infinite' },
    { x: 22,  y: 146, w: 110, h: 76, label: 'Text Box',     icon: 'txt',  c: 'rgba(86,86,216,0.2)',   bc: 'rgba(86,86,216,0.8)',   float: 'floatYSlow 3.0s 0.2s ease-in-out infinite' },
    { x: 145, y: 146, w: 110, h: 76, label: 'Icon Card',    icon: 'icon', c: 'rgba(40,40,180,0.5)',   bc: 'rgba(86,86,216,0.9)',   float: 'floatYFast 2.5s 0.6s ease-in-out infinite' },
    { x: 268, y: 146, w: 110, h: 76, label: 'Background',   icon: 'bg',   c: 'rgba(65,211,126,0.15)', bc: 'rgba(65,211,126,0.75)', float: 'floatY 3.4s 1.0s ease-in-out infinite' },
  ]
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <filter id="libGlow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="libGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(20,20,140,0.95)"/>
          <stop offset="100%" stopColor="rgba(0,0,60,0.98)"/>
        </linearGradient>
        <clipPath id="libClip"><rect x="10" y="10" width="380" height="280" rx="18"/></clipPath>
      </defs>

      {/* Panel */}
      <rect x="10" y="10" width="380" height="280" rx="18" fill="url(#libGrad)" stroke="rgba(86,86,216,0.85)" strokeWidth="2"/>

      {/* Scan line — continuous */}
      <g clipPath="url(#libClip)">
        <line x1="10" y1="150" x2="390" y2="150" stroke="rgba(65,211,126,0.25)" strokeWidth="1.5"
          style={{ animation: 'scanLine 4s ease-in-out infinite' }}/>
      </g>

      {/* Header */}
      <rect x="10" y="10" width="380" height="38" rx="18" fill="rgba(20,20,140,0.98)"/>
      <rect x="10" y="32" width="380" height="16" fill="rgba(20,20,140,0.98)"/>
      <circle cx="36" cy="29" r="5.5" fill="rgba(255,80,80,0.9)"/>
      <circle cx="55" cy="29" r="5.5" fill="rgba(255,180,0,0.9)"/>
      <circle cx="74" cy="29" r="5.5" fill="rgba(65,211,126,0.9)" style={{ animation: 'pathGlowPulse 1.6s infinite' }}/>
      <text x="200" y="34" textAnchor="middle" fill="rgba(244,251,255,0.75)" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">GML MOTION LIBRARY v1.0</text>

      {/* Cards — each floats independently */}
      {cards.map((card, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: tr(i * 0.07), animation: active ? card.float : 'none' }}>
          <rect x={card.x} y={card.y} width={card.w} height={card.h} rx="10" fill={card.c} stroke={card.bc} strokeWidth="1.5"/>
          {card.icon === 'lt' && <>
            <rect x={card.x+8} y={card.y+12} width={card.w-16} height="9" rx="3" fill="rgba(65,211,126,0.95)"/>
            <rect x={card.x+8} y={card.y+25} width={(card.w-16)*0.65} height="6" rx="3" fill="rgba(65,211,126,0.55)"/>
            <rect x={card.x+8} y={card.y+35} width={(card.w-16)*0.4} height="6" rx="3" fill="rgba(65,211,126,0.3)"/>
          </>}
          {card.icon === 'cnt' && <>
            <text x={card.x+card.w/2} y={card.y+32} textAnchor="middle" fill="rgba(120,120,255,1)"
              fontSize="24" fontWeight="900" fontFamily="monospace" style={{ animation: 'counterTick 4s 1s infinite' }}>42</text>
            <text x={card.x+card.w/2} y={card.y+32} textAnchor="middle" fill="rgba(120,120,255,1)"
              fontSize="24" fontWeight="900" fontFamily="monospace" style={{ animation: 'counterTick 4s 3s infinite' }}>87</text>
            {/* animated progress bar */}
            <rect x={card.x+12} y={card.y+42} width={card.w-24} height="5" rx="2.5" fill="rgba(86,86,216,0.3)"/>
            <rect x={card.x+12} y={card.y+42} width={card.w-24} height="5" rx="2.5" fill="rgba(86,86,216,0.9)"
              style={{ transformOrigin: `${card.x+12}px ${card.y+44}px`, animation: 'progressLoop 3.5s 0.5s ease-in-out infinite' }}/>
          </>}
          {card.icon === 'tr' && <>
            <rect x={card.x+12} y={card.y+14} width="30" height="44" rx="5" fill="rgba(86,86,216,0.75)"/>
            <path d={`M ${card.x+50} ${card.y+36} L ${card.x+65} ${card.y+36}`} stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
            <path d={`M ${card.x+61} ${card.y+30} L ${card.x+65} ${card.y+36} L ${card.x+61} ${card.y+42}`} stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x={card.x+68} y={card.y+14} width="30" height="44" rx="5" fill="rgba(86,86,216,0.5)"/>
          </>}
          {card.icon === 'txt' && <>
            {[0,1,2,3].map(row => (
              <rect key={row} x={card.x+8} y={card.y+12+row*12} width={card.w-16-(row*10)} height="6" rx="3"
                fill={`rgba(120,120,255,${0.9 - row*0.2})`}/>
            ))}
          </>}
          {card.icon === 'icon' && <>
            {[0,1,2,3].map(j => (
              <rect key={j} x={card.x+8+(j%2)*32} y={card.y+10+Math.floor(j/2)*28} width="26" height="22" rx="5"
                fill={j===0?'rgba(65,211,126,0.8)':j===1?'rgba(86,86,216,0.75)':'rgba(86,86,216,0.6)'}/>
            ))}
          </>}
          {card.icon === 'bg' && <>
            <rect x={card.x+8} y={card.y+8} width={card.w-16} height={card.h-18} rx="6"
              fill="rgba(20,20,120,0.7)" stroke="rgba(65,211,126,0.6)" strokeWidth="1.5"/>
            <ellipse cx={card.x+card.w/2} cy={card.y+card.h/2-2} rx="26" ry="16"
              fill="rgba(65,211,126,0.3)" stroke="rgba(65,211,126,0.85)" strokeWidth="1.5"
              style={{ animation: 'portalPulse 2s infinite' }}/>
          </>}
          <text x={card.x+card.w/2} y={card.y+card.h-6} textAnchor="middle"
            fill="rgba(244,251,255,0.6)" fontSize="8" fontFamily="monospace" letterSpacing="0.04em">{card.label}</text>
        </g>
      ))}

      {/* Approval stamp — continuously pulses */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.5), animation: active ? 'stampPulse 2.8s ease-in-out infinite' : 'none' }}>
        <circle cx="200" cy="153" r="54" fill="rgba(0,0,40,0.88)" stroke="rgba(65,211,126,0.9)" strokeWidth="2.5" filter="url(#libGlow)"/>
        <circle cx="200" cy="153" r="46" fill="none" stroke="rgba(65,211,126,0.45)" strokeWidth="1" strokeDasharray="6 4"
          style={{ animation: active ? 'spinRingCCW 12s linear infinite' : 'none' }}/>
        <path d="M 179 154 L 195 171 L 225 140" stroke="rgba(65,211,126,1)" strokeWidth="5"
          strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#libGlow)"/>
        <text x="200" y="206" textAnchor="middle" fill="rgba(65,211,126,0.9)"
          fontSize="9" fontFamily="monospace" letterSpacing="0.14em">APPROVED</text>
      </g>

      {/* Status bar */}
      <rect x="22" y="234" width="356" height="44" rx="8" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <circle cx="42" cy="256" r="5.5" fill="rgba(65,211,126,0.95)" filter="url(#libGlow)" style={{ animation: 'pathGlowPulse 1.4s infinite' }}/>
      <text x="56" y="260" fill="rgba(65,211,126,0.95)" fontSize="11" fontWeight="700" fontFamily="monospace">جارٍ التنفيذ</text>
      <text x="368" y="260" textAnchor="end" fill="rgba(244,251,255,0.55)" fontSize="10" fontFamily="monospace">6 عناصر جاهزة</text>

      {/* Corner floating orbs — inside viewBox */}
      {[
        { cx: 20,  cy: 50,  r: 6, c: 'rgba(65,211,126,0.75)', a: 'floatY 3.1s 0s ease-in-out infinite' },
        { cx: 380, cy: 50,  r: 5, c: 'rgba(86,86,216,0.8)',   a: 'floatYSlow 2.7s 0.5s ease-in-out infinite' },
        { cx: 20,  cy: 240, r: 5, c: 'rgba(86,86,216,0.75)',  a: 'floatY 3.5s 0.3s ease-in-out infinite' },
        { cx: 380, cy: 240, r: 6, c: 'rgba(65,211,126,0.7)',  a: 'floatYFast 2.4s 0.8s ease-in-out infinite' },
        { cx: 200, cy: 18,  r: 4, c: 'rgba(65,211,126,0.65)', a: 'floatY 2.9s 0.2s ease-in-out infinite' },
      ].map((o, i) => (
        <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.c} filter="url(#libGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.3 + i * 0.08), animation: active ? o.a : 'none' }}/>
      ))}
    </svg>
  )
}

function IllustrationWorkshop({ active }: { active: boolean }) {
  const tr = (d: number) => active ? `opacity 0.45s ${d}s ease-out` : 'none'
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%' }}>
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

      {/* Floor lines */}
      <line x1="0" y1="248" x2="400" y2="248" stroke="rgba(86,86,216,0.5)" strokeWidth="1.5"/>
      <line x1="0" y1="253" x2="400" y2="253" stroke="rgba(86,86,216,0.18)" strokeWidth="1"/>

      {/* Screen */}
      <rect x="108" y="52" width="184" height="130" rx="10" fill="url(#screenGrad)" stroke="rgba(86,86,216,0.95)" strokeWidth="2.5"/>
      <rect x="108" y="52" width="184" height="18" rx="10" fill="rgba(20,20,150,0.98)"/>
      <rect x="108" y="64" width="184" height="6" fill="rgba(20,20,150,0.98)"/>
      <circle cx="122" cy="61" r="3.5" fill="rgba(255,80,80,0.9)"/>
      <circle cx="134" cy="61" r="3.5" fill="rgba(255,180,0,0.9)"/>
      <circle cx="146" cy="61" r="3.5" fill="rgba(65,211,126,0.9)" style={{ animation: 'pathGlowPulse 1.6s infinite' }}/>

      {/* Screen content cards — float */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.2), animation: active ? 'floatY 3s 0s ease-in-out infinite' : 'none' }}>
        <rect x="118" y="76" width="52" height="40" rx="5" fill="rgba(65,211,126,0.32)" stroke="rgba(65,211,126,0.9)" strokeWidth="1.5"/>
        <rect x="122" y="80" width="44" height="6" rx="2.5" fill="rgba(65,211,126,0.8)"/>
        <rect x="122" y="90" width="30" height="4" rx="2" fill="rgba(65,211,126,0.45)"/>
      </g>
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.3), animation: active ? 'floatYSlow 3.4s 0.5s ease-in-out infinite' : 'none' }}>
        <rect x="178" y="76" width="52" height="40" rx="5" fill="rgba(86,86,216,0.42)" stroke="rgba(86,86,216,0.9)" strokeWidth="1.5"/>
        <rect x="182" y="80" width="44" height="6" rx="2.5" fill="rgba(86,86,216,0.85)"/>
        <rect x="182" y="90" width="32" height="4" rx="2" fill="rgba(86,86,216,0.45)"/>
      </g>
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.4), animation: active ? 'floatYFast 2.6s 1s ease-in-out infinite' : 'none' }}>
        <rect x="238" y="76" width="44" height="40" rx="5" fill="rgba(86,86,216,0.32)" stroke="rgba(86,86,216,0.8)" strokeWidth="1.5"/>
        <rect x="242" y="80" width="36" height="6" rx="2.5" fill="rgba(86,86,216,0.75)"/>
        <rect x="242" y="90" width="22" height="4" rx="2" fill="rgba(86,86,216,0.4)"/>
      </g>

      {/* Progress bar — animated fill */}
      <rect x="118" y="124" width="164" height="7" rx="3.5" fill="rgba(86,86,216,0.3)"/>
      <rect x="118" y="124" width="164" height="7" rx="3.5" fill="rgba(65,211,126,0.9)" filter="url(#wsGlow)"
        style={{ transformOrigin: '118px 127px', animation: active ? 'progressLoop 3.5s 0.5s ease-in-out infinite' : 'none', opacity: active ? 1 : 0, transition: tr(0.5) }}/>
      <rect x="118" y="138" width="164" height="3" rx="1.5" fill="rgba(255,255,255,0.14)"/>

      {/* Scan line on screen */}
      <clipPath id="wsClip"><rect x="108" y="52" width="184" height="130" rx="10"/></clipPath>
      <line x1="108" y1="100" x2="292" y2="100" stroke="rgba(65,211,126,0.3)" strokeWidth="2"
        clipPath="url(#wsClip)" style={{ animation: 'scanLine 3.5s 0.8s ease-in-out infinite' }}/>

      {/* Screen stand */}
      <rect x="192" y="182" width="16" height="26" rx="3" fill="rgba(86,86,216,0.65)"/>
      <rect x="170" y="206" width="60" height="8" rx="4" fill="rgba(86,86,216,0.75)"/>

      {/* Person left — floats */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.1), animation: active ? 'floatYSlow 3.8s 0.2s ease-in-out infinite' : 'none' }}>
        <circle cx="54" cy="142" r="17" fill="rgba(30,30,180,0.85)" stroke="rgba(86,86,216,0.95)" strokeWidth="2"/>
        <rect x="32" y="164" width="44" height="62" rx="12" fill="rgba(30,30,180,0.75)" stroke="rgba(86,86,216,0.85)" strokeWidth="1.5"/>
        <path d="M 76 190 L 108 162" stroke="rgba(86,86,216,0.9)" strokeWidth="7" strokeLinecap="round"/>
        <rect x="14" y="215" width="66" height="20" rx="10" fill="rgba(65,211,126,0.15)" stroke="rgba(65,211,126,0.75)" strokeWidth="1"/>
        <text x="47" y="229" textAnchor="middle" fill="rgba(65,211,126,0.95)" fontSize="7.5" fontFamily="monospace">DESIGNER</text>
      </g>

      {/* Person right — floats offset */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.15), animation: active ? 'floatYSlow 3.2s 0.8s ease-in-out infinite' : 'none' }}>
        <circle cx="346" cy="142" r="17" fill="rgba(20,20,140,0.82)" stroke="rgba(86,86,216,0.9)" strokeWidth="2"/>
        <rect x="324" y="164" width="44" height="62" rx="12" fill="rgba(20,20,140,0.72)" stroke="rgba(86,86,216,0.75)" strokeWidth="1.5"/>
        <path d="M 324 190 L 292 162" stroke="rgba(86,86,216,0.8)" strokeWidth="7" strokeLinecap="round"/>
        <rect x="320" y="215" width="66" height="20" rx="10" fill="rgba(86,86,216,0.15)" stroke="rgba(86,86,216,0.75)" strokeWidth="1"/>
        <text x="353" y="229" textAnchor="middle" fill="rgba(120,120,255,0.95)" fontSize="7.5" fontFamily="monospace">DIRECTOR</text>
      </g>

      {/* Asset blocks — float */}
      {[
        { x: 10,  y: 98,  w: 36, h: 26, c: 'rgba(65,211,126,0.55)', bc: 'rgba(65,211,126,0.9)', fa: 'floatY 2.8s 0.1s ease-in-out infinite', d: 0.3 },
        { x: 12,  y: 132, w: 30, h: 24, c: 'rgba(86,86,216,0.6)',   bc: 'rgba(86,86,216,0.9)', fa: 'floatYFast 2.3s 0.6s ease-in-out infinite', d: 0.38 },
        { x: 354, y: 98,  w: 36, h: 26, c: 'rgba(86,86,216,0.55)', bc: 'rgba(86,86,216,0.9)',  fa: 'floatYSlow 3.2s 0.3s ease-in-out infinite', d: 0.35 },
        { x: 358, y: 132, w: 28, h: 24, c: 'rgba(65,211,126,0.5)', bc: 'rgba(65,211,126,0.85)', fa: 'floatY 2.6s 0.9s ease-in-out infinite', d: 0.42 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="5" fill={b.c} stroke={b.bc} strokeWidth="1.5"
          style={{ opacity: active ? 1 : 0, transition: tr(b.d), animation: active ? b.fa : 'none' }}/>
      ))}

      {/* Flowing dashed connection lines */}
      <line x1="46" y1="111" x2="108" y2="98" stroke="rgba(65,211,126,0.6)" strokeWidth="1.5" strokeDasharray="5 3"
        style={{ animation: 'dashFlow 1.2s linear infinite' }}/>
      <line x1="42" y1="144" x2="108" y2="128" stroke="rgba(86,86,216,0.55)" strokeWidth="1.5" strokeDasharray="5 3"
        style={{ animation: 'dashFlow 1.4s 0.3s linear infinite' }}/>
      <line x1="354" y1="111" x2="292" y2="98" stroke="rgba(86,86,216,0.55)" strokeWidth="1.5" strokeDasharray="5 3"
        style={{ animation: 'dashFlow 1.3s 0.6s linear infinite' }}/>
      <line x1="358" y1="144" x2="292" y2="128" stroke="rgba(65,211,126,0.5)" strokeWidth="1.5" strokeDasharray="5 3"
        style={{ animation: 'dashFlow 1.5s 0.1s linear infinite' }}/>

      {/* Top tags */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.6), animation: active ? 'floatYSlow 3s 0.4s ease-in-out infinite' : 'none' }}>
        <rect x="118" y="20" width="76" height="24" rx="12" fill="rgba(65,211,126,0.15)" stroke="rgba(65,211,126,0.8)" strokeWidth="1.5"/>
        <circle cx="131" cy="32" r="3.5" fill="rgba(65,211,126,0.95)" style={{ animation: 'pathGlowPulse 1.4s infinite' }}/>
        <text x="168" y="36" textAnchor="middle" fill="rgba(65,211,126,0.98)" fontSize="8" fontFamily="monospace">LIVE SESSION</text>
      </g>
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.7), animation: active ? 'floatY 2.7s 1.1s ease-in-out infinite' : 'none' }}>
        <rect x="206" y="20" width="76" height="24" rx="12" fill="rgba(86,86,216,0.15)" stroke="rgba(86,86,216,0.8)" strokeWidth="1.5"/>
        <text x="244" y="36" textAnchor="middle" fill="rgba(120,120,255,0.98)" fontSize="8" fontFamily="monospace">3 MEMBERS</text>
      </g>

      {/* Corner orbs */}
      {[
        { cx: 20,  cy: 55,  r: 6, c: 'rgba(65,211,126,0.75)', a: 'floatY 3.1s 0s ease-in-out infinite' },
        { cx: 380, cy: 55,  r: 5, c: 'rgba(86,86,216,0.8)',   a: 'floatYSlow 2.7s 0.4s ease-in-out infinite' },
        { cx: 20,  cy: 240, r: 5, c: 'rgba(86,86,216,0.75)',  a: 'floatY 3.5s 0.7s ease-in-out infinite' },
        { cx: 380, cy: 240, r: 6, c: 'rgba(65,211,126,0.7)',  a: 'floatYFast 2.4s 1.1s ease-in-out infinite' },
        { cx: 200, cy: 288, r: 4, c: 'rgba(65,211,126,0.6)',  a: 'floatYSlow 3s 0.2s ease-in-out infinite' },
      ].map((o, i) => (
        <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.c} filter="url(#wsGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.35 + i * 0.07), animation: active ? o.a : 'none' }}/>
      ))}
    </svg>
  )
}

function Illustration3D({ active }: { active: boolean }) {
  const tr = (d: number) => active ? `opacity 0.45s ${d}s ease-out` : 'none'
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <filter id="tdGlow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Isometric grid */}
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

      {/* Small cubes — each floats independently */}
      {[
        { tx: 38,  ty: 148, s: 1.0,  c1: 'rgba(86,86,216,0.85)',  c2: 'rgba(20,20,140,0.95)', c3: 'rgba(86,86,216,0.65)',  d: 0.1,  fa: 'floatY 3.2s 0s ease-in-out infinite' },
        { tx: 96,  ty: 128, s: 0.8,  c1: 'rgba(65,211,126,0.8)',  c2: 'rgba(20,140,70,0.7)',  c3: 'rgba(65,211,126,0.6)',  d: 0.2,  fa: 'floatYFast 2.4s 0.5s ease-in-out infinite' },
        { tx: 300, ty: 148, s: 1.0,  c1: 'rgba(86,86,216,0.8)',   c2: 'rgba(20,20,140,0.9)',  c3: 'rgba(86,86,216,0.62)',  d: 0.15, fa: 'floatYSlow 3.6s 0.8s ease-in-out infinite' },
        { tx: 346, ty: 126, s: 0.75, c1: 'rgba(65,211,126,0.7)',  c2: 'rgba(20,140,70,0.6)',  c3: 'rgba(65,211,126,0.52)', d: 0.25, fa: 'floatY 2.9s 0.3s ease-in-out infinite' },
        { tx: 56,  ty: 208, s: 0.7,  c1: 'rgba(86,86,216,0.72)',  c2: 'rgba(20,20,140,0.82)', c3: 'rgba(86,86,216,0.55)',  d: 0.3,  fa: 'floatYSlow 3.4s 1.1s ease-in-out infinite' },
        { tx: 316, ty: 208, s: 0.7,  c1: 'rgba(86,86,216,0.72)',  c2: 'rgba(20,20,140,0.82)', c3: 'rgba(86,86,216,0.55)',  d: 0.35, fa: 'floatY 3.1s 0.6s ease-in-out infinite' },
        { tx: 148, ty: 48,  s: 0.55, c1: 'rgba(65,211,126,0.65)', c2: 'rgba(20,140,70,0.55)', c3: 'rgba(65,211,126,0.48)', d: 0.4,  fa: 'floatYFast 2.6s 0.9s ease-in-out infinite' },
        { tx: 248, ty: 44,  s: 0.5,  c1: 'rgba(86,86,216,0.68)',  c2: 'rgba(20,20,140,0.78)', c3: 'rgba(86,86,216,0.52)',  d: 0.45, fa: 'floatY 2.8s 1.4s ease-in-out infinite' },
      ].map((cube, i) => {
        const s = cube.s * 30
        const { tx: cx, ty: cy } = cube
        return (
          <g key={i} style={{ opacity: active ? 1 : 0, transition: tr(cube.d), animation: active ? cube.fa : 'none' }}>
            <path d={`M ${cx},${cy} L ${cx+s},${cy-s*0.5} L ${cx+s*2},${cy} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c1}/>
            <path d={`M ${cx+s*2},${cy} L ${cx+s*2},${cy+s*0.9} L ${cx+s},${cy+s*1.4} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c2}/>
            <path d={`M ${cx},${cy} L ${cx},${cy+s*0.9} L ${cx+s},${cy+s*1.4} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c3}/>
          </g>
        )
      })}

      {/* Orbit ring — rotates */}
      <ellipse cx="200" cy="142" rx="76" ry="22" fill="none"
        stroke="rgba(65,211,126,0.45)" strokeWidth="1.5" strokeDasharray="7 4"
        style={{ opacity: active ? 1 : 0, transition: tr(0.4), animation: active ? 'spinRing 10s linear infinite' : 'none' }}/>

      {/* Orbit particles */}
      {[0, 1, 2].map(i => (
        <circle key={i} cx="200" cy="142" r="4" fill={i===0?'rgba(65,211,126,0.9)':'rgba(86,86,216,0.85)'} filter="url(#tdGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.45 + i * 0.1), animation: active ? `orbitCW ${5 + i * 2}s ${i * 1.2}s linear infinite` : 'none' }}/>
      ))}
      {[0, 1].map(i => (
        <circle key={i} cx="200" cy="142" r="3" fill="rgba(86,86,216,0.8)" filter="url(#tdGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.5 + i * 0.1), animation: active ? `orbitCCW ${7 + i * 1.5}s ${i * 0.8}s linear infinite` : 'none' }}/>
      ))}

      {/* Central cube — spins */}
      <g transform="translate(200, 142)" style={active ? { animation: 'cubeRotate 8s linear infinite' } : {}}>
        <rect x="-44" y="-44" width="88" height="88" rx="5"
          fill="rgba(20,20,160,0.45)" stroke="rgba(86,86,216,0.95)" strokeWidth="2"/>
        <path d="M -44,-44 L -24,-60 L 64,-60 L 44,-44" stroke="rgba(86,86,216,0.85)" strokeWidth="2" fill="rgba(86,86,216,0.22)"/>
        <path d="M 44,-44 L 64,-60 L 64,28 L 44,44"   stroke="rgba(86,86,216,0.75)" strokeWidth="2" fill="rgba(20,20,140,0.3)"/>
        <circle cx="0" cy="0" r="26" fill="rgba(65,211,126,0.12)" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"/>
        <circle cx="0" cy="0" r="13" fill="rgba(65,211,126,0.22)" stroke="rgba(65,211,126,0.95)" strokeWidth="2" filter="url(#tdGlow)"/>
        <line x1="-44" y1="-44" x2="44" y2="44" stroke="rgba(86,86,216,0.38)" strokeWidth="1.5" strokeDasharray="3 4"/>
        <line x1="44" y1="-44" x2="-44" y2="44" stroke="rgba(86,86,216,0.38)" strokeWidth="1.5" strokeDasharray="3 4"/>
      </g>

      {/* Labels — float */}
      {[
        { x: 18,  y: 88, label: '3D ASSETS', c: 'rgba(86,86,216,0.95)', bg: 'rgba(86,86,216,0.18)', fa: 'floatYSlow 3s 0s ease-in-out infinite' },
        { x: 292, y: 88, label: 'MODELS',    c: 'rgba(65,211,126,0.95)', bg: 'rgba(65,211,126,0.14)', fa: 'floatYSlow 2.8s 0.6s ease-in-out infinite' },
      ].map((tag, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: tr(0.5 + i * 0.1), animation: active ? tag.fa : 'none' }}>
          <rect x={tag.x} y={tag.y-16} width={tag.label.length * 8.2 + 18} height="22" rx="6"
            fill={tag.bg} stroke={tag.c} strokeWidth="1.5"/>
          <text x={tag.x+9} y={tag.y} fill={tag.c} fontSize="9" fontFamily="monospace" letterSpacing="0.08em">{tag.label}</text>
        </g>
      ))}

      {/* Ambient particles — pulse */}
      {[{ cx: 155, cy: 58 }, { cx: 245, cy: 52 }, { cx: 168, cy: 252 }, { cx: 238, cy: 258 }, { cx: 95, cy: 172 }, { cx: 308, cy: 168 }].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="3.5" fill={i%2===0?'rgba(65,211,126,0.8)':'rgba(86,86,216,0.85)'}
          filter="url(#tdGlow)"
          style={{ animation: `pathGlowPulse ${2+i*0.35}s ${i*0.3}s ease-in-out infinite` }}/>
      ))}

      {/* Corner orbs */}
      {[
        { cx: 22,  cy: 52,  r: 6, c: 'rgba(86,86,216,0.8)',   a: 'floatY 3.1s 0s ease-in-out infinite' },
        { cx: 378, cy: 52,  r: 5, c: 'rgba(65,211,126,0.75)', a: 'floatYSlow 2.7s 0.5s ease-in-out infinite' },
        { cx: 22,  cy: 248, r: 5, c: 'rgba(65,211,126,0.75)', a: 'floatY 3.5s 0.8s ease-in-out infinite' },
        { cx: 378, cy: 248, r: 6, c: 'rgba(86,86,216,0.8)',   a: 'floatYFast 2.4s 1.2s ease-in-out infinite' },
        { cx: 200, cy: 285, r: 4, c: 'rgba(65,211,126,0.65)', a: 'floatYSlow 3s 0.3s ease-in-out infinite' },
      ].map((o, i) => (
        <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.c} filter="url(#tdGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.35 + i*0.07), animation: active ? o.a : 'none' }}/>
      ))}
    </svg>
  )
}

function IllustrationVR({ active }: { active: boolean }) {
  const tr = (d: number) => active ? `opacity 0.45s ${d}s ease-out` : 'none'
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%' }}>
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

      {/* Background rings — spin at different speeds */}
      {[{ r: 138, spd: 'spinRing 18s linear infinite',    str: 'rgba(86,86,216,0.32)',  sw: '1.5', da: '9 6',  fill: 'url(#portalGrad)' },
        { r: 110, spd: 'spinRingCCW 12s linear infinite', str: 'rgba(86,86,216,0.48)',  sw: '1.5', da: '5 4',  fill: 'none' },
        { r: 82,  spd: 'spinRing 8s linear infinite',     str: 'rgba(65,211,126,0.55)', sw: '2',   da: 'none', fill: 'none' },
      ].map((ring, i) => (
        <circle key={i} cx="200" cy="148" r={ring.r}
          stroke={ring.str} strokeWidth={ring.sw}
          fill={ring.fill}
          strokeDasharray={ring.da === 'none' ? undefined : ring.da}
          style={{
            opacity: active ? 1 : 0,
            transition: tr(i * 0.25),
            animation: active ? `${ring.spd}` : 'none',
          }}/>
      ))}

      {/* Portal body */}
      <circle cx="200" cy="148" r="60" fill="rgba(0,0,50,0.88)"
        stroke="rgba(65,211,126,0.92)" strokeWidth="3" filter="url(#vrGlow)"
        style={{ opacity: active ? 1 : 0, transition: tr(0.1) }}/>
      <circle cx="200" cy="148" r="48" fill="rgba(20,20,160,0.55)"
        stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"
        style={{ opacity: active ? 1 : 0, transition: tr(0.15), animation: active ? 'portalPulse 2.2s ease-in-out infinite' : 'none' }}/>

      {/* Portal inner */}
      <g style={{ opacity: active ? 1 : 0, transition: tr(0.2) }}>
        <circle cx="200" cy="148" r="32" fill="rgba(65,211,126,0.15)"
          style={active ? { animation: 'portalPulse 1.8s 0.4s ease-in-out infinite' } : {}}/>
        <text x="200" y="145" textAnchor="middle" fill="rgba(65,211,126,0.98)"
          fontSize="10" fontFamily="monospace" fontWeight="700" letterSpacing="0.16em">VR / AR</text>
        <text x="200" y="160" textAnchor="middle" fill="rgba(65,211,126,0.6)"
          fontSize="7.5" fontFamily="monospace" letterSpacing="0.08em">FUTURE</text>
      </g>

      {/* Entry paths — animated dash */}
      <path d="M 8,148 Q 90,148 140,148" stroke="rgba(65,211,126,0.88)" strokeWidth="3"
        fill="none" filter="url(#vrGlow)" strokeDasharray="8 4"
        style={{ opacity: active ? 1 : 0, transition: tr(0.3), animation: active ? 'dashFlow 1s linear infinite' : 'none' }}/>
      <path d="M 8,148 Q 90,148 140,148" stroke="rgba(65,211,126,0.35)" strokeWidth="10"
        fill="none" filter="url(#vrGlowSoft)"
        style={{ opacity: active ? 1 : 0, transition: tr(0.3) }}/>
      <path d="M 392,148 Q 310,148 260,148" stroke="rgba(86,86,216,0.75)" strokeWidth="2.5"
        fill="none" filter="url(#vrGlow)" strokeDasharray="8 4"
        style={{ opacity: active ? 1 : 0, transition: tr(0.35), animation: active ? 'dashFlow 1.2s 0.3s linear infinite' : 'none' }}/>

      {/* Orbit particles around portal */}
      {[0,1,2].map(i => (
        <circle key={i} cx="200" cy="148" r="4.5" fill={i===0?'rgba(65,211,126,0.95)':'rgba(86,86,216,0.9)'} filter="url(#vrGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.4 + i*0.1), animation: active ? `orbitCW ${4.5+i*1.8}s ${i*1.4}s linear infinite` : 'none' }}/>
      ))}

      {/* Floating UI panels — each floats */}
      {[
        { x: 10,  y: 50,  w: 96, h: 66, accent: 'rgba(65,211,126,0.85)', d: 0.2, fa: 'floatY 3.2s 0s ease-in-out infinite' },
        { x: 10,  y: 182, w: 82, h: 52, accent: 'rgba(86,86,216,0.85)',  d: 0.35, fa: 'floatYFast 2.5s 0.7s ease-in-out infinite' },
        { x: 294, y: 50,  w: 96, h: 66, accent: 'rgba(86,86,216,0.85)',  d: 0.25, fa: 'floatYSlow 3.6s 0.4s ease-in-out infinite' },
        { x: 308, y: 182, w: 82, h: 52, accent: 'rgba(65,211,126,0.8)',  d: 0.4,  fa: 'floatY 2.9s 1.1s ease-in-out infinite' },
      ].map((panel, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: tr(panel.d), animation: active ? panel.fa : 'none' }}>
          <rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx="10"
            fill="rgba(20,20,150,0.58)" stroke={panel.accent} strokeWidth="2"/>
          <rect x={panel.x+7} y={panel.y+8}  width={panel.w-14} height="6" rx="3" fill={panel.accent}/>
          <rect x={panel.x+7} y={panel.y+18} width={(panel.w-14)*0.65} height="4" rx="2" fill="rgba(255,255,255,0.28)"/>
          {panel.h > 55 && <>
            <rect x={panel.x+7} y={panel.y+26} width={(panel.w-14)*0.8} height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
            <rect x={panel.x+7} y={panel.y+34} width={(panel.w-14)*0.5} height="4" rx="2" fill="rgba(255,255,255,0.13)"/>
            <rect x={panel.x+7} y={panel.y+50} width={panel.w-14} height="6" rx="3" fill="rgba(0,0,0,0.3)"/>
            <rect x={panel.x+7} y={panel.y+50} width={(panel.w-14)*0.45} height="6" rx="3" fill={panel.accent} style={{ opacity: 0.82 }}/>
          </>}
          <circle cx={panel.x+panel.w-7} cy={panel.y+7} r="5" fill={panel.accent} filter="url(#vrGlow)"
            style={{ animation: 'pathGlowPulse 1.8s infinite' }}/>
        </g>
      ))}

      {/* Flowing connection lines */}
      {[
        { x1: 106, y1: 83,  x2: 148, y2: 120, c: 'rgba(65,211,126,0.55)', spd: '1.1s' },
        { x1: 92,  y1: 206, x2: 148, y2: 170, c: 'rgba(86,86,216,0.55)', spd: '1.3s' },
        { x1: 294, y1: 83,  x2: 252, y2: 120, c: 'rgba(86,86,216,0.55)', spd: '1.2s 0.3s' },
        { x1: 308, y1: 206, x2: 254, y2: 170, c: 'rgba(65,211,126,0.5)', spd: '1.4s 0.5s' },
      ].map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={l.c} strokeWidth="1.5" strokeDasharray="6 3"
          style={{ animation: `dashFlow ${l.spd} linear infinite` }}/>
      ))}

      {/* Ambient light pulses */}
      {[{ cx: 148, cy: 76 }, { cx: 258, cy: 216 }, { cx: 134, cy: 220 }, { cx: 268, cy: 72 }, { cx: 200, cy: 28 }, { cx: 200, cy: 270 }].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="4" fill={i%2===0?'rgba(65,211,126,0.88)':'rgba(86,86,216,0.92)'}
          filter="url(#vrGlow)"
          style={{ animation: `pathGlowPulse ${1.4+i*0.42}s ${i*0.32}s ease-in-out infinite` }}/>
      ))}

      {/* Corner orbs */}
      {[
        { cx: 22,  cy: 55,  r: 6, c: 'rgba(65,211,126,0.8)',  a: 'floatY 3.1s 0s ease-in-out infinite' },
        { cx: 378, cy: 55,  r: 5, c: 'rgba(86,86,216,0.82)', a: 'floatYSlow 2.7s 0.4s ease-in-out infinite' },
        { cx: 22,  cy: 242, r: 5, c: 'rgba(86,86,216,0.8)',  a: 'floatY 3.5s 0.8s ease-in-out infinite' },
        { cx: 378, cy: 242, r: 6, c: 'rgba(65,211,126,0.78)', a: 'floatYFast 2.4s 1.2s ease-in-out infinite' },
        { cx: 200, cy: 14,  r: 4, c: 'rgba(65,211,126,0.72)', a: 'floatYSlow 3s 0.2s ease-in-out infinite' },
        { cx: 200, cy: 286, r: 4, c: 'rgba(86,86,216,0.72)', a: 'floatY 2.8s 0.9s ease-in-out infinite' },
      ].map((o, i) => (
        <circle key={i} cx={o.cx} cy={o.cy} r={o.r} fill={o.c} filter="url(#vrGlow)"
          style={{ opacity: active ? 1 : 0, transition: tr(0.3 + i*0.07), animation: active ? o.a : 'none' }}/>
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
