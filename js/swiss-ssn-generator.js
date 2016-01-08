(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    function generate(old) {
        return old ? generateOld() : generateNew();
    }
    exports.generate = generate;
    ;
    function generateOld() {
        // see http://www.pruefziffernberechnung.de/A/AHV-Nummer.shtml
        var ssn = [];
        ssn.push(getRandomIntInclusive(1, 9));
        ssn.push(getRandomIntInclusive(0, 9));
        ssn.push(getRandomIntInclusive(0, 9));
        ssn.push(getRandomIntInclusive(0, 9));
        ssn.push(getRandomIntInclusive(0, 9));
        ssn.push(getRandomIntInclusive(1, 8));
        ssn.push(getRandomIntInclusive(0, 8));
        ssn.push(getRandomIntInclusive(0, 9));
        ssn.push(1);
        ssn.push(getRandomIntInclusive(1, 8));
        while (ssn.length < 11) {
            var check = checkNumberOld(ssn);
            if (check != 10) {
                ssn.push(check);
            }
            else {
                ssn[8]++;
            }
        }
        return ssn.join('');
    }
    function checkNumberOld(ssn) {
        var weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        for (var i = 0; i < weights.length; i++) {
            sum += ssn[i] * weights[i];
        }
        var rest = sum % 11;
        var check = 11 - rest;
        return check;
    }
    function generateNew() {
        // see
        var ssn = [7, 5, 6];
        for (var i = 0; i < 9; i++) {
            var r = getRandomIntInclusive(0, 9);
            ssn.push(r);
        }
        ssn.push(checkNumberNew(ssn));
        return ssn.join('');
    }
    function checkNumberNew(ssn) {
        var sum = 0;
        for (var i = 0; i < ssn.length; i++) {
            sum += ssn[i] * ((i) % 2 == 0 ? 1 : 3);
        }
        var check = 10 - sum % 10;
        return check == 10 ? 0 : check;
    }
    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
//# sourceMappingURL=swiss-ssn-generator.js.map