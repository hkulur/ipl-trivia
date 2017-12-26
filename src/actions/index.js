import fetch from 'isomorphic-fetch'

import {csv} from 'd3-request';

export const DATA_SUCCESS = 'DATA_SUCCESS';


function dispatchAction( type, payload ){

	return function( dispatch ){

		dispatch( { type : type, payload : payload })
	}
}

export function fetchData(){

	return function( dispatch ){

		csv('/ipl-data/Match.csv', (error, data) => {

			if ( error ) {

			  //dispatch action
			  console.log( 'error: ', error);
			}

			dispatch ( dispatchAction( DATA_SUCCESS, data ) );
		})
	}
}