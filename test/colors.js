/*
    ▁▂▃▄▅▆▇█▉▊▋▌▍▎▏■
*/
var color = require('colors')
var fs = require('fs')
var pix = '▇'

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
/* 0,128,128   128,0,0*/
console.log(repeat(pix, 39).cyan + '\n' + repeat(pix, 39).red);
/* 128,0,128  192,192,192*/
console.log(repeat(pix, 39).magenta + '\n' + repeat(pix, 39).white);
/* 128,128,128  192,192,192*/
console.log(repeat(pix, 39).grey + '\n' + repeat(pix, 39).zebra);
/* 0,0,255   0,255,0 */
console.log(repeat(pix, 39)['blue'].grey + '\n' + repeat(pix, 39).green.grey);
/* 128,128,128  255,255,0 */
console.log(repeat(pix, 39).black.grey + '\n' + repeat(pix, 39).yellow.grey);
/* 0,255,255   255,0,0*/
console.log(repeat(pix, 39).cyan.grey + '\n' + repeat(pix, 39).red.grey);
/* 255,0,255  255,255,255*/
console.log(repeat(pix, 39).magenta.grey + '\n' + repeat(pix, 39).white.grey);
/* 128,128,128  128,128,128*/
console.log(repeat(pix, 39).grey.grey + '\n' + repeat(pix, 39).zebra.grey);
/* 0,0,255   0,255,0 */
console.log(repeat(pix, 39).blue.cyan);