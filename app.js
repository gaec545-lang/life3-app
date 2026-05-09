// app.js
const App = {
  data: {},
  
  init() {
    this.initLocalStorage();
    window.addEventListener('hashchange', () => this.handleRoute());
    if (!window.location.hash) {
      window.location.hash = '#dashboard';
    } else {
      this.handleRoute();
    }
  },
  
  initLocalStorage() {
    const data = localStorage.getItem('life3_progress_v2'); 
    if (data) {
      this.data = JSON.parse(data);
      this.checkStreak();
      
      // Force unlock all blocks for existing users as requested
      for (let i = 1; i <= 10; i++) {
        if (!this.data.blocks[i] || this.data.blocks[i].status === 'locked') {
          this.data.blocks[i] = this.data.blocks[i] || { stars: 0, bestScore: 0 };
          this.data.blocks[i].status = 'available';
        }
      }
      this.saveData();
    } else {
      this.data = {
        streakDays: 0,
        lastPlayed: new Date().toISOString().split('T')[0],
        blocks: {},
        totalXP: 0
      };
      
      for (let i = 1; i <= 10; i++) {
        this.data.blocks[i] = {
          status: 'available',
          stars: 0,
          bestScore: 0
        };
      }
      this.saveData();
    }
  },

  checkStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastPlayed = this.data.lastPlayed;
    
    if (lastPlayed !== today) {
      const lastDate = new Date(lastPlayed);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays > 1) {
        this.data.streakDays = 0;
      }
      this.data.lastPlayed = today;
      this.saveData();
    }
  },
  
  saveData() {
    localStorage.setItem('life3_progress_v2', JSON.stringify(this.data));
  },
  
  addXP(amount) {
    this.data.totalXP += amount;
    this.saveData();
  },

  incrementStreak() {
     const today = new Date().toISOString().split('T')[0];
     if (this.data.lastActivityDate !== today) {
        this.data.streakDays++;
        this.data.lastActivityDate = today;
        this.saveData();
     }
  },
  
  unlockNextBlock(currentBlockId) {
    const nextId = parseInt(currentBlockId) + 1;
    if (nextId <= 10 && this.data.blocks[nextId] && this.data.blocks[nextId].status === 'locked') {
      this.data.blocks[nextId].status = 'available';
      this.saveData();
    }
  },

  updateBlockScore(blockId, accuracy) {
    const block = this.data.blocks[blockId];
    block.status = 'completed';
    
    let stars = 0;
    if (accuracy >= 90) stars = 3;
    else if (accuracy >= 75) stars = 2;
    else if (accuracy >= 60) stars = 1;
    
    if (accuracy > block.bestScore) {
      block.bestScore = accuracy;
    }
    
    if (stars > block.stars) {
      block.stars = stars;
    }
    
    this.saveData();
    return stars;
  },
  
  handleRoute() {
    const hash = window.location.hash;
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.classList.remove('active'));
    
    // Close overlays
    this.closeBottomSheet();
    this.closeDrawer();
    
    if (hash === '' || hash === '#dashboard') {
      document.getElementById('dashboard').classList.add('active');
      DashboardModule.render();
    } else if (hash.startsWith('#block/')) {
      const parts = hash.split('?');
      const idStr = parts[0].replace('#block/', '');
      const blockId = parseInt(idStr);
      
      const searchParams = new URLSearchParams(parts[1] || '');
      const tab = searchParams.get('tab') || 'explain';
      
      document.getElementById('block').classList.add('active');
      BlockModule.render(blockId, tab);
    } else if (hash === '#sprint') {
      document.getElementById('sprint').classList.add('active');
      SprintModule.render();
    } else if (hash === '#results') {
      document.getElementById('results').classList.add('active');
      ResultsModule.render();
    } else {
      window.location.hash = '#dashboard';
    }
  },

  /* --- UI Overlay Controls --- */
  
  openBottomSheet(html, isCorrect) {
    const sheet = document.getElementById('bottom-sheet');
    const overlay = document.getElementById('bs-overlay');
    const content = document.getElementById('bs-content');
    
    sheet.className = 'bottom-sheet ' + (isCorrect ? 'correct' : 'wrong');
    content.innerHTML = html;
    
    overlay.classList.add('show');
    sheet.classList.add('show');
  },

  closeBottomSheet() {
    document.getElementById('bottom-sheet').classList.remove('show');
    document.getElementById('bs-overlay').classList.remove('show');
    
    // Resume flow if there's a callback registered
    if (this.onBottomSheetClose) {
       const cb = this.onBottomSheetClose;
       this.onBottomSheetClose = null;
       cb();
    }
  },

  openDrawer(html) {
    document.getElementById('drawer-content').innerHTML = html;
    document.getElementById('side-drawer').classList.add('show');
    document.getElementById('drawer-overlay').classList.add('show');
  },

  closeDrawer() {
    document.getElementById('side-drawer').classList.remove('show');
    document.getElementById('drawer-overlay').classList.remove('show');
  },

  normalize(str) {
    if (!str) return "";
    return str.toString()
      .trim()
      .toLowerCase()
      .replace(/[.,!?¡¿]/g, '') // Remove basic punctuation
      .replace(/['’‘"`“”]/g, "'") // Normalize all quote types to single straight quote
      .replace(/\s+/g, ' ');    // Normalize multiple spaces to one
  },

  playSound(type) {
    // Optional sound
  }
};

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
