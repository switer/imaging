var imaging = require('../imaging.js');

imaging.draw('../res/images/7.png', {width: 70}, function (resp, status) {
    console.log(status);
    console.log(resp);
});