import Api from "./Api"

const url = "http://ip.jsontest.com"
const api = new Api(url)

it("sets urls", () => {
  expect(api.baseUrl).toBe(url)
  expect(api.url("/users")).toBe(`${url}/users`)
})

it("gets", async () => {
  const ip = await api.get("/")
  expect(ip).toHaveProperty("ip")
})

it("posts", async () => {
  const ip = await api.post("/", {})
  expect(ip).toHaveProperty("ip")
})

it("fails parsing json", async () => {
  const err = await api.request(new Promise(res => res("asd/adw")))
  expect(err).toBeInstanceOf(Error)
})

it("fails on bad url", async () => {
  const api = new Api("")
  const err = await api.get("/")
  expect(err).toBeInstanceOf(Error)
})

describe("integration tests", () => {
  const url = process.env.REACT_APP_API || "http://localhost:3000"
  const api = new Api(url)

  it("gets from api", async () => {
    const r = await api.get("/")
    expect(r.on).toBeTruthy()
  })
})
