//title screen
Main.Stage1 = function(){};
 
Main.Stage1.prototype = {
	create: function() {
		this.camera.flash("#000000");

		var gravity = 400;
		var stageLength = 288;

		//Enble Arcade Physics
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = gravity;

		//stage world settings
		this.adjustStageWorld(stageLength);

		//create stage background
		this.createBackground();
		this.createObjects();	
		this.createActors();
		
		//add phisics to elements (oh, really?)
		this.addPhisicsToElements(gravity);

		//camera settings
		this.adjustCamera();
		this.game.stage.smoothed=false;

		this.timer = Main.game.time.create();
		this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 1, this.endTimer, this);
		this.timer.start();

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.camera.follow(this.hero, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1);
	},
	render : function(){
		if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 2, 14, "#ff0");
        }
        else {
            this.game.debug.text("Done!", 2, 14, "#0f0");
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
	adjustStageWorld: function(stageLength){
		this.game.world.setBounds(0, 0, stageLength, this.game.height);
	},
	createActors : function (){
  		//creating ground sprite
  		this.ground = this.add.tileSprite(0,this.game.height - 10,this.game.world.width, 10, 'ground');

		this.car = this.game.add.sprite(-100, 54,'car-driving');
		this.car.animations.add('drive');
		this.car.animations.play('drive', 5, true);

		this.hero = this.game.add.sprite(80, 0, 'hero');
		this.hero.alpha = 0;
		this.hero.animations.add('walk',[0], 2, true);
		this.hero.animations.add('jump',[1], 2, true);
		
		this.carArrives = this.add.tween(this.car).to({ x:10}, 2000, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
		this.carArrives.onComplete.add(this.showHero, this);
		this.carArrives.start();
	},
	createObjects : function(){
		this.container01 = this.game.add.sprite(100,44,'container01');
	},
	showHero : function(){
		this.hero.alpha = 1;
	},
  	createBackground: function(stageLength){
  		this.game.stage.backgroundColor = "#000";
	
		this.background = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('background').height)/2,this.game.world.width,
			this.game.cache.getImage('background').height,'background'
		);    
		this.clouds = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('clouds').height)/2,
			this.game.world.width,
			this.game.cache.getImage('clouds').height,
			'clouds'
		);         
		this.cityFar = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('city-far').height)/2,
			this.game.world.width,
			this.game.cache.getImage('city-far').height,
			'city-far'
		);   
		this.cityMid = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('city-mid').height)/2,
			this.game.world.width,
			this.game.cache.getImage('city-mid').height,
			'city-mid'
		);     
		this.cityFront = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('city-front').height)/2,
			this.game.world.width,
			this.game.cache.getImage('city-front').height,
			'city-front'
		);
		this.fence = this.game.add.tileSprite(0, 37, this.game.world.width, this.game.cache.getImage('fence').height, 'fence');     
		this.road = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('road').height)/2,
			this.game.world.width,
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
  	addPhisicsToElements: function(gravity){
  		this.physics.arcade.enable(this.hero);
		this.physics.arcade.enable(this.ground);
		this.physics.arcade.enable(this.container01);
		
		this.container01.body.immovable=true;
		this.container01.body.allowGravity=false;

		this.ground.body.immovable = true;
	    this.ground.body.allowGravity = false;

		this.hero.body.gravity.y = gravity;
		this.hero.body.collideWorldBounds = true;
		this.hero.body.setSize(12,20,3,0);
		this.hero.body.maxVelocity.y = 500;
  	},
  	adjustCamera: function(){
  		this.game.camera.follow(this.hero);
  	},
	update: function() {
		this.updateBackground();
		this.physics.arcade.collide(this.hero, this.ground, this.playerHit, null, this);
		this.physics.arcade.collide(this.hero, this.container01);
		
		this.hero.body.velocity.x = 0;
		
		if (this.hero.body.velocity.y != 0){
			this.hero.animations.play('jump');
		}else{
			this.hero.animations.play('walk');
		}

		if (this.cursors.left.isDown)
		{
			this.hero.body.velocity.x = -45;
			if (this.hero.body.velocity.y == 0){
				this.hero.animations.play('walk');
			}
		}
		else if (this.cursors.right.isDown)
		{
			this.hero.body.velocity.x = 45;

			if (this.hero.body.velocity.y == 0){
				this.hero.animations.play('walk');
			}
		}

		if (this.jumpButton.isDown && this.hero.body.touching.down){
			this.hero.body.velocity.y = -200;
			this.hero.animations.play('jump');
		}
	},
	updateBackground : function(){
		this.background.tilePosition.x -= 0.03;
		this.clouds.tilePosition.x -=  0.05	;
	    //this.cityFar.tilePosition.x = - this.hero.x * 0.15;
	    //this.cityMid.tilePosition.x = -this.hero.x * 0.2;
	    //this.cityFront.tilePosition.x = - this.hero.x * 0.25;
	}
};