# Física Interactiva — Portal para GitHub Pages

Sitio web estático de Física para secundaria. No requiere servidor, Node.js, base de datos ni compilación.

## Publicación en GitHub Pages

1. Creá un repositorio público en GitHub (por ejemplo `fisica-interactiva`).
2. Subí **el contenido de esta carpeta** a la raíz del repositorio, incluyendo `index.html`, `assets/` y `materiales/`.
3. Entrá a **Settings → Pages → Build and deployment**.
4. En **Source**, elegí **Deploy from a branch**. Seleccioná la rama `main` y la carpeta `/ (root)`. Guardá.
5. Esperá a que GitHub muestre el enlace de Pages: `https://TU-USUARIO.github.io/fisica-interactiva/`.

## Estructura

- `index.html`: estructura principal.
- `assets/styles.css`: estilos y diseño adaptable.
- `assets/data.js`: módulos, conceptos, ejemplos y preguntas.
- `assets/app.js`: navegación, cuestionarios, calculadoras y progreso local.
- `materiales/*.tex`: ocho archivos LaTeX originales.

## Cómo ampliar

Para agregar un módulo, añadí otro objeto a `window.PORTAL.modules` en `assets/data.js`, siguiendo el formato de los módulos existentes. Los componentes del menú, portada, cuestionario y recursos se generan automáticamente. Si agregás un nuevo tipo de laboratorio, extendé la función `renderLab` y `calculate` en `assets/app.js`.

## Limitaciones y privacidad

- La web incluye una **selección didáctica** de los contenidos de los documentos; los ejercicios completos y diagramas TikZ siguen disponibles en los archivos `.tex` descargables. No se renderizan directamente como páginas HTML.
- Las preguntas del portal son ejercicios complementarios, no una transcripción íntegra de las prácticas.
- El progreso se guarda en `localStorage` del navegador; no se sincroniza entre dispositivos.
- Los cálculos de laboratorio son modelos simplificados para enseñanza.
- No hay cuentas de usuario ni almacenamiento remoto.


## Compilación automática de PDF

El workflow `.github/workflows/compilar-latex.yml` compila todos los archivos
`materiales/*.tex` con TeX Live y publica sus PDF en la misma carpeta.
Se ejecuta al cambiar los `.tex` o manualmente en Actions → Compilar documentos LaTeX → Run workflow.

**Primera instalación:** subir el contenido de esta carpeta a la raíz del repositorio,
verificar Settings → Actions → General → Workflow permissions → Read and write permissions
y ejecutar el workflow manualmente. Una vez finalizado, los botones PDF estarán disponibles.

Si falla la compilación, revisar el log del archivo correspondiente en Actions.
Los PDF se generan en GitHub Actions; GitHub Pages solo los distribuye.
