(function () {
    var BOX = {
        ONES: 1,
        TWOS: 2,
        THREES: 3,
        FOURS: 4,
        FIVES: 5,
        SIXES: 6,
        THREE_KIND: 7,
        FOUR_KIND: 8,
        FULL_HOUSE: 9,
        SM_STRAIGHT: 10,
        LG_STRAIGHT: 11,
        PSYTZEE: 12,
        CHANCE: 13
    }

    function discardDie(event) {
        var $die = $(event.target);
        $die.toggleClass('discarded');
        var $turn = $($die.parents('.turn'));
        populateRolls($turn);
        updateScores();
    };

    function populateRolls($turn) {
        var $rollsTaken = $($turn.find('.rolls-taken'));
        var dice = $turn.find('.psytzee-die');
        var rolls = $turn.find('.roll button');
        var rerolls = $turn.find('.re-roll button');
        var finalRolls = $turn.find('.final-roll button');

        $(dice).removeClass('used');

        var rollsTaken = 0;
        $rollsTaken.val(rollsTaken);

        rolls.each(function (i, roll) {
            var $die = $(dice[i]);
            $(roll).text($die.text());
            rollsTaken++;
            $rollsTaken.val(rollsTaken);
            $die.addClass('used');
        });

        rolls.each(function (i, roll) {
            var $roll = $(roll);
            if ($roll.hasClass('discarded')) {
                var $newDie = $(dice[rollsTaken]);
                $(rerolls[i]).text($newDie.text());
                $newDie.addClass('used');
                rollsTaken++;
                $rollsTaken.val(rollsTaken);
            } else {
                $(rerolls[i]).text($roll.text());
            }
        });

        rerolls.each(function (i, reroll) {
            var $reroll = $(reroll);
            if ($reroll.hasClass('discarded')) {
                var $newDie = $(dice[rollsTaken]);
                $(finalRolls[i]).text($newDie.text());
                $newDie.addClass('used');
                rollsTaken++;
                $rollsTaken.val(rollsTaken);
            } else {
                $(finalRolls[i]).text($reroll.text());
            }
        });
    };

    function initializeTurns() {
        $('.turn').each(function (i, turn) {
            populateRolls($(turn));
        });
        updateScores();
    };

    function scoreNumber(number, dice) {
        var score = 0;
        for (var x = 0; x < 5; x++) {
            if (dice[x] === number) {
                score += number;
            }
        }
        return score;
    }

    function scoreSum(dice) {
        var score = 0;
        for (var x = 0; x < 5; x++) {
            score += dice[x];
        }
        return score;
    }

    function verifyKind(number, dice) {
        var verified = false;
        var count = 0;
        for (var x = 0; x < 6; x++) {
            count = 0;
            for (var y = 0; y < 5; y++) {
                if (dice[y] == x) {
                    count++;
                }
            }
            if (count == number) {
                verified = true;
                break;
            }
        }
        return verified;
    }

    function verifyHouse(dice) {
        var verifiedTwo = verifyKind(2, dice);
        var verifiedThree = verifyKind(3, dice);

        return verifiedTwo && verifiedThree;
    }

    function verifyStraight(number, dice) {
        var verified = false;
        var sortedDice = dice.sort();
        var previousNumber = sortedDice[0];

        var count = 1;
        var previousNumber = sortedDice[0];
        for (var i = 1; i < sortedDice.length; i++) {
            if (sortedDice[i] === previousNumber + 1) {
                count++;
                if (count >= number) {
                    verified = true;
                    break;
                }
            } else {
                if (sortedDice[i] !== sortedDice[i - 1]) {
                    count = 0;
                }
            }
            previousNumber = sortedDice[i];
        }

        return verified;
    }

    function scoreTurn(scoreBox, dice) {
        var score = 0;
        switch (scoreBox) {
            case BOX.ONES:
            case BOX.TWOS:
            case BOX.THREES:
            case BOX.FOURS:
            case BOX.FIVES:
            case BOX.SIXES:
                score = scoreNumber(scoreBox, dice);
                break;
            case BOX.THREE_KIND:
                if (verifyKind(3, dice)) {
                    score = scoreSum(dice);
                }
                break;
            case BOX.FOUR_KIND:
                if (verifyKind(4, dice)) {
                    score = scoreSum(dice);
                }
                break;
            case BOX.FULL_HOUSE:
                if (verifyHouse(dice)) {
                    score = 25;
                }
                break;
            case BOX.SM_STRAIGHT:
                if (verifyStraight(4, dice)) {
                    score = 30;
                }
                break;
            case BOX.LG_STRAIGHT:
                if (verifyStraight(5, dice)) {
                    score = 40;
                }
                break;
            case BOX.PSYTZEE:
                if (verifyKind(5, dice)) {
                    score = 50;
                }
                break;
            default: /* CHANCE */
                score = scoreSum(dice);
                break;
        }
        return score;
    }

    function updateScores(event) {
        var diceUsed = 0;
        var upperBonus = 0;
        var upperTotal = 0;
        var lowerTotal = 0;

        $('.score-box').text('');

        $('.turn').each(function (i, turn) {
            var $turn = $(turn);
            var $rollsTaken = $turn.find('.rolls-taken');
            diceUsed += Number($rollsTaken.val());

            var dice = [];
            $turn.find('.final-roll button').each(function (i, btn) {
                dice.push(Number($(btn).text()));
            });

            var boxNumber = Number($turn.find('select').val());
            if (boxNumber > 0) {
                var score = scoreTurn(boxNumber, dice);
                $('#box-' + boxNumber).text(score);

                if (boxNumber < 7) {
                    upperTotal += score;
                } else {
                    lowerTotal += score;
                }
            }
        });

        if (upperTotal >= 63) {
            upperBonus = 35;
            upperTotal += 35;
        }

        $('#box-upper-bonus').text(upperBonus);
        $('#box-upper-total').text(upperTotal);
        $('#box-lower-total').text(lowerTotal);
        $('#total-score').text(upperTotal + lowerTotal);
        $('#dice-rolled').text(diceUsed);
    };

    $(document).ready(function () {
        if ($("h1").text() !== 'Psytzee') {
            return;
        }

        initializeTurns();

        $('.roll button').on('click', discardDie);
        $('.re-roll button').on('click', discardDie);
        $('.psytzee select').on('change', updateScores);
    });
})();