import React from "react"
import createHistory from "history/createBrowserHistory"
import configureStore from "./redux/store"
import { shallow, mount } from "enzyme"
import toJson from "enzyme-to-json"
import App from "./App"

it("passes", () => {})

const history = createHistory()

// Redux required objects
const initialState = {
  hydratation: { done: true },
}
const store = configureStore(initialState, history)

// App general settings
const options = {
  hydratation: {
    blacklist: ["hydratation", "router"],
  },
}

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
