import { type ReactNode, type CSSProperties } from 'react'
import './CardContent.scss'

interface CardContentProps {
  /** Content to render inside the card */
  children: ReactNode
  /** Optional CSS class for custom styling */
  className?: string
  /** Optional inline styles */
  style?: CSSProperties
}

/**
 * CardContent: Wrapper for card body content
 *
 * Provides consistent spacing and content containment.
 * Used inside Card components after CardHeader.
 */
export function CardContent({ children, className = '', style = {} }: CardContentProps) {
  return (
    <div className={`card-content ${className}`.trim()} style={style}>
      {children}
    </div>
  )
}

export default CardContent
