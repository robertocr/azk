"use strict";
var __moduleName = "src/cli/ui";
var $__12 = require('azk'),
    _ = $__12._,
    t = $__12.t;
var Multibar = require('azk/cli/multi_bars').Multibar;
require('colors');
var execSh = require('exec-sh');
var Table = require('cli-table');
var printf = require('printf');
var ok = 'azk'.green;
var fail = 'azk'.red;
var warning = 'azk'.yellow;
var mbars = [];
var tables = {};
var UI = {
  isUI: true,
  dir: function() {
    var $__13;
    for (var args = [],
        $__2 = 0; $__2 < arguments.length; $__2++)
      args[$__2] = arguments[$__2];
    ($__13 = console).dir.apply($__13, $traceurRuntime.toObject(args));
  },
  output: function(string) {
    for (var args = [],
        $__3 = 1; $__3 < arguments.length; $__3++)
      args[$__3 - 1] = arguments[$__3];
    this.stdout().write(printf.apply(null, $traceurRuntime.spread([string || ""], args)) + "\n");
  },
  tOutput: function() {
    for (var args = [],
        $__4 = 0; $__4 < arguments.length; $__4++)
      args[$__4] = arguments[$__4];
    this.stdout().write(t.apply(null, $traceurRuntime.toObject(args)) + "\n");
  },
  outputWithLabel: function(rows) {
    var ident = arguments[1] !== (void 0) ? arguments[1] : '';
    var $__0 = this;
    rows = _.map(rows, (function(row) {
      return _.isArray(row) ? row : row.split('\t');
    }));
    var size = _.reduce(rows, (function(acc, row) {
      return acc > row[0].length ? acc : row[0].length;
    }), 0);
    _.each(rows, (function(row) {
      var $__13;
      ($__13 = $__0).output.apply($__13, $traceurRuntime.spread(["%s%-*s  %s", ident, row.shift(), size], row));
    }));
  },
  ok: function() {
    for (var args = [],
        $__5 = 0; $__5 < arguments.length; $__5++)
      args[$__5] = arguments[$__5];
    this.output(ok + ": " + t.apply(null, $traceurRuntime.toObject(args)));
  },
  fail: function() {
    for (var args = [],
        $__6 = 0; $__6 < arguments.length; $__6++)
      args[$__6] = arguments[$__6];
    this.output(fail + ": " + t.apply(null, $traceurRuntime.toObject(args)));
  },
  warning: function() {
    for (var args = [],
        $__7 = 0; $__7 < arguments.length; $__7++)
      args[$__7] = arguments[$__7];
    this.output(warning + ": " + t.apply(null, $traceurRuntime.toObject(args)));
  },
  exit: function() {
    var code = arguments[0] !== (void 0) ? arguments[0] : 0;
    setTimeout((function() {
      process.emit("azk:command:exit", code);
    }), 500);
  },
  newMultiBars: function() {
    mbars.push(new Multibar());
    return mbars.length - 1;
  },
  newBar: function(mbar) {
    var $__13;
    for (var args = [],
        $__8 = 1; $__8 < arguments.length; $__8++)
      args[$__8 - 1] = arguments[$__8];
    return ($__13 = mbars[mbar]).newBar.apply($__13, $traceurRuntime.toObject(args));
  },
  stdout: function() {
    return process.stdout;
  },
  stderr: function() {
    return process.stderr;
  },
  stdin: function() {
    return process.stdin;
  },
  table_add: function(name, options) {
    tables[name] = new Table(options);
    return name;
  },
  table_push: function(name) {
    var $__13;
    for (var args = [],
        $__9 = 1; $__9 < arguments.length; $__9++)
      args[$__9 - 1] = arguments[$__9];
    ($__13 = tables[name]).push.apply($__13, $traceurRuntime.toObject(args));
  },
  table_show: function(name) {
    this.output(tables[name].toString());
  },
  execSh: function() {
    for (var args = [],
        $__10 = 0; $__10 < arguments.length; $__10++)
      args[$__10] = arguments[$__10];
    execSh.apply(null, $traceurRuntime.toObject(args));
  }
};
;
var UIProxy = function UIProxy(ui) {
  if (ui.isUI) {
    this.__user_interface = ui;
  } else {
    this.parent = ui;
  }
};
($traceurRuntime.createClass)(UIProxy, {
  set userInterface(ui) {
    this.__user_interface = ui;
  },
  get userInterface() {
    return this.parent ? this.parent.userInterface : this.__user_interface;
  }
}, {});
_.each(_.methods(UI), (function(method) {
  UIProxy.prototype[method] = function() {
    var $__13;
    for (var args = [],
        $__11 = 0; $__11 < arguments.length; $__11++)
      args[$__11] = arguments[$__11];
    return ($__13 = this.userInterface)[method].apply($__13, $traceurRuntime.toObject(args));
  };
}));
module.exports = {
  get UI() {
    return UI;
  },
  get UIProxy() {
    return UIProxy;
  },
  __esModule: true
};
//# sourceMappingURL=ui.js.map