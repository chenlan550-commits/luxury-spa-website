// 聯絡訊息服務 - Firebase Firestore 操作
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// 集合名稱
const CONTACT_MESSAGES_COLLECTION = 'contact_messages';

/**
 * 建立聯絡訊息
 * @param {Object} messageData - 訊息資料
 * @param {string} messageData.name - 姓名
 * @param {string} messageData.phone - 電話
 * @param {string} messageData.email - Email
 * @param {string} messageData.service - 感興趣的服務
 * @param {string} messageData.message - 訊息內容
 * @param {string} messageData.language - 語言偏好
 * @returns {Promise<string>} 訊息ID
 */
export const createContactMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, CONTACT_MESSAGES_COLLECTION), {
      name: messageData.name.trim(),
      phone: messageData.phone.trim(),
      email: messageData.email.toLowerCase().trim(),
      service: messageData.service,
      message: messageData.message.trim(),
      language: messageData.language || 'zh',
      status: 'unread', // unread, read, replied
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      source: 'website_contact_form'
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating contact message:', error);
    throw error;
  }
};

/**
 * 取得單一訊息
 * @param {string} messageId - 訊息ID
 * @returns {Promise<Object>} 訊息資料
 */
export const getContactMessage = async (messageId) => {
  try {
    const docRef = doc(db, CONTACT_MESSAGES_COLLECTION, messageId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Message not found');
    }
  } catch (error) {
    console.error('Error getting contact message:', error);
    throw error;
  }
};

/**
 * 取得所有訊息
 * @param {Object} filters - 篩選條件
 * @returns {Promise<Array>} 訊息列表
 */
export const getAllContactMessages = async (filters = {}) => {
  try {
    let q = collection(db, CONTACT_MESSAGES_COLLECTION);

    // 應用篩選條件
    const constraints = [];

    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }

    if (filters.language) {
      constraints.push(where('language', '==', filters.language));
    }

    // 排序（最新的在前）
    constraints.push(orderBy('createdAt', 'desc'));

    if (constraints.length > 0) {
      q = query(q, ...constraints);
    }

    const querySnapshot = await getDocs(q);
    const messages = [];

    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return messages;
  } catch (error) {
    console.error('Error getting all contact messages:', error);
    throw error;
  }
};

/**
 * 取得未讀訊息
 * @returns {Promise<Array>} 未讀訊息列表
 */
export const getUnreadMessages = async () => {
  try {
    const q = query(
      collection(db, CONTACT_MESSAGES_COLLECTION),
      where('status', '==', 'unread'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const messages = [];

    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return messages;
  } catch (error) {
    console.error('Error getting unread messages:', error);
    throw error;
  }
};

/**
 * 更新訊息狀態
 * @param {string} messageId - 訊息ID
 * @param {string} status - 新狀態 (unread, read, replied)
 * @returns {Promise<void>}
 */
export const updateMessageStatus = async (messageId, status) => {
  try {
    const docRef = doc(db, CONTACT_MESSAGES_COLLECTION, messageId);
    await updateDoc(docRef, {
      status: status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
};

/**
 * 標記訊息為已讀
 * @param {string} messageId - 訊息ID
 * @returns {Promise<void>}
 */
export const markAsRead = async (messageId) => {
  return updateMessageStatus(messageId, 'read');
};

/**
 * 標記訊息為已回覆
 * @param {string} messageId - 訊息ID
 * @returns {Promise<void>}
 */
export const markAsReplied = async (messageId) => {
  return updateMessageStatus(messageId, 'replied');
};

/**
 * 取得訊息統計
 * @returns {Promise<Object>} 統計資料
 */
export const getMessageStats = async () => {
  try {
    const allMessages = await getAllContactMessages();
    const unreadCount = allMessages.filter(msg => msg.status === 'unread').length;
    const readCount = allMessages.filter(msg => msg.status === 'read').length;
    const repliedCount = allMessages.filter(msg => msg.status === 'replied').length;

    return {
      total: allMessages.length,
      unread: unreadCount,
      read: readCount,
      replied: repliedCount
    };
  } catch (error) {
    console.error('Error getting message stats:', error);
    throw error;
  }
};

export default {
  createContactMessage,
  getContactMessage,
  getAllContactMessages,
  getUnreadMessages,
  updateMessageStatus,
  markAsRead,
  markAsReplied,
  getMessageStats
};
