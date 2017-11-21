(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Boot = require('states/Boot');

var _Boot2 = _interopRequireDefault(_Boot);

var _Preload = require('states/Preload');

var _Preload2 = _interopRequireDefault(_Preload);

var _GameTitle = require('states/GameTitle');

var _GameTitle2 = _interopRequireDefault(_GameTitle);

var _Stage = require('states/Stage1');

var _Stage2 = _interopRequireDefault(_Stage);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 144, 81, Phaser.CANVAS, 'gameArea', null));

		_this.antialias = false;

		/** 
   * Adds all states to the Game object.
   * - Boot: First state, is responsible for any initialization or configurations necessary.
   * - Preload: Loads all assets to the game cache object.
   * - GameTitle: The "main menu" state. From there the player can start the game at last.
   * - Stage1: The first stage of the game.
  */
		_this.state.add('Boot', _Boot2.default, false);
		_this.state.add('Preload', _Preload2.default, false);
		_this.state.add('GameTitle', _GameTitle2.default, false);
		_this.state.add('Stage1', _Stage2.default, false);

		//Sets the initial state where the game starts in.
		_this.state.start('Boot');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/Boot":7,"states/GameTitle":8,"states/Preload":9,"states/Stage1":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var DialogBox = function (_Phaser$Sprite) {
	_inherits(DialogBox, _Phaser$Sprite);

	function DialogBox(game, x, y, sprite, speaker, sentence, callback) {
		_classCallCheck(this, DialogBox);

		console.log(sentence);

		var _this = _possibleConstructorReturn(this, (DialogBox.__proto__ || Object.getPrototypeOf(DialogBox)).call(this, game, x, y, sprite));

		_this.speaker = speaker;
		_this.sentence = sentence;
		_this.callback = callback;

		_this.x = x;
		_this.y = y;

		_this.init();
		_this.showText();
		return _this;
	}

	_createClass(DialogBox, [{
		key: 'init',
		value: function init() {
			this.dialog = this.game.add.sprite(this.x, this.y, 'dialog');
			this.dialog.fixedToCamera = true;

			this.dialog.alignIn(this.game.world.bounds, Phaser.CENTER);

			this.portrait = this.game.add.sprite(2 + this.x, 2 + this.y, this.speaker.toLowerCase() + "_portrait");
			this.portrait.animations.add('talk');
			this.portrait.animations.play('talk', 16, true);
			this.portrait.fixedToCamera = true;

			this.textSpeaker = this.game.add.bitmapText(25 + this.x, 5, "font", this.speaker + ":", 8);
			this.textSpeaker.fixedToCamera = true;

			this.textBuffer = this.game.add.bitmapText(25 + this.x, 15, "font", "", 8);
			this.textBuffer.fixedToCamera = true;
		}
	}, {
		key: 'showText',
		value: function showText() {
			var i = -1;
			// Loop logic to show one character at a time.
			// When the sentence is completely printed, end the loop.
			this.game.time.events.loop(Phaser.Timer.SECOND * 0.10, function () {
				if (i == this.sentence.length - 1) {
					//If reached the end of the sentence, wait for 2 seconds then stop event.
					this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
						console.log(this.sentence);

						this.game.time.events.stop();
						this.clear();
						this.callback();
					}, this);
				} else {
					i++;
					this.textBuffer.text = this.textBuffer.text + this.sentence[i];
				}
			}, this);
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.dialog.destroy();
			this.portrait.destroy();
			this.textSpeaker.destroy();
			this.textBuffer.destroy();
		}
	}]);

	return DialogBox;
}(Phaser.Sprite);

exports.default = DialogBox;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Obstacle = function (_Phaser$Sprite) {
    _inherits(Obstacle, _Phaser$Sprite);

    function Obstacle(game, x, y, sprite) {
        _classCallCheck(this, Obstacle);

        var _this = _possibleConstructorReturn(this, (Obstacle.__proto__ || Object.getPrototypeOf(Obstacle)).call(this, game, x, y, sprite));

        _this.initPhysics();
        return _this;
    }

    _createClass(Obstacle, [{
        key: "initPhysics",
        value: function initPhysics() {
            this.game.physics.arcade.enable(this);
            this.enableBody = true;
            this.body.immovable = true;
            this.body.allowGravity = false;
        }
    }]);

    return Obstacle;
}(Phaser.Sprite);

