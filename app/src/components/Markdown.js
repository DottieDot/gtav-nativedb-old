import React from 'react'
import Showdown from 'showdown'
import createDOMPurify from 'dompurify'

const DOMPurify = createDOMPurify()

const converter = new Showdown.Converter()
converter.setFlavor('github')

export default class Markdown extends React.Component {
	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(converter.makeHtml(this.props.markdown))}}></div>
		)
	}
}
