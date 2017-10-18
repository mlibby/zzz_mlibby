import { SearchBase } from './search-base.js';

export class TreeSearch extends SearchBase {
    search() {
        this.startTime = performance.now();

        this.frontier.push([this.initialState]);
        this.nodesUsed++;

        while (this.frontier.length > 0) {
            let leafNode = this.frontier.shift();
            let lastState = leafNode[leafNode.length - 1];
            if (lastState == this.goalState) {
                this.solution = leafNode;
                break;
            } else {
                lastState.to.forEach( (value, key, map) => {
                    this.frontier.push(leafNode.concat(key));
                    this.nodesUsed++;
                });
            }
        }

        this.endTime = performance.now();
    }   
}