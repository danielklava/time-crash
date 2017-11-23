import Player from '../objects/Player';
import Obstacle from '../objects/Obstacle';
import DialogBox from '../objects/DialogBox';
import Soldier from '../objects/Soldier';
import Raptor from '../objects/Raptor';

class Stage1 extends Phaser.State {

	create() {
		this.GRAVITY = 350;
		this.STAGE_LENGTH = 144 * 4;

		//Stage world settings
		this.adjustStageWorld(this.STAGE_LENGTH);
		
		this.camera.flash("#000000");
		this.game.inputEnabled = true;//TODO revert to false;

		//Enble Arcade Physics
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = this.GRAVITY;

		this.createBackground();
		this.createObjects();	
		this.createActors();
		
		//add phisics to elements (oh, really?)
		this.addPhysicsToElements(this.GRAVITY);

		//camera settings
		this.adjustCamera();
		this.game.stage.smoothed=false;

		this.timer = this.game.time.create();
		this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 0.5, this.endTimer, this);
		this.timer.start();

		this.timerText = this.game.add.bitmapText(100, 65, "font", "", 16);
		this.timerText.fixedToCamera = true;
		this.timerText.cameraOffset.setTo(100,65);

		this.themeMusic = this.game.add.audio('theme', 1, true);
		this.themeMusic.play();

