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
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <filter id="libGlow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="libGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(32,32,168,0.7)"/>
          <stop offset="100%" stopColor="rgba(0,0,78,0.85)"/>
        </linearGradient>
      </defs>

      {/* Main panel */}
      <rect x="10" y="10" width="380" height="280" rx="18" fill="url(#libGrad)"
        stroke="rgba(86,86,216,0.55)" strokeWidth="1.5"/>

      {/* Grid header bar */}
      <rect x="10" y="10" width="380" height="36" rx="18" fill="rgba(32,32,168,0.85)"/>
      <rect x="10" y="30" width="380" height="16" fill="rgba(32,32,168,0.85)"/>
      <circle cx="36" cy="28" r="5" fill="rgba(255,80,80,0.7)"/>
      <circle cx="54" cy="28" r="5" fill="rgba(255,180,0,0.7)"/>
      <circle cx="72" cy="28" r="5" fill="rgba(65,211,126,0.7)"/>
      <text x="200" y="33" textAnchor="middle" fill="rgba(244,251,255,0.45)"
        fontSize="10" fontFamily="monospace" letterSpacing="0.1em">GML MOTION LIBRARY v1.0</text>

      {/* Component cards — 3×2 grid */}
      {[
        { x: 24,  y: 58, w: 108, h: 74, label: 'Lower Third',  icon: 'lt',   c: 'rgba(65,211,126,0.22)',  bc: 'rgba(65,211,126,0.55)' },
        { x: 146, y: 58, w: 108, h: 74, label: 'Counter',       icon: 'cnt',  c: 'rgba(86,86,216,0.22)',   bc: 'rgba(86,86,216,0.55)' },
        { x: 268, y: 58, w: 108, h: 74, label: 'Transition',    icon: 'tr',   c: 'rgba(86,86,216,0.18)',   bc: 'rgba(86,86,216,0.45)' },
        { x: 24,  y: 148, w: 108, h: 74, label: 'Text Box',    icon: 'txt',  c: 'rgba(86,86,216,0.18)',   bc: 'rgba(86,86,216,0.45)' },
        { x: 146, y: 148, w: 108, h: 74, label: 'Icon Card',   icon: 'icon', c: 'rgba(32,32,168,0.35)',   bc: 'rgba(86,86,216,0.5)' },
        { x: 268, y: 148, w: 108, h: 74, label: 'Background',  icon: 'bg',   c: 'rgba(65,211,126,0.12)',  bc: 'rgba(65,211,126,0.38)' },
      ].map((card, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: active ? `opacity 0.4s ${i * 0.07}s ease-out` : 'none' }}>
          <rect x={card.x} y={card.y} width={card.w} height={card.h} rx="10"
            fill={card.c} stroke={card.bc} strokeWidth="1"/>
          {/* Icon area */}
          {card.icon === 'lt' && <>
            <rect x={card.x+8} y={card.y+12} width={card.w-16} height="8" rx="3" fill="rgba(65,211,126,0.85)"/>
            <rect x={card.x+8} y={card.y+24} width={(card.w-16)*0.65} height="5" rx="2.5" fill="rgba(65,211,126,0.45)"/>
          </>}
          {card.icon === 'cnt' && <>
            <text x={card.x+card.w/2} y={card.y+32} textAnchor="middle" fill="rgba(86,86,216,0.95)"
              fontSize="22" fontWeight="900" fontFamily="monospace">42</text>
            <rect x={card.x+16} y={card.y+40} width={card.w-32} height="3" rx="1.5" fill="rgba(86,86,216,0.3)"/>
            <rect x={card.x+16} y={card.y+40} width={(card.w-32)*0.6} height="3" rx="1.5" fill="rgba(86,86,216,0.8)"/>
          </>}
          {card.icon === 'tr' && <>
            <rect x={card.x+16} y={card.y+16} width="28" height="40" rx="4" fill="rgba(86,86,216,0.55)"/>
            <path d={`M ${card.x+52} ${card.y+36} L ${card.x+64} ${card.y+36}`} stroke="rgba(86,86,216,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
            <path d={`M ${card.x+60} ${card.y+31} L ${card.x+64} ${card.y+36} L ${card.x+60} ${card.y+41}`} stroke="rgba(86,86,216,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x={card.x+68} y={card.y+16} width="28" height="40" rx="4" fill="rgba(86,86,216,0.38)"/>
          </>}
          {card.icon === 'txt' && <>
            <rect x={card.x+8} y={card.y+14} width={card.w-16} height="4" rx="2" fill="rgba(86,86,216,0.72)"/>
            <rect x={card.x+8} y={card.y+22} width={card.w-28} height="4" rx="2" fill="rgba(86,86,216,0.48)"/>
            <rect x={card.x+8} y={card.y+30} width={card.w-20} height="4" rx="2" fill="rgba(86,86,216,0.35)"/>
            <rect x={card.x+8} y={card.y+38} width={card.w-38} height="4" rx="2" fill="rgba(86,86,216,0.22)"/>
          </>}
          {card.icon === 'icon' && <>
            {[0,1,2,3].map(j => (
              <rect key={j} x={card.x+12+(j%2)*28} y={card.y+12+Math.floor(j/2)*24} width="22" height="18" rx="4"
                fill={j===0?'rgba(65,211,126,0.55)':'rgba(86,86,216,0.45)'}/>
            ))}
          </>}
          {card.icon === 'bg' && <>
            <rect x={card.x+8} y={card.y+10} width={card.w-16} height={card.h-20} rx="6"
              fill="rgba(32,32,168,0.5)" stroke="rgba(65,211,126,0.3)" strokeWidth="1"/>
            <ellipse cx={card.x+card.w/2} cy={card.y+card.h/2-5} rx="22" ry="14" fill="rgba(65,211,126,0.18)" stroke="rgba(65,211,126,0.5)" strokeWidth="1"/>
          </>}
          {/* Label */}
          <text x={card.x+card.w/2} y={card.y+card.h-8} textAnchor="middle"
            fill="rgba(244,251,255,0.38)" fontSize="8" fontFamily="monospace" letterSpacing="0.04em">{card.label}</text>
        </g>
      ))}

      {/* Approval stamp — appears with delay */}
      <g style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.5s ease-out' : 'none' }}>
        <circle cx="200" cy="158" r="52" fill="rgba(0,0,40,0.82)" stroke="rgba(65,211,126,0.55)" strokeWidth="2"/>
        <circle cx="200" cy="158" r="44" fill="none" stroke="rgba(65,211,126,0.25)" strokeWidth="1" strokeDasharray="6 4"/>
        <path d="M 180 158 L 196 174 L 224 144" stroke="rgba(65,211,126,0.95)" strokeWidth="4"
          strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#libGlow)"/>
        <text x="200" y="205" textAnchor="middle" fill="rgba(65,211,126,0.72)"
          fontSize="8" fontFamily="monospace" letterSpacing="0.14em">APPROVED</text>
      </g>

      {/* Bottom status bar */}
      <rect x="24" y="236" width="352" height="42" rx="8" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <circle cx="42" cy="257" r="5" fill="rgba(65,211,126,0.9)" style={{ animation: 'pathGlowPulse 2s infinite' }}/>
      <text x="54" y="261" fill="rgba(65,211,126,0.8)" fontSize="10" fontWeight="700" fontFamily="monospace">جارٍ التنفيذ</text>
      <text x="352" y="261" textAnchor="end" fill="rgba(244,251,255,0.28)" fontSize="9" fontFamily="monospace">6 عناصر جاهزة</text>
    </svg>
  )
}

