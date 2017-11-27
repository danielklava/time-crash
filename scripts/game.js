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

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 230, 81, Phaser.CANVAS, 'gameArea', null));

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

window.game = new Game();

},{"states/Boot":8,"states/GameTitle":9,"states/Preload":10,"states/Stage1":11}],2:[function(require,module,exports){
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
			this.dialog.scale.x = this.game.width / 144;
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

var Enemy = function (_Phaser$Sprite) {
    _inherits(Enemy, _Phaser$Sprite);

    function Enemy(game, x, y, sprite) {
        _classCallCheck(this, Enemy);

        var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, game, x, y, sprite));

        _this.alpha = 1;
        _this.anchor.set(0.5);
        _this.direction = 1;

        _this.initAnimation();
        _this.initPhysics();
        _this.initAudio();

        _this.alertTimer = _this.game.time.create(false);

        _this.moving = true;

        game.add.existing(_this);
        return _this;
    }

    _createClass(Enemy, [{
        key: 'initAnimation',
        value: function initAnimation() {
            /**
             * Should be overriden in the inherited type.
            */
        }
    }, {
        key: 'initAudio',
        value: function initAudio() {
            /**
             * Should be overriden in the inherited type.
            */
        }
    }, {
        key: 'initPhysics',
        value: function initPhysics() {
            this.game.physics.arcade.enable(this);
            this.enableBody = true;

            this.body.gravity.y = this.game.physics.arcade.gravity.y;
            this.body.collideWorldBounds = true;
            this.body.maxVelocity.y = 500;
        }
    }, {
        key: 'update',
        value: function update() {
            if (!this.alerted) {
                this.scale.x = this.direction;
                this.body.velocity.x = 25 * this.direction;
            }

            if (this.direction == 1) {
                this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            } else {
                this.weapon.fireAngle = Phaser.ANGLE_LEFT;
            }
        }
    }, {
        key: 'calculateRoute',
        value: function calculateRoute(obstacle) {
            if (!this.alerted) {
                if (this.direction > 0 && this.x > obstacle.x + obstacle.width || this.direction < 0 && this.x < obstacle.x) {
                    this.direction *= -1;
                }

                if (this.body.touching.left) {
                    this.direction = 1;
                } else if (this.body.touching.right) {
                    this.direction = -1;
                }
            }
        }
    }, {
        key: 'die',
        value: function die() {
            this.alpha = 0;
        }
    }, {
        key: 'alert',
        value: function alert() {
            if (!this.alerted) {
                this.alerted = true;

                this.animations.play('alerted');
                this.body.velocity.x = 0;

                this.alertTimer.stop(true);
                this.waitingTimer = this.alertTimer.add(Phaser.Timer.SECOND * 0.5, this.attack, this);
                this.alertTimer.start();
            }
        }
    }, {
        key: 'attack',
        value: function attack() {}
    }, {
        key: 'resumePatrol',
        value: function resumePatrol() {
            console.log("Resuming patrol...");
            this.alertTimer.stop();
            this.alerted = false;
            this.animations.play('idle');
        }
    }]);

    return Enemy;
}(Phaser.Sprite);

exports.default = Enemy;

},{}],4:[function(require,module,exports){
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

        game.add.existing(_this);
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

var Player = function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(game, x, y, sprite) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, sprite));

        _this.SPEED = 45;

        _this.alpha = 1;
        _this.anchor.set(0.5);
        _this.direction = 1;

        _this.initAnimation();
        _this.initPhysics();
        _this.initWeapon();
        _this.initInput();
        _this.initAudio();

        _this.onWall = false;
        _this.canJump = true;
        _this.hit = false;

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
            this.jumpButton.onDown.add(this.jump, this);

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
            if (this.game.inputEnabled && !this.hit) {
                if (this.cursors.left.isDown || this.cursors.right.isDown) {
                    if (this.cursors.left.isDown) {
                        this.direction = -1;

                        this.weapon.fireAngle = Phaser.ANGLE_LEFT;
                    } else if (this.cursors.right.isDown) {
                        this.direction = 1;

                        this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
                    }

                    this.scale.x = this.direction;
                    this.body.velocity.x = this.SPEED * this.direction;
                    this.animations.play('run');
                } else if (this.cursors.down.isDown) {
                    this.crouch();
                } else if (this.body.touching.down) {
                    this.stop();
                }

                this.body.velocity.y = this.onWall ? 50 : this.body.velocity.y;

                if (this.body.touching.down) {
                    this.canJump = true;
                    this.onWall = false;
                }

                if (this.fireButton.isDown) {
                    this.weapon.fire();
                    this.shootSound.play();
                }
            }
        }
    }, {
        key: 'crouch',
        value: function crouch() {
            this.body.velocity.x = 0;
            this.animations.play('crouch');
        }
    }, {
        key: 'hugWall',
        value: function hugWall() {
            if (!this.body.touching.down && (this.body.touching.right || this.body.touching.left)) {
                this.onWall = true;
            }
        }
    }, {
        key: 'jump',
        value: function jump() {
            if (this.canJump && this.body.touching.down || this.onWall) {
                this.body.velocity.y = -210;
                this.jumpSound.play();

                if (this.onWall) {
                    this.scale.x *= -1;
                    this.direction *= -1;
                    this.body.velocity.x = this.direction * this.SPEED;
                }

                this.canJump = false;
                this.onWall = false;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.body.velocity.x = 0;
            this.animations.play('idle');
        }
    }, {
        key: 'takeDamage',
        value: function takeDamage() {
            this.body.velocity.x = 15 * this.direction * -1;
            this.hit = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                this.hit = false;
            }, this);
        }
    }, {
        key: 'die',
        value: function die() {
            this.kill();
        }
    }]);

    return Player;
}(Phaser.Sprite);

