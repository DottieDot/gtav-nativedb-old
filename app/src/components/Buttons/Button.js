import React from 'react'
import './css/Button.css'

import Ripple from '../Ripple'
import LoadingIcon from '../LoadingIcon'

export default class Button extends React.Component {
	
	onMouseDown(e) {
		const ripple = this.refs.ripple
		ripple.spawn(e.clientX, e.clientY)
	}

	onMouseUp() {
		const ripple = this.refs.ripple
		ripple.destroy()
	}

	render() {
		return (
			<button 
				className={`btn ${this.props.mode || 'contained'} ${this.props.color || 'primary'}`} 
				onMouseDown={this.onMouseDown.bind(this)} 
				onMouseUp={this.onMouseUp.bind(this)}
				onClick={() => { if (this.props.onClick) this.props.onClick.call(this) }}
			>
				<Ripple ref="ripple"></Ripple>
				{this.props.loading ? <LoadingIcon color="inherit" size="inherit" />  : ''}
				{' '}
				{this.props.title}
			</button>
		)
	}
}
