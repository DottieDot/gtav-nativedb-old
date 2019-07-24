import React from 'react'
import './css/AppBarTitle.css'

export default class AppBarTitle extends React.Component {
	render() {
		return (
			<div className="app-bar-title" onClick={this.props.onClick}>{this.props.children}</div>
		)
	}
}
