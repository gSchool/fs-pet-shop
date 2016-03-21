'use strict';

var fs = require('fs');
var path = require('path');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process[2];

if (!cmd) {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
