(() => {
  'use strict';

  const modules = window.PORTAL.modules;
  const app = document.getElementById('app');
  const nav = document.getElementById('nav');
  const crumb = document.getElementById('breadcrumbs');
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menu');

  let route = 'home';
  let tab = 'teoria';
  let quizIndex = 0;
  let selected = null;
  let checked = false;
  let search = '';

  /* ---------- Estado guardado ---------- */
  const storage = 'fisica-portal-v1';
  let state = {};
  try { state = JSON.parse(localStorage.getItem(storage) || '{}'); } catch {}
  const save = () => { try { localStorage.setItem(storage, JSON.stringify(state)); } catch {} };

  /* ---------- Utilidades ---------- */
  const fmt = n => Number.isFinite(n)
    ? Number(n.toFixed(3)).toLocaleString('es-CR', { maximumFractionDigits: 3 })
    : '—';

  const esc = s => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const progress = m => Math.round((state[m.id]?.length || 0) / m.quiz.length * 100);

  const icon = m =>
    `<span class="module-icon" style="background:${m.color}18;color:${m.color}">${m.icon}</span>`;

  const matches = m =>
    (m.name + ' ' + m.description + ' ' + m.sections.join(' '))
      .toLowerCase().includes(search.toLowerCase());

  /* Convierte la notación LaTeX de data.js a texto con <sub> y <sup>.
     Primero subíndices/superíndices y después fracciones, para que
     \frac{P_{mayor}-P_{menor}}{m_1+m_2} funcione. */
  function math(s) {
    return esc(s)
      .replace(/\\mathrm\{([^}]+)\}/g, '$1')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
      .replace(/\^([0-9])/g, '<sup>$1</sup>')
      .replace(/_\{([^}]+)\}/g, '<sub>$1</sub>')
      .replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>')
      .replace(/\\vec\{([^}]+)\}/g, '$1⃗')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\sum/g, '∑')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\theta/g, 'θ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\cos/g, ' cos ')
      .replace(/\\sin/g, ' sen ')
      .replace(/\\quad/g, '  ')
      .replace(/\\[;,]/g, ' ')
      .replace(/\\/g, '');
  }

  /* ---------- Navegación ---------- */
  function renderNav() {
    nav.innerHTML =
      `<button class="nav-btn ${route === 'home' ? 'active' : ''}" data-route="home" ${route === 'home' ? 'aria-current="page"' : ''}><span class="nav-icon">▦</span> Panel principal</button>` +
      modules.map(m =>
        `<button class="nav-btn ${route === m.id ? 'active' : ''}" data-route="${m.id}" ${route === m.id ? 'aria-current="page"' : ''}><span class="nav-icon">${m.icon}</span>${m.name}</button>`
      ).join('');
  }

  function closeMenu() {
    sidebar.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function go(id) {
    route = modules.some(m => m.id === id) ? id : 'home';
    tab = 'teoria';
    quizIndex = 0;
    selected = null;
    checked = false;
    location.hash = route === 'home' ? 'inicio' : route;
    render();
    closeMenu();
    window.scrollTo(0, 0);
  }

  function render() {
  renderNav();

  const m = modules.find(x => x.id === route);

  crumb.innerHTML = m
    ? `<a href="#inicio" data-route="home">Inicio</a> / ${esc(m.name)}`
    : `<span aria-current="page">Inicio</span> / Panel de aprendizaje`;

  app.innerHTML = m ? renderModule(m) : renderHome();

  bind();
}
  /* ---------- Inicio ---------- */
  function renderHome() {
    const done = modules.reduce((s, m) => s + (state[m.id]?.length || 0), 0);
    const total = modules.reduce((s, m) => s + m.quiz.length, 0);
    const filtered = modules.filter(matches);
    return `
      <section class="hero">
        <div>
          <span class="eyebrow">TU ESPACIO DE APRENDIZAJE</span>
          <h1>La física se entiende mejor cuando la explorás.</h1>
          <p>Conceptos claros, ejemplos paso a paso, prácticas y herramientas interactivas para aprender a tu propio ritmo.</p>
          <button class="btn btn-white" data-route="${modules[0].id}">Comenzar a aprender →</button>
        </div>
        <div class="hero-art">⚛</div>
      </section>
      
<section class="stats">
  <div class="stat">
    <b>${String(modules.length).padStart(2, '0')}</b>
    <small>Módulos de estudio</small>
  </div>

  <div class="stat">
    <b>${done}/${total}</b>
    <small>Preguntas completadas</small>
  </div>

  <div class="stat">
    <b>${Math.round(done / total * 100)} %</b>
    <small>Avance de práctica</small>
  </div>
</section>

<div style="text-align:right;margin:12px 0 24px">
  <button class="btn btn-outline" id="reset-progress">
    Reiniciar mi progreso
  </button>
</div>

      </section>
      <div class="section-head">
        <div><h2>Explorá los módulos</h2><p class="muted">Elegí un tema para comenzar o continuar.</p></div>
        <input id="search" class="search" type="search" placeholder="Buscar tema..." value="${esc(search)}" aria-label="Buscar tema">
      </div>
      <div id="module-list" class="cards">${cards(filtered)}</div>`;
  }

  function cards(ms) {
    return ms.length
      ? ms.map(m => `
        <article class="card">
          <div class="card-top">${icon(m)}<span class="tag">${m.tag}</span></div>
          <h3>${m.name}</h3>
          <p class="muted">${m.description}</p>
          <div class="progress-track"><div class="progress-fill" style="width:${progress(m)}%"></div></div>
          <div class="card-bottom">
            <span class="muted">${progress(m)} % completado</span>
            <button class="link-btn" data-route="${m.id}">Explorar módulo →</button>
          </div>
        </article>`).join('')
      : `<div class="empty">No se encontraron módulos.</div>`;
  }

  /* ---------- Módulo ---------- */
  function renderModule(m) {
    const tabs = [
      ['teoria', 'Conceptos'], ['ejemplo', 'Ejemplo resuelto'], ['practica', 'Práctica'],
      ['herramienta', 'Laboratorio'], ['recursos', 'Materiales']
    ];
    return `
      <div class="module-head">${icon(m)}
        <div><span class="eyebrow">${m.tag}</span><h1>${m.name}</h1><div class="muted">${m.description}</div></div>
      </div>
      <div class="tabs" role="tablist">
        ${tabs.map(([id, label]) =>
          `<button role="tab" aria-selected="${tab === id}" class="tab ${tab === id ? 'active' : ''}" data-tab="${id}">${label}</button>`
        ).join('')}
      </div>
      <div id="module-content">${content(m)}</div>`;
  }

  function content(m) {
    if (tab === 'teoria') {
      return `
        <div class="section-head"><div><h2>Aprendé los conceptos</h2><p class="muted">Ideas fundamentales y fórmulas del tema.</p></div></div>
        <div class="concept-grid">
          ${m.concepts.map(c => `
            <article class="panel">
              <h3>${c.title}</h3>
              <p class="muted">${c.text}</p>
              <div class="formula">${math(c.formula)}</div>
            </article>`).join('')}
        </div>
        <div class="panel"><h3>Contenidos del módulo</h3>
          <div class="topics">${m.sections.map(s => `<span class="topic">${s}</span>`).join('')}</div>
        </div>`;
    }

    if (tab === 'ejemplo') {
      return `
        <div class="panel">
          <span class="eyebrow">EJEMPLO GUIADO</span>
          <h2 style="margin-top:10px">${m.example.title}</h2>
          <p>${m.example.statement}</p>
          <h3>Solución paso a paso</h3>
          ${m.example.steps.map((s, i) => `<div class="step"><span class="step-num">${i + 1}</span><span>${s}</span></div>`).join('')}
          <div class="answer">Respuesta: ${m.example.answer}</div>
        </div>`;
    }

    if (tab === 'practica') return renderQuiz(m);
    if (tab === 'herramienta') return renderLab(m);

    /* Materiales */
    const files = [
      ['Presentación del tema', m.presentation, 'Conceptos, fórmulas y ejemplos'],
      ['Práctica de ejercicios', m.practice, 'Actividades del documento original']
    ];
    return `
      <div class="panel">
        <h2>Archivos originales en LaTeX</h2>
        <p class="muted">Descargá los materiales completos para editar, compilar o utilizar en clase. Los diagramas TikZ se conservan en sus archivos fuente.</p>
        ${files.map(([name, file, desc]) => {
          const pdf = encodeURIComponent(file.replace(/\.tex$/i, '.pdf'));
          return `
          <div class="resource">
            <div><b>📄 ${name}</b><p class="muted">${desc} · ${file}</p></div>
            <div class="resource-actions">
              <a class="btn btn-primary" href="materiales/${pdf}" target="_blank" rel="noopener">Ver PDF ↗</a>
              <a class="btn btn-outline" href="materiales/${pdf}" download>Descargar PDF ↓</a>
              <a class="btn btn-outline" href="materiales/${encodeURIComponent(file)}" download>Descargar .tex ↓</a>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="panel"><h3>¿Cómo utilizar los archivos?</h3>
        <p>Podés abrirlos con un editor LaTeX o compilarlos en Overleaf. El portal web funciona independientemente de estos archivos.</p>
      </div>`;
  }

  /* ---------- Práctica (quiz) ---------- */
  function renderQuiz(m) {
    const q = m.quiz[quizIndex];
    const answered = state[m.id] || [];
    const last = quizIndex === m.quiz.length - 1;
    return `
      <div class="panel">
        <div class="quiz-meta"><span>Pregunta ${quizIndex + 1} de ${m.quiz.length}</span><span>${answered.length} respondidas correctamente</span></div>
        <div class="progress-track" style="margin-bottom:25px"><div class="progress-fill" style="width:${(quizIndex + 1) / m.quiz.length * 100}%"></div></div>
        <h2>${q.q}</h2>
        ${q.options.map((o, i) => `
          <button class="quiz-option ${selected === i ? 'selected' : ''} ${checked && i === q.correct ? 'correct' : ''} ${checked && selected === i && i !== q.correct ? 'wrong' : ''}" data-choice="${i}" ${checked ? 'disabled' : ''}>${String.fromCharCode(65 + i)}. ${o}</button>`).join('')}
        ${checked ? `<div class="answer">${selected === q.correct ? '¡Correcto!' : 'Revisá tu respuesta.'} ${q.why}</div>` : ''}
        <div style="display:flex;gap:10px;justify-content:space-between;margin-top:24px;flex-wrap:wrap">
          <button class="btn btn-outline" id="prev" ${quizIndex === 0 ? 'disabled' : ''}>← Anterior</button>
          ${checked
            ? `<button class="btn btn-primary" id="next">${last ? 'Volver al inicio' : 'Siguiente →'}</button>`
            : `<button class="btn btn-primary" id="check" ${selected === null ? 'disabled' : ''}>Comprobar respuesta</button>`}
        </div>
      </div>
      <p class="note">Las preguntas son una práctica interactiva complementaria. Para todos los ejercicios originales, descargá la práctica en la pestaña Materiales. El progreso se guarda únicamente en este navegador.</p>`;
  }

  /* ---------- Laboratorio ---------- */
  function field(id, label, value) {
    return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="number" step="any" value="${value}"></div>`;
  }

  function graph() {
    return `<svg class="graph" viewBox="0 0 560 260" role="img" aria-label="Gráfica de posición contra tiempo">
      <g stroke="var(--border)" stroke-width="1">
        ${[50, 100, 150, 200].map(y => `<line x1="55" y1="${y}" x2="530" y2="${y}"/>`).join('')}
        ${[140, 230, 320, 410, 500].map(x => `<line x1="${x}" y1="20" x2="${x}" y2="215"/>`).join('')}
      </g>
      <g stroke="var(--muted)" stroke-width="2"><line x1="55" y1="215" x2="535" y2="215"/><line x1="55" y1="215" x2="55" y2="15"/></g>
      <polyline id="graph-line" fill="none" stroke="#7466ed" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="55,180 500,40"/>
      <g fill="var(--muted)" font-size="13"><text x="475" y="242">t (s)</text><text x="12" y="19">d (m)</text></g>
    </svg>`;
  }

  function renderLab(m) {
    const forms = {
      vectores: [field('f1', 'Magnitud del vector', 50), field('f2', 'Ángulo respecto al eje +x (°)', 30)],
      relativo: [field('f1', 'Velocidad A respecto al suelo (km/h)', 80), field('f2', 'Velocidad B respecto al suelo (km/h)', 50)],
      mrua: [field('f1', 'Velocidad inicial (m/s)', 0), field('f2', 'Aceleración (m/s²)', 2.5), field('f3', 'Tiempo (s)', 8)],
      graficas: [field('f1', 'Posición inicial (m)', 2), field('f2', 'Posición final (m)', 14), field('f3', 'Tiempo transcurrido (s)', 4)],
      dinamica: [
        field('f1', 'Masa (kg)', 20), field('f2', 'Fuerza aplicada (N)', 100),
        field('f3', 'Ángulo sobre la horizontal (°)', 30), field('f4', 'Coeficiente de fricción μₖ', 0.15)
      ]
    };
    return `
      <div class="panel">
        <span class="eyebrow">LABORATORIO INTERACTIVO</span>
        <h2 style="margin-top:10px">Experimentá con los valores</h2>
        <p class="muted">Modificá los datos y observá los resultados calculados automáticamente.</p>
        <div class="input-grid">${(forms[m.id] || []).join('')}</div>
        <div id="calc-result" class="calc-result" aria-live="polite"></div>
        ${m.id === 'graficas' ? graph() : ''}
        <p class="note" style="margin-top:20px">Se aplican las fórmulas del modelo ideal y las convenciones de signo indicadas en el módulo. Usá punto o coma decimal según admita tu navegador.</p>
      </div>`;
  }

  function calculate(m) {
    const [a, b, c, k] = ['f1', 'f2', 'f3', 'f4'].map(id => {
      const e = document.getElementById(id);
      return e ? Number(e.value) : 0;
    });
    let out = '';

    if (m.id === 'vectores') {
      const x = a * Math.cos(b * Math.PI / 180);
      const y = a * Math.sin(b * Math.PI / 180);
      out = `Aₓ = ${fmt(x)} · Aᵧ = ${fmt(y)}`;
    }
    if (m.id === 'relativo') {
      out = `v(A/B) = ${fmt(a - b)} km/h · Rapidez relativa = ${fmt(Math.abs(a - b))} km/h`;
    }
    if (m.id === 'mrua') {
      out = `v = ${fmt(a + b * c)} m/s · d = ${fmt(a * c + b * c * c / 2)} m`;
    }
    if (m.id === 'dinamica') {
      if (a <= 0) {
        out = 'La masa debe ser mayor que cero.';
      } else {
        const t = c * Math.PI / 180;
        const N = Math.max(0, a * 9.8 - b * Math.sin(t));
        const f = k * N;
        const net = b * Math.cos(t) - f;
        out = `N = ${fmt(N)} N · fₖ = ${fmt(f)} N · a = ${fmt(Math.max(0, net) / a)} m/s²`;
      }
    }
    if (m.id === 'graficas') {
      out = c === 0
        ? 'El intervalo de tiempo debe ser distinto de cero.'
        : `Velocidad media = ${fmt((b - a) / c)} m/s · Desplazamiento = ${fmt(b - a)} m`;
      const line = document.getElementById('graph-line');
      if (line) {
        const scale = Math.max(1, Math.abs(a), Math.abs(b));
        const y1 = 115 - 85 * a / scale;
        const y2 = 115 - 85 * b / scale;
        line.setAttribute('points', `55,${y1} 500,${y2}`);
      }
    }
    document.getElementById('calc-result').textContent = out;
  }

  /* ---------- Eventos ---------- */
  
function bindRoutes(scope) {
  scope.querySelectorAll('[data-route]').forEach(el => {
    if (el.dataset.routeBound === 'true') return;

    el.dataset.routeBound = 'true';

    el.addEventListener('click', event => {
      event.preventDefault();
      go(el.dataset.route);
    });
  });
}


 
function bind() {
  bindRoutes(document);

  // Navegación entre pestañas
  document.querySelectorAll('[data-tab]').forEach(el =>
    el.addEventListener('click', () => {
      tab = el.dataset.tab;
      selected = null;
      checked = false;
      render();
    })
  );

  // Buscador de módulos
  const searchEl = document.getElementById('search');

  if (searchEl) {
    searchEl.addEventListener('input', e => {
      search = e.target.value;

      const list = document.getElementById('module-list');

      list.innerHTML = cards(modules.filter(matches));

      bindRoutes(list);
    });
  }

  // Reiniciar progreso individual
  const resetBtn = document.getElementById('reset-progress');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const confirmar = confirm(
        '¿Deseás reiniciar tu progreso?\n\n' +
        'Se eliminarán las respuestas correctas guardadas ' +
        'en este dispositivo.\n\n' +
        'Esta acción no se puede deshacer.'
      );

      if (!confirmar) return;

      // Eliminar respuestas guardadas
      state = {};

      // Actualizar almacenamiento local
      save();

      // Reiniciar variables de práctica
      quizIndex = 0;
      selected = null;
      checked = false;

      // Actualizar interfaz
      render();
    });
  }

  // Identificar módulo activo
  const m = modules.find(x => x.id === route);

  if (!m) return;

  // Práctica interactiva
  if (tab === 'practica') {

    // Seleccionar respuesta
    document.querySelectorAll('[data-choice]').forEach(el =>
      el.addEventListener('click', () => {
        selected = Number(el.dataset.choice);

        document.querySelectorAll('[data-choice]').forEach(x =>
          x.classList.toggle('selected', x === el)
        );

        document.getElementById('check').disabled = false;
      })
    );

    // Pregunta anterior
    document.getElementById('prev')?.addEventListener('click', () => {
      quizIndex--;
      selected = null;
      checked = false;
      render();
    });

    // Comprobar respuesta
    document.getElementById('check')?.addEventListener('click', () => {
      checked = true;

      if (selected === m.quiz[quizIndex].correct) {
        state[m.id] = Array.from(
          new Set([
            ...(state[m.id] || []),
            quizIndex
          ])
        );

        save();
      }

      render();
    });

    // Siguiente pregunta
    document.getElementById('next')?.addEventListener('click', () => {
      if (quizIndex === m.quiz.length - 1) {
        go('home');
        return;
      }

      quizIndex++;
      selected = null;
      checked = false;
      render();
    });
  }

  // Laboratorio interactivo
  if (tab === 'herramienta') {
    document.querySelectorAll('.field input').forEach(el =>
      el.addEventListener('input', () => calculate(m))
    );

    calculate(m);
  }
}


  /* ---------- Menú, tema y rutas ---------- */
  menuBtn.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  document.getElementById('theme').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('fisica-theme',
        document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    } catch {}
  });

  try {
    if (localStorage.getItem('fisica-theme') === 'dark') document.documentElement.classList.add('dark');
  } catch {}

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (id !== route && !(id === 'inicio' && route === 'home')) {
      route = modules.some(m => m.id === id) ? id : 'home';
      tab = 'teoria';
      render();
    }
  });

  route = modules.some(m => m.id === location.hash.slice(1)) ? location.hash.slice(1) : 'home';
  render();
})();
