var background,
	girl,
	score = 0,
	cursors,
	coins,
	bombs,
	score_text,
	level_text,
	context,
	stars,
	starTime = 0,
	fire;

Skydiver.game = function() {};
Skydiver.game.prototype = {
	preload: function() {
		this.load.image('girl', 'images/girl.png');
		this.load.image('background', 'images/1.jpg');
		this.load.image('coin', 'images/coin.png');
		this.load.image('bomb', 'images/bomb.png');
		this.load.image('star', 'images/star.png');
	},

	create: function() {
		
		this.physics.startSystem(Phaser.Physics.ARCADE);

		//adding the moving background
		background = this.add.tileSprite(0, 0, 900, 600, 'background');

		//adding skydiver
		girl = this.add.sprite(360, 10, 'girl');
		this.physics.enable(girl, Phaser.Physics.ARCADE);
		girl.width = 120;
		girl.height = 120;
		//keeps skydiver on screen
		girl.body.collideWorldBounds = true;

		//keyboard buttons
		cursors = this.input.keyboard.createCursorKeys();
		//adding the spacebar for fire
		fire = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//adding a group of coins
		coins = this.add.group();
		//adding a group of bombs
		bombs = this.add.group();
		//adding a group of stars
    	stars = this.add.group();
    	stars.enableBody = true;
    	stars.physicsBodyType = Phaser.Physics.ARCADE;
    	stars.createMultiple(500, 'star');
    	stars.setAll('girl.x', 500);
    	stars.setAll('girl.y', 500);
    	stars.setAll('outOfBoundsKill', true);
    	stars.setAll('checkWorldBounds', true);
		
		//creating a timer, every 3 seconds creates new coin
		this.time.events.loop(Phaser.Timer.SECOND * 1, this.create_coin, this);
		this.time.events.loop(Phaser.Timer.SECOND * 0.7, this.create_bomb, this);

		//level 1 text
		level_text = this.add.text(10, 10,'Level 1', { font: '25px Century Gothic', fill: 'white' });
		//score text
		score_text = this.add.text(10, 40,'Score: 0', { font: '25px Century Gothic', fill: 'white' });
		this.add.text(10, 570,'Coins needed for next level: 5', { font: '20px Century Gothic', fill: 'white' });
	}, //ends create function

	update: function() {
		//redraws background at the speed of 5
		background.tilePosition.y -= 5;

		//moving girl sprite left and right
		if (cursors.left.isDown) {
            girl.body.velocity.x = -200;
        }
        else if (cursors.right.isDown) {
            girl.body.velocity.x = 200;
        }
        else {
        	girl.body.velocity.x = 0;
        }

        //shooting
         if (fire.isDown) {
            if (this.time.now > starTime) {
        		//grab the first star from pool
        		star = stars.getFirstExists(false);
					if (star) {
            			//fire it
            			star.reset(girl.x + 40, girl.y + 110);
            			star.body.velocity.y = 500;
            			starTime = this.time.now + 200;
            		}
           	}
        }

        context = this;
        //if the girl and coins overlap, collision
        this.physics.arcade.overlap(girl, coins, this.score);
        this.physics.arcade.overlap(girl, bombs, this.end);

        this.physics.arcade.overlap(stars, bombs, this.destroy);

        //if score == __ go to next level
        if (score == 5) {
        	score = 0;
        	context.state.start('level2');
        }
        
	}, //ends update function

	create_coin: function() {
		//creating coin at random position
		var coin = this.add.sprite(Math.round(Math.random() * 860), 600, 'coin');
		coins.add(coin);
		this.physics.enable(coin, Phaser.Physics.ARCADE);
		//coin moving up screen
		coin.body.velocity.y = -140;
	}, //ends create_coin function

	create_bomb: function() {
		//creating bomb at random position
		var bomb = this.add.sprite(Math.round(Math.random() * 850), 600, 'bomb');
		bombs.add(bomb);
		this.physics.enable(bomb, Phaser.Physics.ARCADE);
		//bomb moving up screen
		bomb.body.velocity.y = -140;
	}, //ends create_bomb function

	score: function(player, coin) {
		//erases coin
		coin.kill();
		//updates score
		score++;
		score_text.text = "Score: " + score;
	}, //ends score function

	end: function() {
		//going to end screen when girl dies
		context.state.start('end');
	}, //end end function

	destroy: function(star, bomb) {
		star.kill();
		bomb.kill();
	} //end function destroy

}; //end game prototype