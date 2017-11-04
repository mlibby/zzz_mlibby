class UniformCostSearch extends GraphSearch {
    constructor(searchable) {
        super(searchable, new PriorityFrontier());
    }

    searchFrontier() {
        while (this.frontier.length > 0 && this.solution.length === 0) {
            let node = this.frontier.remove();
            if (this.searchable.isGoal(node.state)) {
                this.buildSolution(node);
            } else {
                this.explored.add(node.state);
                this.searchable.expandNode(node).forEach((childNode) => {
                    this.nodesUsed++;
                    if (!this.explored.has(childNode.state) &&
                        !this.frontier.has(childNode.state)) {
                        this.frontier.add(childNode);

                    } else {
                        if (this.frontier.isLowerCost(childNode)) {
                            this.frontier.replace(childNode);
                        }
                    }   
                });
            }
        }
    }
}