exports.default = Obstacle;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Player = function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(game, x, y, sprite) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, sprite));

        _this.alpha = 1;
        _this.anchor.set(0.5);

        _this.initAnimation();
        _this.initPhysics();
        _this.initWeapon();
        _this.initInput();
        _this.initAudio();

        game.add.existing(_this);
        return _this;
    }

    _createClass(Player, [{
        key: 'initAnimation',
        value: function initAnimation() {
            this.animations.add('idle', Phaser.Animation.generateFrameNames('hero_idle', 1, 2), 3, true);
            this.animations.add('run', Phaser.Animation.generateFrameNames('hero_run', 1, 10), 12, true);
            this.animations.add('crouch', ['hero_crouch1'], 10, true);
            //this.animations.add('jump', 'hero_idle1', 1, true); TODO: review
            this.animations.play('idle');
        }
    }, {
        key: 'initAudio',
        value: function initAudio() {
            this.jumpSound = this.game.add.audio('jump');
            this.shootSound = this.game.add.audio('shoot');
        }
    }, {
        key: 'initPhysics',
        value: function initPhysics() {
            this.game.physics.arcade.enable(this);
            this.enableBody = true;

            this.body.gravity.y = this.game.physics.arcade.gravity.y;
            this.body.collideWorldBounds = true;
            this.body.maxVelocity.y = 500;
            this.body.setSize(14, 23);
        }
    }, {
        key: 'initInput',
        value: function initInput() {
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);
            this.actionButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SHIFT);
        }
    }, {
        key: 'initWeapon',
        value: function initWeapon() {
            this.weapon = this.game.add.weapon(5, 'bullet');
            this.weapon.bulletSpeed = 100;
            this.weapon.fireRate = 500;
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            this.weapon.bulletKillDistance = 45;
            this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
            this.weapon.bulletGravity.y = -350;
            this.weapon.trackSprite(this, 5, 0, true);
            this.weapon.trackRotation = false;
        }
    }, {
        key: 'update',
        value: function update() {
            /* TODO: Review jump animation
            if (this.body.velocity.y != 0){
            //this.animations.play('jump');
            }*/

            if (this.game.inputEnabled) {
                if (this.cursors.left.isDown) {
                    this.body.velocity.x = -45;
                    this.animations.play('run');

                    if (this.scale.x == 1) {
                        this.scale.x = -1;
                    }

                    this.weapon.fireAngle = Phaser.ANGLE_LEFT;
                } else if (this.cursors.right.isDown) {
                    this.body.velocity.x = 45;
                    this.animations.play('run');

                    if (this.scale.x == -1) {
                        this.scale.x = 1;
                    }

                    this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
                } else if (this.cursors.down.isDown) {
                    this.body.velocity.x = 0;
                    this.animations.play('crouch');
                } else {
                    this.body.velocity.x = 0;
                    this.animations.play('idle');
                }

                if (this.jumpButton.isDown && this.body.touching.down) {
                    this.jump();
                }

                if (this.fireButton.isDown) {
                    this.weapon.fire();
                    this.shootSound.play();
                }
            }
        }
    }, {
        key: 'jump',
        value: function jump() {
            this.body.velocity.y = -210;
            this.jumpSound.play();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.body.velocity.x = 0;
            this.animations.play('idle');
        }
    }]);

    return Player;
}(Phaser.Sprite);

