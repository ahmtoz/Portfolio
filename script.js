const links = document.querySelectorAll(".experience-list a");
const panels = document.querySelectorAll(".experience-panel");
const wrapper = document.querySelector(".experience-content-wrapper");

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