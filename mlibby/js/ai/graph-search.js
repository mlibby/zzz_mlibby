//import { Search } from './search.js';
//import { SearchNode } from './search-node.js';

//export
class GraphSearch extends Search {
    constructor(searchable, frontier) {
        super(searchable, frontier);
        this.explored = new Set();
    }

    searchChildNode(node) {
        this.nodesUsed++;
        if (!this.explored.has(node.state) &&
            !this.frontier.has(node.state)) {
            if (this.searchable.isGoal(node.state)) {
                this.buildSolution(node);
            } else {
                this.frontier.add(node);
            }
        }
    }

    searchFrontier() {
        while (this.frontier.length > 0 && this.solution.length === 0) {
            let node = this.frontier.remove();
            this.explored.add(node.state);
            this.searchable.expandNode(node).forEach((childNode) => {
                this.searchChildNode(childNode);
            });
        }
    }

    search() {
        this.startTime = performance.now();

        let node = new SearchNode(this.searchable.initialState);
        this.nodesUsed++;

        if (this.searchable.isGoal(node.state)) {
            this.buildSolution(node);
        } else {
            this.frontier.add(node);
            this.searchFrontier();
        }

        this.endTime = performance.now();
    }
}