export default class Player extends Phaser.Sprite{
    constructor(game, x, y){
        
        super(game, x, y, 'hero');

        this.game.physics.arcade.enable(this);

		this.animations.add('idle', Phaser.Animation.generateFrameNames('hero_idle', 0, 1,"",1), 3, true);
		this.animations.add('run', Phaser.Animation.generateFrameNames('hero_run', 1, 10,"",1), 12, true);
		//this.hero.animations.add('jump', 'hero_idle1', 1, true);
		this.alpha = 0;
		this.anchor.set(0.5);
		this.animations.play('run');
    }
};