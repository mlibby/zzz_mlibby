export class Search {
    constructor(searchable, frontier) {
        this.searchable = searchable;
        this.frontier = frontier;

        this.nodesUsed = 0;

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