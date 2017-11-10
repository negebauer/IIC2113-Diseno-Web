import { combineReducers } from 'redux'

import experience from './modules/experience'
import hydratation from './modules/hydratation'
import methodologies from './modules/methodologies'
import router from './modules/router'
import user from './modules/user'

const reducer = combineReducers({
  experience,
  hydratation,
  methodologies,
  user,
  router,
})

export default reducer
