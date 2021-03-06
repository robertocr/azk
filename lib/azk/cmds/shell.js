"use strict";
var __moduleName = "src/cmds/shell";
var $__1 = require('azk'),
    _ = $__1._,
    path = $__1.path,
    config = $__1.config,
    t = $__1.t,
    async = $__1.async;
var $__1 = require('azk/cli/command'),
    Command = $__1.Command,
    Helpers = $__1.Helpers;
var Manifest = require('azk/manifest').Manifest;
var docker = require('azk/docker').default;
var Cmd = function Cmd() {
  $traceurRuntime.defaultSuperCall(this, $Cmd.prototype, arguments);
};
var $Cmd = Cmd;
($traceurRuntime.createClass)(Cmd, {
  action: function(opts, extras) {
    var progress = Helpers.newPullProgress(this);
    return async(this, function() {
      var cmd,
          dir,
          env,
          manifest,
          system,
          tty_default,
          tty,
          options,
          $__2,
          $__3,
          $__4;
      return $traceurRuntime.generatorWrap(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              cmd = $traceurRuntime.spread([opts.cmd], opts.__leftover);
              dir = this.cwd;
              env = {};
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = 2;
              return Helpers.requireAgent();
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            case 4:
              if (opts.image) {
                manifest = Manifest.makeFake(dir, opts.image);
                system = manifest.systemDefault;
              } else {
                manifest = new Manifest(dir, true);
                system = manifest.systemDefault;
                if (opts.system)
                  system = manifest.system(opts.system, true);
              }
              tty_default = opts.t || !_.isString(opts.command);
              tty = (opts.T) ? (opts.t || false) : tty_default;
              options = {
                interactive: tty,
                pull: this.stdout(),
                stdout: this.stdout(),
                stderr: this.stderr(),
                stdin: this.stdin(),
                workdir: opts.cwd || null
              };
              options.envs = this._parse_option(opts.env, /.*=.*/, '=', 'invalid_env');
              options.volumes = this._parse_option(opts.mount, /.*=.*/, '=', 'invalid_mount');
              cmd = [opts.shell || system.shell];
              if (opts.command) {
                cmd.push("-c");
                cmd.push(opts.command);
              }
              options.remove == opts.remove;
              $ctx.state = 16;
              break;
            case 16:
              $__2 = system.runShell;
              $__3 = $__2.call(system, cmd, options);
              $ctx.state = 10;
              break;
            case 10:
              $ctx.state = 6;
              return $__3;
            case 6:
              $__4 = $ctx.sent;
              $ctx.state = 8;
              break;
            case 8:
              $ctx.returnValue = $__4;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, this);
    }).progress(progress);
  },
  _parse_option: function(option, regex, split, fail) {
    var result = {};
    for (var j = 0; j < option.length; j++) {
      var opt = option[j];
      if (opt.match(regex)) {
        opt = opt.split('=');
        result[opt[0]] = opt[1];
      } else {
        this.fail('commands.shell.' + fail, {opt: opt});
        return 1;
      }
    }
    return result;
  }
}, {}, Command);
function init(cli) {
  (new Cmd('shell [system]', cli)).addOption(['-T']).addOption(['-t']).addOption(['--rm', '-r'], {default: true}).addOption(['--image', '-i'], {type: String}).addOption(['--command', '-c'], {type: String}).addOption(['--shell'], {type: String}).addOption(['--cwd', '-C'], {type: String}).addOption(['--mount', '-m'], {
    type: String,
    acc: true,
    default: []
  }).addOption(['--env', '-e'], {
    type: String,
    acc: true,
    default: []
  }).addOption(['--verbose', '-v']).addExamples(t("commands.shell.examples"));
}
module.exports = {
  get init() {
    return init;
  },
  __esModule: true
};
//# sourceMappingURL=shell.js.map