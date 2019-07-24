import React from 'react'
import './css/Layout.css'

import LayoutContent from './LayoutContent'
import LayoutHeader from './LayoutHeader'

export default class Layout extends React.Component {
	static Header = LayoutHeader
	static Content = LayoutContent

	render() {
		return (
			<div className="layout">{this.props.children}</div>
		)
	}
}
