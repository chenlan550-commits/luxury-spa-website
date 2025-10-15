# GitHub 设置指南

## 前端网站 (luxury-spa-website)

### 1. 初始化 Git 仓库

```bash
cd C:\Users\polung\Desktop\luxury-spa-website

# 初始化 Git
git init

# 添加 .gitignore 文件（如果没有）
```

### 2. 创建 .gitignore 文件

```bash
# 创建 .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.production.local
.env.development.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Cloudflare
.wrangler/
EOF
```

### 3. 提交到本地仓库

```bash
git add .
git commit -m "Initial commit: Luxury SPA website with Firebase integration"
```

### 4. 创建 GitHub 仓库并推送

#### 4.1 在 GitHub 创建新仓库
1. 登入 GitHub 账号: **chenlan550-commits**
2. 点击 "New repository"
3. 仓库名称: `luxury-spa-website`
4. 设为 Public（或 Private，根据需要）
5. **不要**初始化 README、.gitignore 或 license
6. 点击 "Create repository"

#### 4.2 连接并推送到 GitHub

```bash
# 添加远程仓库
git remote add origin https://github.com/chenlan550-commits/luxury-spa-website.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 5. 连接 Cloudflare Pages

#### 5.1 登入 Cloudflare Dashboard
1. 进入 Workers & Pages
2. 点击 "Create application"
3. 选择 "Pages" > "Connect to Git"

#### 5.2 连接 GitHub
1. 授权 Cloudflare 访问您的 GitHub 账号
2. 选择仓库: `chenlan550-commits/luxury-spa-website`
3. 点击 "Begin setup"

#### 5.3 配置构建设置
```
Production branch: main
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18
```

#### 5.4 设置环境变量
在 Cloudflare Pages 添加以下环境变量：

**Production 和 Preview 都需要设置：**
```
VITE_FIREBASE_API_KEY=AIzaSyCEWsKYjXTBD-k-zcKEmYeaQ6INxhhb08w
VITE_FIREBASE_AUTH_DOMAIN=spa-admin-firebase.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=spa-admin-firebase
VITE_FIREBASE_STORAGE_BUCKET=spa-admin-firebase.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=12778948033
VITE_FIREBASE_APP_ID=1:12778948033:web:94c0dfed597ddfc37c9b40
```

### 6. 自定义域名设置

#### 6.1 在 Cloudflare Pages 添加域名
1. 进入您的 Pages 项目
2. 点击 "Custom domains"
3. 添加域名: `polung.dpdns.org`

#### 6.2 DNS 设置

**如果域名托管在 Cloudflare：**
- Cloudflare 会自动创建 CNAME 记录

**如果域名在其他 DNS 提供商：**
1. 登入您的 DNS 提供商控制面板
2. 添加 CNAME 记录：
   - Name: `polung` (或 `@` 如果是根域名)
   - Target: Cloudflare Pages 提供的地址（类似 `luxury-spa-website.pages.dev`）
   - TTL: Auto 或 3600

### 7. 自动部署

配置完成后，每次推送到 GitHub 都会自动部署：

```bash
# 修改代码后
git add .
git commit -m "Update: 描述您的更改"
git push origin main
```

#### 部署流程：
1. 推送代码到 GitHub
2. Cloudflare Pages 自动检测更新
3. 自动构建和部署
4. 部署完成后可通过域名访问

### 8. 预览部署

每个 Pull Request 和分支都会自动创建预览部署：
- PR 预览: 每个 PR 都有独立的预览 URL
- 分支预览: 每个分支都有独立的预览 URL

### 9. 仓库地址

- GitHub 仓库: `https://github.com/chenlan550-commits/luxury-spa-website`
- Clone URL: `https://github.com/chenlan550-commits/luxury-spa-website.git`
- 网站地址: `https://polung.dpdns.org`
- Cloudflare Pages 预览: `https://luxury-spa-website.pages.dev`

### 10. 与后台系统整合

```
前端网站 (luxury-spa-website)
  GitHub: chenlan550-commits/luxury-spa-website
  部署: Cloudflare Pages
  域名: polung.dpdns.org
  ↓
Firebase Database (共享)
  ↓
后台系统 (spa-admin-firebase)
  GitHub: chenlan550-commits/spa-admin-firebase
  部署: Firebase Hosting
  域名: spa-admin-firebase.web.app
```

### 11. 查看部署状态

**在 Cloudflare Dashboard：**
1. Workers & Pages > luxury-spa-website
2. 查看部署历史
3. 查看构建日志
4. 监控网站流量

**在 GitHub：**
1. 仓库页面会显示部署状态
2. Deployments 标签页可查看所有部署

### 12. 回滚部署

如需回滚到之前的版本：
1. 进入 Cloudflare Pages 项目
2. 选择 Deployments
3. 找到要回滚的版本
4. 点击 "Rollback to this deployment"

### 13. 常见问题

**Q: 环境变量未生效**
A: 确保在 Cloudflare Pages 设置了环境变量，并重新部署

**Q: 构建失败**
A: 检查 Build log，通常是依赖问题或环境变量缺失

**Q: 域名无法访问**
A: 检查 DNS 设置和 SSL 证书状态（可能需要几分钟到几小时）

### 14. 最佳实践

✅ **推荐做法：**
- 使用有意义的 commit message
- 经常提交小的改动
- 在 PR 中查看预览部署
- 定期检查网站性能

⚠️ **注意事项：**
- 不要提交 `.env` 文件
- 敏感信息使用环境变量
- 定期更新依赖包
- 监控 Firebase 使用量
