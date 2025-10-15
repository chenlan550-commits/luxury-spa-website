import { useState } from 'react'
import { Car, Coffee, Users, Sparkles, MapPin, Clock, Wifi, AirVent } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const translations = {
  zh: {
    title: '奢華環境設備',
    subtitle: '4樓透天的完整體驗空間',
    parking: {
      title: '專屬停車位',
      description: '騎樓下可停放兩部轎車，為您提供最便利的停車服務'
    },
    floors: {
      '1F': {
        title: '1樓 - 接待大廳',
        subtitle: '溫馨迎賓空間',
        areas: [
          { name: '接待櫃台', description: '專業接待服務，溫馨迎賓體驗', icon: Users },
          { name: '手作教室', description: 'doTERRA精油手作課程與諮詢', icon: Sparkles },
          { name: '產品展示區', description: '精選doTERRA產品展示與銷售', icon: Coffee }
        ]
      },
      '2F': {
        title: '2樓 - 療程空間',
        subtitle: '專業治療環境',
        areas: [
          { name: '單人療程房', description: '私密舒適的個人療程空間', icon: Users },
          { name: '雙人療程房', description: '適合情侶或朋友的雙人體驗', icon: Users },
          { name: '休息區', description: '療程後的放鬆休憩空間', icon: Coffee }
        ]
      },
      '3F': {
        title: '3樓 - VIP體驗',
        subtitle: '頂級奢華享受',
        areas: [
          { name: '迷你吧', description: '精選茶飲與輕食服務', icon: Coffee },
          { name: 'VIP房', description: '頂級私人專屬療程空間', icon: Sparkles },
          { name: '多功能教學空間', description: '團體課程與企業包場服務', icon: Users }
        ]
      }
    },
    features: {
      title: '設施特色',
      items: [
        { icon: Car, title: '免費停車', description: '騎樓下專屬停車位，免費使用' },
        { icon: Wifi, title: '免費WiFi', description: '全館高速無線網路覆蓋' },
        { icon: AirVent, title: '空氣淨化', description: '全館空氣淨化系統，確保空氣品質' },
        { icon: Clock, title: '彈性時間', description: '營業時間 10:00-22:00，配合您的時間' }
      ]
    },
    amenities: {
      title: '貼心服務',
      description: '我們提供完整的配套服務，讓您的體驗更加完美',
      items: [
        '免費停車服務',
        '迎賓茶飲招待',
        '個人置物櫃',
        '免費WiFi上網',
        '空氣淨化系統',
        '專業諮詢服務',
        '產品試用體驗',
        '企業包場服務'
      ]
    },
    cta: {
      title: '準備好體驗我們的奢華空間了嗎？',
      description: '立即預約，親自感受我們精心打造的每一個細節',
      button: '立即預約參觀'
    }
  },
  en: {
    title: 'Luxury Environment & Facilities',
    subtitle: 'Complete experience space in 4-floor townhouse',
    parking: {
      title: 'Exclusive Parking',
      description: 'Two car parking spaces under the arcade, providing the most convenient parking service'
    },
    floors: {
      '1F': {
        title: '1F - Reception Hall',
        subtitle: 'Warm welcome space',
        areas: [
          { name: 'Reception Counter', description: 'Professional reception service, warm welcome experience', icon: Users },
          { name: 'Workshop', description: 'doTERRA essential oil workshops and consultation', icon: Sparkles },
          { name: 'Product Display', description: 'Selected doTERRA product display and sales', icon: Coffee }
        ]
      },
      '2F': {
        title: '2F - Treatment Space',
        subtitle: 'Professional treatment environment',
        areas: [
          { name: 'Single Room', description: 'Private and comfortable personal treatment space', icon: Users },
          { name: 'Double Room', description: 'Perfect for couples or friends dual experience', icon: Users },
          { name: 'Rest Area', description: 'Relaxation space after treatment', icon: Coffee }
        ]
      },
      '3F': {
        title: '3F - VIP Experience',
        subtitle: 'Premium luxury enjoyment',
        areas: [
          { name: 'Mini Bar', description: 'Selected beverages and light refreshments', icon: Coffee },
          { name: 'VIP Room', description: 'Top-tier private exclusive treatment space', icon: Sparkles },
          { name: 'Multi-function Space', description: 'Group classes and corporate event services', icon: Users }
        ]
      }
    },
    features: {
      title: 'Facility Features',
      items: [
        { icon: Car, title: 'Free Parking', description: 'Exclusive parking under arcade, free of charge' },
        { icon: Wifi, title: 'Free WiFi', description: 'High-speed wireless internet throughout the building' },
        { icon: AirVent, title: 'Air Purification', description: 'Building-wide air purification system ensuring air quality' },
        { icon: Clock, title: 'Flexible Hours', description: 'Operating hours 10:00-22:00, accommodating your schedule' }
      ]
    },
    amenities: {
      title: 'Thoughtful Services',
      description: 'We provide complete supporting services to make your experience more perfect',
      items: [
        'Free parking service',
        'Welcome beverage service',
        'Personal lockers',
        'Free WiFi internet',
        'Air purification system',
        'Professional consultation',
        'Product trial experience',
        'Corporate event services'
      ]
    },
    cta: {
      title: 'Ready to experience our luxury space?',
      description: 'Book now and personally feel every detail we have carefully crafted',
      button: 'Book a Visit Now'
    }
  },
  ja: {
    title: '豪華環境・設備',
    subtitle: '4階建て一戸建ての完全体験空間',
    parking: {
      title: '専用駐車場',
      description: 'アーケード下に2台分の駐車スペース、最も便利な駐車サービスを提供'
    },
    floors: {
      '1F': {
        title: '1F - レセプションホール',
        subtitle: '温かいお迎え空間',
        areas: [
          { name: 'レセプションカウンター', description: 'プロフェッショナルな受付サービス、温かいお迎え体験', icon: Users },
          { name: 'ワークショップ', description: 'doTERRAエッセンシャルオイルワークショップとコンサルテーション', icon: Sparkles },
          { name: '商品展示エリア', description: '厳選されたdoTERRA商品の展示と販売', icon: Coffee }
        ]
      },
      '2F': {
        title: '2F - トリートメント空間',
        subtitle: 'プロフェッショナルな治療環境',
        areas: [
          { name: 'シングルルーム', description: 'プライベートで快適な個人トリートメント空間', icon: Users },
          { name: 'ダブルルーム', description: 'カップルや友人に最適なデュアル体験', icon: Users },
          { name: '休憩エリア', description: 'トリートメント後のリラクゼーション空間', icon: Coffee }
        ]
      },
      '3F': {
        title: '3F - VIP体験',
        subtitle: 'プレミアム豪華享受',
        areas: [
          { name: 'ミニバー', description: '厳選された飲み物と軽食サービス', icon: Coffee },
          { name: 'VIPルーム', description: '最高級プライベート専用トリートメント空間', icon: Sparkles },
          { name: '多機能教育空間', description: 'グループクラスと企業イベントサービス', icon: Users }
        ]
      }
    },
    features: {
      title: '施設の特徴',
      items: [
        { icon: Car, title: '無料駐車場', description: 'アーケード下専用駐車場、無料利用' },
        { icon: Wifi, title: '無料WiFi', description: '館内全体の高速無線インターネット' },
        { icon: AirVent, title: '空気清浄', description: '館内全体の空気清浄システム、空気品質を確保' },
        { icon: Clock, title: 'フレキシブル時間', description: '営業時間10:00-22:00、お客様のスケジュールに合わせて' }
      ]
    },
    amenities: {
      title: '心遣いサービス',
      description: '完全なサポートサービスを提供し、お客様の体験をより完璧にします',
      items: [
        '無料駐車サービス',
        'ウェルカムドリンクサービス',
        '個人ロッカー',
        '無料WiFiインターネット',
        '空気清浄システム',
        'プロフェッショナルコンサルテーション',
        '商品試用体験',
        '企業イベントサービス'
      ]
    },
    cta: {
      title: '私たちの豪華空間を体験する準備はできましたか？',
      description: '今すぐ予約して、私たちが丁寧に作り上げたすべての詳細を直接感じてください',
      button: '今すぐ見学予約'
    }
  }
}

export default function Facilities({ language }) {
  const [activeFloor, setActiveFloor] = useState('1F')
  const t = translations[language]

  const floors = ['1F', '2F', '3F']

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 pt-20">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-white/30"></div>
          </div>
        </div>
      </section>

      {/* Parking Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl p-8 text-center">
            <Car className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.parking.title}</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t.parking.description}
            </p>
          </div>
        </div>
      </section>

      {/* Floor Navigation */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            {floors.map((floor) => (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor)}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                  activeFloor === floor
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 shadow-md'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.floors[activeFloor].title}
            </h2>
            <p className="text-xl text-amber-600 font-medium">
              {t.floors[activeFloor].subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.floors[activeFloor].areas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{area.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.features.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.features.items.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.amenities.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t.amenities.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.amenities.items.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 text-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mx-auto mb-2"></div>
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t.cta.description}
          </p>
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            {t.cta.button}
          </Button>
        </div>
      </section>
    </div>
  )
}

