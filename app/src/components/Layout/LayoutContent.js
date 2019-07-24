import React from 'react'
import './css/LayoutContent.css'

export default class LayoutContent extends React.Component {
	render() {
		return (
			<div className="layout-content">{this.props.children}</div>
		)
	}
}
