import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Login from './Login'
import configureStore from '../redux/store'

let history
let initialState
let store

beforeEach(() => {
  history = createHistory()
  initialState = {}
  const api = { login: () => {}, saveUser: () => {}, replace: () => {} }
  store = configureStore(initialState, { history, api })
})

it('shallow renders without crashing', () => {
  shallow(<Login store={store} />)
})

it('mount renders without crashing', () => {
  mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Login />
      </ConnectedRouter>
    </Provider>
  )
})

it('matches snapshot', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Login />
      </ConnectedRouter>
    </Provider>
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders children', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Login />
      </ConnectedRouter>
    </Provider>
  )
  expect(wrapper.children().exists()).toBeTruthy()
})
