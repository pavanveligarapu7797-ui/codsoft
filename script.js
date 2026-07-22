// DOM elements
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const scrollTopButton = document.getElementById("scroll-top");
const typingTarget = document.getElementById("typing");
const fadeElements = document.querySelectorAll(".fade-in");
const progressBars = document.querySelectorAll(".progress-fill");
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Dark mode toggle
function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("light");
}

themeToggle.addEventListener("click", () => {
  const isDark = body.classList.contains("dark");
  const nextTheme = isDark ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

// Mobile navigation toggle
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Typing animation
const roles = ["Electronics Engineer", "Web Developer", "IoT Enthusiast", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  typingTarget.textContent = currentRole.slice(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 70);
  } else {
    isDeleting = !isDeleting;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 900);
  }
}

typeEffect();

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

fadeElements.forEach((element) => observer.observe(element));

// Animate progress bars when visible
const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = `${fill.dataset.width}%`;
        progressObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.6 }
);

progressBars.forEach((bar) => progressObserver.observe(bar));

// Highlight active nav item on scroll
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => {
          item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Scroll to top button
window.addEventListener("scroll", () => {
  scrollTopButton.style.display = window.scrollY > 500 ? "block" : "none";
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form validation
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill out all fields before submitting.";
    formStatus.style.color = "#dc2626";
    return;
  }

  if (!emailPattern.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.style.color = "#dc2626";
    return;
  }

  formStatus.textContent = "Thank you! Your message has been sent successfully.";
  formStatus.style.color = "#2563eb";
  contactForm.reset();
});
