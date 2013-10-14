var imaging = require('../imaging.js');
imaging.draw('../res/images/10.jpg', function (resp, status) {
    console.log(status);
    console.log(resp);
});
imaging.draw('images/1.jpg', {width:50}, function (resp, status) {
    console.log(status);
    console.log(resp);
});
