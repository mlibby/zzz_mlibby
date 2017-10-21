import { Puzzle } from './puzzle.js';
import { TreeSearch } from './tree-search.js';
import { GraphSearch } from './graph-search.js';

let $watchSolution = $('#watch-solution');

function displayPuzzle(puzzle) {
    $.each(puzzle.initialState.split(''), (index, tileValue) => {
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

        switch (searchAlgorithm) {
            case 'tree-search':
                search = new TreeSearch(puzzle);
                break;
            case 'graph-search':
                search = new GraphSearch(puzzle);
                break;
        }

        search.search();

        $('#elapsed-time').text((search.endTime - search.startTime).toFixed(6));
        $('#nodes-used').text(search.nodesUsed);

        let $solution = $('#solution');

        if (search.solution.length > 0) {
            $solution.text('');
            $solution.append(search.solution.map((node) => node.action).join(', '));
            $watchSolution.removeAttr('disabled');
        } else {
            $solution.text('Failed to find solution');
            $watchSolution.attr('disabled', 'disabled')
        }
    });
});