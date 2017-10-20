import { REHYDRATE } from 'redux-persist/constants'
import _ from 'lodash/fp/object'

// Actions
export const LOGIN = 'negebauer/user/LOGIN'
export const LOGIN_PENDING = LOGIN + '_PENDING'
export const LOGIN_FULFILLED = LOGIN + '_FULFILLED'
export const LOGIN_REJECTED = LOGIN + '_REJECTED'
export const SAVE_USER = 'negebauer/user/SAVE_USER'
export const SIGNUP = 'negebauer/user/SIGNUP'
export const SIGNUP_PENDING = SIGNUP + '_PENDING'
export const SIGNUP_FULFILLED = SIGNUP + '_FULFILLED'
export const SIGNUP_REJECTED = SIGNUP + '_REJECTED'

// Initial state
const initialState = {
  name: '',
  mail: '',
  password: '',
  api_key: '',
  error: '',
  loading: false,
}

// Reducer
export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SAVE_USER: {
      return _.merge(state, payload)
    }
    case LOGIN_PENDING: {
      return _.merge(state, { loading: true })
    }
    case LOGIN_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case LOGIN_REJECTED: {
      return _.merge(state, { error: payload.message, loading: false })
    }
    case SIGNUP_PENDING: {
      return _.merge(state, { loading: true })
    }
    case SIGNUP_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case SIGNUP_REJECTED: {
      return _.merge(state, { error: payload.message, loading: false })
    }
    case REHYDRATE: {
      return _.merge(state, {
        ...payload.user,
        error: '',
        loading: false,
      })
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

export const saveUser = ({ mail, password }) => dispatch =>
  dispatch({ type: SAVE_USER, payload: { mail, password } })

export const signup = ({ name, mail, password, password_confirmation }) => (
  dispatch,
  getState,
  { api }
) =>
  dispatch({
    type: SIGNUP,
    payload: api.signup({ name, mail, password, password_confirmation }),
  })
