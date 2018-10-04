import { combineReducers } from 'redux'

import  { DATA_SUCCESS } from '../actions'

function matches( state = [], action ){

	switch( !!action.type ){

		case DATA_SUCCESS : 

			return action.payload

		default : 

			return state

	}
}

const rootReducer = combineReducers({
	matches
})

export default rootReducer;
