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
        <div style="text-align:center; margin-top:50px;">
          <h2>No tienes suficientes bloques desbloqueados</h2>
          <p>Necesitas al menos 2 bloques para jugar Sprint.</p>
          <button class="action-btn" onclick="window.location.hash='#dashboard'">Volver</button>
        </div>
      `;
      return;
    }

    let html = `
      <div style="text-align:center;">
        <h1 style="color:var(--accent-orange); font-size:2.5rem;">⚡ Sprint 10 Minutos</h1>
        <p style="color:var(--text-secondary); font-size:1.1rem; margin-top:10px;">Practica todo lo aprendido contrarreloj.</p>
        
        <div style="background:var(--bg-card); padding:20px; border-radius:var(--radius-md); text-align:left; margin-top:30px;">
          <h3>Selecciona los bloques a incluir (mín. 2)</h3>
          <div class="checkbox-grid">
            ${unlockedBlocks.map(([id, b]) => `
              <label class="checkbox-item">
                <input type="checkbox" value="${id}" class="sprint-block-cb" checked>
                <span>B${id}: ${BLOCKS[id].title}</span>
              </label>
            `).join('')}
          </div>
        </div>
        
        <button class="action-btn" style="background:var(--accent-orange);" onclick="SprintModule.startSprint()">¡Empezar Sprint!</button>
        <button class="action-btn" style="background:var(--bg-elevated);" onclick="window.location.hash='#dashboard'">Cancelar</button>
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
    
    // Build exercise queue
    this.exercises = [];
    this.selectedBlocks.forEach(id => {
      // Get all exercises for block, maybe mix them
      const blockExs = [...BLOCKS[id].exercises].sort(() => Math.random() - 0.5).slice(0, 5); // take max 5 per block to avoid too long
      blockExs.forEach(ex => {
        this.exercises.push({ ...ex, blockId: id });
      });
    });
    
    this.exercises.sort(() => Math.random() - 0.5); // shuffle all
    
    this.currentIndex = 0;
    this.correctCount = 0;
    this.xpEarned = 0;
    this.timeLeft = 600;
    this.isSetup = false;
    
    this.startTimer();
    this.render();
  },

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        clearInterval(this.timerInterval);
        this.finishSprint();
      } else {
        const timerEl = document.getElementById('sprint-timer');
        if (timerEl) {
          timerEl.innerText = this.formatTime(this.timeLeft);
          if (this.timeLeft < 120) timerEl.classList.add('danger');
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
      <div class="timer-display ${this.timeLeft < 120 ? 'danger' : ''}" id="sprint-timer">${this.formatTime(this.timeLeft)}</div>
      
      <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
        <span style="color:var(--accent-orange); font-weight:bold;">⚡ XP: ${this.xpEarned}</span>
        <span style="color:var(--text-secondary);">Ej: ${this.currentIndex + 1} / ${this.exercises.length}</span>
      </div>

      <div class="exercise-container" id="sprint-container">
        <div style="font-size:0.8rem; color:var(--accent-blue); margin-bottom:10px;">B${ex.blockId}: ${BLOCKS[ex.blockId].title}</div>
        <div class="question-text">${ex.question}</div>
    `;

    // Same logic as block.js for inputs
    if (ex.type === 'multiple-choice' || ex.type === 'error-detection') {
      html += `<div class="options-grid">`;
      ex.options.forEach((opt) => {
        html += `<button class="option-btn" onclick="SprintModule.checkAnswer('${opt.replace(/'/g, "\\'")}')">${opt}</button>`;
      });
      html += `</div>`;
    } else if (ex.type === 'fill-blank' || ex.type === 'translation') {
      html += `
        <input type="text" class="text-input" id="sprint-text" placeholder="Respuesta..." autocomplete="off">
        <button class="verify-btn" onclick="SprintModule.checkTextAnswer()">Verificar</button>
      `;
    } else if (ex.type === 'word-order') {
       const words = [...ex.words].sort(() => Math.random() - 0.5);
       html += `
         <div class="word-drop" id="word-drop"></div>
         <div class="word-bank" id="word-bank">
           ${words.map(w => `<div class="word-chip" data-word="${w}">${w}</div>`).join('')}
         </div>
         <button class="verify-btn" onclick="SprintModule.checkOrderAnswer()">Verificar</button>
       `;
    } else if (ex.type === 'matching') {
       html += `
         <div style="display:flex; justify-content:space-between; gap:20px;">
           <div style="flex:1; display:flex; flex-direction:column; gap:10px;" id="match-left">
             ${[...ex.pairs].sort(()=>Math.random()-0.5).map((p, i) => `<button class="option-btn match-btn-l" data-id="${i}" onclick="SprintModule.selectMatch('left', this)">${p.left}</button>`).join('')}
           </div>
           <div style="flex:1; display:flex; flex-direction:column; gap:10px;" id="match-right">
             ${[...ex.pairs].sort(()=>Math.random()-0.5).map((p, i) => `<button class="option-btn match-btn-r" data-val="${p.right.replace(/'/g, "\\'")}" onclick="SprintModule.selectMatch('right', this)">${p.right}</button>`).join('')}
           </div>
         </div>
         <button class="verify-btn" style="margin-top:20px;" onclick="SprintModule.checkMatchAnswer()">Verificar</button>
       `;
    }

    html += `
      </div>
      <div id="feedback-bar" class="feedback-bar">
        <div id="feedback-msg"></div>
      </div>
    `;

    document.getElementById('sprint').innerHTML = html;
    this.setupInteractions(ex);
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
     if (side === 'left') {
       document.querySelectorAll('.match-btn-l').forEach(b => b.style.borderColor = 'transparent');
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
    const ex = this.exercises[this.currentIndex];
    if (this.matchState.matches.length !== ex.pairs.length) return;
    
    let isCorrect = true;
    for (let m of this.matchState.matches) {
       const pair = ex.pairs.find(p => p.left === m.leftText);
       if (!pair || pair.right !== m.rightText) { isCorrect = false; break; }
    }
    this.processAnswer(isCorrect, ex.answer || "matching");
  },

  checkAnswer(answer) {
    const ex = this.exercises[this.currentIndex];
    const isCorrect = answer === ex.answer;
    this.processAnswer(isCorrect, ex.answer);
  },

  checkTextAnswer() {
    const input = document.getElementById('sprint-text').value.trim().toLowerCase();
    const ex = this.exercises[this.currentIndex];
    
    let isCorrect = false;
    if (ex.accepted) {
      isCorrect = ex.accepted.map(a => a.toLowerCase().replace(/[.,!?]/g, '')).includes(input.replace(/[.,!?]/g, ''));
    } else {
      isCorrect = input === ex.answer.toLowerCase();
    }
    this.processAnswer(isCorrect, ex.answer);
  },

  checkOrderAnswer() {
    const drop = document.getElementById('word-drop');
    const words = Array.from(drop.children).map(c => c.dataset.word).join(' ');
    const ex = this.exercises[this.currentIndex];
    this.processAnswer(words === ex.answer, ex.answer);
  },

  processAnswer(isCorrect, correctAnswerText) {
    const container = document.getElementById('sprint-container');
    const feedbackBar = document.getElementById('feedback-bar');
    const feedbackMsg = document.getElementById('feedback-msg');
    
    const buttons = container.querySelectorAll('button');
    buttons.forEach(b => b.style.pointerEvents = 'none');
    
    if (isCorrect) {
      container.classList.add('shake-correct');
      feedbackBar.className = 'feedback-bar correct';
      feedbackMsg.innerHTML = `✅ ¡Correcto!`;
      this.correctCount++;
      this.xpEarned += 15; // More XP in sprint
      App.playSound('correct');
      
      // Auto advance fast
      setTimeout(() => {
        this.currentIndex++;
        this.render();
      }, 500);
    } else {
      container.classList.add('shake-wrong');
      feedbackBar.className = 'feedback-bar incorrect';
      feedbackMsg.innerHTML = `❌ Incorrecto. +5 Segundos de penalización.<br>Correcto: ${correctAnswerText}`;
      
      this.timeLeft = Math.max(0, this.timeLeft - 5);
      
      const timerEl = document.getElementById('sprint-timer');
      timerEl.style.color = 'var(--accent-red)';
      setTimeout(() => timerEl.style.color = '', 500);
      App.playSound('wrong');

      setTimeout(() => {
        this.currentIndex++;
        this.render();
      }, 1500); // Wait longer to show correct answer
    }
  },

  finishSprint() {
    clearInterval(this.timerInterval);
    this.isSetup = true; // reset for next time
    
    const accuracy = this.exercises.length > 0 ? Math.round((this.correctCount / this.exercises.length) * 100) : 0;
    
    ResultsModule.setResultsData({
      type: 'sprint',
      accuracy: accuracy,
      xp: this.xpEarned + 50, // Bonus for finishing
      correct: this.correctCount,
      total: this.exercises.length
    });
    
    window.location.hash = '#results';
  }
};
