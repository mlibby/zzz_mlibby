import { Puzzle } from './puzzle.js';
import { TreeSearch } from './tree-search.js';
import { GraphSearch } from './graph-search.js';

let puzzle = null;
let $elapsedTime = null;
let $nodesUsed = null;
let $solution = null;
let $watchSolution = null;

function displayPuzzle(puzzle) {
    $.each(puzzle.initialState.split(''), (index, tileValue) => {
        let spot = $('#spot-' + (index + 1));
        let tile = $('#number-' + tileValue).remove();
        spot.append(tile);
    })
}

function refreshPuzzle() {
    puzzle = new Puzzle();
    displayPuzzle(puzzle);
}

function clearResults() {
    $elapsedTime.text('...');
    $nodesUsed.text('...');
    $solution.text('...');
}

function displayResults(search) {
    $elapsedTime.text((search.endTime - search.startTime).toFixed(6));
    $nodesUsed.text(search.nodesUsed);

    if (search.solution.length > 0) {
        $solution.text('');
        $solution.append(search.solution.map((node) => node.action).join(', '));
        $watchSolution.removeAttr('disabled');
    } else {
        $solution.text('Failed to find solution');
        $watchSolution.attr('disabled', 'disabled');
    }
}

function getSearch() {
    let searchAlgorithm = $('#search-algorithm').val();
    let search = null;

    switch (searchAlgorithm) {
        case 'tree-search':
            search = new TreeSearch(puzzle);
            break;
        case 'graph-search':
            search = new GraphSearch(puzzle);
            break;
    }
    return search;
}

$(document).ready(function () {
    $elapsedTime = $('#elapsed-time');
    $nodesUsed = $('#nodes-used');
    $solution = $('#solution');
    $watchSolution = $('#watch-solution');

    $('#shuffle-tiles').on('click', function (e) {
        e.preventDefault();
        refreshPuzzle();
    });

    $('#solve-puzzle').on('click', function (e) {
        e.preventDefault();
        if (puzzle === null) {
            alert("Shuffle the tiles, eh?");
        }
        clearResults();
        let search = getSearch();
        setTimeout(function () {
            /* setTimeout = 100 to give time for screen update */
            search.search();
            displayResults(search);
        }, 100);
    });
});