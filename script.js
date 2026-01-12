const links = document.querySelectorAll(".experience-list a");
const panels = document.querySelectorAll(".experience-panel");
const expWrapper = document.querySelector(".experience-content-wrapper");

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

links.forEach(link => {
    const handleExp = (e) => {
        if (e.type === 'click') e.preventDefault();
        
        const targetId = link.dataset.target;
        const targetPanel = document.getElementById(targetId);

        // Reset
        panels.forEach(p => p.classList.remove("active"));
        links.forEach(l => l.classList.remove("active-link"));

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

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});