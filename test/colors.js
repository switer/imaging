'use strict';

var color = require('colors')
var fs = require('fs')
var pixels = repeat('▇', 39)

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
console.log(pixels.blue + '\n' + pixels.green);
/* 0,0,0  128,128,0 */
console.log(pixels.black + '\n' + pixels.yellow);
/* 0,128,128   128,0,0*/
console.log(pixels.cyan + '\n' + pixels.red);
/* 128,0,128  192,192,192*/
console.log(pixels.magenta + '\n' + pixels.white);
/* 128,128,128  192,192,192*/
console.log(pixels.grey + '\n' + pixels.zebra);
/* 0,0,255   0,255,0 */
console.log(pixels.blue.grey + '\n' + pixels.green.grey);
/* 128,128,128  255,255,0 */
console.log(pixels.black.grey + '\n' + pixels.yellow.grey);
/* 0,255,255   255,0,0*/
console.log(pixels.cyan.grey + '\n' + pixels.red.grey);
/* 255,0,255  255,255,255*/
console.log(pixels.magenta.grey + '\n' + pixels.white.grey);
/* 128,128,128  128,128,128*/
console.log(pixels.grey.grey + '\n' + pixels.zebra.grey);
/* 0,0,255   0,255,0 */
console.log(pixels.blue.cyan);