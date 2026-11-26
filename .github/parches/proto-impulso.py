# T-008 E10: arma el prototipo pruebas/impulso/index.html solo con Modelo + Impulso Operativo (Que, Como, Donde)
# a partir de index.html (v1.3) + pruebas/impulso/bloque.html. No toca index.html. Idempotente.
import hashlib, os, sys

def blob(b):
    return hashlib.sha1(b'blob %d\0' % len(b) + b).hexdigest()

SRC = 'index.html'
BLOQUE = 'pruebas/impulso/bloque.html'
DEST = 'pruebas/impulso/index.html'
INFORME = '.github/parches/resultado-proto-impulso.md'
SHA_SRC = '45efa408a2c7fb25c56c6029092f4ddd9f076f6d'
SHA_DEST = 'a41f67336f1d6436d3b36504d116eb31d9349062'

def informe(txt):
    with open(INFORME, 'w', encoding='utf-8') as f:
        f.write('# proto-impulso\n\n' + txt + '\n')

if os.path.exists(DEST) and blob(open(DEST, 'rb').read()) == SHA_DEST:
    informe('OK: ya aplicado (' + SHA_DEST[:7] + ').')
    print('ya aplicado'); sys.exit(0)

raw = open(SRC, 'rb').read()
if blob(raw) != SHA_SRC:
    informe('ERROR: index.html cambio (SHA ' + blob(raw)[:7] + ', se esperaba ' + SHA_SRC[:7] + ').')
    sys.exit(1)
src = raw.decode('utf-8')
bloque = open(BLOQUE, 'rb').read().decode('utf-8')
modelo = open('pruebas/impulso/modelo.html', 'rb').read().decode('utf-8')
a = src.index('<main id="principal">') + len('<main id="principal">')
fin = src.index('</main>')
out = src[:a] + '\n\n' + modelo + bloque + '\n' + src[fin:]
reps = [
    ('href="favicon.svg"', 'href="../../favicon.svg"'),
    ('href="css/estilos.css?v=1.3"', 'href="../../css/estilos.css?v=1.3"'),
    ('<link rel="stylesheet" href="css/impulso.css?v=1.3">',
     '<link rel="stylesheet" href="../../css/impulso.css?v=1.3">\n<link rel="stylesheet" href="impulso-tres.css?v=0.3">\n<link rel="stylesheet" href="modelo.css?v=0.3">\n<meta name="robots" content="noindex">'),
    ('<title>Transformación Operativa CIT</title>', '<title>Prototipo · Impulso Operativo · Transformación Operativa CIT</title>'),
    ('<a class="saltar" href="#inicio">', '<a class="saltar" href="#modelo">'),
    ('<span class="menu-proyecto">Transformación Operativa CIT</span>', '<span class="menu-proyecto">Prototipo · Impulso Operativo</span>'),
    ('src="js/iconos.js?v=1.3"', 'src="../../js/iconos.js?v=1.3"'),
    ('src="js/datos.js?v=1.3"', 'src="../../js/datos.js?v=1.3"'),
    ('src="js/presentacion.js?v=1.3"', 'src="../../js/presentacion.js?v=1.3"'),
    ('\n</main>', '\n<!-- presentacion.js usa estas barras sin chequear: sin ellas se corta y la pagina queda en blanco -->\n<div hidden aria-hidden="true"><div id="barra-disenio"></div><div id="barra-real"></div></div>\n</main>'),
    ('<span id="menu-contador">1 / 21</span>', '<span id="menu-contador">1 / 4</span>'),
    ('<span id="nav-contador" aria-live="polite">1 / 21</span>', '<span id="nav-contador" aria-live="polite">1 / 4</span>'),
]
for x, y in reps:
    if out.count(x) != 1:
        informe('ERROR: reemplazo no encontrado: ' + x); sys.exit(1)
    out = out.replace(x, y)
data = out.encode('utf-8')
if blob(data) != SHA_DEST:
    informe('ERROR: el resultado no coincide (SHA ' + blob(data)[:7] + ', se esperaba ' + SHA_DEST[:7] + '). Revisar bloque.html.')
    sys.exit(1)
os.makedirs(os.path.dirname(DEST), exist_ok=True)
open(DEST, 'wb').write(data)
informe('OK: prototipo creado, %d pantallas, %d bytes, SHA %s.' % (out.count('<section class="pantalla'), len(data), SHA_DEST[:7]))
print('OK')
