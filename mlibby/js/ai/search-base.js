export class SearchBase {
    constructor(initialState, goalState, graph) {
        this.initialState = graph[initialState];
        this.goalState = graph[goalState];
        this.graph = graph;

        this.nodesUsed = 0;
        this.frontier = [];
        this.startTime = null;
        this.endTime = null;

        this.solution = null;
    }

    search() {
        alert("Search not implemented");
    }
}