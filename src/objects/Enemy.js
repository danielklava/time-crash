export default class Enemy extends Phaser.Sprite {
    constructor(game, x, y, sprite) {

        super(game, x, y, sprite);

        this.alpha = 1;
        this.anchor.set(0.5);
        this.direction = 1;

        this.initAnimation();
        this.initPhysics();
        this.initAudio();

        this.alertTimer = this.game.time.create(false);

        this.moving = true;

        game.add.existing(this);
    }

    initAnimation() {
        /**
         * Should be overriden in the inherited type.
        */
    }

    initAudio() {
        /**
         * Should be overriden in the inherited type.
        */
    }

    initPhysics() {
        this.game.physics.arcade.enable(this);
        this.enableBody = true;

        this.body.gravity.y = this.game.physics.arcade.gravity.y;
        this.body.collideWorldBounds = true;
        this.body.maxVelocity.y = 500;
    }

    update() {
        if (!this.alerted){
            this.scale.x = this.direction;
            this.body.velocity.x = 25 * this.direction;
        }
            
        if (this.direction == 1) {
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
        } else {
            this.weapon.fireAngle = Phaser.ANGLE_LEFT;
        }
    }

    calculateRoute(obstacle) {
        if (!this.alerted) {
            if (this.direction > 0 && this.x > obstacle.x + obstacle.width
                || this.direction < 0 && this.x < obstacle.x) {
                this.direction *= -1;
            }

            if (this.body.touching.left) {
                this.direction = 1;
            } else if (this.body.touching.right) {
                this.direction = -1;
            }
        }
    }

    die() {
        this.alpha = 0;
    }

    alert() {
        if (!this.alerted){
            this.alerted = true;

            this.animations.play('alerted');
            this.body.velocity.x = 0;
            
            this.alertTimer.stop(true);
            this.waitingTimer = this.alertTimer.add(Phaser.Timer.SECOND * 0.5, this.attack, this);
            this.alertTimer.start();
        }
    }

    attack(){

    }
    
    resumePatrol(){
        console.log("Resuming patrol...");
        this.alertTimer.stop();
        this.alerted = false;
        this.animations.play('idle');
    }
}