import './App.scss'
import DecorativeBackground from './components/DecorativeBackground'
import HeroSection from './components/HeroSection'
import RsvpSection from './components/RsvpSection'

function App() {
  return (
    <main className="invite-page">
      <DecorativeBackground />
      <HeroSection />
      <RsvpSection />
    </main>
  )
}

export default App
