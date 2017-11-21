export default class Raptor extends Phaser.Sprite{
    constructor(game, x, y, sprite){
        
        super(game, x, y, sprite);  

        this.alpha = 1;
        this.anchor.set(0.5);
        this.direction = 1;

        //this.initAnimation();    
        this.initPhysics();
        this.initAudio();

        this.moving = true;

        game.add.existing(this);
    }

    initAnimation(){
    }

    initAudio(){
		this.raptorSound = this.game.add.audio('raptorSound');
    }

    initPhysics() {
        this.game.physics.arcade.enable(this);
        this.enableBody = true;

		this.body.gravity.y = this.game.physics.arcade.gravity.y;
		this.body.collideWorldBounds = true;
		this.body.maxVelocity.y = 500;
		this.body.setSize(15,29);
    }
    
    update(){
        this.scale.x = this.direction;
        this.body.velocity.x = 25 * this.direction;
    }

    calculateRoute(obstacle) {
        if(this.direction > 0 && this.x > obstacle.x + obstacle.width 
            || this.direction < 0 && this.x < obstacle.x){
            this.direction *= -1;
        }	
    }

    die(){
        this.raptorSound.play();
        this.body.destroy();
    }

    playDeathSound() {
        this.raptorSound.play();
    }
};