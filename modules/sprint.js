// modules/sprint.js
const SprintModule = {
  selectedBlocks: [],
  exercises: [],
  currentIndex: 0,
  correctCount: 0,
  timeLeft: 600, // 10 minutes
  timerInterval: null,
  isSetup: true,
  xpEarned: 0,
  isPaused: false,

  render() {
    if (this.isSetup) {
      this.renderSetup();
    } else {
      this.renderSprint();
    }
  },

  renderSetup() {
    const unlockedBlocks = Object.entries(App.data.blocks).filter(([id, b]) => b.status !== 'locked');
    
    if (unlockedBlocks.length < 2) {
      document.getElementById('sprint').innerHTML = `
        <div class="example-card" style="margin-top:50px;">
          <h2>No tienes suficientes bloques desbloqueados</h2>
          <p style="color:var(--text-secondary); margin: 15px 0 30px 0;">Necesitas al menos 2 bloques para jugar Sprint.</p>
          <button class="action-btn primary" onclick="window.location.hash='#dashboard'">Volver</button>
        </div>
      `;
      return;
    }

    let html = `
      <div style="text-align:center;">
        <h1 style="color:var(--accent-orange); font-size:3rem; margin-top:20px;">⚡ Sprint 10 Minutos</h1>
        <p style="color:var(--text-secondary); font-size:1.15rem; margin-top:10px;">Practica todo lo aprendido contrarreloj.</p>
        
        <div class="glass" style="padding:30px; border-radius:var(--radius-lg); text-align:left; margin-top:40px;">
          <h3 style="margin-bottom: 20px;">Selecciona los bloques a incluir (mín. 2)</h3>
          <div class="checkbox-grid" style="display:grid; gap:15px;">
            ${unlockedBlocks.map(([id, b]) => `
              <label class="checkbox-item" style="background:rgba(0,0,0,0.2); padding:20px; border-radius:var(--radius-md); display:flex; align-items:center; gap:15px; cursor:pointer; border:1px solid var(--border);">
                <input type="checkbox" value="${id}" class="sprint-block-cb" checked style="width:24px; height:24px; accent-color:var(--accent-orange);">
                <span style="font-size:1.1rem; font-weight:500;">B${id}: ${BLOCKS[id].title}</span>
              </label>
            `).join('')}
          </div>
        </div>
        
        <button class="action-btn sprint" onclick="SprintModule.startSprint()">¡Empezar Sprint!</button>
        <button class="action-btn" style="margin-top:15px; background:transparent;" onclick="window.location.hash='#dashboard'">Cancelar</button>
      </div>
    `;
    
    document.getElementById('sprint').innerHTML = html;
  },

  startSprint() {
    const checkboxes = document.querySelectorAll('.sprint-block-cb:checked');
    if (checkboxes.length < 2) {
      alert('Selecciona al menos 2 bloques.');
      return;
    }
    
    this.selectedBlocks = Array.from(checkboxes).map(cb => cb.value);
    
    this.exercises = [];
    this.selectedBlocks.forEach(id => {
      const blockExs = [...BLOCKS[id].exercises].sort(() => Math.random() - 0.5).slice(0, 5); 
      blockExs.forEach(ex => {
        this.exercises.push({ ...ex, blockId: id });
      });
    });
    
    this.exercises.sort(() => Math.random() - 0.5); 
    
    this.currentIndex = 0;
    this.correctCount = 0;
    this.xpEarned = 0;
    this.timeLeft = 600;
    this.isSetup = false;
    this.isPaused = false;
    
    this.startTimer();
    this.render();
  },

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.isPaused) return;

      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        clearInterval(this.timerInterval);
        this.finishSprint();
      } else {
        const timerEl = document.getElementById('sprint-timer');
        if (timerEl) {
          timerEl.innerText = this.formatTime(this.timeLeft);
          if (this.timeLeft < 120) timerEl.style.color = 'var(--accent-red)';
          else timerEl.style.color = '';
        }
      }
    }, 1000);
  },

  formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  },

  renderSprint() {
    if (this.currentIndex >= this.exercises.length) {
      this.finishSprint();
      return;
    }

    const ex = this.exercises[this.currentIndex];
    
    let html = `
      <div style="font-family:'JetBrains Mono', monospace; font-size:3.5rem; font-weight:800; text-align:center; margin-bottom:20px; text-shadow: 0 0 20px rgba(255,255,255,0.2);" id="sprint-timer">${this.formatTime(this.timeLeft)}</div>
      
      <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:1.1rem; font-weight:600;">
        <span style="color:var(--accent-orange);">⚡ XP: ${this.xpEarned}</span>
        <span style="color:var(--text-secondary);">Ej: ${this.currentIndex + 1} / ${this.exercises.length}</span>
      </div>

      <div class="exercise-container glass" id="sprint-container">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
           <span style="background:rgba(56,189,248,0.1); color:var(--accent-blue); padding:6px 12px; border-radius:12px; font-size:0.85rem; font-weight:600;">B${ex.blockId}: ${BLOCKS[ex.blockId].title}</span>
           <button onclick="SprintModule.showRulesDrawer(${ex.blockId})" style="background:none; color:var(--accent-blue); font-size:0.9rem; display:flex; align-items:center; gap:5px;"><span class="ai-badge">AI</span> Ayuda</button>
        </div>
        <div class="question-text">${ex.question}</div>
    `;

    if (ex.type === 'multiple-choice' || ex.type === 'error-detection') {
      html += `<div class="options-grid">`;
      ex.options.forEach((opt, idx) => {
        html += `<button class="option-btn" onclick="SprintModule.checkAnswerIndex(${idx})">${opt}</button>`;
      });
      html += `</div>`;
    } else if (ex.type === 'fill-blank' || ex.type === 'translation') {
      html += `
        <div style="margin-top:auto;">
          <input type="text" class="text-input" id="sprint-text" placeholder="Respuesta..." autocomplete="off">
          <button class="action-btn sprint" onclick="SprintModule.checkTextAnswer()">Verificar</button>
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
           <button class="action-btn sprint" onclick="SprintModule.checkOrderAnswer()">Verificar</button>
         </div>
       `;
    } else if (ex.type === 'matching') {
       html += `
         <div style="margin-top:auto;">
           <div style="display:flex; justify-content:space-between; gap:20px;">
             <div style="flex:1; display:flex; flex-direction:column; gap:10px;" id="match-left">
               ${[...ex.pairs].sort(()=>Math.random()-0.5).map((p, i) => `<button class="option-btn match-btn-l" onclick="SprintModule.selectMatch('left', this)">${p.left}</button>`).join('')}
             </div>
             <div style="flex:1; display:flex; flex-direction:column; gap:10px;" id="match-right">
               ${[...ex.pairs].sort(()=>Math.random()-0.5).map((p, i) => `<button class="option-btn match-btn-r" onclick="SprintModule.selectMatch('right', this)">${p.right}</button>`).join('')}
             </div>
           </div>
           <button class="action-btn sprint" style="margin-top:20px;" onclick="SprintModule.checkMatchAnswer()">Verificar</button>
         </div>
       `;
    }

    html += `</div>`;
    document.getElementById('sprint').innerHTML = html;
    this.setupInteractions(ex);
  },

  showRulesDrawer(blockId) {
     this.isPaused = true;
     const block = BLOCKS[blockId];
     const exp = block.explain;
     const rulesHtml = `
       <h2 style="margin-bottom: 20px;">Reglas: ${block.title}</h2>
       ${exp.rules.map(r => `
          <div style="margin-bottom: 15px; border-bottom: 1px solid var(--border); padding-bottom: 15px;">
            <div class="rule-formula" style="margin-bottom:5px;">${r.formula}</div>
            <div style="color:var(--text-secondary); font-size:0.9rem;">Ej: ${r.example}</div>
          </div>
        `).join('')}
       <div style="margin-top:30px; text-align:center;">
          <button class="action-btn primary" onclick="SprintModule.closeRulesDrawer()">Volver al Sprint</button>
       </div>
     `;
     App.openDrawer(rulesHtml);
  },

  closeRulesDrawer() {
     App.closeDrawer();
     this.isPaused = false;
  },

  setupInteractions(ex) {
     if (ex.type === 'fill-blank' || ex.type === 'translation') {
       const input = document.getElementById('sprint-text');
       if(input) {
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
     if (el.classList.contains('matched')) {
       const text = el.innerText;
       const matchIndex = this.matchState.matches.findIndex(m => m.leftText === text || m.rightText === text);
       if (matchIndex !== -1) {
         const pair = this.matchState.matches[matchIndex];
         document.querySelectorAll('.option-btn').forEach(btn => {
           if (btn.innerText === pair.leftText || btn.innerText === pair.rightText) {
             btn.classList.remove('matched');
             btn.disabled = false;
           }
         });
         this.matchState.matches.splice(matchIndex, 1);
       }
       return;
     }

     if (side === 'left') {
       document.querySelectorAll('.match-btn-l').forEach(b => b.classList.remove('selected'));
       el.classList.add('selected');
       this.matchState.left = el;
     } else if (side === 'right' && this.matchState.left) {
       const l = this.matchState.left;
       l.classList.remove('selected');
       l.classList.add('matched');
       el.classList.add('matched');
       l.disabled = true;
       el.disabled = true;
       this.matchState.matches.push({ leftText: l.innerText, rightText: el.innerText });
       this.matchState.left = null;
     }
  },

  checkMatchAnswer() {
    const ex = this.exercises[this.currentIndex];
    if (this.matchState.matches.length !== ex.pairs.length) return;
    
    let isCorrect = true;
    const userPairsStr = this.matchState.matches.map(m => `${m.leftText} : ${m.rightText}`).join(' | ');
    const correctPairsStr = ex.pairs.map(p => `${p.left} : ${p.right}`).join(' | ');

    for (let m of this.matchState.matches) {
       const pair = ex.pairs.find(p => App.normalize(p.left) === App.normalize(m.leftText));
       if (!pair || App.normalize(pair.right) !== App.normalize(m.rightText)) { isCorrect = false; break; }
    }
    this.processAnswer(isCorrect, `Pares elegidos: ${userPairsStr}`, `Pares correctos: ${correctPairsStr}`);
  },

  checkAnswerIndex(idx) {
    const ex = this.exercises[this.currentIndex];
    const answer = ex.options[idx];
    this.processAnswer(App.normalize(answer) === App.normalize(ex.answer), answer, ex.answer);
  },

  checkTextAnswer() {
    const input = document.getElementById('sprint-text').value;
    const ex = this.exercises[this.currentIndex];
    
    let isCorrect = false;
    const normInput = App.normalize(input);
    if (ex.accepted) {
      isCorrect = ex.accepted.some(a => App.normalize(a) === normInput);
    } else {
      isCorrect = normInput === App.normalize(ex.answer);
    }
    this.processAnswer(isCorrect, input, ex.answer);
  },

  checkOrderAnswer() {
    const drop = document.getElementById('word-drop');
    const words = Array.from(drop.children).map(c => c.dataset.word).join(' ');
    const ex = this.exercises[this.currentIndex];
    this.processAnswer(App.normalize(words) === App.normalize(ex.answer), words, ex.answer);
  },

  async processAnswer(isCorrect, userAnswer, correctAnswer) {
    const container = document.getElementById('sprint-container');
    const buttons = container.querySelectorAll('button');
    buttons.forEach(b => b.style.pointerEvents = 'none');
    
    if (isCorrect) {
      container.classList.add('shake-correct');
      this.correctCount++;
      this.xpEarned += 15;
      
      const bsHtml = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
           <div>
             <h2 style="color:#a7f3d0; margin-bottom:5px;">¡Correcto! ⚡</h2>
             <p style="color:#d1fae5;">+15 XP</p>
           </div>
           <button class="action-btn" style="background:#059669; color:white; border:none; width:auto; padding:12px 30px;" onclick="App.closeBottomSheet()">Siguiente</button>
        </div>
      `;
      this.isPaused = true;
      App.onBottomSheetClose = () => {
         this.isPaused = false;
         this.currentIndex++;
         this.render();
      };
      App.openBottomSheet(bsHtml, true);
      
      // Auto-close correct after 1.5s to keep sprint fast if user doesn't click
      this.autoCloseTimeout = setTimeout(() => {
         if(document.getElementById('bottom-sheet').classList.contains('show')) {
            App.closeBottomSheet();
         }
      }, 1500);

    } else {
      container.classList.add('shake-wrong');
      this.timeLeft = Math.max(0, this.timeLeft - 5); // Penalty
      
      this.isPaused = true; // Pause for AI
      const ex = this.exercises[this.currentIndex];
      const blockTitle = BLOCKS[ex.blockId].title;
      
      App.openBottomSheet(`
        <h2 style="color:#fecdd3; margin-bottom:10px;">¡Penalización! -5s ⏱️</h2>
        <p style="color:#ffe4e6; font-size:1.1rem; margin-bottom:15px;">Correcto: <strong>${correctAnswer}</strong></p>
        <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:16px; display:flex; align-items:center; gap:15px;">
           <div class="ai-loader"></div>
           <span style="color:#fda4af;">Analizando error...</span>
        </div>
      `, false);

      const explanation = await AITutor.explainError(blockTitle, ex.question, userAnswer, correctAnswer);
      
      const finalBsHtml = `
        <h2 style="color:#fecdd3; margin-bottom:10px;">¡Penalización! -5s ⏱️</h2>
        <p style="color:#ffe4e6; font-size:1.1rem; margin-bottom:20px;">Correcto: <strong>${correctAnswer}</strong></p>
        
        <div class="ai-explanation" style="background:rgba(0,0,0,0.3); border-color:#f43f5e; color:#fecdd3;">
          <div style="margin-bottom:10px;"><span class="ai-badge" style="background:linear-gradient(90deg, #f43f5e, #fb7185);">AI Tutor</span></div>
          ${explanation}
        </div>
        
        <button class="action-btn" style="background:#e11d48; color:white; border:none; font-weight:700;" onclick="App.closeBottomSheet()">Entendido y Continuar</button>
      `;
      
      const sheet = document.getElementById('bottom-sheet');
      if (sheet.classList.contains('show')) {
         document.getElementById('bs-content').innerHTML = finalBsHtml;
      }
      
      App.onBottomSheetClose = () => {
         clearTimeout(this.autoCloseTimeout);
         this.isPaused = false;
         this.currentIndex++;
         this.render();
      };
    }
  },

  finishSprint() {
    clearInterval(this.timerInterval);
    this.isSetup = true;
    
    const accuracy = this.exercises.length > 0 ? Math.round((this.correctCount / this.exercises.length) * 100) : 0;
    
    ResultsModule.setResultsData({
      type: 'sprint',
      accuracy: accuracy,
      xp: this.xpEarned + 50,
      correct: this.correctCount,
      total: this.exercises.length
    });
    
    window.location.hash = '#results';
  }
};
