import './App.scss'
import HeroSection from './components/HeroSection'
import RsvpSection from './components/RsvpSection'
import Location from './components/Location'
import Schedule from './components/Schedule'
import Faq from './components/Faq'

function App() {
  return (
    <main className="invite-page">
      <HeroSection />
      <RsvpSection />
      <Location />
      <Schedule />
      <Faq />
    </main>
  )
}

export default App