exports.default = Player;
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

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

var _Enemy2 = require('./Enemy');

var _Enemy3 = _interopRequireDefault(_Enemy2);

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

var Raptor = function (_Enemy) {
    _inherits(Raptor, _Enemy);

    function Raptor(game, x, y, sprite) {
        _classCallCheck(this, Raptor);

        var _this = _possibleConstructorReturn(this, (Raptor.__proto__ || Object.getPrototypeOf(Raptor)).call(this, game, x, y, sprite));

        _this.SPEED = 45;
        _this.attacking = false;
        _this.alerted = false;
        return _this;
    }

    _createClass(Raptor, [{
        key: 'initAnimation',
        value: function initAnimation() {
            this.animations.add('idle', [0], 1, true);
            this.animations.add('alerted', [1], 1, true);
            this.animations.play('idle');
        }
    }, {
        key: 'initAudio',
        value: function initAudio() {
            this.raptorSound = this.game.add.audio('raptorSound');
        }
    }, {
        key: 'initPhysics',
        value: function initPhysics() {
            _get(Raptor.prototype.__proto__ || Object.getPrototypeOf(Raptor.prototype), 'initPhysics', this).call(this);
            this.body.setSize(28, 23, 0, 5);
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.body.touching.down && this.attacking) {
                this.attacking = false;
                this.resumePatrol();
            }
            if (!this.alerted) {
                this.attacking = false;
                this.scale.x = this.direction;
                this.body.velocity.x = this.SPEED * this.direction;
            }
        }
    }, {
        key: 'calculateRoute',
        value: function calculateRoute(obstacle) {
            _get(Raptor.prototype.__proto__ || Object.getPrototypeOf(Raptor.prototype), 'calculateRoute', this).call(this, obstacle);
        }
    }, {
        key: 'die',
        value: function die() {
            this.raptorSound.play();
            this.kill();
        }
    }, {
        key: 'resumePatrol',
        value: function resumePatrol() {
            _get(Raptor.prototype.__proto__ || Object.getPrototypeOf(Raptor.prototype), 'resumePatrol', this).call(this);
        }
    }, {
        key: 'alert',
        value: function alert() {
            if (!this.attacking) _get(Raptor.prototype.__proto__ || Object.getPrototypeOf(Raptor.prototype), 'alert', this).call(this);
        }
    }, {
        key: 'playDeathSound',
        value: function playDeathSound() {
            this.raptorSound.play();
        }
    }, {
        key: 'attack',
        value: function attack() {
            if (!this.attacking) {
                this.body.velocity.y = -220;
                this.body.velocity.x = 200 * this.direction;
                this.attacking = true;
            }
        }
    }]);

    return Raptor;
}(_Enemy3.default);

