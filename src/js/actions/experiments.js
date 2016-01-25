import { putRecord, getRecord, deleteRecord, getAllRecords } from '../helpers/fetchTodos'

/*
 * action types
 */
import {
  REQUEST_EXPERIMENTS,
  RECEIVE_EXPERIMENTS,
  INVALIDATE_EXPERIMENTS,
  EXPERIMENTS_FAIL,
  ADD_EXPERIMENT,
  UPDATE_EXPERIMENT,
  DELETE_EXPERIMENT,
  SET_EXPERIMENTS_VISIBILITY_FILTER,
} from '../constants/experiments'

/*
 * action creators
 */
function requestTodos() {
  return {
    type: REQUEST_EXPERIMENTS
  }
}

function createTodo(todo) {
  return {
    type: ADD_EXPERIMENT,
    todo: todo
  }
}

function updateTodo(todo, id) {
  return {
    type: UPDATE_EXPERIMENT,
    todo: todo,
    receivedAt: Date.now()
  }
}

function receiveTodos(todos) {
  return {
    type: RECEIVE_EXPERIMENTS,
    items: todos
  }
}

function notifyDeleteTodo(id) {
  return {
    type: DELETE_EXPERIMENT,
    id: id
  }
}

export function setVisibilityFilter(filter) {
  return { type: SET_EXPERIMENT_VISIBILITY_FILTER, filter }
}

export function invalidateTodos() {
  return {
    type: INVALIDATE_EXPERIMENTS
  }
}

export function addTodo(text) {
  return (dispatch) => {
    let todo = {
      text,
      completed: false,
      beeingProcessed: true,
    };

    dispatch(createTodo(todo, null));

    return dispatch(serverSyncTodo(todo, null))
  }
}

function serverSyncTodo(data, id) {
  return dispatch => {
    return putRecord(data, id)
      .then((response) => {
        let todo = response.data;
        dispatch(updateTodo(todo, todo.id))
      })
  }
}

function serverDeleteTodo(id) {
  return dispatch => {
    return deleteRecord(id)
      .then(() => dispatch(notifyDeleteTodo(id)))
  }
}

function todosFail(err) {
  return {
    type: TODOS_FAIL,
    error: err
  }
}

export function fetchTodos() {
  return dispatch => {
    dispatch(requestTodos())
    return getAllRecords().then(
      (response) => {
        let todos = response.data;
        dispatch(receiveTodos(todos))
      },
      (err) => {
        let body = err.data;
        dispatch(todosFail(body))
      }
    );
  }
}

function deleteTodo(id) {
  return (dispatch, getState) => {
    let { todos } = getState(),
      rawTodo = todos.items.find(item => item.id === id),
      todo = Object.assign({}, rawTodo, {
        beeingProcessed: true,
      });

    dispatch(updateTodo(todo, id))

    return dispatch(serverDeleteTodo(id))
  }
}

export function safeDeleteTodo(id) {
  return (dispatch, getState) => {
    let { todos: { items } } = getState(),
      targetTodo = items.find(todo => todo.id === id);

    if (!targetTodo.beeingProcessed) {
      return dispatch(deleteTodo(id))
    }
  }
}

export function safeUpdateTodo(id, data) {
  return (dispatch, getState) => {
    if (data.isEditing) {
      return dispatch(updateTodo(data, id))
    }

    let { todos: { items } } = getState(),
      targetTodo = items.find(todo => todo.id === id);

    if (!targetTodo.beeingProcessed) {
      let todo = Object.assign({}, targetTodo, data, {
        beeingProcessed: true,
      });

      dispatch(updateTodo(todo, id))

      return dispatch(serverSyncTodo(todo, id))
    }
  }
}