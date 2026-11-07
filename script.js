const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Toggle navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));

const cvDialog = document.querySelector("#cvRequestDialog");
const cvForm = document.querySelector("#cvRequestForm");
const cvTrigger = document.querySelector("#openCvRequest");

cvTrigger.addEventListener("click", () => cvDialog.showModal());
document.querySelector("#closeCvRequest").addEventListener("click", () => cvDialog.close());
document.querySelector("#cancelCvRequest").addEventListener("click", () => cvDialog.close());

cvDialog.addEventListener("click", (event) => {
  if (event.target === cvDialog) cvDialog.close();
});

cvForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cvForm.reportValidity()) return;

  const download = document.createElement("a");
  download.href = "files/Min_Kyaw.pdf";
  download.download = "Min_Kyaw.pdf";
  document.body.append(download);
  download.click();
  download.remove();
  cvForm.reset();
  cvDialog.close();
});
