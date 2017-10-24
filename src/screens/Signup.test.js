import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import ConnectedSignup, { Signup } from './Signup'
import configureStore from '../redux/store'

let history
let initialState
let store

beforeEach(() => {
  history = createHistory()
  initialState = {}
  const api = { signup: () => {}, saveUser: () => {} }
  store = configureStore(initialState, { history, api })
})

it('shallow renders without crashing', () => {
  shallow(<ConnectedSignup store={store} />)
})

it('mount renders without crashing', () => {
  mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConnectedSignup />
      </ConnectedRouter>
    </Provider>
  )
})

it('matches snapshot', () => {
  const data = { loading: false, api_key: '', error: '' }
  const wrapper = mount(
    <Signup
      {...data}
      signup={() => {}}
      saveUser={() => {}}
      replace={() => {}}
    />
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('doesnt render children', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConnectedSignup />
      </ConnectedRouter>
    </Provider>
  )
  expect(wrapper.children().exists()).toBeTruthy()
})
