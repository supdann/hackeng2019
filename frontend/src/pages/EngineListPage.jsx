import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import * as functions from '../helpers/redux'

import { push } from 'connected-react-router'

import loaderImg from '../ring2.svg'

const styles = {
	containerStyle: {
		padding: "20px",
		paddingTop: "70px",
		background: "linear-gradient(-135deg, #c850c0, #4158d0)",
		minHeight: "100vh",
		display: "flex",
		width: "100%",
		justifyContent: "center"
		// alignItems:"center"
	},
	gridItem: {
		flex: "1",
		borderRadius: "10px",
		backgroundColor: "white",
		margin: "10px",
		// padding: "20px",
		maxWidth: "280px",
		minWidth: "200px",
		cursor: "pointer",
		'&:hover': {
			background: "linear-gradient(-135deg, #c850c0, #4158d0)",
		},
	}, imageContainer: {
		// backgroundColor: "red",
		flex: "1",
		minHeight: "200px",
		boxShadow: "0 -8px 73px 0 rgba(0,0,0,0.2)",
		// backgroundImage:mtu_pic,
		// backgroundRepeat: "no-repeat",
		// backgroundAttachment: "fixed",
		// backgroundPosition: "center"
	},
	tempLabel: {
		backgroundColor: "transparent"
	}
}

const Engine = (props) => {
	const { classes, push, engine, key} = props
	return (
		<div className={classes.gridItem} onClick={e => { push(`/engine/by-id/${engine.engineID}`) }}>
			<div className={classes.imageContainer}>
				<img src={engine.image} style={{minHeight:"280px", maxWidth:"280px", borderRadius: "10px 10px 0 0"}}/>
				<div className={classes.tempLabel}>35 °C</div>
			</div>
		</div>
	)
}

class EngineListPage extends React.Component {

	onSubmit() { }

	componentDidMount() {
	
	}

	render() {

		const { classes } = this.props

		if (this.props.loading) {
			return (
				<div className="limiter">
					<div className={classes.containerStyle} >
						{/* <div style={{background:"url("+loaderImg+") no-repeat center center", width:"64px",height:"64px"}}></div> */}
						<img src={loaderImg} />
					</div>
				</div>
			)
		}

		return (
			<div className="limiter">
				<div className={classes.containerStyle} >
					{
						this.props.engines.map((engine, index) => {
							return (
								<Engine
									{...this.props}
									key={index}
									engine={engine}
								/>
							)
						})
					}
				</div>
			</div>
		)
	}
}

export default connect(({ state }) => { return { ...state } }, { ...functions, push })(withStyles(styles)(EngineListPage))