﻿(function () {
    var config = {
        maxHeight: 25,
        maxWidth: 80
    }

    var befunge = {
        x: 0,
        y: 0,
        height: 8,
        width: 32,
        rawText: "",
        parsedText: "",
    };

    function readFile() {
        var file = $("#befunge-file")[0].files[0];
        if (file) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                befunge.rawText = e.target.result;
                parseText();
                $("#file-name").val(file.name);
            }
            fileReader.readAsText(file);
        } else {
            alert("Failed to load file");
        }
    }

    function parseText() {
        var x = 0;
        var y = 0;

        for (var idx = 0; idx < befunge.rawText.length; idx++) {
            var chr = befunge.rawText.charAt(idx);
            if (chr === "\n") {
                x = 0;
                y++;
            }
            else {
                x++;
            }

            if (x > befunge.width && x < config.maxWidth) {
                befunge.width = x;
            }

            if (y > befunge.height && y < config.maxHeight) {
                befunge.height = y;
            }
        }

        x = 0;
        y = 0;
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

        drawTorus();
    }

    function drawTorus() {
        var $torus = $("#torus");
        $torus.children().remove();
        for (var y = 0; y <= befunge.height; y++) {
            var $torusRow = $("<div class='torus-row'></div>");
            for (var x = 0; x <= befunge.width; x++) {
                var $input = $("<input id='" + x + "-" + y + "' type='text' maxlength='1' />");
                var idx = (y * befunge.width) + x;
                $input.val(befunge.parsedText.charAt(idx));
                $torusRow.append($input);
            }
            $torus.append($torusRow);
        }
    }

    $(document).ready(function () {
        if ($("h1").text() === "Befunge") {
            $("#befunge-file").change(readFile);
            drawTorus();
        }
    });
})();