import React from 'react'
import './css/AppBar.css'

import AppBarTitle from './AppBarTitle'
import AppBarButtons from './AppBarButtons'

export default class AppBar extends React.Component {
	static Title = AppBarTitle
	static Buttons = AppBarButtons

	render() {
		return (
			<div 
				className={`app-bar ${this.props.mode || 'normal'}`} 
				style={{backgroundColor: `var(--${this.props.color || 'lightest'})`}}
			>
				{ this.props.children }
			</div>
		)
	}
}
