/* Uruguay Land Invest — shared behaviour: nav, reveal, counters, modals, forms, EN/ES */
(function(){
'use strict';
var D=document, W=window;
var ES=W.ULI_ES||{};
var LANG='en';
try{ LANG=localStorage.getItem('uli_lang')||(((navigator.language||'').toLowerCase().indexOf('pt')===0)?'pt':'en'); }catch(e){}
try{ var q=new URLSearchParams(location.search).get('lang'); if(q==='es'||q==='en'||q==='pt') LANG=q; }catch(e){}

/* ---------- content that lives in JS (modals) ---------- */
var UI={
  en:{ sending:'Sending…', sent:'Sent ✓', send:null, ok:'Thank you — we’ll be in touch within 24 hours.', err:'Something went wrong. Please email us directly.',
       tag_adv:'The Uruguay Advantage', hist:'Historical market data, not a forecast or an offer.',
       entry:'Entry price per hectare', lease:'Market lease rent', gy:'Gross lease yield', sector:'Sector' },
  es:{ sending:'Enviando…', sent:'Enviado ✓', ok:'Gracias — nos pondremos en contacto dentro de 24 horas.', err:'Algo salió mal. Por favor escríbanos directamente por correo.',
       tag_adv:'La ventaja de Uruguay', hist:'Datos históricos de mercado; no constituyen una proyección ni una oferta.',
       entry:'Precio de entrada por hectárea', lease:'Arrendamiento de mercado', gy:'Rendimiento bruto por arrendamiento', sector:'Sector' }
};
var ADV={
 '1':{ico:'<svg fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24"><path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" stroke-linejoin="round"/></svg>',
  en:['Rule of Law & Property Rights','Constitutional property protections apply equally to foreign investors. No restrictions on land ownership or capital repatriation. Full remote purchase via Uruguayan power of attorney. Title registered at the national Land Registry from day one.'],
  es:['Estado de derecho y derechos de propiedad','Las garantías constitucionales de propiedad se aplican por igual a los inversores extranjeros. No existen restricciones a la propiedad de la tierra ni a la repatriación de capital. Compra totalmente remota mediante poder notarial uruguayo. El título se inscribe en el Registro de la Propiedad nacional desde el primer día.']},
 '2':{ico:'<svg fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24"><path d="M4 19V9m6 10V5m6 14v-8m6 8V13M2 21h20" stroke-linecap="round"/></svg>',
  en:['Global Commodity Hub','Agriculture, livestock and forestry account for over 80% of total goods exports. Uruguay ranks among the world’s top exporters of soy, rice, dairy, beef and wheat. Direct trade flows to China, the EU and MERCOSUR via deep-water ports.'],
  es:['Polo global de commodities','La agricultura, la ganadería y la forestación representan más del 80% de las exportaciones de bienes. Uruguay se ubica entre los principales exportadores mundiales de soja, arroz, lácteos, carne vacuna y trigo, con flujos comerciales directos a China, la UE y el MERCOSUR a través de puertos de aguas profundas.']},
 '3':{ico:'<svg fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24"><path d="M7 7l10 10M9 9V7h2M15 17v-2h-2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" stroke-linejoin="round"/></svg>',
  en:['Tax Optimization Framework','Significant exemptions for forestry under Law 15.939. Predictable IRNR regime on rural rents. Free Trade Zone access. Foreign investors may benefit from exemptions on foreign-sourced income under specific residency structures.'],
  es:['Marco de optimización tributaria','Exoneraciones significativas para la forestación bajo la Ley 15.939. Régimen previsible del IRNR sobre rentas rurales. Acceso a zonas francas. Los inversores extranjeros pueden beneficiarse de exoneraciones sobre rentas de fuente extranjera bajo determinadas estructuras de residencia.']},
 '4':{ico:'<svg fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 0v20M3 7l9 5 9-5" stroke-linejoin="round" stroke-linecap="round"/></svg>',
  en:['Integrated Industrial Logistics','Renewed rail network, paved road grid and deep-water ports provide direct logistics access to global markets. UPM, Montes del Plata and Marfrig operate at industrial scale across the country.'],
  es:['Logística industrial integrada','Una red ferroviaria renovada, una malla vial pavimentada y puertos de aguas profundas ofrecen acceso logístico directo a los mercados globales. UPM, Montes del Plata y Marfrig operan a escala industrial en todo el país.']},
 '5':{ico:'<svg fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M14 7h7v7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  en:['Real Asset Diversification','Farmland is a tangible real asset with income from production or lease. The national average land price in Uruguay was US$4,178 per hectare in 2025 (MGAP-DIEA). Historical market data, not a forecast.'],
  es:['Diversificación en activos reales','La tierra agrícola es un activo real tangible, con ingresos por producción o arrendamiento. El precio promedio nacional de la tierra en Uruguay fue de US$4.178 por hectárea en 2025 (MGAP-DIEA). Datos históricos de mercado; no constituyen una proyección.']},
 '6':{ico:'<svg fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke-linejoin="round"/><circle cx="12" cy="12" r="4"/><path d="M12 8v8M8 12h8" stroke-linecap="round"/></svg>',
  en:['Biological Growth Efficiency','Temperate climate with ~1,200mm of annual rainfall. 90%+ of land suitable for productive agricultural or forestry use. Soils rated among the most productive in South America. Year-round biological productivity with minimal climate-event risk.'],
  es:['Eficiencia de crecimiento biológico','Clima templado con ~1.200 mm de lluvia anual. Más del 90% de la tierra apta para uso agrícola o forestal productivo. Suelos entre los más productivos de Sudamérica. Productividad biológica durante todo el año con un riesgo climático mínimo.']}
};
var MODELS=[
 {en:{t:'Forestry',tag:'Own production or lease',price:'US$2,800–3,500',rent:'~US$169 per hectare per year (2025)',y:'~4.8–6.0% (rent ÷ price, before costs and taxes)',
      src:'Sources: ULI market data (land prices); MGAP-DIEA (lease rents, 2025).',
      tr:['Timber sold under 12 or 24-year contracts with the pulp and sawmill industry','Income-tax exemption for 12 years on forestry-priority soils (Law 15,939)','Own production or fixed lease of the land']},
  es:{t:'Forestación',tag:'Producción propia o arrendamiento',price:'US$2.800–3.500',rent:'~US$169 por hectárea por año (2025)',y:'~4,8–6,0% (renta ÷ precio, antes de costos e impuestos)',
      src:'Fuentes: datos de mercado de ULI (precios de la tierra); MGAP-DIEA (arrendamientos, 2025).',
      tr:['Madera vendida mediante contratos de 12 o 24 años con la industria de celulosa y aserraderos','Exoneración del impuesto a la renta durante 12 años en suelos de prioridad forestal (Ley 15.939)','Producción propia o arrendamiento fijo de la tierra']}},
 {en:{t:'Livestock',tag:'Own production or lease',price:'US$1,900–3,700',rent:'~US$85 per hectare per year (2025)',y:'~2.3–4.5% (rent ÷ price, before costs and taxes)',
      src:'Sources: MGAP-DIEA (land prices 2024–1H 2025; lease rents 2025). Price ranges built by ULI by department, CONEAT index and transaction size.',
      tr:['Grass-fed cattle on natural pastures: breeding, backgrounding, finishing or full cycle','100% cattle traceability (Law 17,997, SNIG); beef is Uruguay’s #1 export (US$2.68B in 2025)','Own production or fixed annual lease in USD']},
  es:{t:'Ganadería',tag:'Producción propia o arrendamiento',price:'US$1.900–3.700',rent:'~US$85 por hectárea por año (2025)',y:'~2,3–4,5% (renta ÷ precio, antes de costos e impuestos)',
      src:'Fuentes: MGAP-DIEA (precios de la tierra 2024–1.er sem. 2025; arrendamientos 2025). Rangos de precio elaborados por ULI por departamento, índice CONEAT y tamaño de la operación.',
      tr:['Ganado a pasto sobre campo natural: cría, recría, invernada o ciclo completo','100% de trazabilidad del ganado (Ley 17.997, SNIG); la carne vacuna es la principal exportación de Uruguay (US$2.680 millones en 2025)','Producción propia o arrendamiento anual fijo en dólares']}},
 {en:{t:'Agriculture',tag:'Own production or lease',price:'US$5,700–10,300',rent:'~US$275 per hectare per year (2025)',y:'~2.7–4.8% (rent ÷ price, before costs and taxes)',
      src:'Sources: MGAP-DIEA (land prices 2024–1H 2025; lease rents 2025). Price ranges built by ULI by department, CONEAT index and transaction size. Rice belt: ULI estimate.',
      tr:['Main crops: soybean, corn, wheat, barley and canola','Summer + winter double-cropping on high-CONEAT soils','Rice belt: lease rent of about US$296 per hectare per year on land of US$3,000–5,000 per hectare (ULI estimate; gross lease yield ~6–10%)','Own production or fixed lease to a certified producer']},
  es:{t:'Agricultura',tag:'Producción propia o arrendamiento',price:'US$5.700–10.300',rent:'~US$275 por hectárea por año (2025)',y:'~2,7–4,8% (renta ÷ precio, antes de costos e impuestos)',
      src:'Fuentes: MGAP-DIEA (precios de la tierra 2024–1.er sem. 2025; arrendamientos 2025). Rangos de precio elaborados por ULI por departamento, índice CONEAT y tamaño de la operación. Zona arrocera: estimación de ULI.',
      tr:['Cultivos principales: soja, maíz, trigo, cebada y colza','Doble cultivo verano + invierno en suelos de alto índice CONEAT','Zona arrocera: arrendamiento de aproximadamente US$296 por hectárea por año sobre tierras de US$3.000–5.000 por hectárea (estimación de ULI; rendimiento bruto ~6–10%)','Producción propia o arrendamiento fijo a un productor certificado']}}
];

(function(){var X=W.ULI_PT_X; if(!X) return; UI.pt=X.ui; for(var k in X.adv){ if(ADV[k]) ADV[k].pt=X.adv[k]; } X.models.forEach(function(m,i){ if(MODELS[i]) MODELS[i].pt=m; }); })();

/* ---------- helpers ---------- */
function $(s,r){return (r||D).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}
function T(){return UI[LANG]||UI.es}

/* ---------- language ---------- */
function applyLang(l){
  LANG=l; try{localStorage.setItem('uli_lang',l)}catch(e){}
  D.documentElement.lang=l;
  $$('[data-i]').forEach(function(el){
    if(el._en===undefined) el._en=el.innerHTML;
    var key=el.getAttribute('data-i'), P=W.ULI_PT||{}, v=el._en;
    if(l==='pt') v=(P[key]!=null)?P[key]:((ES[key]!=null)?ES[key]:el._en);
    else if(l==='es'&&ES[key]!=null) v=ES[key];
    el.innerHTML=v;
  });
  $$('[data-ph-es]').forEach(function(el){
    if(el._ph===undefined) el._ph=el.getAttribute('placeholder')||'';
    var esv=el.getAttribute('data-ph-es'), phm=(W.ULI_PT_X&&W.ULI_PT_X.ph)||{};
    el.setAttribute('placeholder',l==='en'?el._ph:(l==='pt'&&phm[esv]?phm[esv]:esv));
  });
  $$('[data-alt-es]').forEach(function(el){
    if(el._alt===undefined) el._alt=el.getAttribute('alt')||'';
    var esa=el.getAttribute('data-alt-es'), alm=(W.ULI_PT_X&&W.ULI_PT_X.alt)||{};
    el.setAttribute('alt',l==='en'?el._alt:(l==='pt'&&alm[esa]?alm[esa]:esa));
  });
  $$('.hx').forEach(function(el){el.textContent=l==='en'?el.getAttribute('data-en'):el.getAttribute('data-es')});
  if(W.ULI_TITLE){ var pf=(location.pathname.split('/').pop()||'index.html'); if(pf.indexOf('.')<0) pf+='.html'; var ptt=(W.ULI_PT_TITLES||{})[pf]; D.title = (l==='pt'&&ptt)?ptt:(l==='en'?W.ULI_TITLE.en:W.ULI_TITLE.es); }
  $$('.lang button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-l')===l)});
  $$('.count').forEach(function(c){ if(c._done) c.textContent=fmtCount(c,+c.getAttribute('data-to')); });
  var btn=$('.fsend'); if(btn&&!btn.disabled&&btn._lbl){ /* label handled by data-i */ }
  /* refresh open modals */
  if($('#advOv.open')&&W._advId) openAdv(W._advId,true);
  if($('#modOv.open')&&W._modId!=null) openModel(W._modId,true);
}
W.ULI_setLang=applyLang;

