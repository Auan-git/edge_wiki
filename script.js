/**
 * Edge's Wiki - JavaScript
 */

// ============================================
// 主题切换 (暗色/亮色)
// ============================================
function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    // 确保悬浮定位（inline style 优先级最高，彻底绕过 CSS 加载问题）
    btn.style.position = 'fixed';
    btn.style.bottom = '24px';
    btn.style.right = '24px';
    btn.style.zIndex = '9999';
    btn.style.width = '46px';
    btn.style.height = '46px';
    btn.style.borderRadius = '50%';
    btn.style.border = '2px solid #cbd5e1';
    btn.style.background = '#ffffff';
    btn.style.color = '#334155';
    btn.style.fontSize = '1.3rem';
    btn.style.cursor = 'pointer';
    btn.style.display = 'flex';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
    btn.style.lineHeight = '1';
    btn.style.padding = '0';
    btn.style.outline = 'none';

    // 读取保存的主题偏好
    const saved = localStorage.getItem('wiki-theme');
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
        btn.style.background = '#334155';
        btn.style.color = '#e2e8f0';
        btn.style.borderColor = '#475569';
        btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)';
    }

    btn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('wiki-theme', 'light');
            btn.textContent = '🌙';
            btn.style.background = '#ffffff';
            btn.style.color = '#334155';
            btn.style.borderColor = '#cbd5e1';
            btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('wiki-theme', 'dark');
            btn.textContent = '☀️';
            btn.style.background = '#334155';
            btn.style.color = '#e2e8f0';
            btn.style.borderColor = '#475569';
            btn.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)';
        }
    });
}

// ============================================
// 代码块复制按钮
// ============================================
function addCopyButtons() {
    const pres = document.querySelectorAll('.wiki pre');

    pres.forEach(pre => {
        // 避免重复添加
        if (pre.parentNode.classList.contains('code-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        wrapper.style.position = 'relative';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '复制';
        copyBtn.style.cssText = `
            position: absolute;
            top: 6px;
            right: 8px;
            background: rgba(100, 116, 139, 0.15);
            color: #64748b;
            border: none;
            padding: 2px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.2s;
        `;

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(pre.textContent);
                copyBtn.textContent = '已复制!';
                setTimeout(() => {
                    copyBtn.textContent = '复制';
                }, 2000);
            } catch {
                // fallback
                copyBtn.textContent = '失败';
                setTimeout(() => {
                    copyBtn.textContent = '复制';
                }, 1000);
            }
        });

        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(copyBtn);

        wrapper.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        wrapper.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
    });
}

// ============================================
// 键盘快捷键
// ============================================
function handleKeyboardShortcuts(event) {
    // Escape: 移除焦点
    if (event.key === 'Escape') {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }
}

// ============================================
// 初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    addCopyButtons();

    document.addEventListener('keydown', handleKeyboardShortcuts);

    console.log('Edge\'s Wiki 已加载');
});
