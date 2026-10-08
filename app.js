const I18N = {
 ru:{home:"Главная",catalog:"Каталог",ongoing:"Онгоинги",favorites:"Избранное",popular:"Популярное",new:"Новинки",genres:"ЖАНРЫ",quote:"«Аниме — это не просто мультфильмы. Это целый мир эмоций...»",featured:"В центре внимания",watch:"Смотреть",all:"Смотреть все →",motto:"Смотри. Вдохновляйся. Живи.",login:"Вход",remember:"Запомнить меня",enter:"Войти",noaccount:"Нет аккаунта?",register:"Зарегистрироваться",theme:"Выбор темы",themeHint:"Выберите цвет оформления сайта",footer:"Сделано для любителей аниме"},
 en:{home:"Home",catalog:"Catalog",ongoing:"Ongoing",favorites:"Favorites",popular:"Popular",new:"New",genres:"GENRES",quote:"Anime is not just cartoons. It is a whole world of emotions...",featured:"Featured",watch:"Watch",all:"See all →",motto:"Watch. Be inspired. Live.",login:"Login",remember:"Remember me",enter:"Sign in",noaccount:"No account?",register:"Register",theme:"Theme",themeHint:"Choose the site's accent color",footer:"Made for anime fans"}
};
let lang = localStorage.getItem("animeLang") || "ru";

function setLanguage(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{if(I18N[lang][el.dataset.i18n])el.textContent=I18N[lang][el.dataset.i18n]});
 document.querySelectorAll("[data-ru][data-en]").forEach(el=>el.textContent=el.dataset[lang]);
 const b=document.getElementById("langBtn"); if(b)b.textContent=lang==="ru"?"EN":"RU";
 localStorage.setItem("animeLang",lang);
}
function toggleLang(){lang=lang==="ru"?"en":"ru";setLanguage();renderAll();}
document.getElementById("langBtn")?.addEventListener("click",toggleLang);

