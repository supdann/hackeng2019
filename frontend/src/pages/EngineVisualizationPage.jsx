import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import * as functions from '../helpers/redux'

import { push } from 'connected-react-router'

import ThreeContainer from '../components/ThreeJS'

const styles = {
	containerStyle: {
		padding: "20px",
		paddingTop: "70px",
		background: "linear-gradient(-135deg, #c850c0, #4158d0)",
		minHeight: "100vh",
		display: "flex",
		width: "100%",
		justifyContent: "center"
	}
}


class EngineVisualizationPage extends React.Component {

	onSubmit() { }

	componentDidMount() {
	
	}

	render() {

		const { classes } = this.props

		return (
			<div className="limiter">
				<div className={classes.containerStyle} >
					<ThreeContainer/>
				</div>
			</div>
		)
	}
}

export default connect(({ state }) => { return { ...state } }, { ...functions, push })(withStyles(styles)(EngineVisualizationPage))