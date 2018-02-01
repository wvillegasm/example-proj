import React from 'react'
import createClass from 'create-react-class'
import ListItem from './ListItem'

const List = createClass({
  render() {
    const listItems = this.props.items.map(item => (
      <ListItem key={item.id} ingredient={item.text} />
    ))

    return (<ul>{listItems}</ul>)
  },
})

module.exports = List
