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
  duration = '2.8s',
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
      {/*
        Inner body holds the static rotation + all visual elements.
        Outer wrapper animates translate only → clean separation of
        position from orientation.
      */}
      <div className="meteorArrow__body">
        <span className="meteorArrow__tail meteorArrow__tail--wake" />
        <span className="meteorArrow__tail meteorArrow__tail--soft" />
        <span className="meteorArrow__tail meteorArrow__tail--sharp" />
        <img
          src="/assets/gml/decorative/arrow-meteor.png"
          className="meteorArrow__img"
          alt=""
        />
      </div>
    </div>
  )
}
