"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actor = function Actor(name, age) {
    _classCallCheck(this, Actor);

    this.name = name;
    this.age = age;
};

exports.default = Actor;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.eventsMap = new Map();
    }

    _createClass(EventEmitter, [{
        key: "on",
        value: function on(event, instructions) {
            if (!this.eventsMap.has(event)) {
                this.eventsMap.set(event, instructions);
            }
        }
    }, {
        key: "emit",
        value: function emit(event) {
            return this.eventsMap.get(event);
        }
    }, {
        key: "off",
        value: function off(event, instructions) {
            this.eventsMap.delete(event, instructions);
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, [{
        key: "log",
        value: function log(info) {
            console.log("The " + info + " event has been emitted");
        }
    }]);

    return Logger;
}();

exports.default = Logger;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter = require("EventEmitter");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Movie = function (_MyClassEventEmitter) {
    _inherits(Movie, _MyClassEventEmitter);

    function Movie(title, year, duration) {
        _classCallCheck(this, Movie);

        var _this = _possibleConstructorReturn(this, (Movie.__proto__ || Object.getPrototypeOf(Movie)).call(this));

        _this.title = title;
        _this.year = year;
        _this.duration = duration;
        _this.ActorArray = [];
        return _this;
    }

    _createClass(Movie, [{
        key: "play",
        value: function play() {
            EventEmitterObj.emit("play");
        }
    }, {
        key: "pause",
        value: function pause() {
            EventEmitterObj.emit("pause");
        }
    }, {
        key: "resume",
        value: function resume() {
            EventEmitterObj.emit("resume");
        }
    }, {
        key: "addCast",
        value: function addCast(newActor) {
            this.ActorArray = this.ActorArray.concat(newActor);
        }
    }]);

    return Movie;
}(_EventEmitter2.default);

exports.default = Movie;
"use strict";

var _Logger = require("Logger");

var _Logger2 = _interopRequireDefault(_Logger);

var _EventEmitter = require("EventEmitter");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Movies = require("Movies");

var _Movies2 = _interopRequireDefault(_Movies);

var _Actors = require("Actors");

var _Actors2 = _interopRequireDefault(_Actors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
    var logger = new _Logger2.default();
    var EventEmitterObj = new _EventEmitter2.default();
    var Matrix1 = new _Movies2.default("Matrix", "1999", "183m");
    var Matrix2 = new _Movies2.default("Matrix2", "2003", "168m"); //
    var Matrix3 = new _Movies2.default("Matrix3", "2005", "230m");
    var Social = {
        share: function share(friendName) {
            console.log(friendName + " shares " + Matrix1.title);
        },
        like: function like(friendName) {
            console.log(friendName + " likes " + Matrix1.title);
        } };
    var Peretti = new _Actors2.default("Diego Peretti", 46);
    var Matthew = new _Actors2.default("Matthew Perry", 462);
    var otherCast = [new _Actors2.default("Ricardo Darin", 52), new _Actors2.default("Bryan Cranston", 57), new _Actors2.default("Aaron Paul", 29)];

    Object.assign(Matrix1, Social);

    Matrix1.on("play", logger.log("'play'"));
    Matrix1.play();
    Matrix1.share("Emmanuel Benvenutto");
    Matrix1.like("Emmanuel Benvenutto");
    Matrix1.addCast(Peretti);
    Matrix1.addCast(otherCast);

    for (var i = 0; i < Matrix1.ActorArray.length; i++) {
        //Just to see that the output is what I expected
        console.log(Matrix1.ActorArray[i]);
    }
};
