export default class DialogBox extends Phaser.Sprite{
    constructor(game, x, y, sprite, speaker, sentence, callback){

		console.log(sentence);
        super(game, x, y, sprite);
        this.speaker = speaker;
        this.sentence = sentence;
		this.callback = callback;

		this.x = x;
		this.y = y;

		this.init();
		this.showText();
	}
	
	init(){
		this.dialog = this.game.add.sprite(this.x, this.y, 'dialog');
		this.dialog.fixedToCamera = true;

		this.dialog.alignIn(this.game.world.bounds, Phaser.CENTER);
		
        this.portrait = this.game.add.sprite(2 + this.x,2 + this.y, this.speaker.toLowerCase() + "_portrait");
		this.portrait.animations.add('talk');
        this.portrait.animations.play('talk', 16, true);
		this.portrait.fixedToCamera = true;

		this.textSpeaker = this.game.add.bitmapText(25 + this.x, 5, "font", this.speaker + ":", 8);
		this.textSpeaker.fixedToCamera = true;

		this.textBuffer = this.game.add.bitmapText(25 + this.x, 15, "font", "", 8);
		this.textBuffer.fixedToCamera = true;
	}
	
	showText(){
        var i =-1;
        // Loop logic to show one character at a time.
        // When the sentence is completely printed, end the loop.
		this.game.time.events.loop(Phaser.Timer.SECOND*0.10, function() {
			if (i == this.sentence.length - 1){
				//If reached the end of the sentence, wait for 2 seconds then stop event.
				this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
					console.log(this.sentence);
					
					this.game.time.events.stop();
					this.clear();
					this.callback();
				}, this);
			}
			else{
				i++;
				this.textBuffer.text = this.textBuffer.text + this.sentence[i];
			}
		}, this);
	}

	clear(){
		this.dialog.destroy();
		this.portrait.destroy();
		this.textSpeaker.destroy();
		this.textBuffer.destroy();
	}
}