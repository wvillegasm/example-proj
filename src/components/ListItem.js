import React from 'react'
import createClass from 'create-react-class'

const ListItem = createClass({
  render() {
    return (
      <li>
        <h4>{this.props.ingredient}</h4>
      </li>
    )
  },
})

export default ListItem
