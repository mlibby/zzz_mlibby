(function () {
    let $fileName,
        $stockSelect;

    let demoConfigs = {
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

    class TuringMachine {
        constructor() {
        }
    }

    function demoConfigSelected(e) {
        let config = $selectDemo.val();
        $("#file-name").val(config);

        $("#turing-config-raw").text(demoConfigs[config].join("\n"));
    }

    function initDemoConfigMenu() {
        for (let config in demoConfigs) {
            $selectDemo.append($("<option value='" + config + "'>" + config + "</option>"));
        }

        var that = this;
        $selectDemo.change(demoConfigSelected);
    }

    $(document).ready(function () {
        $fileName = $("#file-name");
        $fileName.val('');

        $selectDemo = $("#turing-demo-config");
        initDemoConfigMenu();
    });
})();