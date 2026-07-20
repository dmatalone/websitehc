
const SITE_BANNER = {
  enabled: true,
  message: "Hollywood Cinema is temporarily closed July 21–24. We reopen July 25.",
  linkText: "View update →",
  link: "events.html"
};
const banner=document.querySelector(".banner");
if(banner){
 if(!SITE_BANNER.enabled) banner.style.display="none";
 else{
  banner.querySelector("[data-banner-text]").textContent=SITE_BANNER.message;
  banner.querySelector("[data-banner-link]").textContent=SITE_BANNER.linkText;
  banner.querySelector("[data-banner-link]").href=SITE_BANNER.link;
 }

}
const menuBtn=document.querySelector(".menu-btn"), mobile=document.querySelector(".mobile");
if(menuBtn&&mobile){
 menuBtn.onclick=()=>{
  const open=mobile.classList.toggle("open");
  document.body.classList.toggle("menu-open",open);
  menuBtn.textContent=open?"×":"☰";
  menuBtn.setAttribute("aria-expanded",String(open));
 };
 mobile.querySelectorAll("a").forEach(a=>a.onclick=()=>{
  mobile.classList.remove("open");document.body.classList.remove("menu-open");
  menuBtn.textContent="☰";menuBtn.setAttribute("aria-expanded","false");
 });
}
document.querySelectorAll("[data-year]").forEach(x=>x.textContent=new Date().getFullYear());
const io=new IntersectionObserver(es=>es.forEach(e=>{
 if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}
}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(x=>io.observe(x));

const chatForm=document.querySelector("#chatForm");
if(chatForm){
 chatForm.addEventListener("submit",e=>{
  e.preventDefault();
  const input=document.querySelector("#chatInput"),body=document.querySelector(".chat-body");
  const text=input.value.trim(); if(!text)return;
  const u=document.createElement("div");u.className="bubble user";u.textContent=text;body.appendChild(u);
  const b=document.createElement("div");b.className="bubble";
  b.textContent="Thanks! This demo can be connected to your real Hollywood Cinema support or AI system.";
  setTimeout(()=>{body.appendChild(b);body.scrollTop=body.scrollHeight},350);
  input.value="";body.scrollTop=body.scrollHeight;
 });
}


// Smooth page fade-in.
window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => document.body.classList.add("page-ready"));
});

// Smooth internal page transition.
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener("click", event => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || link.target === "_blank") return;
    event.preventDefault();
    document.body.classList.remove("page-ready");
    setTimeout(() => {
      window.location.href = href;
    }, 65);
  });
});
