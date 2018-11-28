import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';
import { Switch, Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage'
import VisitPage from './components/VisitPage/VisitPage'
import { history } from './helpers';
import { alertActions } from './actions';
import { connect } from 'react-redux';
import { PrivateRoute } from './privateRoute/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    this.state = {
			open: false
    };
    
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({open: true})
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
          <Router history={history}>
            <Switch>
              <PrivateRoute exact path="/main" component={HomePage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/" component={VisitPage} />
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);
