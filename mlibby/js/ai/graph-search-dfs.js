import { GraphSearch } from './graph-search.js';
import { SearchNode } from './search-node.js';
import { LifoQueue } from './lifo-queue.js';

export class DepthFirstSearch extends GraphSearch {
    constructor(searchable) {
        super(searchable, new LifoQueue());
    }
}