exports.default = Raptor;
;

},{"./Enemy":3}],7:[function(require,module,exports){
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

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

var _Enemy2 = require('./Enemy');

var _Enemy3 = _interopRequireDefault(_Enemy2);

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

var Soldier = function (_Enemy) {
    _inherits(Soldier, _Enemy);

    function Soldier(game, x, y, sprite) {
        _classCallCheck(this, Soldier);

        var _this = _possibleConstructorReturn(this, (Soldier.__proto__ || Object.getPrototypeOf(Soldier)).call(this, game, x, y, sprite));

        _this.initWeapon();

        _this.SPEED = 25;
        return _this;
    }

    _createClass(Soldier, [{
        key: 'initAnimation',
        value: function initAnimation() {
            this.animations.add('idle', [0], 3, true);
            this.animations.add('alerted', [1], 12, true);
            this.animations.add('shooting', [2], true);
            this.animations.play('idle');
        }
    }, {
        key: 'initAudio',
        value: function initAudio() {
            _get(Soldier.prototype.__proto__ || Object.getPrototypeOf(Soldier.prototype), 'initAudio', this).call(this);

            this.jumpSound = this.game.add.audio('jump');
            this.shootSound = this.game.add.audio('shoot');
        }
    }, {
        key: 'initPhysics',
        value: function initPhysics() {
            _get(Soldier.prototype.__proto__ || Object.getPrototypeOf(Soldier.prototype), 'initPhysics', this).call(this);
            this.body.setSize(15, 29);
        }
    }, {
        key: 'initWeapon',
        value: function initWeapon() {
            this.weapon = this.game.add.weapon(-1, 'bullet');
            this.weapon.bulletSpeed = 100;
            this.weapon.setBulletFrames(0, 2, true);
            this.weapon.bullets.callAll('animations.add', 'animations', 'fire', [0, 1], 5, true);
            this.weapon.bullets.callAll('play', null, 'fire');

            this.weapon.fireRate = 500;
            this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            this.weapon.bulletKillDistance = 100;
            this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
            this.weapon.bulletGravity.y = -350;
            this.weapon.trackSprite(this, 5, -2, true);
            this.weapon.trackRotation = false;
        }
    }, {
        key: 'update',
        value: function update() {
            _get(Soldier.prototype.__proto__ || Object.getPrototypeOf(Soldier.prototype), 'update', this).call(this);

            if (!this.alerted) {
                this.scale.x = this.direction;
                this.body.velocity.x = this.SPEED * this.direction;
            }

            if (this.direction == 1) {
                this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
            } else {
                this.weapon.fireAngle = Phaser.ANGLE_LEFT;
            }
        }
    }, {
        key: 'calculateRoute',
        value: function calculateRoute(obstacle) {
            _get(Soldier.prototype.__proto__ || Object.getPrototypeOf(Soldier.prototype), 'calculateRoute', this).call(this, obstacle);
        }
    }, {
        key: 'resumePatrol',
        value: function resumePatrol() {
            _get(Soldier.prototype.__proto__ || Object.getPrototypeOf(Soldier.prototype), 'resumePatrol', this).call(this);
        }
    }, {
        key: 'alert',
        value: function alert() {
            _get(Soldier.prototype.__proto__ || Object.getPrototypeOf(Soldier.prototype), 'alert', this).call(this);
        }
    }, {
        key: 'attack',
        value: function attack() {
            this.weapon.fire();

            this.resumePatrol();
        }
    }]);

    return Soldier;
}(_Enemy3.default);

exports.default = Soldier;
;

},{"./Enemy":3}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

var GameTitle = function (_Phaser$State) {
	_inherits(GameTitle, _Phaser$State);

	function GameTitle() {
		_classCallCheck(this, GameTitle);

		return _possibleConstructorReturn(this, (GameTitle.__proto__ || Object.getPrototypeOf(GameTitle)).apply(this, arguments));
	}

	_createClass(GameTitle, [{
		key: "create",
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
		key: "update",
		value: function update() {
			this.updateBackground();

			if (this.spacebarButton.isDown || this.enterButton.isDown) {
				this.startCallback();
			}
		}
	}, {
		key: "addMenuOptions",
		value: function addMenuOptions() {
			this.startText = this.game.add.bitmapText(this.game.world.right - 40, this.game.world.bottom - 10, "font", "Start", 8);
			this.startText.inputEnabled = true;
			this.startText.events.onInputDown.add(this.startCallback, this);
		}
	}, {
		key: "createActors",
		value: function createActors() {
			this.car = this.game.add.sprite(0, 49, 'car-idle');
			//this.car.animations.add('drive');
			//this.car.animations.play('drive', 5, true);

			this.add.tween(this.car).to({ x: 13, y: 50 }, 2000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);

			this.gameTitle = this.game.add.sprite(30, 0, 'gameTitle');
		}
	}, {
		key: "startCallback",
		value: function startCallback() {
			this.spacebarButton.enabled = false;
			this.enterButton.enabled = false;
			this.startText.inputEnabled = false;

			this.hideTitle = this.add.tween(this.gameTitle).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, false);
			this.hideTitle.onComplete.add(this.introMoveCar, this);
			this.hideTitle.start();
		}
	}, {
		key: "introMoveCar",
		value: function introMoveCar() {
			this.carLeaves = this.add.tween(this.car).to({ x: 300 }, 3000, Phaser.Easing.Cubic.InOut, false, 0, 0, false);
			this.carLeaves.onComplete.add(this.fadeOut, this);
			this.carLeaves.start();
		}
	}, {
		key: "fadeOut",
		value: function fadeOut() {
			this.car.visible = false;
			this.camera.fade("#000000", 500);
			this.camera.onFadeComplete.add(this.beginGame, this);
		}
	}, {
		key: "beginGame",
		value: function beginGame() {
			this.state.start('Stage1');
		}
	}, {
		key: "createBackground",
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
		key: "updateBackground",
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

      //LAB  
      { id: 'bg-lab', file: 'assets/images/bg_lab.png' }, { id: 'lab-walls', file: 'assets/images/lab_walls.png' }, { id: 'lab-computer', file: 'assets/images/lab_computer.png' }, { id: 'lab-energy', file: 'assets/images/lab_energy.png' }];

      for (var i = 0; i < imagesToLoad.length; i++) {
        this.game.load.image(imagesToLoad[i].id, imagesToLoad[i].file);
      }

      this.game.load.image('bullet', 'assets/images/bullet.png');

      //CAR
      this.game.load.image('car-idle', 'assets/images/car-idle.png');

      //HERO
      this.game.load.atlas('hero', 'assets/images/hero_atlas.png', 'assets/images/hero_atlas.json');

      //NPCS
      this.game.load.spritesheet('selene_portrait', 'assets/images/selene_portrait.png', 20, 20);

      //ENEMIES
      this.game.load.spritesheet('soldier', 'assets/images/soldier.png', 21, 29);
      this.game.load.spritesheet('raptor', 'assets/images/raptor-sheet.png', 30, 29);

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
      this.state.start('GameTitle', true, false);
    }
  }]);

  return Preload;
}(Phaser.State);

