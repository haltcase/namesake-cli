#!/usr/bin/env node
'use strict'

if (process.platform === 'win32') {
  process.exit(0)
}

const execa = require('execa')

try { execa.shellSync('chmod +x bin/index.js') }
catch (e) { console.error(e.stack) }
finally { process.exit(0) }
