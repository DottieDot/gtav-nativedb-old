import React from 'react'
import './css/Checkbox.css'

import Icon from './Icon'

export default class Checkbox extends React.Component {
	static _nextId = 0

	constructor(props) {
		super(props)

		this.state = {
			checked: this.props.checked === true || this.props.checked === 'true'
		}

		this._id = `cb-${++Checkbox._nextId}`
	}

	componentWillUpdate() {
		if (this.props.checked !== undefined) {
			const checked = this.props.checked === true || this.props.checked === 'true'
			if (this.state.checked !== checked) {
				this.setState({
					checked: checked
				})
			}
		}
	}

	onChange(e) {
		if (this.props.onToggle) {
			this.props.onToggle(e.target.checked)
		}

		this.setState({
			checked: e.target.checked
		})
	}

	render() {
		return (
			<span className="checkbox-container">
				<input id={this._id} type="checkbox" className="checkbox" onChange={this.onChange.bind(this)} checked={this.state.checked} />
				<label htmlFor={this._id} className="checkbox-items">
					<span className="checkbox-box"><Icon weight={this.state.checked ? 'solid' : 'regular'} color="primary-dark" icon={this.state.checked ? 'check-square' : 'square'} /></span> 
					<span className="checkbox-title">{this.props.title}</span>
				</label>
			</span>
		)
	}
}
