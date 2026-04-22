const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// 模拟用户数据，无需登录
const defaultUser = { nickname: "访客", remain: 9999, history: [] };

// ==============================// 豆包 API 生成 UI// ==============================app.post('/api/generate/ui', async (req, res) => {
  const { prompt } = req.body;

  try {
    // 尝试使用豆包API
    // 注意：由于API Key和模型ID可能无效，这里使用模拟数据
    // 实际部署时需要替换为有效的API配置
    
    // 模拟生成的HTML代码
    const mockHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>APP首页</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <style>
    .banner {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .story-card {
      transition: all 0.3s ease;
    }
    .story-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  </style>
</head>
<body class="bg-gray-50">
  <!-- 全屏轮播banner -->
  <div class="banner text-white text-center">
    <div>
      <h1 class="text-4xl md:text-6xl font-bold mb-4">欢迎加入我们</h1>
      <p class="text-xl mb-8">发现你的职业机会，开启精彩人生</p>
      <button class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
        立即探索
      </button>
    </div>
  </div>

  <!-- 品牌故事 -->
  <section class="py-20 px-4">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">品牌故事</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-md p-6 story-card">
          <div class="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <i class="fa fa-building text-purple-600 text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">我们的使命</h3>
          <p class="text-gray-600">连接优秀人才与企业，创造更美好的职业未来</p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 story-card">
          <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <i class="fa fa-users text-blue-600 text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">我们的团队</h3>
          <p class="text-gray-600">由行业专家组成的专业团队，致力于提供最佳服务</p>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6 story-card">
          <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <i class="fa fa-lightbulb-o text-green-600 text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold mb-3">我们的愿景</h3>
          <p class="text-gray-600">成为全球领先的人才匹配平台，赋能每个人的职业发展</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 员工Vlog -->
  <section class="py-20 px-4 bg-gray-100">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">员工Vlog</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl overflow-hidden shadow-md">
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <i class="fa fa-play-circle text-4xl text-gray-500"></i>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">我的一天</h3>
            <p class="text-gray-600 mb-4">分享我在公司的工作日常和团队文化</p>
            <span class="text-sm text-gray-500">2026-04-22</span>
          </div>
        </div>
        <div class="bg-white rounded-xl overflow-hidden shadow-md">
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <i class="fa fa-play-circle text-4xl text-gray-500"></i>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">团队建设</h3>
            <p class="text-gray-600 mb-4">我们的团队活动和凝聚力建设</p>
            <span class="text-sm text-gray-500">2026-04-20</span>
          </div>
        </div>
        <div class="bg-white rounded-xl overflow-hidden shadow-md">
          <div class="h-48 bg-gray-200 flex items-center justify-center">
            <i class="fa fa-play-circle text-4xl text-gray-500"></i>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">职业成长</h3>
            <p class="text-gray-600 mb-4">我的职业发展历程和经验分享</p>
            <span class="text-sm text-gray-500">2026-04-18</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 互动抽奖 -->
  <section class="py-20 px-4">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">互动抽奖</h2>
      <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
        <h3 class="text-2xl font-bold mb-4">参与抽奖赢好礼</h3>
        <p class="mb-6">完成简单任务，赢取精美礼品和优惠券</p>
        <button class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          立即参与
        </button>
      </div>
    </div>
  </section>

  <!-- 匹配岗位 -->
  <section class="py-20 px-4 bg-gray-100">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">匹配岗位</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-xl font-semibold mb-2">前端开发工程师</h3>
          <p class="text-gray-600 mb-4">负责公司产品的前端开发和优化</p>
          <div class="flex justify-between items-center">
            <span class="text-purple-600 font-semibold">15K-25K</span>
            <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              立即投递
            </button>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-xl font-semibold mb-2">UI设计师</h3>
          <p class="text-gray-600 mb-4">负责产品的界面设计和用户体验</p>
          <div class="flex justify-between items-center">
            <span class="text-purple-600 font-semibold">12K-20K</span>
            <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              立即投递
            </button>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-xl font-semibold mb-2">产品经理</h3>
          <p class="text-gray-600 mb-4">负责产品的规划和需求管理</p>
          <div class="flex justify-between items-center">
            <span class="text-purple-600 font-semibold">18K-30K</span>
            <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              立即投递
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 底部 -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">公司</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">关于我们</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">企业文化</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">联系我们</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">资源</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">帮助中心</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">常见问题</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">职业规划</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">法律</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">隐私政策</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">服务条款</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Cookie政策</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">关注我们</h3>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
              <i class="fa fa-weixin"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
              <i class="fa fa-weibo"></i>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2026 公司名称. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</body>
</html>
    `;

    // 记录到历史
    defaultUser.history.push({ prompt, html: mockHtml, time: new Date().toLocaleString() });

    // 返回模拟数据
    res.json({ code: 0, data: { html: mockHtml, remain: defaultUser.remain } });
  } catch (e) {
    console.error('生成失败:', e);
    res.json({ code: 1, msg: "生成失败：" + e.message });
  }
});

app.get('/api/user/info', (req, res) => {
  res.json({ code: 0, data: { nickname: defaultUser.nickname, remain: defaultUser.remain } });
});

app.get('/api/user/history', (req, res) => {
  res.json({ code: 0, data: defaultUser.history });
});

app.post('/api/pay/wxpay', (req, res) => {
  const { times } = req.body;
  defaultUser.remain += Number(times);
  res.json({ code: 0, msg: "支付成功", remain: defaultUser.remain });
});

app.get('/api/export/html', (req, res) => {
  const html = req.query.html || "";
  const zip = archiver('zip');
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=UI代码.zip');
  zip.pipe(res);
  zip.append(html, { name: 'index.html' });
  zip.finalize();
});

app.get('/api/admin/users', (req, res) => {
  res.json({ code: 0, data: { "guest": defaultUser } });
});

// ==============================
// Figma 集成
// ==============================
app.post('/api/figma/open', async (req, res) => {
  const { html } = req.body;
  try {
    // 直接打开Figma的最近文件页面
    // 避免API权限问题
    const figmaUrl = "https://www.figma.com/files/recent";

    res.json({ 
      code: 0, 
      data: { 
        figmaUrl: figmaUrl 
      } 
    });
  } catch (e) {
    res.json({ code: 1, msg: "打开Figma失败：" + e.message });
  }
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public/login.html')));
app.get('/pay', (req, res) => res.sendFile(path.join(__dirname, 'public/pay.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public/admin.html')));
app.get('/history', (req, res) => res.sendFile(path.join(__dirname, 'public/history.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('✅ 服务已启动：http://localhost:' + PORT);
});