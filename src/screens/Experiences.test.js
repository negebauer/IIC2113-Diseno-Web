import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import _ from 'lodash/fp/object'
import Experiences from './Experiences'
import ExperienceTableItem from '../components/ExperienceTableItem'
import configureStore from '../redux/store'

let history
let initialState
let store

beforeEach(() => {
  history = createHistory()
  initialState = {}
  const api = { fetchExperiences: () => {} }
  store = configureStore(initialState, { history, api })
})

it('shallow renders without crashing', () => {
  shallow(<Experiences store={store} />)
})

it('mount renders without crashing', () => {
  mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Experiences />
      </ConnectedRouter>
    </Provider>
  )
})

it('matches snapshot', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Experiences />
      </ConnectedRouter>
    </Provider>
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders children', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Experiences />
      </ConnectedRouter>
    </Provider>
  )
  expect(wrapper.children().exists()).toBeTruthy()
})

it('renders ExperienceTableItem', () => {
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Experiences />
      </ConnectedRouter>
    </Provider>
  )
  store.replaceReducer(state =>
    _.merge(state, {
      user: {
        experiences: [
          {
            id: 1,
            name: 'Mi primera experiencia',
            date: '2016-08-16T23:13:05.908Z',
            description: 'En esta experiencia...',
            users: [
              {
                id: 1,
                name: 'Oscar Rios',
                username: 'orrios',
                created_at: '2016-08-16T23:13:05.908Z',
              },
              {
                id: 2,
                name: 'Nicolas Gebauer',
                phone_number: 'negebauer',
                created_at: '2016-09-16T23:13:15.908Z',
              },
            ],
          },
        ],
      },
    })
  )
  store.dispatch({ type: '' })
  expect(wrapper.find(ExperienceTableItem).length).toBe(1)
})
