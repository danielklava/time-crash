export default class Obstacle extends Phaser.Sprite{
    constructor(game, x, y, sprite){

        super(game, x, y, sprite);

        this.game.physics.arcade.enable(this);
        this.enableBody = true;
		this.body.immovable=true;
		this.body.allowGravity=false;
    }
}