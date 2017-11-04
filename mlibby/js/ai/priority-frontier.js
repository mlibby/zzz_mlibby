/*

Implements a priority queue using a combination of an array and a hash/objects.

The array is sorted by path cost during node insert, by pushing the new element onto the end of the
array and then swapping it with the next element to the left until it is in a position where the next
element to the left has equal or less path cost ("bubble up").

If we expect most of our new nodes to have increasing path costs (as we are getting deeper into a search
tree), then it makes the most sense to pack these at the end of an array and bubble up. This will result
in less bubbling.

The hash object keeps track of unique states and their position in the array. Yes, it's a book-keeping
headache during node insertion, but it allows for using JS' Object lookup during a "has node?" operation.

Why do this? Because if we attempt to insert a node with a state that already exists, we need to compare
the new node's path cost with the existing node's path cost and replace the existing one if the new node
costs less. We can use the object to quickly look up the index of the existing node in the sorted array.

If we do find an existing node with a higher path cost, we swap in the new node and use the same "bubble
up" process to move the new node closer to the beginning of array. We can do this because we know the
new node has a lower cost than the one it is replacing. So either it is already in between two sorted
nodes where it belongs or it needs to move closer to the front of the queue.

So, it's essentially an O(1) operation to find the highest priority node (either lowest path cost or it
was inserted first), it will be the first element of the array. We have two options for what to do with
that element when dequeueing. We can shift the whole array so that array[0] is always the highest priority
node... OR we can just keep track of the left most array index, which will grow from 0 to n as elements
are dequeued. This is to be preferred, because otherwise we have to adjust the indexes stored in the
state object after every dequeue, which changes our efficient O(1) dequeue operation into an O(n)
operation.

*/

class PriorityFrontier {
    constructor() {
        this.states = {};
        this.queue = [];
        this.priorityIndex = 0;
    }

    _bubbleUp(index) {
        while (index > this.priorityIndex && this._outOfOrder(index)) {
            let leftIndex = index - 1;
            let temp = this.queue[leftIndex];

            this.queue[leftIndex] = this.queue[index];
            this.states[this.queue[leftIndex].state] = leftIndex;

            this.queue[index] = temp;
            this.states[this.queue[index].state] = index;

            index = leftIndex;
        }
    }

    _outOfOrder(index) {
        return this.queue[index].pathCost < this.queue[index - 1].pathCost;
    }

    add(node) {
        if (!this.states.hasOwnProperty(node.state)) {
            this.queue.push(node);
            let index = this.queue.length - 1;
            this.states[node.state] = index;
            this._bubbleUp(index);
        }
    }

    replace(node) {
        if (this.states.hasOwnProperty(node.state)) {
            let index = this.states[node.state];
            if (node.pathCost < this.queue[index].pathCost) {
                this.queue[index] = node;
                this._bubbleUp(index);
            } else {
                // ignore this duplicate, higher cost node
            }
        }
    }

    has(state) {
        return this.states.hasOwnProperty(state);
    }

    isLowerCost(node) {
        if (this.states.hasOwnProperty(node.state)) {
            let index = this.states[node.state];
            if (node.pathCost < this.queue[index].pathCost) {
                return true;
            }
        }
        return false;
    }

    remove() {
        let node = null;
        if (this.priorityIndex < this.queue.length) {
            node = this.queue[this.priorityIndex];
            this.queue[this.priorityIndex] = null;
            delete this.states[node.state];
            this.priorityIndex++;
        }
        return node;
    }

    get length() {
        return this.queue.length - this.priorityIndex;
    }
}