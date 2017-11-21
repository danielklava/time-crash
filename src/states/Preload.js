
class Preload extends Phaser.State {
  preload() {

    var imagesToLoad = [
      //GAME TITLE
      { id: 'gameTitle',    file: 'assets/images/gametitle.png' },
      
      //UI
      { id: 'dialog',       file: 'assets/images/dialog_box.png' },

      //BACKGROUND
      { id: 'city-far',     file: 'assets/images/city-far.png' },
      { id: 'city-front',   file: 'assets/images/city-front.png' },
      { id: 'city-mid',     file: 'assets/images/city-mid.png' },
      { id: 'clouds',       file: 'assets/images/clouds.png' },
      { id: 'fence',        file: 'assets/images/fence.png' },
      { id: 'background',   file: 'assets/images/background.png' },
      { id: 'road',         file: 'assets/images/road.png' },
      
      //OBSTACLES
      { id: 'container01',  file: 'assets/images/container_01.png'},
      { id: 'cardboardbox', file: 'assets/images/cardboardbox.png'},
      { id: 'menu-start',   file: 'assets/images/menu-start.png'},
      { id: 'ground',       file: 'assets/images/ground.png' },
      
      //BULLET
      { id : 'bullet',      file : 'assets/images/bullet.png'},

      //LAB  
      { id: 'bg-lab',       file: 'assets/images/bg_lab.png' },
      { id: 'lab-walls',    file: 'assets/images/lab_walls.png' },
      { id: 'lab-computer', file: 'assets/images/lab_computer.png' },
      { id: 'lab-energy',   file: 'assets/images/lab_energy.png' },

    ]

    for (var i = 0; i < imagesToLoad.length; i++) {
      this.game.load.image(imagesToLoad[i].id, imagesToLoad[i].file);
    }

    //CAR
    this.game.load.image('car-idle', 'assets/images/car-idle.png');
    this.game.load.spritesheet('car-driving', 'assets/images/car-sheet.png', 70, 18, 2);

    //HERO
    this.game.load.atlas('hero', 'assets/images/hero_atlas.png', 'assets/images/hero_atlas.json');

    //NPCS
    this.game.load.spritesheet('soldier', 'assets/images/soldier.png', 21, 29, 1);
    this.game.load.spritesheet('selene_portrait', 'assets/images/selene_portrait.png', 20, 20);

    //ENEMIES
    this.game.load.atlas('raptor', 'assets/images/raptor_atlas.png', 'assets/images/raptor_atlas.json');
    
    //AUDIO
    this.game.load.audio('theme', ['assets/audio/theme.wav'], true);
    this.game.load.audio('shoot', ['assets/audio/laser.ogg'], true);
    this.game.load.audio('jump', ['assets/audio/jump.wav'], false);
    this.game.load.audio('raptorSound', ['assets/audio/raptor.wav'], false);

    //FONT
    this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
  }

  create() {
    this.stage.backgroundColor = "#FFF";

    this.state.start('Stage1', true, false);
  }
}

export default Preload;