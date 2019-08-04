import React from 'react'
import './css/LoadingIcon.css'

import Icon from './Icon'

export default class LoadingIcon extends React.Component {
	render() {
		return (
      <div style={
        {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: this.props.align || 'center', 
          justifyContent: this.props.justify || 'center'
        }}
      >
			  <span className="loading-icon" style={{fontSize: `${this.props.size || 16}px`}}><Icon color={this.props.color} icon="spinner" /></span>
      </div>
		)
	}
}
