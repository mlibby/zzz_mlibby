//import { Frontier } from './frontier.js';

//export
class FifoFrontier extends Frontier {
    add(node) {
        if (!this.set.has(node.state)) {
            this.queue.push(node);
            this.set.add(node.state);
        }
    }

    remove() {
        let returnNode = this.queue.shift();
        this.set.delete(returnNode.state);
        return returnNode;
    }
}