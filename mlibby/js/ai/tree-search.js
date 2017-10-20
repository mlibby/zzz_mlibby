import { Search } from './search.js';
import { SearchNode } from './search-node.js';

export class TreeSearch extends Search {
    search() {
        this.startTime = performance.now();

        this.frontier.push(new SearchNode(this.searchable.initialState));
        this.nodesUsed++;

        while (this.frontier.length > 0) {
            let leafNode = this.frontier.shift();
            if (this.searchable.isGoal(leafNode.state)) {
                this.buildSolution(leafNode);
                break;
            } else {
                let newNodes = this.searchable.expandNode(leafNode);
                if (newNodes) {
                    newNodes.forEach((node) => {
                        this.frontier.push(node);
                        this.nodesUsed++;
                    });
                }
            }
        }

        this.endTime = performance.now();
    }
}