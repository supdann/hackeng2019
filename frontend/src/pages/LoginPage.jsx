import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import * as functions from '../helpers/redux'

import { push } from 'connected-react-router'

import loaderImg from '../ring2.svg'

const styles = {

}

class LoginPage extends React.Component {

	onSubmit(e) {
		e.preventDefault()
		this.props.setLoggedIn(true)
		this.props.push('/engine/list')
		// Timer Login Success 
		// Then redirect

	}

	render() {
		return (
			<div className="limiter">
				<div className="container-login100" style={{marginTop: "30px"}}>
					<div className="wrap-login100">
						<div className="login100-pic js-tilt" data-tilt>
							<img src="images/rr2.png" alt="IMG" />
						</div>

						<form className="login100-form validate-form" onSubmit={(e) => this.onSubmit(e)}>
							<span className="login100-form-title"> Dashboard Login </span>

							<div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
								<input className="input100" type="text" name="email" autoComplete="off" placeholder="Email" />
								<span className="focus-input100"></span>
								<span className="symbol-input100">
									<i className="fa fa-envelope" aria-hidden="true"></i>
								</span>
							</div>

							<div className="wrap-input100 validate-input" data-validate="Password is required">
								<input className="input100" type="password" name="pass" placeholder="Password" />
								<span className="focus-input100"></span>
								<span className="symbol-input100">
									<i className="fa fa-lock" aria-hidden="true"></i>
								</span>
							</div>

							<div className="container-login100-form-btn"> <button className="login100-form-btn"> Login </button> </div>

							<div className="text-center p-t-12"></div>
							<div className="text-center p-t-136"> </div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(({ state }) => { return { ...state } }, { ...functions, push })(withStyles(styles)(LoginPage))
