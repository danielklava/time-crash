import Enemy from "./Enemy";

export default class Raptor extends Enemy{
    constructor(game, x, y, sprite){
        
        super(game, x, y, sprite);  

        this.SPEED = 45;
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
        if (!this.startled){
            this.scale.x = this.direction;
            this.body.velocity.x = this.SPEED * this.direction;
        }
    }

    calculateRoute(obstacle) {
        super.calculateRoute(obstacle);
    }

    die(){
        this.raptorSound.play();
        this.body.destroy();
    }

    resumePatrol(){
        supert.resumePatrol();
    }

    startle() {
        super.startle();
    }

    playDeathSound() {
        this.raptorSound.play();
    }
};