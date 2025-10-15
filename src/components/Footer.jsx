import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'

const translations = {
  zh: {
    company: {
      name: '香熏緻精選療程推廣',
      description: '使用 doTERRA 美商多特瑞 CPTG® 專業純正調理級認證 純正的植物天然精油，透過十大系統自我檢測、專業諮詢，搭配精油配方結合柔中帶剛的芳療SPA手法，幫助活絡循環、舒緩肌肉緊繃、舒緩壓力、健康及放鬆，現代SPA 透過人體的五大感官功能，達到全方位身心暢快的享受。'
    },
    quickLinks: {
      title: '快速連結',
      links: [
        { name: '首頁', href: '/' },
        { name: 'SPA療程', href: '/services' },
        { name: '設施環境', href: '/facilities' },
        { name: '關於我們', href: '/about' },
        { name: '聯絡我們', href: '/contact' },
        { name: '線上預約', href: '/booking' }
      ]
    },
    services: {
      title: '熱門療程',
      items: [
        '極緻舒活全身釋壓',
        '顱沐淋巴舒壓',
        '晶亮雪肌嫩白',
        '舞風暖宮疏胸',
        '芳香溫灸'
      ]
    },
    contact: {
      title: '聯絡資訊',
      address: '406台中市北屯區崇德十路一段550號',
      phone: '+886-2-1234-5678',
      email: 'chenlan550@gmail.com',
      hours: '10:00 - 21:00 (週一至週日)'
    },
    social: {
      title: '追蹤我們',
      description: '關注我們的社群媒體，獲得最新優惠與美容資訊'
    },
    newsletter: {
      title: '訂閱電子報',
      description: '訂閱我們的電子報，第一時間獲得最新優惠與活動資訊',
      placeholder: '請輸入您的電子郵件',
      button: '訂閱'
    },
    copyright: '© 2024 奢華精油SPA. 版權所有.',
    policies: [
      { name: '隱私政策', href: '/privacy' },
      { name: '服務條款', href: '/terms' },
      { name: '退款政策', href: '/refund' }
    ]
  },
  en: {
    company: {
      name: 'Luxury Essential Oil SPA',
      description: 'Combining Taiwanese tradition, European techniques, and American culture to provide you with an extremely luxurious relaxation experience, redefining your perception of SPA.'
    },
    quickLinks: {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'SPA Treatments', href: '/services' },
        { name: 'Facilities', href: '/facilities' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Online Booking', href: '/booking' }
      ]
    },
    services: {
      title: 'Popular Treatments',
      items: [
        'Ultimate Full Body Relaxation',
        'Cranial Lymphatic Relief',
        'Radiant Whitening Facial',
        'Feminine Wellness Care',
        'Aromatic Moxibustion'
      ]
    },
    contact: {
      title: 'Contact Information',
      address: '458 Xinyi Road Section 4, Xinyi District, Taipei',
      phone: '+886-2-1234-5678',
      email: 'chenlan550@gmail.com',
      hours: '10:00 - 21:00 (Monday to Sunday)'
    },
    social: {
      title: 'Follow Us',
      description: 'Follow our social media for the latest offers and beauty information'
    },
    newsletter: {
      title: 'Newsletter',
      description: 'Subscribe to our newsletter to get the latest offers and event information',
      placeholder: 'Enter your email address',
      button: 'Subscribe'
    },
    copyright: '© 2024 Luxury Essential Oil SPA. All rights reserved.',
    policies: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Refund Policy', href: '/refund' }
    ]
  },
  ja: {
    company: {
      name: 'ラグジュアリーエッセンシャルオイルSPA',
      description: '台湾の伝統、ヨーロッパの手技、アメリカの文化を融合し、極上の贅沢なリラクゼーション体験を提供し、SPAに対する認識を再定義します。'
    },
    quickLinks: {
      title: 'クイックリンク',
      links: [
        { name: 'ホーム', href: '/' },
        { name: 'SPAトリートメント', href: '/services' },
        { name: '施設', href: '/facilities' },
        { name: '私たちについて', href: '/about' },
        { name: 'お問い合わせ', href: '/contact' },
        { name: 'オンライン予約', href: '/booking' }
      ]
    },
    services: {
      title: '人気トリートメント',
      items: [
        '極致全身リラクゼーション',
        '頭部リンパマッサージ',
        '美白フェイシャル',
        '女性ケア',
        'アロマ温灸'
      ]
    },
    contact: {
      title: 'お問い合わせ情報',
      address: '台北市信義区信義路四段458号',
      phone: '+886-2-1234-5678',
      email: 'chenlan550@gmail.com',
      hours: '10:00 - 21:00 (月曜日から日曜日まで)'
    },
    social: {
      title: 'フォローしてください',
      description: '最新のオファーと美容情報については、ソーシャルメディアをフォローしてください'
    },
    newsletter: {
      title: 'ニュースレター',
      description: '最新のオファーやイベント情報を入手するには、ニュースレターを購読してください',
      placeholder: 'メールアドレスを入力してください',
      button: '購読'
    },
    copyright: '© 2024 ラグジュアリーエッセンシャルオイルSPA. 全著作権所有.',
    policies: [
      { name: 'プライバシーポリシー', href: '/privacy' },
      { name: '利用規約', href: '/terms' },
      { name: '返金ポリシー', href: '/refund' }
    ]
  }
}

export default function Footer({ language }) {
  const t = translations[language]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // 處理電子報訂閱邏輯
    alert('感謝您的訂閱！')
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-amber-400 mb-4">{t.company.name}</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t.company.description}
            </p>
            
            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.social.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{t.social.description}</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors duration-200">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t.quickLinks.title}</h4>
            <ul className="space-y-3">
              {t.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t.services.title}</h4>
            <ul className="space-y-3">
              {t.services.items.map((service, index) => (
                <li key={index}>
                  <a 
                    href="/services" 
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t.contact.title}</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{t.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{t.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{t.contact.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{t.contact.hours}</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.newsletter.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{t.newsletter.description}</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2 rounded-lg font-medium transition-all duration-200"
                >
                  {t.newsletter.button}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">{t.copyright}</p>
            <div className="flex space-x-6">
              {t.policies.map((policy, index) => (
                <a
                  key={index}
                  href={policy.href}
                  className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                >
                  {policy.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

