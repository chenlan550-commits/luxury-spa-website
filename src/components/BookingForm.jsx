import { useState, useEffect } from 'react';
import { createAppointment, checkTimeSlotAvailability } from '../firebase/appointmentService';

// 療程服務資料 (從 Services.jsx 獲取)
const services = [
  { id: 'B01', name: '顱沐淋巴舒壓', duration: 90, price: 2200, discountPrice: 1600 },
  { id: 'B02', name: '腿部輕迎煥新護理', duration: 90, price: 2200, discountPrice: 1600 },
  { id: 'B03', name: '輕奢課程', duration: 90, price: 2250, discountPrice: 1700 },
  { id: 'B04', name: '盈纖緊緻雕塑', duration: 90, price: 2400, discountPrice: 1800 },
  { id: 'B05', name: '極緻舒活全身釋壓', duration: 120, price: 2800, discountPrice: 2000 },
  { id: 'B06', name: '芳香溫灸', duration: 90, price: 2200, discountPrice: 1600 },
  { id: 'B07', name: '淋巴芳香調理', duration: 90, price: 2200, discountPrice: 1600 },
  { id: 'B08', name: '舞風暖宮疏胸', duration: 120, price: 3200, discountPrice: 2400 },
  { id: 'B09', name: '美胸窈窕纖盈', duration: 130, price: 3400, discountPrice: 2400 },
  { id: 'F01', name: '晶亮雪肌嫩白', duration: 90, price: 4200, discountPrice: 1600 },
  { id: 'F02', name: '清新亮妍臉部保養', duration: 90, price: 2400, discountPrice: 1600 },
  { id: 'F03', name: '晶緻亮眼肌活', duration: 130, price: 3200, discountPrice: 2400 },
  { id: 'P01', name: '孕婦SPA', duration: 90, price: 2400, discountPrice: 1800 }
];

const BookingForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    serviceId: '',
    date: '',
    time: '',
    useOwnOils: false,
    notes: ''
  });

  const [selectedService, setSelectedService] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [appointmentId, setAppointmentId] = useState('');

  // 生成可用時段
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 10;
    const endHour = 21;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }
    
    return slots;
  };

  // 當選擇療程時更新服務資訊
  useEffect(() => {
    if (formData.serviceId) {
      const service = services.find(s => s.id === formData.serviceId);
      setSelectedService(service);
    }
  }, [formData.serviceId]);

  // 當選擇日期時檢查可用時段
  useEffect(() => {
    if (formData.date && selectedService) {
      checkAvailableSlots();
    }
  }, [formData.date, selectedService]);

  const checkAvailableSlots = async () => {
    const allSlots = generateTimeSlots();
    const available = [];

    for (const slot of allSlots) {
      const isAvailable = await checkTimeSlotAvailability(
        formData.date,
        slot,
        selectedService.duration
      );
      if (isAvailable) {
        available.push(slot);
      }
    }

    setAvailableTimeSlots(available);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 驗證表單
      if (!formData.customerName || !formData.phone || !formData.serviceId || 
          !formData.date || !formData.time) {
        throw new Error('請填寫所有必填欄位');
      }

      // 檢查時段是否仍然可用
      const isAvailable = await checkTimeSlotAvailability(
        formData.date,
        formData.time,
        selectedService.duration
      );

      if (!isAvailable) {
        throw new Error('抱歉，此時段已被預約，請選擇其他時段');
      }

      // 計算價格
      const price = formData.useOwnOils ? selectedService.discountPrice : selectedService.price;

      // 創建預約
      const appointmentData = {
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: formData.date,
        time: formData.time,
        duration: selectedService.duration,
        price: price,
        useOwnOils: formData.useOwnOils,
        notes: formData.notes
      };

      const id = await createAppointment(appointmentData);
      setAppointmentId(id);
      setSuccess(true);

      // 重置表單
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        serviceId: '',
        date: '',
        time: '',
        useOwnOils: false,
        notes: ''
      });
      setSelectedService(null);

    } catch (err) {
      setError(err.message || '預約失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  // 獲取最小日期（今天）
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // 獲取最大日期（30天後）
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">預約成功！</h2>
          <p className="text-gray-600 mb-4">您的預約編號：{appointmentId}</p>
          <p className="text-gray-600 mb-6">我們已收到您的預約，稍後會有專人與您聯繫確認。</p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            繼續預約
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">線上預約</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 客戶資訊 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            手機號碼 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="0912345678"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            電子郵件
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {/* 療程選擇 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            選擇療程 <span className="text-red-500">*</span>
          </label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">請選擇療程</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} ({service.duration}分鐘) - NT${service.price}
              </option>
            ))}
          </select>
        </div>

        {selectedService && (
          <div className="p-4 bg-amber-50 rounded-lg">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                name="useOwnOils"
                checked={formData.useOwnOils}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">
                自備 doTERRA 精油 (優惠價 NT${selectedService.discountPrice})
              </label>
            </div>
            <p className="text-sm text-gray-600">
              療程時長: {selectedService.duration}分鐘 | 
              價格: NT${formData.useOwnOils ? selectedService.discountPrice : selectedService.price}
            </p>
          </div>
        )}

        {/* 日期時間 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            預約日期 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getMinDate()}
            max={getMaxDate()}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {formData.date && selectedService && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              預約時間 <span className="text-red-500">*</span>
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">請選擇時間</option>
              {availableTimeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {availableTimeSlots.length === 0 && (
              <p className="mt-2 text-sm text-red-600">此日期無可用時段，請選擇其他日期</p>
            )}
          </div>
        )}

        {/* 備註 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            備註
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="有任何特殊需求或注意事項，請在此說明"
          />
        </div>

        {/* 提交按鈕 */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '預約中...' : '確認預約'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

