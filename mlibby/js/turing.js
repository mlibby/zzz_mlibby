(function () {
    let $fileName,
        $stockSelect,
        $tape;

    let demoConfigs = {
        "Turing01-ZeroOne": [
            "b  None  P0,R  c",
            "c  None  R     e",
            "e  None  P1,R  k",
            "k  None  R     b"
        ],
        "Turing02-ZeroOneConcise": [
            "b { None  P0      b",
            "  { 0     R,R,P1  b",
            "  { 1     R,R,P0  b"
        ],
        "Turing03-MoreOnes": [
            "b  None  P@,R,P@,R,P0,R,R,P0,L,L  o", "",
            "o { 1  R,Px,L,L,L  o",
            "  { 0  R,Px,L,L,L  q", "",
            "q { Any   R,R   q",
            "  { None  P1,L  p", "",
            "p { x      E,R  q",
            "  { @      R    k",
            "  { None   L,L  p", "",
            "k { Any    R,R     k",
            "  { None   P0,L,L  o"
        ]
    };

    class TuringMachine {
        constructor($tapeDisplay) {
            this.tapeDisplay = $tapeDisplay;
            this.tape = new Array(64);
            this.currentCell = 0;
            this.maxCell = 0;
        }

        displayTape() {
            for (let x = 0; x < this.tape.length; x++) {
                let cellID = "turing-cell-" + x;
                let $cell = this.tapeDisplay.find("#" + cellID);
                if ($cell.length === 0) {
                    $cell = $("<div class='turing-tape-cell' id='" + cellID + "'></div>");
                    this.tapeDisplay.append($cell);
                }

                let cellValue = this.tape[x];
                if (cellValue == "") {
                    $cell.html("&nbsp;");
                } else {
                    $cell.text(cellValue);
                }

                if (this.currentCell === x) {
                    $cell.addClass('active-cell');
                } else {
                    $cell.removeClass('active-cell');
                }

                if (this.currentCell > this.maxCell) {
                    maxCell = this.currentCell;
                }

                if (this.maxCell + 16 > this.tape.length) {
                    this.tape = this.tape.concat(new Array(16));
                }
            }
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
        $fileName.val("");

        $selectDemo = $("#turing-demo-config");
        initDemoConfigMenu();

        let tm = new TuringMachine($("#turing-tape"));
        tm.displayTape();
    });
})();