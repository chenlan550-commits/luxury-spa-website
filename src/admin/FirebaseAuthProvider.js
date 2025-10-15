// Firebase認證提供者
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const FirebaseAuthProvider = () => ({
  // 登入
  login: async ({ username, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      
      // 儲存用戶資訊到localStorage
      localStorage.setItem('auth', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '管理員',
      }));
      
      return Promise.resolve();
    } catch (error) {
      console.error('登入失敗:', error);
      
      // 處理不同的錯誤類型
      let errorMessage = '登入失敗';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = '用戶不存在';
          break;
        case 'auth/wrong-password':
          errorMessage = '密碼錯誤';
          break;
        case 'auth/invalid-email':
          errorMessage = '無效的電子郵件格式';
          break;
        case 'auth/too-many-requests':
          errorMessage = '登入嘗試次數過多，請稍後再試';
          break;
        default:
          errorMessage = error.message;
      }
      
      return Promise.reject(new Error(errorMessage));
    }
  },

  // 登出
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('auth');
      return Promise.resolve();
    } catch (error) {
      console.error('登出失敗:', error);
      return Promise.reject(new Error('登出失敗'));
    }
  },

  // 檢查認證狀態
  checkAuth: () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // 取消監聽
        
        if (user) {
          // 用戶已登入
          const authData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '管理員',
          };
          localStorage.setItem('auth', JSON.stringify(authData));
          resolve();
        } else {
          // 用戶未登入
          localStorage.removeItem('auth');
          reject(new Error('未登入'));
        }
      });
    });
  },

  // 檢查錯誤（處理認證錯誤）
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // 獲取權限
  getPermissions: () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const authData = JSON.parse(auth);
      // 這裡可以根據用戶角色返回不同權限
      // 目前簡單返回admin權限
      return Promise.resolve(['admin']);
    }
    return Promise.reject();
  },

  // 獲取身份信息
  getIdentity: () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const authData = JSON.parse(auth);
      return Promise.resolve({
        id: authData.uid,
        fullName: authData.displayName,
        email: authData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authData.displayName)}&background=f97316&color=fff`,
      });
    }
    return Promise.reject();
  },
});

// 創建管理員帳號的輔助函數（僅在開發環境使用）
export const createAdminAccount = async (email, password, displayName = '管理員') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 可以在這裡添加用戶資料到Firestore
    console.log('管理員帳號創建成功:', user.uid);
    return { success: true, uid: user.uid };
  } catch (error) {
    console.error('創建管理員帳號失敗:', error);
    return { success: false, error: error.message };
  }
};

