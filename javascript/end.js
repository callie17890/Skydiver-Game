var button,
	context,
	text;

Skydiver.end = function(game) {};
Skydiver.end.prototype = {
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

		this.add.text(60, 20,'You Lost! Press Start to play again.', {font: '50px Century Gothic', fill: 'white'});
	},

	button_click: function() {
		//starting game.js
		context.state.start('game');
	}
};