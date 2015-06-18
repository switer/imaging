'use strict';

var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var program = require('commander')
var colors = require('colors')
var binPath = phantomjs.path
var config = require('../config.json')

var util = require('./util')

function _run (imgUri, options, callback) {
    var optParams = {};

    var childArgs = [
      __dirname + '/runner.js',
      encodeURIComponent(imgUri)
    ]

    if (options.width) {
        optParams.width = options.width;
    } else {
        optParams.width = config.defaultWidth;
    }
    if (options.char) {
        optParams.char = options.char;
    } else {
        optParams.char = config.char.default;
    }
    if (options.left) {
        optParams.left = options.left;
    } else {
        optParams.left = config.defaultLeft;
    }
    
    childArgs.push(JSON.stringify(optParams));
    childArgs.push(encodeURIComponent(__dirname));
    childArgs.push('./');

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err) {
            console.log(err);
            callback && callback(err, 'fail')
        }
        if ( !stdout || stdout.match(/^Running\ error/)) {
            callback && callback (stdout || 'error', 'fail');
        } else {
            callback && callback(stdout, 'success');
        }
    })
}

exports.draw = function (/*src, [options], callback*/) {

    var args = arguments,
        src = args[0],
        options = {},
        callback = null;

    var param2 = args[1];

    if (typeof(param2) == 'function') {
        callback = param2;
    } else if (typeof(param2) == 'object'){
        options = param2;
    }
    if (!callback) callback = args[2];

    var imgUri = src;
    if (!imgUri) {
        callback && callback('Running error, Please give a correct image url !', fail)
        return;
    } else {
        imgUri = util.absoluteURI(imgUri);
    }
    _run(imgUri, options, callback);
}