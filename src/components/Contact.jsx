import { useState } from 'react'
import { MapPin, Phone, Clock, Mail, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

const translations = {
  zh: {
    title: '聯絡我們',
    subtitle: '我們很樂意為您服務',
    info: {
      address: {
        title: '地址',
        value: '406台中市北屯區崇德十路一段550號',
        description: '4樓透天獨棟，騎樓下提供免費停車'
      },
      phone: {
        title: '電話',
        value: '+886-2-1234-5678',
        description: '營業時間內專人接聽'
      },
      hours: {
        title: '營業時間',
        value: '10:00 - 21:00',
        description: '週一至週日，全年無休'
      },
      email: {
        title: '電子郵件',
        value: 'chenlan550@gmail.com',
        description: '24小時內回覆您的訊息'
      }
    },
    form: {
      title: '聯絡表單',
      subtitle: '有任何問題或需要預約諮詢，請填寫以下表單',
      fields: {
        name: '姓名',
        phone: '電話',
        email: '電子郵件',
        service: '感興趣的服務',
        message: '訊息內容',
        submit: '送出訊息'
      },
      placeholders: {
        name: '請輸入您的姓名',
        phone: '請輸入您的電話號碼',
        email: '請輸入您的電子郵件',
        service: '請選擇您感興趣的服務',
        message: '請告訴我們您的需求或問題...'
      },
      services: [
        '身體療程',
        '臉部護理',
        '迷你療程',
        '手作課程',
        '企業包場',
        '其他諮詢'
      ],
      success: '訊息已送出！我們會盡快與您聯絡。',
      error: '送出失敗，請稍後再試或直接來電聯絡。'
    },
    directions: {
      title: '交通指引',
      methods: [
        {
          type: '捷運',
          description: '搭乘台中捷運綠線至文心崇德站（G6），步行約 10-15 分鐘'
        },
        {
          type: '公車',
          description: '搭乘 12、58、71、127、700 路至「崇德豐樂路口」或「崇德國中」站'
        },
        {
          type: '開車',
          description: '走台74線快速道路至崇德交流道下，接崇德路直行即可抵達（請事先詢問停車資訊）'
        },
        {
          type: '計程車',
          description: '直接告知司機「台中市北屯區崇德十路一段550號」即可'
        }
      ],
      landmarks: '地標參考：鄰近台中洲際棒球場、崇德商圈、北屯十期重劃區'
    }
  },
  en: {
    title: 'Contact Us',
    subtitle: 'We are delighted to serve you',
    info: {
      address: {
        title: 'Address',
        value: '458 Xinyi Road Section 4, Xinyi District, Taipei',
        description: '4-floor townhouse with free parking under arcade'
      },
      phone: {
        title: 'Phone',
        value: '+886-2-1234-5678',
        description: 'Professional staff available during business hours'
      },
      hours: {
        title: 'Business Hours',
        value: '10:00 - 21:00',
        description: 'Monday to Sunday, open all year round'
      },
      email: {
        title: 'Email',
        value: 'chenlan550@gmail.com',
        description: 'We will reply to your message within 24 hours'
      }
    },
    form: {
      title: 'Contact Form',
      subtitle: 'If you have any questions or need consultation, please fill out the form below',
      fields: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        service: 'Service of Interest',
        message: 'Message',
        submit: 'Send Message'
      },
      placeholders: {
        name: 'Please enter your name',
        phone: 'Please enter your phone number',
        email: 'Please enter your email',
        service: 'Please select a service you are interested in',
        message: 'Please tell us your needs or questions...'
      },
      services: [
        'Body Treatments',
        'Facial Care',
        'Mini Treatments',
        'Workshop Classes',
        'Corporate Events',
        'Other Consultation'
      ],
      success: 'Message sent! We will contact you as soon as possible.',
      error: 'Failed to send. Please try again later or contact us directly by phone.'
    },
    directions: {
      title: 'Transportation Guide',
      methods: [
        {
          type: 'MRT',
          description: 'Take Taichung MRT Green Line to Wenxin Chongde Station (G6), 10-15 minute walk'
        },
        {
          type: 'Bus',
          description: 'Take routes 12, 58, 71, 127, 700 to "Chongde Fengle Road Intersection" or "Chongde Junior High School" stop'
        },
        {
          type: 'Car',
          description: 'Take Highway 74 to Chongde Interchange, continue straight on Chongde Road (Please inquire about parking in advance)'
        },
        {
          type: 'Taxi',
          description: 'Tell the driver "No. 550, Section 1, Chongde 10th Road, Beitun District, Taichung City"'
        }
      ],
      landmarks: 'Landmarks: Near Taichung Intercontinental Baseball Stadium, Chongde Commercial District, Beitun 10th Phase Redevelopment Area'
    }
  },
  ja: {
    title: 'お問い合わせ',
    subtitle: '喜んでサービスさせていただきます',
    info: {
      address: {
        title: '住所',
        value: '台北市信義区信義路四段458号',
        description: '4階建て一戸建て、アーケード下に無料駐車場'
      },
      phone: {
        title: '電話',
        value: '+886-2-1234-5678',
        description: '営業時間内は専門スタッフが対応'
      },
      hours: {
        title: '営業時間',
        value: '10:00 - 21:00',
        description: '月曜日から日曜日まで、年中無休'
      },
      email: {
        title: 'メール',
        value: 'chenlan550@gmail.com',
        description: '24時間以内にメッセージに返信いたします'
      }
    },
    form: {
      title: 'お問い合わせフォーム',
      subtitle: 'ご質問やご相談がございましたら、以下のフォームにご記入ください',
      fields: {
        name: 'お名前',
        phone: '電話番号',
        email: 'メールアドレス',
        service: 'ご興味のあるサービス',
        message: 'メッセージ',
        submit: 'メッセージを送信'
      },
      placeholders: {
        name: 'お名前を入力してください',
        phone: '電話番号を入力してください',
        email: 'メールアドレスを入力してください',
        service: 'ご興味のあるサービスを選択してください',
        message: 'ご要望やご質問をお聞かせください...'
      },
      services: [
        'ボディトリートメント',
        'フェイシャルケア',
        'ミニトリートメント',
        'ワークショップクラス',
        '企業イベント',
        'その他のご相談'
      ],
      success: 'メッセージが送信されました！できるだけ早くご連絡いたします。',
      error: '送信に失敗しました。後でもう一度お試しいただくか、直接お電話でお問い合わせください。'
    },
    directions: {
      title: 'アクセス',
      methods: [
        {
          type: 'MRT',
          description: '台中MRTグリーンラインで文心崇德駅（G6）まで、徒歩約10-15分'
        },
        {
          type: 'バス',
          description: '12、58、71、127、700番線で「崇德豐樂路口」または「崇德国中」駅まで'
        },
        {
          type: '車',
          description: '台74線快速道路で崇德インターチェンジまで、崇德路を直進（事前に駐車場情報をお問い合わせください）'
        },
        {
          type: 'タクシー',
          description: '運転手に「台中市北屯区崇德十路一段550号」とお伝えください'
        }
      ],
      landmarks: 'ランドマーク：台中洲際野球場、崇德商圏、北屯十期再開発地区の近く'
    }
  }
}

