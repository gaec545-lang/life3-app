// modules/block.js
const BlockModule = {
  currentBlock: null,
  currentTab: 'explain',
  currentExampleIndex: 0,
  
  // Practice state
  practiceExercises: [],
  currentExerciseIndex: 0,
  hearts: 3,
  sessionXP: 0,
  correctAnswers: 0,

  render(blockId, tab) {
    this.currentBlock = BLOCKS[blockId];
    if (!this.currentBlock) {
      window.location.hash = '#dashboard';
      return;
    }
    
    this.currentTab = tab;
    
    if (tab === 'practice' && this.practiceExercises.length === 0) {
      this.initPractice();
    }
    
    const html = `
      <div style="margin-bottom: 20px;">
        <button onclick="window.location.hash='#dashboard'" style="background:none; color:var(--text-secondary); font-size:1.2rem;">← Volver</button>
      </div>
      
      <div class="tabs">
        <div class="tab ${tab === 'explain' ? 'active' : ''}" onclick="window.location.hash='#block/${blockId}?tab=explain'">📖 Explicación</div>
        <div class="tab ${tab === 'examples' ? 'active' : ''}" onclick="window.location.hash='#block/${blockId}?tab=examples'">💡 Ejemplos</div>
        <div class="tab ${tab === 'practice' ? 'active' : ''}" onclick="window.location.hash='#block/${blockId}?tab=practice'">🎯 Práctica</div>
      </div>
      
      <div id="tab-content">
        ${this.renderTabContent()}
      </div>
    `;
    
    document.getElementById('block').innerHTML = html;
    
    // Setup practice interactions if needed
    if (tab === 'practice' && this.hearts > 0 && this.currentExerciseIndex < this.practiceExercises.length) {
      this.setupPracticeInteractions();
    }
  },

  renderTabContent() {
    if (this.currentTab === 'explain') return this.renderExplain();
    if (this.currentTab === 'examples') return this.renderExamples();
    if (this.currentTab === 'practice') return this.renderPractice();
    return '';
  },

  renderExplain() {
    const exp = this.currentBlock.explain;
    let html = `
      <div style="margin-bottom: 20px;">
        <span style="background:var(--bg-elevated); padding:5px 10px; border-radius:10px; font-size:0.8rem; color:var(--text-secondary);">${this.currentBlock.unit}</span>
        <h1 style="font-size:2rem; margin:10px 0;">${this.currentBlock.title}</h1>
        <p style="color:var(--text-secondary); font-size:1.1rem;">${exp.description}</p>
      </div>

      <div class="explain-card yellow">
        <h3 style="margin-bottom: 15px;">¿Cuándo se usa?</h3>
        ${exp.whenToUse.map(u => `
          <div style="display:flex; gap:15px; margin-bottom:15px; align-items:center;">
            <div style="font-size:1.5rem;">${u.icon}</div>
            <div>
              <div style="font-weight:600;">${u.label}</div>
              <div style="color:var(--text-secondary); font-family:'JetBrains Mono', monospace; font-size:0.9rem;">${u.example}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="explain-card">
        <h3 style="margin-bottom: 15px;">Reglas Gramaticales</h3>
        ${exp.rules.map(r => `
          <div class="rule-item">
            <div class="rule-formula">${r.formula}</div>
            <div style="color:var(--text-secondary); font-family:'JetBrains Mono', monospace; margin-top:5px;">Ej: ${r.example}</div>
          </div>
        `).join('')}
      </div>

      <div class="explain-card red">
        <h3 style="margin-bottom: 10px; color:var(--accent-red);">¡Atención! Excepciones</h3>
        <ul style="list-style-type:disc; padding-left:20px; color:var(--text-secondary);">
          ${exp.exceptions.map(e => `<li style="margin-bottom:5px;">${e}</li>`).join('')}
        </ul>
      </div>

      <button class="action-btn" onclick="window.location.hash='#block/${this.currentBlock.id}?tab=examples'">Ver Ejemplos →</button>
    `;
    return html;
  },

  renderExamples() {
    const ex = this.currentBlock.examples[this.currentExampleIndex];
    const total = this.currentBlock.examples.length;
    
    // Highlight replacing
    const highlightedEn = ex.en.replace(ex.highlight, `<span class="highlight">${ex.highlight}</span>`);

    let html = `
      <div class="example-card">
        <div class="example-en">${highlightedEn}</div>
        <div class="example-es">${ex.es}</div>
      </div>
      
      <div class="example-nav">
        <button class="nav-btn" onclick="BlockModule.prevExample()" ${this.currentExampleIndex === 0 ? 'disabled style="opacity:0.5"' : ''}>← Anterior</button>
        <span style="color:var(--text-secondary);">${this.currentExampleIndex + 1} / ${total}</span>
        <button class="nav-btn" onclick="BlockModule.nextExample()" ${this.currentExampleIndex === total - 1 ? 'disabled style="opacity:0.5"' : ''}>Siguiente →</button>
      </div>
      
      ${this.currentExampleIndex === total - 1 ? `
        <button class="action-btn" onclick="window.location.hash='#block/${this.currentBlock.id}?tab=practice'">¡Ir a Practicar! →</button>
      ` : ''}
    `;
    return html;
  },

  prevExample() {
    if (this.currentExampleIndex > 0) {
      this.currentExampleIndex--;
      this.render(this.currentBlock.id, 'examples');
    }
  },

  nextExample() {
    if (this.currentExampleIndex < this.currentBlock.examples.length - 1) {
      this.currentExampleIndex++;
      this.render(this.currentBlock.id, 'examples');
    }
  },

  initPractice() {
    // Shuffle exercises
    this.practiceExercises = [...this.currentBlock.exercises].sort(() => Math.random() - 0.5);
    this.currentExerciseIndex = 0;
    this.hearts = 3;
    this.sessionXP = 0;
    this.correctAnswers = 0;
  },

  renderPractice() {
    if (this.hearts <= 0) {
      return `
        <div class="results-card" style="margin-top: 50px;">
          <div style="font-size: 4rem;">💔</div>
          <h2 style="margin: 20px 0;">¡Te has quedado sin vidas!</h2>
          <p style="color:var(--text-secondary); margin-bottom: 30px;">Repasa la lección e inténtalo de nuevo.</p>
          <button class="action-btn" onclick="BlockModule.initPractice(); BlockModule.render(${this.currentBlock.id}, 'practice')">Reintentar Práctica</button>
        </div>
      `;
    }

    if (this.currentExerciseIndex >= this.practiceExercises.length) {
      // Finished all exercises
      setTimeout(() => this.finishPractice(), 100);
      return `<div>Calculando resultados...</div>`;
    }

    const ex = this.practiceExercises[this.currentExerciseIndex];
    const progress = (this.currentExerciseIndex / this.practiceExercises.length) * 100;

    let html = `
      <div class="practice-header">
        <div style="flex:1; margin-right: 20px;">
          <div class="progress-bar" style="margin-top:0;">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="hearts">${'❤️'.repeat(this.hearts)}</div>
      </div>
      
      <div class="exercise-container" id="ex-container">
        <div class="question-text">${ex.question}</div>
    `;

    if (ex.type === 'multiple-choice' || ex.type === 'error-detection') {
      html += `<div class="options-grid">`;
      ex.options.forEach((opt, idx) => {
        html += `<button class="option-btn" onclick="BlockModule.checkAnswer('${opt.replace(/'/g, "\\'")}')">${opt}</button>`;
      });
      html += `</div>`;
    } else if (ex.type === 'fill-blank' || ex.type === 'translation') {
      html += `
        <input type="text" class="text-input" id="text-answer" placeholder="Escribe tu respuesta aquí..." autocomplete="off">
        <button class="verify-btn" onclick="BlockModule.checkTextAnswer()">Verificar</button>
      `;
    } else if (ex.type === 'word-order') {
      // shuffle words
      const words = [...ex.words].sort(() => Math.random() - 0.5);
      html += `
        <div class="word-drop" id="word-drop"></div>
        <div class="word-bank" id="word-bank">
          ${words.map(w => `<div class="word-chip" data-word="${w}">${w}</div>`).join('')}
        </div>
        <button class="verify-btn" onclick="BlockModule.checkOrderAnswer()">Verificar</button>
      `;
    } else if (ex.type === 'matching') {
      html += `
        <div style="display:flex; justify-content:space-between; gap:20px;">
          <div style="flex:1; display:flex; flex-direction:column; gap:10px;" id="match-left">
            ${[...ex.pairs].sort(()=>Math.random()-0.5).map((p, i) => `<button class="option-btn match-btn-l" data-id="${i}" onclick="BlockModule.selectMatch('left', this)">${p.left}</button>`).join('')}
          </div>
          <div style="flex:1; display:flex; flex-direction:column; gap:10px;" id="match-right">
            ${[...ex.pairs].sort(()=>Math.random()-0.5).map((p, i) => `<button class="option-btn match-btn-r" data-val="${p.right.replace(/'/g, "\\'")}" onclick="BlockModule.selectMatch('right', this)">${p.right}</button>`).join('')}
          </div>
        </div>
        <button class="verify-btn" style="margin-top:20px;" onclick="BlockModule.checkMatchAnswer()">Verificar</button>
      `;
    }

    html += `
      </div>
      <div id="feedback-bar" class="feedback-bar">
        <div id="feedback-msg"></div>
        <button class="action-btn" style="margin-top:10px;" onclick="BlockModule.nextExercise()">Continuar →</button>
      </div>
    `;

    return html;
  },

  setupPracticeInteractions() {
    const ex = this.practiceExercises[this.currentExerciseIndex];
    
    if (ex.type === 'fill-blank' || ex.type === 'translation') {
      const input = document.getElementById('text-answer');
      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') this.checkTextAnswer();
        });
        input.focus();
      }
    } else if (ex.type === 'word-order') {
      const bank = document.getElementById('word-bank');
      const drop = document.getElementById('word-drop');
      
      document.querySelectorAll('.word-chip').forEach(chip => {
        chip.addEventListener('click', function() {
          if (this.parentElement.id === 'word-bank') {
            drop.appendChild(this);
          } else {
            bank.appendChild(this);
          }
        });
      });
    } else if (ex.type === 'matching') {
       this.matchState = { left: null, matches: [] };
    }
  },

  selectMatch(side, el) {
     if (side === 'left') {
       document.querySelectorAll('.match-btn-l').forEach(b => b.style.borderColor = 'transparent');
       el.style.borderColor = 'var(--accent-blue)';
       this.matchState.left = el;
     } else if (side === 'right' && this.matchState.left) {
       // Pair them visually
       const l = this.matchState.left;
       const r = el;
       
       l.style.borderColor = 'var(--accent-green)';
       r.style.borderColor = 'var(--accent-green)';
       l.disabled = true;
       r.disabled = true;
       
       this.matchState.matches.push({
         leftText: l.innerText,
         rightText: r.innerText
       });
       
       this.matchState.left = null;
     }
  },

  checkMatchAnswer() {
    const ex = this.practiceExercises[this.currentExerciseIndex];
    if (this.matchState.matches.length !== ex.pairs.length) {
       this.showFeedback(false, "Conecta todos los pares primero.");
       return;
    }
    
    let isCorrect = true;
    for (let m of this.matchState.matches) {
       const pair = ex.pairs.find(p => p.left === m.leftText);
       if (!pair || pair.right !== m.rightText) {
          isCorrect = false;
          break;
       }
    }
    
    this.showFeedback(isCorrect, ex.feedback || (isCorrect ? "¡Excelente!" : "Hay errores en tus conexiones."));
  },

  checkTextAnswer() {
    const input = document.getElementById('text-answer').value.trim().toLowerCase();
    const ex = this.practiceExercises[this.currentExerciseIndex];
    
    let isCorrect = false;
    if (ex.accepted) {
      isCorrect = ex.accepted.map(a => a.toLowerCase().replace(/[.,!?]/g, '')).includes(input.replace(/[.,!?]/g, ''));
    } else {
      isCorrect = input === ex.answer.toLowerCase();
    }
    
    this.showFeedback(isCorrect, ex.feedback || (isCorrect ? "¡Correcto!" : `Incorrecto. La respuesta correcta era: ${ex.answer}`));
  },

  checkOrderAnswer() {
    const drop = document.getElementById('word-drop');
    const words = Array.from(drop.children).map(c => c.dataset.word).join(' ');
    const ex = this.practiceExercises[this.currentExerciseIndex];
    
    const isCorrect = words === ex.answer;
    this.showFeedback(isCorrect, ex.feedback || (isCorrect ? "¡Perfecto!" : `Incorrecto. Orden correcto: ${ex.answer}`));
  },

  checkAnswer(answer) {
    const ex = this.practiceExercises[this.currentExerciseIndex];
    const isCorrect = answer === ex.answer;
    
    this.showFeedback(isCorrect, ex.feedback || (isCorrect ? "¡Muy bien!" : `Incorrecto. La respuesta era: ${ex.answer}`));
  },

  showFeedback(isCorrect, msg) {
    const container = document.getElementById('ex-container');
    const feedbackBar = document.getElementById('feedback-bar');
    const feedbackMsg = document.getElementById('feedback-msg');
    
    // Disable inputs
    const buttons = container.querySelectorAll('button');
    buttons.forEach(b => b.style.pointerEvents = 'none');
    
    if (isCorrect) {
      container.classList.add('shake-correct');
      feedbackBar.className = 'feedback-bar correct';
      feedbackMsg.innerHTML = `✅ ${msg}`;
      this.sessionXP += 10;
      this.correctAnswers++;
      App.playSound('correct');
    } else {
      container.classList.add('shake-wrong');
      feedbackBar.className = 'feedback-bar incorrect';
      feedbackMsg.innerHTML = `❌ ${msg}`;
      this.hearts--;
      
      // Update hearts display
      document.querySelector('.hearts').innerHTML = '❤️'.repeat(this.hearts);
      App.playSound('wrong');
    }
  },

  nextExercise() {
    this.currentExerciseIndex++;
    this.render(this.currentBlock.id, 'practice');
  },

  finishPractice() {
    const total = this.practiceExercises.length;
    const accuracy = Math.round((this.correctAnswers / total) * 100);
    
    // Pass state to results
    ResultsModule.setResultsData({
      type: 'block',
      blockId: this.currentBlock.id,
      accuracy: accuracy,
      xp: this.sessionXP,
      correct: this.correctAnswers,
      total: total
    });
    
    window.location.hash = '#results';
  }
};
