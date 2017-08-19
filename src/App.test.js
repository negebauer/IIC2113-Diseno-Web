import React from "react"
import { shallow, mount } from "enzyme"
import App from "./App"

it("shallow renders without crashing", () => {
  shallow(<App />)
})

it("mount renders without crashing", () => {
  mount(<App />)
})

it("renders welcome message", () => {
  const wrapper = shallow(<App />)
  const welcome = <h2>Welcome to React</h2>
  expect(wrapper).toContainReact(welcome)
})
