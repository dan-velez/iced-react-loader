var icedReact = require('../lib.js');
var prog =` 
longUiProcess = (jsx, callb)->
  component = []
  await api.call 'users', defer users
  for user in users
    component.push <div>{user.name}</div>
    [jsx].concat component
  await longUiProcess <div className='root'></div>, defer component
`
console.log(icedReact('f = ()-> <div></div>\nawait f defer()'))
console.log(icedReact(prog))