		this.createLinesOfSight(this.soldiers);
		this.createLinesOfSight(this.raptors);		
	}

	createLinesOfSight(group){
		this.linesOfSight = this.linesOfSight || [];
		for(var i = 0; i < group.length; i ++){
			var line = new Phaser.Line(group.children[i].x, group.children[i].y, this.hero.x, this.hero.y);
			line.origin = group.children[i];
			line.target = this.hero;

			this.linesOfSight.push(line);
		}
	}
	/**
	 * The method to add a DialogBox object in the top of the screen.
	 * While the dialog is showing text, all input from the player is disabled.
	 * 
	 * @param speaker The "speaker" of the dialog. This object will be used to display in the dialog, and to find its portrait. 
	 * @param sentence The string sentence that will be printed character by character.
	 */
	addDialogText(speaker, sentence){
		this.game.inputEnabled = true;
		this.hero.stop();
		
		var offsetX = this.game.camera.x;
		
		//Adds the dialog with 1 pixel margin from the game bounds
		new DialogBox(this.game, 1 + offsetX, 1, 'dialog', speaker, sentence, function(){
			this.game.inputEnabled = true;
		});
	}
	endTimer() {
        // Stop the timer when the delayed event triggers
        this.timer.stop();
    }
    formatTime(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
		var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    }
	adjustStageWorld(stageLength){
		this.game.world.setBounds(0, 0, stageLength, this.game.height*1.5	);
	}	
	createActors  (){
  		//creating ground sprite
  		this.ground = this.add.tileSprite(0, this.game.world.bounds.height - 10  ,this.game.world.width, 10, 'ground');

		this.hero = new Player(this.game, 70, this.getObjectPositionAboveGround('hero'), 'hero');
		this.hero.y = this.getGroundPositionY() - this.hero.height;
		
		this.car = this.game.add.sprite(-100, this.getObjectPositionAboveGround('car-idle') + 3,'car-idle');
		
		this.carArrives = this.add.tween(this.car).to({ x:0}, 2000, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
		this.carArrives.onComplete.add(this.showHero, this);
		this.carArrives.start();

		this.soldiers = this.add.group();
		this.soldiers.addMultiple([
			new Soldier(this.game, 130, this.getObjectPositionAboveGround('soldier') - this.game.cache.getImage('container01').height, 'soldier'),
			new Soldier(this.game, 230, this.getObjectPositionAboveGround('soldier'), 'soldier')
		]);

		this.raptors = this.add.group();
		this.raptors.addMultiple([
			new Raptor(this.game, 190, 45, 'raptor')
		]);
	}
	createObjects (){
		this.objects = this.add.group();
		
		this.objects.addMultiple(
			[
				new Obstacle(this.game, 110, this.getObjectPositionAboveGround('container01'), 'container01') 
				,new Obstacle(this.game, 280, this.getObjectPositionAboveGround('container01'), 'container01')
				,new Obstacle(this.game, 80, this.getObjectPositionAboveGround('cardboardbox'), 'cardboardbox')
			]
		);

		this.eventLab = this.add.sprite(-100, 2);
		this.eventLab.scale.y = this.game.height;
	}
	showHero (){
		this.hero.alpha = 1;
		this.addDialogText("Selene", "You must stop Dr. Stein!");
	}
  	orderStageElements() {
	    this.game.world.bringToTop(this.background);
	    this.game.world.bringToTop(this.clouds);
	    this.game.world.bringToTop(this.cityFar);
	    this.game.world.bringToTop(this.cityMid);
	    this.game.world.bringToTop(this.cityFront);
	    this.game.world.bringToTop(this.car);
	}
  	addPhysicsToElements(gravity){
		this.physics.arcade.enable(this.ground);
		this.physics.arcade.enable(this.labComputer);

		this.physics.arcade.enable(this.eventLab);

		this.eventLab.enableBody = true;
		this.eventLab.body.immovable = true;
		this.eventLab.body.allowGravity = false;

		this.labComputer.enableBody = true;
		this.labComputer.body.immovable=true;
		this.labComputer.body.allowGravity=false;
		
		this.ground.body.immovable = true;
	    this.ground.body.allowGravity = false;

  	}
  	adjustCamera(){
		this.camera.follow(this.hero);  
	}
	interactComputer (){
		console.log("Interact");

		return;
	}
	update() {
		this.linesOfSight.forEach(function(l){l.fromSprite(l.origin, l.target)});

		for(var l = 0; l < this.linesOfSight.length; l++){
			var line = this.linesOfSight[l];
			
			var intersectsWithLevel = false;
			var degrees = line.angle * 180/ Math.PI;

			for(var i = 0; i < this.objects.length; i ++){  
				if (Phaser.Line.intersectsRectangle(line, this.objects.children[i].body)){
					intersectsWithLevel = true;
					break;
				}
			}
			if (intersectsWithLevel) continue;
			else {
				if (line.origin.startled) continue;

				var detection = false;

				if (line.origin.direction == 1 && line.target.x > line.origin.x
					&& ( degrees >= 340 && degrees <= 360 || degrees >= 0 && degrees <= 20)){
					detection = true;
				}
				if (line.origin.direction == -1 && line.target.x < line.origin.x
					&& degrees >= 160 && degrees <= 240){
					detection = true;
				}
				if (line.length > 50) detection = false;
		
				if (detection){
					line.origin.startle();
				}
				line.detection = detection;
			}
		}	

		this.updateBackground();

		if (this.eventLab != null && this.checkOverlap(this.hero, this.eventLab)) 
		{ 
			this.startEventLab();
			this.eventLab = null;
		}

		//Trigger events
		this.physics.arcade.overlap(this.hero, this.labComputer, this.interactComputer, null, this);
		this.physics.arcade.overlap(this.hero.weapon.bullets, this.raptor, this.bulletHitEnemy, null, this);
		
		//Collision events
		this.physics.arcade.collide(this.hero, this.ground);
		this.physics.arcade.collide(this.hero, this.objects);
		//this.physics.arcade.collide(this.hero, this.raptors, this.restartStage, null, this);
		
		this.physics.arcade.collide(this.objects, this.raptors, this.enemyHitWall);
		this.physics.arcade.collide(this.objects, this.soldiers, this.enemyHitWall);
		
		this.physics.arcade.collide(this.raptors, this.ground);
		this.physics.arcade.collide(this.soldiers, this.ground);

		for	(var i = 0; i < this.soldiers.length; i ++){
			this.physics.arcade.overlap(
				this.soldiers.children[i].weapon.bullets
				, this.hero
				, this.bulletHitEnemy
				, null
				, this);		
		}

		this.updateEnemies();
	}
	startEventLab (){
		this.addDialogText("Selene", "This is it.");
		this.eventLab.destroy();
	}
	restartStage (){
		this.game.state.restart();
	}
	updateEnemies (){
		/*TODO review : for	(var i = 0; i < this.soldiers.length; i ++){
			var soldier = this.soldiers.children[i];

			if (Math.round(soldier.height + soldier.body.position.y) == Math.round(this.hero.body.position.y + this.hero.height)){
				
				if (soldier.x > this.hero.x && soldier.direction == -1){
					soldier.body.velocity.x = -80;
					soldier.body.velocity.y = -100;
					
					soldier.fire();
				}else if (soldier.x < this.hero.x && soldier.direction == 1){
					soldier.body.velocity.x = 80;
					soldier.body.velocity.y = -100;
					
					soldier.fire();
				}
			}
		}*/
	}
	enemyHitWall  (object, enemy){
		if (enemy instanceof Soldier || enemy instanceof Raptor){
			enemy.calculateRoute(object);
		}
	}
	bulletHitEnemy (target, bullet){	
		bullet.destroy();

		if (target instanceof Raptor){
			target.die();
		}
		if (target instanceof Player){
			target.hit();
		}
	}
	createBackground(stageLength){
		this.game.stage.backgroundColor = "#764b86";
		
		this.background = this.addImageToBackground('background');
		this.clouds = this.addImageToBackground('clouds');
		this.cityFar = this.addImageToBackground('city-far');
		this.cityMid = this.addImageToBackground('city-mid');
		this.cityFront = this.addImageToBackground('city-front');
		this.fence = this.addImageToBackground('fence', 0, this.getObjectPositionAboveGround('fence'));
		
		//LAB BG
		this.bgLab = this.game.add.sprite(144*3, 0, 'bg-lab');     
		this.labWalls = this.game.add.sprite(144*3, 0, 'lab-walls');          
		this.labComputer = this.game.add.sprite(505, 50, 'lab-computer');     
		this.labEnergy = this.game.add.sprite(144*3, 0, 'lab-energy');     
		
		this.add.tween(this.labEnergy).to({y: -5}, 1000, Phaser.Easing.Cubic.InOut, true, 1, 1000, true);		
	}
	updateBackground (){
		this.background.tilePosition.x -= 0.03;
		this.clouds.tilePosition.x -=  0.05	;

		this.background.tilePosition.y = this.game.camera.y;
		this.clouds.tilePosition.y = this.game.camera.y;
		this.cityFar.tilePosition.y = this.game.camera.y;
		this.cityMid.tilePosition.y = this.game.camera.y;
		this.cityFront.tilePosition.y = this.game.camera.y;
	}
	render (){
		if (this.status == "WIN"){
			this.timerText.text = "You won!";
		}
		else{
			if (this.timer.running) {
				var runningTime = this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
				this.timerText.text = runningTime;
			}
			else {
				this.timerText.text = "Failed";
				//this.restartStage();
			}
		}

		if (document.querySelector('#debugInfo').checked){
			this.game.debug.body(this.eventLab);
			this.game.debug.body(this.hero);

			for(var i = 0; i < this.soldiers.length; i++){
				this.game.debug.body(this.soldiers.children[i]);
			}
			for(var i = 0; i < this.raptors.length; i++){
				this.game.debug.body(this.raptors.children[i]);
			}

			for(var l = 0; l < this.linesOfSight.length; l++){
				var line = this.linesOfSight[l];
				if (line.detection){
					this.game.debug.geom(line, "#0FF");
				}else{
					this.game.debug.geom(line, "#F00");
				}
			}		
		}
	}

	getGroundPositionY (){
		return this.game.world.bounds.height - this.game.cache.getImage('ground').height;
	}
	
	getObjectPositionAboveGround (spriteName){
		return this.getGroundPositionY() - this.game.cache.getImage(spriteName).height;
	}
	
	checkOverlap (spriteA, spriteB) {
		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();
		
		return Phaser.Rectangle.intersects(boundsA, boundsB);
	}

	addImageToBackground(imageName, x, y){

		if (!x) x = 0;
		if (!y) y = this.game.height - this.game.cache.getImage(imageName).height; 

		var bgSprite = this.game.add.tileSprite(
			x
			, y 
			, this.game.world.width
			, this.game.cache.getImage(imageName).height
			,imageName
		);

		return bgSprite;
	}
};

export default Stage1;