/* ===========================================
   JEM TERAOKA — PORTFOLIO JS
   Premium Motion-Driven Interaction System
   =========================================== */

(function () {
    'use strict';

    // ─── Translations ───
    const i18n = {
        pt: {
            'nav.work': 'trabalhos',
            'nav.about': 'sobre',
            'nav.contact': 'contato',
            'nav.resume': 'currículo',
            'hero.eyebrow': 'Product Designer — São Paulo',
            'about.title': 'Sobre mim',
            'about.bio': 'Comecei no design gráfico, trabalhando mais de cinco anos em agências e como freelancer. Fiz a transição para Product Design quando percebi que era possível combinar estética com funcionalidade de uma forma que fazia muito mais sentido pra mim. Sou movido por curiosidade e dedicação genuína ao que faço.',
            'about.personal': 'Fora do trabalho, você me encontra jogando games desafiadores, tomando chá gelado, ouvindo música e fazendo carinho em gatos de rua.',
            'about.skills.design': 'Design',
            'about.intro': 'Aqui você pode acompanhar um pouco da minha jornada ao longo desses anos no mercado de trabalho.',
            'about.experience': 'Experiência',
            'about.education': 'Formação',
            'exp.itau.period': '2025 — Current',
            'exp.itau.desc': 'Working on investment and crypto products, designing end-to-end experiences from discovery to delivery. Focused on simplifying complex financial and trading flows through user research, behavioral analysis (FullStory), and A/B testing to improve conversion and engagement. Collaborating closely with product managers and engineers, creating high-fidelity prototypes in Figma and contributing to design system evolution to ensure consistency and scalability.',
            'exp.bity.role': 'Designer (UX/UI)',
            'exp.bity.desc': 'Worked on crypto-related products with a focus on acquisition and activation flows, improving onboarding and conversion journeys. Applied data-driven design approaches, including A/B testing and behavioral insights, while collaborating with product, marketing, and engineering teams to optimize key user flows.',
            'exp.quantum.role': 'Designer (UX/UI)',
            'exp.quantum.desc': 'Designed landing pages for different brands with a focus on conversion and performance. Conducted A/B testing and iterative improvements based on user behavior and campaign data, collaborating with teams to align business goals with user experience.',
            'exp.topline.role': 'Designer (UX/UI)',
            'exp.topline.desc': 'Created landing pages for product launches across different companies, focusing on user journey and conversion. Ensured consistency across touchpoints and collaborated with product and growth teams to deliver effective digital experiences.',
            'exp.azblue.role': 'Designer',
            'exp.azblue.desc': 'Worked on web design and landing page creation for digital campaigns, focusing on layout, visual consistency, and user experience across web interfaces.',
            'edu.fiap': 'MBA em Future Centered Design',
            'edu.univap': 'Bacharelado em Publicidade e Propaganda',
            'work.featured': 'Trabalhos em Destaque',
            'work.more': 'Mais Trabalhos',
            'case.seluna': 'Experiência de reserva para resort de luxo',
            'case.topaz': 'Identidade visual minimalista',
            'case.dwello': 'App de gerenciamento de casa inteligente',
            'case.meli.tag': 'Processo Seletivo · 2025',
            'case.meli': 'Conceito de streaming para o Mercado Livre',
            'case.music': 'App de música minimalista e intuitivo',
            'case.fooddash': 'Delivery de comida reimaginado',
            'case.crypto': 'Interface de trading de criptomoedas',
            'case.steam': 'Redesign da plataforma de jogos',
            'case.cta': 'Ver projeto →',
            'process.title': 'Processo',
            'process.1.name': 'Pesquisa',
            'process.1.desc': 'Entender o problema real, os usuários e o contexto antes de qualquer solução.',
            'process.2.name': 'Ideação',
            'process.2.desc': 'Explorar possibilidades sem limitação, depois convergir no que faz mais sentido.',
            'process.3.name': 'Design',
            'process.3.desc': 'Criar a experiência com atenção obsessiva a cada detalhe e interação.',
            'process.4.name': 'Validação',
            'process.4.desc': 'Testar com pessoas reais, iterar com dados, entregar com confiança.',
            'contact.title': 'Vamos trabalhar juntos',
            'footer.top': 'voltar ao topo'
        },
        en: {
            'nav.work': 'work',
            'nav.about': 'about',
            'nav.contact': 'contact',
            'nav.resume': 'resume',
            'hero.eyebrow': 'Product Designer — São Paulo',
            'about.title': 'About me',
            'about.bio': "I started in graphic design, spending over five years at agencies and freelancing. I transitioned to Product Design when I realized I could combine aesthetics with functionality in a way that made much more sense to me. I\u2019m driven by curiosity and genuine dedication to my craft.",
            'about.personal': "Outside of work, you\u2019ll find me playing challenging games, drinking iced tea, listening to music, and petting street cats.",
            'about.skills.design': 'Design',
            'about.intro': 'Here you can follow a bit of my journey over these years in the job market.',
            'about.experience': 'Experience',
            'about.education': 'Education',
            'exp.itau.period': '2025 — Current',
            'exp.itau.desc': 'Working on investment and crypto products, designing end-to-end experiences from discovery to delivery. Focused on simplifying complex financial and trading flows through user research, behavioral analysis (FullStory), and A/B testing to improve conversion and engagement. Collaborating closely with product managers and engineers, creating high-fidelity prototypes in Figma and contributing to design system evolution to ensure consistency and scalability.',
            'exp.bity.role': 'Designer (UX/UI)',
            'exp.bity.desc': 'Worked on crypto-related products with a focus on acquisition and activation flows, improving onboarding and conversion journeys. Applied data-driven design approaches, including A/B testing and behavioral insights, while collaborating with product, marketing, and engineering teams to optimize key user flows.',
            'exp.quantum.role': 'Designer (UX/UI)',
            'exp.quantum.desc': 'Designed landing pages for different brands with a focus on conversion and performance. Conducted A/B testing and iterative improvements based on user behavior and campaign data, collaborating with teams to align business goals with user experience.',
            'exp.topline.role': 'Designer (UX/UI)',
            'exp.topline.desc': 'Created landing pages for product launches across different companies, focusing on user journey and conversion. Ensured consistency across touchpoints and collaborated with product and growth teams to deliver effective digital experiences.',
            'exp.azblue.role': 'Designer',
            'exp.azblue.desc': 'Worked on web design and landing page creation for digital campaigns, focusing on layout, visual consistency, and user experience across web interfaces.',
            'edu.fiap': 'MBA in Future Centered Design',
            'edu.univap': 'Bachelor\'s in Advertising and Marketing',
            'work.featured': 'Featured Work',
            'work.more': 'More Work',
            'case.seluna': 'Luxury resort booking experience',
            'case.topaz': 'Minimalist brand identity',
            'case.dwello': 'Smart home management app',
            'case.meli.tag': 'Selection Process · 2025',
            'case.meli': 'Streaming concept for Mercado Livre',
            'case.music': 'Minimalist and intuitive music app',
            'case.fooddash': 'Food delivery reimagined',
            'case.crypto': 'Cryptocurrency trading interface',
            'case.steam': 'Gaming platform redesign',
            'case.cta': 'View project →',
            'process.title': 'Process',
            'process.1.name': 'Research',
            'process.1.desc': 'Understand the real problem, users, and context before any solution.',
            'process.2.name': 'Ideation',
            'process.2.desc': 'Explore possibilities without limits, then converge on what makes most sense.',
            'process.3.name': 'Design',
            'process.3.desc': 'Craft the experience with obsessive attention to every detail and interaction.',
            'process.4.name': 'Validation',
            'process.4.desc': 'Test with real people, iterate with data, deliver with confidence.',
            'contact.title': "Let\u2019s work together",
            'footer.top': 'back to top'
        }
    };

    let currentLang = 'en';

    // ═══════════ CURSOR: Spring-based dual-layer system ═══════════
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

        // Smooth follow (lerp, no overshoot)
        const dotState  = { x: -200, y: -200 };
        const ringState = { x: -200, y: -200 };
        const DOT_LERP = 0.35;
        const RING_LERP = 0.18;

        function lerpStep(state, targetX, targetY, factor) {
            state.x += (targetX - state.x) * factor;
            state.y += (targetY - state.y) * factor;
        }

        // Hover/click state
        let hoverScale = 1, targetScale = 1;
        let isCase = false;

        // Standard interactive elements
        document.querySelectorAll('a:not([data-cursor="case"]), button, .magnetic').forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.classList.add('cursor-hover');
                ring.classList.remove('cursor-case');
                isCase = false;
                targetScale = 1.3;
            });
            el.addEventListener('mouseleave', () => {
                ring.classList.remove('cursor-hover');
                targetScale = 1;
            });
        });

        // Case cards — show "view" text
        document.querySelectorAll('[data-cursor="case"]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.classList.add('cursor-case');
                ring.classList.remove('cursor-hover');
                isCase = true;
                targetScale = 1;
            });
            el.addEventListener('mouseleave', () => {
                ring.classList.remove('cursor-case');
                isCase = false;
                targetScale = 1;
            });
        });

        // Click feedback
        document.addEventListener('mousedown', () => {
            dot.style.transition = 'transform 0.1s';
            targetScale *= 0.7;
        });
        document.addEventListener('mouseup', () => {
            dot.style.transition = '';
            targetScale = isCase ? 1 : (ring.classList.contains('cursor-hover') ? 1.3 : 1);
        });

        // Render loop
        function renderCursor() {
            requestAnimationFrame(renderCursor);
            if (!mouseEntered) return;

            lerpStep(dotState, mouseX, mouseY, DOT_LERP);
            lerpStep(ringState, mouseX, mouseY, RING_LERP);

            hoverScale += (targetScale - hoverScale) * 0.12;

            const dotR = 4;
            const ringR = ring.classList.contains('cursor-case') ? 40
                        : ring.classList.contains('cursor-hover') ? 24 : 18;

            dot.style.transform = `translate3d(${dotState.x - dotR}px, ${dotState.y - dotR}px, 0) scale(${hoverScale})`;
            ring.style.transform = `translate3d(${ringState.x - ringR}px, ${ringState.y - ringR}px, 0) scale(${hoverScale})`;
        }
        renderCursor();

        // ── Glyph grid trail ──
        if (glyphCanvas) {
            const ctx = glyphCanvas.getContext('2d');
            const glyphs = ['+', '×', '○', '◇', '□', '·', '◦', '⊕', '⊗', '△', '▽', '⬡'];
            const CELL = 22, RADIUS = 120, FADE = 0.94;
            let cols, rows, grid;
            const active = new Set();   // indices of cells currently lit

            function initGrid() {
                active.clear();   // indices are invalidated when the grid is rebuilt
                const dpr = Math.min(window.devicePixelRatio, 2);
                glyphCanvas.width = window.innerWidth * dpr;
                glyphCanvas.height = window.innerHeight * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                glyphCanvas.style.width = window.innerWidth + 'px';
                glyphCanvas.style.height = window.innerHeight + 'px';
                cols = Math.ceil(window.innerWidth / CELL) + 1;
                rows = Math.ceil(window.innerHeight / CELL) + 1;
                grid = [];
                for (let r = 0; r < rows; r++)
                    for (let c = 0; c < cols; c++)
                        grid.push({ g: glyphs[(Math.random() * glyphs.length) | 0], o: 0, x: c * CELL + CELL / 2, y: r * CELL + CELL / 2 });
            }
            initGrid();
            window.addEventListener('resize', initGrid);

            const isDarkTheme = () => document.body.getAttribute('data-theme') === 'dark';

            function animateGlyphs() {
                requestAnimationFrame(animateGlyphs);
                // Nothing to draw with the tab in the background.
                if (document.hidden) return;
                const dpr = Math.min(window.devicePixelRatio, 2);
                ctx.clearRect(0, 0, glyphCanvas.width / dpr, glyphCanvas.height / dpr);
                if (!mouseEntered) return;

                const dark = isDarkTheme();
                ctx.font = `${CELL * 0.45}px 'Space Grotesk', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const cx = ringState.x, cy = ringState.y;

                // Light up only the cells inside the cursor's radius, found by
                // index arithmetic instead of scanning the whole grid. At 1080p
                // the grid holds ~4000 cells; the radius covers ~120 of them.
                const c0 = Math.max(0, Math.floor((cx - RADIUS) / CELL));
                const c1 = Math.min(cols - 1, Math.ceil((cx + RADIUS) / CELL));
                const r0 = Math.max(0, Math.floor((cy - RADIUS) / CELL));
                const r1 = Math.min(rows - 1, Math.ceil((cy + RADIUS) / CELL));
                const RADIUS2 = RADIUS * RADIUS;

                for (let r = r0; r <= r1; r++) {
                    for (let col = c0; col <= c1; col++) {
                        const c = grid[r * cols + col];
                        if (!c) continue;
                        const dx = c.x - cx, dy = c.y - cy;
                        const d2 = dx * dx + dy * dy;   // compare squares, skip sqrt
                        if (d2 < RADIUS2) {
                            const t = 1 - Math.sqrt(d2) / RADIUS;
                            c.o = Math.max(c.o, t * t * 0.65);
                            if (c.o > 0.005) active.add(r * cols + col);
                        }
                    }
                }

                // Fade and draw only the cells still carrying opacity.
                for (const i of active) {
                    const c = grid[i];
                    c.o *= FADE;
                    if (c.o <= 0.005) { c.o = 0; active.delete(i); continue; }
                    ctx.fillStyle = dark
                        ? `rgba(180,160,255,${c.o})`
                        : `rgba(80,60,180,${c.o * 0.5})`;
                    ctx.fillText(c.g, c.x, c.y);
                }
            }
            animateGlyphs();
        }
    }

    // ═══════════ EXPERIENCE ACCORDION ═══════════
    document.querySelectorAll('.cv-accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.parentElement;
            // Close siblings
            accordion.parentElement.querySelectorAll('.cv-accordion.open').forEach(open => {
                if (open !== accordion) open.classList.remove('open');
            });
            accordion.classList.toggle('open');
        });
    });

    // ═══════════ MAGNETIC HOVER ═══════════
    if (!isTouchDevice) {
        document.querySelectorAll('.magnetic:not(.flip-text):not(.contact-link)').forEach(el => {
            // Measure once on enter. Reading getBoundingClientRect() inside
            // mousemove and writing a transform straight after forced a
            // synchronous reflow on every single pointer event.
            let rect = null;
            el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
            el.addEventListener('mousemove', (e) => {
                if (!rect) rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });
            el.addEventListener('mouseleave', () => {
                rect = null;
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.transform = '';
                setTimeout(() => { el.style.transition = ''; }, 500);
            });
        });
    }

    // ═══════════ THEME ═══════════
    const savedTheme = 'light';
    document.body.setAttribute('data-theme', savedTheme);

    function toggleTheme() {
        const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('jem-theme', next);
    }

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);

    // ═══════════ SPLIT-FLAP TEXT ═══════════
    function initFlipText() {
        document.querySelectorAll('.flip-text').forEach(el => {
            if (el.querySelector(':scope > .flip-char')) return;
            const raw = (el.textContent || '').trim();
            if (!raw) return;
            const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            let i = 0;
            const html = [...raw].map(ch => {
                if (ch === ' ') return '<span class="flip-space">&nbsp;</span>';
                const s = esc(ch);
                const out = `<span class="flip-char" style="--i:${i}"><span>${s}</span><span aria-hidden="true">${s}</span></span>`;
                i++;
                return out;
            }).join('');
            el.innerHTML = html;
        });
        document.querySelectorAll('.flip-text--per-char .flip-char').forEach(char => {
            if (char.dataset.flipBound) return;
            char.dataset.flipBound = '1';
            char.addEventListener('mouseenter', () => char.classList.toggle('is-flipped'));
        });
    }

    // ═══════════ LANGUAGE ═══════════
    function setLang(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = i18n[lang][key];
                } else {
                    el.innerHTML = i18n[lang][key];
                }
            }
        });
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        document.querySelectorAll('.lang-toggle').forEach(btn => {
            btn.textContent = lang === 'pt' ? 'PT' : 'EN';
        });
        initFlipText();
    }

    function toggleLang() {
        setLang(currentLang === 'pt' ? 'en' : 'pt');
        localStorage.setItem('jem-lang', currentLang);
    }

    document.getElementById('langToggle')?.addEventListener('click', toggleLang);
    document.getElementById('langToggleMobile')?.addEventListener('click', toggleLang);

    const savedLang = localStorage.getItem('jem-lang');
    setLang(savedLang || 'en');

    // ═══════════ MOBILE MENU ═══════════
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ═══════════ NAV SCROLL ═══════════
    const nav = document.getElementById('nav');
    const backToTop = document.querySelector('.back-to-top');
    const footerEl = document.querySelector('.footer');
    const baseBottom = 28; // px — matches CSS 1.75rem
    // Coalesced into one rAF per frame: scroll fires far more often than the
    // screen refreshes, and reading getBoundingClientRect() right before
    // writing style.bottom forced a synchronous reflow on every event.
    let scrollTicking = false;
    const onScrollFrame = () => {
        scrollTicking = false;
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 100);
        if (!backToTop) return;
        backToTop.classList.toggle('is-visible', y > 400);
        if (!footerEl) return;
        // Only measure the footer once the button is actually on screen.
        if (y <= 400) return;
        const rect = footerEl.getBoundingClientRect();
        const overlap = window.innerHeight - rect.top;
        backToTop.style.bottom = overlap > 0 ? (baseBottom + overlap) + 'px' : '';
    };
    window.addEventListener('scroll', () => {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(onScrollFrame);
    }, { passive: true });
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ═══════════ SMOOTH SCROLL ═══════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ═══════════ GSAP ANIMATIONS ═══════════
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // ── Hero entrance ──
        const heroTl = gsap.timeline({ delay: 0.4 });
        heroTl
            .from('.hero-eyebrow', {
                y: 20, opacity: 0,
                duration: 0.8, ease: 'power3.out'
            })
            .from('.hero-line', {
                y: '120%',
                duration: 1.4, ease: 'power4.out',
                stagger: 0.15
            }, '-=0.5')
            .from('.hero-scroll', {
                opacity: 0,
                duration: 0.8
            }, '-=0.4');

        // ── About card entrance (non-scrub to avoid pin conflicts) ──
        const aboutCard = document.getElementById('aboutCard');
        if (aboutCard) {
            gsap.fromTo(aboutCard,
                { y: 60, opacity: 0 },
                { scrollTrigger: { trigger: '#about', start: 'top 85%' },
                  y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );
            gsap.fromTo('.about-intro',
                { y: 20, opacity: 0 },
                { scrollTrigger: { trigger: '#about', start: 'top 75%' },
                  y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
            );
            gsap.fromTo('.cv-section',
                { y: 40, opacity: 0 },
                { scrollTrigger: { trigger: '.mac-body', start: 'top 85%' },
                  y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            );
        }

        // ── Cases header reveal ──
        gsap.fromTo('.cases-header',
            { y: 30, opacity: 0 },
            {
                scrollTrigger: { trigger: '.section-cases', start: 'top 85%' },
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
            }
        );

        // ── Bento cards reveal — all together, single trigger ──
        gsap.fromTo('.bento-card',
            { y: 40, opacity: 0 },
            {
                scrollTrigger: { trigger: '.bento-grid', start: 'top 85%' },
                y: 0, opacity: 1,
                duration: 0.8, ease: 'power3.out'
            }
        );

        // ── Work grid cards — all together ──
        if (document.querySelector('.work-grid')) {
            gsap.fromTo('.work-card',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.work-grid', start: 'top 88%' },
                    y: 0, opacity: 1,
                    duration: 0.8, ease: 'power3.out'
                }
            );
        }

        // ── Work heading ──
        gsap.fromTo('.section-work .section-heading',
            { y: 20, opacity: 0 },
            {
                scrollTrigger: { trigger: '.section-work', start: 'top 85%' },
                y: 0, opacity: 1, duration: 0.6, ease: 'power3.out'
            }
        );

        // ── Process cards ──
        gsap.fromTo('.section-process .section-heading',
            { y: 20, opacity: 0 },
            {
                scrollTrigger: { trigger: '.section-process', start: 'top 85%' },
                y: 0, opacity: 1, duration: 0.6, ease: 'power3.out'
            }
        );

        if (document.querySelector('.process-grid')) {
            gsap.fromTo('.process-card',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.process-grid', start: 'top 88%' },
                    y: 0, opacity: 1,
                    duration: 0.8, ease: 'power3.out'
                }
            );
        }

        // ── Contact ──
        gsap.fromTo('.contact-heading',
            { y: 60, opacity: 0 },
            {
                scrollTrigger: { trigger: '.section-contact', start: 'top 75%' },
                y: 0, opacity: 1,
                duration: 1, ease: 'power4.out'
            }
        );

        gsap.utils.toArray('.contact-link').forEach((link) => {
            gsap.fromTo(link,
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: { trigger: '.contact-links', start: 'top 85%' },
                    y: 0, opacity: 1,
                    duration: 0.8, ease: 'power3.out'
                }
            );
        });
    }

    // ═══════════ THREE.JS — 3D Torus Knot with Creation Animation ═══════════
    if (typeof THREE !== 'undefined') {
        const container = document.getElementById('threeHero');
        if (container) {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
                45, container.clientWidth / container.clientHeight, 0.1, 100
            );
            camera.position.z = 6;

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);

            // Torus knot geometry
            const geometry = new THREE.TorusKnotGeometry(1.0, 0.32, 200, 40, 2, 3);
            const totalIndices = geometry.index.count;

            // Start invisible — will animate draw range
            geometry.setDrawRange(0, 0);

            const isDark = () => document.body.getAttribute('data-theme') === 'dark';

            const material = new THREE.MeshStandardMaterial({
                color: isDark() ? 0x7c6cf6 : 0x5046e5,
                wireframe: true,
                transparent: true,
                opacity: 0.2
            });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            scene.add(new THREE.AmbientLight(0xffffff, 0.4));
            const pointLight = new THREE.PointLight(0x7c6cf6, 1.2, 20);
            pointLight.position.set(3, 3, 5);
            scene.add(pointLight);

            // Mouse-reactive rotation
            let targetRotX = 0, targetRotY = 0;
            document.addEventListener('mousemove', (e) => {
                targetRotX = ((e.clientY / window.innerHeight) - 0.5) * 2;
                targetRotY = ((e.clientX / window.innerWidth) - 0.5) * 2;
            });

            // Theme change
            const observer = new MutationObserver(() => {
                material.color.setHex(isDark() ? 0x7c6cf6 : 0x5046e5);
            });
            observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

            // Resize
            window.addEventListener('resize', () => {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            });

            // ── Creation animation ──
            // The torus knot "grows" like a worm tracing its path until it connects
            const creationDelay = 0.8;   // seconds before starting (wait for hero text)
            const creationDuration = 3.0; // seconds to fully draw
            const startTime = performance.now() / 1000;
            let creationComplete = false;

            // The hero scrolls away, but WebGL kept rendering it the whole way
            // down the page. Stop drawing once it leaves the viewport.
            let heroVisible = true;
            new IntersectionObserver(
                ([entry]) => { heroVisible = entry.isIntersecting; },
                { threshold: 0 }
            ).observe(container);

            function animate3D() {
                requestAnimationFrame(animate3D);
                if (document.hidden || !heroVisible) return;

                // Creation: progressively reveal the geometry
                if (!creationComplete) {
                    const elapsed = (performance.now() / 1000) - startTime - creationDelay;
                    if (elapsed > 0) {
                        const progress = Math.min(elapsed / creationDuration, 1);
                        // Ease out cubic for smooth deceleration at the end
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const count = Math.floor(totalIndices * eased);
                        // Round to nearest multiple of 3 (triangles)
                        geometry.setDrawRange(0, count - (count % 3));

                        if (progress >= 1) creationComplete = true;
                    }
                }

                // Continuous slow rotation + mouse reactivity
                mesh.rotation.x += 0.002;
                mesh.rotation.z += 0.001;
                mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.015;
                mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.015;

                renderer.render(scene, camera);
            }
            animate3D();

            // Fade in the 3D container
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(container,
                    { opacity: 0 },
                    { opacity: 1, duration: 1.5, delay: 0.6, ease: 'power2.out' }
                );
            }
        }
    }

    // WIP cards navigate natively to wip.html (standalone dino page)

})();
