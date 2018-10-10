import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toogle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">
              ShoppingList
            </NavbarBrand>
            {loggedIn &&
              <NavbarToggler onClick={this.toogle}>
              </NavbarToggler>
            }
            {loggedIn &&
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className='ml-auto' navbar>
                  <NavItem>
                    <NavLink href="/login">
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            }
          </Container>
        </Navbar>
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

export default connect(mapStateToProps)(AppNavbar);