import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

import { devlog } from '../utils/log'
import { fetchExperiences } from '../redux/modules/user'

const mapStateToProps = (state, props) => ({
  experience: state.user.experiences.filter(
    e => e.id === Number(props.match.params.id) || []
  )[0],
  loading: state.experience.loading,
  error: state.experience.error,
})

const mapDispatchToProps = {
  fetchExperiences,
}

class Experience extends Component {
  constructor() {
    super()
    this.state = {
      adding: false,
      user_mail: '',
    }
  }

  componentWillMount = () => {
    this.props.fetchExperiences(this.state)
  }

  render() {
    devlog('Experience', this.props)
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
