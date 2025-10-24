import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Award, Users, Clock, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const translations = {
  zh: {
    hero: {
      title: '歡迎回家',
      subtitle: '給您如家一般的歸屬感',
      description: '「香熏緻身心調理館」成立宗旨在於將專業調理級認證之精油帶入家庭，運用居家保健觀念結合調理館，積極提供及推動精油全身性整體健康的調理，加上五感饗宴式的身心靈保健，同時發揮在地服務與精油居家養生教育，進而改變精油芳療的銷售型態與新觀念。提供專業、優質的服務，以創業的創新觀念創造客戶最大的利益。',
      cta: '立即預約',
      quote: '休息是為了走更長遠的路，我們想要協助您走得更遠。'
    },
    features: {
      title: '為什麼選擇我們',
      items: [
        { icon: Award, title: '專業認證', desc: '國際認證的專業療程師團隊' },
        { icon: Star, title: 'doTERRA品質', desc: '使用頂級doTERRA精油產品' },
        { icon: Users, title: '個人化服務', desc: '量身定制的專屬療程體驗' },
        { icon: Clock, title: '便利預約', desc: '24小時線上預約系統' }
      ]
    },
    services: {
      title: '精選療程',
      subtitle: '體驗我們的頂級服務',
      categories: [
        { name: '身體療程', desc: '全身放鬆與深層護理', price: '從 NT$2,250 起' },
        { name: '臉部護理', desc: '專業臉部美容與保養', price: '從 NT$1,800 起' },
        { name: '迷你療程', desc: '快速有效的局部護理', price: '從 NT$1,200 起' }
      ],
      cta: '查看所有療程'
    },
    facilities: {
      title: '奢華空間',
      subtitle: '4樓透天的完整體驗',
      floors: [
        { floor: '1F', name: '接待大廳', desc: '溫馨接待櫃台與手作教室' },
        { floor: '2F', name: '療程空間', desc: '單人房與雙人房專業療程' },
        { floor: '3F', name: 'VIP體驗', desc: '迷你吧、VIP房與多功能空間' }
      ],
      parking: '騎樓免費停車位'
    },
    contact: {
      title: '聯絡資訊',
      address: '406台中市北屯區崇德十路一段550號',
      phone: '+886-2-1234-5678',
      hours: '營業時間：10:00 - 22:00'
    }
  },
  en: {
    hero: {
      title: 'Welcome Home',
      subtitle: 'A sense of belonging like home',
      description: 'We uphold the spirit of putting "people" first, combining Taiwanese tradition, European techniques, and American culture to provide you with an extremely luxurious relaxation experience.',
      cta: 'Book Now',
      quote: 'Rest is for going further. We want to help you go further.'
    },
    features: {
      title: 'Why Choose Us',
      items: [
        { icon: Award, title: 'Professional Certified', desc: 'Internationally certified professional therapist team' },
        { icon: Star, title: 'doTERRA Quality', desc: 'Using premium doTERRA essential oil products' },
        { icon: Users, title: 'Personalized Service', desc: 'Customized exclusive treatment experience' },
        { icon: Clock, title: 'Convenient Booking', desc: '24-hour online booking system' }
      ]
    },
    services: {
      title: 'Featured Treatments',
      subtitle: 'Experience our premium services',
      categories: [
        { name: 'Body Treatments', desc: 'Full body relaxation and deep care', price: 'From NT$2,250' },
        { name: 'Facial Care', desc: 'Professional facial beauty and maintenance', price: 'From NT$1,800' },
        { name: 'Mini Treatments', desc: 'Quick and effective local care', price: 'From NT$1,200' }
      ],
      cta: 'View All Treatments'
    },
    facilities: {
      title: 'Luxury Space',
      subtitle: '4-floor townhouse complete experience',
      floors: [
        { floor: '1F', name: 'Reception Hall', desc: 'Warm reception counter and workshop' },
        { floor: '2F', name: 'Treatment Space', desc: 'Single and double room professional treatments' },
        { floor: '3F', name: 'VIP Experience', desc: 'Mini bar, VIP room and multi-function space' }
      ],
      parking: 'Free parking under arcade'
    },
    contact: {
      title: 'Contact Information',
      address: '458 Xinyi Road Section 4, Xinyi District, Taipei',
      phone: '+886-2-1234-5678',
      hours: 'Business Hours: 10:00 - 22:00'
    }
  },
  ja: {
    hero: {
      title: 'おかえりなさい',
      subtitle: '家のような帰属感を',
      description: '私たちは「人」を本とする精神を持ち、台湾の伝統、ヨーロッパの手技、アメリカの文化を融合し、極上の贅沢なリラクゼーション体験を提供します。',
      cta: '今すぐ予約',
      quote: '休息はより遠くへ行くため。私たちはあなたがより遠くへ行けるよう支援したいのです。'
    },
    features: {
      title: '私たちを選ぶ理由',
      items: [
        { icon: Award, title: '専門認定', desc: '国際認定の専門セラピストチーム' },
        { icon: Star, title: 'doTERRA品質', desc: '最高級doTERRAエッセンシャルオイル製品使用' },
        { icon: Users, title: '個人化サービス', desc: 'オーダーメイドの専用トリートメント体験' },
        { icon: Clock, title: '便利な予約', desc: '24時間オンライン予約システム' }
      ]
    },
    services: {
      title: '厳選トリートメント',
      subtitle: '私たちのプレミアムサービスを体験',
      categories: [
        { name: 'ボディトリートメント', desc: '全身リラクゼーションと深層ケア', price: 'NT$2,250から' },
        { name: 'フェイシャルケア', desc: 'プロフェイシャル美容とメンテナンス', price: 'NT$1,800から' },
        { name: 'ミニトリートメント', desc: '迅速で効果的な局所ケア', price: 'NT$1,200から' }
      ],
      cta: 'すべてのトリートメントを見る'
    },
    facilities: {
      title: '豪華空間',
      subtitle: '4階建て一戸建ての完全体験',
      floors: [
        { floor: '1F', name: 'レセプションホール', desc: '温かい受付カウンターとワークショップ' },
        { floor: '2F', name: 'トリートメント空間', desc: 'シングルとダブルルームの専門トリートメント' },
        { floor: '3F', name: 'VIP体験', desc: 'ミニバー、VIPルーム、多機能空間' }
      ],
      parking: 'アーケード下無料駐車場'
    },
    contact: {
      title: '連絡先情報',
      address: '台北市信義区信義路四段458号',
      phone: '+886-2-1234-5678',
      hours: '営業時間：10:00 - 22:00'
    }
  }
}