exports.default = Player;
;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Raptor = function (_Phaser$Sprite) {
    _inherits(Raptor, _Phaser$Sprite);

    function Raptor(game, x, y, sprite) {
        _classCallCheck(this, Raptor);

        var _this = _possibleConstructorReturn(this, (Raptor.__proto__ || Object.getPrototypeOf(Raptor)).call(this, game, x, y, sprite));

        _this.alpha = 1;
        _this.anchor.set(0.5);
        _this.direction = 1;

        //this.initAnimation();    
        _this.initPhysics();
        _this.initAudio();

        _this.moving = true;

        game.add.existing(_this);
        return _this;
    }

    _createClass(Raptor, [{
        key: 'initAnimation',
        value: function initAnimation() {}
    }, {
        key: 'initAudio',
        value: function initAudio() {
            this.raptorSound = this.game.add.audio('raptorSound');
        }
    }, {
        key: 'initPhysics',
        value: function initPhysics() {
            this.game.physics.arcade.enable(this);
            this.enableBody = true;

            this.body.gravity.y = this.game.physics.arcade.gravity.y;
            this.body.collideWorldBounds = true;
            this.body.maxVelocity.y = 500;
            this.body.setSize(15, 29);
        }
    }, {
        key: 'update',
        value: function update() {
            this.scale.x = this.direction;
            this.body.velocity.x = 25 * this.direction;
        }
    }, {
        key: 'calculateRoute',
        value: function calculateRoute(obstacle) {
            if (this.direction > 0 && this.x > obstacle.x + obstacle.width || this.direction < 0 && this.x < obstacle.x) {
                this.direction *= -1;
            }
        }
    }, {
        key: 'die',
        value: function die() {
            this.raptorSound.play();
            this.body.destroy();
        }
    }, {
        key: 'playDeathSound',
        value: function playDeathSound() {
            this.raptorSound.play();
        }
    }]);

    return Raptor;
}(Phaser.Sprite);

exports.default = Raptor;
;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Soldier = function (_Phaser$Sprite) {
    _inherits(Soldier, _Phaser$Sprite);

    function Soldier(game, x, y, sprite) {
        _classCallCheck(this, Soldier);

        var _this = _possibleConstructorReturn(this, (Soldier.__proto__ || Object.getPrototypeOf(Soldier)).call(this, game, x, y, sprite));

        _this.alpha = 1;
        _this.anchor.set(0.5);
        _this.direction = 1;

        //this.initAnimation();    
        _this.initPhysics();
        _this.initWeapon();
        //this.initAudio();

        _this.moving = true;

        game.add.existing(_this);
        return _this;
    }

    _createClass(Soldier, [{
        key: 'initAnimation',
        value: function initAnimation() {
            this.animations.add('idle', Phaser.Animation.generateFrameNames('hero_idle', 0, 1, "", 1), 3, true);
            this.animations.add('run', Phaser.Animation.generateFrameNames('hero_run', 1, 10, "", 1), 12, true);
            //this.animations.add('jump', 'hero_idle1', 1, true); TODO: review
            this.animations.play('idle');
        }
    }, {
        key: 'initAudio',
        value: function initAudio() {
            this.jumpSound = this.game.add.audio('jump');
            this.shootSound = this.game.add.audio('shoot');
        }
    }, {
        key: 'initPhysics',
        value: function initPhysics() {
            this.game.physics.arcade.enable(this);
            this.enableBody = true;

            this.body.gravity.y = this.game.physics.arcade.gravity.y;
            this.body.collideWorldBounds = true;
            this.body.maxVelocity.y = 500;
            this.body.setSize(15, 29);
        }
    }, {
        key: 'initWeapon',
        value: function initWeapon() {
            this.weapon = this.game.add.weapon(5, 'bullet');
            this.weapon.bulletSpeed = 100;
            this.weapon.fireRate = 500;
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            this.weapon.bulletKillDistance = 45;
            this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
            this.weapon.bulletGravity.y = -350;
            this.weapon.trackSprite(this, 5, -2, true);
            this.weapon.trackRotation = false;
        }
    }, {
        key: 'update',
        value: function update() {
            this.scale.x = this.direction;
            this.body.velocity.x = 25 * this.direction;

            if (this.direction == 1) {
                this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            } else {
                this.weapon.fireAngle = Phaser.ANGLE_LEFT;
            }
        }
    }, {
        key: 'calculateRoute',
        value: function calculateRoute(obstacle) {
            if (this.direction > 0 && this.x > obstacle.x + obstacle.width || this.direction < 0 && this.x < obstacle.x) {
                this.direction *= -1;
            }
        }
    }, {
        key: 'fire',
        value: function fire() {
            this.weapon.fire();
        }
    }]);

    return Soldier;
}(Phaser.Sprite);

