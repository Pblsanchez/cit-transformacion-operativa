/* Transformación Operativa CIT — comportamiento.
   Menú, índice, avance, modos Directorio / Presentación, teclado, cifras (js/datos.js),
   animaciones de entrada, conteo y barras. Sin dependencias. */
(function () {
  'use strict';
  var doc = document, html = doc.documentElement;
  var D = window.CIT_DATOS || { kpis: {}, potencial: [], metas: [] };
  var reducido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pantallas = [].slice.call(doc.querySelectorAll('.pantalla'));
  var total = pantallas.length;
  var actual = 0;
  var CLAVE_MODO = 'cit-modo';

  function $(id) { return doc.getElementById(id); }

  /* ---------- Formato es-AR ---------- */
  function fmt(v, dec) {
    var s = Number(v).toFixed(dec || 0).split('.');
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return s.length > 1 ? s[0] + ',' + s[1] : s[0];
  }
  function textoKpi(k, v) { return fmt(v === undefined ? k.valor : v, k.decimales) + (k.sufijo || ''); }

  /* ---------- Íconos ---------- */
  function iconos() {
    [].slice.call(doc.querySelectorAll('i[data-i]')).forEach(function (el) {
      var svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'ic');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      svg.setAttribute('fill', 'none');
      var use = doc.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', '#i-' + el.getAttribute('data-i'));
      svg.appendChild(use);
      el.parentNode.replaceChild(svg, el);
    });
  }

  /* ---------- Cifras ---------- */
  function cifras() {
    [].slice.call(doc.querySelectorAll('[data-kpi]')).forEach(function (el) {
      var k = D.kpis[el.getAttribute('data-kpi')];
      if (k) el.textContent = textoKpi(k);
    });
    var cd = D.kpis.capDisenio, cr = D.kpis.capReal;
    if (cd && cr) {
      $('barra-disenio').setAttribute('data-w', '100');
      $('barra-real').setAttribute('data-w', String(Math.round(cr.valor / cd.valor * 100)));
    }
    var bp = $('barras-potencial'), gestion = 0;
    if (bp) {
      bp.innerHTML = '';
      D.potencial.forEach(function (p) {
        if (p.gestion) gestion += p.valor;
        var f = doc.createElement('div');
        f.className = 'barra-fila';
        f.innerHTML = '<span></span><div class="barra"><div class="barra-relleno ' + (p.gestion ? 'rojo' : 'gris') +
          '" data-w="' + p.valor * 2 + '"></div></div><strong>' + fmt(p.valor) + ' %</strong>';
        f.firstChild.textContent = p.factor;
        bp.appendChild(f);
      });
      $('potencial-gestion').textContent = fmt(gestion) + ' %';
    }
    var tb = $('tabla-metas');
    if (tb) {
      tb.innerHTML = '';
      D.metas.forEach(function (m) {
        var tr = doc.createElement('tr');
        var u = m.unidad === '%' ? ' %' : ' ' + m.unidad;
        var celdas = [['th', m.indicador, ''], ['td', fmt(m.hoy, m.dec) + u, 'hoy'], ['td', fmt(m.d90, m.dec) + u, ''],
          ['td', fmt(m.d180, m.dec) + u, ''], ['td', fmt(m.d365, m.dec) + u, 'final']];
        celdas.forEach(function (c) {
          var td = doc.createElement(c[0]);
          if (c[0] === 'th') td.setAttribute('scope', 'row');
          if (c[2]) td.className = c[2];
          td.textContent = c[1];
          tr.appendChild(td);
        });
        tb.appendChild(tr);
      });
    }
    [].slice.call(doc.querySelectorAll('[data-meta]')).forEach(function (el) {
      var m = D.metas[+el.getAttribute('data-meta')], h = el.getAttribute('data-h');
      if (m && m[h] !== undefined) el.textContent = m.indicador + ': ' + fmt(m[h], m.dec) + (m.unidad === '%' ? ' %' : ' ' + m.unidad);
    });
    /* Etiqueta «Ejemplo» donde haya cifras ficticias (D-044) */
    [].slice.call(doc.querySelectorAll('[data-ejemplo]')).forEach(function (el) {
      var fict = false;
      [].slice.call(el.querySelectorAll('[data-kpi]')).forEach(function (k) {
        var d = D.kpis[k.getAttribute('data-kpi')];
        if (d && d.ficticio) fict = true;
      });
      if (el.querySelector('#barras-potencial')) fict = fict || !!D.potencialFicticio;
      if (el.querySelector('#tabla-metas') || el.hasAttribute('data-meta')) fict = fict || !!D.metasFicticias;
      if (fict && !el.querySelector('.ejemplo')) {
        var b = doc.createElement('span');
        b.className = 'ejemplo';
        b.textContent = 'Ejemplo';
        b.title = 'Cifra ilustrativa: se reemplazará por el dato real';
        el.appendChild(b);
      }
    });
  }

  /* ---------- Animaciones al entrar ---------- */
  function contar(el) {
    var k = D.kpis[el.getAttribute('data-kpi')];
    if (!k || reducido || el.getAttribute('data-contado')) return;
    el.setAttribute('data-contado', '1');
    var ini = null, dur = 1200;
    function paso(t) {
      if (ini === null) ini = t;
      var p = Math.min((t - ini) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = textoKpi(k, k.valor * e);
      if (p < 1) window.requestAnimationFrame(paso); else el.textContent = textoKpi(k);
    }
    window.requestAnimationFrame(paso);
  }
  function activarSeccion(sec) {
    [].slice.call(sec.querySelectorAll('.revelar')).forEach(function (el, i) {
      if (!reducido) el.style.transitionDelay = Math.min(i * 70, 560) + 'ms';
      el.classList.add('visible');
    });
    [].slice.call(sec.querySelectorAll('.barra-relleno[data-w]')).forEach(function (b) {
      b.style.width = b.getAttribute('data-w') + '%';
    });
    [].slice.call(sec.querySelectorAll('.num[data-kpi]')).forEach(contar);
  }

  /* ---------- Menú e índice ---------- */
  function construirListas() {
    var menu = $('menu-lista'), indice = $('indice-lista');
    pantallas.forEach(function (s, i) {
      [menu, indice].forEach(function (lista) {
        var li = doc.createElement('li'), a = doc.createElement('a'), n = doc.createElement('span');
        a.href = '#' + s.id;
        n.className = 'n';
        n.textContent = String(i + 1);
        a.appendChild(n);
        a.appendChild(doc.createTextNode(s.getAttribute('data-titulo')));
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
          if (lista === indice) $('dlg-indice').close();
          cerrarMenu();
          ir(i);
        });
        li.appendChild(a);
        lista.appendChild(li);
      });
    });
  }
  function marcarActual(i) {
    actual = i;
    [].slice.call($('menu-lista').querySelectorAll('a')).forEach(function (a, j) {
      if (j === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    var t = (i + 1) + ' / ' + total;
    $('menu-contador').textContent = t;
    $('nav-contador').textContent = t;
    $('btn-anterior').disabled = i === 0;
    $('btn-siguiente').disabled = i === total - 1;
    if (window.history && history.replaceState) history.replaceState(null, '', '#' + pantallas[i].id);
  }

  /* ---------- Navegación ---------- */
  function ir(i) {
    i = Math.max(0, Math.min(total - 1, i));
    pantallas[i].scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
    activarSeccion(pantallas[i]);
    marcarActual(i);
  }
  function progreso() {
    var max = (doc.documentElement.scrollHeight - window.innerHeight) || 1;
    var y = window.pageYOffset || doc.documentElement.scrollTop || 0;
    $('progreso-barra').style.width = Math.min(100, y / max * 100) + '%';
  }

  /* ---------- Modos ---------- */
  function modo() { return html.classList.contains('modo-presentacion') ? 'presentacion' : 'directorio'; }
  function setModo(m, sinScroll) {
    html.classList.toggle('modo-presentacion', m === 'presentacion');
    $('btn-presentacion').setAttribute('aria-pressed', String(m === 'presentacion'));
    $('btn-directorio').setAttribute('aria-pressed', String(m !== 'presentacion'));
    try { window.localStorage.setItem(CLAVE_MODO, m); } catch (e) { /* sin almacenamiento */ }
    if (!sinScroll) window.setTimeout(function () { ir(actual); }, 30);
  }

  /* ---------- Menú móvil ---------- */
  function abrirMenu() { $('menu').classList.add('abierto'); $('btn-menu').setAttribute('aria-expanded', 'true'); }
  function cerrarMenu() { $('menu').classList.remove('abierto'); $('btn-menu').setAttribute('aria-expanded', 'false'); }

  /* ---------- Pantalla completa ---------- */
  function completa() {
    var fs = doc.fullscreenElement || doc.webkitFullscreenElement;
    if (fs) { (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc); return; }
    var r = html.requestFullscreen || html.webkitRequestFullscreen;
    if (r) r.call(html);
  }
  function abrirIndice() {
    var d = $('dlg-indice');
    if (d.open) return;
    if (d.showModal) d.showModal(); else d.setAttribute('open', '');
  }

  /* ---------- Teclado ---------- */
  function teclado(ev) {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var tag = (ev.target && ev.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    var dlg = $('dlg-indice');
    if (ev.key === 'Escape') { cerrarMenu(); if (dlg.open) dlg.close(); return; }
    if (dlg.open) return;
    var k = ev.key, pres = modo() === 'presentacion';
    if (k === 'p' || k === 'P') { setModo(pres ? 'directorio' : 'presentacion'); ev.preventDefault(); return; }
    if (k === 'd' || k === 'D') { abrirIndice(); ev.preventDefault(); return; }
    if (k === 'f' || k === 'F') { completa(); ev.preventDefault(); return; }
    var sig = ['ArrowRight', 'PageDown'], ant = ['ArrowLeft', 'PageUp'];
    if (pres) { sig.push('ArrowDown', ' ', 'Spacebar'); ant.push('ArrowUp'); }
    if (pres && (tag === 'BUTTON' || tag === 'A') && k === ' ') return;
    if (sig.indexOf(k) >= 0) { ev.preventDefault(); ir(actual + 1); }
    else if (ant.indexOf(k) >= 0) { ev.preventDefault(); ir(actual - 1); }
    else if (pres && k === 'Home') { ev.preventDefault(); ir(0); }
    else if (pres && k === 'End') { ev.preventDefault(); ir(total - 1); }
  }

  /* ---------- Inicio ---------- */
  function iniciar() {
    iconos();
    cifras();
    construirListas();

    if (reducido) {
      var svg = $('svg-flujo');
      if (svg && svg.pauseAnimations) svg.pauseAnimations();
    }

    if ('IntersectionObserver' in window) {
      var obsEntrada = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) activarSeccion(e.target); });
      }, { threshold: 0.12 });
      var obsActual = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) marcarActual(pantallas.indexOf(e.target)); });
      }, { rootMargin: '-45% 0px -55% 0px' });
      pantallas.forEach(function (s) { obsEntrada.observe(s); obsActual.observe(s); });
    } else {
      pantallas.forEach(activarSeccion);
    }

    $('btn-directorio').addEventListener('click', function () { setModo('directorio'); });
    $('btn-presentacion').addEventListener('click', function () { setModo('presentacion'); });
    $('btn-indice').addEventListener('click', abrirIndice);
    $('btn-cerrar-indice').addEventListener('click', function () { $('dlg-indice').close(); });
    $('btn-completa').addEventListener('click', completa);
    $('btn-anterior').addEventListener('click', function () { ir(actual - 1); });
    $('btn-siguiente').addEventListener('click', function () { ir(actual + 1); });
    $('btn-menu').addEventListener('click', function () {
      if ($('menu').classList.contains('abierto')) cerrarMenu(); else abrirMenu();
    });
    [].slice.call(doc.querySelectorAll('main a[href^="#"]')).forEach(function (a) {
      a.addEventListener('click', function (ev) {
        var i = pantallas.indexOf(doc.getElementById(a.getAttribute('href').slice(1)));
        if (i >= 0) { ev.preventDefault(); ir(i); }
      });
    });
    doc.addEventListener('keydown', teclado);
    window.addEventListener('scroll', progreso, { passive: true });
    window.addEventListener('resize', progreso);

    var guardado = null;
    try { guardado = window.localStorage.getItem(CLAVE_MODO); } catch (e) { /* sin almacenamiento */ }
    setModo(guardado === 'presentacion' ? 'presentacion' : 'directorio', true);

    var desdeHash = location.hash ? pantallas.indexOf(doc.getElementById(location.hash.slice(1))) : -1;
    if (desdeHash > 0) {
      window.setTimeout(function () {
        pantallas[desdeHash].scrollIntoView({ block: 'start' });
        activarSeccion(pantallas[desdeHash]);
        marcarActual(desdeHash);
      }, 60);
    } else {
      activarSeccion(pantallas[0]);
      marcarActual(0);
    }
    progreso();
  }

  window.CIT = { ir: ir, setModo: setModo, modo: modo, fmt: fmt, actual: function () { return actual; } };
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
