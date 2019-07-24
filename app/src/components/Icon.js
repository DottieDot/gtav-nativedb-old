import React from 'react'

export default class Icon extends React.Component {
	getFontAwesomeClass(type) {
		switch(type) {
			case 'solid':
				return 'fas'
			case 'light':
				return 'fal'
			case 'regular':
				return 'far'
			default:
				return null
		}
	}

	render() {
		return (
			<i style={{color: `var(--${this.props.color || 'lighter'})`}} className={`${this.getFontAwesomeClass(this.props.weight || 'solid')} fa-${this.props.icon}`} />
		)
	}
}
