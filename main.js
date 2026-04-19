/**
 * main.js - 网站核心交互逻辑
 * 包含轮播、导航高亮、技能动画等
 */

// ============================================
// 轮播组件
// ============================================
class Carousel {
    constructor() {
        this.track = document.getElementById("carouselTrack");
        this.dotsContainer = document.getElementById("carouselDots");
        this.prevBtn = document.getElementById("carouselPrev");
        this.nextBtn = document.getElementById("carouselNext");

        if (!this.track) return;

        this.slides = Array.from(this.track.querySelectorAll("img"));
        this.currentIndex = 0;
        this.total = this.slides.length;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        this.renderDots();
        this.bindEvents();
        this.startAutoPlay();
    }

    /**
     * 渲染轮播指示点
     */
    renderDots() {
        this.dotsContainer.innerHTML = "";
        for (let i = 0; i < this.total; i++) {
            const dot = document.createElement("button");
            dot.className = "carousel-dot" + (i === 0 ? " active" : "");
            dot.setAttribute("aria-label", `切换到第 ${i + 1} 张`);
            dot.addEventListener("click", () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    /**
     * 绑定按钮和触摸事件
     */
    bindEvents() {
        if (this.prevBtn) this.prevBtn.addEventListener("click", () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener("click", () => this.next());

        // 鼠标悬停暂停自动播放
        const wrap = document.getElementById("carouselWrap");
        if (wrap) {
            wrap.addEventListener("mouseenter", () => this.stopAutoPlay());
            wrap.addEventListener("mouseleave", () => this.startAutoPlay());
        }
    }

    /**
     * 切换到指定索引
     * @param {number} index - 目标索引
     */
    goTo(index) {
        this.currentIndex = (index + this.total) % this.total;
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        this.updateDots();
    }

    prev() {
        this.goTo(this.currentIndex - 1);
    }

    next() {
        this.goTo(this.currentIndex + 1);
    }

    /**
     * 更新指示点状态
     */
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll(".carousel-dot");
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === this.currentIndex);
        });
    }

    /**
     * 开始自动播放（每 4 秒切换一张）
     */
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.next(), 4000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// ============================================
// 技能进度圆环动画
// ============================================
/**
 * 页面加载时触发动画，让技能圆环进度条逐渐填充
 */
function animateSkillCircles() {
    const circles = document.querySelectorAll(".skill-circle");
    if (!circles.length) return;

    circles.forEach(circle => {
        const progress = circle.querySelector(".skill-progress");
        if (!progress) return;

        const percent = parseInt(progress.dataset.percent, 10) || 0;
        // 重置为 0，触发 CSS transition
        circle.style.background = `conic-gradient(var(--accent-color) 0%, var(--bg-color) 0%)`;

        // 使用 requestAnimationFrame 确保样式已应用
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                circle.style.background = `conic-gradient(var(--accent-color) ${percent}%, var(--bg-color) ${percent}%)`;
            });
        });
    });
}

// ============================================
// 导航高亮
// ============================================
function highlightNav() {
    const current = window.location.pathname.split("/").pop() || "index.html";

    // 一级导航高亮
    document.querySelectorAll(".nav-list a").forEach(link => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === current);
    });

    // 二级导航高亮
    document.querySelectorAll(".category-sub-nav a").forEach(link => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === current);
    });
}

// ============================================
// 移动端汉堡菜单
// ============================================
function initMobileNav() {
    const hamburger = document.getElementById("navHamburger");
    const overlay = document.getElementById("navOverlay");
    const mask = document.getElementById("navMask");
    if (!hamburger || !overlay) return;

    function openNav() {
        hamburger.classList.add("open");
        hamburger.setAttribute("aria-expanded", "true");
        overlay.classList.add("open");
        if (mask) mask.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeNav() {
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        overlay.classList.remove("open");
        if (mask) mask.classList.remove("show");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
        if (overlay.classList.contains("open")) closeNav();
        else openNav();
    });

    if (mask) mask.addEventListener("click", closeNav);

    // 点击导航链接后关闭（移动端）
    overlay.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 900) closeNav();
        });
    });

    // 点击外部关闭
    document.addEventListener("click", (e) => {
        if (window.innerWidth > 900) return;
        if (!overlay.contains(e.target) && !hamburger.contains(e.target)) {
            closeNav();
        }
    });

    // 窗口宽度变化时重置
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeNav();
        }
    });
}

