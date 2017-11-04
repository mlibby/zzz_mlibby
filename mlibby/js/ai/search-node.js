//export 
class SearchNode {
    constructor(state, parent = null, action = null, pathCost = 0) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.pathCost = pathCost;
    }
}