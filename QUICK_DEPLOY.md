# 快速部署指南 - 3步驟完成！

## 🚀 步驟1：創建Cloudflare Pages專案（5分鐘）

1. 前往 https://dash.cloudflare.com/
2. 點擊 **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 授權GitHub並選擇 `luxury-spa-website` 倉庫
4. 填寫配置：
   ```
   專案名稱: luxury-spa-website
   生產分支: dev
   Framework: Vite
   Build command: pnpm build
   Output directory: dist
   ```

5. **重要！** 添加環境變數（點擊 Environment variables）：
   ```
   VITE_FIREBASE_API_KEY = AIzaSyCEWsKYjXTBD-k-zcKEmYeaQ6INxhhb08w
   VITE_FIREBASE_AUTH_DOMAIN = spa-admin-firebase.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID = spa-admin-firebase
   VITE_FIREBASE_STORAGE_BUCKET = spa-admin-firebase.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID = 12778948033
   VITE_FIREBASE_APP_ID = 1:12778948033:web:94c0dfed597ddfc37c9b40
   ```

6. 點擊 **Save and Deploy**

---

## 🌐 步驟2：設置域名 polung.dpdns.org（5分鐘）

### 在Cloudflare Pages：
1. 部署完成後，點擊 **Custom domains**
2. 點擊 **Set up a custom domain**
3. 輸入：`polung.dpdns.org`
4. 記下Cloudflare提供的目標域名（例如：`luxury-spa-website.pages.dev`）

### 在您的DNS提供商（dpdns.org）：
1. 登入 dpdns.org 管理面板
2. 找到DNS設置
3. 添加CNAME記錄：
   ```
   類型: CNAME
   主機名: polung
   指向: luxury-spa-website.pages.dev
   TTL: 3600（或自動）
   ```
4. 保存

---

## ✅ 步驟3：驗證部署（2分鐘）

等待3-5分鐘後，訪問以下網址：

- ✅ https://luxury-spa-website.pages.dev
- ✅ https://polung.dpdns.org

如果都能正常訪問，恭喜部署成功！🎉

---

## 🔄 自動部署

從現在開始，每次您推送代碼到GitHub的 `dev` 分支，網站會自動更新！

```bash
git add .
git commit -m "Update website"
git push origin dev
# Cloudflare會自動部署，無需手動操作！
```

---

## ⚠️ 常見問題

**構建失敗？**
- 檢查環境變數是否都正確添加
- 查看構建日誌找出錯誤

**域名無法訪問？**
- 等待DNS傳播（最多24小時）
- 使用 https://dnschecker.org 檢查DNS是否生效

**網站空白頁？**
- 確認Firebase環境變數正確
- 檢查瀏覽器控制台的錯誤訊息
