/* Sprite de íconos SVG embebidos (sin dependencias). Se inyecta al inicio del body
   porque <use href="archivo.svg#id"> no funciona al abrir el HTML con file://.
   Todos los trazos llevan fill="none" explícito (D-012). */
(function () {
  var P = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  var I = {
    flujo: '<path ' + P + ' d="M3 7h12M11 3l4 4-4 4M21 17H9M13 13l-4 4 4 4"/>',
    tecnologia: '<rect ' + P + ' x="6" y="6" width="12" height="12" rx="2"/><path ' + P + ' d="M10 10h4v4h-4zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    automatizacion: '<circle ' + P + ' cx="12" cy="12" r="3"/><path ' + P + ' d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    escala: '<path ' + P + ' d="M3 20h18M5 16l5-5 4 3 6-7"/><path ' + P + ' d="M15 7h5v5"/>',
    check: '<path ' + P + ' d="M5 12.5l4.5 4.5L19 7.5"/>',
    alerta: '<path ' + P + ' d="M12 3l9.5 17h-19z"/><path ' + P + ' d="M12 10v4M12 17.5v.01"/>',
    procesos: '<rect ' + P + ' x="4" y="3" width="16" height="18" rx="2"/><path ' + P + ' d="M8 8l1.5 1.5L12 7M8 14l1.5 1.5L12 13M14 8.5h3M14 14.5h3"/>',
    visibilidad: '<path ' + P + ' d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle ' + P + ' cx="12" cy="12" r="3"/>',
    reloj: '<circle ' + P + ' cx="12" cy="12" r="9"/><path ' + P + ' d="M12 7v5l3 2"/>',
    distancia: '<circle ' + P + ' cx="5" cy="7" r="2.5"/><circle ' + P + ' cx="19" cy="7" r="2.5"/><path ' + P + ' d="M1.5 17a3.5 3.5 0 017 0M15.5 17a3.5 3.5 0 017 0M9 12h6M9 12l2-2M15 12l-2 2"/>',
    herramienta: '<path ' + P + ' d="M14.5 6.5a4 4 0 00-5.2 5.2L3 18l3 3 6.3-6.3a4 4 0 005.2-5.2l-2.5 2.5-2.5-.5-.5-2.5z"/>',
    datos: '<path ' + P + ' d="M3 21h18M6 17v-5M11 17V8M16 17v-8M21 17V5"/>',
    indicador: '<path ' + P + ' d="M3.5 17a9 9 0 1117 0"/><path ' + P + ' d="M12 14l4-5"/><circle ' + P + ' cx="12" cy="14" r="1.5"/>',
    lider: '<circle ' + P + ' cx="12" cy="7" r="3.5"/><path ' + P + ' d="M5 21a7 7 0 0114 0"/><path ' + P + ' d="M12 13.5l1 2.5h-2z"/>',
    cultura: '<path ' + P + ' d="M12 20s-8-4.6-8-10.2A4.5 4.5 0 0112 7a4.5 4.5 0 018 2.8C20 15.4 12 20 12 20z"/>',
    infraestructura: '<path ' + P + ' d="M3 21V9l9-6 9 6v12M3 21h18M9 21v-6h6v6"/>',
    personas: '<circle ' + P + ' cx="9" cy="8" r="3"/><circle ' + P + ' cx="17" cy="9" r="2.5"/><path ' + P + ' d="M3 20a6 6 0 0112 0M14 15.5a4.5 4.5 0 017 4"/>',
    objetivo: '<circle ' + P + ' cx="12" cy="12" r="9"/><circle ' + P + ' cx="12" cy="12" r="5"/><circle ' + P + ' cx="12" cy="12" r="1.5"/>',
    lupa: '<circle ' + P + ' cx="10.5" cy="10.5" r="6.5"/><path ' + P + ' d="M15.5 15.5L21 21"/>',
    rayo: '<path ' + P + ' d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    ciclo: '<path ' + P + ' d="M20 12a8 8 0 01-14 5.3M4 12a8 8 0 0114-5.3"/><path ' + P + ' d="M18 2v4.7h-4.7M6 22v-4.7h4.7"/>',
    cascada: '<path ' + P + ' d="M4 4h6v4H4zM9 10h6v4H9zM14 16h6v4h-6zM7 8v4h2M12 14v4h2"/>',
    escudo: '<path ' + P + ' d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path ' + P + ' d="M8.5 12l2.5 2.5 4.5-5"/>',
    calendario: '<rect ' + P + ' x="3" y="5" width="18" height="16" rx="2"/><path ' + P + ' d="M3 10h18M8 3v4M16 3v4"/>',
    mensaje: '<path ' + P + ' d="M4 5h16v11H9l-5 4z"/><path ' + P + ' d="M8 9.5h8M8 12.5h5"/>',
    apoyo: '<path ' + P + ' d="M2 15l4-4 5 1 4 3-2 2-4-1M2 15l5 5h8l7-6-2-2-5 3"/><path ' + P + ' d="M15 3.5a2.5 2.5 0 015 0c0 2-2.5 3.5-2.5 3.5S15 5.5 15 3.5z"/>',
    trofeo: '<path ' + P + ' d="M7 4h10v5a5 5 0 01-10 0zM7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4M12 14v4M8 21h8M9 18h6"/>',
    bandera: '<path ' + P + ' d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    conexion: '<circle ' + P + ' cx="12" cy="12" r="3"/><circle ' + P + ' cx="4" cy="5" r="2"/><circle ' + P + ' cx="20" cy="5" r="2"/><circle ' + P + ' cx="4" cy="19" r="2"/><circle ' + P + ' cx="20" cy="19" r="2"/><path ' + P + ' d="M5.6 6.3l4 3.5M18.4 6.3l-4 3.5M5.6 17.7l4-3.5M18.4 17.7l-4-3.5"/>',
    flecha: '<path ' + P + ' d="M5 12h14M13 6l6 6-6 6"/>',
    abajo: '<path ' + P + ' d="M6 9l6 6 6-6"/>',
    arriba: '<path ' + P + ' d="M6 15l6-6 6 6"/>',
    menu: '<path ' + P + ' d="M4 6h16M4 12h16M4 18h16"/>',
    cerrar: '<path ' + P + ' d="M6 6l12 12M18 6L6 18"/>',
    indice: '<path ' + P + ' d="M9 6h11M9 12h11M9 18h11"/><circle ' + P + ' cx="4.5" cy="6" r="1"/><circle ' + P + ' cx="4.5" cy="12" r="1"/><circle ' + P + ' cx="4.5" cy="18" r="1"/>',
    completa: '<path ' + P + ' d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/>',
    presentacion: '<rect ' + P + ' x="3" y="4" width="18" height="12" rx="1.5"/><path ' + P + ' d="M12 16v4M8 20h8M10 8l4 2-4 2z"/>',
    directorio: '<rect ' + P + ' x="3" y="3" width="7" height="7" rx="1.5"/><rect ' + P + ' x="14" y="3" width="7" height="7" rx="1.5"/><rect ' + P + ' x="3" y="14" width="7" height="7" rx="1.5"/><rect ' + P + ' x="14" y="14" width="7" height="7" rx="1.5"/>'
  };
  var s = '';
  for (var k in I) { if (I.hasOwnProperty(k)) s += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + I[k] + '</symbol>'; }
  var div = document.createElement('div');
  div.setAttribute('aria-hidden', 'true');
  div.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" focusable="false">' + s + '</svg>';
  document.body.insertBefore(div, document.body.firstChild);
  window.CIT_ICONOS = Object.keys(I);
})();
