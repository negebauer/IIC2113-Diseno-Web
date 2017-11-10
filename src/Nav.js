import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route as RouteDom, Link, Switch, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import Home from './screens/Home'
import Login from './screens/Login'
import Logout from './screens/Logout'
import Methodologies from './screens/Methodologies'
import Signup from './screens/Signup'
import Experiences from './screens/Experiences'
import NewExperience from './screens/NewExperience'
import NotFound from './screens/NotFound'

const siteTitle = title => (title ? `IIC2113 | ${title}` : 'IIC2113 Web')

const Body = styled.div``

const Route = props => (
  <Body>
    <Helmet>
      <title>{siteTitle(props.title)}</title>
    </Helmet>
    <RouteDom {...props} />
  </Body>
)

Route.propTypes = {
  title: PropTypes.string,
}

const mapStateToProps = state => ({
  mail: state.user.mail,
  loading:
    state.user.loading ||
    state.experience.loading ||
    state.methodologies.loading,
})

const mapDispatchToProps = {}

class Navigator extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              Logo
            </Link>
            {
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {!this.props.mail && (
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                )}
                {this.props.mail && (
                  <li>
                    <Link to="/methodologies">Methodologies</Link>
                  </li>
                )}
                {this.props.mail && (
                  <li>
                    <Link to="/experiences">Experiences</Link>
                  </li>
                )}
                <li>
                  {this.props.mail && <Link to="/logout">Logout</Link>}
                  {!this.props.mail && <Link to="/login">Login</Link>}
                </li>
                {this.props.mail && (
                  <li>
                    <a>{this.props.mail}</a>
                  </li>
                )}
              </ul>
            }
            {this.props.loading && (
              <div className="progress">
                <div className="indeterminate" />
              </div>
            )}
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} title="Login" />
          <Route path="/signup" component={Signup} title="Signup" />
          <Route path="/logout" component={Logout} title="Logout" />
          <Route
            path="/methodologies"
            component={Methodologies}
            title="Methodologies"
          />
          <Route
            path="/experiences"
            component={Experiences}
            title="Experiences"
          />
          <Route
            path="/newexperience"
            component={NewExperience}
            title="New Experience"
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
