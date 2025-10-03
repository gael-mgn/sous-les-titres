
(function () {
  var s = document.currentScript || (function(){var a=document.getElementsByTagName('script'); return a[a.length-1];})();
  var rawLabels = (s && s.getAttribute('data-labels')) || 'Français|English|Ελληνικά';
  var rawCodes  = (s && s.getAttribute('data-codes'))  || 'fr|en|gr';
  var labels = rawLabels.split('|').map(function(l){ return l.trim(); }).slice(0,3);
  var codes  = rawCodes.split('|').map(function(c){ return c.trim().toLowerCase(); }).slice(0,3);
  while (labels.length < 3) labels.push('Lang');
  while (codes.length  < 3) codes.push('xx');
  var containerId = 'tr-lang-flag-' + Math.random().toString(36).slice(2,9);

  // styles (desktop horizontal + mobile compact/expand)
  var css = '\
  #'+containerId+'{position:fixed;top:1rem;right:1rem;z-index:2147483647;display:flex;flex-direction:row;gap:0.5rem;align-items:center;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;}\n\
  #'+containerId+' .tr-btn{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:6px;border-radius:10px;background:rgba(11,18,32,0.9);border:0;cursor:pointer;box-shadow:0 6px 18px rgba(15,15,15,0.22);transition:transform .12s ease, box-shadow .12s ease, opacity .12s ease;}\n\
  #'+containerId+' .tr-btn:focus{outline:3px solid rgba(100,150,255,0.22);outline-offset:3px;transform:translateY(-2px);}\n\
  #'+containerId+' .tr-btn:hover{transform:translateY(-3px);}\n\
  #'+containerId+' svg{width:28px;height:20px;display:block;border-radius:3px;box-shadow:0 1px 2px rgba(0,0,0,0.15);}\n\
  /* toggle (mobile) - hidden on desktop */\n\
  #'+containerId+' .tr-toggle{display:none;align-items:center;justify-content:center;min-width:44px;min-height:44px;padding:6px;border-radius:10px;background:rgba(11,18,32,0.95);border:0;cursor:pointer;box-shadow:0 6px 18px rgba(15,15,15,0.28);}\n\
  /* petit affichage : compact, afficher qu\'un bouton (globe) ; possibilité d\'ouvrir pour voir les autres */\n\
  @media (max-width:420px){\n\
    #'+containerId+'{gap:0.35rem;right:0.6rem;bottom:0.6rem;top:auto;flex-direction:column;align-items:flex-end;}\n\
    /* masquer tous sauf index 0 par défaut */\n\
    #'+containerId+' .tr-btn[data-index]:not([data-index=\"0\"]) { display:none; opacity:0; transform:translateY(6px); }\n\
    /* montrer toggle */\n\
    #'+containerId+' .tr-toggle{display:inline-flex}\n\
    /* quand expanded : afficher les autres boutons verticalement avec animation */\n\
    #'+containerId+'.expanded { align-items:flex-end; }\n\
    #'+containerId+'.expanded .tr-btn[data-index]:not([data-index=\"0\"]) { display:inline-flex; opacity:1; transform:translateY(0); }\n\
    /* petite touche esthétique: élever le premier bouton quand expanded */\n\
    #'+containerId+'.expanded .tr-toggle { transform:translateY(-6px); }\n\
  }\n\
  ';

  var styleEl = document.createElement('style');
  styleEl.setAttribute('data-for','topright-lang-flag');
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  var SVG_NS = 'http://www.w3.org/2000/svg';

  // Generator functions pour drapeaux simples
  function flagFR() {
    var svg = document.createElementNS(SVG_NS,'svg');
    svg.setAttribute('viewBox','0 0 3 2');
    var r1 = document.createElementNS(SVG_NS,'rect'); r1.setAttribute('x','0'); r1.setAttribute('y','0'); r1.setAttribute('width','1'); r1.setAttribute('height','2'); r1.setAttribute('fill','#0055A4');
    var r2 = document.createElementNS(SVG_NS,'rect'); r2.setAttribute('x','1'); r2.setAttribute('y','0'); r2.setAttribute('width','1'); r2.setAttribute('height','2'); r2.setAttribute('fill','#FFFFFF');
    var r3 = document.createElementNS(SVG_NS,'rect'); r3.setAttribute('x','2'); r3.setAttribute('y','0'); r3.setAttribute('width','1'); r3.setAttribute('height','2'); r3.setAttribute('fill','#EF4135');
    svg.appendChild(r1); svg.appendChild(r2); svg.appendChild(r3);
    return svg;
  }

  function flagGR() {
    var svg = document.createElementNS(SVG_NS,'svg');
    svg.setAttribute('viewBox','0 0 15 10');
    for (var i=0;i<9;i++){
      var r = document.createElementNS(SVG_NS,'rect');
      r.setAttribute('x','0'); r.setAttribute('y', (i*(10/9)).toString());
      r.setAttribute('width','15'); r.setAttribute('height',(10/9).toString());
      r.setAttribute('fill', (i%2===0) ? '#0D5EAF' : '#FFFFFF');
      svg.appendChild(r);
    }
    var canton = document.createElementNS(SVG_NS,'rect');
    canton.setAttribute('x','0'); canton.setAttribute('y','0'); canton.setAttribute('width','6'); canton.setAttribute('height','5'); canton.setAttribute('fill','#0D5EAF');
    svg.appendChild(canton);
    var v = document.createElementNS(SVG_NS,'rect'); v.setAttribute('x','2.6'); v.setAttribute('y','0'); v.setAttribute('width','0.8'); v.setAttribute('height','5'); v.setAttribute('fill','#FFFFFF');
    var h = document.createElementNS(SVG_NS,'rect'); h.setAttribute('x','0'); h.setAttribute('y','2.1'); h.setAttribute('width','6'); h.setAttribute('height','0.8'); h.setAttribute('fill','#FFFFFF');
    svg.appendChild(v); svg.appendChild(h);
    return svg;
  }

  function flagUK() {
    var svg = document.createElementNS(SVG_NS,'svg');
    svg.setAttribute('viewBox','0 0 60 30');
    var bg = document.createElementNS(SVG_NS,'rect'); bg.setAttribute('x','0'); bg.setAttribute('y','0'); bg.setAttribute('width','60'); bg.setAttribute('height','30'); bg.setAttribute('fill','#012169');
    svg.appendChild(bg);
    var d1 = document.createElementNS(SVG_NS,'polygon'); d1.setAttribute('points','0,0 6,0 60,24 60,30 54,30 0,6'); d1.setAttribute('fill','#FFFFFF');
    var d2 = document.createElementNS(SVG_NS,'polygon'); d2.setAttribute('points','60,0 60,6 6,30 0,30 0,24 54,0'); d2.setAttribute('fill','#FFFFFF');
    svg.appendChild(d1); svg.appendChild(d2);
    var r1 = document.createElementNS(SVG_NS,'polygon'); r1.setAttribute('points','0,0 2.8,0 60,22.8 60,30 57.2,30 0,7.2'); r1.setAttribute('fill','#C8102E');
    var r2 = document.createElementNS(SVG_NS,'polygon'); r2.setAttribute('points','60,0 60,2.8 2.8,30 0,30 0,27.2 57.2,0'); r2.setAttribute('fill','#C8102E');
    svg.appendChild(r1); svg.appendChild(r2);
    var hc = document.createElementNS(SVG_NS,'rect'); hc.setAttribute('x','24'); hc.setAttribute('y','0'); hc.setAttribute('width','12'); hc.setAttribute('height','30'); hc.setAttribute('fill','#FFFFFF');
    var vc = document.createElementNS(SVG_NS,'rect'); vc.setAttribute('x','0'); vc.setAttribute('y','9'); vc.setAttribute('width','60'); vc.setAttribute('height','12'); vc.setAttribute('fill','#FFFFFF');
    svg.appendChild(hc); svg.appendChild(vc);
    var hr = document.createElementNS(SVG_NS,'rect'); hr.setAttribute('x','26.5'); hr.setAttribute('y','0'); hr.setAttribute('width','7'); hr.setAttribute('height','30'); hr.setAttribute('fill','#C8102E');
    var vr = document.createElementNS(SVG_NS,'rect'); vr.setAttribute('x','0'); vr.setAttribute('y','11.5'); vr.setAttribute('width','60'); vr.setAttribute('height','7'); vr.setAttribute('fill','#C8102E');
    svg.appendChild(hr); svg.appendChild(vr);
    return svg;
  }

  function globeIcon() {
    var svg = document.createElementNS(SVG_NS,'svg');
    svg.setAttribute('viewBox','0 0 24 24');
    var c = document.createElementNS(SVG_NS,'circle'); c.setAttribute('cx','12'); c.setAttribute('cy','12'); c.setAttribute('r','10'); c.setAttribute('fill','#FFFFFF'); c.setAttribute('opacity','0.08');
    var g = document.createElementNS(SVG_NS,'path'); g.setAttribute('d','M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0zm4 0h12M12 4v16'); g.setAttribute('fill','none'); g.setAttribute('stroke','#FFFFFF'); g.setAttribute('stroke-width','1.5'); g.setAttribute('stroke-linecap','round'); g.setAttribute('stroke-linejoin','round');
    svg.appendChild(c); svg.appendChild(g);
    return svg;
  }

  function getFlagSVG(code, label) {
    code = (code||'').toLowerCase();
    if (code === 'fr' || code === 'français' || code === 'fra') {
      return flagFR();
    } else if (code === 'gr' || code === 'el' || code === 'greek' || code === 'grc') {
      return flagGR();
    } else if (code === 'en' || code === 'gb' || code === 'uk' || code === 'eng') {
      return flagUK();
    } else {
      return globeIcon();
    }
  }

  function build() {
    if (document.getElementById(containerId)) return;
    var container = document.createElement('div');
    container.id = containerId;
    container.setAttribute('role','toolbar');
    container.setAttribute('aria-label','Choix de langue');

    // toggle button (globe) - visible on mobile via CSS
    var toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'tr-toggle';
    toggleBtn.setAttribute('aria-expanded','false');
    toggleBtn.setAttribute('aria-controls', containerId + '-list');
    toggleBtn.setAttribute('aria-label','Ouvrir le sélecteur de langue');
    var tSvg = globeIcon();
    try { var tt = document.createElementNS(SVG_NS,'title'); tt.textContent = 'Langues'; tSvg.insertBefore(tt, tSvg.firstChild); } catch(e){}
    toggleBtn.appendChild(tSvg);

    // list container for accessibility (but we will keep individual buttons as before)
    var listWrapper = document.createElement('div');
    listWrapper.id = containerId + '-list';
    listWrapper.setAttribute('role','group');
    listWrapper.setAttribute('aria-hidden','true');
    listWrapper.style.display = 'contents'; // keep visual layout flexible

    // create language buttons
    labels.forEach(function(label, idx){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tr-btn';
      btn.setAttribute('data-index', String(idx));
      btn.setAttribute('aria-label', 'Passer en ' + label);

      var svg = getFlagSVG(codes[idx], label);
      try {
        var t = document.createElementNS(SVG_NS,'title'); t.textContent = label; svg.insertBefore(t, svg.firstChild);
      } catch(e){}
      btn.appendChild(svg);

      btn.addEventListener('click', function (ev) {
  // when clicked on mobile, collapse
  container.classList.remove('expanded');
  toggleBtn.setAttribute('aria-expanded','false');
  listWrapper.setAttribute('aria-hidden','true');

  var lang = codes[idx] || codes[0];
  // navigation relative simple : ../<lang>/index.html
  var targetPath = '../' + encodeURIComponent(lang) + '/index.html';

  var u = new URL(window.location.href);
  var detail = { from: u.pathname, to: targetPath, lang: lang, index: idx, label: label, originalEvent: ev };
  var ce = new CustomEvent('topright:langchange', { detail: detail, cancelable: true });
  window.dispatchEvent(ce);
  if (ce.defaultPrevented) return;

  // utilisation de la navigation relative (le navigateur résout ../ par rapport à la page courante)
  window.location.href = targetPath;
}, { passive: true });


      listWrapper.appendChild(btn);
    });

    // assemble: toggle first (so tab order is natural on mobile), then list
    container.appendChild(toggleBtn);
    container.appendChild(listWrapper);
    document.body.appendChild(container);

    // click handlers for toggle + outside click + Esc
    function closeMenu() {
      container.classList.remove('expanded');
      toggleBtn.setAttribute('aria-expanded','false');
      listWrapper.setAttribute('aria-hidden','true');
    }
    function openMenu() {
      container.classList.add('expanded');
      toggleBtn.setAttribute('aria-expanded','true');
      listWrapper.setAttribute('aria-hidden','false');
      // give focus to the first language button (index 1 if exists, else 0)
      var firstHidden = container.querySelector('.tr-btn[data-index="1"]') || container.querySelector('.tr-btn[data-index="0"]');
      if (firstHidden) firstHidden.focus();
    }

    toggleBtn.addEventListener('click', function (ev) {
      if (container.classList.contains('expanded')) {
        closeMenu();
      } else {
        openMenu();
      }
    }, { passive: true });

    // close when clicking outside (only when expanded)
    document.addEventListener('click', function (ev) {
      if (!container.classList.contains('expanded')) return;
      var target = ev.target;
      if (!container.contains(target)) {
        closeMenu();
      }
    }, { passive: true });

    // close on ESC
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' || ev.key === 'Esc') {
        if (container.classList.contains('expanded')) {
          closeMenu();
          toggleBtn.focus();
        }
      }
    });

    // make sure ARIA state consistent on resize (if desktop then remove expanded)
    window.addEventListener('resize', function () {
      // simple heuristic: if viewport wider than 420, ensure expanded removed
      if (window.innerWidth > 420 && container.classList.contains('expanded')) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

  // API
  window.TopRightLangFlag = {
    getContainer: function(){ return document.getElementById(containerId); },
    setLanguages: function(labs, codesArr){
      labels = labs.slice(0,3);
      codes  = codesArr.slice(0,3);
      var container = document.getElementById(containerId);
      if (!container) return;
      // update / recreate svgs and aria labels
      var btns = container.querySelectorAll('.tr-btn');
      btns.forEach(function(b,i){
        var svg = b.querySelector('svg');
        var newSvg = getFlagSVG(codes[i], labels[i]);
        try { var t = document.createElementNS(SVG_NS,'title'); t.textContent = labels[i]; newSvg.insertBefore(t, newSvg.firstChild); } catch(e){}
        if (svg && svg.parentNode) svg.parentNode.replaceChild(newSvg, svg);
        b.setAttribute('aria-label', 'Passer en ' + (labels[i]||('Lang'+i)));
      });
    },
    go: function(i){ var btn = document.getElementById(containerId) && document.getElementById(containerId).querySelector('[data-index="'+String(i)+'"]'); if(btn) btn.click(); }
  };
})();