import _ from 'lodash/fp/object'

// Actions
export const LOGIN = 'negebauer/user/LOGIN'
export const LOGIN_PENDING = LOGIN + '_PENDING'
export const LOGIN_FULFILLED = LOGIN + '_FULFILLED'
export const LOGIN_REJECTED = LOGIN + '_REJECTED'
export const SAVE_USER = 'negebauer/user/SAVE_USER'

// Initial state
const initialState = {
  mail: '',
  password: '',
  api_key: '',
  error: undefined,
}

// Reducer
export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SAVE_USER: {
      return _.merge(state, payload)
    }
    case LOGIN_FULFILLED: {
      return _.merge(state, payload)
    }
    default: {
      return state
    }
  }
}

// Action creators
export const login = ({ mail, password }) => (dispatch, getState, { api }) =>
  dispatch({
    type: LOGIN,
    payload: api.login({ mail, password }),
  })


export const saveUser = ({ mail, password }) => dispatch => dispatch({ type: SAVE_USER, payload: { mail, password } })