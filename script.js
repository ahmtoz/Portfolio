const links = document.querySelectorAll(".experience-list a");
const panels = document.querySelectorAll(".experience-panel");

links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    const targetId = link.dataset.target;

    panels.forEach(panel => panel.classList.remove("active"));

    document.getElementById(targetId).classList.add("active");
  });
});
