class Boot extends Phaser.State {

	preload (){

	}

	create () {
		this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

		this.scale.setUserScale(4,4);

		this.game.renderer.renderSession.roundPixels = false;
		this.game.camera.roundPx = false;

		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

		this.scale.pageAlignHorizontally = true;

		this.state.start('Preload');
	}
}

export default Boot;