function IllustrationWorkshop({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,40,0.9)"/>
          <stop offset="100%" stopColor="rgba(32,32,168,0.4)"/>
        </linearGradient>
        <filter id="wsGlow">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Room floor line */}
      <line x1="0" y1="248" x2="400" y2="248" stroke="rgba(86,86,216,0.18)" strokeWidth="1"/>

      {/* Large screen in center */}
      <rect x="110" y="60" width="180" height="120" rx="8" fill="url(#screenGrad)"
        stroke="rgba(86,86,216,0.72)" strokeWidth="2"/>
      <rect x="110" y="60" width="180" height="14" rx="8" fill="rgba(32,32,168,0.9)"/>
      <rect x="110" y="68" width="180" height="6" fill="rgba(32,32,168,0.9)"/>
      {/* Screen content — motion assets on grid */}
      <rect x="120" y="82" width="48" height="34" rx="4" fill="rgba(65,211,126,0.22)" stroke="rgba(65,211,126,0.55)" strokeWidth="1"
        style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.2s ease-out' : 'none' }}/>
      <rect x="176" y="82" width="48" height="34" rx="4" fill="rgba(86,86,216,0.35)" stroke="rgba(86,86,216,0.65)" strokeWidth="1"
        style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.3s ease-out' : 'none' }}/>
      <rect x="232" y="82" width="48" height="34" rx="4" fill="rgba(86,86,216,0.25)" stroke="rgba(86,86,216,0.5)" strokeWidth="1"
        style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.4s ease-out' : 'none' }}/>
      <rect x="120" y="124" width="160" height="8" rx="3" fill="rgba(86,86,216,0.25)"/>
      <rect x="120" y="124" width="90" height="8" rx="3" fill="rgba(65,211,126,0.5)"
        style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.5s ease-out' : 'none' }}/>
      <rect x="120" y="140" width="160" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
      {/* Screen stand */}
      <rect x="192" y="180" width="16" height="24" rx="2" fill="rgba(86,86,216,0.45)"/>
      <rect x="172" y="202" width="56" height="6" rx="3" fill="rgba(86,86,216,0.55)"/>

      {/* Human silhouettes — left group */}
      {/* Person 1 - left */}
      <g style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.1s ease-out' : 'none' }}>
        <circle cx="55" cy="148" r="14" fill="rgba(32,32,168,0.65)" stroke="rgba(86,86,216,0.5)" strokeWidth="1.5"/>
        <rect x="34" y="168" width="42" height="56" rx="10" fill="rgba(32,32,168,0.55)" stroke="rgba(86,86,216,0.4)" strokeWidth="1"/>
        <path d="M 76 190 L 108 165" stroke="rgba(86,86,216,0.55)" strokeWidth="6" strokeLinecap="round"/>
      </g>
      {/* Person 2 - right */}
      <g style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.15s ease-out' : 'none' }}>
        <circle cx="345" cy="148" r="14" fill="rgba(32,32,168,0.55)" stroke="rgba(86,86,216,0.45)" strokeWidth="1.5"/>
        <rect x="324" y="168" width="42" height="56" rx="10" fill="rgba(32,32,168,0.45)" stroke="rgba(86,86,216,0.35)" strokeWidth="1"/>
        <path d="M 324 190 L 292 165" stroke="rgba(86,86,216,0.45)" strokeWidth="6" strokeLinecap="round"/>
      </g>

      {/* Floating asset blocks going TO screen */}
      {[
        { x: 18, y: 108, w: 30, h: 20, c: 'rgba(65,211,126,0.45)' },
        { x: 22, y: 136, w: 26, h: 20, c: 'rgba(86,86,216,0.5)' },
        { x: 348, y: 108, w: 30, h: 20, c: 'rgba(86,86,216,0.45)' },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill={b.c}
          stroke="rgba(86,86,216,0.4)" strokeWidth="1"
          style={{ opacity: active ? 1 : 0, transition: active ? `opacity 0.4s ${0.3 + i * 0.1}s ease-out` : 'none' }}/>
      ))}

      {/* Connection lines from assets to screen */}
      <line x1="48" y1="118" x2="110" y2="105" stroke="rgba(65,211,126,0.25)" strokeWidth="1" strokeDasharray="4 3"/>
      <line x1="48" y1="146" x2="110" y2="130" stroke="rgba(86,86,216,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
      <line x1="348" y1="118" x2="290" y2="105" stroke="rgba(86,86,216,0.2)" strokeWidth="1" strokeDasharray="4 3"/>

      {/* Floating collaboration tags */}
      <g style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.6s ease-out' : 'none' }}>
        <rect x="130" y="26" width="60" height="20" rx="10" fill="rgba(65,211,126,0.1)" stroke="rgba(65,211,126,0.35)" strokeWidth="1"/>
        <text x="160" y="40" textAnchor="middle" fill="rgba(65,211,126,0.8)" fontSize="8" fontFamily="monospace">LIVE SESSION</text>
      </g>
      <g style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.7s ease-out' : 'none' }}>
        <rect x="210" y="26" width="58" height="20" rx="10" fill="rgba(86,86,216,0.1)" stroke="rgba(86,86,216,0.35)" strokeWidth="1"/>
        <text x="239" y="40" textAnchor="middle" fill="rgba(86,86,216,0.8)" fontSize="8" fontFamily="monospace">3 MEMBERS</text>
      </g>
    </svg>
  )
}

