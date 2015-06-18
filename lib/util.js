'use strict';

module.exports = {
	absoluteURI: function fixedImageUrl(url) {
	    if (url.match(/http[s]*\:\/\//)) return url;
	    else if (url.match(/[a-zA-Z]\:/) || url.match(/^\//)) return url;
	    else return process.cwd().replace('/$','') + '/' + url;
	}
}