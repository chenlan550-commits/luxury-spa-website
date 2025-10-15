import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const translations = {
  zh: {
    home: '首頁',
    services: '療程服務',
    facilities: '環境設備',
    about: '關於我們',
    contact: '聯絡我們',
    booking: '立即預約',
    brandName: '香熏緻身心調理館'
  },
  en: {
    home: 'Home',
    services: 'Services',
    facilities: 'Facilities',
    about: 'About Us',
    contact: 'Contact',
    booking: 'Book Now',
    brandName: 'Ytcep Aromatherapy Center'
  },
  ja: {
    home: 'ホーム',
    services: 'サービス',
    facilities: '施設',
    about: '私たちについて',
    contact: 'お問い合わせ',
    booking: '今すぐ予約',
    brandName: 'Ytcepアロマセラピーセンター'
  }
}

export default function Header({ language, setLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const location = useLocation()
  const t = translations[language]

  const navItems = [
    { path: '/', label: t.home },
    { path: '/services', label: t.services },
    { path: '/facilities', label: t.facilities },
    { path: '/about', label: t.about },
    { path: '/contact', label: t.contact }
  ]

  const languages = [
    { code: 'zh', name: '繁體中文', flag: '🇹🇼' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/ytcep-logo.png" alt="Ytcep Logo" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                {t.brandName}
              </h1>
              <p className="text-xs text-gray-500 font-light">AROMATHERAPY FOR BODY AND MIND</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-amber-600 ${
                  location.pathname === item.path
                    ? 'text-amber-600 border-b-2 border-amber-600 pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Selector & Booking Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{languages.find(l => l.code === language)?.flag}</span>
              </Button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsLangOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-amber-50 flex items-center space-x-2 ${
                        language === lang.code ? 'bg-amber-50 text-amber-600' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/booking">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                {t.booking}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-amber-600 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="px-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 mb-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setIsMenuOpen(false)
                      }}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                        language === lang.code 
                          ? 'bg-amber-100 text-amber-600' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                
                <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full">
                    {t.booking}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

