'use strict';

var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var program = require('commander')
var colors = require('colors')
var path = require('path')
var config = require('../config.json')
var util = require('./util')
var binPath = phantomjs.path

function render (imgURI, options, cb) {

    childProcess.execFile(binPath, [
            '--web-security=false',
            '--disk-cache=true',
            '--ssl-protocol=any',
            '--ignore-ssl-errors=true',
            path.normalize(__dirname + '/runner.js'),           // phantom runner relative path
            encodeURIComponent(util.absoluteURI(imgURI)),       // asolute path of rendered image
            JSON.stringify({                                    // render options
                width: options.width || config.defaultWidth,
                char: options.char || config.char.default,
                left: options.left || config.defaultLeft
            }),
            encodeURIComponent(__dirname),                      // current module work director
            '../'                                               // the relative path of the root work director
        ], 
        function(err, stdout, stderr) {
            if (err) {
                console.log(err)
                return cb(err, 'fail')
            }
            !stdout || /^Running\ error/.test(stdout) 
                ? cb (stdout || 'error', 'fail')
                : cb(stdout, 'success')
    })
}
function NOOP () {}

exports.draw = function (imgURI, options, cb) {

    if (util.type(options) == 'function') {
        cb = options
        options = {}
    }
    cb = cb || NOOP
    imgURI 
        ? render(imgURI, options, cb)
        : cb('Running error, Please give a correct image url !', 'fail')
    return this
}
