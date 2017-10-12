var Main = Main || {};

Main.Preload = function (){};

Main.Preload.prototype = {
  preload : function() {
    this.game.load.image('headphones', 'assets/images/headphones.jpg');
    this.game.load.image('mountains-back', 'assets/images/mountains-back.png');
    this.game.load.image('mountains-mid1', 'assets/images/mountains-mid1.png');
    this.game.load.image('mountains-mid2', 'assets/images/mountains-mid2.png');
    this.game.load.image('city-far', 'assets/images/city-far.png');
    this.game.load.image('city-front', 'assets/images/city-front.png');
    this.game.load.image('city-mid', 'assets/images/city-mid.png');
    this.game.load.image('sky', 'assets/images/sky.png');
  },
  
  create : function() {
    
    this.mask = new Phaser.Rectangle(),
    this.stage.backgroundColor = "#000";

    this.effect = this.make.bitmapData();
    this.effect.load('headphones');
 
    this.image = this.add.image(this.world.centerX, this.world.centerY, this.effect);
    this.image.anchor.set(0.5);
    this.image.smoothed = false;
    this.image.alpha = 0.0;
    this.image.width = 640;
    this.image.height = 400;

    //this.add.tween(this.image).to({ alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 2, 1000, true);

    //this.time.events.add(Phaser.Timer.SECOND * 1, this.transitionToMenu, this);

    this.transitionToMenu();
  },

  update : function() {
    //this.effect.alphaMask('raster', this.effect, this.mask);

    //this.image.rotation += 0.01;
  },

  transitionToMenu : function(){
    console.log("go to Stage1");
    this.state.start('Stage1', true, false);
  }
}