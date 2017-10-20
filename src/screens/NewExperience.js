import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { fetchExperiences } from '../redux/modules/user'

const mapStateToProps = state => ({
  loading: state.user.loading,
  api_key: state.user.api_key,
  error: state.user.error,
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
      <div className="container">
        <div className="row">
          <h2 className="header">
            {message}
          </h2>
          <table className="bordered responsive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Item Price</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Alvin</td>
                <td>Eclair</td>
                <td>$0.87</td>
              </tr>
              <tr>
                <td>Alan</td>
                <td>Jellybean</td>
                <td>$3.76</td>
              </tr>
              <tr>
                <td>Jonathan</td>
                <td>Lollipop</td>
                <td>$7.00</td>
              </tr>
            </tbody>
          </table>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiences)
