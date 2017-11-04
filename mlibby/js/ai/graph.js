//import { Searchable } from './searchable.js'
//import { SearchNode } from './search-node.js'

//export
class Graph extends Searchable {
    constructor(initialState, goalState, edges) {
        super(initialState, goalState);
        this.edges = edges;
        this.graph = {};
        this.buildGraph()
    }

    get vertices() {
        return Object.keys(this.graph);
    }

    expandNode(node) {
        let nodes = [];
        this.graph[node.state].forEach((cost, vertice) => {
            nodes.push(new SearchNode(vertice, node, vertice, cost + node.pathCost));
        });
        return nodes;
    }

    buildGraph() {
        for (const edge of this.edges) {
            let left = edge[0];
            let right = edge[2];
            let cost = edge[1];

            if (!this.graph.hasOwnProperty(left)) {
                this.graph[left] = new Map();
            }

            if (!this.graph.hasOwnProperty(right)) {
                this.graph[right] = new Map();
            }

            this.graph[left].set(right, cost);
            this.graph[right].set(left, cost);
        }
    }

}