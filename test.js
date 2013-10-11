var page = require('webpage').create(),
    color = require('./node_modules/colors/colors.js'),
    pix = '▇',
    width = 40;

page.settings["localToRemoteUrlAccessEnabled"]  = true;

var colorMap = {
    '0,0,0': 'black', 
    // '0,0,0': 'white', 
    '0,0,128': 'blue', 
    '0,128,0': 'green', 
    '0,128,128': 'cyan', 
    '128,0,0': 'red', 
    '128,0,128': 'magenta', 
    '128,128,0': 'yellow', 
    // '128,128,128': 'grey'
    '128,128,128': 'white'
    // '128,128,128': 'black'
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

        var red = transColor(imgData[index]),
            green = transColor(imgData[index+1]),
            blue = transColor(imgData[index+2]);

        colorKey = [red,green,blue].join(',');
        colors.push(colorMap[colorKey]);
    }
    draw(colors);
    return pixData;
}
function draw (colors) {
    var line = '';
    for (var i =0; i < colors.length; i ++) {
        if (i % width !== 0) {
            line += pix[colors[i]];
        } else {
            console.log(line);
            line = '';
        }
    }
}
function transColor (value) {
    var cv = Math.floor(value*128/255);
    if (cv >= 64) return 128;
    else return 0;
}
page.onConsoleMessage = function(msg) {
    if (msg.match(/^canvas\:loaded/)) {
        var height = parseInt(msg.replace('canvas:loaded:', ''));
        console.log(height);
        canvasProcess(height);
        phantom.exit();
    }
};
page.open('index.html', function (status) {
    // phantom.exit();
});