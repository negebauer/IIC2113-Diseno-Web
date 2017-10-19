import React, { Component } from 'react'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

class Home extends Component {
  render() {
    devlog('Login', this.props)
    return (
      <div id="center30">
        <div id="login" className="row">
          <form className="col s12">
            <h2 className="header">Signup</h2>
            <div className="row">
              <div className="input-field col s12">
                <input id="first_name" type="text" className="validate" />
                <label htmlFor="name">Nombre</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="mail" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password_confirmation"
                  type="password"
                  className="validate"
                />
                <label htmlFor="password">Password Confirmation</label>
              </div>
            </div>
            <button
              className="waves-effect waves-light btn-large"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
