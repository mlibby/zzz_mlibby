import { Search } from './search.js';
import { SearchNode } from './search-node.js';

export class GraphSearch extends Search {
    constructor(initialState, goalState, graph) {
        super(initialState, goalState, graph);
        this.explored = [];
    }

    search() {
        this.startTime = performance.now();

        this.frontier.push(new SearchNode(this.initialState));
        this.nodesUsed++;

        this.explored.push(this.initialState);

        while (this.frontier.length > 0) {
            let leafNode = this.frontier.shift();
            if (leafNode.state == this.goalState) {
                this.buildSolution(leafNode);
                break;
            } else {
                this.searchable.expandNode(leafNode).forEach((node) => {
                    if (-1 === this.explored.indexOf(node.state)) {
                        this.frontier.push(node);
                        this.nodesUsed++;
                        this.explored.push(node.state);
                    }
                });
            }
        }

        this.endTime = performance.now();
    }
}