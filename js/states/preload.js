var Main = Main || {};

Main.Preload = function (){};

Main.Preload.prototype = {
  preload : function() {
    this.game.load.image('city-far',    'assets/images/city-far.png');
    this.game.load.image('city-front',  'assets/images/city-front.png');
    this.game.load.image('city-mid',    'assets/images/city-mid.png');
    this.game.load.image('clouds',      'assets/images/clouds.png');
    this.game.load.image('fence',       'assets/images/fence.png');
    this.game.load.image('background',  'assets/images/background.png');
    this.game.load.image('road',        'assets/images/road.png');
    this.game.load.image('container01', 'assets/images/container_01.png');
    this.game.load.image('cardboardbox',   'assets/images/cardboardbox.png');
    this.game.load.image('ground',      'assets/images/ground.png');
    this.game.load.image('menu-start',  'assets/images/menu-start.png');

    //CAR
    this.game.load.image('car-idle',    'assets/images/car-idle.png');
    this.game.load.spritesheet('car-driving', 'assets/images/car-sheet.png', 70, 18, 2);

    //HERO
    this.game.load.spritesheet('hero',  'assets/images/hero.png',14,22, 2);
    this.game.load.spritesheet('hero_run',  'assets/images/hero_run.png', 14, 22, 9);
  },
  
  create : function() {
    
    this.stage.backgroundColor = "#000";

    this.state.start('GameTitle', true, false);
  },

  update : function() {}
}