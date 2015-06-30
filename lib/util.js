'use strict';

var path = require('path')

module.exports = {
	type: function (r) {
    	return Object.prototype.toString.call(r).match(/\[object ([\w]+)\]/)[1].toLowerCase()
	},
	absoluteURI: function (url) {
	    if (url.startsWith('data:image/')) return url;
	    else if (/^\w+\:\/\//.test(url) || /^\//.test(url) || /^[a-zA-Z]\:/.test(url) ) return url
	    else return path.join(process.cwd(), url)
	}
}
