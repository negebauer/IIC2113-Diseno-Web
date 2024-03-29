import { persistStore } from 'redux-persist'
// import { REHYDRATE } from 'redux-persist/constants'
import _ from 'lodash/fp/object'

// Actions
export const HYDRATATION = 'negebauer/hydratation/HYDRATATION'

// Initial state
const initialState = {
  done: false,
  persistor: null,
  error: null,
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case REHYDRATE: {
    //   return _.merge(state, { done: true })
    // }
    case HYDRATATION: {
      return _.merge(state, { ...action.payload, done: true })
    }
    default: {
      return state
    }
  }
}

// Action creators
export const hydrate = (store, options) => async (
  dispatch,
  getState,
  { api }
) => {
  const dispatchHydrate = ({ error, persistor }) =>
    dispatch({ type: HYDRATATION, error, persistor })
  try {
    const persistor = await new Promise((resolve, reject) => {
      const persistor = persistStore(store, options, err => {
        api.configToken(getState().user.api_key)
        if (err) reject(err)
        else resolve(persistor)
      })
      // To clear the store:
      // persistor.purge()
    })
    return dispatchHydrate({ persistor })
  } catch (error) {
    return dispatchHydrate({ error })
  }
}
