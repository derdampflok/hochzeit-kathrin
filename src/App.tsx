import './App.scss'
import DecorativeBackground from './components/DecorativeBackground'
import HeroSection from './components/HeroSection'
import RsvpSection from './components/RsvpSection'
import Location from './components/Location'
import Schedule from './components/Schedule'
import HotelsParking from './components/HotelsParking'
import Contact from './components/Contact'

function App() {
  return (
    <main className="invite-page">
      <DecorativeBackground />
      <HeroSection />
      <RsvpSection />
      <Location />
      <Schedule />
      <HotelsParking />
      <Contact />
    </main>
  )
}

export default App
