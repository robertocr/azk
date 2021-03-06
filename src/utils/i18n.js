var path   = require('path');
var printf = require('printf');

function load(locale) {
  var file = path.join('locales', locale);
  return require(file);
}

export class i18n {
  constructor(opts) {
    if (typeof(opts.dict) == "object") {
      this.dict = opts.dict;
    } else if (opts.locale) {
      this.dict = load(opts.locale);
    }

    // Alias to translate
    this.t = (...args) => {
      return this.translate(...args);
    }
  }

  translate(key, ...args) {
    var keys   = (typeof(key) == "string") ? key.split('.') : key;
    var buffer = this.dict || {};

    for(var i = 0; i < keys.length; i++) {
      buffer = buffer[keys[i]];
      if (!buffer) break;
    }

    if (buffer) {
      return typeof(buffer) == "string" ? printf(buffer, ...args) : buffer;
    } else {
      return (typeof(key) == "string" ? key : key.join("."));
    }
  }
}

