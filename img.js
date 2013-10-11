/*
    ▁▂▃▄▅▆▇█▉▊▋▌▍▎▏■
*/
var color = require('colors'),
    fs = require('fs'),
    pix = '▇';

function repeat (str, times) {
    var index = 0,
        ctn = '';
    while(index < times) {
        ctn += str;
        index ++;
    }
    return ctn;
}
/* 0,0,128   0,128,0 */
console.log(repeat(pix, 39)['blue'] + '\n' + repeat(pix, 39).green);
/* 0,0,0  128,128,0 */
console.log(repeat(pix, 39).black + '\n' + repeat(pix, 39).yellow);
/* 0,128,128 128,0,0*/
console.log(repeat(pix, 39).cyan + '\n' + repeat(pix, 39).red);
/* 128,0,128  192,192,192*/
console.log(repeat(pix, 39).magenta + '\n' + repeat(pix, 39).white);
/* 128,128,128  192,192,192*/
console.log(repeat(pix, 39).grey + '\n' + repeat(pix, 39).zebra);
fs.writeFileSync('pix.txt', repeat(pix, 39).blue, 'UTF-8')