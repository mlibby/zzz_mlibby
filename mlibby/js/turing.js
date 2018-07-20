(function () {
    const stockConfigurations = {
        'Turing01-ZeroOne': [
            '𝔟 None P0,R 𝔠',
            '𝔠 None R 𝔢',
            '𝔢 None P1,R 𝔨',
            '𝔨 None R 𝔟'
        ],
        'Turing02-ZeroOneConcise': [
            '𝔟 { None P0 𝔟',
            '  { 0 R,R,P1 𝔟',
            '  { 1 R,R,P0 𝔟'
        ],
        'Turing03-MoreOnes': [
            '𝔟 None Pə,R,Pə,R,P0,R,R,P0,L,L 𝔬',
            '𝔬 { 1 R,Px,L,L,L 𝔬',
            '  { 0 R,Px,L,L,L 𝔮',
            '𝔮 { Any R,R 𝔮',
            '  { None P1,L 𝔭',
            '𝔭 { x E,R 𝔮',
            '  { ə R 𝔣',
            '  { None L,L 𝔭',
            '𝔣 { Any R,R 𝔣',
            '  { None P0,L,L 𝔬'
        ]
    };

    var TuringMachine = class {
        constructor() {
            var that = this;
        }

        initStockMenu() {
            var $select = $("#turing-stock-files");
            for (var program in stockConfigurations) {
                $select.append($("<option value='" + program + "'>" + program + "</option>"));
            }
            var that = this;
            $select.change(function (e) {
                var fileName = $select.val();
                var dummyResponse = {
                    target: {
                        result: stockConfigurations[fileName]
                    }
                };
                //that.loadBefunge(dummyResponse);
                $("#file-name").val(fileName);
            });
        }
    }

    $(document).ready(function () {
        var tm = new TuringMachine;
        tm.initStockMenu();
    });
})();