/* ---------- nav ---------- */
var nav=$('.nav'), prog=$('#prog');
function onScroll(){
  var y=W.pageYOffset||D.documentElement.scrollTop;
  if(nav) nav.classList.toggle('scrolled',y>40);
  if(prog){ var h=D.documentElement.scrollHeight-W.innerHeight; prog.style.width=(h>0?Math.min(100,y/h*100):0)+'%'; }
}
W.addEventListener('scroll',onScroll,{passive:true}); onScroll();
var bg=$('.burger'), mm=$('.mmenu');
function toggleMenu(open){
  var o=(open===undefined)?!mm.classList.contains('open'):open;
  mm.classList.toggle('open',o); bg.classList.toggle('open',o);
  D.body.style.overflow=o?'hidden':'';
}
if(bg&&mm){ bg.addEventListener('click',function(){toggleMenu()}); $$('a',mm).forEach(function(a){a.addEventListener('click',function(){toggleMenu(false)})}); }
$$('.lang button').forEach(function(b){b.addEventListener('click',function(){applyLang(b.getAttribute('data-l'))})});

/* ---------- reveal + counters ---------- */
function fmtCount(el,n){
  var s=Math.round(n).toString();
  if(el.getAttribute('data-fmt')==='1') s=Math.round(n).toLocaleString(LANG==='en'?'en-US':'de-DE');
  return s+(el.getAttribute('data-suf')||'');
}
function runCount(el){
  var to=+el.getAttribute('data-to'), t0=null, dur=1600;
  function f(ts){ if(!t0) t0=ts; var p=Math.min(1,(ts-t0)/dur), e=1-Math.pow(1-p,3); el.textContent=fmtCount(el,to*e); if(p<1) requestAnimationFrame(f); else el._done=true; }
  requestAnimationFrame(f);
}
if('IntersectionObserver' in W){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); $$('.count',e.target).forEach(runCount); if(e.target.classList.contains('count')) runCount(e.target); io.unobserve(e.target);} })},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  $$('.rv').forEach(function(el){io.observe(el)});
}else{ $$('.rv').forEach(function(el){el.classList.add('in')}); $$('.count').forEach(function(c){c.textContent=fmtCount(c,+c.getAttribute('data-to'));c._done=true}); }

