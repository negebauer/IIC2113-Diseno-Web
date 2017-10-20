import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { login, saveUser } from '../redux/modules/user'
import { replace } from '../redux/modules/router'

const mapStateToProps = state => ({
  loading: state.user.loading,
  api_key: state.user.api_key,
  error: state.user.error,
})

const mapDispatchToProps = {
  login,
  saveUser,
  replace,
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      password: '',
    }
  }

  componentWillUpdate = nextProps => {
    if (nextProps.api_key !== this.props.api_key) {
      this.props.replace('/')
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
    const message =
      (this.props.loading && 'Cargando') ||
      (this.props.error && this.props.error) ||
      'Login'
    return (
      <div className="container">
        <div id="login" className="row">
          <form className="col s12" ref={f => (this.form = f)}>
            <h2 className="header">
              {message}
            </h2>
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

Login.propTypes = {
  api_key: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
