//import { Searchable } from './searchable.js';
//import { SearchNode } from './search-node.js';

let slideMatrix = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4, 6],
    4: [1, 3, 5, 7],
    5: [2, 4, 8],
    6: [3, 7],
    7: [4, 6, 8],
    8: [5, 7]
};

//export 
class Puzzle extends Searchable {
    constructor() {
        let initialState = _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).join('');
        let goalState = '123456789';
        super(initialState, goalState);
    }

    expandNode(node) {
        let expandeds = [];

        let emptySpot = node.state.indexOf('9');
        let moves = slideMatrix[emptySpot];
        for (const move of moves) {
            let tileValue = node.state[move];
            let state = node.state.replace('9', 'x').replace(tileValue, '9').replace('x', tileValue);
            let newNode = new SearchNode(state, node, tileValue, node.pathCost + 1);
            expandeds.push(newNode);
        }

        return expandeds;
    }
}