//export 
class Frontier {
    constructor() {
        this.queue = [];
        this.set = new Set();
    }

    get length() {
        return this.queue.length;
    }

    add(node) {
        console.log("Queue.add() not implemented");
    }

    has(state) {
        return this.set.has(state);
    }

    remove() {
        console.log("Queue.remove() not implemented");
    }
}