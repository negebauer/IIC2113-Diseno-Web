import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
// import _ from 'lodash/fp/object'
import NewExperience from './NewExperience'
import configureStore from '../redux/store'

let history
let initialState
let store

beforeEach(() => {
  history = createHistory()
  initialState = {}
  const api = { createExperience: () => {} }
  store = configureStore(initialState, { history, api })
})

it('shallow renders without crashing', () => {
  shallow(<NewExperience store={store} />)
})

it('mount renders without crashing', () => {
  mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NewExperience />
      </ConnectedRouter>
    </Provider>
  )
})

it('matches snapshot', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NewExperience />
      </ConnectedRouter>
    </Provider>
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders children', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <NewExperience />
      </ConnectedRouter>
    </Provider>
  )
  expect(wrapper.children().exists()).toBeTruthy()
})
