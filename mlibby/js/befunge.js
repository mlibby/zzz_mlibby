(function () {
    const stockBefunges = {
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

    const befungeVector = {
        n: { xd: 0, yd: -1 },
        e: { xd: 1, yd: 0 },
        s: { xd: 0, yd: 1 },
        w: { xd: -1, yd: 0 }
    };

    var Befunge = class {
        constructor() {
            var that = this;
            this.stringMode = false;
            this.vector = befungeVector.e;
            this.x = 0;
            this.y = 0;
            this.height = 25;
            this.width = 80;
            this.rawText = "";
            this.parsedText = "";
            this.stack = [];
            this.halted = false;
            this.befunctions = {
                // Directional
                'v': function () { that.vector = befungeVector.s; },
                '^': function () { that.vector = befungeVector.n; },
                '<': function () { that.vector = befungeVector.w; },
                '>': function () { that.vector = befungeVector.e; },
                '?': function () { that.vector = getRandomVector(); },
                '_': function () { that.switchVector(befungeVector.e, befungeVector.w); },
                '|': function () { that.switchVector(befungeVector.s, befungeVector.n); },
                '#': function () { that.moveCursor(); },

                // Mode
                '"': function () { that.stringMode = true; },
                '@': function () {
                    that.halted = true;
                    that.pauseRun();
                },

                // Numerical Entry
                '0': function () { that.push(0); },
                '1': function () { that.push(1); },
                '2': function () { that.push(2); },
                '3': function () { that.push(3); },
                '4': function () { that.push(4); },
                '5': function () { that.push(5); },
                '6': function () { that.push(6); },
                '7': function () { that.push(7); },
                '8': function () { that.push(8); },
                '9': function () { that.push(9); },

                // Stack manipulation
                '!': function () { that.logicalNot(); },
                ':': function () { that.duplicate(); },
                '\\': function () { that.swap(); },
                '$': function () { that.pop(); },

                // I/O
                ',': function () { that.printChar(); },
                '.': function () { that.printNumber(); },

                // Math
                '+': function () { that.add(); },
                '-': function () { that.subtract(); },
                '/': function () { that.divide(); },
                '*': function () { that.multiply(); },
                '%': function () { that.modulo(); },
                '`': function () { that.compare(); },
            };
        }

        printNumber() {
            var $output = $("#befunge-output");
            var outputText = $output.val();
            outputText = outputText + this.pop().toString() + " ";
            $output.val(outputText);
        }

        printChar() {
            var $output = $("#befunge-output");
            var outputText = $output.val();
            var outputCharCode = this.pop();
            outputText = outputText + String.fromCharCode(outputCharCode);
            $output.val(outputText);
        }

        duplicate() {
            var value = this.pop();
            this.push(value);
            this.push(value);
        }

        swap() {
            var rhs = this.pop();
            var lhs = this.pop();
            this.push(rhs);
            this.push(lhs);
        }

        push(val) {
            this.stack.push(val)
        }

        pop() {
            if (this.stack.length > 0) {
                return this.stack.pop();
            } else {
                return 0;
            }
        }

        switchVector(zeroVector, elseVector) {
            var switchVal = this.pop();
            if (switchVal === 0 || switchVal === undefined) {
                this.vector = zeroVector;
            } else {
                this.vector = elseVector;
            }
        }

        add() {
            var rhs = this.pop();
            var lhs = this.pop();
            this.push(lhs + rhs);
        }

        subtract() {
            var rhs = this.pop();
            var lhs = this.pop();
            this.push(lhs - rhs);
        }

        divide() {
            var rhs = this.pop();
            var lhs = this.pop();
            this.push(Math.floor(lhs / rhs));
        }

        multiply() {
            var rhs = this.pop();
            var lhs = this.pop();
            this.push(lhs * rhs);
        }

        modulo() {
            var rhs = this.pop();
            var lhs = this.pop();
            this.push(lhs % rhs);
        }

        logicalNot() {
            var value = this.pop();
            this.push(value === 0 ? 1 : 0);
        }

        compare() {
            var rhs = this.pop();
            var lhs = this.pop();
            var val = lhs > rhs ? 1 : 0;
            this.push(val);
        }

        readFile() {
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

        loadBefunge(e) {
            this.rawText = e.target.result;
            this.parseText();
            this.drawTorus();
        }

        parseText() {
            var x = 0;
            var y = 0;

            this.parsedText = "";

            for (var idx = 0; idx < this.rawText.length; idx++) {
                var chr = this.rawText.charCodeAt(idx);
                if (chr === 10) {
                    while (x < this.width) {
                        this.parsedText = this.parsedText + " ";
                        x++;
                    }
                    x = 0;
                    y++;
                }
                else {
                    if (chr !== 13) {
                        this.parsedText = this.parsedText + this.rawText.charAt(idx);
                    }
                    x++;
                }
            }
        }

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        getRandomVector() {
            return [befungeVector.n, befungeVector.s, befungeVector.e, befungeVector.w][getRandomInt(0, 3)]
        }

        getTorusId(x, y) {
            return "cell-" + x + "-" + y;
        }

        drawTorus() {
            var $torus = $("#torus");
            $torus.children().remove();
            for (var y = 0; y <= this.height; y++) {
                var $torusRow = $("<div class='torus-row'></div>");
                for (var x = 0; x < this.width; x++) {
                    var $input = $("<input id='" + this.getTorusId(x, y) + "' type='text' maxlength='1' />");
                    var idx = (y * this.width) + x;
                    $input.val(this.parsedText.charAt(idx));
                    $torusRow.append($input);
                }

                $torus.append($torusRow);
            }
        }

        getCurrentCell() {
            return $("#" + this.getTorusId(this.x, this.y));
        }

        activateCurrentCell() {
            $(".torus-row").children().removeClass("active-cell");
            this.getCurrentCell().addClass("active-cell");
        }

        doStringMode(currentVal) {
            if (currentVal === '"') {
                this.stringMode = false;
            } else {
                this.push(currentVal.charCodeAt(0));
            }
        }

        doNonStringMode(currentVal) {
            if (this.befunctions[currentVal] !== undefined) {
                this.befunctions[currentVal]();
            }
        }

        doCurrentCell() {
            var currentCell = this.getCurrentCell();
            var currentVal = currentCell.val();

            if (this.stringMode) {
                this.doStringMode(currentVal);
            } else {
                this.doNonStringMode(currentVal);
            }
        }

        showStack() {
            var stackMode = $("#befunge-stack-mode").val();
            var stackText = "";
            for (var sdx = 0; sdx < this.stack.length; sdx++) {
                var charCode = this.stack[sdx];
                var addChar;
                if (stackMode === "asc") {
                    if (32 <= charCode && charCode <= 126) {
                        addChar = String.fromCharCode(charCode);
                    } else {
                        addChar = ("00" + charCode.toString(10)).substr(-3, 3)
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

        moveCursor() {
            if (!this.halted) {
                this.x = this.x + this.vector.xd;
                this.y = this.y + this.vector.yd;

                if (this.x >= this.width) {
                    this.x = 0;
                }
                if (this.x < 0) {
                    this.x = this.width - 1;
                }
                if (this.y >= this.height) {
                    this.y = 0;
                }
                if (this.y < 0) {
                    this.y = this.height - 1;
                }
            }
        }

        oneStep() {
            this.doCurrentCell();
            this.moveCursor();
            this.activateCurrentCell();
            this.showStack();
        }

        startRun() {
            var that = this;
            $("#befunge-run").addClass("hidden");
            this.activateCurrentCell();
            this.interval = setInterval(function () { that.oneStep(); }, 0.0010);
            $("#befunge-pause").removeClass("hidden");
        }

        pauseRun() {
            $("#befunge-pause").addClass("hidden");
            clearInterval(this.interval);
            $("#befunge-run").removeClass("hidden");
        }

        initStockBefungeMenu() {
            var $select = $("#befunge-stock-files");
            for (var program in stockBefunges) {
                $select.append($("<option value='" + program + "'>" + program + "</option>"));
            }
            var that = this;
            $select.change(function (e) {
                var fileName = $select.val();
                var dummyResponse = {
                    target: {
                        result: stockBefunges[fileName]
                    }
                };
                that.loadBefunge(dummyResponse);
                $("#file-name").val(fileName);
            });
        }
    }

    $(document).ready(function () {
        if ($("h1").text() === "Befunge") {
            var bf = new Befunge();

            $("#befunge-file").change(function () { bf.readFile(); });
            bf.drawTorus();
            $("#befunge-run").click(function () { bf.startRun(); });
            $("#befunge-pause").click(function () { bf.pauseRun(); });
            bf.initStockBefungeMenu();
        }
    });
})();