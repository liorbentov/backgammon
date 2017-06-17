import React from 'react';
import MainMenu from './MainMenu';
import Loading from './Loading';
import { Route } from 'react-router-dom';
import GameZone from '../containers/GameZone';
import styles from './mainPageStyle.css';

class MainPage extends React.Component{

	constructor(props){
		super(props);
	}

	render() {
		const statistics = () => <Loading message={"Loading statistics"}>
									{"under construction"}
								</Loading>;
		return <div className={styles.mainPage}>
					<MainMenu logout={this.props.logout} menuItems={[{to:"/main/game" ,name:"game"},{to:"/main/statistics" ,name:"statistics"}]} />
					<div className={styles.mainContent} >
						<Route path="/main/game" component={GameZone}/>
						<Route path="/main/statistics" component={statistics}/>
					</div>
				</div>;
	}
}

export default MainPage