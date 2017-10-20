import { devlog } from './utils/log'
const popsicle = require('popsicle')

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    // Harcoded token!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.token = ''
  }

  configToken = token => (this.token = token)

  request = async request => {
    try {
      const response = await request
      if (response.status >= 400) {
        throw JSON.parse(response.body)
      }
      return JSON.parse(response.body)
    } catch (err) {
      devlog('ERROR API', err)
      throw err
    }
  }

  url = url => `${this.baseUrl}${url}`

  tokenHeader = () => `Token token=${this.token}`

  get = async url =>
    this.request(
      popsicle.get({
        url: this.url(url),
        headers: { Authorization: this.tokenHeader() },
      })
    );

  post = async (url, body) =>
    this.request(
      popsicle.post({
        url: this.url(url),
        body,
        headers: { Authorization: this.tokenHeader() },
      })
    )

  login = async userData => {
    const response = await this.post('/login', userData)
    this.configToken(response.api_key)
    return Promise.resolve(response)
  }

  signup = async userData => {
    const response = await this.post('/signup', userData)
    this.configToken(response.api_key)
    return Promise.resolve(response)
  }

  fetchExperiences = async userData => {
    const response = await this.get('/experiences', userData)
    return Promise.resolve(response)
  }

  createExperience = async userData => {
    const response = await this.post('/experiences', userData)
    this.configToken(response.api_key)
    return Promise.resolve(response)
  }
}
