// 預約相關的Firebase操作函數
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

// 預約集合名稱
const APPOINTMENTS_COLLECTION = 'appointments';
const CUSTOMERS_COLLECTION = 'customers';

// 提交新預約
export const submitAppointment = async (appointmentData) => {
  try {
    const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), {
      ...appointmentData,
      status: 'pending', // 待確認
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    console.log('預約提交成功，ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('預約提交失敗:', error);
    return { success: false, error: error.message };
  }
};

// 獲取所有預約
export const getAllAppointments = async () => {
  try {
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION), 
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
        // 轉換Timestamp為Date
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        appointmentDate: doc.data().appointmentDate
      });
    });
    
    return appointments;
  } catch (error) {
    console.error('獲取預約失敗:', error);
    return [];
  }
};

// 根據狀態獲取預約
export const getAppointmentsByStatus = async (status) => {
  try {
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION),
      where('status', '==', status),
      orderBy('appointmentDate', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      });
    });
    
    return appointments;
  } catch (error) {
    console.error('獲取預約失敗:', error);
    return [];
  }
};

// 更新預約狀態
export const updateAppointmentStatus = async (appointmentId, status, notes = '') => {
  try {
    const appointmentRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    await updateDoc(appointmentRef, {
      status,
      notes,
      updatedAt: Timestamp.now()
    });
    
    console.log('預約狀態更新成功');
    return { success: true };
  } catch (error) {
    console.error('更新預約狀態失敗:', error);
    return { success: false, error: error.message };
  }
};

// 刪除預約
export const deleteAppointment = async (appointmentId) => {
  try {
    await deleteDoc(doc(db, APPOINTMENTS_COLLECTION, appointmentId));
    console.log('預約刪除成功');
    return { success: true };
  } catch (error) {
    console.error('刪除預約失敗:', error);
    return { success: false, error: error.message };
  }
};

// 獲取今日預約
export const getTodayAppointments = async () => {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD格式
    
    const q = query(
      collection(db, APPOINTMENTS_COLLECTION),
      where('appointmentDate', '==', todayStr),
      orderBy('appointmentTime', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      });
    });
    
    return appointments;
  } catch (error) {
    console.error('獲取今日預約失敗:', error);
    return [];
  }
};

// 客戶相關函數

// 創建或更新客戶資料
export const createOrUpdateCustomer = async (customerData) => {
  try {
    // 先檢查是否已存在該電話號碼的客戶
    const q = query(
      collection(db, CUSTOMERS_COLLECTION),
      where('phone', '==', customerData.phone)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // 客戶已存在，更新資料
      const customerDoc = querySnapshot.docs[0];
      const existingData = customerDoc.data();
      
      await updateDoc(doc(db, CUSTOMERS_COLLECTION, customerDoc.id), {
        ...customerData,
        totalVisits: (existingData.totalVisits || 0) + 1,
        lastVisit: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      return { success: true, id: customerDoc.id, isNew: false };
    } else {
      // 新客戶，創建資料
      const docRef = await addDoc(collection(db, CUSTOMERS_COLLECTION), {
        ...customerData,
        totalVisits: 1,
        totalSpent: 0,
        lastVisit: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      return { success: true, id: docRef.id, isNew: true };
    }
  } catch (error) {
    console.error('客戶資料處理失敗:', error);
    return { success: false, error: error.message };
  }
};

// 獲取所有客戶
export const getAllCustomers = async () => {
  try {
    const q = query(
      collection(db, CUSTOMERS_COLLECTION),
      orderBy('lastVisit', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const customers = [];
    querySnapshot.forEach((doc) => {
      customers.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        lastVisit: doc.data().lastVisit?.toDate()
      });
    });
    
    return customers;
  } catch (error) {
    console.error('獲取客戶資料失敗:', error);
    return [];
  }
};

// 預約狀態常數
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',     // 待確認
  CONFIRMED: 'confirmed', // 已確認
  COMPLETED: 'completed', // 已完成
  CANCELLED: 'cancelled', // 已取消
  NO_SHOW: 'no_show'     // 未出現
};

// 預約狀態中文對照
export const APPOINTMENT_STATUS_LABELS = {
  [APPOINTMENT_STATUS.PENDING]: '待確認',
  [APPOINTMENT_STATUS.CONFIRMED]: '已確認',
  [APPOINTMENT_STATUS.COMPLETED]: '已完成',
  [APPOINTMENT_STATUS.CANCELLED]: '已取消',
  [APPOINTMENT_STATUS.NO_SHOW]: '未出現'
};

