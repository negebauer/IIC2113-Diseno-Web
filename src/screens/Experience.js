import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

import { devlog } from '../utils/log'
// import { fetchExperience } from '../redux/modules/user'
// import ExperienceTableItem from '../components/ExperienceTableItem'

const mapStateToProps = (state, props) => ({
  methodology: (state.methodologies.methodologies.filter(
    m => m.id === Number(props.match.params.id)
  ) || [{}])[0],
  loading: state.experience.loading,
  error: state.experience.error,
})

const mapDispatchToProps = {
  // fetchExperience,
}

class Experience extends Component {
  componentWillMount = () => {
    // this.props.fetchExperience(this.state)
  }

  render() {
    devlog('Experience', this.props)
    const { loading, error, methodology } = this.props
    const message =
      (loading && 'Cargando') ||
      (error && error) ||
      `Experiencia ${methodology.id}`
    // const { id } = this.props.match.params
    return (
      <div>
        <div className="container">
          <div className="row">
            <h2 className="header">{message}</h2>
            <h4>{methodology.name}</h4>
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
  methodology: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
