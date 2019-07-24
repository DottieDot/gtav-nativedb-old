import React from 'react'
import './css/Ripple.css'

export default class Ripple extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			ripples: [],
			acitveRipples: [],
		}

		this.nextRippleKey = 0
	}

	createRippleKey() {
		return this.nextRippleKey++
	}

	spawn(x, y) {
		const container = this.refs.container
		const { top, left, width, height } = container.getBoundingClientRect()

		const size = Math.max(width, height)

		const dat = {
			key: this.createRippleKey(),
			x: x - left - size / 2,
			y: y - top - size / 2,
			size: size,
		}

		this.setState({
			ripples: this.state.ripples.concat(dat),
			acitveRipples: this.state.acitveRipples.concat(dat.key)
		})
	}
	
	destroy()	{
		const key = this.state.acitveRipples.splice(0,1)

		setTimeout(() => {
			this.setState({
				ripples: this.state.ripples.splice(
					this.state.ripples.findIndex(v => v === key)
				)
			})
		}, 600)

		this.setState({
			acitveRipples: this.state.acitveRipples
		})
	}

	isRippleActive(key) {
		return this.state.acitveRipples.find(v => v === key) !== undefined;
	}

	renderRipple(data) {
		return (
			<div 
				className={`ripple ${this.isRippleActive(data.key) ? '' : 'destroy'}`}
				key={data.key}
				style={
					{
						width: data.size,
						height: data.size,
						top: data.y,
						left: data.x,
					}
				} />
		)
	}

	render() {
		return (
			<div className="ripples-container" ref="container">
				{this.state.ripples.map(dat => this.renderRipple(dat))}
			</div>
		)
	}
}
