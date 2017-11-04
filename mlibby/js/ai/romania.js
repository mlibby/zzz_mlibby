//import { Graph } from './graph.js';

let edges = [
    ['Arad', 140, 'Sibiu'],
    ['Arad', 118, 'Timisoara'],
    ['Arad', 75, 'Zerind'],
    ['Bucharest', 211, 'Fagaras'],
    ['Bucharest', 90, 'Giurgiu'],
    ['Bucharest', 101, 'Pitesti'],
    ['Bucharest', 85, 'Urziceni'],
    ['Craiova', 120, 'Drobeta'],
    ['Craiova', 138, 'Pitesti'],
    ['Craiova', 146, 'Rimnica Vilcea'],
    ['Drobeta', 75, 'Mehadia'],
    ['Eforie', 86, 'Hirsova'],
    ['Fagaras', 99, 'Sibiu'],
    ['Hirsova', 98, 'Urziceni'],
    ['Iasi', 87, 'Neamt'],
    ['Iasi', 92, 'Vaslui'],
    ['Lugoj', 70, 'Mehadia'],
    ['Lugoj', 111, 'Timisoara'],
    ['Oradea', 151, 'Sibiu'],
    ['Oradea', 71, 'Zerind'],
    ['Pitesti', 97, 'Rimnica Vilcea'],
    ['Rimnica Vilcea', 80, 'Sibiu'],
    ['Urziceni', 142, 'Vaslui']
];

//export

class Romania extends Graph {
    constructor(initialState = null, goalState = null) {
        super(initialState, goalState, edges);
    }

    get cities() {
        return this.vertices;
    }
}

