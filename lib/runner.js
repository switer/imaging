/*
 * Run with phantomjs, for convert image to red-green-blue-alpha array. 
 *  
 * ▁▂▃▄▅▆▇█▉▊▋▌▍▎▏■●◆
 *
 */

'use strict';

var args = require('system').args
var fs = require('fs')

/**
 * args[3] is a absolute of the running script dir
 * args[4] is a relative path, such as: "../"
 */
var rootdir = decodeURIComponent(args[3]).replace(/\/$/, '') + '/' + args[4]

fs.changeWorkingDirectory(rootdir)

var page = require('webpage').create()
var consoleColor = require($absolutePath('./node_modules/colors/colors.js'))
var transformer = require($absolutePath('./lib/transformer.js'))
var config = require($absolutePath('./config.json'))
var colorMap = config.colors
var charMap = config.charMap
var LOADED_FLAG = /^canvas:loaded:/

try {
    var options = JSON.parse(args[2])
} catch (e) {
    options = {}
}

var browserParams = {
    img: args[1],
    width: options.width ? ~~options.width : config.defaultWidth,
    left: ~~options.left
}
function $absolutePath (p) {
    return fs.workingDirectory + (/\/$/.test(fs.workingDirectory) ? '' : '/') + p
}

function $render (width, height, left) {
    var pixData = page.evaluate(function (w, h) {
        var canvas = document.querySelector('#canvas');
        return canvas.getContext('2d').getImageData(0,0,w,h);
    }, width, height);

    var imgData = pixData.data
    var len = imgData.length / 4
    var index = 0
    var colors = []
    var rgbColors = []
    var colorName
    var pix = options.char

    for (var i =0, index = 0; i < len; i ++, index += 4) {
        var alpha = imgData[index+3]/255,
            oralR = imgData[index],
            oralG = imgData[index+1],
            oralB = imgData[index+2],
            red = transformer.colorTransform(imgData[index], alpha),
            green = transformer.colorTransform(imgData[index+1], alpha),
            blue = transformer.colorTransform(imgData[index+2], alpha);

        var hlwc = transformer.hightlightWhite(
            transformer.rgba2rbg(oralR, alpha), 
            transformer.rgba2rbg(oralG, alpha), 
            transformer.rgba2rbg(oralB, alpha)
        );
        colorName = hlwc || [red,green,blue].join(',')
        colors.push(colorMap[colorName])
        rgbColors.push(colorName)
    }

    if (config.char[pix]) pix = config.char[pix]
    else if ( (pix != 'random' && pix.length > 1) || !pix) pix = config.char.default  

    $draw(colors, {
        left: left,
        width: width,
        pixel: pix,
        rgbColors: rgbColors
    }, function () {
        setTimeout(function () {
            phantom.exit();
        }, 50);
    });
    return pixData;
}
function $draw(colors, opts, cb) {
    function repeat (unit, length) {
        return (new Array(length)).join(unit)
    }
    var width = opts.width
    var left = opts.left
    var line = repeat(' ', left)
    var pixel
    for (var i = 0; i < colors.length; i++) {
        if (opts.pixel == 'random') {
            pixel = charMap[opts.rgbColors[i]] || opts.pixel
        } else {
            pixel = opts.pixel
        }
        if (i !== 0 && i % width === 0) {
            console.log(line);
            line = repeat(' ', left);
        }
        if (typeof(colors[i]) === 'string') {
            line += pixel[colors[i]];
        } else if (colors[i] instanceof Array) {
            line += pixel[colors[i][0]][colors[i][1]];
        }
    }
    cb()
}
page.onConsoleMessage = function(msg) {
    if (LOADED_FLAG.test(msg)) {
        var resp = msg.replace(LOADED_FLAG, '');
        if (resp === 'error') {
            console.error('Running error, please check the image URI!');
            phantom.exit();
        } else {
            $render(browserParams.width, parseInt(resp), browserParams.left);
        }
    }
};
page.settings["localToRemoteUrlAccessEnabled"]  = true;
page.open($absolutePath('./lib/browser/index.html'), function (status) {
    page.evaluate(function (params) {
        run(params)
    }, browserParams)
});