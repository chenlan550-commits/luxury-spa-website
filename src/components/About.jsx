import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Award, Sparkles, Target, Leaf, Users, Shield, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const translations = {
  zh: {
    title: '關於我們',
    brandName: '香熏緻身心調理集團',
    brandSubtitle: 'AROMATHERAPY FOR BODY AND MIND',
    philosophy: {
      title: '🌿 我們的理念',
      keywords: '健康｜保健｜專業｜美容',
      description: '我們致力於將專業調理級認證精油帶入每個家庭，結合居家保健與專業調理服務，透過精油的力量與五感饗宴式的身心靈體驗，為您打造全方位的健康調理方案。'
    },
    mission: {
      title: '💚 品牌使命',
      items: [
        {
          title: '專業精油調理',
          description: '使用 doTERRA「CPTG® 專業純正調理級認證」精油，提供全身性整體健康調理'
        },
        {
          title: '在地貼心服務',
          description: '深耕在地，提供專業優質的芳療服務，讓您在家門口就能享受頂級身心照護'
        },
        {
          title: '居家養生教育',
          description: '推廣精油居家保健觀念，教導正確使用方式，將健康生活帶入日常'
        },
        {
          title: '創新服務理念',
          description: '以創新思維改變精油芳療的服務型態，創造客戶最大的健康與美麗價值'
        }
      ]
    },
    commitment: {
      title: '✨ 我們的承諾',
      description: '結合專業調理技術與精油芳療智慧，透過五感體驗（視覺、聽覺、嗅覺、觸覺、味覺）的全方位照護，讓每一次療程都是身心靈的深度放鬆與療癒之旅。',
      tagline: '香熏緻，您的身心靈健康守護者'
    }
  },
  en: {
    title: 'About Us',
    brandName: 'Ytcep Aromatherapy Group',
    brandSubtitle: 'AROMATHERAPY FOR BODY AND MIND',
    philosophy: {
      title: '🌿 Our Philosophy',
      keywords: 'Health｜Wellness｜Professional｜Beauty',
      description: 'We are committed to bringing professional therapeutic grade certified essential oils into every home, combining home wellness with professional therapeutic services, creating comprehensive health solutions through the power of essential oils and five-sensory body-mind-spirit experiences.'
    },
    mission: {
      title: '💚 Brand Mission',
      items: [
        {
          title: 'Professional Essential Oil Therapy',
          description: 'Using doTERRA "CPTG® Certified Pure Therapeutic Grade" essential oils to provide comprehensive whole-body health therapy'
        },
        {
          title: 'Local Caring Service',
          description: 'Rooted locally, providing professional quality aromatherapy services, allowing you to enjoy premium body-mind care at your doorstep'
        },
        {
          title: 'Home Wellness Education',
          description: 'Promoting essential oil home wellness concepts, teaching proper usage methods, bringing healthy living into daily life'
        },
        {
          title: 'Innovative Service Philosophy',
          description: 'Using innovative thinking to transform essential oil aromatherapy service models, creating maximum health and beauty value for customers'
        }
      ]
    },
    commitment: {
      title: '✨ Our Commitment',
      description: 'Combining professional therapeutic techniques with essential oil aromatherapy wisdom, through five-sensory experiences (sight, hearing, smell, touch, taste) for comprehensive care, making every treatment a journey of deep relaxation and healing for body, mind, and spirit.',
      tagline: 'Ytcep, Your Body-Mind-Spirit Health Guardian'
    }
  },
  ja: {
    title: '私たちについて',
    brandName: 'Ytcepアロマセラピーグループ',
    brandSubtitle: 'AROMATHERAPY FOR BODY AND MIND',
    philosophy: {
      title: '🌿 私たちの理念',
      keywords: '健康｜保健｜専門｜美容',
      description: '私たちは専門的なセラピューティックグレード認定エッセンシャルオイルを各家庭にお届けし、ホームウェルネスと専門的なセラピーサービスを組み合わせ、エッセンシャルオイルの力と五感の饗宴的な心身霊体験を通じて、包括的な健康ケアソリューションを提供することに取り組んでいます。'
    },
    mission: {
      title: '💚 ブランドミッション',
      items: [
        {
          title: '専門エッセンシャルオイルセラピー',
          description: 'doTERRA「CPTG®認定純正セラピューティックグレード」エッセンシャルオイルを使用し、全身的な総合健康ケアを提供'
        },
        {
          title: '地域密着型サービス',
          description: '地域に根ざし、専門的で高品質なアロマセラピーサービスを提供し、お客様の身近で最高級の心身ケアをお楽しみいただけます'
        },
        {
          title: 'ホームウェルネス教育',
          description: 'エッセンシャルオイルのホームケア概念を普及し、正しい使用方法を指導し、健康的な生活を日常に取り入れます'
        },
        {
          title: '革新的サービス理念',
          description: '革新的思考でエッセンシャルオイルアロマセラピーのサービス形態を変革し、お客様の最大の健康と美の価値を創造'
        }
      ]
    },
    commitment: {
      title: '✨ 私たちの約束',
      description: '専門的なセラピー技術とエッセンシャルオイルアロマセラピーの知恵を組み合わせ、五感体験（視覚、聴覚、嗅覚、触覚、味覚）による包括的なケアを通じて、すべてのトリートメントを心身霊の深いリラクゼーションと癒しの旅にします。',
      tagline: 'Ytcep、あなたの心身霊健康の守護者'
    }
  }
}

const About = ({ language = 'zh' }) => {
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {t.title}
          </h1>
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              {t.brandName}
            </h2>
            <p className="text-xl md:text-2xl text-amber-100 font-medium">
              {t.brandSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t.philosophy.title}
            </h2>
            <div className="text-2xl font-semibold text-amber-600 mb-8">
              {t.philosophy.keywords}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {t.philosophy.description}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {t.mission.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.mission.items.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-amber-50 to-green-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                      {index === 0 && <Leaf className="w-6 h-6 text-white" />}
                      {index === 1 && <Heart className="w-6 h-6 text-white" />}
                      {index === 2 && <Users className="w-6 h-6 text-white" />}
                      {index === 3 && <Sparkles className="w-6 h-6 text-white" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {t.commitment.title}
            </h2>
            <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-5xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t.commitment.description}
              </p>
              <div className="text-2xl font-bold text-amber-600 border-t border-amber-200 pt-8">
                {t.commitment.tagline}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Senses Experience */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              五感體驗
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              透過視覺、聽覺、嗅覺、觸覺、味覺的全方位感官體驗，讓每一次療程都是身心靈的完整療癒
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { sense: '視覺', icon: '👁️', description: '優雅環境設計' },
              { sense: '聽覺', icon: '👂', description: '舒緩音樂療癒' },
              { sense: '嗅覺', icon: '👃', description: '精油芳香體驗' },
              { sense: '觸覺', icon: '✋', description: '專業按摩手技' },
              { sense: '味覺', icon: '👅', description: '養生茶飲品嚐' }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-green-50 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.sense}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            準備開始您的身心靈療癒之旅？
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            讓我們用專業的精油調理技術，為您打造專屬的健康美麗方案
          </p>
          <Link to="/booking">
            <Button className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              立即預約體驗
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About

