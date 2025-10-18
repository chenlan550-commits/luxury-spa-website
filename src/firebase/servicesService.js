// 療程服務 - 從 Firebase 讀取療程資料
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = 'services';

/**
 * 獲取所有療程
 * @returns {Promise<Array>} 療程列表
 */
export const getAllServices = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('獲取療程列表失敗:', error);
    throw error;
  }
};

/**
 * 獲取特定分類的療程
 * @param {string} category - 療程分類
 * @returns {Promise<Array>} 該分類的療程列表
 */
export const getServicesByCategory = async (category) => {
  try {
    const allServices = await getAllServices();
    return allServices.filter(service => service.category === category);
  } catch (error) {
    console.error('獲取分類療程失敗:', error);
    throw error;
  }
};

/**
 * 獲取單一療程
 * @param {string} id - 療程 ID
 * @returns {Promise<Object|null>} 療程資料
 */
export const getServiceById = async (id) => {
  try {
    const allServices = await getAllServices();
    return allServices.find(service => service.id === id) || null;
  } catch (error) {
    console.error('獲取療程資料失敗:', error);
    throw error;
  }
};
