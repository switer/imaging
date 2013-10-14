var imaging = require('imaging');
imaging.draw('images/1.jpg', function (resp) {
    console.log(resp);
});
imaging.draw('images/1.jpg', {width:50}, function (resp) {
    console.log(resp);
});
