import Enemy from "./Enemy";

export default class Raptor extends Enemy{
    constructor(game, x, y, sprite){
        
        super(game, x, y, sprite);  

        this.SPEED = 45;
        this.attacking=false;
        this.startled=false;
    }

    initAnimation(){
        this.animations.add('idle', [0], 1, true);
        this.animations.add('startled', [1], 1, true);
        this.animations.play('idle');
    }   

    initAudio(){
		this.raptorSound = this.game.add.audio('raptorSound');
    }

    initPhysics() {
        super.initPhysics();
		this.body.setSize(28,23, 0, 5);
    }
    
    update(){
        if (this.body.touching.down && this.attacking) {
            this.attacking = false;
            this.resumePatrol();
        } 
        if (!this.startled){
            this.attacking = false;
            this.scale.x = this.direction;
            this.body.velocity.x = this.SPEED * this.direction;
        }
    }
    
    calculateRoute(obstacle) {
        super.calculateRoute(obstacle);
    }

    die(){
        this.raptorSound.play();
        this.kill();
    }

    resumePatrol(){
        super.resumePatrol();
    }

    startle() {
        if (!this.attacking)
            super.startle();
    }

    playDeathSound() {
        this.raptorSound.play();
    }

    attack(){
        if (!this.attacking){
            this.body.velocity.y = -220;
            this.body.velocity.x = 200 * this.direction;
            this.attacking = true;
        }
    }
};