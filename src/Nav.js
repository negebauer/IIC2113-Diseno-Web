import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route as RouteDom, Switch, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
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
  api_key: state.user.api_key,
})

const mapDispatchToProps = {}

class Navigator extends Component {
  render() {
    let links = null
    if (!this.props.api_key) {
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
            <a href="/experiences">Experiences</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
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
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} title="Login" />
          <Route path="/signup" component={Signup} title="signup" />
          <Route component={NotFound} title="Not found" />
        </Switch>
      </div>
    )
  }
}

Navigator.propTypes = {
  api_key: PropTypes.string.isRequired,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigator)
)
