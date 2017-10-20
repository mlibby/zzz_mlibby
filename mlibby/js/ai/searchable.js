export class Searchable {
    constructor(initialState, goalState) {
        this.initialState = initialState;
        this.goalState = goalState;
    }

    expandNode(node) {
        alert("expandNode() not implemented");
    }

    isGoal(state) {
        return state === this.goalState;
    }
}