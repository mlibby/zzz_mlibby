import { TreeSearch } from './tree-search.js';
import { GraphSearch } from './graph-search.js';

let city = {
    ORADEA: { name: 'Oradea', to: new Map() },
    ZERIND: { name: 'Zerind', to: new Map() },
    ARAD: { name: 'Arad', to: new Map() },
    SIBIU: { name: 'Sibiu', to: new Map() },
    FAGARAS: { name: 'Fagaras', to: new Map() },
    TIMISOARA: { name: 'Timisoara', to: new Map() },
    LUGOJ: { name: 'Lugoj', to: new Map() },
    MEHADIA: { name: 'Mehadia', to: new Map() },
    DROBETA: { name: 'Drobeta', to: new Map() },
    CRAIOVA: { name: 'Craiova', to: new Map() },
    RIMNICA_VILCEA: { name: 'Rimnica Vilcea', to: new Map() },
    PITESTI: { name: 'Pitesti', to: new Map() },
    BUCHAREST: { name: 'Bucharest', to: new Map() },
    GIURGIU: { name: 'Giurgiu', to: new Map() },
    URZICENI: { name: 'Urziceni', to: new Map() },
    HIRSOVA: { name: 'Hirsova', to: new Map() },
    EFORIE: { name: 'Eforie', to: new Map() },
    VASLUI: { name: 'Vaslui', to: new Map() },
    IASI: { name: 'Iasi', to: new Map() },
    NEAMT: { name: 'Neamt', to: new Map() }
};

let edges = [
    [city.ARAD, 140, city.SIBIU],
    [city.ARAD, 118, city.TIMISOARA],
    [city.ARAD, 75, city.ZERIND],
    [city.BUCHAREST, 211, city.FAGARAS],
    [city.BUCHAREST, 90, city.GIURGIU],
    [city.BUCHAREST, 101, city.PITESTI],
    [city.BUCHAREST, 85, city.URZICENI],
    [city.CRAIOVA, 120, city.DROBETA],
    [city.CRAIOVA, 138, city.PITESTI],
    [city.CRAIOVA, 146, city.RIMNICA_VILCEA],
    [city.DROBETA, 75, city.MEHADIA],
    [city.EFORIE, 86, city.HIRSOVA],
    [city.FAGARAS, 99, city.SIBIU],
    [city.HIRSOVA, 98, city.URZICENI],
    [city.IASI, 87, city.NEAMT],
    [city.IASI, 92, city.VASLUI],
    [city.LUGOJ, 70, city.MEHADIA],
    [city.LUGOJ, 111, city.TIMISOARA],
    [city.ORADEA, 151, city.SIBIU],
    [city.ORADEA, 71, city.ZERIND],
    [city.PITESTI, 97, city.RIMNICA_VILCEA],
    [city.RIMNICA_VILCEA, 80, city.SIBIU],
    [city.URZICENI, 142, city.VASLUI]
];

for (let e of edges) {
    let left = e[0];
    let right = e[2];
    let distance = e[1];

    left.to.set(right, distance);
    right.to.set(left, distance);
}

$(document).ready(function () {
    let fromCity = $('#from-city');
    let toCity = $('#to-city');

    for (let c of Object.keys(city).sort()) {
        fromCity.append($('<option value="' + city[c].name.toUpperCase().replace(" ", "_") + '">' + city[c].name + '</option>'));
        toCity.append($('<option value="' + city[c].name.toUpperCase().replace(" ", "_") + '">' + city[c].name + '</option>'));
    }

    $('#search').on('click', function (e) {
        e.preventDefault();

        var searchAlgorithm = $('#search-algorithm').val();
        var search = null;

        var initialState = $('#from-city').val();
        var goalState = $('#to-city').val();

        switch (searchAlgorithm) {
            case 'tree-search':
                search = new TreeSearch(initialState, goalState, city);
                break;
            case 'graph-search':
                search = new GraphSearch(initialState, goalState, city);
                break;
        }

        search.search();

        $('#elapsed-time').text((search.endTime - search.startTime).toFixed(6));
        $('#nodes-used').text(search.nodesUsed);

        let $solution = $('#solution');
        $solution.text('');
        for (let x = 0; x < search.solution.length; x++) {
            $solution.append(search.solution[x].name);
            if (x < search.solution.length - 1) {
                $solution.append($('<br />'));
            }
        }
    });
});
