//title screen
Main.GameTitle = function(){};
 
Main.GameTitle.prototype = {
	create: function() {

		this.createBackground();

		this.createActors();

		this.addMenuOptions();

		this.timer = Main.game.time.create();
		this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 1, this.endTimer, this);
		this.timer.start();

		this.timerText = this.game.add.text(5, 5, "00:00",{font: "12px Arial", fill:"#FF0"});
	},
	render : function(){
		if (this.timer.running) {
			this.timerText.setText(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)));
		}
		else {
			this.timerText.setText("Done!", 2, 14, "#0f0");
		}
	},
	endTimer: function() {
		// Stop the timer when the delayed event triggers
		this.timer.stop();
	},
	formatTime: function(s) {
		// Convert seconds (s) to a nicely formatted and padded time string
		var minutes = "0" + Math.floor(s / 60);
		var seconds = "0" + (s - minutes * 60);
		return minutes.substr(-2) + ":" + seconds.substr(-2);   
	},
	addMenuOptions : function() {
		this.menuStart = this.game.add.button(this.game.world.right - 40, this.game.world.bottom-10, 'menu-start', this.startCallback, this, 2, 1, 0);
		this.menuStart.inputEnabled = true;
		this.menuStart.events.onInputDown.add(this.startCallback, this);
	},
	startCallback : function (){
		this.state.start('Stage1');
	},
	createActors : function (){
		this.car = this.game.add.sprite(00, 52,'car-driving');
		this.car.animations.add('drive');
		this.car.animations.play('drive', 5, true);
		
		this.add.tween(this.car).to({ x:7, y: 50}, 2000, Phaser.Easing.Cubic.InOut, true, 1, 1000, true);
		//this.add.tween(this.car).to({ x:17, y: 51}, 2000, Phaser.Easing.Cubic.InOut, true, 1, 1000, true);
	},
  	createBackground: function(){
  		this.game.stage.backgroundColor = "#000";

		this.background = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('background').height)/2,
			this.game.width,
			this.game.cache.getImage('background').height,
			'background'
		);	
		this.clouds = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('clouds').height)/2,
			this.game.width,
			this.game.cache.getImage('clouds').height,
			'clouds'
		);		 
		this.cityFar = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('city-far').height)/2,
			this.game.width,
			this.game.cache.getImage('city-far').height,
			'city-far'
		);   
		this.cityMid = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('city-mid').height)/2,
			this.game.width,
			this.game.cache.getImage('city-mid').height,
			'city-mid'
		);	 
		this.cityFront = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('city-front').height)/2,
			this.game.width,
			this.game.cache.getImage('city-front').height,
			'city-front'
		);
		this.fence = this.game.add.tileSprite(0, 30,this.game.width, this.game.cache.getImage('fence').height, 'fence');	 
		this.road = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('road').height)/2,
			this.game.width,
			this.game.cache.getImage('road').height,
			'road'
		);	
  	},
	update: function() {
		this.updateBackground();
	},
	updateBackground : function(){
		this.background.tilePosition.x -=0.02
		this.clouds.tilePosition.x -= 0.01	;
		this.cityFar.tilePosition.x -= 0.05;
		this.cityMid.tilePosition.x -= 0.1	;
		this.cityFront.tilePosition.x -= 0.2;
		this.fence.tilePosition.x -=1;
		this.road.tilePosition.x -=1;
	}
};