// Maybe check
// https://github.com/Gethyl/ReactReduxTestingUsingJestEnzyme/blob/master/__test__/Home.spec.js

import React from "react"
import createHistory from "history/createBrowserHistory"
import configureStore from "./redux/store"
import { shallow, mount } from "enzyme"
import toJson from "enzyme-to-json"
import App from "./App"

const history = createHistory()
const initialState = { hydratation: { done: true } }
const store = configureStore(initialState, history)
const options = { hydratation: { blacklist: ["hydratation", "router"] } }

it("shallow renders without crashing", () => {
  shallow(<App store={store} options={options} history={history} />)
})

it("mount renders without crashing", () => {
  mount(<App store={store} options={options} history={history} />)
})

it("matches snapshot", () => {
  const wrapper = mount(
    <App store={store} options={options} history={history} />
  )
  expect(toJson(wrapper)).toMatchSnapshot()
})