// ============================================
// 花瓣网风格瀑布流渲染
// ============================================
/**
 * 自动扫描指定分类目录下的图片，生成瀑布流布局
 * @param {string} category - 分类名（如 'poster'、'layout'、'ad'）
 * @param {string} containerId - 目标容器 ID
 */
function renderWaterfall(category, containerId, baseFolder) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const folder = baseFolder || `images/typography/${category}/`;
    const maxCount = 30; // 最大扫描数量上限

    // 生成图片 URL 列表（命名格式：poster-1、layout-2 等）
    const urls = [];
    for (let i = 1; i <= maxCount; i++) {
        const url = `${folder}${category}-${i}.jpg`;
        urls.push(url);
    }

    // 按顺序预加载检测图片是否真实存在
    const validUrls = [];
    let checked = 0;

    function checkAndCollect(url) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(null);
            img.src = url;
        });
    }

    (async () => {
        for (const url of urls) {
            const result = await checkAndCollect(url);
            if (result) validUrls.push(result);
            checked++;
            if (checked === maxCount) {
                buildWaterfall(validUrls, container);
            }
        }
    })();
}

/**
 * 将图片列表分配到四列，构建瀑布流 DOM 结构（高度优先的最短列分配）
 * @param {string[]} urls - 有效图片 URL 数组
 * @param {HTMLElement} container - 目标容器
 */
function buildWaterfall(urls, container) {
    // 清空容器
    container.innerHTML = '';

    const label = container.id.replace('Grid', ''); // posterGrid -> poster
    const labelMap = {
        poster: '海报设计', layout: '排版设计', ad: '广告设计',
        logo: 'LOGO设计', visual: '视觉设计', font: '字体设计',
        foodPack: '食品包装', cosmetic: '化妆品包装', gift: '礼品包装',
        tea: '茶叶包装', alcohol: '酒类包装', electronics: '电子产品包装',
        // 电商设计
        'first-image': '首图', 'firstImage': '首图', detail: '详情页', banner: 'Banner',
        // 数字媒体
        ui: 'UI界面', app: 'APP界面', h5: 'H5页面',
        // 插画图形
        'hand-drawn': '手绘插画', 'handDrawn': '手绘插画', vector: '矢量图形', icon: '图标设计', cartoon: '卡通形象',
        // 广告展示
        lightboxAd: '灯箱广告', displayStand: '展示架', holiday: '节日海报', 'solar-term': '节气海报'
    };

    // 创建四列容器
    const columns = Array.from({ length: 4 }, () => {
        const col = document.createElement('div');
        col.className = 'waterfall-column';
        container.appendChild(col);
        return col;
    });
    // 记录每列当前累计高度
    const columnHeights = [0, 0, 0, 0];

    // 依次加载图片，插入最短列
    urls.forEach((url, index) => {
        const item = document.createElement('div');
        item.className = 'waterfall-item';

        const img = document.createElement('img');
        img.src = url;
        img.alt = `${labelMap[label] || label} ${index + 1}`;
        img.loading = 'lazy';

        item.appendChild(img);

        // 等图片加载完毕后，插入到最短列并更新高度
        if (img.complete) {
            insertIntoShortestColumn(item, columnHeights, columns);
        } else {
            img.addEventListener('load', () => insertIntoShortestColumn(item, columnHeights, columns));
            // 加载失败时也插入，避免永久挂起
            img.addEventListener('error', () => insertIntoShortestColumn(item, columnHeights, columns));
        }
    });
}

