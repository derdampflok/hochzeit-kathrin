import { render, screen } from './test/render'
import App from './App'

// Mock child components to isolate App logic
jest.mock('./components/DecorativeBackground', () => {
    return function MockDecorativeBackground() {
        return <div data-testid="decorative-background" />
    }
})

jest.mock('./components/HeroSection', () => {
    return function MockHeroSection() {
        return <div data-testid="hero-section" />
    }
})

jest.mock('./components/MemoriesSection', () => {
    return function MockMemoriesSection() {
        return <div data-testid="memories-section" />
    }
})

jest.mock('./components/RsvpSection', () => {
    return function MockRsvpSection() {
        return <div data-testid="rsvp-section" />
    }
})

jest.mock('./services/rsvpService')

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })


    describe('component rendering', () => {
        it('should render all child components', () => {
            render(<App />)
            expect(screen.getByTestId('decorative-background')).toBeInTheDocument()
            expect(screen.getByTestId('hero-section')).toBeInTheDocument()
            expect(screen.getByTestId('memories-section')).toBeInTheDocument()
        })

        it('should render with main element', () => {
            render(<App />)
            const main = screen.getByRole('main')
            expect(main).toBeInTheDocument()
        })
    })

    describe('RSVP section', () => {
        it('should render RsvpSection component', () => {
            render(<App />)
            expect(screen.getByTestId('rsvp-section')).toBeInTheDocument()
        })
    })
})
