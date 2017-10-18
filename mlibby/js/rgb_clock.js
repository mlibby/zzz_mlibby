(function () {
    function setLed(cell, value) {
        var $cell = $(cell);
        $cell.removeClass('red green blue');
        if (value > 1) {
            $cell.addClass('blue');
        } else if (value > 0) {
            $cell.addClass('green');
        } else {
            $cell.addClass('red');
        }
    }

    function updateHours(hours) {
        var nines = Math.floor(hours / 9);
        var threes = Math.floor((hours % 9) / 3);
        var ones = (hours % 9) % 3;

        setLed('.r1c1', nines);
        setLed('.r1c2', threes);
        setLed('.r1c3', ones);
    }

    function updateMinutes(minutes) {
        var twoSevens = Math.floor(minutes / 27);
        var nines = Math.floor((minutes % 27) / 9);
        var threes = Math.floor(((minutes % 27) % 9) / 3);
        var ones = ((minutes % 27) % 9) % 3;

        setLed('.r2c1', twoSevens);
        setLed('.r2c2', nines);
        setLed('.r2c3', threes);
        setLed('.r2c4', ones);
    }

    function updateSeconds(seconds) {
        var twoSevens = Math.floor(seconds / 27);
        var nines = Math.floor((seconds % 27) / 9);
        var threes = Math.floor(((seconds % 27) % 9) / 3);
        var ones = ((seconds % 27) % 9) % 3;

        setLed('.r3c1', twoSevens);
        setLed('.r3c2', nines);
        setLed('.r3c3', threes);
        setLed('.r3c4', ones);
    }

    function updateLeds(clockTime) {
        var hours = Number(clockTime.substr(0, 2));
        updateHours(hours);

        var minutes = Number(clockTime.substr(3, 2));
        updateMinutes(minutes);

        var seconds = Number(clockTime.substr(6, 2));
        updateSeconds(seconds);
    }

    function updateClock(clockTime) {
        $('#current-time').text(clockTime);
    }

    function updatePage() {
        var longTime = (new Date()).toTimeString();
        var clockTime = longTime.substr(0, 8);
        updateClock(clockTime);
        updateLeds(clockTime);
    }

    $(document).ready(function () {
        setInterval(updatePage, 500);
    });
})();