import { GraphSearch } from './graph-search.js';
import { SearchNode } from './search-node.js';
import { FifoQueue } from './fifo-queue.js';

export class BreadthFirstSearch extends GraphSearch {
    constructor(searchable) {
        super(searchable, new FifoQueue());
    }
}