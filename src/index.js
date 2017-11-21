import Boot from 'states/Boot';
import Preload from 'states/Preload';
import GameTitle from 'states/GameTitle';
import Stage1 from 'states/Stage1';

class Game extends Phaser.Game {

	constructor() {
		super(144, 81, Phaser.CANVAS, 'gameArea', null);
		
		this.antialias = false;

		/** 
		 * Adds all states to the Game object.
		 * - Boot: First state, is responsible for any initialization or configurations necessary.
		 * - Preload: Loads all assets to the game cache object.
		 * - GameTitle: The "main menu" state. From there the player can start the game at last.
		 * - Stage1: The first stage of the game.
		*/
		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('GameTitle', GameTitle, false);
		this.state.add('Stage1', Stage1, false);

		//Sets the initial state where the game starts in.
		this.state.start('Boot');
	}

}

new Game();
