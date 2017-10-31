export class Queue {
    constructor() {
        this.queue = [];
    }

    get length() {
        return this.queue.length;
    }

    add(element) {
        console.log("Queue.add() not implemented");
    }

    remove() {
        console.log("Queue.remove() not implemented");
    }
}