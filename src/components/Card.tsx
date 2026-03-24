import { type ReactNode, type CSSProperties } from 'react'
import './Card.scss'

interface CardProps {
  /** Content to render inside the card */
  children: ReactNode
  /** Optional CSS class for custom styling */
  className?: string
  /** Optional inline styles */
  style?: CSSProperties
  /** Optional animation delay (in seconds) for staggered reveals */
  animationDelay?: number
  /** Optional variant for future styling specialization */
  variant?: 'default' | 'hero' | 'memories' | 'rsvp'
}

/**
 * Card: Generic wrapper component for consistent card styling
 *
 * A flexible, reusable container with botanical-inspired styling.
 * Provides consistent borders, shadows, spacing, and animations
 * across all page sections (Hero, Memories, RSVP, etc.).
 *
 * Includes optional botanical corner decorations matching the wedding invitation.
 */
export function Card({
  children,
  className = '',
  style = {},
  animationDelay = 0,
  variant = 'default'
}: CardProps) {
  return (
    <div
      className={`card card--${variant} ${className}`.trim()}
      style={
        {
          '--animation-delay': `${animationDelay}s`,
          ...style
        } as CSSProperties & { '--animation-delay': string }
      }
    >
      {children}
    </div>
  )
}

export default Card
