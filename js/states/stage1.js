//title screen
Main.Stage1 = function(){};
 
Main.Stage1.prototype = {
	create: function() {
		this.camera.flash("#000000");

		var gravity = 350;
		var stageLength = 700;

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
		this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);

		this.camera.follow(this.hero, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1);
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

		this.hero = this.game.add.sprite(40, 0, 'hero');
		this.hero.animations.add('idle', Phaser.Animation.generateFrameNames('hero_idle', 0, 4,"",1), 6, true);
		this.hero.animations.add('run', Phaser.Animation.generateFrameNames('hero_run', 0, 9,"",2), 10, true);
		this.hero.animations.add('jump', ['hero_jump'], 1, true);
		this.hero.alpha = 0;
		this.hero.anchor.set(0.5);
		this.hero.animations.play('run');

		this.weapon = this.game.add.weapon(5, 'bullet');
		this.weapon.bulletSpeed = 100;
		//this.weapon.fireLimit = 1;
		this.weapon.fireRate = 500;
		this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
		this.weapon.bulletKillDistance = 45;
		this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
		this.weapon.bulletGravity.y = -350;
		
		this.weapon.trackSprite(this.hero, 5, -2, true);
		this.weapon.trackRotation = false;

		this.carArrives = this.add.tween(this.car).to({ x:0}, 2000, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
		this.carArrives.onComplete.add(this.showHero, this);
		this.carArrives.start();

		this.raptor = this.game.add.sprite(170,45,'raptor');
		this.raptor.scale.x *= -1;
		this.raptor.animations.add('run', Phaser.Animation.generateFrameNames('raptor_run', 0, 6,"",1), 6, true);
		this.raptor.animations.play('run');
		this.raptor.anchor.set(0.5);
	},
	createObjects : function(){
		this.objects = this.add.group();
		
		this.container01 = this.add.sprite(110,44,'container01');
		this.container02 = this.add.sprite(280,44,'container01');
		this.cardboardbox = this.add.sprite(80,56,'cardboardbox');
		
		this.objects.add(this.container01);
		this.objects.add(this.container02);
		this.objects.add(this.cardboardbox);
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
		this.physics.arcade.enable(this.container02);
		this.physics.arcade.enable(this.cardboardbox);
		this.physics.arcade.enable(this.raptor);
		
		this.container01.enableBody = true;
		this.container01.body.immovable=true;
		this.container01.body.allowGravity=false;
		this.container02.enableBody = true;
		this.container02.body.immovable=true;
		this.container02.body.allowGravity=false;

		this.cardboardbox.enableBody = true;
		this.cardboardbox.body.immovable=true;
		this.cardboardbox.body.allowGravity=false;

		this.ground.body.immovable = true;
	    this.ground.body.allowGravity = false;

		this.hero.body.gravity.y = gravity;
		this.hero.body.collideWorldBounds = true;
		this.hero.body.maxVelocity.y = 500;
		this.hero.body.setSize(12,21);

		this.raptor.body.allowGravity=true;
		this.raptor.enableBody = true;
		this.raptor.body.collideWorldBounds = true;

  	},
  	adjustCamera: function(){
  		this.game.camera.follow(this.hero);
  	},
	update: function() {
		this.updateBackground();
		this.physics.arcade.collide(this.hero, this.ground, this.playerHit, null, this);
		this.physics.arcade.collide(this.hero, this.container01);
		this.physics.arcade.collide(this.hero, this.cardboardbox);
		this.physics.arcade.collide(this.hero, this.raptor, this.restartStage, null, this);
		this.physics.arcade.overlap(this.weapon.bullets, this.raptor, this.bulletHitEnemy);
		this.physics.arcade.collide(this.objects, this.raptor, this.enemyHitWall);
		this.physics.arcade.collide(this.raptor, this.ground);
		this.physics.arcade.collide(this.raptor, this.objects);
		
		this.hero.body.velocity.x = 0;
		
		if (this.cursors.left.isDown)
		{
			this.hero.body.velocity.x = -45;
			if (this.hero.scale.x > 0){
				this.hero.scale.x *=-1;
			}

			this.weapon.fireAngle = Phaser.ANGLE_LEFT;
		}
		else if (this.cursors.right.isDown)
		{
			this.hero.body.velocity.x = 45;
			if (this.hero.scale.x < 0){
				this.hero.scale.x *=-1;
			}

			this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
		}

		if (this.jumpButton.isDown && this.hero.body.touching.down){
			this.hero.body.velocity.y = -210;
		}

		if (this.fireButton.isDown){
			this.weapon.fire();
		}


		if (this.hero.body.velocity.y != 0){
			this.hero.animations.play('jump');
		}else{
			if (this.hero.body.velocity.x == 0){
				this.hero.animations.play('idle');
			}
			else{
				this.hero.animations.play('run');
			}
		}

		this.updateEnemies();
	},
	restartStage : function(){
		this.game.state.restart();
	},
	updateEnemies : function(){
		if (this.raptor.body != null)
			if (Math.random() > 0.5){
				if (this.raptor.scale.x > 0){
					this.raptor.body.velocity.x = 30;
				}
				else {
					this.raptor.body.velocity.x = -30;
				}
			}
	},
	enemyHitWall : function (enemy, object){
		enemy.scale.x *= -1;
	},
	bulletHitEnemy : function(bullet, object){
		bullet.destroy();	
		object.destroy();	
	},
	updateBackground : function(){
		this.background.tilePosition.x -= 0.03;
		this.clouds.tilePosition.x -=  0.05	;
	},
	render : function(){
		if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 2, 14, "#ff0");
        }
        else {
			this.game.debug.text("Failed!", 2, 14, "#0f0");
			this.restartStage();
		}
	},
};