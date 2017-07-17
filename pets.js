'use strict';

const fs = require('fs');
const path = require('path');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];



console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
process.exit(1);
