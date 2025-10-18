# Cloudflare Pages 部署指南

## 🎯 目標
將豪華SPA網站從GitHub部署到Cloudflare Pages，並設置自定義域名 `polung.dpdns.org`

---

## 📋 第一步：準備工作

### 1. 確認您已有的資源
- ✅ GitHub倉庫：https://github.com/chenlan550-commits/luxury-spa-website
- ✅ 分支：`dev`
- ✅ 域名：`polung.dpdns.org`
- ⬜ Cloudflare帳號（如果沒有請先註冊）

### 2. 註冊Cloudflare帳號（如果還沒有）
1. 前往 https://dash.cloudflare.com/sign-up
2. 輸入您的電子郵件和密碼
3. 驗證電子郵件

---

## 🚀 第二步：創建Cloudflare Pages專案

### 1. 登入Cloudflare Dashboard
1. 前往 https://dash.cloudflare.com/
2. 使用您的帳號登入

### 2. 進入Pages頁面
1. 在左側導航欄點擊 **「Workers & Pages」**
2. 點擊 **「Create application」** 按鈕
3. 選擇 **「Pages」** 標籤
4. 點擊 **「Connect to Git」**

### 3. 連接GitHub帳號
1. 點擊 **「Connect GitHub」** 按鈕
2. 會跳轉到GitHub授權頁面
3. 選擇授權方式：
   - **推薦：** 選擇 "Only select repositories"
   - 選擇 `luxury-spa-website` 倉庫
4. 點擊 **「Install & Authorize」**

### 4. 選擇倉庫並配置
回到Cloudflare，您會看到已授權的倉庫列表：

1. 找到並點擊 **「luxury-spa-website」**
2. 點擊 **「Begin setup」**

### 5. 配置構建設置

在設置頁面填寫以下資訊：

```
專案名稱 (Project name)：
luxury-spa-website

生產分支 (Production branch)：
dev

構建設置 (Build settings)：
Framework preset: Vite
Build command: pnpm build
Build output directory: dist
Root directory: (留空)
```

### 6. 設置環境變數（重要！）

點擊 **「Environment variables (advanced)」** 展開，然後添加以下環境變數：

```
VITE_FIREBASE_API_KEY
值: AIzaSyCEWsKYjXTBD-k-zcKEmYeaQ6INxhhb08w

VITE_FIREBASE_AUTH_DOMAIN
值: spa-admin-firebase.firebaseapp.com

VITE_FIREBASE_PROJECT_ID
值: spa-admin-firebase

VITE_FIREBASE_STORAGE_BUCKET
值: spa-admin-firebase.firebasestorage.app

VITE_FIREBASE_MESSAGING_SENDER_ID
值: 12778948033

VITE_FIREBASE_APP_ID
值: 1:12778948033:web:94c0dfed597ddfc37c9b40
```

**添加步驟：**
1. 點擊 **「Add variable」**
2. 輸入變數名稱（例如：VITE_FIREBASE_API_KEY）
3. 輸入對應的值
4. 重複以上步驟，添加所有6個環境變數

### 7. 開始部署
1. 確認所有設置正確
2. 點擊 **「Save and Deploy」** 按鈕
3. Cloudflare會自動開始構建和部署

### 8. 等待部署完成
- 構建過程通常需要 1-3 分鐘
- 您可以在頁面上看到實時的構建日誌
- 看到 **"Success!"** 表示部署成功

---

## 🌐 第三步：設置自定義域名

### 部署完成後，您會獲得一個Cloudflare提供的域名
例如：`luxury-spa-website.pages.dev`

### 現在設置您的自定義域名 `polung.dpdns.org`

### 1. 進入自定義域名設置
1. 在部署成功頁面，點擊 **「Continue to project」**
2. 點擊頂部的 **「Custom domains」** 標籤
3. 點擊 **「Set up a custom domain」** 按鈕

### 2. 添加自定義域名
1. 在輸入框中輸入：`polung.dpdns.org`
2. 點擊 **「Continue」**

### 3. 配置DNS記錄

Cloudflare會顯示需要添加的DNS記錄。通常有兩種方式：

#### 方案A：如果您的域名DNS託管在Cloudflare
1. Cloudflare會自動添加DNS記錄
2. 點擊 **「Activate domain」**
3. 完成！

