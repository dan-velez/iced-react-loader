# Installation
```
npm i iced-react-loader
```

# Usage
```javascript
// webpack.config.js
module.exports = {
  loaders: {
    test: /.iced$/,
    loader: "icedReactLoader"
  }
};
```

# Iced-React
This loader will allow you to use a twice pre compiled dialect of CoffeeScript.
The first compilation step parses any JSX syntax in a CoffeeScript file and produces
a CoffeeScript equivilant of standard React vanilla JS code. For example,
```coffeescript
App = (props)->
  <div>
  { props.children }
  </div>
```

becomes
```coffeescript
  App = (props)->
    React.createElement("div", null, ( props.children ))
```
The next compilation step is to take the CoffeeScript code and feed it to IcedCoffeeScript, which in the last example would produce:
```javascript
(function() {
  var App;

  App = function(props) {
    return React.createElement("div", null, props.children);
  };

}).call(this);
```
IcedCoffeeScript allows the source code to contain await and defer statements, such as:
```coffeescript
longUiProcess = (jsx, callb)->
  component = []
  await api.call 'users', defer users
  for user in users
    component.push <div>{user.name}</div>
  [jsx].concat component
  
 await longUiProcess <div className='root'></div>, defer component
 
```
becomes:
```javascript
(function() {
  var iced, longUiProcess, __iced_k, __iced_k_noop;

  iced = require('iced-runtime');
  __iced_k = __iced_k_noop = function() {};

  longUiProcess = function(jsx, callb) {
    var component, user, users, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    component = [];
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral
        });
        api.call('users', __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return users = arguments[0];
            };
          })(),
          lineno: 3
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        var _i, _len;
        for (_i = 0, _len = users.length; _i < _len; _i++) {
          user = users[_i];
          component.push(React.createElement("div", null, user.name));
          [jsx].concat(component);
        }
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral
        });
        longUiProcess(React.createElement("div", {
          "className": 'root'
        }), __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return component = arguments[0];
            };
          })(),
          lineno: 7
        }));
        __iced_deferrals._fulfill();
      };
    })(this));
  };

}).call(this);
```
