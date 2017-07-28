var Skydiver = {};

var button,
	context,
	text,
	music;

Skydiver.menu = function(game) {};
Skydiver.menu.prototype = {
	preload: function() {
		this.load.image('bg', 'images/bg.jpg', 900, 600);
		this.load.spritesheet('start', 'images/start.jpg', 400, 200);
		this.load.audio('music', 'audio/double.m4a');
	},

	create: function() {
		context = this;

		music = this.add.audio('music');
		music.play();

		//adding the background image
		this.add.image(0, 0, 'bg');

		//start button
		button = this.add.button(this.world.centerX, this.world.centerY, 'start', this.button_click);
		//centering button
		button.anchor.set(0.5, 0.5);

		this.add.text((this.world.centerX - 220), 20,'Skydiving Game!', {font: '58px Century Gothic', fill: 'white'});
		this.add.text(10, 550,'Instructions: Use the arrow keys to move the skydiver back and forth. Collect coins to advance to the',
			{font: '18px Century Gothic', fill: 'white'});
		this.add.text(10, 570,'next level. Avoid the bombs or GAME OVER. Use the spacebar to shoot stars and kill the bombs.',
			{font: '18px Century Gothic', fill: 'white'});
	},

	button_click: function() {
		//starting game.js
		context.state.start('game');
	}
};