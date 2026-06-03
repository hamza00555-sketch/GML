'use client'
import './MeteorArrow.css'

interface MeteorArrowProps {
  className?: string
  direction?: 'rtl' | 'ltr'
  delay?: string
  duration?: string
  style?: React.CSSProperties
}

export default function MeteorArrow({
  className = '',
  direction = 'rtl',
  delay = '0s',
  duration = '5s',
  style,
}: MeteorArrowProps) {
  return (
    <div
      className={`meteorArrow meteorArrow--${direction}${className ? ` ${className}` : ''}`}
      style={{
        '--meteor-delay': delay,
        '--meteor-duration': duration,
        ...style,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <img
        src="/assets/gml/decorative/arrow-meteor.png"
        className="meteorArrow__img"
        alt=""
        aria-hidden="true"
      />
    </div>
  )
}
