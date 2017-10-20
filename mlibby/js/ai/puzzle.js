import { Searchable } from './searchable.js';

export class Puzzle extends Searchable {
    constructor() {
        this.tiles = _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
}