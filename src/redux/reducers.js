import { combineReducers } from 'redux'

import hydratation from './modules/hydratation'
import router from './modules/router'
import user from './modules/user'

const reducer = combineReducers({
  hydratation,
  router,
  user,
})

export default reducer
