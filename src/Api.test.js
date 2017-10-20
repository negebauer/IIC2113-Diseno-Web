import Api from './Api'

const url = 'https://api.ipify.org?format=json'
const api = new Api(url)

it('sets urls', () => {
  expect(api.baseUrl).toBe(url)
  expect(api.url('/users')).toBe(`${url}/users`)
})

it('gets', async () => {
  const ip = await api.get('')
  expect(ip).toHaveProperty('ip')
})

it('posts', async () => {
  const ip = await api.post('', {})
  expect(ip).toHaveProperty('ip')
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
