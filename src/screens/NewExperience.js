import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { createExperience } from '../redux/modules/experience'
import { replace } from '../redux/modules/router'

const mapStateToProps = state => ({
  loading: state.user.loading,
  api_key: state.user.api_key,
  error: state.user.error,
})

const mapDispatchToProps = {
  replace,
  createExperience,
}

class NewExperience extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      sentExperience: false,
    }
  }

  componentDidUpdate = () => {
    if (this.state.sentExperience) {
      this.props.replace('/experiences')
    }
  }

  submit = e => {
    e.preventDefault()
    devlog(this.state.mail)
    devlog(this.state.password)
    this.setState({
      sentExperience: true,
    })
    this.props.createExperience(this.state)
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
      'Nueva Experiencia'
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" ref={f => (this.form = f)}>
            <h2 className="header">
              {message}
            </h2>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="name"
                  type="text"
                  className="validate"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label htmlFor="name">Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="description"
                  type="text"
                  className="validate"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <label htmlFor="description">Descripcion</label>
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

NewExperience.propTypes = {
  api_key: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchExperiences: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
  createExperience: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewExperience)
