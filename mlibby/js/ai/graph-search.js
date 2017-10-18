import { SearchBase } from './search-base.js';

export class GraphSearch extends SearchBase {
    constructor(initialState, goalState, graph) {
        super(initialState, goalState, graph);
        this.explored = [];
    }

    search() {
        this.startTime = performance.now();

        this.frontier.push([this.initialState]);
        this.nodesUsed++;

        this.explored.push(this.initialState);

        while (this.frontier.length > 0) {
            let leafNode = this.frontier.shift();
            let lastState = leafNode[leafNode.length - 1];
            if (lastState == this.goalState) {
                this.solution = leafNode;
                break;
            } else {
                lastState.to.forEach((value, key, map) => {
                    if (-1 === this.explored.indexOf(key)) {
                        this.frontier.push(leafNode.concat(key));
                        this.nodesUsed++;
                        this.explored.push(key);
                    }
                });
            }
        }

        this.endTime = performance.now();
    }
}