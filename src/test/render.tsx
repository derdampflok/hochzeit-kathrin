import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'

/**
 * Custom render function that wraps components with necessary providers.
 * Currently just wraps the standard RTL render.
 */
const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }
