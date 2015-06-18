'use strict';

var path = require('path')
var imaging = require('../index.js');

imaging.draw(path.join(__dirname, '../res/i.png'), {width: 70}, function (resp, status) {
    console.log(status);
    console.log(resp);
});