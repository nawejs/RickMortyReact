import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import useReducer, { restoreSessionAction } from './userDuck'
import charactersReducer, { getCharacterAction } from './charactersDuck'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    user: useReducer,
    characters: charactersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )

    // looking for characters for the first time
    getCharacterAction()(store.dispatch, store.getState)
    restoreSessionAction()(store.dispatch)
    return store
}