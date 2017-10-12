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

		//bring to front all important elements
		//this.orderStageElements();

		//camera settings
		this.adjustCamera();
	},
	adjustStageWorld: function(stageLength){
		this.game.world.setBounds(0, 0, stageLength, this.game.height);
	},
  	createBackground: function(){
  		this.game.stage.backgroundColor = "#000";

		this.sky = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('sky').height)/2,
			this.game.width,
			this.game.cache.getImage('sky').height,
			'sky'
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
		this.sky.tilePosition.x += 0.1	;
	    this.cityMid.tilePosition.x -= 0.25	;
	    this.cityFront.tilePosition.x -= 0.5;
	}
};