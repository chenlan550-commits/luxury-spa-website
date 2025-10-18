import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Calendar, Clock, User, Phone, Mail, CreditCard, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { createAppointment } from '../firebase/appointmentService'

const translations = {
  zh: {
    title: '線上預約',
    subtitle: '簡單四步驟，完成您的專屬療程預約',
    steps: ['選擇服務', '選擇時間', '填寫資料', '確認預約'],
    services: {
      bodyspa: [
        { id: 'B01', name: '顱沐淋巴舒壓', price: 2180, selfOilPrice: 1480, duration: 60 },
        { id: 'B02', name: '腿部輕迎煥新護理', price: 1880, selfOilPrice: 1280, duration: 60 },
        { id: 'B03', name: '輕奢課程', price: 2300, selfOilPrice: 1500, duration: 70 },
        { id: 'B04', name: '盈纖緊緻雕塑', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B05-90', name: '極緻舒活全身釋壓 (90分鐘)', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B05-120', name: '極緻舒活全身釋壓 (120分鐘)', price: 2880, selfOilPrice: 2080, duration: 120 },
        { id: 'B06', name: '芳香溫灸', price: 2600, selfOilPrice: 1800, duration: 90 },
        { id: 'B07', name: '淋巴芳香調理', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B08', name: '舞風暖宮疏胸', price: 3200, selfOilPrice: 2400, duration: 120 },
        { id: 'B09', name: '美胸窈窕纖盈', price: 3400, selfOilPrice: 2400, duration: 130 }
      ],
      facialspa: [
        { id: 'F01', name: '晶亮雪肌嫩白', price: 4200, selfOilPrice: 1600, duration: 90 },
        { id: 'F02', name: '清新亮妍臉部保養', price: 2400, selfOilPrice: 1600, duration: 90 },
        { id: 'F03', name: '晶緻亮眼肌活', price: 3200, selfOilPrice: 2400, duration: 130 }
      ],
      minispa: [
        { id: 'M01', name: '能量甦醒', price: 500, duration: 20 },
        { id: 'M02', name: '頭部理療', price: 500, duration: 20 },
        { id: 'M03', name: '纖體釋放（腰、手、背）', price: 690, duration: 20 },
        { id: 'M04', name: '溫感淨化泥浴', price: 1099, duration: 30 },
        { id: 'M05', name: '暖宮疏胸', price: 800, duration: 40 },
        { id: 'M06-30', name: '加價課程 (30分鐘)', price: 600, duration: 30 },
        { id: 'M06-60', name: '加價課程 (60分鐘)', price: 1000, duration: 60 }
      ],
      pregnancyspa: [
        { id: 'P01', name: '孕婦SPA', price: 2400, duration: 90 }
      ]
    },
    categories: {
      bodyspa: '身體療程',
      facialspa: '臉部護理',
      minispa: '加購課程',
      pregnancyspa: '孕婦專護'
    },
    form: {
      name: '姓名',
      phone: '電話',
      email: '電子郵件',
      gender: '性別',
      age: '年齡',
      notes: '特殊需求',
      genderOptions: ['男性', '女性', '不願透露'],
      ageOptions: ['18-25', '26-35', '36-45', '46-55', '55+'],
      placeholders: {
        name: '請輸入您的姓名',
        phone: '請輸入您的電話號碼',
        email: '請輸入您的電子郵件',
        notes: '如有特殊需求或過敏史，請告知我們...'
      }
    },
    timeSlots: [
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
    ],
    buttons: {
      previous: '上一步',
      next: '下一步',
      confirm: '確認預約',
      selectService: '選擇此服務',
      changeService: '更改服務'
    },
    summary: {
      title: '預約摘要',
      service: '選擇服務',
      date: '預約日期',
      time: '預約時間',
      duration: '療程時間',
      price: '服務費用',
      customer: '客戶資訊',
      total: '總計'
    },
    success: {
      title: '預約成功！',
      message: '您的預約已成功送出，我們會在24小時內與您聯絡確認。',
      reference: '預約編號',
      nextSteps: '接下來我們會：',
      steps: [
        '專人致電確認預約時間',
        '提醒您預約前的注意事項',
        '為您準備專屬的療程體驗'
      ]
    },
    validation: {
      selectService: '請選擇一項服務',
      selectDate: '請選擇預約日期',
      selectTime: '請選擇預約時間',
      fillName: '請填寫姓名',
      fillPhone: '請填寫電話號碼',
      fillEmail: '請填寫電子郵件',
      validEmail: '請輸入有效的電子郵件地址'
    }
  },
  en: {
    title: 'Online Booking',
    subtitle: 'Simple 4 steps to complete your exclusive treatment booking',
    steps: ['Select Service', 'Choose Time', 'Fill Information', 'Confirm Booking'],
    services: {
      bodyspa: [
        { id: 'B01', name: 'Cranial Lymphatic Relief', price: 2180, selfOilPrice: 1480, duration: 60 },
        { id: 'B02', name: 'Leg Renewal Care', price: 1880, selfOilPrice: 1280, duration: 60 },
        { id: 'B03', name: 'Luxury Introductory Course', price: 2300, selfOilPrice: 1500, duration: 70 },
        { id: 'B04', name: 'Slimming Firming Sculpting', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B05-90', name: 'Ultimate Relaxation Full Body Release (90min)', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B05-120', name: 'Ultimate Relaxation Full Body Release (120min)', price: 2880, selfOilPrice: 2080, duration: 120 },
        { id: 'B06', name: 'Aromatic Moxibustion', price: 2600, selfOilPrice: 1800, duration: 90 },
        { id: 'B07', name: 'Lymphatic Aromatic Therapy', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B08', name: 'Feminine Warming & Chest Care', price: 3200, selfOilPrice: 2400, duration: 120 },
        { id: 'B09', name: 'Breast Enhancement & Body Sculpting', price: 3400, selfOilPrice: 2400, duration: 130 }
      ],
      facialspa: [
        { id: 'F01', name: 'Crystal Bright Snow Skin Whitening', price: 4200, selfOilPrice: 1600, duration: 90 },
        { id: 'F02', name: 'Fresh Radiant Facial Care', price: 2400, selfOilPrice: 1600, duration: 90 },
        { id: 'F03', name: 'Crystal Bright Eye Revitalization', price: 3200, selfOilPrice: 2400, duration: 130 }
      ],
      minispa: [
        { id: 'M01', name: 'Energy Revival', price: 500, duration: 20 },
        { id: 'M02', name: 'Head Therapy', price: 500, duration: 20 },
        { id: 'M03', name: 'Body Release (Waist, Arms, Back)', price: 690, duration: 20 },
        { id: 'M04', name: 'Warm Purifying Mud Bath', price: 1099, duration: 30 },
        { id: 'M05', name: 'Uterine Warming & Chest Care', price: 800, duration: 40 },
        { id: 'M06-30', name: 'Extension Service (30min)', price: 600, duration: 30 },
        { id: 'M06-60', name: 'Extension Service (60min)', price: 1000, duration: 60 }
      ],
      pregnancyspa: [
        { id: 'P01', name: 'Pregnancy SPA', price: 2400, duration: 90 }
      ]
    },
    categories: {
      bodyspa: 'Body Treatments',
      facialspa: 'Facial Care',
      minispa: 'Add-on Services',
      pregnancyspa: 'Pregnancy Care'
    },
    form: {
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      gender: 'Gender',
      age: 'Age',
      notes: 'Special Requirements',
      genderOptions: ['Male', 'Female', 'Prefer not to say'],
      ageOptions: ['18-25', '26-35', '36-45', '46-55', '55+'],
      placeholders: {
        name: 'Please enter your name',
        phone: 'Please enter your phone number',
        email: 'Please enter your email',
        notes: 'If you have special requirements or allergies, please let us know...'
      }
    },
    timeSlots: [
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
    ],
    buttons: {
      previous: 'Previous',
      next: 'Next',
      confirm: 'Confirm Booking',
      selectService: 'Select This Service',
      changeService: 'Change Service'
    },
    summary: {
      title: 'Booking Summary',
      service: 'Selected Service',
      date: 'Booking Date',
      time: 'Booking Time',
      duration: 'Treatment Duration',
      price: 'Service Fee',
      customer: 'Customer Information',
      total: 'Total'
    },
    success: {
      title: 'Booking Successful!',
      message: 'Your booking has been successfully submitted. We will contact you within 24 hours to confirm.',
      reference: 'Booking Reference',
      nextSteps: 'Next, we will:',
      steps: [
        'Call to confirm your appointment time',
        'Remind you of pre-appointment notes',
        'Prepare your exclusive treatment experience'
      ]
    },
    validation: {
      selectService: 'Please select a service',
      selectDate: 'Please select a booking date',
      selectTime: 'Please select a booking time',
      fillName: 'Please fill in your name',
      fillPhone: 'Please fill in your phone number',
      fillEmail: 'Please fill in your email',
      validEmail: 'Please enter a valid email address'
    }
  },
  ja: {
    title: 'オンライン予約',
    subtitle: '簡単4ステップで、あなた専用のトリートメント予約を完了',
    steps: ['サービス選択', '時間選択', '情報入力', '予約確認'],
    services: {
      bodyspa: [
        { id: 'B01', name: '頭蓋リンパ緩和', price: 2180, selfOilPrice: 1480, duration: 60 },
        { id: 'B02', name: '脚部軽やか再生ケア', price: 1880, selfOilPrice: 1280, duration: 60 },
        { id: 'B03', name: 'ラグジュアリー入門コース', price: 2300, selfOilPrice: 1500, duration: 70 },
        { id: 'B04', name: 'スリム引き締め彫刻', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B05-90', name: '極上リラックス全身解放 (90分)', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B05-120', name: '極上リラックス全身解放 (120分)', price: 2880, selfOilPrice: 2080, duration: 120 },
        { id: 'B06', name: '芳香温灸', price: 2600, selfOilPrice: 1800, duration: 90 },
        { id: 'B07', name: 'リンパ芳香調理', price: 2200, selfOilPrice: 1600, duration: 90 },
        { id: 'B08', name: '舞風温宮疏胸', price: 3200, selfOilPrice: 2400, duration: 120 },
        { id: 'B09', name: '美胸しなやかスリム', price: 3400, selfOilPrice: 2400, duration: 130 }
      ],
      facialspa: [
        { id: 'F01', name: '晶亮雪肌美白', price: 4200, selfOilPrice: 1600, duration: 90 },
        { id: 'F02', name: '清新輝顔フェイシャルケア', price: 2400, selfOilPrice: 1600, duration: 90 },
        { id: 'F03', name: '晶緻明眸肌活', price: 3200, selfOilPrice: 2400, duration: 130 }
      ],
      minispa: [
        { id: 'M01', name: 'エネルギー蘇生', price: 500, duration: 20 },
        { id: 'M02', name: 'ヘッドセラピー', price: 500, duration: 20 },
        { id: 'M03', name: 'ボディリリース（腰・腕・背中）', price: 690, duration: 20 },
        { id: 'M04', name: '温感浄化泥浴', price: 1099, duration: 30 },
        { id: 'M05', name: '温宮疏胸', price: 800, duration: 40 },
        { id: 'M06-30', name: '追加料金コース (30分)', price: 600, duration: 30 },
        { id: 'M06-60', name: '追加料金コース (60分)', price: 1000, duration: 60 }
      ],
      pregnancyspa: [
        { id: 'P01', name: '妊婦SPA', price: 2400, duration: 90 }
      ]
    },
    categories: {
      bodyspa: 'ボディトリートメント',
      facialspa: 'フェイシャルケア',
      minispa: '追加コース',
      pregnancyspa: 'マタニティケア'
    },
    form: {
      name: 'お名前',
      phone: '電話番号',
      email: 'メールアドレス',
      gender: '性別',
      age: '年齢',
      notes: '特別なご要望',
      genderOptions: ['男性', '女性', '回答しない'],
      ageOptions: ['18-25', '26-35', '36-45', '46-55', '55+'],
      placeholders: {
        name: 'お名前を入力してください',
        phone: '電話番号を入力してください',
        email: 'メールアドレスを入力してください',
        notes: '特別なご要望やアレルギーがございましたらお知らせください...'
      }
    },
    timeSlots: [
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
      '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
    ],
    buttons: {
      previous: '前へ',
      next: '次へ',
      confirm: '予約確認',
      selectService: 'このサービスを選択',
      changeService: 'サービス変更'
    },
    summary: {
      title: '予約サマリー',
      service: '選択サービス',
      date: '予約日',
      time: '予約時間',
      duration: 'トリートメント時間',
      price: 'サービス料金',
      customer: 'お客様情報',
      total: '合計'
    },
    success: {
      title: '予約成功！',
      message: 'ご予約が正常に送信されました。24時間以内に確認のためご連絡いたします。',
      reference: '予約番号',
      nextSteps: '次に私たちが行うこと：',
      steps: [
        'お電話で予約時間を確認',
        '予約前の注意事項をお知らせ',
        'あなた専用のトリートメント体験を準備'
      ]
    },
    validation: {
      selectService: 'サービスを選択してください',
      selectDate: '予約日を選択してください',
      selectTime: '予約時間を選択してください',
      fillName: 'お名前を入力してください',
      fillPhone: '電話番号を入力してください',
      fillEmail: 'メールアドレスを入力してください',
      validEmail: '有効なメールアドレスを入力してください'
    }
  }
}

export default function Booking({ language }) {
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(location.state?.selectedService || null)
  const [selectedCategory, setSelectedCategory] = useState('bodyspa')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingReference, setBookingReference] = useState('')

  const t = translations[language]

  // Generate available dates (next 30 days)
  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const availableDates = generateAvailableDates()

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setCurrentStep(2)
  }

  const handleDateTimeSelect = () => {
    if (!selectedDate || !selectedTime) {
      alert(t.validation.selectDate + ' 和 ' + t.validation.selectTime)
      return
    }
    setCurrentStep(3)
  }

  const handleCustomerInfoSubmit = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email) {
      alert(t.validation.fillName + ', ' + t.validation.fillPhone + ', ' + t.validation.fillEmail)
      return
    }
    if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      alert(t.validation.validEmail)
      return
    }
    setCurrentStep(4)
  }

  const handleFinalConfirm = async () => {
    setIsSubmitting(true)

    try {
      // 準備預約資料，與後台管理系統的欄位對應
      const appointmentData = {
        // 客戶資訊
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        customerGender: customerInfo.gender,
        customerAge: customerInfo.age,

        // 療程資訊
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        serviceDuration: selectedService.duration,
        serviceCategory: selectedCategory,

        // 預約時間
        appointmentDate: selectedDate,
        bookingDate: selectedDate, // 兼容後台
        appointmentTime: selectedTime,
        bookingTime: selectedTime, // 兼容後台
        date: selectedDate, // 兼容舊版
        time: selectedTime, // 兼容舊版
        duration: selectedService.duration,

        // 備註
        notes: customerInfo.notes || '',

        // 狀態 - 預設為待確認
        status: 'pending'
      }

      // 存入 Firebase
      const appointmentId = await createAppointment(appointmentData)

      // 生成預約編號
      const reference = 'SPA' + appointmentId.slice(-6).toUpperCase()
      setBookingReference(reference)
      setBookingComplete(true)
    } catch (error) {
      console.error('預約失敗:', error)
      alert('預約失敗，請稍後再試。錯誤訊息：' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-TW', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    })
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.success.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{t.success.message}</p>
            
            <div className="bg-amber-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">{t.success.reference}</p>
              <p className="text-2xl font-bold text-amber-600">#{bookingReference}</p>
            </div>

            <div className="text-left max-w-md mx-auto mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.success.nextSteps}</h3>
              <ul className="space-y-2">
                {t.success.steps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-full"
            >
              返回首頁
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-stone-100 pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {t.steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep > index + 1 
                    ? 'bg-green-500 text-white' 
                    : currentStep === index + 1 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`ml-3 font-medium ${
                  currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step}
                </span>
                {index < t.steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">選擇您的療程服務</h2>
              
              {/* Category Tabs */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2 bg-gray-100 rounded-lg p-2">
                  {Object.keys(t.categories).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'text-gray-600 hover:text-amber-600'
                      }`}
                    >
                      {t.categories[category]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.services[selectedCategory].map((service) => (
                  <div key={service.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-amber-600">NT${service.price.toLocaleString()}</span>
                          {service.selfOilPrice && (
                            <div className="text-sm text-green-600 font-medium mt-1">
                              自備精油 NT${service.selfOilPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <span className="text-gray-500">{service.duration}分鐘</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleServiceSelect(service)}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full"
                    >
                      {t.buttons.selectService}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">選擇預約時間</h2>
              
              {selectedService && (
                <div className="bg-amber-50 rounded-lg p-4 mb-8 text-center">
                  <p className="text-gray-700">已選擇：<span className="font-semibold text-amber-600">{selectedService.name}</span></p>
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="text-amber-600 hover:text-amber-700 text-sm underline mt-2"
                  >
                    {t.buttons.changeService}
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    選擇日期
                  </h3>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedDate === date
                            ? 'bg-amber-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                        }`}
                      >
                        {formatDate(date)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    選擇時間
                  </h3>
                  <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                    {t.timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedTime === time
                            ? 'bg-amber-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.buttons.previous}
                </Button>
                <Button
                  onClick={handleDateTimeSelect}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white flex items-center"
                >
                  {t.buttons.next}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Customer Information */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">填寫客戶資料</h2>
              
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.name} *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        placeholder={t.form.placeholders.name}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.phone} *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder={t.form.placeholders.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.email} *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder={t.form.placeholders.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.gender}
                      </label>
                      <select
                        value={customerInfo.gender}
                        onChange={(e) => setCustomerInfo({...customerInfo, gender: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="">請選擇</option>
                        {t.form.genderOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.age}
                      </label>
                      <select
                        value={customerInfo.age}
                        onChange={(e) => setCustomerInfo({...customerInfo, age: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="">請選擇</option>
                        {t.form.ageOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.form.notes}
                      </label>
                      <textarea
                        value={customerInfo.notes}
                        onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                        placeholder={t.form.placeholders.notes}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="outline"
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.buttons.previous}
                </Button>
                <Button
                  onClick={handleCustomerInfoSubmit}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white flex items-center"
                >
                  {t.buttons.next}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">確認預約資訊</h2>
              
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">{t.summary.title}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">{t.summary.service}</span>
                      <span className="font-semibold text-gray-900">{selectedService?.name}</span>
                    </div>
                    
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">{t.summary.date}</span>
                      <span className="font-semibold text-gray-900">{formatDate(selectedDate)}</span>
                    </div>
                    
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">{t.summary.time}</span>
                      <span className="font-semibold text-gray-900">{selectedTime}</span>
                    </div>
                    
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">{t.summary.duration}</span>
                      <span className="font-semibold text-gray-900">{selectedService?.duration} 分鐘</span>
                    </div>
                    
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">{t.summary.customer}</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{customerInfo.name}</div>
                        <div className="text-sm text-gray-500">{customerInfo.phone}</div>
                        <div className="text-sm text-gray-500">{customerInfo.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between py-4 bg-amber-50 rounded-lg px-4">
                      <span className="text-lg font-semibold text-gray-900">{t.summary.total}</span>
                      <span className="text-2xl font-bold text-amber-600">NT${selectedService?.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => setCurrentStep(3)}
                  variant="outline"
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.buttons.previous}
                </Button>
                <Button
                  onClick={handleFinalConfirm}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      處理中...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      {t.buttons.confirm}
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

