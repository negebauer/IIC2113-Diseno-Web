import React, { Component } from 'react'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { login, saveUser } from '../redux/modules/user'

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  login,
  saveUser,
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      password: '',
    }
  }
  submit = e => {
    e.preventDefault()
    devlog(this.state.mail)
    devlog(this.state.password)
    this.props.saveUser(this.state)
    this.props.login(this.state)
  }

  handleChange = ev =>
    this.setState({
      [ev.target.name]: Number(ev.target.value) || ev.target.value,
    })

  render() {
    devlog('Login', this.props)
    return (
      <div id="center30">
        <div id="login" className="row">
          <form className="col s12" ref={f => (this.form = f)}>
            <h2 className="header">Login</h2>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="mail"
                  type="email"
                  className="validate"
                  name="mail"
                  value={this.state.mail}
                  onChange={this.handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button
              className="waves-effect waves-light btn-large"
              onClick={this.submit}
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
