import React from 'react'

export default class Surface extends React.Component {
	render() {
		return (
			<div 
				style={{
					backgroundColor: `var(--${this.props.color || 'lightest'})`,
					padding: `${this.props.padding}`,
					boxShadow: this.props.shadow
				}}
			>
				{this.props.children}
			</div>
		)
	}
}
