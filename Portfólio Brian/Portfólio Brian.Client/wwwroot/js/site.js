(() => {
    let started = false;

    const boot = () => {
        if (started) return;
        const canvas = document.getElementById("bg-particles");
        const roleEl = document.querySelector("[data-role-rotator]");
        const header = document.querySelector(".topnav");
        if (!canvas || !roleEl || !header) return;

        started = true;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (canvas.getContext && !reduceMotion) {
            const ctx = canvas.getContext("2d");
            const dots = [];
            const count = window.innerWidth < 768 ? 36 : 72;
            let width = 0;
            let height = 0;
            let raf = 0;

            const resize = () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            };

            const spawn = () => {
                dots.length = 0;
                for (let i = 0; i < count; i += 1) {
                    dots.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx: (Math.random() - 0.5) * 0.35,
                        vy: (Math.random() - 0.5) * 0.35,
                        r: Math.random() * 1.4 + 0.4
                    });
                }
            };

            const draw = () => {
                ctx.clearRect(0, 0, width, height);
                for (let i = 0; i < dots.length; i += 1) {
                    const a = dots[i];
                    a.x += a.vx;
                    a.y += a.vy;
                    if (a.x < 0 || a.x > width) a.vx *= -1;
                    if (a.y < 0 || a.y > height) a.vy *= -1;

                    ctx.beginPath();
                    ctx.fillStyle = "rgba(62, 207, 255, 0.55)";
                    ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
                    ctx.fill();

                    for (let j = i + 1; j < dots.length; j += 1) {
                        const b = dots[j];
                        const dx = a.x - b.x;
                        const dy = a.y - b.y;
                        const dist = Math.hypot(dx, dy);
                        if (dist < 130) {
                            ctx.strokeStyle = `rgba(62, 207, 255, ${0.16 * (1 - dist / 130)})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.stroke();
                        }
                    }
                }
                raf = requestAnimationFrame(draw);
            };

            resize();
            spawn();
            draw();
            window.addEventListener("resize", () => {
                resize();
                spawn();
            });
            document.addEventListener("visibilitychange", () => {
                if (document.hidden) {
                    cancelAnimationFrame(raf);
                } else {
                    raf = requestAnimationFrame(draw);
                }
            });
        }

        const roles = [
            "Full Stack Developer",
            "Industrial Data Analyst",
            "Web · Android · iOS",
            "Especialista PIMS & MES",
            "C# · .NET · JavaScript"
        ];
        let index = 0;
        const cycle = () => {
            roleEl.classList.add("is-out");
            window.setTimeout(() => {
                index = (index + 1) % roles.length;
                roleEl.textContent = roles[index];
                roleEl.classList.remove("is-out");
            }, 280);
        };
        if (!reduceMotion) {
            window.setInterval(cycle, 2600);
        }

        const onScroll = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        const toggle = document.getElementById("nav-toggle");
        document.querySelectorAll("[data-nav-link]").forEach((link) => {
            link.addEventListener("click", () => {
                if (toggle) toggle.checked = false;
            });
        });
    };

    const watch = () => {
        boot();
        if (!started) requestAnimationFrame(watch);
    };

    watch();
})();
