//title screen
Main.Stage1 = function(){};
 
Main.Stage1.prototype = {
	create: function() {
		var gravity = 1000;
		var stageLength = 5000;

		//Enble Arcade Physics
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = gravity;

		//stage world settings
		this.adjustStageWorld(stageLength);

		//create all stage sprites
		this.createSprites(stageLength);

		//add phisics to elements (oh, really?)
		//this.addPhisicsToElements(gravity);

		//create stage background
		this.createBackground();

		this.createActors();

		//bring to front all important elements
		//this.orderStageElements();

		//camera settings
		this.adjustCamera();
		this.game.stage.smoothed=false;

		this.addMenuOptions();

	},
	addMenuOptions : function() {
		this.menuStart = this.game.add.sprite(110, 70,'menu-start');
	},
	adjustStageWorld: function(stageLength){
		this.game.world.setBounds(0, 0, stageLength, this.game.height);
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
  	orderStageElements: function() {
	    this.game.world.bringToTop(this.background);
	    this.game.world.bringToTop(this.clouds);
	    this.game.world.bringToTop(this.cityFar);
	    this.game.world.bringToTop(this.cityMid);
	    this.game.world.bringToTop(this.cityFront);
	    this.game.world.bringToTop(this.car);
	},
  	createSprites : function(stageLength){},
  	addPhisicsToElements: function(gravity){
  		this.game.physics.arcade.enable(this.player);
	    this.game.physics.arcade.enable(this.ground);

	    this.ground.body.immovable = true;
	    this.ground.body.allowGravity = false;

	    this.player.body.gravity.y = gravity;
	    this.dino.body.gravity.y = gravity;
  	},
  	adjustCamera: function(){
  		this.game.camera.follow(this.player);
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