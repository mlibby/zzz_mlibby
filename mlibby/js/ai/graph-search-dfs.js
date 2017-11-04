//import { GraphSearch } from './graph-search.js';
//import { SearchNode } from './search-node.js';
//import { LifoFrontier } from './lifo-Frontier.js';

//export
class DepthFirstSearch extends GraphSearch {
    constructor(searchable) {
        super(searchable, new LifoFrontier());
    }
}