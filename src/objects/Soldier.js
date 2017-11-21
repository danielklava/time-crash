export default class Soldier extends Phaser.Sprite{
    constructor(game, x, y, sprite){
        
        super(game, x, y, sprite);  

        this.alpha = 1;
        this.anchor.set(0.5);
        this.direction = 1;

        //this.initAnimation();    
        this.initPhysics();
        this.initWeapon();
        //this.initAudio();

        this.moving = true;

        game.add.existing(this);
    }

    initAnimation(){
        this.animations.add('idle', Phaser.Animation.generateFrameNames('hero_idle', 0, 1,"",1), 3, true);
		this.animations.add('run', Phaser.Animation.generateFrameNames('hero_run', 1, 10,"",1), 12, true);
	    //this.animations.add('jump', 'hero_idle1', 1, true); TODO: review
        this.animations.play('idle');
    }

    initAudio(){
        this.jumpSound = this.game.add.audio('jump');
		this.shootSound = this.game.add.audio('shoot');
    }

    initPhysics() {
        this.game.physics.arcade.enable(this);
        this.enableBody = true;

		this.body.gravity.y = this.game.physics.arcade.gravity.y;
		this.body.collideWorldBounds = true;
		this.body.maxVelocity.y = 500;
		this.body.setSize(15,29);
    }

    initWeapon(){
        this.weapon = this.game.add.weapon(5, 'bullet');
		this.weapon.bulletSpeed = 100;
		this.weapon.fireRate = 500;
		this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
		this.weapon.bulletKillDistance = 45;
		this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletGravity.y = -350;
		this.weapon.trackSprite(this, 5, -2, true);
        this.weapon.trackRotation = false;
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
};