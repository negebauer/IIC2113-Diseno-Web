import { REHYDRATE } from 'redux-persist/constants'
import _ from 'lodash/fp/object'

// Actions
export const CREATE_EXPERIENCE = 'negebauer/experience/CREATE_EXPERIENCE'
export const CREATE_EXPERIENCE_PENDING = CREATE_EXPERIENCE + '_PENDING'
export const CREATE_EXPERIENCE_FULFILLED = CREATE_EXPERIENCE + '_FULFILLED'
export const CREATE_EXPERIENCE_REJECTED = CREATE_EXPERIENCE + '_REJECTED'

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
    case CREATE_EXPERIENCE_PENDING: {
      return _.merge(state, { loading: true })
    }
    case CREATE_EXPERIENCE_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case CREATE_EXPERIENCE_REJECTED: {
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
