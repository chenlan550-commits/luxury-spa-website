import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import Header from './components/Header'
import Home from './components/Home'
import Services from './components/Services'
import Facilities from './components/Facilities'
import About from './components/About'
import Contact from './components/Contact'
import Booking from './components/Booking'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [language, setLanguage] = useState('zh')

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100">
        <Header language={language} setLanguage={setLanguage} />
        <main>
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/services" element={<Services language={language} />} />
            <Route path="/facilities" element={<Facilities language={language} />} />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/contact" element={<Contact language={language} />} />
            <Route path="/booking" element={<Booking language={language} />} />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </Router>
  )
}

export default App

