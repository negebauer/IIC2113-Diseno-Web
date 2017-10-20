import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route as RouteDom, Link, Switch, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Home from './screens/Home'
import Login from './screens/Login'
import Logout from './screens/Logout'
import Signup from './screens/Signup'
import Experiences from './screens/Experiences'
import NewExperience from './screens/NewExperience'
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
            <a>
              <Link to="/signup">Signup</Link>
            </a>
          </li>
          <li>
            <a>
              <Link to="/login">Login</Link>
            </a>
          </li>
        </ul>
      )
    } else {
      links = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a data-hover="true">
              <Link to="/experiences">Experiences</Link>
            </a>
          </li>
          <li>
            <a>
              <Link to="/logout">Logout</Link>
            </a>
          </li>
          <li>
            <a>
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
            <a className="brand-logo">
              <Link to="/">Logo</Link>
            </a>
            {links}
            {loading}
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} title="Login" />
          <Route path="/signup" component={Signup} title="signup" />
          <Route path="/logout" component={Logout} title="logout" />
          <Route
            path="/experiences"
            component={Experiences}
            title="experiences"
          />
          <Route
            path="/newexperience"
            component={NewExperience}
            title="newexperience"
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
