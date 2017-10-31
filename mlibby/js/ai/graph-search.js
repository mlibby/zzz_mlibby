import { Search } from './search.js';
import { SearchNode } from './search-node.js';

export class GraphSearch extends Search {
    constructor(searchable, frontier) {
        super(searchable, frontier);
        this.explored = new Set();
    }

    search() {
        this.startTime = performance.now();

        this.frontier.add(new SearchNode(this.searchable.initialState));
        this.nodesUsed++;

        this.explored.add(this.searchable.initialState);

        while (this.frontier.length > 0) {
            let leafNode = this.frontier.remove();
            if (this.searchable.isGoal(leafNode.state)) {
                this.buildSolution(leafNode);
                break;
            } else {
                this.searchable.expandNode(leafNode).forEach((node) => {
                    if (!this.explored.has(node.state)) {
                        this.frontier.add(node);
                        this.nodesUsed++;
                        this.explored.add(node.state);
                    }
                });
            }
        }

        this.endTime = performance.now();
    }
}