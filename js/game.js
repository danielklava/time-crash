var Main = Main || {};

Main.game = new Phaser.Game(640, 480, Phaser.AUTO, '');

Main.game.state.add('Boot', Main.Boot);
Main.game.state.add('Preload', Main.Preload);
Main.game.state.add('Stage1', Main.Stage1);

Main.game.state.start('Boot');	