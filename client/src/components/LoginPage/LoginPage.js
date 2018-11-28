import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userActions } from '../../actions/userActions';
import {
	Avatar,
	Button,
	CssBaseline,
	FormControl,
	FormControlLabel,
	Checkbox,
	Input,
	InputLabel,
	Paper,
	Typography,
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogContent,
	DialogActions,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './loginStyle';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		console.log(props);

		this.state = {
			username: '',
			password: '',
			open: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ open: nextProps.open });
	}

	handleSubmit = e => {
		e.preventDefault();

		const { username, password } = this.state;
		const { dispatch } = this.props;
		if (username && password) {
			dispatch(userActions.login(username, password));
		}
	}

	render() {
		const { loggingIn, classes } = this.props;
		const { username, password } = this.state;
		return (
			<Dialog
				open={this.state.open}
				onClose={this.props.close}
				scroll="body"
			>
					<Fragment>
						<CssBaseline />
						<main className={classes.layout}>
							<Paper elevation={0} className={classes.paper}>
								<Avatar className={classes.avatar}>
									<LockIcon />
								</Avatar>
								<Typography component="h1" variant="h5">
									Sign in
								</Typography>
								<form className={classes.form} name="form" onSubmit={this.handleSubmit}>
									<FormControl
										margin="normal"
										required
										fullWidth
									>
										<InputLabel htmlFor="username">Username</InputLabel>
										<Input
											id="username"
											name="username"
											value={username}
											onChange={this.handleChange}
										/>
									</FormControl>
									<FormControl
										margin="normal"
										required
										fullWidth
									>
										<InputLabel htmlFor="password">Password</InputLabel>
										<Input
											name="password"
											type="password"
											id="password"
											value={password}
											onChange={this.handleChange}
										/>
									</FormControl>
									<FormControlLabel
										control={<Checkbox value="remember" color="primary" />}
										label="Remember me"
									/>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Sign in
							</Button>
									{loggingIn &&
										<img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
									}
								</form>
							</Paper>
						</main>
					</Fragment>
			</Dialog>
		);
	}
}

LoginPage.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	const { loggingIn } = state.authentication;
	return {
		loggingIn
	};
}

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));