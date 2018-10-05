import React, { Component } from 'react';
import ShoppingList from './ShoppingList';
import ItemModal from './itemModal';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

class HomePage extends Component {
	render() {
		return (
			<Container>
				<ItemModal />
				<ShoppingList />
			</Container>
		);
	}
}

export default connect()(HomePage);