/* ---------- modals ---------- */
function lock(on){D.body.style.overflow=on?'hidden':''}
function openAdv(id,keep){
  var d=ADV[id]; if(!d) return; W._advId=id;
  var c=d[LANG]||d.es;
  $('#advIco').innerHTML=d.ico; $('#advTag').textContent=T().tag_adv; $('#advTitle').textContent=c[0]; $('#advBody').textContent=c[1];
  $('#advOv').classList.add('open'); if(!keep) lock(true);
}
function closeAdv(){ var o=$('#advOv'); if(o){o.classList.remove('open'); lock(false);} W._advId=null; }
function openModel(i,keep){
  var m=MODELS[i]; if(!m) return; W._modId=i; var c=m[LANG]||m.es, u=T();
  var h='<div class="mtag">'+c.tag+'</div><h3>'+c.t+'</h3><div class="mrule"></div>'+
   '<div class="mdata"><div><span class="k">'+u.entry+'</span><span class="v">'+c.price+'</span></div>'+
   '<div><span class="k">'+u.lease+'</span><span class="v sm">'+c.rent+'</span></div>'+
   '<div><span class="k">'+u.gy+'</span><span class="v sm">'+c.y+'</span></div></div>'+
   '<ul class="mtraits">'+c.tr.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'+
   '<p class="msrc">'+c.src+'</p><p class="mfoot">'+u.hist+'</p>';
  $('#modBody').innerHTML=h; $('#modOv').classList.add('open'); if(!keep) lock(true);
}
function closeModel(){ var o=$('#modOv'); if(o){o.classList.remove('open'); lock(false);} W._modId=null; }
W.openAdv=openAdv; W.openModel=openModel;
$$('[data-adv]').forEach(function(b){b.addEventListener('click',function(){openAdv(b.getAttribute('data-adv'))})});
$$('[data-model]').forEach(function(b){b.addEventListener('click',function(){openModel(+b.getAttribute('data-model'))})});
$$('.ov').forEach(function(o){o.addEventListener('click',function(e){ if(e.target===o){closeAdv();closeModel();} })});
$$('.mclose').forEach(function(b){b.addEventListener('click',function(){closeAdv();closeModel()})});
D.addEventListener('keydown',function(e){ if(e.key==='Escape'){closeAdv();closeModel();toggleMenu(false);} });

