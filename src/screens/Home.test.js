import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import configureStore from '../redux/store'
import Home from './Home'

let initialState
let store

beforeEach(() => {
  initialState = {}
  store = configureStore(initialState)
})

it('shallow renders without crashing', () => {
  shallow(<Home store={store} />)
})

it('mount renders without crashing', () => {
  mount(<Home store={store} />)
})

it('matches snapshot', () => {
  const wrapper = mount(<Home store={store} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders children', () => {
  const wrapper = mount(<Home store={store} />)
  expect(wrapper.children().exists()).toBeTruthy()
})
