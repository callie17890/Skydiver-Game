var button,
	context,
	text;

Skydiver.win = function(game) {};
Skydiver.win.prototype = {
	preload: function() {
		this.load.image('bg2', 'images/bg2.jpg', 900, 600);
		this.load.spritesheet('start', 'images/start.jpg', 400, 200);
	},

	create: function() {
		context = this;

		this.add.image(0, 0, 'bg2');

		//start button
		button = this.add.button(this.world.centerX, this.world.centerY, 'start', this.button_click);
		//centering button
		button.anchor.set(0.5, 0.5);

		text = this.add.text(40, 20,'You won! Press Start to play again.', {font: '50px Century Gothic', fill: 'white'});
	},

	button_click: function() {
		//starting game.js
		context.state.start('game');
	}
};