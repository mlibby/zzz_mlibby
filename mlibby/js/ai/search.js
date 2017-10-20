export class Search {
    constructor(searchable) {
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
        // initial state is NOT part of the solution
        while (node.parent !== null) {
            this.solution.unshift(node);
            node = node.parent;
        }
    }
}