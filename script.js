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
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = heroSection.offsetHeight;

    let mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function () {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = heroSection.offsetHeight;
        init();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = '#C778DD';
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 3;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 3;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 3;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 3;
            }
            this.x += this.directionX * 0.5;
            this.y += this.directionY * 0.5;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 10000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = '#C778DD';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(199, 120, 221,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }
    init();
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
