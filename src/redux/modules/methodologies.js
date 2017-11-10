import _ from 'lodash/fp/object'

// Actions
export const FETCH_METHODOLOGIES = 'negebauer/methodologies/FETCH_METHODOLOGIES'
export const FETCH_METHODOLOGIES_PENDING = FETCH_METHODOLOGIES + '_PENDING'
export const FETCH_METHODOLOGIES_FULFILLED = FETCH_METHODOLOGIES + '_FULFILLED'
export const FETCH_METHODOLOGIES_REJECTED = FETCH_METHODOLOGIES + '_REJECTED'

// Initial state
const initialState = {
  methodologies: [],
  loading: false,
}

// Reducer
export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_METHODOLOGIES_PENDING: {
      return _.merge(state, { loading: true })
    }
    case FETCH_METHODOLOGIES_FULFILLED: {
      return _.merge(state, { methodologies: payload, loading: false })
    }
    case FETCH_METHODOLOGIES_REJECTED: {
      return _.merge(state, { error: payload.message, loading: false })
    }
    default: {
      return state
    }
  }
}

// Action creators
export const fetchMethodologies = () => (dispatch, getState, { api }) =>
  dispatch({
    type: FETCH_METHODOLOGIES,
    payload: api.fetchMethodologies(),
  })
