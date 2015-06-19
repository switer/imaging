'use strict';

var output = ''
/**
 *  Mode:
 *  	sync 	log when write
 *  	async 	log when flush
 *  	file 	write file when flush, TBD
 */
var mode = 'sync'
module.exports = {
	mode: function (m) {
		mode = m
	},
	write: function (str) {
		if (mode == 'sync') console.log(str)
		else output += str + '\n'
	},
	flush: function () {
		if (!output) return
		console.log(output)
		output = ''
	}
}