import { Queue } from './queue.js';

/* AKA "Stack" */

export class LifoQueue extends Queue {
    add(element) {
        this.queue.push(element);
    }

    remove() {
        return this.queue.pop();
    }
}