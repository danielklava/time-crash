export default class Enemy extends Phaser.Sprite {
    constructor(game, x, y, sprite) {

        super(game, x, y, sprite);

        this.alpha = 1;
        this.anchor.set(0.5);
        this.direction = 1;

        this.initAnimation();
        this.initPhysics();
        this.initAudio();

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
        if (!this.startled){
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
        if (!this.startled) {
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

    resumePatrol(){
        this.startled = false;
        this.animations.play('idle');
    }

    startle() {
        this.animations.play('startled');
        this.body.velocity.x = 0;
        console.log(this.startled);
        if (this.startled != true){
            console.log("Startled! Waiting for 1 second.");
            this.startled = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                console.log("Resuming patrol");
                this.resumePatrol();
            }, this);
        }
    }
};