// 預約服務 - Firebase Firestore 操作
import { 
  collection, 
  addDoc, 
  getDoc,
  getDocs,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// 集合名稱
const APPOINTMENTS_COLLECTION = 'appointments';

/**
 * 創建新預約
 * @param {Object} appointmentData - 預約資料
 * @returns {Promise<string>} 預約ID
 */
export const createAppointment = async (appointmentData) => {
  try {
    const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), {
      ...appointmentData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

/**
 * 獲取預約詳情
 * @param {string} appointmentId - 預約ID
 * @returns {Promise<Object>} 預約資料
 */
export const getAppointment = async (appointmentId) => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Appointment not found');
    }
  } catch (error) {
    console.error('Error getting appointment:', error);
    throw error;
  }
};

/**
 * 根據手機號碼查詢預約
 * @param {string} phone - 手機號碼
 * @returns {Promise<Array>} 預約列表
 */
export const getAppointmentsByPhone = async (phone) => {
  try {
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION),
      where('phone', '==', phone),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const appointments = [];
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return appointments;
  } catch (error) {
    console.error('Error getting appointments by phone:', error);
    throw error;
  }
};

/**
 * 獲取所有預約
 * @param {Object} filters - 篩選條件 (可選)
 * @returns {Promise<Array>} 預約列表
 */
export const getAllAppointments = async (filters = {}) => {
  try {
    let q = collection(db, APPOINTMENTS_COLLECTION);
    
    // 應用篩選條件
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    if (filters.date) {
      q = query(q, where('date', '==', filters.date));
    }
    
    // 排序
    q = query(q, orderBy('date', 'desc'), orderBy('time', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const appointments = [];
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return appointments;
  } catch (error) {
    console.error('Error getting all appointments:', error);
    throw error;
  }
};

/**
 * 更新預約
 * @param {string} appointmentId - 預約ID
 * @param {Object} updateData - 更新資料
 * @returns {Promise<void>}
 */
export const updateAppointment = async (appointmentId, updateData) => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

/**
 * 更新預約狀態
 * @param {string} appointmentId - 預約ID
 * @param {string} status - 新狀態 (pending, confirmed, completed, cancelled)
 * @returns {Promise<void>}
 */
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    await updateAppointment(appointmentId, { status });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

/**
 * 刪除預約
 * @param {string} appointmentId - 預約ID
 * @returns {Promise<void>}
 */
export const deleteAppointment = async (appointmentId) => {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

/**
 * 取消預約
 * @param {string} appointmentId - 預約ID
 * @returns {Promise<void>}
 */
export const cancelAppointment = async (appointmentId) => {
  try {
    await updateAppointmentStatus(appointmentId, 'cancelled');
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
};

/**
 * 獲取指定日期的預約
 * @param {string} date - 日期 (YYYY-MM-DD)
 * @returns {Promise<Array>} 預約列表
 */
export const getAppointmentsByDate = async (date) => {
  try {
    // 獲取所有預約，然後在前端篩選（因為需要支援兩種日期格式）
    const querySnapshot = await getDocs(collection(db, APPOINTMENTS_COLLECTION));
    const appointments = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      let matchesDate = false;
      
      // 檢查舊格式（字串）
      if (data.date === date) {
        matchesDate = true;
      }
      
      // 檢查新格式（Timestamp）
      if (data.bookingDate && data.bookingDate.toDate) {
        const bookingDateStr = data.bookingDate.toDate().toISOString().split('T')[0];
        if (bookingDateStr === date) {
          matchesDate = true;
        }
      }
      
      if (matchesDate) {
        appointments.push({
          id: doc.id,
          ...data
        });
      }
    });
    
    // 按時間排序
    appointments.sort((a, b) => {
      const timeA = a.bookingTime || a.time || '';
      const timeB = b.bookingTime || b.time || '';
      return timeA.localeCompare(timeB);
    });
    
    return appointments;
  } catch (error) {
    console.error('Error getting appointments by date:', error);
    throw error;
  }
};

/**
 * 檢查時段是否可用
 * @param {string} date - 日期 (YYYY-MM-DD)
 * @param {string} time - 時間 (HH:MM)
 * @param {number} duration - 療程時長(分鐘)
 * @returns {Promise<boolean>} 是否可用
 */
export const checkTimeSlotAvailability = async (date, time, duration) => {
  try {
    const appointments = await getAppointmentsByDate(date);
    
    // 將時間轉換為分鐘數以便比較
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const requestedStart = timeToMinutes(time);
    const requestedEnd = requestedStart + duration;
    
    // 檢查是否與現有預約衝突
    for (const appointment of appointments) {
      if (appointment.status === 'cancelled') continue;
      
      const existingStart = timeToMinutes(appointment.bookingTime || appointment.time);
      const existingEnd = existingStart + appointment.duration;
      
      // 檢查時間是否重疊
      if (
        (requestedStart >= existingStart && requestedStart < existingEnd) ||
        (requestedEnd > existingStart && requestedEnd <= existingEnd) ||
        (requestedStart <= existingStart && requestedEnd >= existingEnd)
      ) {
        return false; // 時段不可用
      }
    }
    
    return true; // 時段可用
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    throw error;
  }
};

export default {
  createAppointment,
  getAppointment,
  getAppointmentsByPhone,
  getAllAppointments,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  cancelAppointment,
  getAppointmentsByDate,
  checkTimeSlotAvailability
};

