const SITE_BANNER = {
  enabled: false,
  message: "Hollywood Cinema will be closed Monday, August 3rd for our Annual Employee Development Day.",
  linkText: "View update →",
  link: "https://docs.google.com/document/d/1lRnKGhbc9yynUhZMOQQkTBgpzANN2BLW-p_N1Bx-qDY/edit?usp=sharing"
};

window.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner");

  if (banner) {
    if (!SITE_BANNER.enabled) {
      banner.style.display = "none";
    } else {
      const bannerText = banner.querySelector("[data-banner-text]");
      const bannerLink = banner.querySelector("[data-banner-link]");

      if (bannerText) {
        bannerText.textContent = SITE_BANNER.message;
      }

      if (bannerLink) {
        bannerLink.textContent = SITE_BANNER.linkText;
        bannerLink.href = SITE_BANNER.link;
        bannerLink.target = "_blank";
        bannerLink.rel = "noopener noreferrer";
      }
    }
  }

  const menuBtn = document.querySelector(".menu-btn");
  const mobile = document.querySelector(".mobile");

  if (menuBtn && mobile) {
    menuBtn.onclick = () => {
      const open = mobile.classList.toggle("open");

      document.body.classList.toggle("menu-open", open);
      menuBtn.textContent = open ? "×" : "☰";
      menuBtn.setAttribute("aria-expanded", String(open));
    };

    mobile.querySelectorAll("a").forEach((link) => {
      link.onclick = () => {
        mobile.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      };
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });

  const chatForm = document.querySelector("#chatForm");

  if (chatForm) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = document.querySelector("#chatInput");
      const body = document.querySelector(".chat-body");

      if (!input || !body) return;

      const text = input.value.trim();

      if (!text) return;

      const userBubble = document.createElement("div");
      userBubble.className = "bubble user";
      userBubble.textContent = text;
      body.appendChild(userBubble);

      const botBubble = document.createElement("div");
      botBubble.className = "bubble";
      botBubble.textContent =
        "Thanks! This demo can be connected to your real Hollywood Cinema support or AI system.";

      setTimeout(() => {
        body.appendChild(botBubble);
        body.scrollTop = body.scrollHeight;
      }, 350);

      input.value = "";
      body.scrollTop = body.scrollHeight;
    });
  }

  requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });

  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        link.target === "_blank"
      ) {
        return;
      }

      event.preventDefault();
      document.body.classList.remove("page-ready");

      setTimeout(() => {
        window.location.href = href;
      }, 65);
    });
  });

  const footerText =
    document.querySelector(".copyright") ||
    document.querySelector(".footer-bottom p") ||
    document.querySelector("footer p");

  if (footerText) {
    footerText.textContent =
      "Hollywood Cinema™ is a trademark of Hollywood Cinema LLC. Site last updated: Sunday, August 2nd around 9:15 AM CST.";
  }
});
