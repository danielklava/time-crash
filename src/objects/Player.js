export default class Player extends Phaser.Sprite{
    constructor(game, x, y, sprite){
        super(game, x, y, sprite);  

        this.SPEED = 45;        
        
        this.alpha = 1;
        this.anchor.set(0.5);
        this.direction = 1;
    
        this.initAnimation();    
        this.initPhysics();
        this.initWeapon();
        this.initInput();
        this.initAudio();

        this.onWall = false;
        this.canJump = true;
        this.hit = false;

        game.add.existing(this);
    }

    initAnimation(){
        this.animations.add('idle', Phaser.Animation.generateFrameNames('hero_idle', 1, 2), 3, true);
		this.animations.add('run', Phaser.Animation.generateFrameNames('hero_run', 1, 10), 12, true);
		this.animations.add('crouch', ['hero_crouch1'], 10, true);
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
		this.body.setSize(14,23);
    }

    initInput (){
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpButton.onDown.add(this.jump, this);

        this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);
		this.actionButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SHIFT);
    }

    initWeapon(){
        this.weapon = this.game.add.weapon(5, 'bullet');
		this.weapon.bulletSpeed = 100;
		this.weapon.fireRate = 500;
		this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
		this.weapon.bulletKillDistance = 45;
		this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletGravity.y = -350;
		this.weapon.trackSprite(this, 5, 0, true);
        this.weapon.trackRotation = false;
    }
    
    update(){
		if (this.game.inputEnabled && !this.hit){
            if (this.cursors.left.isDown || this.cursors.right.isDown){
                if (this.cursors.left.isDown)
                {
                    this.direction = -1;
                    
                    this.weapon.fireAngle = Phaser.ANGLE_LEFT;
                }
                else if (this.cursors.right.isDown)
                {
                    this.direction = 1;

                    this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
                }

                this.scale.x = this.direction;                
                this.body.velocity.x = this.SPEED * this.direction;
                this.animations.play('run');

            }else if (this.cursors.down.isDown){
                this.crouch();
            }
            else if (this.body.touching.down){
                this.stop();
            } 

            this.body.velocity.y = this.onWall ? 
                50 : this.body.velocity.y;

			if (this.body.touching.down){
                this.canJump = true;
                this.onWall = false;
            }

			if (this.fireButton.isDown){
				this.weapon.fire();
				this.shootSound.play();
			}
		}
    }

    crouch(){
        this.body.velocity.x = 0;
        this.animations.play('crouch');
    }

    hugWall(){
        if (!this.body.touching.down && 
            (this.body.touching.right || this.body.touching.left)){
            this.onWall = true;
        }
    }

    jump(){
        if ((this.canJump && this.body.touching.down) || this.onWall){
            this.body.velocity.y = -210;
            this.jumpSound.play();

            if (this.onWall){
                this.scale.x *= -1;
                this.direction *= -1;
                this.body.velocity.x = this.direction * this.SPEED;
            }

            this.canJump = false;
            this.onWall = false;
        }
    }

    stop(){
        this.body.velocity.x = 0;
        this.animations.play('idle');
    }

    takeDamage (){
        this.body.velocity.x = 15 * this.direction * -1;
        this.hit = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
            this.hit = false;
        }, this);
    }

    die(){
        this.kill();
    }
};