export class Search {
    constructor(initialState, goalState, searchable) {
        this.initialState = initialState;
        this.goalState = goalState;
        this.searchable = searchable;

        this.nodesUsed = 0;
        this.frontier = [];
        this.startTime = null;
        this.endTime = null;

        this.solution = [];
    }

    search() {
        alert("Search not implemented");
    }

    buildSolution(node) {
        while (node !== null) {
            this.solution.unshift(node);
            node = node.parent;
        }
    }
}