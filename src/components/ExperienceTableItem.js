import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class ExperienceTableItem extends React.Component {
  render() {
    const { id, name, description } = this.props
    return (
      <tr>
        <td>{name}</td>
        <td>{description}</td>
        <td>
          <Link
            to={`/experiences/${id}`}
            className="waves-effect waves-light btn"
          >
            <i className="material-icons right">info</i>
          </Link>
        </td>
      </tr>
    )
  }
}

ExperienceTableItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}
