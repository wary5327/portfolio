import re
import os

NAV_BLOCK = '''
    <header class="site-header">
        <div class="header-inner">
            <a href="index.html" class="logo"><img src="images/wangzhan.png" alt="WangCheng"></a>
            <button class="nav-hamburger" id="navHamburger" aria-label="打开菜单" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <nav class="nav-overlay" id="navOverlay">
                <ul class="nav-list">
                    <li><a href="index.html" class="nav-home">首页</a></li>
                    <li><a href="about.html" class="nav-about">个人简介</a></li>
                    <li class="nav-dropdown">
                        <a href="typography.html" class="nav-parent">视觉设计</a>
                        <ul class="nav-dropdown-menu">
                            <li><a href="poster.html">海报设计</a></li>
                            <li><a href="layout.html">排版设计</a></li>
                            <li><a href="ad.html">广告设计</a></li>
                        </ul>
                    </li>
                    <li class="nav-dropdown">
                        <a href="brand.html" class="nav-parent">品牌设计</a>
                        <ul class="nav-dropdown-menu">
                            <li><a href="logo.html">LOGO设计</a></li>
                            <li><a href="visual.html">视觉设计</a></li>
                            <li><a href="font.html">字体设计</a></li>
                        </ul>
                    </li>
                    <li class="nav-dropdown">
                        <a href="packaging.html" class="nav-parent">包装设计</a>
                        <ul class="nav-dropdown-menu">
                            <li><a href="food-pack.html">食品包装</a></li>
                            <li><a href="cosmetic.html">化妆品包装</a></li>
                            <li><a href="gift.html">礼品包装</a></li>
                            <li><a href="tea.html">茶叶包装</a></li>
                            <li><a href="alcohol.html">酒类包装</a></li>
                            <li><a href="electronics.html">电子产品包装</a></li>
                        </ul>
                    </li>
                    <li class="nav-dropdown">
                        <a href="ecommerce.html" class="nav-parent">电商设计</a>
                        <ul class="nav-dropdown-menu">
                            <li><a href="first-image.html">主图</a></li>
                            <li><a href="detail.html">详情页</a></li>
                            <li><a href="banner.html">Banner</a></li>
                        </ul>
                    </li>
                    <li class="nav-dropdown">
                        <a href="digital.html" class="nav-parent">数字媒体</a>
                        <ul class="nav-dropdown-menu">
                            <li><a href="ui.html">UI界面</a></li>
                            <li><a href="app.html">APP界面</a></li>
                            <li><a href="h5.html">H5页面</a></li>
                        </ul>
                    </li>
                    <li class="nav-dropdown">
                        <a href="illustration.html" class="nav-parent">插画图形</a>
                        <ul class="nav-dropdown-menu">
                            <li><a href="hand-drawn.html">手绘插画</a></li>
                            <li><a href="vector.html">矢量图形</a></li>
                            <li><a href="icon.html">图标设计</a></li>
                            <li><a href="cartoon.html">卡通形象</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <div class="nav-mask" id="navMask"></div>
'''

# Pattern: from <!-- comment --> through </header>, ending before <main or <script
# The old nav spans from line 11 (comment) to line 74 (</header>)
OLD_NAV_PATTERN = re.compile(
    r'<!-- ========== 顶部导航栏 ========== -->\s*'
    r'<header class="site-header">.*?'
    r'</header>\s*',
    re.DOTALL
)

# Also handle pages that may not have the comment (edge case)
OLD_NAV_NO_COMMENT = re.compile(
    r'(<body>)\s*<header class="site-header">.*?</header>\s*',
    re.DOTALL
)

folder = r'd:\Desktop\网页'
done = {'index.html'}  # already updated

for fname in os.listdir(folder):
    if not fname.endswith('.html') or fname in done:
        continue
    path = os.path.join(folder, fname)
    content = open(path, encoding='utf-8').read()

    def replacer(m):
        return NAV_BLOCK.strip()

    new_content, count = OLD_NAV_PATTERN.subn(replacer, content)

    if count > 0:
        open(path, 'w', encoding='utf-8').write(new_content)
        print(f'Updated: {fname}')
    else:
        # Try without comment
        new_content, count2 = OLD_NAV_NO_COMMENT.subn(replacer, content)
        if count2 > 0:
            open(path, 'w', encoding='utf-8').write(new_content)
            print(f'Updated (no comment): {fname}')
        else:
            print(f'SKIP (no match): {fname}')
