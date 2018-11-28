import React, { Component } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { userActions } from '../../actions';

class VisitPage extends Component {
  constructor(props) {
    super(props);

    // reset login status
		this.props.dispatch(userActions.logout());

    this.state = {
      open: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true })
  }

  closeModal() {
		this.setState({open: false});
	}

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>click Me</Button>
        <LoginPage open={this.state.open} close={this.closeModal}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggedIn } = state.authentication;
	return {
		loggedIn
	};
}

export default connect(mapStateToProps)(VisitPage);
