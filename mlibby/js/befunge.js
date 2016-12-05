(function () {
    var befunge = {
        x: 0,
        y: 0,
        height: 25,
        width: 80   ,
        rawText: "",
        parsedText: "",
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
            var chr = befunge.rawText.charAt(idx);
            if (chr === "\n") {
                while (x < befunge.width) {
                    befunge.parsedText = befunge.parsedText + " ";
                }
                x = 0;
                y++;
            }
            else {
                x++;
            }

            if (chr !== "\r") {
                befunge.parsedText = befunge.parsedText + chr;
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
            for (var x = 0; x <= befunge.width; x++) {
                var $input = $("<input id='" + getTorusId(x, y) + "' type='text' maxlength='1' />");
                var idx = (y * befunge.width) + x;
                $input.val(befunge.parsedText.charAt(idx));
                $torusRow.append($input);
            }
            $torus.append($torusRow);
        }
    }

    function activateCurrentCell() {
        $(".torus-row").children().removeClass("active-cell");
        var currentCell = $("#" + getTorusId(befunge.x, befunge.y));
        currentCell.addClass("active-cell");
    }

    function oneStep() {
        befunge.x = befunge.x + 1;
        if (befunge.x > befunge.width) {
            befunge.x = 0;
        }
        activateCurrentCell();
    }

    function startRun() {
        $("#befunge-run").attr("disabled", "disabled");
        activateCurrentCell();
        befunge.interval = setInterval(oneStep, 200);
        $("#befunge-pause").removeAttr("disabled");
    }

    function pauseRun() {
        $("#befunge-pause").attr("disabled", "disabled");
        clearInterval(befunge.interval);
        $("#befunge-run").removeAttr("disabled");
    }

    $(document).ready(function () {
        if ($("h1").text() === "Befunge") {
            $("#befunge-file").change(readFile);
            drawTorus();
            $("#befunge-run").click(startRun);
            $("#befunge-pause").click(pauseRun);
        }
    });
})();