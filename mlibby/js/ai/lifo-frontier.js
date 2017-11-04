//import { Frontier } from './frontier.js';

/* AKA "Stack" */

//export 
class LifoFrontier extends Frontier {
    add(node) {
        if (!this.set.has(node.state)) {
            this.queue.push(node);
            this.set.add(node.state);
        }
    }

    remove() {
        let returnNode = this.queue.pop();
        this.set.delete(returnNode.state);
        return returnNode;
    }
}