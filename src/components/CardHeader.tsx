import { type ReactNode } from 'react'
import './CardHeader.scss'

interface CardHeaderProps {
  /** Main heading text or element */
  title: string | ReactNode
  /** Optional subtitle or description */
  subtitle?: string | ReactNode
  /** Optional centered layout (default: true) */
  centered?: boolean
  /** Optional custom CSS class */
  className?: string
}

/**
 * CardHeader: Reusable section title component
 *
 * Provides consistent heading styling with optional subtitle.
 * Used inside Card components to create section headers.
 */
export function CardHeader({
  title,
  subtitle,
  centered = true,
  className = ''
}: CardHeaderProps) {
  return (
    <div className={`card-header ${centered ? 'card-header--centered' : ''} ${className}`.trim()}>
      <h2 className="card-header__title">{title}</h2>
      {subtitle && <p className="card-header__subtitle">{subtitle}</p>}
    </div>
  )
}

export default CardHeader
