/* global describe, it */

var glue = require('../');
var assert = require('stream-assert');
var array = require('stream-array');
require('should');

describe('glue', function () {
    it('should join buffer chunks', function (done) {
        glue('A', 'B')
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should throw, when getting functions', function () {
        (function () {
            glue.obj(function () { });
        }).should.throw();
    });

    it('should glue objects into array stream', function (done) {
        glue.obj({}, {})
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should glue array with object', function (done) {
        glue.obj([{}], {})
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should glue object with array', function (done) {
        glue.obj({}, [{}])
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should glue stream with object', function (done) {
        glue.obj(array([{}]), {})
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should glue stream with array', function (done) {
        glue.obj(array([{}]), [{}])
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should glue array with stream', function (done) {
        glue.obj([{}], array([{}]))
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should glue object with stream', function (done) {
        glue.obj({}, array([{}]))
            .pipe(assert.length(2))
            .on('end', done);
    });

    it('should glue stream with stream', function (done) {
        glue.obj(array([{}]), array([{}]))
            .pipe(assert.length(2))
            .on('end', done);
    });
});
