var imaging = require('../imaging.js');
imaging.draw('../res/image/1.png' , {width:40, char: 'M', left: 20}, function (resp) {
    console.log(resp);
});
