import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

import { devlog } from '../utils/log'
import { fetchExperiences } from '../redux/modules/user'
import { addUser } from '../redux/modules/experience'

const mapStateToProps = (state, props) => ({
  experience: state.user.experiences.filter(
    e => e.id === Number(props.match.params.id) || []
  )[0],
  loading: state.experience.loading,
  addingUser: state.experience.addingUser,
  error: state.experience.error,
})

const mapDispatchToProps = {
  fetchExperiences,
  addUser,
}

class Experience extends Component {
  constructor() {
    super()
    this.state = {
      adding: false,
      user_mail: '',
    }
  }

  componentWillMount = () => this.loadExperiences()

  componentDidUpdate = prevProps => {
    if (prevProps.addingUser && !this.props.addingUser) {
      this.setState({ adding: false, user_mail: '' })
      this.loadExperiences()
    }
  }

  loadExperiences = () => this.props.fetchExperiences(this.state)

  toggleAdd = () => {
    this.setState({ adding: !this.state.adding })
  }

  handleChange = ev =>
    this.setState({
      [ev.target.name]: Number(ev.target.value) || ev.target.value,
    })

  submit = e => {
    e.preventDefault()
    this.props.addUser(this.props.experience, this.state.user_mail)
  }

  render() {
    devlog('Experience', this.props)
    const { adding } = this.state
    const { loading, error, experience } = this.props
    const message =
      (loading && 'Cargando') ||
      (error && error) ||
      `Experiencia ${experience.id}`
    // const { id } = this.props.match.params
    return (
      <div>
        <div className="container">
          <div className="row">
            <h2 className="header">{message}</h2>
            <h3>{experience.name}</h3>
            <h4>Descripción</h4>
            <h4>{experience.description}</h4>

            <h5>Usuarios</h5>
            {adding && (
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="user_mail"
                      type="email"
                      className="validate"
                      name="user_mail"
                      value={this.state.user_mail}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <button
                  className="waves-effect waves-light btn-large"
                  onClick={this.submit}
                >
                  Agregar
                </button>
              </form>
            )}
            <div
              onClick={this.toggleAdd}
              className="waves-effect waves-light btn"
            >
              <i className="material-icons left">{adding ? 'cancel' : 'add'}</i>
              {adding ? 'Cancelar' : 'Agregar usuario'}
            </div>
            <table className="bordered responsive-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {experience.users.map(u => (
                  <tr key={u.mail}>
                    <td>{u.name}</td>
                    <td>{u.mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

Experience.propTypes = {
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  experience: PropTypes.object.isRequired,
  fetchExperiences: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  addingUser: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