export default function Home({ language }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = translations[language]

  const heroImages = [
    {
      desktop: `${import.meta.env.BASE_URL}hero-1.png`,
      mobile: `${import.meta.env.BASE_URL}hero-1-mobile.png`
    },
    {
      desktop: `${import.meta.env.BASE_URL}hero-2.png`,
      mobile: `${import.meta.env.BASE_URL}hero-2-mobile.png`
    },
    {
      desktop: `${import.meta.env.BASE_URL}hero-3.png`,
      mobile: `${import.meta.env.BASE_URL}hero-3-mobile.png`
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((imageSet, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Desktop Image */}
              <div 
                className="hidden md:block w-full h-full bg-cover bg-center bg-gradient-to-br from-amber-100 via-stone-50 to-amber-50"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imageSet.desktop})`,
                  backgroundBlendMode: 'overlay'
                }}
              />
              {/* Mobile Image */}
              <div 
                className="block md:hidden w-full h-full bg-cover bg-center bg-gradient-to-br from-amber-100 via-stone-50 to-amber-50"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imageSet.mobile})`,
                  backgroundBlendMode: 'overlay'
                }}
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-amber-100 font-light">
            {t.hero.subtitle}
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-gray-100">
            {t.hero.description}
          </p>
          <Link to="/booking">
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              {t.hero.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-8 text-amber-100 italic text-lg font-light">
            "{t.hero.quote}"
          </p>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-amber-400 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.services.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.services.subtitle}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {t.services.categories.map((category, index) => {
              const images = [
                `${import.meta.env.BASE_URL}home-body-treatment.png`,
                `${import.meta.env.BASE_URL}home-facial-care.jpg`,
                `${import.meta.env.BASE_URL}home-mini-treatment.png`
              ]
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 overflow-hidden">
                    <img 
                      src={images[index]} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.desc}</p>
                    <p className="text-amber-600 font-semibold text-lg">{category.price}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-full text-lg">
                {t.services.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.facilities.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{t.facilities.subtitle}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {t.facilities.floors.map((floor, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <span className="text-white font-bold text-xl">{floor.floor}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{floor.name}</h3>
                <p className="text-gray-600">{floor.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-amber-600 font-semibold text-lg mb-4">🚗 {t.facilities.parking}</p>
            <Link to="/facilities">
              <Button variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-full">
                查看完整設施
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.contact.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">地址</h3>
              <p className="text-gray-300">{t.contact.address}</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">電話</h3>
              <p className="text-gray-300">{t.contact.phone}</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">營業時間</h3>
              <p className="text-gray-300">10:00 - 22:00</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-full text-lg">
                聯絡我們
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

