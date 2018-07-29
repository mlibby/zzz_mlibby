(function () {

    /* Returns a pseudo-random integer from 0 to max */
    Math.randomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    class Teletype {
        constructor($output, $input, $enter) {
            this.output = $output;
            this.input = $input;
            this.enter = $enter;
            this.buffer = [];
            this.printing = false;
            this.awaitingInput = false;
        }

        sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }

        printBuffer() {
            if (!this.printing) {
                if (this.buffer.length > 0) {
                    this.printing = true;
                    setTimeout(() => {
                        let char = this.buffer.shift();
                        this.output.append(char);
                        this.output.scrollTop(this.output[0].scrollHeight);
                        this.printing = false;
                        this.printBuffer();
                    }, 5);
                } else {
                    this.printing = false;
                }
            }
        }

        print(msg) {
            if (msg instanceof Array) {
                for (const line of msg) {
                    this.print(line);
                }
            } else {
                for (const char of msg) {
                    this.buffer.push(char);
                }
                this.buffer.push("\n");
                this.printBuffer();
            }
        }

        getInput(callback) {
            if (this.printing) {
                setTimeout(() => this.getInput(callback), 100);
                return;
            }
            this.input.removeAttr('disabled');
            this.enter.removeAttr('disabled');

            this.input.val("");
            this.input.focus();

            this.enter.off();
            this.enter.click(e => {
                e.preventDefault();
                let result = this.input.val().trim();
                this.input.attr('disabled', 'disabled');
                this.enter.attr('disabled', 'disabled');
                this.input.val("");
                this.print(result);
                callback(result);
            });
        }
    }

    class OregonTrail {
        //
        // These are the original header comments for the BASIC code I worked from:
        //         
        //   REM THE PROGRAM THAT FOLLOWS IS A RECONSTRUCTION
        //   REM OF THE OREGON TRAIL GAME WRITTEN FOR HP TIME - SHARED
        //   REM BASIC BY DON RAWITSCH AND BILL HEINEMANN AND PAUL DILLENBERGER
        //   REM IN 1971. ITS SOURCE IS AN UPDATED VERSION PUBLISHED IN THE
        //   REM JULY - AUGUST 1978 ISSUE OF CREATIVE COMPUTING AND POSTED BY
        //   REM DESERTHAT TO HIS BLOG AT
        //   REM HTTP://DESERTHAT.WORDPRESS.COM/2010/11/07/OREGION-TRAIL-VER-3-BASIC-3-1-1978.
        //   REM THAT VERSION WAS DESIGNED FOR THE CDC CYBER 70 / 73 - 26 RUNNING BASIC 3.1.
        //
        //   REM THIS VERSION HAS BEEN PORTED BACK TO HP TIME-SHARED BASIC.
        //   REM THE BASIC USED HERE IS FAIRLY STANDARD, AND SHOULD RUN ON MANY OTHER
        //   REM SYSTEMS WITH JUST A BIT OF CUSTOMIZATION.IF PORTING IT TO ANOTHER BASIC,
        //   REM DO TAKE NOTE OF HP TIME - SHARED BASIC'S IDIOSYNCRATIC "GOTO <VAR> OF"
        //   REM  STATEMENT, USED IN PLACE OF THE "ON" STATEMENT OF MANY OTHER BASICS.
        //   REM ALSO PAY ATTENTION TO THE RANDOMIZATION ROUTINES(RND), WHICH WORK
        //   REM SOMEWHAT UNUSUALLY IN TIME - SHARED BASIC.
        //
        //   REM FOR MORE INFORMATION ON HOW THIS PORT CAME TO BE SEE
        //   REM http://web.archive.org/web/20180706191111/https://www.filfre.net/tag/the-oregon-trail/
        //   REM --JIMMY MAHER, APRIL 3, 2011
        //
        // --Michael Libby, July 27, 2018
        //

        constructor(teletype) {
            this.tt = teletype;
            this.fortOptionFlag = 1;
            this.injuryFlag = 0;
            this.illnessFlag = 0;
            this.southPassFlag = 0;
            this.blueMountainsFlag = 0;
            this.totalMileage = 0;
            this.southPassMileageFlag = 0;
            this.turnNumber = 0;
        }

        printInstructions() {
            let instructions = [
                "THIS PROGRAM SIMULATES A TRIP OVER THE OREGON TRAIL FROM",
                "INDEPENDENCE MISSOURI TO OREGON CITY, OREGON IN 1847.",
                "YOUR FAMILY OF FIVE WILL COVER THE 2040 MILE OREGON TRAIL",
                "IN 5-6 MONTHS --- IF YOU MAKE IT ALIVE.",
                "",
                "YOU HAD SAVED $900 TO SPEND FOR THE TRIP, AND YOU'VE JUST",
                "PAID $200 FOR A WAGON.",
                "",
                "YOU WILL NEED TO SPEND THE REST OF YOUR MONEY ON THE",
                "FOLLOWING ITEMS:",
                "",
                "     OXEN - YOU CAN SPEND $200-$300 ON YOUR TEAM",
                "            THE MORE YOU SPEND, THE FASTER YOU'LL GO",
                "            BECAUSE YOU'LL HAVE BETTER ANIMALS",
                "",
                "     FOOD - THE MORE YOU HAVE, THE LESS CHANCE THERE",
                "            IS OF GETTING SICK",
                "",
                "     AMMUNITION - $1 BUYS A BELT OF 50 BULLETS",
                "            YOU WILL NEED BULLETS FOR ATTACKS BY ANIMALS",
                "            AND BANDITS, AND FOR HUNTING FOOD",
                "",
                "     CLOTHING - THIS IS ESPECIALLY IMPORTANT FOR THE COLD",
                "            WEATHER YOU WILL ENCOUNTER WHEN CROSSING",
                "            THE MOUNTAINS",
                "",
                "     MISCELLANEOUS SUPPLIES - THIS INCLUDES MEDICINE AND",
                "            OTHER THINGS YOU WILL NEED FOR SICKNESS",
                "            AND EMERGENCY REPAIRS",
                "",
                "YOU CAN SPEND ALL YOUR MONEY BEFORE YOU START YOUR TRIP -",
                "OR YOU CAN SAVE SOME OF YOUR CASH TO SPEND AT FORTS ALONG",
                "THE WAY WHEN YOU RUN LOW. HOWEVER, ITEMS COST MORE AT",
                "THE FORTS. YOU CAN ALSO GO HUNTING ALONG THE WAY TO GET",
                "MORE FOOD.",
                "",
                "WHENEVER YOU HAVE TO USE YOUR TRUSTY RIFLE ALONG THE WAY,",
                "YOU WILL BE TOLD TO TYPE IN A WORD (ONE THAT SOUNDS LIKE A",
                "GUN SHOT). THE FASTER YOU TYPE IN THAT WORD AND HIT THE",
                "**RETURN** KEY, THE BETTER LUCK YOU'LL HAVE WITH YOUR GUN.",
                "",
                "AT EACH TURN, ALL ITEMS ARE SHOWN IN DOLLAR AMOUNTS",
                "EXCEPT BULLETS",
                "",
                "WHEN ASKED TO ENTER MONEY AMOUNTS, DON'T USE A **$**.",
                "",
                "GOOD LUCK!!!",
                ""
            ];

            this.tt.print(instructions);
        }

        start() {
            this.tt.print("DO YOU NEED INSTRUCTIONS? (YES/NO)");
            this.tt.getInput(result => {
                if (result.toLowerCase() !== "no") {
                    this.printInstructions();
                }
                this.askRifleSkill();
            });
        }

        askRifleSkill() {
            this.tt.print([
                "HOW GOOD A SHOT ARE YOU WITH YOUR RIFLE?",
                "  (1) ACE MARKSMAN,  (2) GOOD SHOT,  (3) FAIR TO MIDDLIN'",
                "  (4) NEED MORE PRACTICE,  (5) SHAKY KNEES",
                "ENTER ONE OF THE ABOVE. THE BETTER YOU CLAIM YOU ARE, THE",
                "FASTER YOU'LL HAVE TO BE WITH YOUR GUN TO BE SUCCESSFUL."
            ]);
            this.tt.getInput(result => {
                this.rifleSkill = result;
                this.askOxenSpending();
            });
        }

        askOxenSpending() {
            this.tt.print("HOW MUCH DO YOU WANT TO SPEND ON YOUR OXEN TEAM?");
            this.tt.getInput(result => {
                this.oxen = result;
                if (this.oxen < 200) {
                    this.tt.print("NOT ENOUGH");
                    this.askOxenSpending();
                } else if (this.oxen > 300) {
                    this.tt.print("TOO MUCH");
                    this.askOxenSpending();
                } else {
                    this.askFoodSpending();
                }
            });
        }

        askFoodSpending() {
            this.tt.print("HOW MUCH DO YOU WANT TO SPEND ON FOOD?");
            this.tt.getInput(result => {
                this.food = result;
                if (this.food < 0) {
                    this.tt.print("IMPOSSIBLE");
                    this.askFoodSpending();
                } else {
                    this.askAmmoSpending();
                }
            });
        }

        askAmmoSpending() {
            this.tt.print("HOW MUCH DO YOU WANT TO SPEND ON AMMUNITION?");
            this.tt.getInput(result => {
                this.ammo = result;
                if (this.ammo < 0) {
                    this.tt.print("IMPOSSIBLE");
                    this.tt.askAmmoSpending();
                } else {
                    this.askClothingSpending();
                }
            });
        }

        askClothingSpending() {
            this.tt.print("HOW MUCH DO YOU WANT TO SPEND ON CLOTHING?");
            this.tt.getInput(result => {
                this.clothing = result;
                if (this.clothing < 0) {
                    this.tt.print("IMPOSSIBLE");
                    this.askClothingSpending();
                } else {
                    this.askMiscSpending();
                }
            });
        }

        askMiscSpending() {
            this.tt.print("HOW MUCH DO YOU WANT TO SPEND ON MISCELLANEOUS SUPPLIES?");
            this.tt.getInput(result => {
                this.supplies = result;
                if (this.supplies < 0) {
                    this.tt.print("IMPOSSIBLE");
                    this.askMiscSpending();
                } else {
                    this.checkSpendingTotal();
                }
            });
        }

        checkSpendingTotal() {
            this.money = 700 - this.oxen - this.food - this.ammo - this.clothing - this.supplies;
            if (this.money < 0) {
                this.tt.print("YOU OVERSPENT.YOU ONLY HAD $700 TO SPEND. BUY AGAIN.");
                this.askOxenSpending();
            } else {
                this.tt.print("AFTER ALL YOUR PURCHASES, YOU NOW HAVE " + this.money + " DOLLARS LEFT");
                this.startTurn();
            }
        }

        startTurn() {
            if (this.totalMileage >= 2040) {
                this.lastTurn();
            } else {
                this.printDate();
                this.updateNumbers();
                this.printFoodWarning();
                this.printMileage();
                this.printItemSummary();
                this.getNextAction();
            }
        }

        printDate() {
            let date = moment("1847-03-29");
            date.add(this.turnNumber * 14, 'days');
            this.tt.print(date.format("dddd MMMM D YYYY").toUpperCase());
        }

        updateNumbers() {
            this.ammo = this.positiveIntegerize(this.ammo);
            this.clothing = this.positiveIntegerize(this.clothing);
            this.food = this.positiveIntegerize(this.food);
            this.supplies = this.positiveIntegerize(this.supplies);
            this.money = this.positiveIntegerize(this.money);
            this.totalMileage = this.positiveIntegerize(this.totalMileage);
            this.mileageAtTurnStart = this.totalMileage;
        }

        positiveIntegerize(number) {
            if (number < 0) {
                return 0;
            } else {
                return Math.floor(number);
            }
        }

        printFoodWarning() {
            if (this.food < 13) {
                this.tt.print("YOU'D BETTER DO SOME HUNTING OR BUY FOOD AND SOON!!!!");
            }
        }

        printMileage() {
            if (this.southPassMileageFlag == 1) {
                this.tt.print("TOTAL MILEAGE IS 950");
            } else {
                this.tt.print("TOTAL MILEAGE IS " + this.totalMileage);
            }
            this.southPassMileageFlag = 0;
        }

        printItemSummary() {
            this.tt.print("FOOD  BULLETS  CLOTHING  MISC. SUPP.   CASH");
            this.tt.print(
                this.food.toString().padEnd(6, ' ') +
                this.ammo.toString().padEnd(9, ' ') +
                this.clothing.toString().padEnd(10, ' ') +
                this.supplies.toString().padEnd(14, ' ') +
                this.money.toString()
            );
        }

        getNextAction() {
            this.fortOptionFlag *= -1;
            if (this.fortOptionFlag === -1) {
                this.tt.print("DO YOU WANT TO (1) HUNT, OR (2) CONTINUE?");
                this.tt.getInput(result => {
                    let action = Number(result) + 1;
                    this.doAction(action)
                });
            } else {
                this.tt.print([
                    "DO YOU WANT TO (1) STOP AT THE NEXT FORT, (2) HUNT, ",
                    "OR (3) CONTINUE?"
                ]);
                this.tt.getInput(result => {
                    let action = Number(result);
                    this.doAction(action)
                });
            }
        }

        doAction(action) {
            if (action === 1) {
                this.stopAtFort();
            } else if (action === 2) {
                if (this.ammo < 40) {
                    this.tt.print("TOUGH---YOU NEED MORE BULLETS TO GO HUNTING");
                    this.getNextAction();
                } else {
                    this.hunt();
                }
            } else {
                this.eat();
            }
        }

        stopAtFort() {
            this.tt.print("stop at fort");
            this.eat();
        }

        hunt() {
            this.tt.print("hunt");
            this.eat();
        }

        eat() {
            this.tt.print("eat");
            this.updateMileage();
        }

        updateMileage() {
            this.totalMileage += 200;
            this.totalMileage += (this.oxen - 220) / 5;
            this.totalMileage += Math.randomInt(9) + 1;
            this.ridersAttack();
        }

        ridersAttack() {
            this.tt.print("riders attack");
            this.doEvents();
        }

        doEvents() {
            this.tt.print("do events");
            this.doMountains();
        }

        doMountains() {
            this.tt.print("do mountains");
            //    if (this.totalMileage > 950) {
            //        this.doMountains();
            //    }
            this.finishTurn();
        }

        finishTurn() {
            this.turnNumber++;
            setTimeout(() => this.startTurn(), 1);
        }

        lastTurn() {
            this.tt.print([
                "YOU FINALLY ARRIVED AT OREGON CITY",
                "AFTER 2040 LONG MILES---HOORAY!!!!!",
                "A REAL PIONEER!"
            ]);
        }
    }

    $(document).ready(function () {
        let tt = new Teletype($("#oregon-paper-roll"), $("#oregon-input"), $("#oregon-enter"));

        $('#startButton').click(function () {
            let ot = new OregonTrail(tt);
            ot.start();
        });
    });
})();