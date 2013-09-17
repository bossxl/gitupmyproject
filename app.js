var fs = require("fs");
var spawn = require('child_process').spawn,
runningChildren = 0;
var excludeDirs = [];
loadConfig();
fs.readdir(__dirname,function(err,files){
	files.forEach(function(fileName){
    if(excludeDirs.indexOf(fileName) === -1){
  		fs.stat(__dirname + "/" + fileName, function(err, stat){
  			if(stat.isDirectory()){
  				gitUp(__dirname + "/" + fileName);
  			}
  		});
    }
	});
});
function loadConfig(){
  try {
    var config = JSON.parse(fs.readFileSync(__dirname + "/repo.conf.json"));
      excludeDirs = excludeDirs.concat(config.excludeDirs);
      console.log("Exclude the following directories:\n" , excludeDirs.join(", "));
  } catch (e){
    console.log("Could not load config");
  }
}
function gitUp(dirname){
	runningChildren++;
	process.chdir(dirname);
	var dataOut = '';
	var git = spawn('git', ['up']);
	git.stdout.on('data', function (data) {
		dataOut += data;
	});
	git.stderr.on('data', function (data) {
		dataOut += data;
	});
	git.on('close', function (code) {
		runningChildren--;
		printAlert(dirname + "\n" + dataOut + "\n" + 'child process exited with code ' + code);
  		if(runningChildren === 0){
			process.exit()
		}		
	});
}
function printAlert(msg) {
    var msgArray = msg.split("\n");
    var maxLength = 0;
    for(var i = msgArray.length - 1; i >= 0; i--) {
      var currLn = msgArray[i];
      if((currLn.length * 2) > maxLength) {
        maxLength = Math.round(currLn.length * 1.25);
      }
    }
    var string = "";
    maxLength += (maxLength % 2 === 0) ? 0 : 1;
    string += "+" + Array(maxLength - 1).join("-") + "+";
    for(var i = 0; i < msgArray.length; i++) {
      var ln = msgArray[i];
      var leftOver = maxLength - ln.length - 2;
      var left = Math.round(leftOver / 2);
      var right = left;
      if(left + right + ln.length != maxLength) {
        right += (maxLength - (left + right + ln.length));
      }
      ln = Array(left).join(" ") + ln + Array(right).join(" ");
      string += "\n|" + ln + "|";
    }
    string += "\n+" + Array(maxLength - 1).join("-") + "+";
    console.log(string);
  }