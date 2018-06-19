import React, { Component } from 'react';
import Balance from './Balance';
import Send from './Send';

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<Send cryptoCurrency={'eth'} options={true} />
				<hr/>
				<Balance crypto={"eth"} fiat={"usd"}/>				
			</div>
		);
	}
}

export default App;
