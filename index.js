var multistream = require('multistream');
var streamArray = require('stream-array');
var isStream = require('isstream');

function combineArgs(args) {
    args = Array.prototype.slice.call(args);
    var result = [];
    var lastArray = null;

    for (var i = 0; i < args.length; i++) {
        var argument = args[i];

        if (typeof argument === 'function') {
            throw new Error('Functions are not supported yet!');
        }

        if (Array.isArray(argument)) {
            if (!lastArray) {
                lastArray = argument;
            } else {
                lastArray = lastArray.concat(argument);
            }
            continue;
        }

        if (isStream(argument)) {
            if (lastArray) {
                result.push(streamArray(lastArray));
                lastArray = null;
            }
            result.push(argument);
            continue;
        }

        if (lastArray) {
            lastArray.push(argument);
        } else {
            lastArray = [argument];
        }
    }

    if (lastArray) {
        result.push(streamArray(lastArray));
    }

    return result;
}

var Glue = function () {
    var args = combineArgs(arguments);
    return multistream(args, Glue.options);
};

Glue.obj = function () {
    var args = combineArgs(arguments);
    return multistream(args, {
        objectMode: true,
        highWaterMark: Glue.options.highWaterMark
    });
};

Glue.options = {
    objectMode: false,
    highWaterMark: 16
};

module.exports = Glue;
