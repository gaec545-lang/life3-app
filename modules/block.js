// modules/block.js
const BlockModule = {
  currentBlock: null,
  currentTab: 'explain',
  currentExampleIndex: 0,
  
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
      <div style="margin-bottom: 20px;" class="flex-between">
        <button onclick="window.location.hash='#dashboard'" style="background:none; color:var(--text-secondary); font-size:1.2rem;">← Volver</button>
        ${tab === 'practice' ? `<button onclick="BlockModule.showRulesDrawer()" style="background:none; color:var(--accent-blue); font-size:1.1rem; display:flex; align-items:center; gap:5px;"><span class="ai-badge">AI</span> Reglas</button>` : ''}
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
    
    if (tab === 'practice' && this.hearts > 0 && this.currentExerciseIndex < this.practiceExercises.length) {
      this.setupPracticeInteractions();
    }
  },

  showRulesDrawer() {
     const exp = this.currentBlock.explain;
     const rulesHtml = `
       <h2 style="margin-bottom: 20px;">Reglas: ${this.currentBlock.title}</h2>
       ${exp.rules.map(r => `
          <div style="margin-bottom: 15px; border-bottom: 1px solid var(--border); padding-bottom: 15px;">
            <div class="rule-formula" style="margin-bottom:5px;">${r.formula}</div>
            <div style="color:var(--text-secondary); font-size:0.9rem;">Ej: ${r.example}</div>
          </div>
        `).join('')}
       <h3 style="color:var(--accent-red); margin-top:20px;">Excepciones</h3>
       <ul style="padding-left: 20px; color:var(--text-secondary); margin-top:10px;">
          ${exp.exceptions.map(e => `<li style="margin-bottom:5px;">${e}</li>`).join('')}
       </ul>
     `;
     App.openDrawer(rulesHtml);
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
      <div style="margin-bottom: 30px;">
        <span style="background:rgba(255,255,255,0.1); padding:6px 12px; border-radius:12px; font-size:0.85rem; color:var(--text-secondary); font-weight:600;">${this.currentBlock.unit}</span>
        <h1 style="font-size:2.2rem; margin:15px 0;">${this.currentBlock.title}</h1>
        <p style="color:var(--text-secondary); font-size:1.15rem;">${exp.description}</p>
      </div>

      <div class="explain-card yellow glass">
        <h3 style="margin-bottom: 20px;">¿Cuándo se usa?</h3>
        ${exp.whenToUse.map(u => `
          <div style="display:flex; gap:15px; margin-bottom:20px; align-items:center;">
            <div style="font-size:1.8rem; background:rgba(0,0,0,0.2); width:50px; height:50px; border-radius:12px; display:flex; align-items:center; justify-content:center;">${u.icon}</div>
            <div>
              <div style="font-weight:600; font-size:1.1rem;">${u.label}</div>
              <div style="color:var(--text-secondary); font-family:'JetBrains Mono', monospace; font-size:0.95rem; margin-top:4px;">${u.example}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="explain-card glass">
        <h3 style="margin-bottom: 20px;">Reglas Gramaticales</h3>
        ${exp.rules.map(r => `
          <div style="margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 20px;">
            <div class="rule-formula" style="margin-bottom:8px;">${r.formula}</div>
            <div style="color:var(--text-secondary); font-family:'JetBrains Mono', monospace;">Ej: ${r.example}</div>
          </div>
        `).join('')}
      </div>

      <div class="explain-card red glass">
        <h3 style="margin-bottom: 15px; color:var(--accent-red);">¡Atención! Excepciones</h3>
        <ul style="list-style-type:disc; padding-left:20px; color:var(--text-secondary); font-size:1.05rem;">
          ${exp.exceptions.map(e => `<li style="margin-bottom:8px;">${e}</li>`).join('')}
        </ul>
      </div>

      <button class="action-btn primary" onclick="window.location.hash='#block/${this.currentBlock.id}?tab=examples'">Ver Ejemplos →</button>
    `;
    return html;
  },

  renderExamples() {
    const ex = this.currentBlock.examples[this.currentExampleIndex];
    const total = this.currentBlock.examples.length;
    
    let highlightedEn = "";
    if (ex) {
      highlightedEn = ex.en.replace(ex.highlight, `<span class="highlight">${ex.highlight}</span>`);
    }

    let html = `
      ${ex ? `
      <div class="example-card">
        <div class="example-en">${highlightedEn}</div>
        <div class="example-es">${ex.es}</div>
      </div>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
        <button class="action-btn" style="width:auto; padding:12px 20px;" onclick="BlockModule.prevExample()" ${this.currentExampleIndex === 0 ? 'disabled' : ''}>← Anterior</button>
        <span style="color:var(--text-secondary); font-weight:600;">${this.currentExampleIndex + 1} / ${total}</span>
        <button class="action-btn" style="width:auto; padding:12px 20px;" onclick="BlockModule.nextExample()" ${this.currentExampleIndex === total - 1 ? 'disabled' : ''}>Siguiente →</button>
      </div>
      ` : '<div>Generando...</div>'}

      <div style="margin-top:40px; text-align:center;">
        <button class="action-btn" style="background:var(--bg-card); border:1px dashed var(--accent-blue); color:var(--accent-blue);" onclick="BlockModule.generateAIExamples()">
           <span class="ai-badge">AI</span> Generar más ejemplos
        </button>
      </div>
      
      ${(this.currentExampleIndex === total - 1 || this.currentExampleIndex > 5) ? `
        <button class="action-btn primary" style="margin-top:20px;" onclick="window.location.hash='#block/${this.currentBlock.id}?tab=practice'">¡Ir a Practicar! →</button>
      ` : ''}
    `;
    return html;
  },

  async generateAIExamples() {
     const rulesTxt = this.currentBlock.explain.rules.map(r => r.formula).join(", ");
     App.openBottomSheet(`
       <div style="text-align:center;">
         <div class="ai-loader" style="margin-bottom:15px; border-top-color:var(--accent-blue);"></div>
         <h3 style="color:var(--accent-blue);">La IA está pensando...</h3>
         <p style="color:var(--text-secondary);">Generando ejemplos frescos para ti.</p>
       </div>
     `, false);

     const newExamples = await AITutor.generateMoreExamples(this.currentBlock.title, this.currentBlock.explain.description, rulesTxt);
     
     App.closeBottomSheet();
     
     if (newExamples && newExamples.length > 0) {
       this.currentBlock.examples.push(...newExamples);
       this.currentExampleIndex++; // Move to first new example
       this.render(this.currentBlock.id, 'examples');
     } else {
       alert("Hubo un error al generar ejemplos. Intenta de nuevo.");
     }
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
    this.practiceExercises = [...this.currentBlock.exercises].sort(() => Math.random() - 0.5);
    this.currentExerciseIndex = 0;
    this.hearts = 3;
    this.sessionXP = 0;
    this.correctAnswers = 0;
  },

  renderPractice() {
    if (this.hearts <= 0) {
      return `
        <div class="example-card" style="margin-top: 50px;">
          <div style="font-size: 4rem; filter:grayscale(1);">💔</div>
          <h2 style="margin: 20px 0;">¡Te has quedado sin vidas!</h2>
          <p style="color:var(--text-secondary); margin-bottom: 30px;">Repasa la lección e inténtalo de nuevo.</p>
          <button class="action-btn primary" onclick="BlockModule.initPractice(); BlockModule.render(${this.currentBlock.id}, 'practice')">Reintentar Práctica</button>
        </div>
      `;
    }

    if (this.currentExerciseIndex >= this.practiceExercises.length) {
      setTimeout(() => this.finishPractice(), 100);
      return `<div style="text-align:center; padding:50px;"><div class="ai-loader"></div></div>`;
    }

    const ex = this.practiceExercises[this.currentExerciseIndex];
    const progress = (this.currentExerciseIndex / this.practiceExercises.length) * 100;

    let html = `
      <div class="practice-header">
        <div style="flex:1; margin-right: 30px;">
          <div class="progress-bar" style="margin-top:0;">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="hearts">${'❤️'.repeat(this.hearts)}</div>
      </div>
      
      <div class="exercise-container glass" id="ex-container">
        <div class="question-text">${ex.question}</div>
    `;

    if (ex.type === 'multiple-choice' || ex.type === 'error-detection') {
      html += `<div class="options-grid">`;
      ex.options.forEach((opt, idx) => {
        html += `<button class="option-btn" onclick="BlockModule.checkAnswerIndex(${idx})">${opt}</button>`;
      });
      html += `</div>`;
    } else if (ex.type === 'fill-blank' || ex.type === 'translation') {
      html += `
        <div style="margin-top:auto;">
          <input type="text" class="text-input" id="text-answer" placeholder="Escribe tu respuesta aquí..." autocomplete="off">
          <button class="action-btn primary" onclick="BlockModule.checkTextAnswer()">Verificar</button>
        </div>
      `;
    } else if (ex.type === 'word-order') {
      const words = [...ex.words].sort(() => Math.random() - 0.5);
      html += `
        <div style="margin-top:auto;">
          <div class="word-drop" id="word-drop"></div>
          <div class="word-bank" id="word-bank">
            ${words.map(w => `<div class="word-chip" data-word="${w}">${w}</div>`).join('')}
          </div>
          <button class="action-btn primary" onclick="BlockModule.checkOrderAnswer()">Verificar</button>
        </div>
      `;
    } else if (ex.type === 'matching') {
      html += `
        <div style="margin-top:auto;">
          <div style="display:flex; justify-content:space-between; gap:20px;">
            <div style="flex:1; display:flex; flex-direction:column; gap:10px;" id="match-left">
              ${[...ex.pairs].sort(()=>Math.random()-0.5).map((p, i) => `<button class="option-btn match-btn-l" onclick="BlockModule.selectMatch('left', this)">${p.left}</button>`).join('')}
            </div>
            <div style="flex:1; display:flex; flex-direction:column; gap:10px;" id="match-right">
              ${[...ex.pairs].sort(()=>Math.random()-0.5).map((p, i) => `<button class="option-btn match-btn-r" onclick="BlockModule.selectMatch('right', this)">${p.right}</button>`).join('')}
            </div>
          </div>
          <button class="action-btn primary" style="margin-top:20px;" onclick="BlockModule.checkMatchAnswer()">Verificar</button>
        </div>
      `;
    }

    html += `</div>`;
    return html;
  },

  setupPracticeInteractions() {
    const ex = this.practiceExercises[this.currentExerciseIndex];
    if (ex.type === 'fill-blank' || ex.type === 'translation') {
      const input = document.getElementById('text-answer');
      if (input) {
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.checkTextAnswer(); });
        input.focus();
      }
    } else if (ex.type === 'word-order') {
      const bank = document.getElementById('word-bank');
      const drop = document.getElementById('word-drop');
      document.querySelectorAll('.word-chip').forEach(chip => {
        chip.addEventListener('click', function() {
          if (this.parentElement.id === 'word-bank') drop.appendChild(this);
          else bank.appendChild(this);
        });
      });
    } else if (ex.type === 'matching') {
       this.matchState = { left: null, matches: [] };
    }
  },

  selectMatch(side, el) {
     if (side === 'left') {
       document.querySelectorAll('.match-btn-l').forEach(b => b.style.borderColor = 'var(--border)');
       el.style.borderColor = 'var(--accent-blue)';
       this.matchState.left = el;
     } else if (side === 'right' && this.matchState.left) {
       const l = this.matchState.left;
       l.style.borderColor = 'var(--accent-green)';
       el.style.borderColor = 'var(--accent-green)';
       l.disabled = true;
       el.disabled = true;
       this.matchState.matches.push({ leftText: l.innerText, rightText: el.innerText });
       this.matchState.left = null;
     }
  },

  checkMatchAnswer() {
    const ex = this.practiceExercises[this.currentExerciseIndex];
    if (this.matchState.matches.length !== ex.pairs.length) {
       return; // Must connect all
    }
    
    let isCorrect = true;
    for (let m of this.matchState.matches) {
       const pair = ex.pairs.find(p => p.left === m.leftText);
       if (!pair || pair.right !== m.rightText) { isCorrect = false; break; }
    }
    this.processAnswer(isCorrect, "matching", "matching");
  },

  checkTextAnswer() {
    const input = document.getElementById('text-answer').value.trim();
    const inputLower = input.toLowerCase();
    const ex = this.practiceExercises[this.currentExerciseIndex];
    
    let isCorrect = false;
    if (ex.accepted) {
      isCorrect = ex.accepted.map(a => a.toLowerCase().replace(/[.,!?]/g, '')).includes(inputLower.replace(/[.,!?]/g, ''));
    } else {
      isCorrect = inputLower === ex.answer.toLowerCase();
    }
    this.processAnswer(isCorrect, input, ex.answer);
  },

  checkOrderAnswer() {
    const drop = document.getElementById('word-drop');
    const words = Array.from(drop.children).map(c => c.dataset.word).join(' ');
    const ex = this.practiceExercises[this.currentExerciseIndex];
    this.processAnswer(words === ex.answer, words, ex.answer);
  },

  checkAnswerIndex(idx) {
    const ex = this.practiceExercises[this.currentExerciseIndex];
    const answer = ex.options[idx];
    this.processAnswer(answer === ex.answer, answer, ex.answer);
  },

  async processAnswer(isCorrect, userAnswer, correctAnswer) {
    const container = document.getElementById('ex-container');
    const buttons = container.querySelectorAll('button');
    buttons.forEach(b => b.style.pointerEvents = 'none');
    
    if (isCorrect) {
      container.classList.add('shake-correct');
      this.sessionXP += 10;
      this.correctAnswers++;
      
      const bsHtml = `
        <h2 style="color:#a7f3d0; margin-bottom:10px;">¡Excelente! ✅</h2>
        <p style="color:#d1fae5; font-size:1.1rem; margin-bottom:20px;">Respuesta correcta.</p>
        <button class="action-btn" style="background:#059669; color:white; border:none; font-weight:700;" onclick="App.closeBottomSheet()">Continuar</button>
      `;
      App.onBottomSheetClose = () => this.nextExercise();
      App.openBottomSheet(bsHtml, true);

    } else {
      container.classList.add('shake-wrong');
      this.hearts--;
      document.querySelector('.hearts').innerHTML = '❤️'.repeat(this.hearts);
      
      const ex = this.practiceExercises[this.currentExerciseIndex];
      
      // Loading state in bottom sheet
      App.openBottomSheet(`
        <h2 style="color:#fecdd3; margin-bottom:10px;">Respuesta Incorrecta ❌</h2>
        <p style="color:#ffe4e6; font-size:1.1rem; margin-bottom:15px;">Correcto: <strong>${correctAnswer}</strong></p>
        <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:16px; display:flex; align-items:center; gap:15px;">
           <div class="ai-loader"></div>
           <span style="color:#fda4af;">El Tutor AI está analizando tu error...</span>
        </div>
      `, false);

      // Call AI
      const explanation = await AITutor.explainError(this.currentBlock.title, ex.question, userAnswer, correctAnswer);
      
      // Update sheet
      const finalBsHtml = `
        <h2 style="color:#fecdd3; margin-bottom:10px;">Respuesta Incorrecta ❌</h2>
        <p style="color:#ffe4e6; font-size:1.1rem; margin-bottom:20px;">Correcto: <strong>${correctAnswer}</strong></p>
        
        <div class="ai-explanation" style="background:rgba(0,0,0,0.3); border-color:#f43f5e; color:#fecdd3;">
          <div style="margin-bottom:10px;"><span class="ai-badge" style="background:linear-gradient(90deg, #f43f5e, #fb7185);">AI Tutor</span></div>
          ${explanation}
        </div>
        
        <button class="action-btn" style="background:#e11d48; color:white; border:none; font-weight:700;" onclick="App.closeBottomSheet()">Entendido</button>
      `;
      
      // Prevent updating if sheet was already closed by impatient user
      const sheet = document.getElementById('bottom-sheet');
      if (sheet.classList.contains('show') && sheet.classList.contains('wrong')) {
         document.getElementById('bs-content').innerHTML = finalBsHtml;
      }
      
      App.onBottomSheetClose = () => this.nextExercise();
    }
  },

  nextExercise() {
    this.currentExerciseIndex++;
    this.render(this.currentBlock.id, 'practice');
  },

  finishPractice() {
    const total = this.practiceExercises.length;
    const accuracy = Math.round((this.correctAnswers / total) * 100);
    
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
