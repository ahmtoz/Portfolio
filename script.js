const expLinks = document.querySelectorAll(".experience-list a");
const navLinks = document.querySelectorAll('nav ul li a');
const panels = document.querySelectorAll(".experience-panel");
const expWrapper = document.querySelector(".experience-content-wrapper");

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

expLinks.forEach(link => {
    const handleExp = (e) => {
        if (e.type === 'click') e.preventDefault();

        const targetId = link.dataset.target;
        const targetPanel = document.getElementById(targetId);

        panels.forEach(p => p.classList.remove("active"));
        expLinks.forEach(l => l.classList.remove("active-link"));

        link.classList.add("active-link");

        if (window.innerWidth <= 768) {
            link.closest('li').appendChild(targetPanel);
        } else {
            expWrapper.appendChild(targetPanel);
        }

        targetPanel.classList.add("active");
    };

    link.addEventListener("click", handleExp);
    link.addEventListener("mouseenter", handleExp);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const canvas = document.getElementById("hero-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    const heroSection = document.getElementById("hero-section");

    canvas.width = window.innerWidth;
    canvas.height = heroSection.offsetHeight;

    let mouse = {
        x: canvas.width / 2,
        y: canvas.height / 3,
        targetX: canvas.width / 2,
        targetY: canvas.height / 3
    };

    const glider = {
        x: -100,
        y: canvas.height / 3,
        vx: 0,
        vy: 0
    };

    const stars = [];

    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 0.8,
            size: Math.random() * 1.5,
            alpha: Math.random(),
            speed: (Math.random() * 0.05) + 0.01
        });
    }

    const setMouseTarget = (x, y) => {
        const marginX = 100;
        const marginY = 100;
        const maxGliderY = canvas.height - 150;

        mouse.targetX = Math.max(marginX, Math.min(x, canvas.width - marginX));
        mouse.targetY = Math.max(marginY, Math.min(y, maxGliderY));
    };

    window.addEventListener('mousemove', function (event) {
        setMouseTarget(event.x, event.y);
    });

    window.addEventListener('touchmove', function (event) {
        if (event.touches.length > 0) {
            setMouseTarget(event.touches[0].clientX, event.touches[0].clientY);
        }
    });

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = heroSection.offsetHeight;
        glider.y = Math.min(glider.y, canvas.height - 150);
    });

    function drawStars() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        stars.forEach(star => {
            star.alpha += (Math.random() - 0.5) * 0.1;
            if (star.alpha < 0.1) star.alpha = 0.1;
            if (star.alpha > 0.8) star.alpha = 0.8;

            star.x -= star.speed;
            if (star.x < 0) {
                star.x = canvas.width;
                star.y = Math.random() * canvas.height * 0.8;
            }

            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1.0;
    }

    function drawLandscape() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.beginPath();
        ctx.arc(canvas.width * 0.8, canvas.height * 0.25, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.arc(canvas.width * 0.8, canvas.height * 0.25, 70, 0, Math.PI * 2);
        ctx.fill();

        const towerX = canvas.width * 0.75;
        const towerY = canvas.height * 0.75;

        ctx.fillStyle = '#111115';
        ctx.fillRect(towerX - 12, towerY, 24, 200);

        ctx.beginPath();
        ctx.rect(towerX - 16, towerY - 10, 32, 10);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(towerX - 16, towerY - 10);
        ctx.lineTo(towerX, towerY - 50);
        ctx.lineTo(towerX + 16, towerY - 10);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(towerX, towerY - 50);
        ctx.lineTo(towerX, towerY - 65);
        ctx.strokeStyle = '#111115';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#15151a';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(0, canvas.height - 150);
        ctx.quadraticCurveTo(canvas.width * 0.4, canvas.height - 300, canvas.width, canvas.height - 100);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.fill();

        ctx.fillStyle = '#0e0e12';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.quadraticCurveTo(canvas.width * 0.3, canvas.height - 100, canvas.width * 0.6, canvas.height - 140);
        ctx.quadraticCurveTo(canvas.width * 0.8, canvas.height - 160, canvas.width, canvas.height - 60);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.fill();
    }

    function drawGlider() {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        const dx = mouse.x - glider.x;
        const dy = mouse.y - glider.y;

        glider.vx += dx * 0.001;
        glider.vy += dy * 0.001;

        glider.vx *= 0.94;
        glider.vy *= 0.94;

        if (Math.abs(glider.vx) < 0.05) glider.vx = 0;
        if (Math.abs(glider.vy) < 0.05) glider.vy = 0;

        glider.x += glider.vx;
        glider.y += glider.vy;

        const speed = Math.sqrt(glider.vx * glider.vx + glider.vy * glider.vy);
        const dragY = -glider.vy * 6;
        const dragX = -speed * 3;
        const windFlutter = speed > 0.2 ? Math.sin(Date.now() * 0.03) * (1 + speed * 0.5) : 0;

        ctx.strokeStyle = '#8c8cacff';
        ctx.lineWidth = 2.5;

        const targetAngle = Math.atan2(mouse.y - glider.y, mouse.x - glider.x);

        ctx.save();
        ctx.translate(glider.x, glider.y);
        ctx.rotate(targetAngle);

        // Primitive Hang-Glider (Hezarfen)
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = -5;
        ctx.shadowOffsetY = 15;

        // Lit Fabric (Wide Rectangular Eagle Wings)
        const wingGrad = ctx.createLinearGradient(12, 0, -12, 0);
        wingGrad.addColorStop(0, '#dfd1bb');
        wingGrad.addColorStop(1, '#a69076');
        ctx.fillStyle = wingGrad;

        ctx.beginPath();
        // Leading edge (slightly swept forward)
        ctx.moveTo(12, 0); // Center nose
        ctx.quadraticCurveTo(8, -25, 4, -45); // Out to wide left tip
        ctx.lineTo(-6, -45); // Flat wing tip edge
        // Trailing edge (scalloped and wide)
        ctx.quadraticCurveTo(-2, -25, -12, 0); // In to center back (no tail)
        ctx.quadraticCurveTo(-2, 25, -6, 45); // Out to wide right tip
        ctx.lineTo(4, 45); // Flat wing tip edge
        ctx.quadraticCurveTo(8, 25, 12, 0); // Back to nose
        ctx.closePath();
        ctx.fill();

        ctx.shadowColor = 'transparent';

        // Wooden Frame / Ribs (Lateral wide structure)
        ctx.strokeStyle = '#5c3a21'; // Dark Wood
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        // Central short spine
        ctx.moveTo(-15, 0); ctx.lineTo(15, 0);

        // Ribs radiating laterally outward
        ctx.moveTo(12, 2); ctx.lineTo(2, -45); // Outer front left
        ctx.moveTo(8, 2); ctx.lineTo(-2, -45); // Mid left
        ctx.moveTo(4, 2); ctx.lineTo(-4, -45); // Inner left

        ctx.moveTo(12, 2); ctx.lineTo(2, 45); // Outer front right
        ctx.moveTo(8, 2); ctx.lineTo(-2, 45); // Mid right
        ctx.moveTo(4, 2); ctx.lineTo(-4, 45); // Inner right
        ctx.stroke();

        // Leather bindings around intersection points
        ctx.fillStyle = '#3d2514';
        ctx.beginPath();
        ctx.arc(10, 0, 2, 0, Math.PI * 2);
        ctx.arc(6, 0, 2.5, 0, Math.PI * 2);
        ctx.arc(2, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Hezarfen (The Man suspended underneath)
        const dManX = -2;
        const dManY = 0; // Centered

        // Head / Cap 
        ctx.fillStyle = '#906b9aff';
        ctx.beginPath();
        ctx.arc(dManX + 4, dManY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Torso 
        ctx.fillStyle = '#0f0f13';
        ctx.beginPath();
        ctx.moveTo(dManX + 3, dManY - 4);
        ctx.lineTo(dManX + 3, dManY + 4);
        ctx.lineTo(dManX - 8, dManY + 3);
        ctx.lineTo(dManX - 8, dManY - 3);
        ctx.fill();

        // Arms holding the front struts
        ctx.strokeStyle = '#1e1e24';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(dManX + 1, dManY - 4); ctx.lineTo(dManX + 5, -10);
        ctx.moveTo(dManX + 1, dManY + 4); ctx.lineTo(dManX + 5, 10);
        ctx.stroke();

        ctx.strokeStyle = '#8c8cacff';
        ctx.lineWidth = 2.5;

        // Left Leg
        ctx.beginPath();
        ctx.moveTo(dManX - 8, dManY - 2); // Hip
        ctx.quadraticCurveTo(
            dManX - 14 + dragX * 0.7,    // Knee area drags less
            dManY - 4 + dragY * 0.8 + windFlutter * 0.5,
            dManX - 22 + dragX,           // Foot drags more
            dManY - 2 + dragY + windFlutter
        );
        ctx.stroke();

        // Right Leg
        ctx.beginPath();
        ctx.moveTo(dManX - 8, dManY + 2); // Hip
        ctx.quadraticCurveTo(
            dManX - 14 + dragX * 0.7,
            dManY + 4 + dragY * 0.8 + windFlutter * 0.5,
            dManX - 22 + dragX,
            dManY + 2 + dragY + windFlutter
        );
        ctx.stroke();

        ctx.restore();
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawStars();
        drawLandscape();
        drawGlider();
    }

    animate();
}

const revealElements = document.querySelectorAll('.skill-container, .project-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Check if form is already submitting
        if (submitBtn.disabled) return;

        // Visual feedback - loading state
        submitBtn.disabled = true;
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

        // Form status message
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Simulate API call (Wait for 1.5 seconds)
        setTimeout(() => {
            // Success state
            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check-circle"></i>';
            submitBtn.style.backgroundColor = '#43D9AD';
            submitBtn.style.borderColor = '#43D9AD';

            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.classList.add('success');

            // Log for verification (this answers "is it working")
            console.info("Form submission simulated successfully.", {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            });

            // Reset form
            contactForm.reset();

            // Re-enable and reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';

                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 1000);
            }, 3000);
        }, 1500);
    });
}
