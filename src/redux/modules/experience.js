import { REHYDRATE } from 'redux-persist/constants'
import _ from 'lodash/fp/object'

// Actions
export const CREATE_EXPERIENCE = 'negebauer/experience/CREATE_EXPERIENCE'
export const CREATE_EXPERIENCE_PENDING = CREATE_EXPERIENCE + '_PENDING'
export const CREATE_EXPERIENCE_FULFILLED = CREATE_EXPERIENCE + '_FULFILLED'
export const CREATE_EXPERIENCE_REJECTED = CREATE_EXPERIENCE + '_REJECTED'
export const ADD_USER_EXPERIENCE = 'negebauer/experience/ADD_USER_EXPERIENCE'
export const ADD_USER_EXPERIENCE_PENDING = ADD_USER_EXPERIENCE + '_PENDING'
export const ADD_USER_EXPERIENCE_FULFILLED = ADD_USER_EXPERIENCE + '_FULFILLED'
export const ADD_USER_EXPERIENCE_REJECTED = ADD_USER_EXPERIENCE + '_REJECTED'

// Initial state
const initialState = {
  name: '',
  mail: '',
  password: '',
  api_key: '',
  error: '',
  loading: false,
  addingUser: false,
}

// Reducer
export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_EXPERIENCE_PENDING: {
      return _.merge(state, { loading: true })
    }
    case CREATE_EXPERIENCE_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case CREATE_EXPERIENCE_REJECTED: {
      return _.merge(state, { error: payload.message, loading: false })
    }
    case ADD_USER_EXPERIENCE_PENDING: {
      return _.merge(state, { addingUser: true })
    }
    case ADD_USER_EXPERIENCE_FULFILLED: {
      return _.merge(state, { addingUser: false })
    }
    case ADD_USER_EXPERIENCE_REJECTED: {
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
export const createExperience = ({ name, description }) => (
  dispatch,
  getState,
  { api }
) =>
  dispatch({
    type: CREATE_EXPERIENCE,
    payload: api.createExperience({ name, description }),
  })

export const addUser = (experience, user_mail) => (
  dispatch,
  getState,
  { api }
) =>
  dispatch({
    type: ADD_USER_EXPERIENCE,
    payload: api.addUserExperience(experience.id, user_mail),
  })
