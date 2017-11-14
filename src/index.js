import Preload from 'states/Preload';
import Boot from 'states/Boot';
import GameTitle from 'states/GameTitle';
import Stage1 from 'states/Stage1';

class Game extends Phaser.Game {

	constructor() {
		super(144, 81, Phaser.CANVAS, 'gameArea', null);
		this.antialias = false;
		this.state.add('Preload', Preload, false);
		this.state.add('Boot', Boot, false);
		this.state.add('GameTitle', GameTitle, false);
		this.state.add('Stage1', Stage1, false);
		this.state.start('Boot');
	}

}

new Game();
