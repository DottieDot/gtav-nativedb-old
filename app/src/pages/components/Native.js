import React from 'react'
import { Collapse, Surface, Markdown, Button, LoadingIcon } from '../../components'
import ApiWrapper from '../../common/api'
import NativeSignature from './NativeSignature'
import './css/Native.css'
import copyToClipboard from '../../common/CopyToClipboard'

export default class Native extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			description: '',
			loading: true
		}

		this.loadingDescription = false
	}

	async loadDescription() {
		if (!this.loadingDescription)
		{
			this.loadingDescription = true
			const native = await ApiWrapper.getNative(this.props.data.hash)

			this.setState({
				loading: false,
				description: native.description
			})
		}
	}

	onCopyName() {
		copyToClipboard(this.props.data.name)
	}


	onCopyHash() {
		copyToClipboard(this.props.data.hash)
	}

	render() {
		return (
			<Collapse 
				onExpand={this.loadDescription.bind(this)}
				mode="dense"
				title={<NativeSignature native={this.props.data} />}>
				<Surface color="lighter" padding="10px">
					<h3 className="native-title">{this.props.data.namespace}::{this.props.data.name}</h3>
					<hr />
					<span style={{marginLeft: '5px'}}><NativeSignature editable={true} native={this.props.data} /></span>
					<hr />
					{
						this.state.loading ?
							(<><LoadingIcon color="dark" size="30" /><br /></>)  :
							<Markdown markdown={this.state.description} />
					}
					<Button onClick={this.onCopyName.bind(this)} title="Copy Name" mode="contained" />
					<Button onClick={this.onCopyHash.bind(this)} title="Copy Hash" color="secondary" mode="contained" />
				</Surface>
			</Collapse>
		)
	}
}
