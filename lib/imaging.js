'use strict';

var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var program = require('commander')
var colors = require('colors')
var binPath = phantomjs.path
var config = require('../config.json')

var util = require('./util')

function compose (imgURI, options, cb) {
    var optParams = {};

    var childArgs = [
        __dirname + '/runner.js',
        encodeURIComponent(imgURI)
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
    childArgs.push('../');

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        if (err) {
            console.log(err);
            cb && cb(err, 'fail')
        }
        if ( !stdout || stdout.match(/^Running\ error/)) {
            cb && cb (stdout || 'error', 'fail');
        } else {
            cb && cb(stdout, 'success');
        }
    })
}

exports.draw = function (imgURI, options, cb) {

    if (util.type(options) == 'function') {
        cb = options
        options = {}
    }
    if (!imgURI) {
        cb && cb('Running error, Please give a correct image url !', 'fail')
    } else {
        compose(util.absoluteURI(imgURI), options, cb)
    }
    return this
}