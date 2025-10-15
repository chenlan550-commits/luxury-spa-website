# 部署指南

## 前端網站部署到 Cloudflare Pages

### 1. 準備工作

#### 1.1 創建 GitHub Repository
```bash
cd C:\Users\polung\Desktop\luxury-spa-website
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/luxury-spa-website.git
git push -u origin main
```

#### 1.2 設置環境變數
確保 `.env.local` 文件包含正確的 Firebase 配置（不要提交到 Git）

### 2. Cloudflare Pages 設置

#### 2.1 連接 GitHub
1. 登入 Cloudflare Dashboard
2. 進入 Pages
3. 點擊 "Create a project"
4. 選擇 "Connect to Git"
5. 授權並選擇您的 GitHub repository: `luxury-spa-website`

#### 2.2 構建設置
```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18 或更高
```

#### 2.3 環境變數設置
在 Cloudflare Pages 設置以下環境變數：
```
VITE_FIREBASE_API_KEY=AIzaSyCEWsKYjXTBD-k-zcKEmYeaQ6INxhhb08w
VITE_FIREBASE_AUTH_DOMAIN=spa-admin-firebase.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=spa-admin-firebase
VITE_FIREBASE_STORAGE_BUCKET=spa-admin-firebase.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=12778948033
VITE_FIREBASE_APP_ID=1:12778948033:web:94c0dfed597ddfc37c9b40
```

### 3. 自定義域名設置

#### 3.1 在 Cloudflare Pages 添加域名
1. 進入您的 Pages 項目
2. 點擊 "Custom domains"
3. 添加域名: `polung.dpdns.org`

#### 3.2 DNS 設置
如果您的域名托管在 Cloudflare：
- Cloudflare 會自動創建 CNAME 記錄

如果域名托管在其他地方：
1. 在您的 DNS 提供商添加 CNAME 記錄
2. 指向 Cloudflare Pages 提供的目標地址

### 4. 部署流程

#### 4.1 自動部署
- 推送到 `main` 分支會觸發自動部署
- 每次 commit 都會創建一個新的部署

#### 4.2 手動部署
```bash
git add .
git commit -m "Update site"
git push origin main
```

### 5. 與後台系統連接

前端和後台共享同一個 Firebase 項目：
- ✅ 前端讀取後台管理的療程、內容
- ✅ 前端提交預約到 `appointments` 集合
- ✅ 後台管理員可以查看和管理前端的預約

### 6. Firebase Security Rules

確保在 Firebase Console 設置適當的安全規則：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 客戶只能讀取療程和內容
    match /services/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /content/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // 預約：任何人可以創建，只有登入用戶可以修改
    match /appointments/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    // 客戶資料：只有登入用戶可以訪問
    match /customers/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 7. 監控和維護

- 在 Cloudflare Pages 查看部署日誌
- 在 Firebase Console 監控數據庫使用情況
- 定期檢查前端與後台的數據同步

### 8. 常見問題

**Q: 前端無法讀取 Firebase 數據**
A: 檢查環境變數是否正確設置，並確保 Firebase Security Rules 允許讀取

**Q: 自定義域名無法訪問**
A: 檢查 DNS 設置和 SSL 證書狀態，通常需要幾分鐘到幾小時生效

**Q: 構建失敗**
A: 檢查 Node 版本和依賴是否正確安裝

### 9. 聯繫方式

如需技術支持，請查看：
- Cloudflare Pages 文檔
- Firebase 文檔
- GitHub Issues
