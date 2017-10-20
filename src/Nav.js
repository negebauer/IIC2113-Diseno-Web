import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route as RouteDom, Switch, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Experiences from './screens/Experiences'
import NotFound from './screens/NotFound'

const siteTitle = title => (title ? `IIC2113 | ${title}` : 'IIC2113 Web')

const Body = styled.div``

const Route = props =>
  <Body>
    <Helmet>
      <title>
        {siteTitle(props.title)}
      </title>
    </Helmet>
    <RouteDom {...props} />
  </Body>

Route.propTypes = {
  title: PropTypes.string,
}

const mapStateToProps = state => ({
  mail: state.user.mail,
  loading: state.user.loading,
})

const mapDispatchToProps = {}

class Navigator extends Component {
  render() {
    let loading = null
    if (this.props.loading) {
      loading = (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      )
    }


    let links = null
    if (!this.props.mail) {
      links = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="/signup">Signup</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      )
    } else {
      links = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="/experiences" data-hover="true">
              Experiences
            </a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
          <li>
            <a href="#">
              {this.props.mail}
            </a>
          </li>
        </ul>
      )
    }

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              Logo
            </a>
            {links}
            {loading}
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} title="Login" />
          <Route path="/signup" component={Signup} title="signup" />
          <Route
            path="/experiences"
            component={Experiences}
            title="experiences"
          />
          <Route component={NotFound} title="Not found" />
        </Switch>
      </div>
    )
  }
}

Navigator.propTypes = {
  mail: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigator)
)
