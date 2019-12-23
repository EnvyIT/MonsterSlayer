new Vue({
  el: '#app',
  data: {
    isRunning: false,
    playerHealth: 100,
    monsterHealth: 100,
    log: []
  },
  watch: {
    playerHealth: function() {
      if(this.playerHealth <= 0) {
        this.showDialog('You lose! New game?');
      }
    },
    monsterHealth: function() {
      if(this.monsterHealth <= 0) {
        this.showDialog('You win! New game?');
      }
    }
  },
  methods: {
    showDialog: function(message) {
      const answer = confirm(message);
      if(answer) {
        this.resetGame(true);
      }
    },
    resetGame: function(isRunning) {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.isRunning = isRunning;
      this.log = [];
    },
    logInfo: function(actor, target, action ,hitpoints) {
      this.log.push({actor: actor, msg:`${actor} ${action} ${target} FOR ${hitpoints}`});
    },
    randomHit: function(probability) {
      if(Math.floor(Math.random() * 100 + 1) >=  probability) {
        return Math.floor(Math.random() * 24 + 1);
      }
      return Math.floor(Math.random() * 10 + 1);
    },
    startGame: function() {
      this.resetGame(true);
    },
    monsterAttacks: function() {
      const hitpoints = this.randomHit(65);
      this.playerHealth -= hitpoints;
      this.logInfo('MONSTER', 'PLAYER', 'HITS' ,hitpoints);
    },
    playerAttacks: function(probability) {
      const hitpoints = this.randomHit(probability);
      this.monsterHealth -= hitpoints;
      this.logInfo('PLAYER', 'MONSTER', 'HITS' ,hitpoints);
    },
    attack: function(probability) {
      if(probability === null || probability === undefined) {
        probability = 90;
      }
      this.playerAttacks(probability);
      this.monsterAttacks();

    },
    specialAttack: function() {
      this.attack(0);
    },
    heal: function() {
      const healthPoints = this.randomHit(65);
      if(this.playerHealth + healthPoints > 100) {
        const healedFor = 100 - this.playerHealth;
        this.playerHealth = 100;
        this.logInfo('PLAYER', 'HIMSELF', 'HEALS' , healedFor);
      } else {
        this.playerHealth += healthPoints;
        this.logInfo('PLAYER', 'HIMSELF', 'HEALS' , healthPoints);
      }
      this.monsterAttacks();
    },
    giveUp: function() {
      const answer = confirm('Do you want to give up?');
      if(answer) {
        this.resetGame(false);
      }
    }
  }
});