exports.default = Preload;

},{}],11:[function(require,module,exports){
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
			this.game.inputEnabled = false; //TODO revert to false;

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

			this.createLinesOfSight(this.soldiers);
			this.createLinesOfSight(this.raptors);

			var gui = new dat.GUI();
			gui.addFolder("Player");
			gui.add(this.hero, "canJump").listen();
			gui.add(this.hero, "onWall").listen();

			for (var i = 0; i < this.soldiers.length; i++) {
				gui.addFolder("Soldier " + i);
				gui.add(this.soldiers.children[i], "x").listen();
				gui.add(this.soldiers.children[i], "y").listen();
				gui.add(this.soldiers.children[i], "alert");
				gui.add(this.soldiers.children[i], "resumePatrol");
			}
			for (var i = 0; i < this.raptors.length; i++) {
				gui.addFolder("Raptor " + i);
				gui.add(this.raptors.children[i], "x").listen();
				gui.add(this.raptors.children[i], "y").listen();
				gui.add(this.raptors.children[i], "alert");
				gui.add(this.raptors.children[i], "resumePatrol");
				gui.add(this.raptors.children[i], "attacking").listen();
				gui.add(this.raptors.children[i], "alerted").listen();
			}
		}
	}, {
		key: 'createLinesOfSight',
		value: function createLinesOfSight(group) {
			this.linesOfSight = this.linesOfSight || [];
			for (var i = 0; i < group.length; i++) {
				var line = new Phaser.Line(group.children[i].x, group.children[i].y, this.hero.x, this.hero.y);
				line.origin = group.children[i];
				line.target = this.hero;

				this.linesOfSight.push(line);
			}
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
			this.game.inputEnabled = false;
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
			this.hero.alpha = 0;
			this.hero.y = this.getGroundPositionY() - this.hero.height;

			this.car = this.game.add.sprite(-100, this.getObjectPositionAboveGround('car-idle') + 3, 'car-idle');

			this.carArrives = this.add.tween(this.car).to({ x: 0 }, 2000, Phaser.Easing.Cubic.InOut, true, 0, 0, false);
			this.carArrives.onComplete.add(this.showHero, this);
			this.carArrives.start();

			this.soldiers = this.add.group();
			this.soldiers.addMultiple([new _Soldier2.default(this.game, 130, this.getObjectPositionAboveGround('soldier') - this.game.cache.getImage('container01').height, 'soldier'), new _Soldier2.default(this.game, 230, this.getObjectPositionAboveGround('soldier'), 'soldier')]);

			this.raptors = this.add.group();
			this.raptors.addMultiple([new _Raptor2.default(this.game, 190, 45, 'raptor')]);
		}
	}, {
		key: 'createObjects',
		value: function createObjects() {
			this.objects = this.add.group();

			this.objects.addMultiple([new _Obstacle2.default(this.game, 110, this.getObjectPositionAboveGround('container01'), 'container01'), new _Obstacle2.default(this.game, 280, this.getObjectPositionAboveGround('container01'), 'container01'), new _Obstacle2.default(this.game, 80, this.getObjectPositionAboveGround('cardboardbox'), 'cardboardbox')]);

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

			this.physics.arcade.enable(this.eventLab);

			this.eventLab.enableBody = true;
			this.eventLab.body.immovable = true;
			this.eventLab.body.allowGravity = false;

			this.labComputer.enableBody = true;
			this.labComputer.body.immovable = true;
			this.labComputer.body.allowGravity = false;

			this.ground.body.immovable = true;
			this.ground.body.allowGravity = false;
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
			this.linesOfSight.forEach(function (l) {
				l.fromSprite(l.origin, l.target);
			});

			for (var l = 0; l < this.linesOfSight.length; l++) {
				var line = this.linesOfSight[l];
				if (line.origin.alerted) continue;

				var intersectsWithLevel = false;

				for (var i = 0; i < this.objects.length; i++) {
					if (Phaser.Line.intersectsRectangle(line, this.objects.children[i].body)) {
						intersectsWithLevel = true;
						break;
					}
				}
				if (intersectsWithLevel) continue;else {
					if (line.origin.alerted) continue;

					var detection = false;
					var degrees = line.angle * 180 / Math.PI;

					if (line.origin.direction == 1 && line.target.x > line.origin.x && (degrees >= 340 && degrees <= 360 || degrees >= 0 && degrees <= 20)) {
						detection = true;
					}
					if (line.origin.direction == -1 && line.target.x < line.origin.x && degrees >= 160 && degrees <= 240) {
						detection = true;
					}
					if (line.length > 100) detection = false;

					if (detection) {
						line.origin.alert();
					}
					line.detection = detection;
				}
			}

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
			this.physics.arcade.collide(this.hero, this.objects, this.collideWithObject, null, this);
			//this.physics.arcade.collide(this.hero, this.raptors, this.restartStage, null, this);

			this.physics.arcade.collide(this.objects, this.raptors, this.enemyHitWall);
			this.physics.arcade.collide(this.objects, this.soldiers, this.enemyHitWall);

			this.physics.arcade.collide(this.raptors, this.ground);
			this.physics.arcade.collide(this.soldiers, this.ground);

			for (var i = 0; i < this.soldiers.length; i++) {
				this.physics.arcade.overlap(this.soldiers.children[i].weapon.bullets, this.hero, this.bulletHitEnemy, null, this);
			}

			this.updateEnemies();
		}
	}, {
		key: 'collideWithObject',
		value: function collideWithObject(hero, object) {

			if (hero instanceof _Player2.default) {
				hero.hugWall();
			}
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
		value: function updateEnemies() {}
	}, {
		key: 'enemyHitWall',
		value: function enemyHitWall(object, enemy) {
			if (enemy instanceof _Soldier2.default || enemy instanceof _Raptor2.default) {
				enemy.calculateRoute(object);
			}
		}
	}, {
		key: 'bulletHitEnemy',
		value: function bulletHitEnemy(target, bullet) {
			bullet.destroy();

			if (target instanceof _Raptor2.default) {
				target.die();
			}
			if (target instanceof _Player2.default) {
				console.log(target);
				//target.takeDamage();
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

			if (document.querySelector('#debugInfo').checked) {
				this.game.debug.body(this.eventLab);
				this.game.debug.body(this.hero);

				for (var i = 0; i < this.soldiers.length; i++) {
					this.game.debug.body(this.soldiers.children[i]);
				}
				for (var i = 0; i < this.raptors.length; i++) {
					this.game.debug.body(this.raptors.children[i]);
				}
				for (var i = 0; i < this.objects.length; i++) {
					this.game.debug.body(this.objects.children[i]);
				}

				for (var l = 0; l < this.linesOfSight.length; l++) {
					var line = this.linesOfSight[l];
					if (line.detection) {
						this.game.debug.geom(line, "#0FF");
					} else {
						this.game.debug.geom(line, "#F00");
					}
				}
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

},{"../objects/DialogBox":2,"../objects/Obstacle":4,"../objects/Player":5,"../objects/Raptor":6,"../objects/Soldier":7}]},{},[1])
//# sourceMappingURL=game.js.map
