/*
    ▁▂▃▄▅▆▇█▉▊▋▌▍▎▏■●◆
*/
'use strict';

var args = require('system').args,
    fs = require('fs'),
    cwd = fs.workingDirectory;

var dirname = decodeURIComponent(args[3]),
    relativePath = args[4];

fs.changeWorkingDirectory(dirname);

var page = require('webpage').create(),
    color = require(dirname.replace(/\/$/) + '/' + relativePath +  '/node_modules/colors/colors.js'),
    pix = '▇',
    // pix = '●',
    // pix = 'o',
    // pix = '█',
    width = 40;

var colorMap = {
    /*normal*/
    '0,0,0': 'black', 
    '0,0,128': 'blue', 
    '0,128,0': 'green', 
    '0,128,128': 'cyan', 
    '128,0,0': 'red', 
    '128,0,128': 'magenta', 
    '128,128,0': 'yellow', 
    '128,128,128': 'grey',
    /*light*/
    '0,0,255': ['blue','grey'], 
    '0,255,0': ['green','grey'], 
    '0,255,255': ['cyan','grey'], 
    '255,0,0': ['red','grey'], 
    '255,0,255': ['magenta','grey'], 
    '255,255,0': ['yellow','grey'], 
    '255,255,255': ['white','grey'],
    /*likes*/
    '128,128,255': ['blue','grey'],
    '128,0,255': ['blue','grey'], 
    '0,128,255': ['blue','grey'],
    '128,255,128': ['green','grey'], 
    '0,255,128': ['green','grey'], 
    '128,255,0': ['green','grey'], 
    '128,255,255': ['cyan','grey'], 
    '255,128,128': ['red','grey'], 
    '255,128,0': ['red','grey'], 
    '255,0,128': ['red','grey'], 
    '255,128,255': ['magenta','grey'], 
    '255,255,128': ['yellow','grey']
}

var params = argsParse(args);
function argsParse (args) {
    width = args[2];
    return {
        img: args[1],
        width: args[2]
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
            red = transColor(imgData[index], alpha),
            green = transColor(imgData[index+1], alpha),
            blue = transColor(imgData[index+2], alpha);

        colorKey = [red,green,blue].join(',');

        colors.push(colorMap[colorKey]);
    }
    draw(colors, function () {
        setTimeout(function () {
            phantom.exit();
        }, 500);
    });
    return pixData;
}
function draw (colors, callback) {
    var line = '';
    for (var i =0; i < colors.length; i ++) {
        if (i % width !== 0) {
            if (typeof(colors[i]) === 'string') {
                line += pix[colors[i]];
            } else if (colors[i] instanceof Array) {
                line += pix[colors[i][0]][colors[i][1]];
            }
        } else {
            console.log(line);
            line = '';
        }
    }
    callback && callback();
}
function transColor (value, alpha) {
    if (alpha == undefined) alpha = 1;
    var cv = Math.floor((rgba2rbg(value, alpha)));
    if (cv >= 170 ) return 255;
    else if (cv >= 85 && cv < 170) return 128;
    else return 0;
}
function rgba2rbg (value, alpha) {
    return ((1 - alpha)*255 + alpha*value);
}
page.onConsoleMessage = function(msg) {
    if (msg.match(/^canvas\:loaded/)) {
        var resp = msg.replace('canvas:loaded:', '');
        if (resp === 'error') {
            console.log('Running error, please check your image uri!');
            phantom.exit();
        } else {
            var height = parseInt(msg.replace('canvas:loaded:', ''));
            canvasProcess(height);
        }
    }
};
page.settings["localToRemoteUrlAccessEnabled"]  = true;
page.open(relativePath + 'res/index.html?width=' + params.width + '&src=' + params.img, function (status) {
    if (status === 'fail') console.log('Runing index.html error !');
});