import React from 'react'
import PropTypes from 'prop-types'

export default class Methodology extends React.Component {
  constructor() {
    super()
    this.state = { showFrame: false }
  }

  toggleFrame = () => {
    this.setState({ showFrame: !this.state.showFrame })
  }

  render() {
    const { previewOn, showPreview, closePreview } = this.props
    const action = previewOn ? closePreview : showPreview
    return (
      <tr>
        <td>{this.props.methodology.name}</td>
        <a
          className="waves-effect waves-light btn"
          onClick={() => action(this.props.methodology)}
        >
          {previewOn ? (
            <span>
              <i className="material-icons left">close</i>Cerrar
            </span>
          ) : (
            'Vista previa'
          )}
        </a>
        <td>
          <a href={this.props.methodology.link}>Ver externo</a>
        </td>
      </tr>
    )
  }
}

Methodology.propTypes = {
  methodology: PropTypes.object.isRequired,
  showPreview: PropTypes.func.isRequired,
  closePreview: PropTypes.func.isRequired,
  previewOn: PropTypes.bool.isRequired,
}
