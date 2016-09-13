'use strict';
var dconf = require('./config');
var ejs = require('ejs');

module.exports = {
  init: function (config, job, context, done) {
    var config = config || {};

    done(null, {
      environment: shellCommand(config.environment, config.shell, job),
      prepare: prepareCmd(config, job),
      test: testCmd(config, job),
      deploy: shellCommand(config.deploy, config.shell, job),
      cleanup: cleanupCmd(config, job)
    });
  }
};


function prepareCmd(config, job) {
  var cmd = (config.useuscan ? 'uscan --force-download && ':'');

  // by default, 64b is the preferred arch
  if(config.arch === 'all') {
    cmd += 'pdebuild -- --basetgz /var/lib/strider/chroot/' + dconf.chroots.amd64;
  } else if(config.arch === 'any') {
    cmd += 'pdebuild -- --basetgz /var/lib/strider/chroot/' + dconf.chroots.amd64;
    cmd += ' && pdebuild -- --basetgz -b /var/lib/strider/chroot/' + dconf.chroots.i386;
  }

  return shellCommand(cmd, config.shell, job);
}

function testCmd(config, job) {
  if(config.usepiuparts) {
    var cmd = '';
    var cmd_get_pkg_filename = '$('+dconf.chroots.get_pkg_filename+' `pwd`)';
    cmd += 'sudo piuparts -d stable /var/lib/strider/chroot/result/'+cmd_get_pkg_filename;

    return shellCommand(cmd, config.shell, job);
  }
}

function cleanupCmd(config, job) {
  var cmd = '';
  cmd += __dirname + '/scripts/report';
  return shellCommand(cmd, config.shell, job);
}

function shellCommand(command, shell, job) {
  if (!command) {
    return;
  }

  var normalizedCommand = command.split('\n').reduce(function (lines, line) {
    line = line.replace(/^\s*#.*$/, '').trim();
    if (line.length) lines.push(line);
    return lines;
  }, []).join('\n');

  if (!normalizedCommand.length) {
    return;
  }

  var commandToExecute = compileScript(job, normalizedCommand);

  return {
    command: 'sh',
    args: ['-e', '-x', '-c', commandToExecute]
  };
}

var compileScript = function(job, shellScript) {
  var compiled = ejs.compile(shellScript,'utf-8');
  var compiledScript = compiled(job);

  return compiledScript;
};
