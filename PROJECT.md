# 项目文档 - WangCheng 设计作品集

> 最近更新：2026-04-10

## 1. 项目概述

本项目是设计师王成的个人作品展示网站，包含首页及6个专业分类页。

## 2. 文件结构

```
d:\Desktop\网页\
├── index.html          # 首页（英雄区 / 六大分类封面 / 轮播）
├── about.html          # 个人简介页
├── typography.html     # 排版设计分类页
├── brand.html          # 品牌设计分类页
├── packaging.html      # 包装设计分类页
├── ecommerce.html      # 电商设计分类页
├── digital.html        # 数字媒体设计分类页
├── illustration.html   # 插画与图形分类页
├── styles.css          # 全局样式表
├── main.js             # 交互脚本（轮播 / 导航高亮 / 技能动画）
└── images/             # 图片资源目录
    ├── hero-bg.jpg              【首页Hero背景】
    ├── avatar.jpg               【个人简介头像】
    ├── carousel/                【首页轮播图】(4张)
    ├── index/                   【首页六大分类封面】
    │   ├── index-1.jpg (排版设计)
    │   ├── index-2.jpg (品牌设计)
    │   ├── index-3.jpg (包装设计)
    │   ├── index-4.jpg (电商设计)
    │   ├── index-5.jpg (数字媒体设计)
    │   └── index-6.jpg (插画与图形)
    ├── typography/              【排版设计】
    │   ├── cover/               (海报/折页/画册封面)
    │   ├── poster/              (海报作品)
    │   ├── face-mask/           (面膜海报)
    │   ├── solar-term/          (节气海报)
    │   ├── festival/            (节日海报)
    │   ├── lightbox/            (灯箱)
    │   ├── booth/               (展架)
    │   ├── catalogue/           (画册)
    │   └── fold/                (折页排版)
    ├── brand/                   【品牌设计】
    │   ├── cover/               (LOGO/VI/字体封面)
    │   ├── logo/                (LOGO作品)
    │   ├── vi/                  (VI视觉)
    │   └── type/                (字体设计)
    ├── packaging/               【包装设计】
    │   ├── food/                (食品包装)
    │   ├── cosmetic/            (化妆品)
    │   ├── gift/                (礼品包装)
    │   ├── electronic/         (电子产品)
    │   ├── wine/                (酒类包装)
    │   ├── tea/                 (茶叶包装)
    │   └── bag/                 (手提袋包装)
    ├── ecommerce/               【电商设计】
    │   ├── cover/               (首页/详情/Banner封面)
    │   ├── homepage/            (店铺首页)
    │   ├── detail/              (产品详情)
    │   └── banner/              (Banner设计)
    ├── digital/                  【数字媒体设计】
    │   ├── cover/               (UI/H5/APP封面)
    │   ├── ui/                  (UI界面)
    │   ├── h5/                  (H5页面)
    │   └── app/                 (APP界面)
    └── illustration/            【插画与图形】
        ├── cover/               (手绘/矢量/图标/卡通封面)
        ├── hand-drawn/          (手绘插画)
        ├── vector/              (矢量图形)
        ├── icon/                (图标设计)
        └── cartoon/             (卡通形象)
```

## 3. 技术栈

| 技术 | 说明 |
|------|------|
| HTML5 | 语义化结构 |
| CSS3 | 样式、响应式、动画 |
| JavaScript | 交互逻辑、轮播组件 |
| 无框架依赖 | 纯原生实现 |

## 4. CSS 变量

| 变量 | 值 | 用途 |
|------|-----|------|
| `--primary-color` | `#1a1a1a` | 主色调（深色） |
| `--accent-color` | `#2563eb` | 强调色（蓝） |
| `--text-color` | `#111` | 正文色 |
| `--text-light` | `#666` | 辅助文字色 |
| `--bg-color` | `#f5f5f5` | 背景色 |
| `--border-color` | `#e0e0e0` | 边框色 |
| `--radius` | `12px` | 圆角大小 |

## 5. 维护记录

| 日期 | 操作 | 说明 |
|------|------|------|
| 2026-04-10 | 整体重建 | 文件丢失后恢复全部代码 |
| 2026-04-10 | 导航与分类重构 | 新增6大分类、完整导航结构、轮播组件 |
| 2026-04-11 | 分类细项调整 | 电商设计：首图/详情页/Banner；数字媒体：UI/APP/H5；插画图形：手绘插画/矢量图形/图标设计/卡通形象 |
| 2026-04-11 | 数字媒体/插画图形子页面拆分 | 新增 ui.html、h5.html、app.html（数字媒体）、hand-drawn.html、vector.html、icon.html、cartoon.html（插画图形）共7个独立子页面 |

## 6. 待完善事项

- [ ] 补充所有图片资源（封面、作品图片）
- [ ] 完善各分类页作品网格数据（当前为空）
- [ ] 建议将项目提交到 Git 避免再次丢失