exports.default = Soldier;
;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Boot = function (_Phaser$State) {
	_inherits(Boot, _Phaser$State);

	function Boot() {
		_classCallCheck(this, Boot);

		return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).apply(this, arguments));
	}

	_createClass(Boot, [{
		key: 'create',

		/**
   * Sets up all rendering configuration necessary.
   */
		value: function create() {
			this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

			this.scale.setUserScale(4, 4);

			this.game.renderer.renderSession.roundPixels = false;
			this.game.camera.roundPx = false;

			Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

			this.scale.pageAlignHorizontally = true;

			this.state.start('Preload');
		}
	}]);

	return Boot;
}(Phaser.State);

exports.default = Boot;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameTitle = function (_Phaser$State) {
	_inherits(GameTitle, _Phaser$State);

	function GameTitle() {
		_classCallCheck(this, GameTitle);

		return _possibleConstructorReturn(this, (GameTitle.__proto__ || Object.getPrototypeOf(GameTitle)).apply(this, arguments));
	}

	_createClass(GameTitle, [{
		key: 'create',
		value: function create() {

			this.createBackground();
			this.createActors();
			this.addMenuOptions();

			this.spacebarButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

			this.themeMusic = this.game.add.audio('theme');
			this.themeMusic.play();
		}
	}, {
		key: 'update',
		value: function update() {
			this.updateBackground();

			if (this.spacebarButton.isDown || this.enterButton.isDown) {
				this.startCallback();
			}
		}
	}, {
		key: 'addMenuOptions',
		value: function addMenuOptions() {
			this.menuStart = this.game.add.button(this.game.world.right - 40, this.game.world.bottom - 10, 'menu-start', this.startCallback, this, 2, 1, 0);
			this.menuStart.inputEnabled = true;
			this.menuStart.events.onInputDown.add(this.startCallback, this);
		}
	}, {
		key: 'createActors',
		value: function createActors() {
			this.car = this.game.add.sprite(-100, 54, 'car-driving');
			this.car.animations.add('drive');
			this.car.animations.play('drive', 5, true);

			this.add.tween(this.car).to({ x: 7, y: 55 }, 2000, Phaser.Easing.Cubic.InOut, true, 1, 1000, true);

			this.gameTitle = this.game.add.sprite(30, 0, 'gameTitle');
		}
	}, {
		key: 'createBackground',
		value: function createBackground() {
			this.game.stage.backgroundColor = "#000";

			this.background = this.game.add.tileSprite(0, (this.game.height - this.game.cache.getImage('background').height) / 2, this.game.width, this.game.cache.getImage('background').height, 'background');
			this.clouds = this.game.add.tileSprite(0, (this.game.height - this.game.cache.getImage('clouds').height) / 2, this.game.width, this.game.cache.getImage('clouds').height, 'clouds');
			this.cityFar = this.game.add.tileSprite(0, (this.game.height - this.game.cache.getImage('city-far').height) / 2, this.game.width, this.game.cache.getImage('city-far').height, 'city-far');
			this.cityMid = this.game.add.tileSprite(0, (this.game.height - this.game.cache.getImage('city-mid').height) / 2, this.game.width, this.game.cache.getImage('city-mid').height, 'city-mid');
			this.cityFront = this.game.add.tileSprite(0, (this.game.height - this.game.cache.getImage('city-front').height) / 2, this.game.width, this.game.cache.getImage('city-front').height, 'city-front');
			this.fence = this.game.add.tileSprite(0, 37, this.game.width, this.game.cache.getImage('fence').height, 'fence');
			this.road = this.game.add.tileSprite(0, (this.game.height - this.game.cache.getImage('road').height) / 2, this.game.width, this.game.cache.getImage('road').height, 'road');
		}
	}, {
		key: 'startCallback',
		value: function startCallback() {
			this.hideTitle = this.add.tween(this.gameTitle).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
			this.hideTitle.onComplete.add(this.introMoveCar, this);
			this.hideTitle.start();
		}
	}, {
		key: 'introMoveCar',
		value: function introMoveCar() {
			this.carLeaves = this.add.tween(this.car).to({ x: 200 }, 2000, Phaser.Easing.Cubic.InOut, false, 0, 0, false);
			this.carLeaves.onComplete.add(this.fadeOut, this);
			this.carLeaves.start();
		}
	}, {
		key: 'fadeOut',
		value: function fadeOut() {
			this.car.visible = false;
			this.camera.fade("#000000", 500);
			this.camera.onFadeComplete.add(this.beginGame, this);
		}
	}, {
		key: 'beginGame',
		value: function beginGame() {
			this.state.start('Stage1');
		}
	}, {
		key: 'updateBackground',
		value: function updateBackground() {
			this.background.tilePosition.x -= 0.02;
			this.clouds.tilePosition.x -= 0.01;
			this.cityFar.tilePosition.x -= 0.15;
			this.cityMid.tilePosition.x -= 0.3;
			this.cityFront.tilePosition.x -= 0.5;
			this.fence.tilePosition.x -= 1;
			this.road.tilePosition.x -= 1;
		}
	}]);

	return GameTitle;
}(Phaser.State);

