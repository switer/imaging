'use strict';

var path = require('path')
var imaging = require('../index.js');

imaging.draw(path.join(__dirname, '../res/i.png'), {width: 70, char: 'random'}, function (resp, status) {
    console.log(status);
    console.log(resp);
});