import React from 'react'

// Material UI Stuff
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { Link, Switch, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import * as functions from '../helpers/redux'

const styles = theme => ({

	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	menuLinkStyle: {
		display: 'block',
		textDecoration: 'none',
		width: "100%",
		height:"100%"
	},
	paper: {
		marginRight: theme.spacing.unit * 2,
	},

	buttonTextStyle: {
		fontSize:"17px"
	}

})

class Menu extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			open: false,
			menuOptionSelected: null
		}
	}

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = (event, path) => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};

	render() {

		const { classes } = this.props
		const { open } = this.state

		if(!this.props.showMenu){
			return null
		}

		return (
			<AppBar style={{backgroundColor: "white", color:"#777"}}>
				<Toolbar >
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu"
						buttonRef={node => { this.anchorEl = node }}
						aria-owns={open ? 'menu-list-grow' : undefined}
						aria-haspopup="true"
						onClick={this.handleToggle}>
						<MenuIcon />
						<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									id="menu-list-grow"
									style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
								>
									<Paper>
										<ClickAwayListener onClickAway={this.handleClose}>
											<MenuList>
												<MenuItem><Link className={classes.menuLinkStyle} to='/'>Home</Link></MenuItem>
												<MenuItem><Link className={classes.menuLinkStyle} to='/engine/list'>Engine List</Link></MenuItem>
												<MenuItem><Link className={classes.menuLinkStyle} to='/logout'>Logout</Link></MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</IconButton>
					<Typography variant="h6" color="inherit" className={classes.grow}>

						<Switch>
							<Route exact path='/' render={() => (<div className={classes.buttonTextStyle}>Home</div>)} />
							<Route exact path='/engine/by-id/:id?' render={() => (<div className={classes.buttonTextStyle}>Engine Details</div>)} />
							<Route exact path='/engine/list' render={() => (<div className={classes.buttonTextStyle}>List of Engines</div>)} />
						</Switch>

					</Typography>
					{/* <Button color="inherit">Login</Button> */}
				</Toolbar>
			</AppBar>
		)
	}
}


// Connect all state props and functions
export default connect(({ state }) => { return { ...state } }, { ...functions })(withStyles(styles)(Menu))
