class BreadthFirstSearch extends GraphSearch {
    constructor(searchable) {
        super(searchable, new FifoFrontier());
    }
}