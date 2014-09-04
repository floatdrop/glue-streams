# glue-streams

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

Compose one stream from other streams, arrays or individual objects.

Based on [`multistream`](https://github.com/feross/multistream) :cat:

## Usage

```js
var glue = require('glue-streams');
var stream = require('stream-array');

glue.options = {
    objectMode: false,
    highWaterMark: 16
};

var glued = glue.obj(
    [1,2,3],
    4,
    stream([5,6,7])
);
glued.pipe(process.stdout);

/* Output:
1234567
*/
```

## API

### glue(streams...)

Returns stream that will emit objects from passed streams.

`streams` could be:

 * Readable stream object
 * Ordinary object
 * Array of objects / streams
 * Functions, that will be executed, when all streams before is ended. Returned object will be streamed by previous rules.

### glue.obj(streams...)

Creating object stream (overrides `glue.options.objectMode` to true).

### glue.options

Object, that contains options, which will be used for every call to `glue(...)` or `glue.obj(...)`.

#### objectMode
Type: `Boolean`  
Default: `false`

#### highWaterMark
Type: `Number`  
Default: `16`  

## License

MIT (c) 2014 Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/glue-streams
[npm-image]: http://img.shields.io/npm/v/glue-streams.svg?style=flat

[travis-url]: http://travis-ci.org/floatdrop/glue-streams
[travis-image]: http://img.shields.io/travis/floatdrop/glue-streams.svg?branch=master&style=flat

[depstat-url]: https://david-dm.org/floatdrop/glue-streams
[depstat-image]: http://img.shields.io/david/floatdrop/glue-streams.svg?style=flat
