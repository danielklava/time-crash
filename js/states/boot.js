var Main = Main || {};

Main.Boot = function (){};

Main.Boot.prototype = {

	preload : function(){

	},

	create : function() {      
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.scale.pageAlignHorizontally = true;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.state.start('Preload');
	}
}
