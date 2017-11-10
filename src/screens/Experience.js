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
      applicable: 'Not sure',
      usefulness: 'indispensable',
      relevance: 'Important for our experience',
      feasibility: 'feasibility of the selection',
      experience_id: -1,
      methood_id: -1,
      selectedMethodology: undefined,
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
    this.setState({
      addingMethodology: !this.state.addingMethodology,
      selectedMethodology: undefined,
    })

  handleChange = ev =>
    this.setState({
      [ev.target.name]: Number(ev.target.value) || ev.target.value,
    })

  submit = e => {
    e.preventDefault()
    this.props.addUser(this.props.experience, this.state.user_mail)
  }

  selectedMethodology = selectedMethodology =>
    this.setState({ selectedMethodology })

  render() {
    devlog('Experience', this.state, this.props)
    const { addingUser, addingMethodology, selectedMethodology } = this.state
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
            <h5>Metodología asociada</h5>
            {addingMethodology &&
              !selectedMethodology && (
                <div>
                  <h6 style={{ fontWeight: 'bold' }}>Seleccione Metodologia</h6>
                  {selectableMethodologies.map(m => (
                    <div
                      className="waves-effect waves-light btn"
                      style={{
                        backgroundColor: '#ee6e73',
                        cursor: 'pointer',
                        marginLeft: '30px',
                        display: 'block',
                        width: 'fit-content',
                        marginBottom: '5px',
                      }}
                      key={m.id}
                      value={m.id}
                      onClick={() => this.selectedMethodology(m)}
                    >

                      {m.name}
                    </div>
                  ))}
                </div>
              )}
            {addingMethodology &&
              selectedMethodology && (
                // TODO: AQUI PONER FORMULARIO PARA RELLENAR
                // {
                //   applicable: "Not sure",
                //   usefulness: "indispensable",
                //   relevance: "Important for our experience",
                //   feasibility: "feasibility of the selection",
                //   experience_id: :experience_id,
                //   methood_id: 11,
                // }
                //
                // y modificar el state como ya sabes
                <div
                  className="waves-effect waves-light btn"
                  style={{
                    backgroundColor: '#ee6e73',
                    cursor: 'pointer',
                    marginLeft: '30px',
                    display: 'block',
                    width: 'fit-content',
                    marginBottom: '5px',
                  }}
                >
                  {this.state.selectedMethodology.name}
                </div>
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
                    showPreview={() => { }}
                    closePreview={() => { }}
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
