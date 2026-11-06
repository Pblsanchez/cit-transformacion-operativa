/* Cifras de la presentación CIT (D-044).
   Dato real: volumen promedio diario. El resto son NÚMEROS DE EJEMPLO (ficticio: true):
   se muestran con la etiqueta «Ejemplo». Para usar cifras reales, cambiar "valor" y
   poner ficticio: false. Formato argentino: coma decimal, punto de miles. */
var CIT_DATOS = {
  kpis: {
    volumen:      { valor: 50000, decimales: 0, sufijo: '',      etiqueta: 'envíos por día (promedio)', ficticio: false },
    capDisenio:   { valor: 4000,  decimales: 0, sufijo: '',      etiqueta: 'envíos/hora de diseño',     ficticio: true },
    capReal:      { valor: 2800,  decimales: 0, sufijo: '',      etiqueta: 'envíos/hora reales',        ficticio: true },
    usoCapacidad: { valor: 70,    decimales: 0, sufijo: ' %',    etiqueta: 'de la capacidad de diseño', ficticio: true },
    salidas:      { valor: 82,    decimales: 0, sufijo: ' %',    etiqueta: 'salidas a tiempo (objetivo 95 %)', ficticio: true },
    permanencia:  { valor: 9.5,   decimales: 1, sufijo: ' h',    etiqueta: 'permanencia promedio (diseño 4 h)', ficticio: true },
    brechaTurnos: { valor: 34,    decimales: 0, sufijo: ' %',    etiqueta: 'brecha de productividad entre turnos', ficticio: true },
    errores:      { valor: 1.8,   decimales: 1, sufijo: ' %',    etiqueta: 'envíos con error (≈ 900 por día)', ficticio: true },
    erroresDia:   { valor: 900,   decimales: 0, sufijo: '',      etiqueta: 'envíos con error por día', ficticio: true },
    adherencia:   { valor: 61,    decimales: 0, sufijo: ' %',    etiqueta: 'adherencia a procedimientos', ficticio: true },
    lideresPiso:  { valor: 25,    decimales: 0, sufijo: ' %',    etiqueta: 'del tiempo de los líderes en el piso', ficticio: true },
    ausentismo:   { valor: 11,    decimales: 0, sufijo: ' %',    etiqueta: 'ausentismo', ficticio: true },
    rotacion:     { valor: 32,    decimales: 0, sufijo: ' %',    etiqueta: 'rotación anual', ficticio: true }
  },
  /* Potencial de mejora por factor (suma 100). «Gestión y personas» = todo menos Infraestructura. */
  potencial: [
    { factor: 'Infraestructura', valor: 10, gestion: false },
    { factor: 'Procesos',        valor: 25, gestion: true },
    { factor: 'Indicadores',     valor: 20, gestion: true },
    { factor: 'Liderazgo',       valor: 25, gestion: true },
    { factor: 'Cultura',         valor: 20, gestion: true }
  ],
  potencialFicticio: true,
  /* Metas por horizonte (todas de ejemplo). */
  metas: [
    { indicador: 'Salidas a tiempo',              unidad: '%',      hoy: 82,  d90: 86,  d180: 91,  d365: 96,  dec: 0 },
    { indicador: 'Permanencia promedio',          unidad: 'h',      hoy: 9.5, d90: 8,   d180: 6,   d365: 4.5, dec: 1 },
    { indicador: 'Productividad',                 unidad: 'env/HH', hoy: 38,  d90: 40,  d180: 44,  d365: 48,  dec: 0 },
    { indicador: 'Envíos con error',              unidad: '%',      hoy: 1.8, d90: 1.5, d180: 1.0, d365: 0.6, dec: 1 },
    { indicador: 'Cumplimiento de procedimientos', unidad: '%',     hoy: 61,  d90: 75,  d180: 85,  d365: 92,  dec: 0 },
    { indicador: 'Ausentismo',                    unidad: '%',      hoy: 11,  d90: 10,  d180: 8,   d365: 6,   dec: 0 }
  ],
  metasFicticias: true
};
