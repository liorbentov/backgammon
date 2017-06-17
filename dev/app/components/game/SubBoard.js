import React from 'react';
import Point from '../../containers/Point';
import styles from './app.css';

class SubBoard extends React.Component {

  shouldComponentUpdate(){
    return false;
  }

  render(){
  	const {style, pointsIds, isRotated} = this.props;

    var InSubBoard = ({pointsIds}) => (
      <div className={styles.subBoard} style={style}> 
        {pointsIds.map(pointId => 

          (<div className={styles.subBoardItem}>
            <div>
              {pointId}
            </div>
            <Point pointId={pointId} key={pointId} isRotated={isRotated}>
              <div data-key={pointId} className={styles.visualPoint}>
                  <svg className={styles.trianglePoint}>
                      <polygon points=""/>
                  </svg>
              </div>
            </Point>
          </div>)
        )}
      </div>);

    return <InSubBoard pointsIds={pointsIds}/>
  };
}

export default SubBoard