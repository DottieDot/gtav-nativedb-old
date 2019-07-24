import React from 'react'
import './css/Collapse.css'

export default class Collapse extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			expanded: false
		}
	}

	componentDidUpdate(oldProps) {
		if (oldProps.expanded !== this.props.expanded) {
			const expanded = this.props.expanded === 'true' || this.props.expanded === true

			if (expanded) {
				this.expand()
			}
			else {
				this.collapse()
			}
		}
	}

	toggle() {
		if (!this.state.expanded) {
			if (this.props.onExpand) {
				this.props.onExpand.call(this)
			}
		}

		this.setState({
			expanded: !this.state.expanded
		})
	}

	expand() {
		if (!this.state.expanded) {
			this.toggle()
		}
	}

	collapse() {
		if (this.state.expanded) {
			this.setState({
				expanded: false
			})
		}
	}

	render() {
		return (
			<div 
				className={`collapse ${this.props.mode || 'normal'} ${this.state.expanded ? 'expanded' : ''}`}
			>
				<div 
					onClick={this.toggle.bind(this)}
					className="collapse-title"
					style={{
						backgroundColor: `var(--${this.props.color || 'light'})`,
						padding: `${this.props.padding}px`
					}}
				>
					{this.props.title}
				</div>
				<div className="collapse-content">
					{this.props.children}
				</div>
			</div>
		)
	}
}
