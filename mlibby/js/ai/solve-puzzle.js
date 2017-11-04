let puzzle = null;
let puzzleSolution = null;
let $elapsedTime = null;
let $nodesUsed = null;
let $pathCost = null;
let $solution = null;
let $watchSolution = null;


function displayPuzzle(puzzle) {
    $.each(puzzle.initialState.split(''), (index, tileValue) => {
        let spot = $('#spot-' + (index + 1));
        let tile = $('#number-' + tileValue).remove();
        spot.append(tile);
    });
}

function refreshPuzzle() {
    puzzle = new Puzzle();
    displayPuzzle(puzzle);
}

function clearResults() {
    $elapsedTime.text('...');
    $nodesUsed.text('...');
    $pathCost.text('...');
    $solution.text('...');
}

function displayResults(search) {
    $elapsedTime.text((search.endTime - search.startTime).toFixed(6));
    $nodesUsed.text(search.nodesUsed);

    if (search.solution.length > 0) {
        $pathCost.text(search.solution[search.solution.length - 1].pathCost);
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
        case 'graph-search-bfs':
            search = new BreadthFirstSearch(puzzle);
            break;
        case 'graph-search-dfs':
            search = new DepthFirstSearch(puzzle);
            break;
        case 'uniform-cost-search':
            search = new UniformCostSearch(puzzle);
            break;
    }

    return search;
}

function slideTile(tileNumber) {
    let $tile = $("#number-" + tileNumber);
    let $empty = $("#number-9");
    let tilePosition = $tile.position();
    let emptyPosition = $empty.position();
    let newTop = emptyPosition.top - tilePosition.top;
    let newLeft = emptyPosition.left - tilePosition.left;
    $tile.animate({ top: newTop, left: newLeft }, 333, function () {
        let $emptySpot = $empty.parent();
        let $tileSpot = $tile.parent();
        $empty.remove();
        $tile.remove();
        $tile.css('top', 0);
        $tile.css('left', 0);
        $emptySpot.append($tile);
        $tileSpot.append($empty);
        watchSolution();
    });
}

function watchSolution() {
    $watchSolution.attr('disabled', 'disabled');
    puzzleSolution = puzzleSolution || $solution.text().split(', ');

    if (puzzleSolution.length > 0) {
        let move = puzzleSolution.shift();
        slideTile(move);
    } else {
        puzzleSolution = null;
    }
}

$(document).ready(function () {
    $elapsedTime = $('#elapsed-time');
    $nodesUsed = $('#nodes-used');
    $pathCost = $('#path-cost');
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

    $('#watch-solution').on('click', function (e) {
        e.preventDefault();
        watchSolution();
    });
});