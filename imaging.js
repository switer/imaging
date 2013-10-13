var childProcess = require('child_process'),
    phantomjs = require('phantomjs'),
    binPath = phantomjs.path;

var childArgs = [
  'run.js'
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  if (err ) console.log(err);
  else console.log(stdout);
})