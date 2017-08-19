import React from "react"
import ReactDOM from "react-dom"
import { shallow, mount } from "enzyme"
import App from "./App"

it("dom renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
})

it("shallow renders without crashing", () => {
  shallow(<App />)
})

it("mounts without crashing", () => {
  mount(<App />)
})
