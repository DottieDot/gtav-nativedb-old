import React from 'react'
import './css/AppBarButtons.css'

export default class AppBarButtons extends React.Component {
	render() {
		return (
			<div className="app-bar-buttons">
				{this.props.children}
			</div>
		)
	}
}
