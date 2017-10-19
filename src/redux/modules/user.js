import _ from 'lodash/fp/object'

// Actions
export const LOGIN = 'negebauer/login/LOGIN'
export const LOGIN_PENDING = LOGIN + '_PENDING'
export const LOGIN_FULFILLED = LOGIN + '_FULFILLED'
export const LOGIN_REJECTED = LOGIN + '_REJECTED'

// Initial state
const initialState = {
  mail: '',
  password: '',
  token: '',
  error: undefined,
}

// Reducer
export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOGIN_FULFILLED: {
      return _.merge(state, payload)
    }
    default: {
      return state
    }
  }
}

// Action creators
export const login = ({ mail, password }) => (dispatch, getState, { api }) => {
  console.log(mail, password)
  dispatch({
    type: LOGIN,
    payload: api.login({ mail, password }),
  })
}
