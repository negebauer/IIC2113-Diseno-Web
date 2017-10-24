import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { signup, saveUser } from '../redux/modules/user'
import { replace } from '../redux/modules/router'

const mapStateToProps = state => ({
  loading: state.user.loading,
  api_key: state.user.api_key,
  error: state.user.error,
})

const mapDispatchToProps = {
  signup,
  saveUser,
  replace,
}

export class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      password: '',
      name: '',
      password_confirmation: '',
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
    this.props.signup(this.state)
  }

  handleChange = ev =>
    this.setState({
      [ev.target.name]: Number(ev.target.value) || ev.target.value,
    })

  render() {
    devlog('Signup', this.props)
    const message =
      (this.props.loading && 'Cargando') ||
      (this.props.error && this.props.error) ||
      'Signup'
    return (
      <div className="container">
        <div id="signup" className="row">
          <form className="col s12" ref={f => (this.form = f)}>
            <h2 className="header">
              {message}
            </h2>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="first_name"
                  type="text"
                  className="validate"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label htmlFor="name">Nombre</label>
              </div>
            </div>
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
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password_confirmation"
                  type="password"
                  className="validate"
                  name="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password Confirmation</label>
              </div>
            </div>
            <button
              className="waves-effect waves-light btn-large"
              onClick={this.submit}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  api_key: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
