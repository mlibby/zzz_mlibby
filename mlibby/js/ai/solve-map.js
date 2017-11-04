//import { TreeSearch } from './tree-search.js';
//import { BreadthFirstSearch } from './graph-search-bfs.js';
//import { DepthFirstSearch } from './graph-search-dfs.js';
//import { UniformCostSearch } from './uniform-cost-search.js';
//import { Romania } from './romania.js';

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
            case 'graph-search-bfs':
                search = new BreadthFirstSearch(romania);
                break;
            case 'graph-search-dfs':
                search = new DepthFirstSearch(romania);
                break;
            case 'uniform-cost-search':
                search = new UniformCostSearch(romania);
                break;
        }

        search.search();

        $('#elapsed-time').text((search.endTime - search.startTime).toFixed(6));
        $('#nodes-used').text(search.nodesUsed);

        let $pathCost = $('#path-cost');
        let $solution = $('#solution');
        $solution.text(romania.initialState);
        $solution.append($('<br />'));

        for (let x = 0; x < search.solution.length; x++) {
            $solution.append(search.solution[x].action);
            $pathCost.text(search.solution[x].pathCost);
            if (x < search.solution.length - 1) {
                $solution.append($('<br />'));
            }
        }
    });
});
