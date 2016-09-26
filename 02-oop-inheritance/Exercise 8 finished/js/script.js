import MyLogger from "Logger";
import MyEventEmitter from "EventEmitter";
import MyMovie from "Movies";
import MyActors from "Actors";

window.onload = function() {
    const logger = new MyLogger();
    const EventEmitterObj = new MyEventEmitter();
    let Matrix1 = new MyMovie("Matrix","1999","183m");
    let Matrix2 = new MyMovie("Matrix2","2003","168m");  //
    let Matrix3 = new MyMovie("Matrix3","2005","230m");
    let Social = {
        share: function(friendName) {
            console.log(`${friendName} shares ${Matrix1.title}`);
        },
        like: function(friendName) {
            console.log(`${friendName} likes ${Matrix1.title}`);
        } };
    let Peretti = new MyActors("Diego Peretti", 46);
    let Matthew = new MyActors("Matthew Perry", 462);
    let otherCast = [
        new MyActors("Ricardo Darin", 52),
        new MyActors("Bryan Cranston", 57),
        new MyActors("Aaron Paul",29)
    ];
    
    Object.assign(Matrix1, Social);

    Matrix1.on("play",logger.log("'play'"));
    Matrix1.play();
    Matrix1.share("Emmanuel Benvenutto");
    Matrix1.like("Emmanuel Benvenutto");
    Matrix1.addCast(Peretti);
    Matrix1.addCast(otherCast);
   
    for (let i = 0; i < Matrix1.ActorArray.length; i++) {   //Just to see that the output is what I expected
        console.log(Matrix1.ActorArray[i]);
    }
}