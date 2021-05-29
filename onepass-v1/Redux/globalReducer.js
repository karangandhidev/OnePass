import {combineReducers ,createStore} from 'redux'
import {reducer} from './auth'
import preference from './passpreference'
const reducers = combineReducers({reducer,preference})

export const store = createStore(reducers)