/**
 * 将 item 插入到当前累计高度最短的列
 */
function insertIntoShortestColumn(item, columnHeights, columns) {
    const shortestIdx = columnHeights.indexOf(Math.min(...columnHeights));
    columns[shortestIdx].appendChild(item);
    columnHeights[shortestIdx] += item.offsetHeight || 200;
}

/**
 * 检测当前页面并加载对应瀑布流
 */
function initWaterfall() {
    const page = window.location.pathname.split('/').pop();

    // 独立子页面：只加载对应分类
    const subPageMap = {
        'poster.html':  [
            { category: 'poster', containerId: 'posterGrid', baseFolder: 'images/typography/poster/' },
            { category: 'holiday', containerId: 'holidayGrid', baseFolder: 'images/typography/poster/holiday/' },
            { category: 'solar-term', containerId: 'solar-termGrid', baseFolder: 'images/typography/poster/solar-term/' }
        ],
        'layout.html':  [{ category: 'layout', containerId: 'layoutGrid', baseFolder: 'images/typography/layout/' }],
        'ad.html':      [
            { category: 'ad',          containerId: 'adGrid',          baseFolder: 'images/typography/ad/' },
            { category: 'lightbox-ad', containerId: 'lightboxAdGrid',  baseFolder: 'images/typography/ad/lightbox/' },
            { category: 'display-stand', containerId: 'displayStandGrid', baseFolder: 'images/typography/ad/display-stand/' }
        ],
        'logo.html':    [{ category: 'logo',   containerId: 'logoGrid', baseFolder: 'images/brand/logo/' }],
        'visual.html':  [{ category: 'visual', containerId: 'visualGrid', baseFolder: 'images/brand/visual/' }],
        'font.html':    [{ category: 'font',   containerId: 'fontGrid', baseFolder: 'images/brand/font/' }],
        'food-pack.html':    [{ category: 'food',   containerId: 'foodPackGrid', baseFolder: 'images/packaging/food/' }],
        'cosmetic.html':     [{ category: 'cosmetic',  containerId: 'cosmeticGrid', baseFolder: 'images/packaging/cosmetic/' }],
        'gift.html':         [{ category: 'gift',       containerId: 'giftGrid', baseFolder: 'images/packaging/gift/' }],
        'tea.html':          [{ category: 'tea',        containerId: 'teaGrid', baseFolder: 'images/packaging/tea/' }],
        'alcohol.html':     [{ category: 'alcohol',   containerId: 'alcoholGrid', baseFolder: 'images/packaging/alcohol/' }],
        'electronics.html': [{ category: 'electronics', containerId: 'electronicsGrid', baseFolder: 'images/packaging/electronics/' }],
        // 电商设计（三个独立子页面）
        'first-image.html': [{ category: 'first-image', containerId: 'firstImageGrid', baseFolder: 'images/ecommerce/first-image/' }],
        'detail.html':     [{ category: 'detail',     containerId: 'detailGrid',   baseFolder: 'images/ecommerce/detail/' }],
        'banner.html':     [{ category: 'banner',      containerId: 'bannerGrid',  baseFolder: 'images/ecommerce/banner/' }],
        // 数字媒体（三个独立子页面）
        'ui.html':  [{ category: 'ui',  containerId: 'uiGrid',  baseFolder: 'images/digital/ui/' }],
        'h5.html':  [{ category: 'h5',  containerId: 'h5Grid',  baseFolder: 'images/digital/h5/' }],
        'app.html': [{ category: 'app', containerId: 'appGrid', baseFolder: 'images/digital/app/' }],
        // 插画图形（四个独立子页面）
        'hand-drawn.html': [{ category: 'hand-drawn', containerId: 'handDrawnGrid', baseFolder: 'images/illustration/hand-drawn/' }],
        'vector.html':     [{ category: 'vector',     containerId: 'vectorGrid',     baseFolder: 'images/illustration/vector/' }],
        'icon.html':       [{ category: 'icon',       containerId: 'iconGrid',        baseFolder: 'images/illustration/icon/' }],
        'cartoon.html':    [{ category: 'cartoon',    containerId: 'cartoonGrid',     baseFolder: 'images/illustration/cartoon/' }]
    };

    if (subPageMap[page]) {
        subPageMap[page].forEach(({ category, containerId, baseFolder }) => {
            renderWaterfall(category, containerId, baseFolder);
        });
        return;
    }

    // typography.html 不渲染瀑布流，图片仅在独立子页面展示
}