export default function Contact({ language }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const t = translations[language]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模擬表單提交
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(''), 5000)
    }
  }

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

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.info.address.title}</h3>
              <p className="text-gray-700 font-medium mb-2">{t.info.address.value}</p>
              <p className="text-sm text-gray-500">{t.info.address.description}</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.info.phone.title}</h3>
              <p className="text-gray-700 font-medium mb-2">{t.info.phone.value}</p>
              <p className="text-sm text-gray-500">{t.info.phone.description}</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.info.hours.title}</h3>
              <p className="text-gray-700 font-medium mb-2">{t.info.hours.value}</p>
              <p className="text-sm text-gray-500">{t.info.hours.description}</p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.info.email.title}</h3>
              <p className="text-gray-700 font-medium mb-2">{t.info.email.value}</p>
              <p className="text-sm text-gray-500">{t.info.email.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.form.title}</h2>
                <p className="text-gray-600">{t.form.subtitle}</p>
              </div>

              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitStatus === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitStatus === 'success' ? t.form.success : t.form.error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.form.fields.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.form.placeholders.name}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.form.fields.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.form.placeholders.phone}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.fields.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.form.placeholders.email}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.fields.service}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">{t.form.placeholders.service}</option>
                    {t.form.services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.form.fields.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t.form.placeholders.message}
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      送出中...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      {t.form.fields.submit}
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Map & Directions */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">位置地圖</h3>
                <div className="w-full rounded-lg overflow-hidden shadow-md mb-4">
                  <img 
                    src="/google-maps-location.jpg" 
                    alt="香熏緻身心調理館位置地圖 - 406台中市北屯區崇德十路一段550號"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="text-center">
                  <a 
                    href="https://maps.app.goo.gl/H2VnYH2Ccs3vN5aK9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    在 Google 地圖中開啟
                  </a>
                  <p className="text-sm text-gray-500 mt-3">406台中市北屯區崇德十路一段550號</p>
                </div>
              </div>

              {/* Directions */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.directions.title}</h3>
                <div className="space-y-4">
                  {t.directions.methods.map((method, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{method.type}</h4>
                        <p className="text-gray-600 text-sm">{method.description}</p>
                      </div>
                    </div>
                  ))}
                  {t.directions.landmarks && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                      <p className="text-green-800 text-sm font-medium">{t.directions.landmarks}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

