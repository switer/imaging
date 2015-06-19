'use strict';

function roundIn (value, min, max) {
    return (value > min && value <= max)
}

module.exports = {
    colorTransform: function(value, alpha) {
        if (alpha == undefined) alpha = 1;
        var cv = Math.floor(this.rgba2rbg(value, alpha));
        if (cv >= 170) return 255;
        else if (cv >= 85 && cv < 170) return 128;
        else return 0;
    },
    rgba2rbg: function(value, alpha) {
        return ((1 - alpha) * 255 + alpha * value);
    },
    hightlightWhite: function (red, green, blue) {
        var min = 170,
            max = 230;
        if (roundIn(red, min, max) && roundIn(green, min, max) && roundIn(blue, min, max)) {
            return '192,192,192';
        } else {
            return null;
        }
    }

}
