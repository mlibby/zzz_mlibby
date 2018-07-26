﻿(function () {
    class Teletype {
        constructor($output, $input, $enter) {
            this.output = $output;
            this.input = $input;
            this.enter = $enter;
            this.buffer = [];
            this.printing = false;
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
                    }, 10);
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

        getInput() {
            this.input.removeAttr('disabled');
            this.input.focus();
            let result = "YES";
            this.input.attr('disabled', 'disabled');
            this.output.focus();
            this.print(result);
            return result;
        }
    }

    class OregonTrail {

        constructor(teletype) {
            this.tt = teletype;
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
            let needInstructions = this.tt.getInput();
            if (needInstructions.toLowerCase() === "yes") {
                this.printInstructions();
            }
            this.askRifleSkill();
        }

        askRifleSkill() {
            this.tt.print([
                "HOW GOOD A SHOT ARE YOU WITH YOUR RIFLE?",
                "  (1) ACE MARKSMAN,  (2) GOOD SHOT,  (3) FAIR TO MIDDLIN'",
                "  (4) NEED MORE PRACTICE,  (5) SHAKY KNEES",
                "ENTER ONE OF THE ABOVE. THE BETTER YOU CLAIM YOU ARE, THE",
                "FASTER YOU'LL HAVE TO BE WITH YOUR GUN TO BE SUCCESSFUL."
            ]);
            let rifleSkill = this.tt.input();
        }
    }

    $(document).ready(function () {
        let tt = new Teletype($("#oregon-paper-roll"), $("#oregon-input"), $("#oregon-enter"));
        let ot = new OregonTrail(tt);
        ot.start();
    });
})();