(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const T="AIzaSyDR1t04fRJmT5JhUMF5jDwIIJzFkWbJ-0w",w=document.getElementById("form__button"),S=document.querySelector(".container");document.querySelector(".book-container-multiple");w.addEventListener("click",v=>{v.preventDefault();const t=document.querySelector(".form__input"),c=t.value,d=`https://www.googleapis.com/books/v1/volumes?q=${c}&key=${T}`;if(!(/^[A-Za-z]+$/.test(c)?c.charAt(0)!==c.charAt(0).toUpperCase()?(t.style.setProperty("border","2px solid red","important"),t.value="",t.placeholder="Use capital letter",!1):(t.style.setProperty("border","none"),t.placeholder="Search for the book",!0):(t.style.setProperty("border","2px solid red","important"),t.value="",t.placeholder="Wrong title",!1)))return;(async()=>{await fetch(d).then(n=>{if(!n.ok)throw new Error("Network response was not ok");return n.json()}).then(n=>{console.log(n);const u=document.getElementById("book-container"),L=n.items;u.innerText="",(()=>{let i=L.find(r=>r.volumeInfo.language==="en");if(i){const r=document.createElement("div");r.classList.add("bookInfo");const m=document.createElement("h1");m.classList.add("bookInfo__title"),m.innerText=i.volumeInfo.title,r.appendChild(m);const p=document.createElement("h1");p.classList.add("bookInfo__author"),p.innerText=i.volumeInfo.authors,r.appendChild(p);const f=document.createElement("p");f.classList.add("bookInfo__categories"),f.innerText=i.volumeInfo.categories,r.appendChild(f);let h=document.createElement("img");h.classList.add("bookInfo__imageContainer--image"),h.src=i.volumeInfo.imageLinks.thumbnail,r.appendChild(h);const b=document.createElement("h2");b.innerText=i.searchInfo.textSnippet,b.classList.add("bookInfo__snippet"),r.appendChild(b);const I=document.createElement("h3");I.innerText=`${i.volumeInfo.pageCount} pages`,I.classList.add("bookInfo__pageCount"),r.appendChild(I),u.appendChild(r);let l=document.querySelector(".button-more");l||(l=document.createElement("button"),l.classList.add("button-more"),l.innerText="Show more",S.appendChild(l)),l.addEventListener("click",()=>{u.innerText="";const x=L.filter(s=>s.volumeInfo.language==="en"&&s.volumeInfo.pageCount>0);console.log(x),(()=>{x.map(s=>{const a=document.createElement("div");a.classList.add("bookInfo");const g=document.createElement("h1");g.classList.add("bookInfo__title"),g.innerText=s.volumeInfo.title,a.appendChild(g);const k=document.createElement("h1");k.classList.add("bookInfo__author"),k.innerText=s.volumeInfo.authors,a.appendChild(k);const C=document.createElement("p");C.classList.add("bookInfo__categories"),C.innerText=s.volumeInfo.categories,a.appendChild(C);let E=document.createElement("img");E.classList.add("bookInfo__imageContainer--image"),E.src=s.volumeInfo.imageLinks.thumbnail,a.appendChild(E);const _=document.createElement("h2");_.innerText=s.searchInfo.textSnippet,_.classList.add("bookInfo__snippet"),a.appendChild(_);const y=document.createElement("h3");y.innerText=`${s.volumeInfo.pageCount} pages`,y.classList.add("bookInfo__pageCount"),a.appendChild(y),u.appendChild(a)})})()})}else alert("There are no English books")})()}).catch(n=>{console.error("Error:",n)})})(),P()});const P=()=>{document.querySelector(".form__input").value=""};
