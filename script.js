/**
 * Edge's Wiki - JavaScript
 */

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
    addCopyButtons();

    document.addEventListener('keydown', handleKeyboardShortcuts);

    console.log('Edge\'s Wiki 已加载');
});
