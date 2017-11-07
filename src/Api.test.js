import Api from './Api'

const url = 'https://jsonplaceholder.typicode.com'
const api = new Api(url)

it('sets urls', () => {
  expect(api.baseUrl).toBe(url)
  expect(api.url('/users')).toBe(`${url}/users`)
})

it('gets', async () => {
  const response = await api.get('/posts/1')
  expect(response).toHaveProperty('body')
})

it('posts', async () => {
  const a = 'a'
  const response = await api.post('/posts', { a })
  expect(response).toHaveProperty('a')
  expect(response.a).toMatch(a)
})

it('fails parsing invalid json', async () => {
  try {
    await api.request(new Promise(res => res('asd/adw')))
  } catch (err) {
    expect(err).toBeInstanceOf(Error)
  }
})

it('fails on bad url', async () => {
  const api = new Api('')
  try {
    await api.get('/')
  } catch (err) {
    expect(err).toBeInstanceOf(Error)
  }
})
