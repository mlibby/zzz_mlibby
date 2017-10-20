import { TreeSearch } from './tree-search.js';
import { GraphSearch } from './graph-search.js';
import { Romania } from './romania.js';

$(document).ready(function () {
    let $fromCity = $('#from-city');
    let $toCity = $('#to-city');

    let romania = new Romania();

    for (const city of romania.cities.sort()) {
        $fromCity.append($('<option value="' + city + '">' + city + '</option>'));
        $toCity.append($('<option value="' + city + '">' + city + '</option>'));
    }

    $('#search').on('click', function (e) {
        e.preventDefault();

        var searchAlgorithm = $('#search-algorithm').val();
        var search = null;

        var initialState = $fromCity.val();
        var goalState = $toCity.val();

        switch (searchAlgorithm) {
            case 'tree-search':
                search = new TreeSearch(initialState, goalState, romania);
                break;
            case 'graph-search':
                search = new GraphSearch(initialState, goalState, romania);
                break;
        }

        search.search();

        $('#elapsed-time').text((search.endTime - search.startTime).toFixed(6));
        $('#nodes-used').text(search.nodesUsed);

        let $solution = $('#solution');
        $solution.text('');

        for (let x = 0; x < search.solution.length; x++) {
            $solution.append(search.solution[x].action);
            if (x < search.solution.length - 1) {
                $solution.append($('<br />'));
            }
        }
    });
});
