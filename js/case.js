(function () {
    'use strict';

    // ─── Theme ───
    const saved = 'light';
    document.body.setAttribute('data-theme', saved);
    document.getElementById('themeToggle')?.addEventListener('click', () => {
        const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('jem-theme', next);
    });

    // ─── Nav scroll + Back to top ───
    const backTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        document.getElementById('nav').classList.toggle('scrolled', y > 50);
        if (backTop) backTop.classList.toggle('visible', y > 400);
    }, { passive: true });
    backTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── CURSOR: Spring-based dual-layer inertia system ───
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const glyphCanvas = document.getElementById('glyphCanvas');
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (!isTouchDevice && dot && ring) {
        let mouseX = -200, mouseY = -200;
        let mouseEntered = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!mouseEntered) {
                mouseEntered = true;
                dotState.x = mouseX; dotState.y = mouseY;
                ringState.x = mouseX; ringState.y = mouseY;
                dot.style.opacity = '1';
                ring.style.opacity = '1';
            }
        });

        document.addEventListener('mouseleave', () => {
            dot.style.opacity = '0';
            ring.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            if (mouseEntered) {
                dot.style.opacity = '1';
                ring.style.opacity = '1';
            }
        });

        // ── Spring physics ──
        const dotState  = { x: -200, y: -200, vx: 0, vy: 0 };
        const ringState = { x: -200, y: -200, vx: 0, vy: 0 };

        const DOT_STIFF = 0.15, DOT_DAMP = 0.75;
        const RING_STIFF = 0.08, RING_DAMP = 0.82;

        function springStep(state, targetX, targetY, stiffness, damping) {
            const fx = (targetX - state.x) * stiffness;
            const fy = (targetY - state.y) * stiffness;
            state.vx = (state.vx + fx) * damping;
            state.vy = (state.vy + fy) * damping;
            state.x += state.vx;
            state.y += state.vy;
        }

        // ── Hover/click state ──
        let hoverScale = 1, targetScale = 1;

        document.querySelectorAll('a, button, .magnetic').forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.classList.add('cursor-hover');
                targetScale = 1.3;
            });
            el.addEventListener('mouseleave', () => {
                ring.classList.remove('cursor-hover');
                targetScale = 1;
            });
        });

        document.addEventListener('mousedown', () => {
            dot.style.transition = 'transform 0.1s';
            targetScale *= 0.7;
        });
        document.addEventListener('mouseup', () => {
            dot.style.transition = '';
            targetScale = ring.classList.contains('cursor-hover') ? 1.3 : 1;
        });

        // ── Render loop ──
        function renderCursor() {
            requestAnimationFrame(renderCursor);
            if (!mouseEntered) return;

            springStep(dotState, mouseX, mouseY, DOT_STIFF, DOT_DAMP);
            springStep(ringState, mouseX, mouseY, RING_STIFF, RING_DAMP);

            hoverScale += (targetScale - hoverScale) * 0.12;

            const dotR = 4;
            const ringR = ring.classList.contains('cursor-hover') ? 24 : 18;

            dot.style.transform = `translate3d(${dotState.x - dotR}px, ${dotState.y - dotR}px, 0) scale(${hoverScale})`;
            ring.style.transform = `translate3d(${ringState.x - ringR}px, ${ringState.y - ringR}px, 0) scale(${hoverScale})`;
        }
        renderCursor();

        // ── Glyph grid (cursor-only reveal + matrix glitch, multi-hue) ──
        if (glyphCanvas) {
            const ctx = glyphCanvas.getContext('2d');
            const glyphs = ['+', '×', '○', '◇', '□', '·', '◦', '⊕', '⊗', '△', '▽', '⬡', '〒', '§', '¤', '★', '◈', '◆', '◊', '⌘', '⌬', '⎔'];
            // palette: saturated purple spectrum — no pastels, no pink
            const palette = [
                { dark: '170,60,255',  light: '110,30,200' },  // electric purple
                { dark: '130,40,230',  light: '80,20,170' },   // royal purple
                { dark: '190,70,255',  light: '130,40,210' },  // neon violet
                { dark: '100,30,220',  light: '60,10,160' },   // deep indigo
                { dark: '210,80,240',  light: '150,40,200' },  // magenta-purple
                { dark: '150,80,255',  light: '100,40,200' }   // vivid violet
            ];
            const CELL = 22, RADIUS = 100, FADE = 0.952;
            let cols, rows, grid;

            const pickGlyph = () => glyphs[(Math.random() * glyphs.length) | 0];

            function initGrid() {
                const dpr = Math.min(window.devicePixelRatio, 2);
                glyphCanvas.width = window.innerWidth * dpr;
                glyphCanvas.height = window.innerHeight * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                glyphCanvas.style.width = window.innerWidth + 'px';
                glyphCanvas.style.height = window.innerHeight + 'px';
                cols = Math.ceil(window.innerWidth / CELL) + 1;
                rows = Math.ceil(window.innerHeight / CELL) + 1;
                grid = [];
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        grid.push({
                            g: pickGlyph(),
                            o: 0,
                            hue: palette[(Math.random() * palette.length) | 0],
                            swapIn: 4 + (Math.random() * 15) | 0,
                            x: c * CELL + CELL / 2,
                            y: r * CELL + CELL / 2
                        });
                    }
                }
            }
            initGrid();
            window.addEventListener('resize', initGrid);

            const isDark = () => document.body.getAttribute('data-theme') === 'dark';

            function animateGlyphs() {
                requestAnimationFrame(animateGlyphs);
                const w = glyphCanvas.width / Math.min(window.devicePixelRatio, 2);
                const h = glyphCanvas.height / Math.min(window.devicePixelRatio, 2);
                ctx.clearRect(0, 0, w, h);
                if (!mouseEntered) return;

                const dark = isDark();
                ctx.font = `${CELL * 0.48}px 'Space Grotesk', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const cx = ringState.x, cy = ringState.y;

                for (let i = 0; i < grid.length; i++) {
                    const c = grid[i];

                    // rapid glyph swap — slower than before (~20%), also occasionally re-hue for flicker
                    if (--c.swapIn <= 0) {
                        c.g = pickGlyph();
                        if (Math.random() < 0.15) c.hue = palette[(Math.random() * palette.length) | 0];
                        c.swapIn = 4 + (Math.random() * 15) | 0;
                    }

                    // cursor spotlight
                    const dx = c.x - cx, dy = c.y - cy;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < RADIUS) {
                        const t = 1 - dist / RADIUS;
                        const boost = t * t * 0.85;
                        if (boost > c.o) c.o = boost;
                    }

                    c.o *= FADE;

                    if (c.o > 0.005) {
                        const rgb = dark ? c.hue.dark : c.hue.light;
                        const alpha = dark ? c.o : c.o * 0.75;
                        ctx.fillStyle = `rgba(${rgb},${alpha})`;
                        ctx.fillText(c.g, c.x, c.y);
                    }
                }
            }
            animateGlyphs();
        }
    }

    // ─── GSAP Animations ───
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.case-title', { y: 60, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.3 });
        gsap.from('.case-subtitle', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.5 });
        gsap.from('.meta-item', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1, delay: 0.6 });
        gsap.utils.toArray('.case-heading').forEach(el => {
            gsap.fromTo(el, { y: 30, opacity: 0 }, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
        });
        gsap.utils.toArray('.case-text').forEach(el => {
            gsap.fromTo(el, { y: 20, opacity: 0 }, { scrollTrigger: { trigger: el, start: 'top 90%' }, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
        });
        gsap.utils.toArray('.case-img-full, .case-img-duo, .case-img-trio').forEach(el => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        });
        gsap.utils.toArray('.case-step').forEach((el, i) => {
            gsap.fromTo(el, { y: 30, opacity: 0 }, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: i * 0.06 });
        });
        gsap.fromTo('.case-next', { y: 40, opacity: 0 }, { scrollTrigger: { trigger: '.case-next', start: 'top 88%' }, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    }
})();