exports.default = GameTitle;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Preload = function (_Phaser$State) {
  _inherits(Preload, _Phaser$State);

  function Preload() {
    _classCallCheck(this, Preload);

    return _possibleConstructorReturn(this, (Preload.__proto__ || Object.getPrototypeOf(Preload)).apply(this, arguments));
  }

  _createClass(Preload, [{
    key: 'preload',
    value: function preload() {

      var imagesToLoad = [
      //GAME TITLE
      { id: 'gameTitle', file: 'assets/images/gametitle.png' },

      //UI
      { id: 'dialog', file: 'assets/images/dialog_box.png' },

      //BACKGROUND
      { id: 'city-far', file: 'assets/images/city-far.png' }, { id: 'city-front', file: 'assets/images/city-front.png' }, { id: 'city-mid', file: 'assets/images/city-mid.png' }, { id: 'clouds', file: 'assets/images/clouds.png' }, { id: 'fence', file: 'assets/images/fence.png' }, { id: 'background', file: 'assets/images/background.png' }, { id: 'road', file: 'assets/images/road.png' },

      //OBSTACLES
      { id: 'container01', file: 'assets/images/container_01.png' }, { id: 'cardboardbox', file: 'assets/images/cardboardbox.png' }, { id: 'menu-start', file: 'assets/images/menu-start.png' }, { id: 'ground', file: 'assets/images/ground.png' },

      //BULLET
      { id: 'bullet', file: 'assets/images/bullet.png' },

      //LAB  
      { id: 'bg-lab', file: 'assets/images/bg_lab.png' }, { id: 'lab-walls', file: 'assets/images/lab_walls.png' }, { id: 'lab-computer', file: 'assets/images/lab_computer.png' }, { id: 'lab-energy', file: 'assets/images/lab_energy.png' }];

      for (var i = 0; i < imagesToLoad.length; i++) {
        this.game.load.image(imagesToLoad[i].id, imagesToLoad[i].file);
      }

      //CAR
      this.game.load.image('car-idle', 'assets/images/car-idle.png');
      this.game.load.spritesheet('car-driving', 'assets/images/car-sheet.png', 70, 18, 2);

      //HERO
      this.game.load.atlas('hero', 'assets/images/hero_atlas.png', 'assets/images/hero_atlas.json');

      //NPCS
      this.game.load.spritesheet('soldier', 'assets/images/soldier.png', 21, 29, 1);
      this.game.load.spritesheet('selene_portrait', 'assets/images/selene_portrait.png', 20, 20);

      //ENEMIES
      this.game.load.atlas('raptor', 'assets/images/raptor_atlas.png', 'assets/images/raptor_atlas.json');

      //AUDIO
      this.game.load.audio('theme', ['assets/audio/theme.wav'], true);
      this.game.load.audio('shoot', ['assets/audio/laser.ogg'], true);
      this.game.load.audio('jump', ['assets/audio/jump.wav'], false);
      this.game.load.audio('raptorSound', ['assets/audio/raptor.wav'], false);

      //FONT
      this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
    }
  }, {
    key: 'create',
    value: function create() {
      this.stage.backgroundColor = "#FFF";

      this.state.start('Stage1', true, false);
    }
  }]);

  return Preload;
}(Phaser.State);

