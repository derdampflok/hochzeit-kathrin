import './App.scss'
import HeroSection from './components/HeroSection'
import RsvpSection from './components/RsvpSection'
import Location from './components/Location'
import Schedule from './components/Schedule'
import Contact from './components/Contact'
import Faq from './components/Faq'
import PictureIntermission from './components/PictureIntermission'

function App() {
  return (
    <main className="invite-page">
      <HeroSection />
      <RsvpSection />
      <PictureIntermission />
      <Schedule />
      <Location />
      <Faq />
      <Contact />
    </main>
  )
}

export default App
