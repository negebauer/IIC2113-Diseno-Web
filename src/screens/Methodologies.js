import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { fetchMethodologies } from '../redux/modules/methodologies'

const mapStateToProps = state => ({
  methodologies: state.methodologies.methodologies,
  loading: state.methodologies.loading,
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
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" ref={f => (this.form = f)}>
            {/* <h2 className="header">{message}</h2> */}
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
              Agregar experiencia
            </button>
          </form>
        </div>
      </div>
    )
  }
}

Methodologies.propTypes = {
  methodologies: PropTypes.array.isRequired,
  fetchMethodologies: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Methodologies)
