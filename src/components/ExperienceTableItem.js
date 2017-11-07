import React from 'react'
import PropTypes from 'prop-types'

export default class ExperienceTableItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.description}</td>
        <td>
          <a className="waves-effect waves-light btn">
            <i className="material-icons right">add</i>Agregar
          </a>
        </td>
      </tr>
    )
  }
}

ExperienceTableItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
