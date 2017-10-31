import { Queue } from './queue.js';

export class FifoQueue extends Queue {
    add(element) {
        this.queue.push(element);
    }

    remove() {
        return this.queue.shift();
    }
}