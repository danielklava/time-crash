
class GameTitle extends Phaser.State{
	create() {

		this.createBackground();
		this.createActors();
		this.addMenuOptions();

		this.spacebarButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		this.themeMusic = this.game.add.audio('theme');
		this.themeMusic.play();
	}

	update() {
		this.updateBackground();

		if (this.spacebarButton.isDown || this.enterButton.isDown){
			this.startCallback();
		}
	}
	addMenuOptions () {
		this.menuStart = this.game.add.button(this.game.world.right - 40, this.game.world.bottom-10, 'menu-start', this.startCallback, this, 2, 1, 0);
		this.menuStart.inputEnabled = true;
		this.menuStart.events.onInputDown.add(this.startCallback, this);
	}
	createActors  (){
		this.car = this.game.add.sprite(-100, 54,'car-driving');
		this.car.animations.add('drive');
		this.car.animations.play('drive', 5, true);
		
		this.add.tween(this.car).to({ x:7, y: 55}, 2000, Phaser.Easing.Cubic.InOut, true, 1, 1000, true);

		this.gameTitle = this.game.add.sprite(30, 0,'gameTitle');		
	}
  	createBackground(){
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
		this.fence = this.game.add.tileSprite(0, 37,this.game.width, this.game.cache.getImage('fence').height, 'fence');	 
		this.road = this.game.add.tileSprite(0,
			(this.game.height - this.game.cache.getImage('road').height)/2,
			this.game.width,
			this.game.cache.getImage('road').height,
			'road'
		);	
  	}
	startCallback  (){
		this.hideTitle = this.add.tween(this.gameTitle).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
		this.hideTitle.onComplete.add(this.introMoveCar, this);
		this.hideTitle.start();
	}
	introMoveCar (){
		this.carLeaves = this.add.tween(this.car).to({ x:200}, 2000, Phaser.Easing.Cubic.InOut, false, 0, 0, false);
		this.carLeaves.onComplete.add(this.fadeOut, this);		
		this.carLeaves.start();
	}
	fadeOut (){
		this.car.visible=false;
		this.camera.fade("#000000",500);
		this.camera.onFadeComplete.add(this.beginGame, this);
	}
	beginGame  (){
		this.state.start('Stage1');
	}
	updateBackground (){
		this.background.tilePosition.x -=0.02
		this.clouds.tilePosition.x -= 0.01	;
		this.cityFar.tilePosition.x -= 0.15;
		this.cityMid.tilePosition.x -= 0.3	;
		this.cityFront.tilePosition.x -= 0.5;
		this.fence.tilePosition.x -=1;
		this.road.tilePosition.x -=1;
	}
}

export default GameTitle;