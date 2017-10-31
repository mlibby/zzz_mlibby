import { Search } from './search.js';
import { SearchNode } from './search-node.js';
import { FifoQueue } from './fifo-queue.js';

export class TreeSearch extends Search {
    constructor(searchable) {
        super(searchable, new FifoQueue());
    }

    search() {
        this.startTime = performance.now();

        this.frontier.add(new SearchNode(this.searchable.initialState));
        this.nodesUsed++;

        while (this.frontier.length > 0) {
            let leafNode = this.frontier.remove();
            if (this.searchable.isGoal(leafNode.state)) {
                this.buildSolution(leafNode);
                break;
            } else {
                let newNodes = this.searchable.expandNode(leafNode);
                if (newNodes) {
                    newNodes.forEach((node) => {
                        this.frontier.add(node);
                        this.nodesUsed++;
                    });
                }
            }
        }

        this.endTime = performance.now();
    }
}