var browsers, options, phantom_bin, testacular, exec = require('child_process').exec;
phantom_bin = "PHANTOMJS_BIN=" + __dirname + "/node_modules/phantomjs/lib/phantom/bin/phantomjs";
testacular = "" + __dirname + "/node_modules/testacular/bin/testacular";
browsers = process.env.TRAVIS ? 'PhantomJS' : 'PhantomJS,Chrome';
options = "--browsers=" + browsers;
console.log(phantom_bin + " " + testacular + " start " + __dirname + "/test/testacular.conf.js " + options);
return exec(phantom_bin + " " + testacular + " start " + __dirname + "/test/testacular.conf.js " + options, function(err, stdout, stderr) {
  if (err) {
    console.error(err);
  }
  return console.log(stdout);
});