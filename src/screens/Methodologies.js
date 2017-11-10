import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { fetchMethodologies } from '../redux/modules/methodologies'

import Methodology from '../components/Methodology'

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
    this.state = {
      methodology: undefined,
    }
  }

  componentDidMount = () => {
    this.props.fetchMethodologies()
  }

  showPreview = methodology => {
    this.setState({ methodology: methodology })
  }

  closePreview = () => {
    this.setState({ methodology: undefined })
  }

  render() {
    devlog('Methodologies', this.props)
    const message =
      (this.props.loading && 'Cargando') ||
      (this.props.error && this.props.error) ||
      'Metodologias'
    const M = this.state.methodology || { id: -1 }
    return (
      <div>
        <div className="container">
          <div className="row">
            <h2 className="header">{message}</h2>
            <table className="bordered responsive-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Ver en vivo</th>
                  <th>Enlace externo</th>
                </tr>
              </thead>
              <tbody>
                {this.props.methodologies.map(m => (
                  <Methodology
                    key={m.id}
                    methodology={m}
                    previewOn={m.id === M.id}
                    showPreview={this.showPreview}
                    closePreview={this.closePreview}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.methodology && (
          <div className="container">
            <iframe
              title="methodologyPreview"
              src={this.state.methodology.link}
              style={{ width: '100%', height: '600px' }}
            />
          </div>
        )}
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
