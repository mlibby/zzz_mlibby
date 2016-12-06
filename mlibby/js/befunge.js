(function () {
    var vector = {
        n: { xd: 0, yd: -1 },
        e: { xd: 1, yd: 0 },
        s: { xd: 0, yd: 1 },
        w: { xd: -1, yd: 0 }
    }

    var befunctions = {
        'v': function () { befunge.vector = vector.s; },
        '^': function () { befunge.vector = vector.n; },
        '<': function () { befunge.vector = vector.w; },
        '>': function () { befunge.vector = vector.e; },

        '"': function () { befunge.stringMode = true; },

        '0': function () { befunge.stack.push(0); },
        '1': function () { befunge.stack.push(1); },
        '2': function () { befunge.stack.push(2); },
        '3': function () { befunge.stack.push(3); },
        '4': function () { befunge.stack.push(4); },
        '5': function () { befunge.stack.push(5); },
        '6': function () { befunge.stack.push(6); },
        '7': function () { befunge.stack.push(7); },
        '8': function () { befunge.stack.push(8); },
        '9': function () { befunge.stack.push(9); },


    };

    var befunge = {
        stringMode: false,
        vector: vector.e,
        x: 0,
        y: 0,
        height: 25,
        width: 80,
        rawText: "",
        parsedText: "",
        stack: []
    };

    function readFile() {
        var file = $("#befunge-file")[0].files[0];
        if (file) {
            var fileReader = new FileReader();
            fileReader.onload = loadBefunge;
            fileReader.readAsText(file);
            $("#file-name").val(file.name);
        } else {
            alert("Failed to load file");
        }
    }

    function loadBefunge(e) {
        befunge.rawText = e.target.result;
        parseText();
        drawTorus();
    }

    function parseText() {
        var x = 0;
        var y = 0;

        befunge.parsedText = "";

        for (var idx = 0; idx < befunge.rawText.length; idx++) {
            var chr = befunge.rawText.charCodeAt(idx);
            if (chr === 10) {
                while (x < befunge.width) {
                    befunge.parsedText = befunge.parsedText + " ";
                    x++;
                }
                x = 0;
                y++;
            }
            else {
                if (chr !== 13) {
                    befunge.parsedText = befunge.parsedText + befunge.rawText.charAt(idx);
                }
                x++;
            }

        }
    }

    function getTorusId(x, y) {
        return "cell-" + x + "-" + y;
    }

    function drawTorus() {
        var $torus = $("#torus");
        $torus.children().remove();
        for (var y = 0; y <= befunge.height; y++) {
            var $torusRow = $("<div class='torus-row'></div>");
            for (var x = 0; x < befunge.width; x++) {
                var $input = $("<input id='" + getTorusId(x, y) + "' type='text' maxlength='1' />");
                var idx = (y * befunge.width) + x;
                $input.val(befunge.parsedText.charAt(idx));
                $torusRow.append($input);
            }
            $torus.append($torusRow);
        }
    }

    function getCurrentCell() {
        return $("#" + getTorusId(befunge.x, befunge.y));
    }

    function activateCurrentCell() {
        $(".torus-row").children().removeClass("active-cell");
        getCurrentCell().addClass("active-cell");
    }

    function performStringMode(currentVal) {
        if (currentVal === '"') {
            befunge.stringMode = false;
        } else {
            befunge.stack.push(currentVal.charCodeAt(0));
        }
    }

    function performNonStringMode(currentVal) {
        if (befunctions[currentVal] !== undefined) {
            befunctions[currentVal]();
        }
    }

    function performCurrentCell() {
        var currentCell = getCurrentCell();
        var currentVal = currentCell.val();

        if (befunge.stringMode) {
            performStringMode(currentVal);
        } else {
            performNonStringMode(currentVal);
        }
    }

    function showStack() {
        var stackMode = $("#befunge-stack-mode").val();
        var stackText = "";
        for (var sdx = 0; sdx < befunge.stack.length; sdx++) {
            var charCode = befunge.stack[sdx];
            var addChar;
            if (stackMode === "asc") {
                if (32 <= charCode && charCode <= 126) {
                    addChar = String.fromCharCode(charCode);
                } else {
                    addChar = ("00" + charCode.toString(10)).substr(-3,3)
                }
            } else if (stackMode === "dec") {
                addChar = ("00" + charCode.toString(10)).substr(-3, 3);
            } else { ///stackmode === "hex"
                addChar = ("0" + charCode.toString(16)).substr(-2, 2);
            }

            stackText = stackText + addChar + " ";
        }

        $("#befunge-stack").val(stackText);
    }

    function moveCursor() {
        befunge.x = befunge.x + befunge.vector.xd;
        befunge.y = befunge.y + befunge.vector.yd;

        if (befunge.x >= befunge.width) {
            befunge.x = 0;
        }
        if (befunge.x < 0) {
            befunge.x = befunge.width - 1;
        }
        if (befunge.y >= befunge.height) {
            befunge.y = 0;
        }
        if (befunge.y < 0) {
            befungey.y = befunge.height - 1;
        }
    }

    function oneStep() {
        performCurrentCell();
        moveCursor();
        activateCurrentCell();
        showStack();
    }

    function startRun() {
        $("#befunge-run").attr("disabled", "disabled");
        activateCurrentCell();
        befunge.interval = setInterval(oneStep, 100);
        $("#befunge-pause").removeAttr("disabled");
    }

    function pauseRun() {
        $("#befunge-pause").attr("disabled", "disabled");
        clearInterval(befunge.interval);
        $("#befunge-run").removeAttr("disabled");
    }

    function initStockPrograms() {
        var $select = $("#befunge-stock-files");
        for (var program in stockPrograms) {
            $select.append($("<option value='" + program + "'>" + program + "</option>"));
        }
        $select.change(function (e) {
            var fileName = $select.val();
            var dummyResponse = {
                target: {
                    result: stockPrograms[fileName]
                }
            };
            loadBefunge(dummyResponse);
            $("#file-name").val(fileName);
        });
    }

    $(document).ready(function () {
        if ($("h1").text() === "Befunge") {
            $("#befunge-file").change(readFile);
            drawTorus();
            $("#befunge-run").click(startRun);
            $("#befunge-pause").click(pauseRun);
            initStockPrograms();
        }
    });

    var stockPrograms = {
        "hello_world.bf":
            "64+\"!dlroW ,olleH\">:#,_@",
        "99_bottles.bf":
            '"d"4vv"take one down, pass it around"<>' + "\n" +
            ':-2*< v "e wall"_v#\\0`1%4./4::_0#%>#4^#' + "\n" +
            '\\4>/|>:#,_$:55+:,\\4%3-!*0\\>:>#,_$$:1+\\1' + "\n" +
            '>>>#@^>$"ht no "\\>\\"reeb fo selttob">>>' + "\n",
        "pascals_triangle.bf":
            '0" :swor fo rebmuN">:#,_&> 55+, v' + "\n" +
            'v01*p00-1:g00.:<1p011p00:\\-1_v#:<' + "\n" +
            '>g:1+10p/48*,:#^_$ 55+,1+\\: ^>$$@' + "\n",
    };
})();