import { EventEmitter } from 'events'

import dispatcher from '../dispatcher'

class TodoStore extends EventEmitter {
  constructor() {
    super()
    this.todos = TodoStore.getInitialTodos()
    this.loading = true
  }

  static getInitialTodos() {
    this.loading = false
    return [
      {
        id: '56a4swa',
        text: 'Demo 1',
      },
      {
        id: '56a4sea',
        text: 'Demo 2',
      },
    ]
  }

  isLoading() {
    return this.loading
  }

  getAll() {
    return this.todos
  }

  createTodo(newItem) {
    this.todos.push(newItem)
    this.emit('change')
  }

  handleActions(action) {
    switch (action.type) {
      case 'CREATE_TODO':
        this.createTodo(action.newItem)
        break
      case 'RELOAD_TODOS':
        this.todos = action.todos
        this.emit('change')
        break
      case 'FETCH_TODOS':
        this.loading = true
        this.emit('change')
        break
      case 'LOAD_FINISHED':
        this.loading = false
        this.emit('change')
        break
      default:
        console.log('None action type')
    }
  }
}

const todoStore = new TodoStore()
dispatcher.register(todoStore.handleActions.bind(todoStore))

window.dispatcher = dispatcher

export default todoStore