function Illustration3D({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <filter id="tdGlow">
          <feGaussianBlur stdDeviation="4" result="b"/>
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
              fill="rgba(32,32,168,0.08)" stroke="rgba(86,86,216,0.18)" strokeWidth="0.5"/>
          )
        })
      )}

      {/* Small cubes scattered — library items */}
      {[
        { tx: 42, ty: 150, s: 1.0, c1: 'rgba(86,86,216,0.65)', c2: 'rgba(32,32,168,0.75)', c3: 'rgba(86,86,216,0.45)', delay: '0.1s' },
        { tx: 100, ty: 130, s: 0.8, c1: 'rgba(65,211,126,0.55)', c2: 'rgba(32,168,80,0.4)', c3: 'rgba(65,211,126,0.35)', delay: '0.2s' },
        { tx: 302, ty: 150, s: 1.0, c1: 'rgba(86,86,216,0.6)', c2: 'rgba(32,32,168,0.7)', c3: 'rgba(86,86,216,0.42)', delay: '0.15s' },
        { tx: 348, ty: 128, s: 0.75, c1: 'rgba(65,211,126,0.45)', c2: 'rgba(32,168,80,0.35)', c3: 'rgba(65,211,126,0.3)', delay: '0.25s' },
        { tx: 60, ty: 210, s: 0.7, c1: 'rgba(86,86,216,0.5)', c2: 'rgba(32,32,168,0.6)', c3: 'rgba(86,86,216,0.35)', delay: '0.3s' },
        { tx: 320, ty: 210, s: 0.7, c1: 'rgba(86,86,216,0.5)', c2: 'rgba(32,32,168,0.6)', c3: 'rgba(86,86,216,0.35)', delay: '0.35s' },
      ].map((cube, i) => {
        const s = cube.s * 30
        const { tx: cx, ty: cy } = cube
        return (
          <g key={i} style={{ opacity: active ? 1 : 0, transition: active ? `opacity 0.4s ${cube.delay} ease-out` : 'none' }}>
            {/* Top face */}
            <path d={`M ${cx},${cy} L ${cx+s},${cy-s*0.5} L ${cx+s*2},${cy} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c1}/>
            {/* Right face */}
            <path d={`M ${cx+s*2},${cy} L ${cx+s*2},${cy+s*0.9} L ${cx+s},${cy+s*1.4} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c2}/>
            {/* Left face */}
            <path d={`M ${cx},${cy} L ${cx},${cy+s*0.9} L ${cx+s},${cy+s*1.4} L ${cx+s},${cy+s*0.5} Z`} fill={cube.c3}/>
          </g>
        )
      })}

      {/* Central large 3D object — wireframe rotating cube */}
      <g transform="translate(200, 145)" style={active ? { animation: 'cubeRotate 8s linear infinite' } : {}}>
        {/* Wireframe cube — front face */}
        <rect x="-40" y="-40" width="80" height="80" rx="4" fill="rgba(32,32,168,0.25)"
          stroke="rgba(86,86,216,0.8)" strokeWidth="1.5"/>
        {/* Top face edges */}
        <path d="M -40,-40 L -22,-54 L 58,-54 L 40,-40" stroke="rgba(86,86,216,0.65)" strokeWidth="1.5" fill="rgba(86,86,216,0.12)"/>
        {/* Right face edges */}
        <path d="M 40,-40 L 58,-54 L 58,26 L 40,40" stroke="rgba(86,86,216,0.55)" strokeWidth="1.5" fill="rgba(32,32,168,0.15)"/>
        {/* Inner glow */}
        <circle cx="0" cy="0" r="24" fill="rgba(65,211,126,0.07)" stroke="rgba(65,211,126,0.35)" strokeWidth="1"/>
        <circle cx="0" cy="0" r="12" fill="rgba(65,211,126,0.12)" stroke="rgba(65,211,126,0.55)" strokeWidth="1.5"
          filter="url(#tdGlow)"/>
        {/* Diagonal lines */}
        <line x1="-40" y1="-40" x2="40" y2="40" stroke="rgba(86,86,216,0.2)" strokeWidth="1" strokeDasharray="3 4"/>
        <line x1="40" y1="-40" x2="-40" y2="40" stroke="rgba(86,86,216,0.2)" strokeWidth="1" strokeDasharray="3 4"/>
      </g>

      {/* Library shelf labels */}
      {[
        { x: 22, y: 90, label: '3D ASSETS' },
        { x: 316, y: 90, label: 'MODELS' },
      ].map((tag, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: active ? `opacity 0.4s ${0.5 + i * 0.1}s ease-out` : 'none' }}>
          <rect x={tag.x} y={tag.y-14} width={tag.label.length * 7.5 + 16} height="18" rx="4"
            fill="rgba(86,86,216,0.12)" stroke="rgba(86,86,216,0.35)" strokeWidth="1"/>
          <text x={tag.x+8} y={tag.y} fill="rgba(86,86,216,0.75)" fontSize="8" fontFamily="monospace" letterSpacing="0.08em">{tag.label}</text>
        </g>
      ))}

      {/* Floating particles */}
      {[{ cx: 160, cy: 60 }, { cx: 240, cy: 52 }, { cx: 170, cy: 250 }, { cx: 235, cy: 258 }].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="2.5" fill="rgba(65,211,126,0.55)"
          style={{ animation: `pathGlowPulse ${2 + i * 0.4}s ${i * 0.3}s ease-in-out infinite` }}/>
      ))}
    </svg>
  )
}

