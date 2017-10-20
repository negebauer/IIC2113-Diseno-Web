import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { devlog } from '../utils/log'
import { logout } from '../redux/modules/user'
import { replace } from '../redux/modules/router'

const mapStateToProps = state => ({
  loading: state.user.loading,
  api_key: state.user.api_key,
  error: state.user.error,
})

const mapDispatchToProps = {
  replace,
  logout,
}

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      password: '',
    }
  }

  componentWillMount = () => {
    this.props.logout(this.state)
    this.props.replace('/')
  }

  render() {
    devlog('Logout', this.props)
    return <div className="container" />
  }
}

Logout.propTypes = {
  api_key: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
