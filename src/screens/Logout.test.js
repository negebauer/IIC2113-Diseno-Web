import React from 'react'
import createHistory from 'history/createBrowserHistory'
// import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'react-router-redux'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import ConnectedLogout, { Logout } from './Logout'
import configureStore from '../redux/store'

let history
let initialState
let store

beforeEach(() => {
  history = createHistory()
  initialState = {}
  const api = { logout: () => {} }
  store = configureStore(initialState, { history, api })
})

it('shallow renders without crashing', () => {
  shallow(<ConnectedLogout store={store} />)
})

// it('mount renders without crashing', () => {
//   mount(
//     <Provider store={store}>
//       <ConnectedRouter history={history}>
//         <ConnectedLogout />
//       </ConnectedRouter>
//     </Provider>
//   )
// })

it('matches snapshot', () => {
  const data = { loading: false, api_key: '', error: '' }
  const wrapper = mount(
    <Logout {...data} logout={() => {}} replace={() => {}} />
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('logouts and replaces', () => {
  const data = { loading: false, api_key: '', error: '' }
  const logout = jest.fn()
  const replace = jest.fn()
  mount(<Logout {...data} logout={logout} replace={replace} />)
  expect(logout).toBeCalled()
  expect(replace).toBeCalled()
})

// it('doesnt render children', () => {
//   const wrapper = mount(
//     <Provider store={store}>
//       <ConnectedRouter history={history}>
//         <ConnectedLogout />
//       </ConnectedRouter>
//     </Provider>
//   )
//   expect(wrapper.children().exists()).toBeTruthy()
// })
