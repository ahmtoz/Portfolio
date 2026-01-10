const links = document.querySelectorAll(".experience-list a");
const panels = document.querySelectorAll(".experience-panel");
const wrapper = document.querySelector(".experience-content-wrapper");


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');


links.forEach(link => {
    const showExperience = (e) => {
        if (e.type === 'click') e.preventDefault();
        
        const targetId = link.dataset.target;
        const targetPanel = document.getElementById(targetId);

        panels.forEach(panel => panel.classList.remove("active"));

        if (window.innerWidth <= 768) {
            // MOBİL: Paneli linkin bulunduğu li içine taşı
            const parentLi = link.closest('li');
            parentLi.appendChild(targetPanel);
        } else {
            // DESKTOP: Paneli tekrar ana wrapper içine taşı (eski düzen)
            wrapper.appendChild(targetPanel);
        }

        targetPanel.classList.add("active");
    };

    link.addEventListener("mouseenter", showExperience);
    link.addEventListener("click", showExperience);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Linklerden birine tıklandığında menünün kapanması için
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});