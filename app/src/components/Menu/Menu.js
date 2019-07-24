import React from 'react'
import './css/Menu.css'

import MenuItem from './MenuItem'

export default class Menu extends React.Component {
	static Item = MenuItem

	render() {
		return (
			<ul className="menu horizontal">
				{this.props.children}
			</ul>
		)
	}
}