/* ---------- forms (Web3Forms) ---------- */
$$('form.uli-form').forEach(function(f){
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=$('.fsend',f), ok=$('.fmsg.ok',f), er=$('.fmsg.err',f), lbl=btn.innerHTML;
    ok.style.display='none'; er.style.display='none';
    btn.disabled=true; btn.textContent=T().sending;
    var data=Object.fromEntries(new FormData(f)); data.language=LANG;
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
    .then(function(r){return r.json()}).then(function(j){
      if(j.success){ try{gtag('event','generate_lead',{form_id:f.id||'form',investor_type:data.investor_type||'',investment_range:data.interest||'',language:LANG})}catch(_){} ok.style.display='block'; btn.textContent=T().sent; f.reset(); setTimeout(function(){btn.innerHTML=lbl;btn.disabled=false},4000); }
      else { console.error('Web3Forms:',j); throw new Error((j&&j.message)||'x'); }
    }).catch(function(err){ console.error('Form error:',err); var d=$('.fdbg',er); if(!d){d=D.createElement('div');d.className='fdbg';d.style.cssText='font-size:11px;opacity:.7;margin-top:6px';er.appendChild(d);} d.textContent=(err&&err.message&&err.message!=='x')?('['+err.message+']'):''; er.style.display='block'; btn.innerHTML=lbl; btn.disabled=false; });
  });
});

