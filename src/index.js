const React = require('react')
const ReactDOM = require('react-dom')
const ListManager = require('./components/ListManager')

ReactDOM.render(
  <div>
    <ListManager title="Specials" />
  </div>,
  document.getElementById('ingredients'),
)
