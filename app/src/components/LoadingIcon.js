import React from 'react'
import './css/LoadingIcon.css'

import Icon from './Icon'

export default class LoadingIcon extends React.Component {
	render() {
		return (
			<span className="loading-icon" style={{fontSize: `${this.props.size || 16}px`}}><Icon color={this.props.color} icon="spinner" /></span>
		)
	}
}
