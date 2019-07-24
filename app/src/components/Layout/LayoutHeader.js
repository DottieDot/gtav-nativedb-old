import React from 'react'
import './css/LayoutHeader.css'

export default class LayoutHeader extends React.Component {
	render() {
		return (
			<div className="layout-header">{this.props.children}</div>
		)
	}
}
