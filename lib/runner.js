/*
 *    ▁▂▃▄▅▆▇█▉▊▋▌▍▎▏■●◆
 */
'use strict';

var args = require('system').args
var fs = require('fs')
var cwd = fs.workingDirectory
var dirname = decodeURIComponent(args[3])
var workdir = args[4];

fs.changeWorkingDirectory(dirname);

var page = require('webpage').create()
var rootdir = dirname.replace(/\/$/, '') + '/' + workdir 
var color = require(rootdir + '/node_modules/colors/colors.js')
var config = require(rootdir + '/config.json')
var colorMap = config.colors
var pix = config.defaultPix
var width = config.defaultWidth
var options = {}

var params = argsParse(args);
function argsParse (args) {
    options = JSON.parse(args[2]);

    var charType = options.char;

    width = parseInt(options.width);

    if (config.char[charType]) pix = config.char[charType];
    else if (charType.length === 1) pix = charType;
    else pix = config.char.default;

    return {
        img: args[1],
        width: width,
        left: parseInt(options.left)
    }
}
function canvasProcess (height) {
    var pixData = page.evaluate(function (height, width) {
        var canvas = document.querySelector('#canvas');
        return canvas.getContext('2d').getImageData(0,0,width,height);
    }, height, width);

    var imgData = pixData.data,
        len = imgData.length / 4,
        index = 0,
        colors = [],
        colorKey = '';

    for (var i =0, index = 0; i < len; i ++, index += 4) {

        var alpha = imgData[index+3]/255,
            oralR = imgData[index],
            oralG = imgData[index+1],
            oralB = imgData[index+2],
            red = colorTransform(imgData[index], alpha),
            green = colorTransform(imgData[index+1], alpha),
            blue = colorTransform(imgData[index+2], alpha);

        var whiteKey = specifyWhite(rgba2rbg(oralR, alpha), rgba2rbg(oralG, alpha), rgba2rbg(oralB, alpha));
        if (whiteKey) {
            colorKey = whiteKey;
        } else {
            colorKey = [red,green,blue].join(',');
        }

        colors.push(colorMap[colorKey]);
    }
    draw(colors, function () {
        setTimeout(function () {
            phantom.exit();
        }, 50);
    });
    return pixData;
}
function nearby (value, min, max) {
    return (value > min && value <= max)
}
function specifyWhite (red, green, blue) {
    var min = 170, max = 230;
    if (nearby(red, min, max) && nearby(green, min, max) && nearby(blue, min, max)) {
        return '192,192,192';
    } else {
        return null;
    }
}
function repeat (str, times) {
    var index = 0,
        ctn = '';
    while(index < times) {
        ctn += str;
        index ++;
    }
    return ctn;
}
function colorProcess (colors) {
    var red = colors.shift(),
        green = colors.shift(),
        blue = colors.shift();

    
}
function draw (colors, callback) {
    var line = repeat(' ', params.left);
    for (var i = 0; i < colors.length; i++) {
        if (i !==0 && i % width === 0) {
            console.log(line);
            line = repeat(' ', params.left);
        }
        if (typeof(colors[i]) === 'string') {
            line += pix[colors[i]];
        } else if (colors[i] instanceof Array) {
            line += pix[colors[i][0]][colors[i][1]];
        }

    }
    callback && callback();
}
function colorTransform (value, alpha) {
    if (alpha == undefined) alpha = 1;
    var cv = Math.floor((rgba2rbg(value, alpha)));
    if (cv >= 170 ) return 255;
    else if (cv >= 85 && cv < 170) return 128;
    else return 0;
}
function rgba2rbg (value, alpha) {
    return ((1 - alpha)*255 + alpha*value);
}

var LOADED_FLAG = /^canvas:loaded:/
page.onConsoleMessage = function(msg) {
    if (LOADED_FLAG.test(msg)) {
        var resp = msg.replace(LOADED_FLAG, '');
        if (resp === 'error') {
            console.error('Running error, please check the image URI!');
            phantom.exit();
        } else {
            var height = parseInt(resp);
            canvasProcess(height);
        }
    }
};
page.settings["localToRemoteUrlAccessEnabled"]  = true;
page.open(workdir + 'lib/browser/index.html', function (status) {
    page.evaluate(function (params) {
        run(params)
    }, params)
});