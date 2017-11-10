import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { fetchMethodologies } from '../redux/modules/methodologies'

const mapStateToProps = state => ({
  methodologies: state.methodologies.methodologies,
  loading: state.methodologies.loading,
  error: state.methodologies.error,
})

const mapDispatchToProps = {
  fetchMethodologies,
}

class Methodologies extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.props.fetchMethodologies()
  }

  render() {
    devlog('Methodologies', this.props)
    const message =
      (this.props.loading && 'Cargando') ||
      (this.props.error && this.props.error) ||
      'Metodologias'
    return (
      <div>
        <div className="container">
          <div className="row">
            <h2 className="header">{message}</h2>
            <table className="bordered responsive-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Agregar usuario</th>
                </tr>
              </thead>

              <tbody>
                {this.props.methodologies.map(m => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.id}</td>
                    <td>
                      <a className="waves-effect waves-light btn">
                        <i className="material-icons right">add</i>Agregar
                      </a>
                    </td>
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

Methodologies.propTypes = {
  methodologies: PropTypes.array.isRequired,
  fetchMethodologies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Methodologies)
