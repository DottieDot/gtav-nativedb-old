import React from 'react'
import './css/MenuItem.css'

export default class MenuItem extends React.Component {
	onClick(e) {
		if (this.props.onClick) {
			this.props.onClick.call(this, e)
		}
	}

	isActive() {
		const isActive = this.props.isActive
		const route = this.props.route

		if (typeof isActive === 'boolean') {
			return isActive
		}
		else if (typeof isActive === 'string') {
			return isActive === 'true'
		}
		else if (typeof isActive === 'function') {
			return isActive.call(this)
		}
		
		if (route) {
			return route === window.location.pathname
		}
	}

	render() {
		return (
			<li className={`menu-item ${this.isActive() ? 'active' : ''}`} onClick={this.onClick.bind(this)}>{this.props.children}</li>
		)
	}
}
