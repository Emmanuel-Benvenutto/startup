import MyClassEventEmitter from "EventEmitter";

export default class Movie extends MyClassEventEmitter {

    constructor(title, year, duration) {
        super();
        this.title = title;
        this.year = year;
        this.duration = duration;
        this.ActorArray = [];
    }

    play() {
        EventEmitterObj.emit("play");
    }

    pause() {
        EventEmitterObj.emit("pause");
    }

    resume() {
        EventEmitterObj.emit("resume");
    }

    addCast(newActor) {
        this.ActorArray = this.ActorArray.concat(newActor);
    }
}