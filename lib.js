var cjsx = require('coffee-react-transform');
var iced = require('iced-coffee-script');

function icedReact(source) {
  //this.cacheable();
  var pre = cjsx(source.toString());
  var t = iced.compile(pre);
  //this.callback(null, t);
  return t;
}
module.exports = icedReact;
