var Main = Main || {};

Main.Boot = function (){};

Main.Boot.prototype = {

	preload : function(){

	},

	create : function() {
		this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

		this.scale.setUserScale(3,3);

		this.game.renderer.renderSession.roundPixels = false;
		this.game.camera.roundPx = false;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		this.scale.pageAlignHorizontally = true;

		this.state.start('Preload');
	}
}
