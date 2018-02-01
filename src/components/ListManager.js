import createClass from 'create-react-class'
import React from 'react'
import uuidv1 from 'uuid/v1'

import List from './List'
import TodoStore from '../store/TodoStore'
import * as TodoAction from '../actions/TodoAction'

const ListManager = createClass({
  getInitialState() {
    return {
      items: TodoStore.getAll(),
      newItemText: '',
      loading: true,
    }
  },
  onRecipeFormSubmit(e) {
    e.preventDefault()
    const newItem = {
      id: uuidv1(),
      text: this.state.newItemText,
    }
    TodoAction.createTodo(newItem)
    this.setState({
      newItemText: '',
    })
  },
  onTaskChange(e) {
    e.preventDefault()
    this.setState({
      newItemText: e.target.value,
    })
  },

  reloadTodos(e) {
    e.preventDefault()
    TodoAction.reloadTodos()
  },

  componentWillMount() {
    TodoStore.on('change', this.getTodos)
    console.log('count: ', TodoStore.listenerCount('change'))
  },

  getTodos() {
    this.setState({
      items: TodoStore.getAll(),
      loading: TodoStore.isLoading(),
    })
  },

  componentDidMount() {
    setTimeout(() => {
      console.log(TodoStore.isLoading())
      this.setState({
        loading: false,
      })
    }, 100)
  },

  componentWillUnmount() {
    TodoStore.removeListener('change', this.getTodos)
  },

  render() {
    return (this.state.loading)
      ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <h3>{this.props.title}</h3>
          <form action="/" onSubmit={this.onRecipeFormSubmit}>
            <input
              type="text"
              onChange={this.onTaskChange}
              value={this.state.newItemText}
            />
            <button>Add</button>
            <button onClick={this.reloadTodos}>Reload</button>
          </form>
          <List items={this.state.items} />
        </div>
      )
  },
})

module.exports = ListManager
