define(function(require, exports) {

exports(hello, bye);

function hello(name) {
  return "Hello " + name + "!";
}

function bye(name) {
  return "Auf Wiedersehen " + name + "!";
}

});