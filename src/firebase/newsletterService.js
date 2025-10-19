// 電子報訂閱服務 - Firebase Firestore 操作
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// 集合名稱
const NEWSLETTER_COLLECTION = 'newsletter_subscribers';

/**
 * 訂閱電子報
 * @param {Object} subscriberData - 訂閱者資料
 * @param {string} subscriberData.email - Email 地址
 * @param {string} subscriberData.language - 語言偏好 (zh/en/ja)
 * @returns {Promise<string>} 訂閱ID
 */
export const subscribeNewsletter = async (subscriberData) => {
  try {
    // 檢查 Email 是否已經訂閱
    const existingSubscriber = await checkEmailExists(subscriberData.email);

    if (existingSubscriber) {
      throw new Error('此 Email 已經訂閱過電子報');
    }

    // 新增訂閱者
    const docRef = await addDoc(collection(db, NEWSLETTER_COLLECTION), {
      email: subscriberData.email.toLowerCase().trim(), // 統一小寫並移除空格
      language: subscriberData.language || 'zh',
      status: 'active', // active, unsubscribed
      subscribedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      source: 'website_footer' // 記錄訂閱來源
    });

    return docRef.id;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

/**
 * 檢查 Email 是否已存在
 * @param {string} email - Email 地址
 * @returns {Promise<boolean>} 是否已存在
 */
export const checkEmailExists = async (email) => {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const q = query(
      collection(db, NEWSLETTER_COLLECTION),
      where('email', '==', normalizedEmail)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking email existence:', error);
    throw error;
  }
};

/**
 * 取得所有訂閱者
 * @returns {Promise<Array>} 訂閱者列表
 */
export const getAllSubscribers = async () => {
  try {
    const q = query(
      collection(db, NEWSLETTER_COLLECTION),
      where('status', '==', 'active')
    );

    const querySnapshot = await getDocs(q);
    const subscribers = [];

    querySnapshot.forEach((doc) => {
      subscribers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return subscribers;
  } catch (error) {
    console.error('Error getting all subscribers:', error);
    throw error;
  }
};

/**
 * 依語言取得訂閱者
 * @param {string} language - 語言 (zh/en/ja)
 * @returns {Promise<Array>} 訂閱者列表
 */
export const getSubscribersByLanguage = async (language) => {
  try {
    const q = query(
      collection(db, NEWSLETTER_COLLECTION),
      where('status', '==', 'active'),
      where('language', '==', language)
    );

    const querySnapshot = await getDocs(q);
    const subscribers = [];

    querySnapshot.forEach((doc) => {
      subscribers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return subscribers;
  } catch (error) {
    console.error('Error getting subscribers by language:', error);
    throw error;
  }
};

export default {
  subscribeNewsletter,
  checkEmailExists,
  getAllSubscribers,
  getSubscribersByLanguage
};