function getFavorites(){ return JSON.parse(localStorage.getItem("animeFavorites") || "[]"); }
function isFavorite(title){ return getFavorites().includes(title); }
function toggleFavorite(title, ev){
 ev?.stopPropagation();
 let fav=getFavorites();
 fav=fav.includes(title)?fav.filter(x=>x!==title):[...fav,title];
 localStorage.setItem("animeFavorites",JSON.stringify(fav));
 renderAll();
 renderFavorites();
}
function card(a){
 const fav=isFavorite(a.title);
 return `<article class="anime-card tilt scene-3d" data-title="${a.title.toLowerCase()}" data-ru="${a.ru.toLowerCase()}">
   <div class="poster-wrap depth-1"><img class="poster" src="${a.img}" alt="${a.ru}" loading="lazy" onerror="this.src='https://placehold.co/300x430/111/fff?text=ANIME'"><span class="badge">★ ${a.rating}</span><button class="fav-btn ${fav?'is-fav':''}" aria-label="favorite" onclick="toggleFavorite('${a.title.replace(/'/g,"\\'")}',event)">${fav?'♥':'♡'}</button></div>
   <div class="card-body depth-2"><h3>${lang==="ru"?a.ru:a.title}</h3><p>${a.year} · ${a.episodes}</p><div class="tags">${a.genres.map(x=>`<span>${x}</span>`).join("")}</div></div>
 </article>`;
}
function attachTilt(){
 document.querySelectorAll(".tilt").forEach(el=>{
  el.addEventListener("mousemove",e=>{
   const r=el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
   el.style.transform=`perspective(900px) rotateX(${y*-8}deg) rotateY(${x*10}deg) translateY(-5px)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="");
  el.addEventListener("click",()=>openAnime(el.dataset.title));
 });
}
function renderAll(){
 const popular=[ANIME[0],ANIME[1],ANIME[2],ANIME[3],ANIME[4],ANIME[5]];
 const fresh=[ANIME[6],ANIME[7],ANIME[8],ANIME[3],ANIME[4],ANIME[5]];
 const pg=document.getElementById("popularGrid"), ng=document.getElementById("newGrid"), cg=document.getElementById("catalogGrid");
 if(pg)pg.innerHTML=popular.map(card).join("");
 if(ng)ng.innerHTML=fresh.map(card).join("");
 if(cg)cg.innerHTML=ANIME.map(card).join("");
 attachTilt();
 const gf=document.getElementById("genreFilter");
 if(gf && gf.options.length===1){[...new Set(ANIME.flatMap(a=>a.genres))].forEach(g=>gf.insertAdjacentHTML("beforeend",`<option>${g}</option>`));}
 renderSpecials();
 renderFavorites();
}
function openAnime(key){
 const a=ANIME.find(x=>x.title.toLowerCase()===key.toLowerCase()) || ANIME.find(x=>x.ru.toLowerCase()===key.toLowerCase());
 if(!a)return;
 document.getElementById("modalBody").innerHTML=`<div class="modal-layout"><img src="${a.img}" alt="${a.ru}"><div><span class="pill">★ ${a.rating}</span><h2>${lang==="ru"?a.ru:a.title}</h2><p>${lang==="ru"?a.descRu:a.descEn}</p><div class="meta"><span>${a.year}</span><span>${a.episodes}</span><span>${a.genres.join(" · ")}</span></div><button class="primary">▶ ${I18N[lang].watch}</button></div></div>`;
 document.getElementById("modal").classList.remove("hidden");
}
function closeModal(){document.getElementById("modal")?.classList.add("hidden")}
document.getElementById("modal")?.addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});

function setupTheme(){
 const theme=localStorage.getItem("animeTheme")||"mono"; document.body.dataset.theme=theme;
 document.querySelectorAll("[data-theme]").forEach(b=>b.addEventListener("click",()=>{document.body.dataset.theme=b.dataset.theme;localStorage.setItem("animeTheme",b.dataset.theme)}));
}
document.getElementById("search")?.addEventListener("input",e=>{
 const q=e.target.value.toLowerCase();
 document.querySelectorAll("#catalogGrid .anime-card").forEach(c=>c.style.display=c.dataset.title.includes(q)?"":"none");
});
document.getElementById("genreFilter")?.addEventListener("change",e=>{
 const g=e.target.value;
 document.querySelectorAll("#catalogGrid .anime-card").forEach((c,i)=>c.style.display=g==="all"||ANIME[i].genres.includes(g)?"":"none");
});
document.getElementById("sort")?.addEventListener("change",e=>{
 const v=e.target.value;
 const grid=document.getElementById("catalogGrid");
 if(!grid)return;
 const arr=[...ANIME].sort((a,b)=>v==="rating"?b.rating-a.rating:v==="year"?b.year-a.year:a.title.localeCompare(b.title));
 grid.innerHTML=arr.map(card).join(""); attachTilt();
});

function renderFavorites(){
 const el=document.getElementById("favoritesGrid"); if(!el)return;
 const fav=getFavorites();
 const list=ANIME.filter(a=>fav.includes(a.title));
 el.innerHTML=list.length?list.map(card).join(""):`<div class="empty-favorites">♡ Пока ничего не добавлено. Нажми на сердечко на карточке аниме.</div>`;
 attachTilt();
}

function renderSpecials(){
 const bp=document.getElementById("bluePlayers");
 if(bp)bp.innerHTML=BLUE_PLAYERS.map(p=>`<article class="player-card tilt"><img src="${p[3]}" onerror="this.src='https://placehold.co/500x650/0a0f18/fff?text=BLUE+LOCK'"><div><h3>${p[lang==="ru"?1:0]}</h3><span>${p[2]}</span></div></article>`).join("");
 const jp=document.getElementById("jojoParts");
 if(jp)jp.innerHTML=JOJO_PARTS.map(p=>`<article class="jojo-card tilt"><div class="jojo-number">${p[1]}</div><h3>${p[0]}</h3><p>${p[2]}</p><button class="primary">Открыть</button></article>`).join("");
 attachTilt();
}
setupTheme();setLanguage();renderAll();