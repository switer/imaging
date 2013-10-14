/*
    ▁▂▃▄▅▆▇█▉▊▋▌▍▎▏■●◆
*/
'use strict';

var args = require('system').args,
    fs = require('fs'),
    cwd = fs.workingDirectory;

var dirname = decodeURIComponent(args[3]);
fs.changeWorkingDirectory(dirname);

console.log(dirname);

var page = require('webpage').create(),
    colors = require(dirname.replace(/\/$/) + '/../node_modules/colors/colors.js'),
    pix = '▇',
    // pix = '●',
    // pix = 'o',
    // pix = '█',
    width = 40;
console.log(colors)
phantom.exit();