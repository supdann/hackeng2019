import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import * as functions from '../helpers/redux'

import { Chart } from 'react-google-charts';

import { push } from 'connected-react-router'

import loaderImg from '../ring2.svg'

const styles = {
	currentValuesContainer: {

	},
	containerStyle: {
		padding: "20px",
		paddingTop: "70px",
		background: "linear-gradient(-135deg, #c850c0, #4158d0)",
		minHeight: "100vh",
		display: "flex",
		width: "100%",
		justifyContent: "center"
	},
}

class EngineDataPage extends React.Component {

	onSubmit() { }

	async componentDidMount() {
		try {
			this.props.setLoading()
			setInterval(async () => {
				const response = await this.props.loadEngineData(this.props.match.params.id)
			}, 1000)
		} catch (e) { console.log(e) }

	}

	render() {

		const { classes } = this.props

		if (this.props.loading) {
			return (
				<div className="limiter">
					<div className={classes.containerStyle} >
						<img src={loaderImg} />
					</div>
				</div>
			)
		}

		return (
			<div className="limiter" > <div className="container-login100" style={{ marginTop: "30px" }} >


				<div className={classes.currentValuesContainer}>

				</div>

				<div className="wrap-login100" style={{ marginTop: "40px", padding: "30px" }}>
					<div style={{ paddingBottom: "20px" }}>Humidity</div>
					<Chart
						width={'100%'}
						height={'150px'}
						chartType="Line"
						loader={<div>Loading Chart</div>}
						data={this.props.humidityValues}
						options={{
							hAxis: {
								title: 'Timestamp',
							},
							vAxis: {
								title: 'Popularity',
							},
							legend: "none"
						}}
						rootProps={{ 'data-testid': '1' }}
					/>
				</div>

				<div className="wrap-login100" style={{ marginTop: "20px", padding: "30px" }}>
					<div style={{ paddingBottom: "20px" }}>Temperature</div>
					<Chart
						width={'100%'}
						height={'150px'}
						chartType="Line"
						loader={<div>Loading Chart</div>}
						data={this.props.temperatureValues}
						options={{
							hAxis: {
								title: 'Time',
							},
							vAxis: {
								title: 'Popularity',
							},
							legend: "none"
						}}
						rootProps={{ 'data-testid': '1' }}
					/>
				</div>

				{/* <div className="wrap-login100" style={{ marginTop: "20px", padding: "30px" , marginBottom:"30px"}}>
					<div style={{ paddingBottom: "20px" }}>Pressure</div>
					<Chart
						width={'100%'}
						height={'150px'}
						chartType="Line"
						loader={<div>Loading Chart</div>}
						data={this.props.humidityValues}
						options={{
							hAxis: {
								title: 'Time',
							},
							vAxis: {
								title: 'Popularity',
							},
							legend: "none"
						}}
						rootProps={{ 'data-testid': '1' }}
					/>
				</div> */}

			</div></div>
		)
	}
}

export default connect(({ state }) => { return { ...state } }, { ...functions, push })(withStyles(styles)(EngineDataPage))