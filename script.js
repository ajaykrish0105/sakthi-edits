const menu = document.querySelector(".mobile-menu");
document.querySelector(".menu-button")?.addEventListener("click",()=>menu.classList.add("open"));
document.querySelector(".menu-close")?.addEventListener("click",()=>menu.classList.remove("open"));

const header=document.querySelector(".site-header");
function headerState(){header?.classList.toggle("solid",scrollY>35)}
headerState();addEventListener("scroll",headerState);

document.querySelectorAll("a[data-transition]").forEach(link=>{
  link.addEventListener("click",e=>{
    const href=link.getAttribute("href");
    if(!href||href.startsWith("#"))return;
    e.preventDefault();document.querySelector(".curtain")?.classList.add("go");
    setTimeout(()=>location.href=href,430);
  });
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  button.classList.add("active");const filter=button.dataset.filter;
  document.querySelectorAll(".portfolio-card").forEach(card=>{
    const show=filter==="all"||card.dataset.category===filter;
    card.classList.toggle("hidden",!show);
    if(show){card.classList.remove("visible");requestAnimationFrame(()=>card.classList.add("visible"))}
  });
}));

const lightbox=document.querySelector(".lightbox");
const frame=document.querySelector(".lightbox iframe");
document.querySelectorAll(".work-card[data-video]").forEach(card=>card.addEventListener("click",()=>{
  if(frame)frame.src=card.dataset.video;lightbox?.classList.add("open");document.body.style.overflow="hidden";
}));
function closeLightbox(){lightbox?.classList.remove("open");if(frame)frame.src="";document.body.style.overflow=""}
document.querySelector(".lightbox-close")?.addEventListener("click",closeLightbox);
lightbox?.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox()});

document.querySelector(".form")?.addEventListener("submit",e=>{
  e.preventDefault();e.target.style.display="none";document.querySelector(".success")?.classList.add("show");
});

// Force reliable muted autoplay on Chrome, Edge, Safari and mobile browsers.
document.querySelectorAll("video[autoplay]").forEach(video=>{
  video.muted=true;
  video.defaultMuted=true;
  video.playsInline=true;
  const start=()=>video.play().catch(()=>{});
  start();
  video.addEventListener("loadedmetadata",start,{once:true});
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)start()});
});

document.querySelectorAll(".mobile-menu a").forEach(link=>{
  link.addEventListener("click",()=>menu.classList.remove("open"));
});
