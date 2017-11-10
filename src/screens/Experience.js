import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

import { devlog } from '../utils/log'
import {
  fetchExperiences,
  fetchExperienceMethodologies,
} from '../redux/modules/user'
import { addUser } from '../redux/modules/experience'

import Methodology from '../components/Methodology'

const mapStateToProps = (state, props) => ({
  methodologies: state.methodologies.methodologies,
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
  fetchExperienceMethodologies,
}

class Experience extends Component {
  constructor() {
    super()
    this.state = {
      addingUser: false,
      addingMethodology: false,
      user_mail: '',
      methodologyEvaluation: {
        applicable: 'Not sure',
        usefulness: 'indispensable',
        relevance: 'Important for our experience',
        feasibility: 'feasibility of the selection',
        experience_id: -1,
        methood_id: -1,
      },
      selectedMethodology: {},
    }
  }

  componentWillMount = () => this.loadExperiences()

  componentDidUpdate = prevProps => {
    if (prevProps.addingUser && !this.props.addingUser) {
      this.setState({ addingUser: false, user_mail: '' })
      this.loadExperiences()
    }
  }

  loadExperiences = () => {
    this.props.fetchExperiences(this.state)
    this.props.fetchExperienceMethodologies(this.props.experience)
  }

  toggleAddUser = () => this.setState({ addingUser: !this.state.addingUser })

  toggleAddMethodology = () =>
    this.setState({ addingMethodology: !this.state.addingMethodology })

  handleChange = ev =>
    this.setState({
      [ev.target.name]: Number(ev.target.value) || ev.target.value,
    })

  submit = e => {
    e.preventDefault()
    this.props.addUser(this.props.experience, this.state.user_mail)
  }

  render() {
    devlog('Experience', this.state, this.props)
    const { addingUser, addingMethodology } = this.state
    const { loading, error, experience, methodologies } = this.props
    const experienceMethodologiesIds = (experience.methodologies || []).map(
      m => m.id
    )
    const selectableMethodologies = methodologies.filter(
      m => experienceMethodologiesIds.indexOf(m.id) === -1
    )
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

            <h5>Metodologías asociadas</h5>
            {addingMethodology && (
              <form className="col s12">
                <div
                  className="input-field col s12"
                  style={{ width: '100px', height: '100px', padding: '10px' }}
                >
                  <select
                    style={{ width: '100px', height: '40px', padding: '10px' }}
                    className="browser-default"
                    name="selectedMethodology"
                    value={this.state.selectedMethodology}
                    onChange={this.handleChange}
                  >
                    <option value="" disabled selected>
                      Elegir una metodología
                    </option>
                    {selectableMethodologies.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <label>Metodología</label>
                </div>
                {/* <button
                  className="waves-effect waves-light btn-large"
                  onClick={this.submit}
                >
                  Agregar
                </button> */}
              </form>
            )}
            <div
              onClick={this.toggleAddMethodology}
              className="waves-effect waves-light btn"
            >
              <i className="material-icons left">
                {addingMethodology ? 'cancel' : 'add'}
              </i>
              {addingMethodology ? 'Cancelar' : 'Agregar metodología'}
            </div>
            <table className="bordered responsive-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Enlace externo</th>
                </tr>
              </thead>
              <tbody>
                {(experience.methodologies || []).map(m => (
                  <Methodology
                    key={m.id}
                    methodology={m}
                    previewOn={false}
                    showPreview={() => {}}
                    closePreview={() => {}}
                  />
                ))}
              </tbody>
            </table>
            <h5>Usuarios</h5>
            {addingUser && (
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
              onClick={this.toggleAddUser}
              className="waves-effect waves-light btn"
            >
              <i className="material-icons left">
                {addingUser ? 'cancel' : 'add'}
              </i>
              {addingUser ? 'Cancelar' : 'Agregar usuario'}
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
  fetchExperienceMethodologies: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  addingUser: PropTypes.bool.isRequired,
  methodologies: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
