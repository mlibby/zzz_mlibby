(function () {
    const stockFiles = {
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
        "sort_integers.bf":
            'v ' + "\n" +
            '> 543** >     :#v_ $&>           :#v_ 1 > :0g >    :#v_ $ 1+: 543** `! #v_ 25*,@' + "\n" +
            '        ^-1p0\\0:<    ^-1 p0\\+1 g0:&<          ^-1\\.:\\<' + "\n" +
            '                                   ^                                    <' + "\n" +
            "\n" +
            '-- Enter # of integers, then the integers --',
    };

    var TumbleFunge = class {
        constructor() {
            var that = this;
            this.setDefaults();
            this.height = 25;
            this.width = 80;
            this.rawText = "";
            this.parsedText = "";
            this.functions = {
                // Directional
                //'v': function () { that.vector = befungeVector.s; },
                //'^': function () { that.vector = befungeVector.n; },
                //'<': function () { that.vector = befungeVector.w; },
                //'>': function () { that.vector = befungeVector.e; },
                //'?': function () { that.vector = getRandomVector(); },
                //'_': function () { that.switchVector(befungeVector.e, befungeVector.w); },
                //'|': function () { that.switchVector(befungeVector.s, befungeVector.n); },
                //'#': function () { that.moveCursor(); },

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
                'g': function () { that.get(); },
                'p': function () { that.put(); },

                // I/O
                ',': function () { that.printChar(); },
                '.': function () { that.printNumber(); },
                '&': function () { that.getNumber(); },
                '~': function () { that.getChar(); },

                // Math
                '+': function () { that.add(); },
                '-': function () { that.subtract(); },
                '/': function () { that.divide(); },
                '*': function () { that.multiply(); },
                '%': function () { that.modulo(); },
                '`': function () { that.compare(); },
            };
        }

        getNumber() {
            var that = this;
            var $console = $("#console");
            this.numberString = "";
            this.pauseRun();
            $console.addClass("get-number");
            $console.focus();
            $console.on('keyup', function (e) { that.readNumber(e); })
        }

        readNumber(e) {
            var $console = $("#console");
            var val = String.fromCharCode(e.which);
            if (val === " ") {
                this.push(Number(this.numberString));
                $console.off('keyup');
                $console.removeClass("befunge-get-number");
                this.startRun();
            } else {
                if (val >= "0" && val <= "9") {
                    this.numberString = this.numberString + val;
                }
            }
            $console.val($console.val() + val);
        }

        printNumber() {
            var $console = $("#console");
            var outputText = $console.val();
            outputText = outputText + this.pop().toString() + " ";
            $console.val(outputText);
        }

        getChar() {
            var that = this;
            var $console = $("#console");
            this.pauseRun();
            $console.addClass("get-char");
            $console.focus();
            $console.on('keyup', function (e) { that.readChar(e); });
        }

        readChar(e) {
            this.push(String.fromCharCode(e.which));
            var $console = $("#console");
            $console.off('keyup');
            $console.removeClass("get-char");
            this.startRun();
        }

        printChar() {
            var $console = $("#console");
            var outputText = $console.val();
            var outputCharCode = this.pop();
            outputText = outputText + String.fromCharCode(outputCharCode);

            $console.val(outputText);
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

        put() {
            var y = this.pop();
            var x = this.pop();
            var val = Number(this.pop());
            if (val >= 32 & val < 127) {
                val = String.fromCharCode(val);
            }

            var id = this.getTorusId(x, y);
            if (id !== "oob") {
                var $cell = $("#" + id);
                $cell.val('');
                $cell.val(val);
            }
        }

        get() {
            var y = this.pop();
            var x = this.pop();
            var id = this.getTorusId(x, y);
            var val = " ";

            if (id !== "oob") {
                val = $("#" + id).val();
            }

            if (this.befunctions[val] === undefined) {
                this.push(val.charCodeAt(0));
            } else {
                this.push(val);
            }
        }

        add() {
        }

        subtract() {
        }

        divide() {
        }

        multiply() {
        }

        modulo() {
        }

        logicalNot() {
        }

        compare() {
        }

        readFile() {
            var that = this;
            var file = $("#file")[0].files[0];
            if (file) {
                var fileReader = new FileReader();
                fileReader.onload = function (e) { that.loadFile(e); };
                fileReader.readAsText(file);
                $("#file-name").val(file.name);
            } else {
                alert("Failed to load file");
            }
        }

        loadFile(e) {
            this.rawText = e.target.result;
            this.parseText();
            this.drawBoard();
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

        drawBoard() {
            //var $torus = $("#torus");
            //$torus.children().remove();
            //for (var y = 0; y <= this.height; y++) {
            //    var $torusRow = $("<div class='torus-row'></div>");
            //    for (var x = 0; x < this.width; x++) {
            //        var $input = $("<input id='" + this.getTorusId(x, y) + "' type='text' maxlength='1' />");
            //        var idx = (y * this.width) + x;
            //        $input.val(this.parsedText.charAt(idx));
            //        $torusRow.append($input);
            //    }

            //    $torus.append($torusRow);
            //}
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

            if (currentCell.hasClass("befunge-breakpoint")) {
                this.breakpointed = true;
            }

            var currentVal = currentCell.val();

            if (this.breakpointed) {
                this.breakpointed = false;
            }

            if (this.stringMode) {
                this.doStringMode(currentVal);
            } else {
                this.doNonStringMode(currentVal);
            }
        }

        showStack() {
            var stackMode = $("#stack-mode").val();
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

            $("#stack").val(stackText);
        }

        moveCursor() {
            if (!this.halted && !this.breakpointed) {
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
            this.interval = setInterval(function () { that.oneStep(); }, this.intervalMS);
            $("#befunge-pause").removeClass("hidden");
        }

        pauseRun() {
            $("#befunge-pause").addClass("hidden");
            clearInterval(this.interval);
            $("#befunge-run").removeClass("hidden");
        }

        setDefaults() {
            this.x = 0;
            this.y = 0;
            this.stack = [];
            this.numberString = "";
            this.stringMode = false;
            this.halted = false;
            this.vector = befungeVector.e;
            this.intervalMS = 128;
        }

        reset() {
            this.pauseRun();
            this.setDefaults();
            this.activateCurrentCell();
        }

        clear() {
            var $console = $("#befunge-console");
            $console.val("");
        }

        slower() {
            var that = this;
            clearInterval(this.interval);
            if (this.intervalMS < 2048) {
                this.intervalMS = this.intervalMS * 2;
            }
            this.interval = setInterval(function () { that.oneStep(); }, this.intervalMS);
        }

        faster() {
            var that = this;
            clearInterval(this.interval);
            if (this.intervalMS > 1) {
                this.intervalMS = this.intervalMS / 2;
            }
            this.interval = setInterval(function () { that.oneStep(); }, this.intervalMS);
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
        var tf = new TumbleFunge();

        $("#tumble-file").change(function () { tf.readFile(); });
        tf.drawBoard();
        $("#tumble-run").click(function () { tf.startRun(); });
        $("#tumble-pause").click(function () { tf.pauseRun(); });
        $("#tumble-reset").click(function () { tf.reset(); });
        $("#tumble-clear").click(function () { tf.clear(); });
        $("#tumble-slower").click(function () { tf.slower(); });
        $("#tumble-faster").click(function () { tf.faster(); });
        bf.initDemoFileMenu();
    });
})();