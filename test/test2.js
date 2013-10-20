var imaging = require('../imaging.js');
imaging.draw('../res/image/3.png' , {width:40/*, char: '#'*/, left: 20}, function (resp) {
    console.log(resp);
});
