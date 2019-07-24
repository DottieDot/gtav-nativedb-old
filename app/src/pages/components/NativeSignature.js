import React from 'react'
import './css/NativeSignature.css'

const validTypes = [
	'int',
	'float',
	'bool',
	'const char*',
	'Entity',
	'Ped',
	'Object',
	'Interior',
	'FireId',
	'Cam',
	'Vehicle',
	'ScriptHandle',
	'Hash',
	'Vector3',
	'int*',
	'float*',
	'bool*',
	'Entity*',
	'Ped*',
	'Object*',
	'Interior*',
	'FireId*',
	'Cam*',
	'Vehicle*',
	'ScriptHandle*',
	'Hash*',
	'Vector3*'
]


class NativeTypeSelect extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedValue: this.props.defaultValue || ''
		}
	}

	render() {
		return (
			<select defaultValue={this.state.selectedValue}>
				{validTypes.map(v => (
					<option key={v} className="native-type" value={v}>{v}</option>
				))}
			</select>
		)
	}
}

export default class NativeSignature extends React.Component {
	render() {
		if (this.props.editable) {
			return (
				<span style={{fontWeight: '600'}}>
				<NativeTypeSelect defaultValue={this.props.native.return_type} />
				{ this.props.native.name[0] === '_' ? 
					<input className="native-name" defaultValue={this.props.native.name} /> : 
					<span className="native-name">{this.props.native.name}</span> }
				(
				<span className="native-params">
					{this.props.native.params.map(param => (
						<span key={param.name}>
							<NativeTypeSelect defaultValue={param.type} /> 
							<span className="native-param"><input defaultValue={param.name} /><span>, </span></span>
						</span>
					))}
				</span>
				)
				{
					this.props.hideComments ? <span></span> : <span className="native-hashes"> {'//'} {this.props.native.hash} {this.props.native.jhash} b{this.props.native.build}</span>
				}
			</span>
			)
		}

		return (
			<span style={{fontWeight: '600'}}>
				<span className="native-type">{this.props.native.return_type} </span>
				<span className="native-name">{this.props.native.name}</span>
				(
				<span className="native-params">
					{this.props.native.params.map(param => (
						<span key={param.name}>
							<span className="native-type">{param.type} </span>
							<span className="native-param">{param.name}<span>, </span></span>
						</span>
					))}
				</span>
				)
				{
					this.props.hideComments ? <span></span> : <span className="native-hashes"> {'//'} {this.props.native.hash} {this.props.native.jhash} b{this.props.native.build}</span>
				}
			</span>
		)
	}
}
