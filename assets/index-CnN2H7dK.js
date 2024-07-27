(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const h of t.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&p(h)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function p(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const L="AIzaSyDR1t04fRJmT5JhUMF5jDwIIJzFkWbJ-0w",x=document.getElementById("form__button"),v=document.querySelector(".container"),k=document.getElementById("multiple-book-container");let a=document.querySelector(".button-more"),d=document.querySelector(".button-less");const g=f=>f.volumeInfo.language==="en"&&f.volumeInfo.pageCount>0,n=(f,o,i,p)=>{const e=document.createElement(f);e.classList.add(o);for(let t in i)e[t]=i[t];p.appendChild(e)},_=()=>{a||(a=document.createElement("button"),a.classList.add("button-more"),a.innerText="Show more",v.appendChild(a))},T=()=>{d||(d=document.createElement("button"),d.classList.add("button-less"),d.innerText="Show less",v.appendChild(d))};x.addEventListener("click",f=>{f.preventDefault();const o=document.querySelector(".form__input"),i=o.value,p=`https://www.googleapis.com/books/v1/volumes?q=${i}&key=${L}`,e=document.querySelector(".form__input-error");if(e&&e.remove(),!(()=>{const c=/^[A-Za-z\s.,'!]+$/,u=document.createElement("p");return u.classList.add("form__input-error"),c.test(i)?i.charAt(0)!==i.charAt(0).toUpperCase()?(u.innerText="Use capital letter",o.insertAdjacentElement("afterend",u),o.value="",!1):(o.style.setProperty("border","none"),o.placeholder="Search for the book",!0):(u.innerText="Wrong book title",o.insertAdjacentElement("afterend",u),!1)})())return;(async()=>{await fetch(p).then(c=>{if(!c.ok)throw new Error("Network response was not ok");return c.json()}).then(c=>{console.log(c);const u=document.getElementById("book-container"),I=c.items;u.innerText="";const y=()=>{let r=I.find(g);if(r){const l=document.createElement("div");l.classList.add("bookInfo"),n("h1","bookInfo__title",{innerText:r.volumeInfo.title},l),n("h1","bookInfo__authors",{innerText:r.volumeInfo.authors},l),n("p","bookInfo__categories",{innerText:r.volumeInfo.categories},l),n("img","bookInfo__imageContainer--image",{src:r.volumeInfo.imageLinks.thumbnail,alt:r.volumeInfo.title},l),n("h2","bookInfo__snippet",{innerText:r.searchInfo.textSnippet},l),n("h3","bookInfo__pageCount",{innerText:`${r.volumeInfo.pageCount} pages`},l),u.appendChild(l),_(),a.addEventListener("click",b)}else alert("There are no English books")},b=()=>{const r=I.filter(g);console.log(r),(()=>{r.filter((m,s)=>s>0).map(m=>{const s=document.createElement("div");s.classList.add("bookInfo"),n("h1","bookInfo__title",{innerText:m.volumeInfo.title},s),n("h1","bookInfo__authors",{innerText:m.volumeInfo.authors},s),n("p","bookInfo__categories",{innerText:m.volumeInfo.categories},s),n("img","bookInfo__imageContainer--image",{src:m.volumeInfo.imageLinks.thumbnail,alt:m.volumeInfo.title},s),n("h2","bookInfo__snippet",{innerText:m.searchInfo.textSnippet},s),n("h3","bookInfo__pageCount",{innerText:` ${m.volumeInfo.pageCount} pages `},s),k.appendChild(s)})})(),a.remove(),a=null,T(),d.addEventListener("click",E)},E=()=>{k.innerText="",d.remove(),d=null,_(),a.addEventListener("click",b)};y()}).catch(c=>{console.error("Error:",c)})})(),C()});const C=()=>{document.querySelector(".form__input").value=""};
