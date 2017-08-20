// import { shallow, mount } from "enzyme"
import Index from "./index.js"

it("renders without crashing", () => {
  const tree = { ...Index, _reactInternalInstance: "censored" }
  expect(JSON.stringify(tree)).toMatchSnapshot()
})
