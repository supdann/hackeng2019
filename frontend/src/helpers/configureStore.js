// configureStore.js // https://github.com/supasate/connected-react-router

// Browser History: Thanks to https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4 
import { createBrowserHistory } from 'history'

import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
// import demoPageReducer from '../redux/ChatDemo'
import thunk from 'redux-thunk'

// Connected React Router Implementation - https://github.com/supasate/connected-react-router
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import reducer from './redux'

export const history = createBrowserHistory()

const createRootReducer = (history) => combineReducers({
	router: connectRouter(history),
	// state: demoPageReducer,
	state: reducer
})

export default function configureStore(preloadedState) {
	const store = createStore(
		createRootReducer(history), // root reducer with router state
		preloadedState,
		compose(
			applyMiddleware(
				routerMiddleware(history), // for dispatching history actions
				// ... other middlewares ...
				thunk
			),
		),
	)
	return store
}