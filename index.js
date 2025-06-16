import{a as m,S as h,i}from"./assets/vendor-BIn0hBn5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const g="23587423-82924c7bf0de5f5bd871046c4",y="https://pixabay.com/api/";async function b(s){const o=`${y}?key=${g}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`;try{return(await m.get(o)).data}catch(t){throw console.error("❌ Axios error:",t),t}}function L(s){s.innerHTML=""}function w(s,o){const t=s.map(({webformatURL:a,largeImageURL:e,tags:r,likes:n,views:d,comments:p,downloads:f})=>`
      <li class="photo-card">
        <a href="${e}">
          <img src="${a}" alt="${r}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${n}</p>
          <p><b>Views:</b> ${d}</p>
          <p><b>Comments:</b> ${p}</p>
          <p><b>Downloads:</b> ${f}</p>
        </div>
      </li>`).join("");o.insertAdjacentHTML("beforeend",t)}const u=document.querySelector(".loader-wrapper");function S(){u.classList.remove("hidden")}function c(){u.classList.add("hidden")}const $=document.querySelector("#search-form"),l=document.querySelector(".gallery"),P=new h(".gallery a",{captionsData:"alt",captionDelay:250});$.addEventListener("submit",async s=>{s.preventDefault();const o=s.currentTarget.elements.searchQuery.value.trim();if(!o){i.warning({message:"Please enter a search term",position:"topRight"});return}L(l),S();try{const t=await b(o);if(t.hits.length===0){i.info({message:"Sorry, there are no images matching your search request.",position:"topRight"}),c();return}w(t.hits,l);const a=l.querySelectorAll("img"),e=Array.from(a).map(r=>new Promise(n=>{r.complete?n():(r.onload=()=>n(),r.onerror=()=>n())}));await Promise.all(e),c(),P.refresh()}catch{i.error({message:"Something went wrong. Please try again later.",position:"topRight"}),c()}});
//# sourceMappingURL=index.js.map
