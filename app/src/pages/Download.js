import React from 'react'
import { Surface, Button, Checkbox } from '../components'
import { NativeSignature } from './components'
import ApiWrapper from '../common/api'
import { saveAs } from 'file-saver'

export default class Download extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			previewNative: {
				return_type: 'float',
				name: 'GET_ENTITY_HEALTH',
				hash: '0xEEF059FAD016D209',
				jhash: '0x8E3222B7',
				build: '323',
				params: [
					{
						type: 'Entity',
						name: 'entity'
					}
				],
				description: 'Gets the health of an entity'
			},
			useTypedefs:    true ,
			usePascalCase:  false,
			exportHashes:   true ,
			exportComments: false,
			downloading:    false,
		}
	}

	async onFormSubmit(e) {
		e.preventDefault()
		if (this.state.downloading) {
			return
		}

		this.setState({
			downloading: true
		})

		const file = await ApiWrapper.downloadNatives(
			this.state.useTypedefs,
			this.state.usePascalCase,
			this.state.exportHashes,
			this.state.exportComments
		)

		const blop = new window.Blob([file], {type: 'text/plain;charset=utf-8'})
		saveAs(blop, 'natives.hpp')

		this.setState({
			downloading: false
		})
	}

	onUseTypedefsToggle(val) {
		this.state.previewNative.params[0].type = val ? 'Entity' : 'int'

		this.setState({
			useTypedefs: val,
			previewNative: this.state.previewNative
		})
	}

	onUsePascalCaseToggle(val) {
		this.state.previewNative.name = val ? 'GetEntityHealth' : 'GET_ENTITY_HEALTH'

		this.setState({
			usePascalCase: val,
			previewNative: this.state.previewNative
		})
	}

	onExportHashesToggle(val) {
		this.setState({
			exportHashes: val
		})
	}

	onExportCommentsToggle(val) {
		this.setState({
			exportComments: val
		})
	}

	render() {
		return (
			<div style={{
				margin: '24px', 
				alignSelf: 'baseline', 
				boxShadow: '5px 5px 6px 0px var(--shadow-color)',
				backgroundColor: 'var(--light)',
				padding: '10px'
			}}>
				<h2 style={{marginTop: 0}}>Download</h2>
				<form onSubmit={this.onFormSubmit.bind(this)}>
					<h4 style={{marginBottom: 5}}>Settings</h4>
					<Checkbox 
						onToggle={this.onUseTypedefsToggle.bind(this)}
						checked={this.state.useTypedefs}
						title="Use Typedefs" />
					<Checkbox 
						onToggle={this.onUsePascalCaseToggle.bind(this)}
						checked={this.state.usePascalCase}
						title="Use PascalCase" />
					<Checkbox 
						onToggle={this.onExportHashesToggle.bind(this)}
						checked={this.state.exportHashes}
						title="Export Hashes" />
					<Checkbox 
						onToggle={this.onExportCommentsToggle.bind(this)}
						checked={this.state.exportComments} 
						title="Export Comments" /> 
					<h4 style={{marginBottom: 5}}>Preview</h4>
					<Surface
						color="lighter"	
						padding="10px"
						shadow="5px 5px 9px 0px var(--shadow-color)"
					>
						{this.state.exportComments ? <pre style={{color: 'var(--success-dark)', margin: '0px'}}>{'//'} {this.state.previewNative.description}</pre> : ''}
						<NativeSignature hideComments={!this.state.exportHashes} native={this.state.previewNative} />
					</Surface>
					<br />
					<Button loading={this.state.downloading} type="primary" title="Export" />
				</form>
			</div>
		)
	}
}
