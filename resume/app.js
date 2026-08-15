// ─── Split-flap letreiro ───
function initFlipText(root) {
    (root || document).querySelectorAll('.flip-text').forEach(el => {
        if (el.dataset.flipped === '1') return;
        const text = (el.textContent || '').trim();
        if (!text) return;
        let html = '';
        let i = 0;
        for (const ch of text) {
            if (ch === ' ') {
                html += '<span class="flip-space"></span>';
            } else {
                const esc = ch.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
                html += `<span class="flip-char" style="--i:${i}"><span>${esc}</span><span>${esc}</span></span>`;
            }
            i++;
        }
        el.innerHTML = html;
        el.dataset.flipped = '1';
    });
}

function resetFlipText(el) {
    if (el && el.dataset) el.dataset.flipped = '';
}

// Theme toggle
(function () {
    const html = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const label = toggle.querySelector('.theme-label');

    setTheme('light');

    toggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('cv-theme', next);
    });

    function setTheme(mode) {
        if (mode === 'dark') {
            html.setAttribute('data-theme', 'dark');
            label.textContent = 'Light';
            toggle.setAttribute('aria-label', 'Trocar para tema claro');
        } else {
            html.removeAttribute('data-theme');
            label.textContent = 'Dark';
            toggle.setAttribute('aria-label', 'Trocar para tema escuro');
        }
        resetFlipText(label);
        initFlipText(toggle);
    }
})();

// Initial flip-text wrap
initFlipText();

// Download button — auto-detect PDF, fallback to print
(function () {
    const btn = document.getElementById('downloadBtn');
    if (!btn) return;
    // The PDF is generated from this page and committed alongside it, so the
    // two never drift apart. The old /portfolio/uploader/list endpoint came
    // from the previous nginx host and no longer exists.
    const file = 'Joao-Teraoka-Product-Designer.pdf';
    fetch(file, { method: 'HEAD' })
        .then(r => {
            if (r.ok) {
                btn.setAttribute('href', file);
                btn.setAttribute('download', file);
            } else {
                btn.addEventListener('click', e => { e.preventDefault(); window.print(); });
            }
        })
        .catch(() => {
            btn.addEventListener('click', e => { e.preventDefault(); window.print(); });
        });
})();

// Share
(function () {
    const btn = document.getElementById('shareBtn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
        const url = window.location.href;
        const data = { title: 'Joao Teraoka — Resume', text: 'Confira meu CV', url };
        if (navigator.share) { try { await navigator.share(data); } catch (e) {} }
        else if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(url);
                const span = btn.querySelector('.flip-text') || btn.querySelector('span');
                const orig = span.textContent;
                span.dataset.flipped = '';
                span.textContent = 'Link copiado!';
                initFlipText(btn);
                setTimeout(() => {
                    span.dataset.flipped = '';
                    span.textContent = orig;
                    initFlipText(btn);
                }, 1800);
            } catch (e) {}
        }
    });
})();
