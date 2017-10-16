var Main = Main || {};

Main.game = new Phaser.Game({
  width: 144,
  height: 81,
  renderer: Phaser.CANVAS,
  parent: 'gameArea',
  antialias: false
});

Main.game.state.add('Boot', Main.Boot);
Main.game.state.add('Preload', Main.Preload);
Main.game.state.add('GameTitle', Main.GameTitle);
Main.game.state.add('Stage1', Main.Stage1);

Main.game.state.start('Boot');	
