import React, { Component } from 'react'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

class Home extends Component {
  render() {
    devlog('Home', this.props)
    return (
      <div className="container">
        <h1>IIC2113 - Web</h1>
        <h3>Api is at url {process.env.REACT_APP_API || 'NO_ENV'}</h3>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
