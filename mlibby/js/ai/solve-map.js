import { TreeSearch } from './tree-search.js';
import { GraphSearch } from './graph-search.js';
import { Romania } from './romania.js';

$(document).ready(function () {
    let romania = new Romania();

    let $fromCity = $('#from-city');
    let $toCity = $('#to-city');

    for (const city of romania.cities.sort()) {
        $fromCity.append($('<option value="' + city + '">' + city + '</option>'));
        $toCity.append($('<option value="' + city + '">' + city + '</option>'));
    }

    $('#search').on('click', function (e) {
        e.preventDefault();

        let searchAlgorithm = $('#search-algorithm').val();
        let search = null;

        romania.initialState = $fromCity.val();
        romania.goalState = $toCity.val();

        switch (searchAlgorithm) {
            case 'tree-search':
                search = new TreeSearch(romania);
                break;
            case 'graph-search':
                search = new GraphSearch(romania);
                break;
        }

        search.search();

        $('#elapsed-time').text((search.endTime - search.startTime).toFixed(6));
        $('#nodes-used').text(search.nodesUsed);

        let $solution = $('#solution');
        $solution.text(romania.initialState);
        $solution.append($('<br />'));

        for (let x = 0; x < search.solution.length; x++) {
            $solution.append(search.solution[x].action);
            if (x < search.solution.length - 1) {
                $solution.append($('<br />'));
            }
        }
    });
});