function IllustrationVR({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" style={{ display: 'block', width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="portalGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(65,211,126,0.22)"/>
          <stop offset="60%" stopColor="rgba(32,32,168,0.15)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="vrGlow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="vrGlowSoft">
          <feGaussianBlur stdDeviation="8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Deep space background rings */}
      {[120, 96, 72].map((r, i) => (
        <circle key={i} cx="200" cy="148" r={r}
          stroke={i === 0 ? 'rgba(86,86,216,0.12)' : i === 1 ? 'rgba(86,86,216,0.18)' : 'rgba(65,211,126,0.22)'}
          strokeWidth={i === 2 ? '1.5' : '1'} fill={i === 0 ? 'url(#portalGrad)' : 'none'}
          strokeDasharray={i === 0 ? '8 6' : i === 1 ? '5 4' : 'none'}
          style={{
            opacity: active ? 1 : 0,
            transition: active ? `opacity 0.5s ${i * 0.3}s ease-out` : 'none',
            animation: active ? `pathGlowPulse ${3 + i}s ${i * 0.3}s ease-in-out infinite` : 'none',
          }}/>
      ))}

      {/* Portal center */}
      <circle cx="200" cy="148" r="56" fill="rgba(0,0,60,0.75)"
        stroke="rgba(65,211,126,0.65)" strokeWidth="2" filter="url(#vrGlow)"
        style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.1s ease-out' : 'none' }}/>
      <circle cx="200" cy="148" r="44" fill="rgba(32,32,168,0.35)"
        stroke="rgba(65,211,126,0.35)" strokeWidth="1"
        style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.15s ease-out' : 'none' }}/>

      {/* Portal inner glow + label */}
      <g style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.4s 0.2s ease-out' : 'none' }}>
        <circle cx="200" cy="148" r="30" fill="rgba(65,211,126,0.06)"
          style={active ? { animation: 'portalPulse 2.5s ease-in-out infinite' } : {}}/>
        <text x="200" y="154" textAnchor="middle" fill="rgba(65,211,126,0.6)"
          fontSize="9" fontFamily="monospace" letterSpacing="0.16em">VR / AR</text>
      </g>

      {/* Green path entering portal — from left */}
      <path d="M 0,148 Q 100,148 144,148" stroke="rgba(65,211,126,0.65)" strokeWidth="2.5"
        fill="none" filter="url(#vrGlow)"
        style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.5s 0.3s ease-out' : 'none' }}/>
      <path d="M 0,148 Q 100,148 144,148" stroke="rgba(65,211,126,0.3)" strokeWidth="8"
        fill="none" filter="url(#vrGlowSoft)"
        style={{ opacity: active ? 1 : 0, transition: active ? 'opacity 0.5s 0.3s ease-out' : 'none' }}/>

      {/* Floating UI panels */}
      {[
        { x: 16,  y: 60,  w: 88, h: 56, delay: '0.2s', accent: 'rgba(65,211,126,0.5)' },
        { x: 16,  y: 188, w: 76, h: 44, delay: '0.35s', accent: 'rgba(86,86,216,0.5)' },
        { x: 296, y: 60,  w: 88, h: 56, delay: '0.25s', accent: 'rgba(86,86,216,0.5)' },
        { x: 308, y: 188, w: 76, h: 44, delay: '0.4s', accent: 'rgba(65,211,126,0.45)' },
      ].map((panel, i) => (
        <g key={i} style={{ opacity: active ? 1 : 0, transition: active ? `opacity 0.4s ${panel.delay} ease-out` : 'none' }}>
          <rect x={panel.x} y={panel.y} width={panel.w} height={panel.h} rx="8"
            fill="rgba(32,32,168,0.35)" stroke={panel.accent} strokeWidth="1"
            style={{ backdropFilter: 'blur(8px)' }}/>
          <rect x={panel.x+6} y={panel.y+6} width={panel.w-12} height="4" rx="2" fill={panel.accent} style={{ opacity: 0.7 }}/>
          <rect x={panel.x+6} y={panel.y+14} width={(panel.w-12)*0.65} height="3" rx="1.5" fill="rgba(255,255,255,0.15)"/>
          {panel.h > 45 && <>
            <rect x={panel.x+6} y={panel.y+22} width={(panel.w-12)*0.8} height="3" rx="1.5" fill="rgba(255,255,255,0.1)"/>
            <rect x={panel.x+6} y={panel.y+30} width={(panel.w-12)*0.5} height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
            <rect x={panel.x+6} y={panel.y+44} width={panel.w-12} height="4" rx="2" fill="rgba(0,0,0,0.25)"/>
            <rect x={panel.x+6} y={panel.y+44} width={(panel.w-12)*0.45} height="4" rx="2" fill={panel.accent} style={{ opacity: 0.65 }}/>
          </>}
          {/* Corner glow */}
          <circle cx={panel.x+panel.w} cy={panel.y} r="4" fill={panel.accent} style={{ opacity: 0.6 }}/>
        </g>
      ))}

      {/* Connecting lines from panels to portal */}
      {[
        { x1: 104, y1: 88, x2: 150, y2: 126 },
        { x1: 92,  y1: 210, x2: 148, y2: 168 },
        { x1: 296, y1: 88, x2: 250, y2: 126 },
        { x1: 308, y1: 210, x2: 252, y2: 168 },
      ].map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(86,86,216,0.22)" strokeWidth="1" strokeDasharray="4 3"/>
      ))}

      {/* Light pulses */}
      {[{ cx: 150, cy: 80 }, { cx: 260, cy: 210 }, { cx: 140, cy: 220 }, { cx: 265, cy: 72 }].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="2" fill="rgba(65,211,126,0.7)"
          style={{ animation: `pathGlowPulse ${1.5 + i * 0.5}s ${i * 0.4}s ease-in-out infinite` }}/>
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
        padding: isMobile ? '0 24px 32px' : '32px 40px 32px 20px',
        height: isMobile ? 240 : '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: '100%', maxWidth: 420, aspectRatio: '4/3', position: 'relative' }}>
          <IllComp active={isActive} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 72, pointerEvents: 'none',
          }}>🐱</div>
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

      {/* Journey viewport */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
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
