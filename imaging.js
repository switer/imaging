#!/usr/bin/env node
var childProcess = require('child_process'),
    phantomjs = require('phantomjs'),
    program = require('commander'),
    colors = require('colors'),
    binPath = phantomjs.path,
    config = {
        defaultWidth : 40
    };

function _fixedImageUrl(url) {
    if (url.match(/http[s]*\:\/\//)) return url;
    else if (url.match(/[a-zA-Z]\:/) || url.match(/^\//)) return url;
    else return process.cwd().replace('/$','') + '/' + url;
}

function _run (imgUri, options, callback) {
    var childArgs = [
      __dirname + '/run.js',
      encodeURIComponent(imgUri)
    ]

    if (options.width) {
      childArgs.push(options.width);
    } else {
      childArgs.push(config.defaultWidth);
    }
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
        imgUri = _fixedImageUrl(imgUri);
    }
    _run(imgUri, options, callback);
}

