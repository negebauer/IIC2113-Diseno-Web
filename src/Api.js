import popsicle from "popsicle"
import { devlog } from "./utils/log"
// import axios from "axios"
// import { normalize } from "normalizr"
// import { course, module, question } from "../schemas"

// const AUTHORIZATION = "Authorization"

// const data = async request => (await request).data

// const configAuthorization = token =>
//   (axios.defaults.headers.common[AUTHORIZATION] = token)

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  url = url => `${this.baseUrl}${url}`

  body = async request => {
    try {
      const response = await request
      return response.body
    } catch (err) {
      devlog("ERROR API", err)
    }
  }

  get = async url => this.body(popsicle(this.url(url)));
  post = async (url, body) => this.body(popsicle.post(this.url(url), body))
}
