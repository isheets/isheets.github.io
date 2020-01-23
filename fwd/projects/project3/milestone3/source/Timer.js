import React, { Component } from 'react';

export default class Timer extends Component {




	render() {
		const countdown = this.props.countDownString;



		return (
			<div className="timer">
			<h3 className="timerTitle">Time Until Test</h3>
			<h4 className="countdown">{countdown}</h4>
			</div>
			);


	}
}