// ============================================
// 标签页切换
// ============================================
function initTabs() {
    const tabs = document.querySelectorAll('.section-tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(target + 'Panel')?.classList.add('active');
        });
    });
    const activeTab = document.querySelector('.section-tab.active');
    if (activeTab) activeTab.click();
}

// ============================================
// 图片放大弹窗
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const zoomInBtn = document.getElementById('lightboxZoomIn');
    const zoomOutBtn = document.getElementById('lightboxZoomOut');
    const resetBtn = document.getElementById('lightboxReset');
    if (!lightbox || !lightboxImg) return;

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 5;
    const STEP = 0.1;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === '+' || e.key === '=') adjustZoom(1);
        if (e.key === '-') adjustZoom(-1);
        if (e.key === '0') { scale = 1; translateX = 0; translateY = 0; applyTransform(); }
    });

    // 滚轮缩放
    lightboxImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        adjustZoom(e.deltaY < 0 ? 1 : -1);
    });

    // 拖拽平移（仅在 scale > 1 时生效）
    lightboxImg.addEventListener('mousedown', (e) => {
        if (scale <= 1) return;
        e.preventDefault();
        isDragging = true;
        dragStartX = e.clientX - translateX;
        dragStartY = e.clientY - translateY;
        lightboxImg.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - dragStartX;
        translateY = e.clientY - dragStartY;
        applyTransform();
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        lightboxImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
    });

    // 触摸端拖拽
    lightboxImg.addEventListener('touchstart', (e) => {
        if (scale <= 1) return;
        isDragging = true;
        dragStartX = e.touches[0].clientX - translateX;
        dragStartY = e.touches[0].clientY - translateY;
    }, { passive: true });

    lightboxImg.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        translateX = e.touches[0].clientX - dragStartX;
        translateY = e.touches[0].clientY - dragStartY;
        applyTransform();
    }, { passive: true });

    lightboxImg.addEventListener('touchend', () => {
        isDragging = false;
    });

    function adjustZoom(dir) {
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + dir * STEP));
        applyTransform();
    }

    function applyTransform() {
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        lightboxImg.style.cursor = isDragging ? 'grabbing' : (scale > 1 ? 'grab' : 'zoom-in');
    }

    zoomInBtn?.addEventListener('click', () => adjustZoom(1));
    zoomOutBtn?.addEventListener('click', () => adjustZoom(-1));
    resetBtn?.addEventListener('click', () => { scale = 1; translateX = 0; translateY = 0; applyTransform(); });

    // 双击重置
    lightboxImg.addEventListener('dblclick', () => { scale = 1; translateX = 0; translateY = 0; applyTransform(); });

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
        scale = 1;
        translateX = 0;
        translateY = 0;
        lightboxImg.style.transform = '';
        lightboxImg.style.cursor = '';
        isDragging = false;
    }

    document.addEventListener('click', (e) => {
        const img = e.target.closest('.waterfall-item img');
        if (img) {
            scale = 1;
            translateX = 0;
            translateY = 0;
            lightboxImg.style.transform = '';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
}

// ============================================
// 页面加载完成后初始化
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    new Carousel();         // 初始化轮播
    animateSkillCircles();  // 技能圆环动画
    highlightNav();         // 导航高亮
    initMobileNav();        // 移动端汉堡菜单
    initTabs();             // 标签页切换
    initWaterfall();        // 花瓣网瀑布流
    initLightbox();         // 图片放大
});
