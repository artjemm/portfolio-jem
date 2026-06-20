/* ===========================================
   JEM TERAOKA — WIP DINO RUNNER
   Pixel-art runner inside the WIP modal.
   Public API: window.WipGame.mount() / unmount()
   =========================================== */

(function () {
    'use strict';

    const W = 700, H = 200, GROUND_Y = 170;
    const DINO_X = 60, DINO_W = 44, DINO_H = 47;
    const GRAVITY = 0.6, JUMP_VEL = -11.5;
    const START_SPEED = 6, MAX_SPEED = 13, SPEED_INC = 0.0018;
    const HI_KEY = 'jem-wip-hi';
    const STATE = { IDLE: 0, RUNNING: 1, GAMEOVER: 2 };

    const CACTI = [
        { w: 14, h: 30, kind: 'small' },
        { w: 14, h: 38, kind: 'tall' },
        { w: 24, h: 30, kind: 'double' },
        { w: 32, h: 36, kind: 'triple' }
    ];

    let canvas, ctx;
    let scoreEl, hiEl, overlayEl;
    let raf = null;

    let state = STATE.IDLE;
    let dinoY = 0, dinoVy = 0;
    let cacti = [];
    let groundOff = 0;
    let speed = START_SPEED;
    let score = 0;
    let hi = parseInt(localStorage.getItem(HI_KEY) || '0', 10);
    let frameCount = 0;
    let nextSpawn = 60;
    let collisionFlash = 0;
    let runFrame = 0;
    let restartLock = 0;

    function colors() {
        const dark = document.body.getAttribute('data-theme') !== 'light';
        return {
            dino:    dark ? '#b8b6c4' : '#5c5a66',
            ground:  dark ? '#5c5a66' : '#9896a3',
            cactus:  dark ? '#7a7888' : '#5c5a66',
            eyeBg:   dark ? '#15151e' : '#fafafa'
        };
    }

    function pad(n) { return String(n).padStart(5, '0'); }

    function updateScoreUI() {
        if (scoreEl) scoreEl.textContent = pad(score);
        if (hiEl) hiEl.textContent = pad(hi);
    }

    function showOverlay(html) {
        if (!overlayEl) return;
        overlayEl.classList.remove('is-hidden');
        const titleEl = overlayEl.querySelector('.wip-overlay-title');
        if (titleEl) titleEl.innerHTML = html;
    }

    function hideOverlay() {
        if (overlayEl) overlayEl.classList.add('is-hidden');
    }

    function reset() {
        state = STATE.IDLE;
        dinoY = 0; dinoVy = 0;
        speed = START_SPEED;
        score = 0;
        cacti = [];
        groundOff = 0;
        nextSpawn = 60;
        frameCount = 0;
        collisionFlash = 0;
        runFrame = 0;
        updateScoreUI();
        showOverlay('Press <kbd>SPACE</kbd> or click to start');
    }

    function start() {
        state = STATE.RUNNING;
        hideOverlay();
        if (dinoY === 0) dinoVy = JUMP_VEL;
    }

    function jump() {
        if (state !== STATE.RUNNING) return;
        if (dinoY === 0) dinoVy = JUMP_VEL;
    }

    function gameOver() {
        state = STATE.GAMEOVER;
        if (score > hi) {
            hi = score;
            try { localStorage.setItem(HI_KEY, String(hi)); } catch (e) { /* ignore */ }
        }
        updateScoreUI();
        collisionFlash = 10;
        restartLock = 18;
        showOverlay('GAME OVER<br><span class="wip-overlay-sub">Press <kbd>SPACE</kbd> or click to restart</span>');
    }

    function handleAction() {
        if (state === STATE.IDLE) {
            start();
        } else if (state === STATE.RUNNING) {
            jump();
        } else if (state === STATE.GAMEOVER && restartLock <= 0) {
            reset();
            start();
        }
    }

    function spawnCactus() {
        const def = CACTI[(Math.random() * CACTI.length) | 0];
        cacti.push({ x: W + 10, w: def.w, h: def.h });
        const minGap = 360 / speed;
        const rand = 50 + Math.random() * 90;
        nextSpawn = Math.max(minGap, rand);
    }

    function tick() {
        frameCount++;
        speed = Math.min(MAX_SPEED, START_SPEED + frameCount * SPEED_INC);

        if (frameCount % 5 === 0) {
            score++;
            updateScoreUI();
        }

        // Dino physics
        dinoVy += GRAVITY;
        dinoY += dinoVy;
        if (dinoY > 0) { dinoY = 0; dinoVy = 0; }
        runFrame = (frameCount >> 2) % 2;

        // World scroll
        groundOff = (groundOff - speed) % 16;
        for (let i = 0; i < cacti.length; i++) cacti[i].x -= speed;
        cacti = cacti.filter(c => c.x + c.w > -10);

        nextSpawn -= 1;
        if (nextSpawn <= 0) spawnCactus();

        // Collision (slightly inset hitboxes for fairness)
        const dy = GROUND_Y - DINO_H + 1 + dinoY;
        const dx1 = DINO_X + 6, dy1 = dy + 4;
        const dx2 = dx1 + DINO_W - 14, dy2 = dy1 + DINO_H - 8;
        for (const c of cacti) {
            const cx1 = c.x + 2, cy1 = GROUND_Y - c.h;
            const cx2 = c.x + c.w - 2, cy2 = GROUND_Y;
            if (dx1 < cx2 && dx2 > cx1 && dy1 < cy2 && dy2 > cy1) {
                gameOver();
                return;
            }
        }
    }

    function drawGround(c) {
        ctx.fillStyle = c.ground;
        ctx.fillRect(0, GROUND_Y, W, 1);
        for (let x = groundOff; x < W; x += 16) ctx.fillRect(x, GROUND_Y + 4, 6, 1);
        for (let x = groundOff + 9; x < W; x += 24) ctx.fillRect(x, GROUND_Y + 7, 3, 1);
    }

    function drawCactus(c, x, w, h) {
        const baseY = GROUND_Y - h;
        ctx.fillStyle = c.cactus;
        // main trunk
        ctx.fillRect(x + 4, baseY, 6, h);
        // side arm
        ctx.fillRect(x + 0, baseY + Math.floor(h * 0.35), 4, Math.floor(h * 0.35));
        ctx.fillRect(x + 0, baseY + Math.floor(h * 0.32), 14, 4);
        if (w >= 24) {
            ctx.fillRect(x + 14, baseY + 6, 6, h - 6);
            ctx.fillRect(x + 18, baseY + Math.floor(h * 0.45), 4, Math.floor(h * 0.3));
            ctx.fillRect(x + 14, baseY + Math.floor(h * 0.42), 12, 4);
        }
        if (w >= 32) {
            ctx.fillRect(x + 24, baseY + 4, 6, h - 4);
        }
    }

    function drawDino(c, x, y, legFrame, dead) {
        ctx.fillStyle = c.dino;
        // snout
        ctx.fillRect(x + 22, y + 0, 22, 4);
        // head
        ctx.fillRect(x + 18, y + 4, 26, 14);
        // neck/body bridge
        ctx.fillRect(x + 16, y + 14, 18, 8);
        // body
        ctx.fillRect(x + 4, y + 18, 30, 16);
        // tail
        ctx.fillRect(x + 0, y + 18, 6, 6);
        // belly
        ctx.fillRect(x + 8, y + 32, 22, 6);
        // arm
        ctx.fillRect(x + 30, y + 24, 4, 4);

        // legs
        if (dead || legFrame === 0) {
            ctx.fillRect(x + 8, y + 38, 6, 9);
            ctx.fillRect(x + 22, y + 38, 6, 6);
        } else {
            ctx.fillRect(x + 8, y + 38, 6, 6);
            ctx.fillRect(x + 22, y + 38, 6, 9);
        }

        // eye whitespace
        ctx.fillStyle = c.eyeBg;
        ctx.fillRect(x + 36, y + 6, 4, 4);

        // pupil or X
        ctx.fillStyle = c.dino;
        if (!dead) {
            ctx.fillRect(x + 38, y + 7, 2, 2);
        } else {
            ctx.fillRect(x + 36, y + 6, 1, 1);
            ctx.fillRect(x + 39, y + 6, 1, 1);
            ctx.fillRect(x + 37, y + 7, 2, 2);
            ctx.fillRect(x + 36, y + 9, 1, 1);
            ctx.fillRect(x + 39, y + 9, 1, 1);
        }

        // small mouth
        ctx.fillRect(x + 32, y + 14, 8, 2);
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const c = colors();

        drawGround(c);
        for (const k of cacti) drawCactus(c, k.x, k.w, k.h);

        const dy = GROUND_Y - DINO_H + 1 + dinoY;
        drawDino(c, DINO_X, dy, runFrame, state === STATE.GAMEOVER);

        if (collisionFlash > 0) {
            ctx.fillStyle = `rgba(255, 90, 90, ${(collisionFlash / 10) * 0.25})`;
            ctx.fillRect(0, 0, W, H);
            collisionFlash--;
        }
        if (restartLock > 0) restartLock--;
    }

    function loop() {
        if (state === STATE.RUNNING) tick();
        draw();
        raf = requestAnimationFrame(loop);
    }

    function onKey(e) {
        const k = e.key;
        if (k === ' ' || k === 'Spacebar' || k === 'ArrowUp' || k === 'w' || k === 'W') {
            e.preventDefault();
            handleAction();
        }
    }

    function onPointer(e) {
        e.preventDefault();
        handleAction();
        if (canvas) canvas.focus({ preventScroll: true });
    }

    window.WipGame = {
        mount(c, sEl, hEl, oEl) {
            canvas = c;
            ctx = canvas.getContext('2d');
            scoreEl = sEl;
            hiEl = hEl;
            overlayEl = oEl;

            canvas.width = W;
            canvas.height = H;
            ctx.imageSmoothingEnabled = false;

            reset();

            this._onKey = onKey;
            this._onPointer = onPointer;
            window.addEventListener('keydown', this._onKey);
            canvas.addEventListener('pointerdown', this._onPointer);

            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(loop);

            try { canvas.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
        },
        unmount() {
            if (raf) cancelAnimationFrame(raf);
            raf = null;
            state = STATE.IDLE;
            if (this._onKey) window.removeEventListener('keydown', this._onKey);
            if (this._onPointer && canvas) canvas.removeEventListener('pointerdown', this._onPointer);
            this._onKey = null;
            this._onPointer = null;
        }
    };
})();
