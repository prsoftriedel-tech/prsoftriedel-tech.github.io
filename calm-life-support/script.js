(()=>{'use strict';
const query=new URLSearchParams(location.search);
const current=(query.get('lang')==='en')?'en':'de';
const setLanguage=lang=>{
 document.documentElement.lang=lang;
 document.title=lang==='en'?'Calm Life · Support & Help':'Calm Life · Support & Hilfe';
 document.querySelectorAll('.lang').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.lang===lang)));
 const field=document.querySelector('#faq-search'); if(field)field.placeholder=lang==='en'?'Search guides and questions ...':'Anleitung und Fragen durchsuchen ...';
 const u=new URL(location.href); if(lang==='en')u.searchParams.set('lang','en');else u.searchParams.delete('lang');
 history.replaceState(null,'',u.pathname+u.search+u.hash);
};
setLanguage(current);
document.querySelectorAll('.lang').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
const search=document.querySelector('#faq-search'),clear=document.querySelector('#search-clear'),notFound=document.querySelector('#no-results');
const groups=[...document.querySelectorAll('.faq-group')];
const filter=()=>{
 const text=search.value.toLocaleLowerCase().trim();let hits=0;
 for(const group of groups){let count=0;for(const detail of group.querySelectorAll('.faq-item')){
  const match=!text||detail.dataset.search.includes(text);detail.hidden=!match;if(match){count++;hits++;}
  if(text&&match)detail.open=true; else if(!text)detail.open=false;
 }group.hidden=count===0;}
 notFound.hidden=hits!==0;clear.hidden=!text;
};
search.addEventListener('input',filter);clear.addEventListener('click',()=>{search.value='';filter();search.focus()});
const email=window.CALM_LIFE_SUPPORT?.supportEmail || '';
const isEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)&&!email.includes('EINTRAGEN');
if(isEmail){const link=document.querySelector('#email-link');link.href='mailto:'+email+'?subject='+encodeURIComponent('Calm Life Support');link.removeAttribute('aria-disabled');document.querySelector('#contact-email').textContent=email;}
})();
