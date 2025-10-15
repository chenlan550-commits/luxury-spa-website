// Firebase數據提供者
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const FirebaseDataProvider = () => ({
  // 獲取列表
  getList: async (resource, params) => {
    try {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      
      let q = collection(db, resource);
      
      // 添加排序
      if (field) {
        q = query(q, orderBy(field, order.toLowerCase()));
      } else {
        // 默認按創建時間排序
        q = query(q, orderBy('createdAt', 'desc'));
      }
      
      // 添加篩選
      if (params.filter) {
        Object.keys(params.filter).forEach(key => {
          if (params.filter[key]) {
            q = query(q, where(key, '==', params.filter[key]));
          }
        });
      }
      
      const querySnapshot = await getDocs(q);
      const data = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          ...docData,
          // 轉換Timestamp為字符串
          createdAt: docData.createdAt?.toDate?.()?.toISOString() || docData.createdAt,
          updatedAt: docData.updatedAt?.toDate?.()?.toISOString() || docData.updatedAt,
          lastVisit: docData.lastVisit?.toDate?.()?.toISOString() || docData.lastVisit,
        });
      });
      
      // 分頁處理
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedData = data.slice(start, end);
      
      return {
        data: paginatedData,
        total: data.length,
      };
    } catch (error) {
      console.error('getList error:', error);
      throw new Error(`獲取${resource}列表失敗: ${error.message}`);
    }
  },

  // 獲取單個記錄
  getOne: async (resource, params) => {
    try {
      const docRef = doc(db, resource, params.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const docData = docSnap.data();
        return {
          data: {
            id: docSnap.id,
            ...docData,
            createdAt: docData.createdAt?.toDate?.()?.toISOString() || docData.createdAt,
            updatedAt: docData.updatedAt?.toDate?.()?.toISOString() || docData.updatedAt,
            lastVisit: docData.lastVisit?.toDate?.()?.toISOString() || docData.lastVisit,
          },
        };
      } else {
        throw new Error('記錄不存在');
      }
    } catch (error) {
      console.error('getOne error:', error);
      throw new Error(`獲取${resource}記錄失敗: ${error.message}`);
    }
  },

  // 獲取多個記錄
  getMany: async (resource, params) => {
    try {
      const promises = params.ids.map(id => getDoc(doc(db, resource, id)));
      const docs = await Promise.all(promises);
      
      const data = docs.map(docSnap => {
        if (docSnap.exists()) {
          const docData = docSnap.data();
          return {
            id: docSnap.id,
            ...docData,
            createdAt: docData.createdAt?.toDate?.()?.toISOString() || docData.createdAt,
            updatedAt: docData.updatedAt?.toDate?.()?.toISOString() || docData.updatedAt,
            lastVisit: docData.lastVisit?.toDate?.()?.toISOString() || docData.lastVisit,
          };
        }
        return null;
      }).filter(Boolean);
      
      return { data };
    } catch (error) {
      console.error('getMany error:', error);
      throw new Error(`獲取多個${resource}記錄失敗: ${error.message}`);
    }
  },

  // 獲取多個記錄的引用
  getManyReference: async (resource, params) => {
    try {
      const { target, id } = params;
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      
      let q = query(collection(db, resource), where(target, '==', id));
      
      if (field) {
        q = query(q, orderBy(field, order.toLowerCase()));
      }
      
      const querySnapshot = await getDocs(q);
      const data = [];
      
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt?.toDate?.()?.toISOString() || docData.createdAt,
          updatedAt: docData.updatedAt?.toDate?.()?.toISOString() || docData.updatedAt,
          lastVisit: docData.lastVisit?.toDate?.()?.toISOString() || docData.lastVisit,
        });
      });
      
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedData = data.slice(start, end);
      
      return {
        data: paginatedData,
        total: data.length,
      };
    } catch (error) {
      console.error('getManyReference error:', error);
      throw new Error(`獲取${resource}引用記錄失敗: ${error.message}`);
    }
  },

  // 創建記錄
  create: async (resource, params) => {
    try {
      const data = {
        ...params.data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      
      const docRef = await addDoc(collection(db, resource), data);
      
      return {
        data: {
          id: docRef.id,
          ...data,
          createdAt: data.createdAt.toDate().toISOString(),
          updatedAt: data.updatedAt.toDate().toISOString(),
        },
      };
    } catch (error) {
      console.error('create error:', error);
      throw new Error(`創建${resource}記錄失敗: ${error.message}`);
    }
  },

  // 更新記錄
  update: async (resource, params) => {
    try {
      const data = {
        ...params.data,
        updatedAt: Timestamp.now(),
      };
      
      // 移除id字段，避免更新時出錯
      delete data.id;
      
      const docRef = doc(db, resource, params.id);
      await updateDoc(docRef, data);
      
      return {
        data: {
          id: params.id,
          ...data,
          updatedAt: data.updatedAt.toDate().toISOString(),
        },
      };
    } catch (error) {
      console.error('update error:', error);
      throw new Error(`更新${resource}記錄失敗: ${error.message}`);
    }
  },

  // 更新多個記錄
  updateMany: async (resource, params) => {
    try {
      const promises = params.ids.map(id => {
        const data = {
          ...params.data,
          updatedAt: Timestamp.now(),
        };
        delete data.id;
        return updateDoc(doc(db, resource, id), data);
      });
      
      await Promise.all(promises);
      
      return { data: params.ids };
    } catch (error) {
      console.error('updateMany error:', error);
      throw new Error(`批量更新${resource}記錄失敗: ${error.message}`);
    }
  },

  // 刪除記錄
  delete: async (resource, params) => {
    try {
      await deleteDoc(doc(db, resource, params.id));
      
      return { data: params.previousData };
    } catch (error) {
      console.error('delete error:', error);
      throw new Error(`刪除${resource}記錄失敗: ${error.message}`);
    }
  },

  // 刪除多個記錄
  deleteMany: async (resource, params) => {
    try {
      const promises = params.ids.map(id => deleteDoc(doc(db, resource, id)));
      await Promise.all(promises);
      
      return { data: params.ids };
    } catch (error) {
      console.error('deleteMany error:', error);
      throw new Error(`批量刪除${resource}記錄失敗: ${error.message}`);
    }
  },
});

