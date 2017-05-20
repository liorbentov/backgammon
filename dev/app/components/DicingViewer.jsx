import React, { Component, PropTypes }  from 'react';
import {INITIAL_STORE_STATE, CLIENT_STATUS} from '../constants';
import Dice from './Dice';
import styles from './app.css';

const randomize = (maxNumber) => {
    return Math.floor(Math.random() * maxNumber) + 1;
  }

// Cancel the container and use state?
 class DicingViewer extends React.Component {
  static propTypes = {
    //onDicing: PropTypes.func.isRequired,
    dice1: PropTypes.number.isRequired,
    dice2: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    clientTurn: PropTypes.bool.isRequired,
    doCubeAnimate : PropTypes.bool.isRequired
  };
  
  
	constructor(props) {
		super(props);
    this.cubeRef1;
    this.cubeRef2;
    this.oneDiceTransformed = false;
    this.dicingFire = {};
    this.message;
    this.state = {message:" "};
    this.onDicing = this.onDicing.bind(this);
    this.calcMessage = this.calcMessage.bind(this);
    this.dicesTransitionEndCallback = this.dicesTransitionEndCallback.bind(this);
	}

  dicesTransitionEndCallback(){

    if (this.props.clientTurn){
      if (this.oneDiceTransformed){
        this.calcMessage(this.props);
        this.oneDiceTransformed = false;
      }else{
        this.oneDiceTransformed = true;
      }
    }
  }

  componentDidMount(){
    this.cubeRef1.addEventListener("transitionend", this.dicesTransitionEndCallback);
    this.cubeRef2.addEventListener("transitionend", this.dicesTransitionEndCallback);
  }

  onDicing() {
    const dice1Number = randomize(6);
    const dice2Number = randomize(6);
    this.dicingFire.dice1(dice1Number);
    this.dicingFire.dice2(dice2Number);
    //this.setState({dice1:dice1Number, dice2:dice2Number});
    this.props.sendDicingResult(dice1Number, dice2Number);
  }

  calcMessage(props = this.props){
    
    let nextMessage = " ";

    if (props.clientTurn && props.diced && props.status === CLIENT_STATUS.STUCK){
          nextMessage = "You don't have legal moves. The turn will be switched in a few moments";
          props.switchTurnTimeout();  
    } else if (props.clientTurn){
      switch (props.status && props.diced){
        case CLIENT_STATUS.ONGOING:
          nextMessage = "Play as you wish";
          break;
        case CLIENT_STATUS.EATEN:
          nextMessage = "Insert the eaten checker first";
          break;
        case CLIENT_STATUS.DROPOUT:
          nextMessage = "You can drop out the chekcers";
          break;
        default: 
      }
    }


    this.setState({message:nextMessage});
  }

  render() {

    let message = this.state.message;
    let turnMessage = this.props.clientTurn?"Your Turn ":"Not your turn "

    // End match statuses.
    switch (this.props.status){
      case CLIENT_STATUS.LOSER:
        message = "You are a fucking Loser!!!!!!";
        turnMessage = " ";
        break;
      case CLIENT_STATUS.WINNER:
        message = "WINNER!!!!";
        turnMessage = " ";
        break;
      }

  	return (
      <div className={styles.dicingViewer}>
        <Dice diceName={"dice1"} dicingFire={this.dicingFire} divRef={el => this.cubeRef1 = el}/>
        <Dice diceName={"dice2"} dicingFire={this.dicingFire} divRef={el => this.cubeRef2 = el}/>

        <button className={styles.dicingButtom} 
          disabled={(!this.props.clientTurn || this.props.diced)} onClick={this.onDicing}>dice</button>
          <div className={styles.messagingContainer}>
            <font className={styles.message}>{turnMessage}</font>
            <font className={styles.message}>{message}</font>
          </div>
    	</div>
    )
  }

  componentWillReceiveProps(nextProps){
    // If it is the point the rival diced
    if (!nextProps.clientTurn && nextProps.diced && 
      !(!this.props.clientTurn && this.props.diced)){
        //this.setState({dice1:nextProps.dice1, dice2:nextProps.dice2});
        this.dicingFire.dice1(nextProps.dice1);
        this.dicingFire.dice2(nextProps.dice2);
    }

    if (!nextProps.clientTurn || !this.props.diced){
      this.setState({message:" "});
    }else{
      this.calcMessage(nextProps);
    }
  }

  componentWillUpdate(nextProps, nextState){
  }
}

export default DicingViewer