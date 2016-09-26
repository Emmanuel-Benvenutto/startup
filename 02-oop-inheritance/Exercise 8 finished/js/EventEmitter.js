export default class EventEmitter {

    constructor() {
        this.eventsMap = new Map();
    }

    on(event,instructions) {
        if (!this.eventsMap.has(event)) {
            this.eventsMap.set(event,instructions);
        }
    }

    emit(event) {
        return this.eventsMap.get(event); 
        }
    
    off(event,instructions) {
        this.eventsMap.delete(event,instructions);
    }
}