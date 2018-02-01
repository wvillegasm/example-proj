import dispatcher from '../dispatcher'

export function createTodo(newItem) {
  dispatcher.dispatch({
    type: 'CREATE_TODO',
    newItem,
  })
}

export function deleteTodo(id) {
  dispatcher.dispatch({
    type: 'DELETE_TODO_BY_ID',
    id,
  })
}

export function reloadTodos() {
  dispatcher.dispatch({ type: 'FETCH_TODOS' })
  setTimeout(() => {
    dispatcher.dispatch({
      type: 'RELOAD_TODOS',
      todos: [
        {
          id: '56a4swa985',
          text: 'Demo 1 3',
        },
        {
          id: '56a4sea78',
          text: 'Demo 2 9',
        },
      ],
    })
    dispatcher.dispatch({
      type: 'LOAD_FINISHED',
    })
  }, 50)
}
