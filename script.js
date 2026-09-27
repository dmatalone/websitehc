const SITE_BANNER = {
  enabled: true,
  message: "Doors Open @ 11:00 am for the Bengals at Steelers game today! 🏈",
  linkText: "",
  link: "#"
};

window.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner");

  if (banner) {
    if (!SITE_BANNER.enabled) {
      banner.remove();
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

  // Live NFL score strip. Refreshes automatically every 30 seconds.
  if (banner && SITE_BANNER.enabled) {
    let scoreStrip = document.querySelector("#nflLiveStrip");
    if (!scoreStrip) {
      scoreStrip = document.createElement("div");
      scoreStrip.className = "nfl-live-strip";
      scoreStrip.innerHTML = '<span class="nfl-live-dot"></span><span class="nfl-live-label">LIVE NFL</span><span class="nfl-live-score">Loading score...</span>';
      banner.insertAdjacentElement("afterend", scoreStrip);
    }

    const scoreText = scoreStrip.querySelector(".nfl-live-score");
    if (!scoreStrip.querySelector(".nfl-live-dot")) {
      scoreStrip.insertAdjacentHTML("afterbegin", '<span class="nfl-live-dot"></span>');
      scoreStrip.insertAdjacentHTML("beforeend", '');
    }

    async function updateNFLScore() {
      try {
        const response = await fetch(
          "https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=20260927",
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Score request failed");
        const data = await response.json();

        const event = (data.events || []).find((game) => {
          const competitors = game.competitions?.[0]?.competitors || [];
          const teams = competitors.map((x) => x.team?.abbreviation);
          return teams.includes("CIN") && teams.includes("PIT");
        });

        if (!event) {
          scoreText.textContent = "Bengals at Steelers · Score unavailable";
          return;
        }

        const competition = event.competitions[0];
        const competitors = competition.competitors || [];
        const cin = competitors.find((x) => x.team?.abbreviation === "CIN");
        const pit = competitors.find((x) => x.team?.abbreviation === "PIT");
        const status = event.status?.type?.shortDetail || event.status?.type?.detail || "";

        scoreText.textContent =
          "Bengals " + (cin?.score ?? "0") +
          "  —  Steelers " + (pit?.score ?? "0") +
          (status ? " · " + status : "");
      } catch (error) {
        scoreText.textContent = "Bengals at Steelers · Live score temporarily unavailable";
      }
    }

    updateNFLScore();
    setInterval(updateNFLScore, 30000);
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
      "Hollywood Cinema™ is a trademark of Hollywood Cinema LLC.";

    let updatedText = document.querySelector(".site-last-updated");

    if (!updatedText) {
      updatedText = document.createElement("p");
      updatedText.className = "site-last-updated";
      footerText.insertAdjacentElement("afterend", updatedText);
    }

    updatedText.textContent =
      "Site last updated: Sunday, September 27th at 9:15 AM CST.";
  }
});
