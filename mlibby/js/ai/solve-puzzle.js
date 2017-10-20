import { Puzzle } from './puzzle.js';
import { TreeSearch } from './tree-search.js';
import { GraphSearch } from './graph-search.js';

function displayPuzzle(puzzle) {
    $.each(puzzle.tiles, (index, tileValue) => {
        let spot = $('#spot-' + (index + 1));
        let tile = $('#number-' + tileValue).remove();
        spot.append(tile);
    })
}

$(document).ready(function () {
    let puzzle = new Puzzle();
    displayPuzzle(puzzle);

    $('#shuffle-tiles').on('click', function (e) {
        e.preventDefault();
        puzzle = new Puzzle();
        displayPuzzle(puzzle);
    });

    $('#solve-puzzle').on('click', function (e) {
        e.preventDefault();

        let searchAlgorithm = $('#search-algorithm').val();
        let search = null;

        let initialState = null;
        let goalState = null;

        switch (searchAlgorithm) {
            case 'tree-search':
                search = new TreeSearch(initialState, goalState, puzzle);
                break;
            case 'graph-search':
                search = new GraphSearch(initialState, goalState, puzzle);
                break;
        }

        search.search();
    });
});