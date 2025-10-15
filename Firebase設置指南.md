# Firebase設置指南 - 豪華精油SPA預約管理系統

## 🎯 概述

由於您已經有Firebase帳號，我們可以快速設置預約管理系統！以下是完整的配置步驟。

## 📋 第一步：創建Firebase專案

### 1. 登入Firebase Console
- 前往 [https://console.firebase.google.com/](https://console.firebase.google.com/)
- 使用您的Google帳號登入

### 2. 創建新專案
- 點擊「建立專案」
- 專案名稱：`luxury-spa-booking`（或您喜歡的名稱）
- 選擇是否啟用Google Analytics（建議啟用）
- 點擊「建立專案」

## 🔧 第二步：配置Firebase服務

### 1. 啟用Authentication（認證）
```
1. 在Firebase Console左側選單點擊「Authentication」
2. 點擊「開始使用」
3. 選擇「Sign-in method」標籤
4. 啟用「電子郵件/密碼」登入方式
5. 點擊「儲存」
```

### 2. 創建管理員帳號
```
1. 在Authentication頁面點擊「Users」標籤
2. 點擊「新增使用者」
3. 輸入管理員電子郵件：admin@your-spa.com
4. 輸入密碼：設置一個強密碼
5. 點擊「新增使用者」
```

### 3. 設置Firestore Database
```
1. 在左側選單點擊「Firestore Database」
2. 點擊「建立資料庫」
3. 選擇「以測試模式啟動」（暫時）
4. 選擇資料庫位置：asia-east1（台灣）
5. 點擊「完成」
```

### 4. 配置安全規則（重要！）
在Firestore Database的「規則」標籤中，替換為以下規則：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 預約資料 - 只有已認證用戶可以讀寫
    match /appointments/{document} {
      allow read, write: if request.auth != null;
    }
    
    // 客戶資料 - 只有已認證用戶可以讀寫
    match /customers/{document} {
      allow read, write: if request.auth != null;
    }
    
    // 其他集合拒絕存取
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 🔑 第三步：獲取Firebase配置

### 1. 添加Web應用程式
```
1. 在Firebase Console主頁點擊「Web」圖標（</>）
2. 應用程式暱稱：「SPA Booking Admin」
3. 勾選「同時為此應用程式設定Firebase Hosting」
4. 點擊「註冊應用程式」
```

### 2. 複製配置資訊
您會看到類似以下的配置：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "luxury-spa-booking.firebaseapp.com",
  projectId: "luxury-spa-booking",
  storageBucket: "luxury-spa-booking.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

**請複製這個配置，我們稍後會用到！**

## 📝 第四步：更新網站配置

### 1. 更新Firebase配置文件
將您的Firebase配置替換到以下文件中：
`src/firebase/config.js`

```javascript
// 將您的實際配置替換這裡
const firebaseConfig = {
  apiKey: "您的-api-key",
  authDomain: "您的專案.firebaseapp.com",
  projectId: "您的專案-id",
  storageBucket: "您的專案.appspot.com",
  messagingSenderId: "您的-sender-id",
  appId: "您的-app-id"
};
```

### 2. 測試連接
我們可以創建一個測試頁面來驗證Firebase連接是否正常。

## 🚀 第五步：部署和測試

### 1. 本地測試
```bash
# 啟動開發服務器
npm run dev

# 訪問管理後台（我們稍後會添加路由）
http://localhost:5173/admin
```

### 2. 生產部署
```bash
# 建立生產版本
npm run build

# 使用Firebase Hosting部署
firebase deploy
```

## 📊 第六步：初始化數據結構

### Firestore集合結構

#### appointments（預約）
```javascript
{
  customerName: "客戶姓名",
  customerPhone: "0912345678",
  customerEmail: "customer@email.com",
  serviceId: "B01",
  serviceName: "Sparkle Spa",
  serviceCategory: "bodyspa",
  servicePrice: 3100,
  duration: 90,
  appointmentDate: "2025-09-27",
  appointmentTime: "14:00",
  status: "pending", // pending, confirmed, completed, cancelled, no_show
  notes: "客戶備註",
  adminNotes: "內部備註",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### customers（客戶）
```javascript
{
  name: "客戶姓名",
  phone: "0912345678",
  email: "customer@email.com",
  totalVisits: 5,
  totalSpent: 15500,
  lastVisit: Timestamp,
  preferences: "偏好療程或備註",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🔐 安全性設置

### 1. 生產環境安全規則
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /appointments/{document} {
      allow read, write: if request.auth != null 
        && request.auth.token.email_verified == true;
    }
    
    match /customers/{document} {
      allow read, write: if request.auth != null 
        && request.auth.token.email_verified == true;
    }
  }
}
```

### 2. 環境變數設置
創建 `.env.local` 文件：
```
VITE_FIREBASE_API_KEY=您的api-key
VITE_FIREBASE_AUTH_DOMAIN=您的專案.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=您的專案-id
VITE_FIREBASE_STORAGE_BUCKET=您的專案.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=您的sender-id
VITE_FIREBASE_APP_ID=您的app-id
```

## 📱 管理後台功能

### 已實現功能
- ✅ 預約列表和詳情查看
- ✅ 預約狀態管理
- ✅ 客戶資料管理
- ✅ 儀表板統計
- ✅ 批量操作
- ✅ 搜尋和篩選

### 即將實現功能
- 🔄 自動通知系統
- 🔄 報表匯出
- 🔄 日曆視圖
- 🔄 營收統計

## 💡 使用建議

### 1. 管理員帳號管理
- 為不同員工創建不同的管理員帳號
- 使用強密碼和雙重驗證
- 定期更換密碼

### 2. 資料備份
- Firebase自動備份，但建議定期匯出重要資料
- 可以使用Firebase Admin SDK進行批量操作

### 3. 成本控制
- Firebase免費額度通常足夠小型SPA使用
- 監控使用量，避免超出免費額度

## 🆘 常見問題

### Q: 忘記管理員密碼怎麼辦？
A: 在Firebase Console的Authentication頁面可以重設密碼

### Q: 如何添加新的管理員？
A: 在Authentication頁面點擊「新增使用者」

### Q: 資料會不會遺失？
A: Firebase有自動備份，資料安全性很高

### Q: 可以修改資料結構嗎？
A: 可以，Firestore是NoSQL資料庫，結構靈活

---

## 🎯 下一步行動

1. **立即執行**：按照上述步驟設置Firebase專案
2. **提供配置**：將您的Firebase配置資訊提供給我
3. **測試系統**：我們一起測試預約管理功能
4. **正式上線**：確認無誤後部署到生產環境

準備好了嗎？請先完成Firebase專案設置，然後提供您的配置資訊！

