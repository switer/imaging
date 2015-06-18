'use strict';

var imaging = require('../index.js');
imaging.draw('../res/i.png', {width: 70}, function (resp, status) {
    console.log(status);
    console.log(resp);
});