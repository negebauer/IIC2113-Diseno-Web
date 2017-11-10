import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { devlog } from '../utils/log'
import { fetchExperiences } from '../redux/modules/user'
import ExperienceTableItem from '../components/ExperienceTableItem'

const mapStateToProps = state => ({
  loading: state.user.loading,
  api_key: state.user.api_key,
  error: state.user.error,
  experiences: state.user.experiences,
})

const mapDispatchToProps = {
  fetchExperiences,
}

class Experiences extends Component {
  componentWillMount = () => {
    this.props.fetchExperiences(this.state)
  }

  render() {
    devlog('Login', this.props)
    const message =
      (this.props.loading && 'Cargando') ||
      (this.props.error && this.props.error) ||
      'Experiencias'

    return (
      <div>
        <div className="container">
          <div className="row">
            <h2 className="header">{message}</h2>
            <Link
              to="/newexperience"
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i className="material-icons">add</i>
            </Link>
            <table className="bordered responsive-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Agregar usuario</th>
                </tr>
              </thead>

              <tbody>
                {this.props.experiences.map(e => (
                  <ExperienceTableItem
                    key={e.id}
                    name={e.name}
                    description={e.description}
                    id={e.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

Experiences.propTypes = {
  api_key: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchExperiences: PropTypes.func.isRequired,
  experiences: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiences)