/* ---------- analytics: consent banner + click events ---------- */
(function(){
function gt(){try{gtag.apply(null,arguments)}catch(e){}}
function grant(v){var s=v?'granted':'denied';gt('consent','update',{analytics_storage:s,ad_storage:s,ad_user_data:s,ad_personalization:s});}
var st=null;try{st=localStorage.getItem('uli_consent')}catch(e){}
if(!st){
  var es=(LANG==='es'), pt=(LANG==='pt'), b=D.createElement('div'); b.id='cookieBar'; b.setAttribute('role','dialog'); b.setAttribute('aria-label','Cookies');
  b.innerHTML='<p>'+(pt?'Usamos o Google Analytics para entender como o site é usado. Só é ativado se você aceitar. ':es?'Usamos Google Analytics para entender cómo se usa el sitio. Solo se activa si lo acepta. ':'We use Google Analytics to understand how the site is used. It only runs if you accept. ')+'<a href="privacy-policy.html">'+(pt?'Saiba mais':es?'Más información':'Learn more')+'</a></p><div><button type="button" data-c="no">'+(pt?'Recusar':es?'Rechazar':'Decline')+'</button><button type="button" data-c="yes" class="y">'+(pt?'Aceitar':es?'Aceptar':'Accept')+'</button></div>';
  D.body.appendChild(b);
  b.addEventListener('click',function(e){var c=e.target.getAttribute&&e.target.getAttribute('data-c');if(!c)return;var v=c==='yes';try{localStorage.setItem('uli_consent',v?'granted':'denied')}catch(_){}grant(v);b.remove();});
}
D.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';
  if(h.indexOf('wa.link')>-1||h.indexOf('wa.me')>-1)gt('event','click_whatsapp',{link_url:h});
  else if(h.indexOf('linkedin.com')>-1)gt('event','click_linkedin',{link_url:h});
  else if(h.indexOf('mailto:')===0)gt('event','click_email');
  else if(a.classList.contains('btn')&&h.indexOf('#contact')>-1)gt('event','click_request_meeting');
});
})();

/* ---------- init ---------- */
if(LANG!=='en') applyLang(LANG); else { $$('.lang button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-l')==='en')}); }
})();