exports.default = Preload;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _Player = require('../objects/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Obstacle = require('../objects/Obstacle');

var _Obstacle2 = _interopRequireDefault(_Obstacle);

var _DialogBox = require('../objects/DialogBox');

var _DialogBox2 = _interopRequireDefault(_DialogBox);

var _Soldier = require('../objects/Soldier');

var _Soldier2 = _interopRequireDefault(_Soldier);

var _Raptor = require('../objects/Raptor');

var _Raptor2 = _interopRequireDefault(_Raptor);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Stage1 = function (_Phaser$State) {
	_inherits(Stage1, _Phaser$State);

	function Stage1() {
		_classCallCheck(this, Stage1);

		return _possibleConstructorReturn(this, (Stage1.__proto__ || Object.getPrototypeOf(Stage1)).apply(this, arguments));
	}

	_createClass(Stage1, [{
		key: 'create',
		value: function create() {
			this.GRAVITY = 350;
			this.STAGE_LENGTH = 144 * 4;

			//Stage world settings
			this.adjustStageWorld(this.STAGE_LENGTH);

			this.camera.flash("#000000");
			this.game.inputEnabled = false;

			//Enble Arcade Physics
			this.physics.startSystem(Phaser.Physics.ARCADE);
			this.physics.arcade.gravity.y = this.GRAVITY;

			this.createBackground();
			this.createObjects();
			this.createActors();

			//add phisics to elements (oh, really?)
			this.addPhysicsToElements(this.GRAVITY);

			//camera settings
			this.adjustCamera();
			this.game.stage.smoothed = false;

			this.timer = this.game.time.create();
			this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 0.5, this.endTimer, this);
			this.timer.start();

			this.timerText = this.game.add.bitmapText(100, 65, "font", "", 16);
			this.timerText.fixedToCamera = true;
			this.timerText.cameraOffset.setTo(100, 65);

			this.themeMusic = this.game.add.audio('theme', 1, true);
			this.themeMusic.play();
		}

		/**
   * The method to add a DialogBox object in the top of the screen.
   * While the dialog is showing text, all input from the player is disabled.
   * 
   * @param speaker The "speaker" of the dialog. This object will be used to display in the dialog, and to find its portrait. 
   * @param sentence The string sentence that will be printed character by character.
   */

	}, {
		key: 'addDialogText',
		value: function addDialogText(speaker, sentence) {
			this.game.inputEnabled = true;
			this.hero.stop();

			var offsetX = this.game.camera.x;

			//Adds the dialog with 1 pixel margin from the game bounds
			new _DialogBox2.default(this.game, 1 + offsetX, 1, 'dialog', speaker, sentence, function () {
				this.game.inputEnabled = true;
			});
		}
	}, {
		key: 'endTimer',
		value: function endTimer() {
			// Stop the timer when the delayed event triggers
			this.timer.stop();
		}
	}, {
		key: 'formatTime',
		value: function formatTime(s) {
			// Convert seconds (s) to a nicely formatted and padded time string
			var minutes = "0" + Math.floor(s / 60);
			var seconds = "0" + (s - minutes * 60);
			return minutes.substr(-2) + ":" + seconds.substr(-2);
		}
	}, {
		key: 'adjustStageWorld',
		value: function adjustStageWorld(stageLength) {
			this.game.world.setBounds(0, 0, stageLength, this.game.height * 1.5);
		}
	}, {
		key: 'createActors',
		value: function createActors() {
			//creating ground sprite
			this.ground = this.add.tileSprite(0, this.game.world.bounds.height - 10, this.game.world.width, 10, 'ground');

			this.hero = new _Player2.default(this.game, 70, this.getObjectPositionAboveGround('hero'), 'hero');
			this.hero.y = this.getGroundPositionY() - this.hero.height;

			this.car = this.game.add.sprite(-100, this.getObjectPositionAboveGround('car-idle') + 3, 'car-idle');

			this.carArrives = this.add.tween(this.car).to({ x: 0 }, 2000, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
			this.carArrives.onComplete.add(this.showHero, this);
			this.carArrives.start();

			this.soldiers = this.add.group();
			this.soldier = new _Soldier2.default(this.game, 130, 20, 'soldier');
			this.soldiers.add(this.soldier);

			this.raptors = this.add.group();
			this.raptor = this.game.add.sprite(190, 45, 'raptor');
			this.raptors.add(this.raptor);
		}
	}, {
		key: 'createObjects',
		value: function createObjects() {
			this.objects = this.add.group();

			this.container01 = new _Obstacle2.default(this.game, 110, this.getObjectPositionAboveGround('container01'), 'container01');
			this.container02 = new _Obstacle2.default(this.game, 280, this.getObjectPositionAboveGround('container01'), 'container01');
			this.cardboardbox = new _Obstacle2.default(this.game, 80, this.getObjectPositionAboveGround('cardboardbox'), 'cardboardbox');

			this.objects.addMultiple([this.container01, this.container01, this.cardboardbox]);

			this.eventLab = this.add.sprite(-100, 2);
			this.eventLab.scale.y = this.game.height;
		}
	}, {
		key: 'showHero',
		value: function showHero() {
			this.hero.alpha = 1;
			this.addDialogText("Selene", "You must stop Dr. Stein!");
		}
	}, {
		key: 'orderStageElements',
		value: function orderStageElements() {
			this.game.world.bringToTop(this.background);
			this.game.world.bringToTop(this.clouds);
			this.game.world.bringToTop(this.cityFar);
			this.game.world.bringToTop(this.cityMid);
			this.game.world.bringToTop(this.cityFront);
			this.game.world.bringToTop(this.car);
		}
	}, {
		key: 'addPhysicsToElements',
		value: function addPhysicsToElements(gravity) {
			this.physics.arcade.enable(this.ground);
			this.physics.arcade.enable(this.labComputer);
			this.physics.arcade.enable(this.raptor);

			this.physics.arcade.enable(this.eventLab);

			this.eventLab.enableBody = true;
			this.eventLab.body.immovable = true;
			this.eventLab.body.allowGravity = false;

			this.labComputer.enableBody = true;
			this.labComputer.body.immovable = true;
			this.labComputer.body.allowGravity = false;

			this.ground.body.immovable = true;
			this.ground.body.allowGravity = false;

			this.raptor.body.allowGravity = true;
			this.raptor.enableBody = true;
			this.raptor.body.collideWorldBounds = true;
		}
	}, {
		key: 'adjustCamera',
		value: function adjustCamera() {
			this.camera.follow(this.hero);
		}
	}, {
		key: 'interactComputer',
		value: function interactComputer() {
			console.log("Interact");

			return;
		}
	}, {
		key: 'update',
		value: function update() {
			this.updateBackground();

			if (this.eventLab != null && this.checkOverlap(this.hero, this.eventLab)) {
				this.startEventLab();
				this.eventLab = null;
			}

			//Trigger events
			this.physics.arcade.overlap(this.hero, this.labComputer, this.interactComputer, null, this);
			this.physics.arcade.overlap(this.hero.weapon.bullets, this.raptor, this.bulletHitEnemy, null, this);

			//Collision events
			this.physics.arcade.collide(this.hero, this.ground);
			this.physics.arcade.collide(this.hero, this.objects);
			this.physics.arcade.collide(this.hero, this.raptors, this.restartStage, null, this);

			this.physics.arcade.collide(this.objects, this.raptors, this.enemyHitWall);
			this.physics.arcade.collide(this.objects, this.soldiers, this.enemyHitWall);

			this.physics.arcade.collide(this.raptors, this.ground);
			this.physics.arcade.collide(this.soldiers, this.ground);

			for (var i = 0; i < this.soldiers.length; i++) {
				var soldier = this.soldiers.children[i];

				if (Math.round(soldier.y) == Math.round(this.hero.y)) {
					console.log("Seen! Begin chase.");

					if (soldier.x > this.hero.x && soldier.direction == -1) {
						soldier.body.velocity.x = -80;
						soldier.body.velocity.y = -100;

						soldier.fire();
					} else if (soldier.x < this.hero.x && soldier.direction == 1) {
						soldier.body.velocity.x = 80;
						soldier.body.velocity.y = -100;

						soldier.fire();
					}
				}
			}

			this.updateEnemies();
		}
	}, {
		key: 'startEventLab',
		value: function startEventLab() {
			this.addDialogText("Selene", "This is it.");
			this.eventLab.destroy();
		}
	}, {
		key: 'restartStage',
		value: function restartStage() {
			this.game.state.restart();
		}
	}, {
		key: 'updateEnemies',
		value: function updateEnemies() {
			if (this.raptor.body != null) if (Math.random() > 0.5) {
				if (this.raptor.scale.x > 0) {
					this.raptor.body.velocity.x = 30;
				} else {
					this.raptor.body.velocity.x = -30;
				}
			}
		}
	}, {
		key: 'enemyHitWall',
		value: function enemyHitWall(object, enemy) {
			if (enemy instanceof _Soldier2.default || enemy instanceof _Raptor2.default) {
				enemy.calculateRoute(object);
			}
		}
	}, {
		key: 'bulletHitEnemy',
		value: function bulletHitEnemy(bullet, object) {
			bullet.destroy();
			object.destroy();

			if (object instanceof _Raptor2.default) {
				object.die();
			}
		}
	}, {
		key: 'createBackground',
		value: function createBackground(stageLength) {
			this.game.stage.backgroundColor = "#764b86";

			this.background = this.addImageToBackground('background');
			this.clouds = this.addImageToBackground('clouds');
			this.cityFar = this.addImageToBackground('city-far');
			this.cityMid = this.addImageToBackground('city-mid');
			this.cityFront = this.addImageToBackground('city-front');
			this.fence = this.addImageToBackground('fence', 0, this.getObjectPositionAboveGround('fence'));

			//LAB BG
			this.bgLab = this.game.add.sprite(144 * 3, 0, 'bg-lab');
			this.labWalls = this.game.add.sprite(144 * 3, 0, 'lab-walls');
			this.labComputer = this.game.add.sprite(505, 50, 'lab-computer');
			this.labEnergy = this.game.add.sprite(144 * 3, 0, 'lab-energy');

			this.add.tween(this.labEnergy).to({ y: -5 }, 1000, Phaser.Easing.Cubic.InOut, true, 1, 1000, true);
		}
	}, {
		key: 'updateBackground',
		value: function updateBackground() {
			this.background.tilePosition.x -= 0.03;
			this.clouds.tilePosition.x -= 0.05;

			this.background.tilePosition.y = this.game.camera.y;
			this.clouds.tilePosition.y = this.game.camera.y;
			this.cityFar.tilePosition.y = this.game.camera.y;
			this.cityMid.tilePosition.y = this.game.camera.y;
			this.cityFront.tilePosition.y = this.game.camera.y;
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.status == "WIN") {
				this.timerText.text = "You won!";
			} else {
				if (this.timer.running) {
					var runningTime = this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000));
					this.timerText.text = runningTime;
				} else {
					this.timerText.text = "Failed";
					//this.restartStage();
				}
			}

			this.game.debug.body(this.eventLab);
			//this.game.debug.body(this.hero);

			for (var i = 0; i < this.soldiers.length; i++) {
				//this.game.debug.body(this.soldiers.children[i]);
			}
			for (var i = 0; i < this.raptors.length; i++) {
				this.game.debug.body(this.raptors.children[i]);
			}
		}
	}, {
		key: 'getGroundPositionY',
		value: function getGroundPositionY() {
			return this.game.world.bounds.height - this.game.cache.getImage('ground').height;
		}
	}, {
		key: 'getObjectPositionAboveGround',
		value: function getObjectPositionAboveGround(spriteName) {
			return this.getGroundPositionY() - this.game.cache.getImage(spriteName).height;
		}
	}, {
		key: 'checkOverlap',
		value: function checkOverlap(spriteA, spriteB) {
			var boundsA = spriteA.getBounds();
			var boundsB = spriteB.getBounds();

			return Phaser.Rectangle.intersects(boundsA, boundsB);
		}
	}, {
		key: 'addImageToBackground',
		value: function addImageToBackground(imageName, x, y) {

			if (!x) x = 0;
			if (!y) y = this.game.height - this.game.cache.getImage(imageName).height;

			var bgSprite = this.game.add.tileSprite(x, y, this.game.world.width, this.game.cache.getImage(imageName).height, imageName);

			return bgSprite;
		}
	}]);

	return Stage1;
}(Phaser.State);

;

exports.default = Stage1;

},{"../objects/DialogBox":2,"../objects/Obstacle":3,"../objects/Player":4,"../objects/Raptor":5,"../objects/Soldier":6}]},{},[1])
//# sourceMappingURL=game.js.map
