import React from 'react'
import { Collapse, Surface, LoadingIcon } from '../../components'
import Native from './Native'
import ApiWrapper from '../../common/api'

export default class Namespace extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: false,
			natives: []
		}
	}

	async loadNatives() {
		if (!this.state.natives.length && !this.state.loading) {
			this.setState({
				loading: true
			})

			const namespace = await ApiWrapper.getNamespace(this.props.name)

			this.setState({
				loading: false,
				natives: namespace.natives
			})
		}
	}

	render() {
		return (
			<Collapse 
				expanded={this.props.expanded}
				onExpand={() => this.loadNatives()}
				title={this.props.name} 
				color="primary-dark">
				<Surface color="light" padding="10px">
					{
						!this.state.natives.length ? 
							<LoadingIcon color="dark" size="30" /> :
							this.state.natives.map(native => (
								<Native key={native.hash} data={native} />
							))
					}
				</Surface>
			</Collapse>
		)
	}
}