#### 方案B：如果您的域名DNS託管在其他地方（例如：dpdns.org）
您需要在您的DNS提供商（dpdns.org）添加以下記錄：

**CNAME記錄：**
```
類型: CNAME
名稱: polung
目標/值: luxury-spa-website.pages.dev
TTL: 自動或3600
代理狀態: 僅DNS（不代理）
```

**具體步驟：**
1. 登入您的dpdns.org帳號
2. 找到DNS管理或域名管理頁面
3. 添加新的CNAME記錄：
   - 主機名/子域名：`polung`
   - 記錄類型：`CNAME`
   - 指向/值：`luxury-spa-website.pages.dev`
4. 保存設置

### 4. 驗證DNS設置
1. 回到Cloudflare Pages
2. 等待DNS傳播（通常需要幾分鐘到24小時）
3. Cloudflare會自動驗證DNS記錄
4. 驗證成功後，會自動啟用HTTPS證書

### 5. 確認部署成功
幾分鐘後，訪問：
- https://polung.dpdns.org

您應該能看到您的SPA網站！

---

## 🔧 第四步：後續管理

### 自動部署
現在每次您推送代碼到GitHub的 `dev` 分支，Cloudflare Pages會自動：
1. 檢測到新的提交
2. 自動構建網站
3. 自動部署到生產環境

### 查看部署狀態
1. 登入 Cloudflare Dashboard
2. 進入 Workers & Pages
3. 點擊您的專案名稱
4. 查看 **「Deployments」** 標籤

### 修改環境變數
1. 在專案頁面點擊 **「Settings」**
2. 選擇 **「Environment variables」**
3. 可以添加、修改或刪除環境變數
4. 修改後需要重新部署才會生效

### 手動觸發重新部署
1. 在專案頁面點擊 **「Deployments」**
2. 點擊最新部署旁的 **「...」** 菜單
3. 選擇 **「Retry deployment」**

---

## 📊 常見問題與解決方案

### Q1: 構建失敗，顯示 "Command not found: pnpm"
**解決方案：**
1. 在專案設置中，將構建命令改為：`npx pnpm install && npx pnpm build`
2. 或者在 **Settings → Build configuration** 中設置：
   - Build command: `npm install -g pnpm && pnpm install && pnpm build`

### Q2: 部署成功但網站顯示空白頁
**可能原因：**
- 環境變數未正確設置
- Firebase配置錯誤

**解決方案：**
1. 檢查 Settings → Environment variables
2. 確認所有 `VITE_FIREBASE_*` 變數都已添加
3. 重新部署

### Q3: 自定義域名無法訪問
**可能原因：**
- DNS記錄尚未生效
- DNS配置錯誤

**解決方案：**
1. 使用工具檢查DNS記錄：https://dnschecker.org/
2. 輸入 `polung.dpdns.org` 查看CNAME記錄
3. 確認指向正確的 Cloudflare Pages 域名
4. 等待DNS傳播（最多24小時）

### Q4: HTTPS證書錯誤
**解決方案：**
1. Cloudflare會自動為自定義域名配置SSL證書
2. 通常在DNS驗證成功後幾分鐘內完成
3. 如果超過1小時仍未生效，聯繫Cloudflare支持

---

## ✅ 部署檢查清單

完成部署後，請檢查以下項目：

- [ ] 網站可以通過 `https://luxury-spa-website.pages.dev` 訪問
- [ ] 網站可以通過 `https://polung.dpdns.org` 訪問
- [ ] HTTPS證書正常（瀏覽器顯示安全鎖）
- [ ] Firebase連接正常（療程資料正確顯示）
- [ ] 預約表單可以正常提交
- [ ] 所有頁面導航正常
- [ ] 圖片資源正確載入
- [ ] 多語系切換功能正常

---

## 🎯 部署成功後的網址

- **Cloudflare Pages預設域名：** https://luxury-spa-website.pages.dev
- **您的自定義域名：** https://polung.dpdns.org

---

## 📞 需要幫助？

如果在部署過程中遇到任何問題，請：
1. 檢查Cloudflare Pages的構建日誌
2. 查看本文檔的常見問題部分
3. 聯繫我獲取進一步協助

祝您部署順利！🚀
