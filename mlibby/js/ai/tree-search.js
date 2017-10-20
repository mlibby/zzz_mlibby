import { Search } from './search.js';
import { SearchNode } from './search-node.js';

export class TreeSearch extends Search {
    search() {
        this.startTime = performance.now();

        this.frontier.push(new SearchNode(this.initialState));
        this.nodesUsed++;

        while (this.frontier.length > 0) {
            let leafNode = this.frontier.shift();
            if (leafNode.state == this.goalState) {
                this.buildSolution(leafNode);
                break;
            } else {
                this.searchable.expandNode(leafNode).forEach((node) => {
                    this.frontier.push(node);
                    this.nodesUsed++;
                });
            }
        }

        this.endTime = performance.now();
    }   
}