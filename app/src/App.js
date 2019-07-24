import React from 'react';
import { AppBar, Icon, Button, Menu, Layout, LoadingIcon } from './components'
import { browserHistory } from 'react-router'

export default class App extends React.Component {
	navigate() {
		const route = this.props.route

		if (route) {
			browserHistory.push(route)
		}
	}

	render() {
		return (
			<Layout>
				<Layout.Header>
					<AppBar color="lightest">
						<AppBar.Title onClick={() => browserHistory.push('/natives')}>NativeDB</AppBar.Title>
						<AppBar.Buttons>
							<Menu orientation="horizontal">
								<Menu.Item onClick={this.navigate} route="/natives">Natives</Menu.Item>
								<Menu.Item onClick={this.navigate} route="/download">Download</Menu.Item>
								<Menu.Item onClick={this.navigate} route="/about">About</Menu.Item>
							</Menu>
						</AppBar.Buttons>
					</AppBar>
				</Layout.Header>
				<Layout.Content>
					{this.props.children}
				</Layout.Content>
			</Layout>
		)
	}
}
