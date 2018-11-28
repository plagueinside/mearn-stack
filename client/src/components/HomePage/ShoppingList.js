import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getSteps, createStep, nextStep } from '../../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

  constructor(props) {
		super(props);

		this.state = {
			answer: ''
		};

		this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getSteps();
  }

  toggle = step => {
    this.props.createStep(step);
  }
  
  handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
  }
  
  handleSubmit = (e, step) => {
    this.props.nextStep(e, step);
	}

  render() {
    const { steps, loading, error, end }= this.props.item;
    const { answer } = this.state;
    let step = steps[0] ? steps[0].step: 0;
    let text = steps[0] ? steps[0].text: '';
    console.log(end)
    return (
      <div>
      {(Boolean(+step) || loading) ? null :
        <div>
          <p>С этого момента вы являетесь участником захватывающего и будоражущего ваше сознание квеста. Будьте готовы к опастностям, которые могут вас подстерегать.</p>
          <p>Прежде чем приступить к данному испытанию ознакомтесь с правилами и инструкциями:</p>
          <p>1) в случае затруднений, спустя каждые 15 минут появляется возможность обратиться к мудрейшему, однако помните, что за его помощь вам придется заплатить высокую цену :)</p>
          <p>2) после истечения времени, отведенного на данные испытания, город подарков закроется и вы потеряете к нему доступ.</p>
          <p>3) не забывайте записывать все свои ответы, они вам еще пригодятся!!!</p>
          <p>Удачи вам в вашей охоте за подарками!!!</p> 
          <Button
            colort="dark"
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle.bind(this, 0)}
          >Приступить</Button>
        </div>
      }
      {Boolean(+step) ?
      <div>
        <p>{text}</p>
        { !end ?
        <div>
          <input type="text" className="form-control" name="answer" value={answer} onChange={this.handleChange} />
          <Button
            colort="dark"
            style={{ marginBottom: '2rem' }}
            onClick={this.handleSubmit.bind(this, answer, step)}
          >Ответить</Button>
          {error ? <div className="help-block">Неправильный ответ!</div> : null}
        </div> : null}
      </div>
      : null}
      </div>
    );
  }
}

ShoppingList.propTypes = {
  getSteps: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item
});
export default connect(mapStateToProps,{ getSteps, nextStep, createStep })(ShoppingList);