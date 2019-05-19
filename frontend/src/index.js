import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './helpers/serviceWorker'

// Custom Components
import Menu from './components/Menu'
import LoginPage from './pages/LoginPage'
import EngineListPage from './pages/EngineListPage'
import EngineDataPage from './pages/EngineDataPage'
import EngineVisualizationPage from './pages/EngineVisualizationPage'

// Routing
import { Switch, Route } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'

// Connected React Router store
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './helpers/configureStore'

const store = configureStore(/* provide initial state if any */)

ReactDOM.render((
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Menu/>
				<Switch>
					<Route exact path='/' component={LoginPage} />
					<Route exact path='/visual' component={EngineVisualizationPage} />
					<Route exact path='/engine/list' component={EngineListPage} />
					<Route exact path='/engine/by-id/:id' component={EngineDataPage} />
				</Switch>
			</div>
		</ConnectedRouter>
	</Provider>
), document.getElementById('root'))

serviceWorker.register()
