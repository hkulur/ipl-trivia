import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {curveCatmullRom} from 'd3-shape';

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

import  { DATA_SUCCESS, fetchData } from '../actions'

import '../styles/normalize.css'
import '../styles/global.css'
import '../styles/react-vis.css'
import './Home.css'

class Home extends Component{

	componentDidMount(){

		const { dispatch } = this.props;

		dispatch( fetchData() );
	}

	render(){

		const { matches } = this.props;
		console.log(matches);
		let plot1 = [];

		matches.forEach( function( match, index ){

			var xArr = plot1.map( item => item.x ),
				idx = xArr.indexOf( Number( match['Season_Id'] ) ); 
			
			if( idx !== -1 ){

				if( match['Toss_Winner_Id'] === match['Match_Winner_Id'] )
					
					plot1[idx].y++;

			}else{

				plot1.push({
					x : Number(match['Season_Id']),
					y : match['Toss_Winner_Id'] === match['Match_Winner_Id'] ? 1 : 0
				})
			}

		});

		let xDomain = [0, 10],
			yDomain = [25, 45],
			xAxisOn0 = true,
			yAxisOn0 = true;

		console.log( plot1 );

		return(

			<div className="text-center">
				<h2> Toss wins vs Match wins</h2>
				<div className="display-inline-block">
					<XYPlot
						width={300}
						height={300} {...{xDomain, yDomain} } >
						<HorizontalGridLines />
						<VerticalGridLines />
						<XAxis title="Seasons" />
						<YAxis on0={yAxisOn0} title="Match wins after winning the toss"/>
						<LineSeries
						  className="first-series"
						  data={plot1}/>
					</XYPlot>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		matches : state.matches || []
	}
}

export default connect(
	mapStateToProps
)(Home);