import React, { Component, PropTypes }  from 'react';

import styles from './app.css';

const randomize = (maxNumber, minNumber = 0) => {
    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber + 1;
  }

class Dice extends React.Component {
  static propTypes = {
  };
  
	constructor(props) {
		super(props);
        this.state = ({degX:0, degY:0, degZ:0});
        this.updateDiceNumber = this.updateDiceNumber.bind(this);
	}


    componentWillMount(){
        // TODO unmount
        this.props.dicingFire[this.props.diceName] = this.updateDiceNumber;
    }

    updateDiceNumber(nextNumber){

        let nextDegX = 0;
        let nextDegY = 0;
        let nextDegZ = 0;

        switch (nextNumber){
            // case 1: {   
            //     break;
            // }
            case 2: {
                nextDegX = -90;
                break;
            }
            case 3: {
                nextDegY = -90;
                break;
            }
            case 4: {
                nextDegY = 90;
                break;
            }
            case 5: {
                nextDegX = -90;
                nextDegZ = 180;
                break;
            }
            case 6: {
                nextDegY = 180;
                break;
            }
            default: {
            }
        }

        const directX = (this.state.degX>0)?-1:1;
        const directY = (this.state.degY>0)?-1:1;
        nextDegX += randomize(1,0)*360*directX;
        nextDegY += randomize(1,0)*360*directY;
        this.setState({degX:nextDegX, degY:nextDegY, degZ:nextDegZ});
    }


  render() {
  	return (
    <div className={styles.cube} ref={this.props.divRef} 
        style={{transform:"rotateX("+this.state.degX+"deg) rotateY("+this.state.degY+"deg) rotateZ("+this.state.degZ+"deg)"}}>
        <div className={styles.one}>
            1
        </div>
        <div className={styles.two}>
            2
        </div>
        <div className={styles.three}>
            3        
        </div>
        <div className={styles.four}>
            4
        </div>
        <div className={styles.five}>
            5
        </div>
        <div className={styles.six}>
            6
        </div>
</div>)
  }
}

export default Dice