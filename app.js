#! /usr/bin/env node
var fs = require("fs");
var path = require("path");
var spawn = require('child_process').spawn,
runningChildren = 0;

QuickConnect = require('qcnode').QuickConnect
var qc = new QuickConnect
var argv = require('optimist')
  .usage('Run git up on a directory')
  .alias('c', 'config')
  .default('c', process.cwd() + "/repo.config.json")
  .describe('c', 'File path to a config file')
  .argv
// var excludeDirs = [];
// var cwd = process.cwd();
// loadConfig();
// fs.readdir(cwd,function(err,files){
// 	files.forEach(function(fileName){
//     if(excludeDirs.indexOf(fileName) === -1){
//   		fs.stat(cwd + "/" + fileName, function(err, stat){
//   			if(stat.isDirectory()){
//   				gitUp(cwd + "/" + fileName);
//   			}
//   		});
//     }
// 	});
// });
// function loadConfig(){
//   try {
//     var config = JSON.parse(fs.readFileSync(path.normalize(process.env.HOME + "/repo.conf.json")));
//     excludeDirs = excludeDirs.concat(config.excludeDirs);
//     console.log("Exclude the following directories:\n" , excludeDirs.join(", "));
//     return;
//   } catch (e){
//     console.log("- Could not load config from home");
//   }
//   try {
//     var config = JSON.parse(fs.readFileSync(path.normalize(process.cwd() + "/repo.conf.json")));
//     excludeDirs = excludeDirs.concat(config.excludeDirs);
//     console.log("Exclude the following directories:\n" , excludeDirs.join(", "));
//     return;
//   } catch (e){
//     console.log("- Could not load config from " + process.cwd());
//     console.log("- Please create a file called repo.conf.json either here OR in home");
//     console.log("- It should look like:");
//     console.log(JSON.stringify({ excludeDirs : [ "somefoldername"]}, undefined, 2));
//   }

// }
// function gitUp(dirname){
// 	runningChildren++;
// 	process.chdir(dirname);
// 	var dataOut = '';
// 	var git = spawn('git', ['up']);
// 	git.stdout.on('data', function (data) {
// 		dataOut += data;
// 	});
// 	git.stderr.on('data', function (data) {
// 		dataOut += data;
// 	});
// 	git.on('close', function (code) {
// 		runningChildren--;
// 		printAlert(dirname + "\n" + dataOut + "\n" + 'child process exited with code ' + code);
//   		if(runningChildren === 0){
// 			process.exit()
// 		}		
// 	});
// }
// function printAlert(msg) {
//     var msgArray = msg.split("\n");
//     var maxLength = 0;
//     for(var i = msgArray.length - 1; i >= 0; i--) {
//       var currLn = msgArray[i];
//       if((currLn.length * 2) > maxLength) {
//         maxLength = Math.round(currLn.length * 1.25);
//       }
//     }
//     var string = "";
//     maxLength += (maxLength % 2 === 0) ? 0 : 1;
//     string += "+" + Array(maxLength - 1).join("-") + "+";
//     for(var i = 0; i < msgArray.length; i++) {
//       var ln = msgArray[i];
//       var leftOver = maxLength - ln.length - 2;
//       var left = Math.round(leftOver / 2);
//       var right = left;
//       if(left + right + ln.length != maxLength) {
//         right += (maxLength - (left + right + ln.length));
//       }
//       ln = Array(left).join(" ") + ln + Array(right).join(" ");
//       string += "\n|" + ln + "|";
//     }
//     string += "\n+" + Array(maxLength - 1).join("-") + "+";
//     console.log(string);
//   }
qc.command('main')
  .valcf(function(data, qc){
    console.log(data);
    try {
      var stats = fs.lstatSync(path.dirname(data.c));
      if(stats.isDirectory()){
        data.main = data.c;
      } else {
        data.main = [process.cwd(),process.env.HOME];
      }
    } catch (e){
      data.main = [process.cwd(),process.env.HOME];
    }
    return qc.STACK_CONTINUE;
  })
  .valcf(function(data, qc){
    if(typeof data.main.length !== "undefined" && typeof data.main.push === "function"){
      console.log(data.main);
      for (var i = 0; i < data.main.length; i++) {
        var file = data.main[i] + "/repo.config.json";
        try {
          var stats = fs.lstatSync(file);
          if(stats.isFile()){
            data.main = file;
            return qc.STACK_CONTINUE;
          } 
        } catch (e){

        }
      };
    } else {
      try {
        var stats = fs.lstatSync(data.main);
        if(stats.isFile()){
          return qc.STACK_CONTINUE;
        } 
      } catch (e){

      } 
    }
    console.log("Failed to find file");
    qc.STACK_EXIT;
  })
  .dcf(function(data, qc){
      // retrieve config file
  })
  .dcf(function(data, qc){
      // gather directories
  })
  .dcf(function(data, qc){
     // run git up
     // Go to git up stack
  })
  .dcf(function(data, qc){
      // clean output
  })
  .vcf(function(data, qc){
      // terminate
  })
qc.command('gitup')
  .valcf(function(data, qc){
    console.log(data);
    // Check for dir   
  })
  .valcf(function(data, qc){
    console.log(data);
    // Check for file   
  })
  .dcf(function(data, qc){
      // retrieve config file
  })
  .dcf(function(data, qc){
      // gather directories
  })
  .dcf(function(data, qc){
     // run git up
     // Go to git up stack
  })
  .dcf(function(data, qc){
      // clean output
  })
  .vcf(function(data, qc){
      // terminate
  })
qc.command('print')
  .valcf(function(data, qc){
    console.log(data);
    // Check for dir   
  })
  .valcf(function(data, qc){
    console.log(data);
    // Check for file   
  })
  .dcf(function(data, qc){
      // retrieve config file
  })
  .dcf(function(data, qc){
      // gather directories
  })
  .dcf(function(data, qc){
     // run git up
     // Go to git up stack
  })
  .dcf(function(data, qc){
      // clean output
  })
  .vcf(function(data, qc){
      // terminate
  })
var stack = qc.handleRequest('main', argv)