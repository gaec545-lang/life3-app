// app.js
const App = {
  data: {},
  
  init() {
    this.initLocalStorage();
    
    // Listen to hash changes for routing
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Initial route
    if (!window.location.hash) {
      window.location.hash = '#dashboard';
    } else {
      this.handleRoute();
    }
  },
  
  initLocalStorage() {
    const data = localStorage.getItem('life3_progress');
    if (data) {
      this.data = JSON.parse(data);
      this.checkStreak();
    } else {
      this.data = {
        streakDays: 0,
        lastPlayed: new Date().toISOString().split('T')[0],
        blocks: {},
        totalXP: 0
      };
      
      // Initialize block statuses
      for (let i = 1; i <= 10; i++) {
        this.data.blocks[i] = {
          status: i === 1 ? 'available' : 'locked',
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
      
      if (diffDays === 1) {
        // Continue streak (will be incremented when they finish an activity)
      } else if (diffDays > 1) {
        // Reset streak
        this.data.streakDays = 0;
      }
      this.data.lastPlayed = today;
      this.saveData();
    }
  },
  
  saveData() {
    localStorage.setItem('life3_progress', JSON.stringify(this.data));
  },
  
  addXP(amount) {
    this.data.totalXP += amount;
    this.saveData();
  },

  incrementStreak() {
     const today = new Date().toISOString().split('T')[0];
     // Simple logic: if they haven't "played" today in terms of completing something, increment.
     // For a real app, you might track "hasCompletedActivityToday".
     // For now, we'll assume calling this means they did something meaningful today.
     // To avoid incrementing multiple times a day:
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

  playSound(type) {
    // Optional sound playing
    try {
      const audio = new Audio(`assets/sounds/${type}.mp3`);
      audio.play().catch(e => { /* Ignore missing sounds */ });
    } catch(e) {}
  }
};

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
