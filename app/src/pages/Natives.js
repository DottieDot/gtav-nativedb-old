import React from 'react'
import { Namespace } from './components'
import ApiWrapper from '../common/api'
import { Button, LoadingIcon } from '../components'

export default class Natives extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			loading: true,
			namespaces: [],
			expanded: []
		}
	}

	componentDidMount() {
		this.loadNamespaces()
	}

	async loadNamespaces() {
		if (!this.state.namespaces.length) { // Just in case
			const namespaces = await ApiWrapper.getNamespaces()

			this.setState({
				loading: false,
				namespaces: namespaces,
			})
		}
	}

	expandAll() {
		this.setState({
			allExpanded: true
		})
	}

	collapseAll() {
		this.setState({
			allExpanded: false
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<div style={{margin: '20px'}}>
					<LoadingIcon color="dark" size="50" /> 
				</div>
			)
		} 

		return (
			<div style={{margin: '20px'}}>
				<Button onClick={this.expandAll.bind(this)} title="Expand All" />
				<Button onClick={this.collapseAll.bind(this)} title="Collapse All" />
				<div style={{height: '20px'}} />
				<div ref="namespaces">
					{this.test = this.state.namespaces.map(namespace => (
						<Namespace expanded={this.state.allExpanded} key={namespace.name} name={namespace.name} />
					))}
				</div>
			</div>
		)
	}
}
