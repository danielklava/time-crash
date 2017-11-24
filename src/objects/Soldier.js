import Enemy from "./Enemy";

export default class Soldier extends Enemy {
    constructor(game, x, y, sprite) {
        super(game, x, y, sprite);

        this.initWeapon();

        this.SPEED = 25;
    }

    initAnimation() {
        this.animations.add('idle', [0], 3, true);
        this.animations.add('startled', [1], 12, true);
        this.animations.add('shooting', [2], true);
        this.animations.play('idle');
    }

    initAudio() {
        super.initAudio();

        this.jumpSound = this.game.add.audio('jump');
        this.shootSound = this.game.add.audio('shoot');
    }

    initPhysics() {
        super.initPhysics();
        this.body.setSize(15, 29);
    }

    initWeapon() {
        this.weapon = this.game.add.weapon(-1, 'bullet');
        this.weapon.bulletSpeed = 100;
        this.weapon.setBulletFrames(0, 2,true);
        this.weapon.bullets.callAll('animations.add', 'animations', 'fire', [0,1], 5, true);
        this.weapon.bullets.callAll('play', null, 'fire');

        this.weapon.fireRate = 500;
        this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
        this.weapon.bulletKillDistance = 100;
        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletGravity.y = -350;
        this.weapon.trackSprite(this, 5, -2, true);
        this.weapon.trackRotation = false;
    }

    update() {
        super.update();

        if (!this.startled){
            this.scale.x = this.direction;
            this.body.velocity.x = this.SPEED * this.direction;
        }
            
        if (this.direction == 1) {
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
        } else {
            this.weapon.fireAngle = Phaser.ANGLE_LEFT;
        }
    }

    calculateRoute(obstacle) {
        super.calculateRoute(obstacle);
    }

    resumePatrol(){
        super.resumePatrol();
    }

    startle() {
        super.startle();
    }

    attack() {
        this.weapon.fire();

        this.resumePatrol();
    }
};