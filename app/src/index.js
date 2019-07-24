import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './pages/About'
import Natives from './pages/Natives'
import Download from './pages/Download'
import * as serviceWorker from './serviceWorker';
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'
import 'typeface-roboto';
import '@fortawesome/fontawesome-free/css/all.css'
import './components/css/Theme.css'

const routes = (
  <Route path="/" component={App}>
		<IndexRedirect to="/natives" />
    <Route path="natives" component={Natives} />
		<Route path="download" component={Download} />
		<Route path="about" component={About} />
  </Route>
);

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
