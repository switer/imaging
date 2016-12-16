'use strict';

var path = require('path')
var imaging = require('../index.js');
var assert = require('assert')

describe('#API Methods', function () {
    it('Load local file', function (done) {
        this.timeout(5000)
        imaging.draw(path.join(__dirname, '../res/i.png'), {left: 10}, function (resp, status) {
            assert.equal(status, 'success')
            console.log(resp)
            done()
        });
    })
    it('Load remote resource', function (done) {
        this.timeout(8000, 'Load resource timeout.')
        imaging.draw('http://phantomjs.org/img/phantomjs-logo.png', {width: 60, left: 10}, function (resp, status) {
            assert.equal(status, 'success')
            console.log(resp)
            done()
        });
    })
})
