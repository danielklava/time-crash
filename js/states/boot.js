var Main = Main || {};

Main.Boot = function (){};

Main.Boot.prototype = {

	preload : function(){

	},

	create : function() {      
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.scale.setUserScale(4,4);

		this.game.renderer.renderSession.roundPixels = false;
		this.game.camera.roundPx = false;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		this.game.renderType = Phaser.CANVAS;

		this.scale.pageAlignHorizontally = true;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.state.start('Preload');
	}
}
