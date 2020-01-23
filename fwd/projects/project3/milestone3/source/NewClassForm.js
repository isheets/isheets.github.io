import React, { Component } from 'react';
import deleteIcon from './delete.svg'

export default class NewClassForm extends Component {



	render() {
		var textInput;
		var classInput;

		function handleKeyPress(event) {
			if(event.key === 'Enter'){
				this.props.onButtonClick(event, textInput, classInput);
			}
		}

		const onButtonClick = this.props.onButtonClick;
		const onClick = this.props.onClick


		function buttonCLick(e)
		{
			e.preventDefault();
			onButtonClick(textInput, classInput);
			onClick();
		}

		function hidePopup(e) {
			e.preventDefault();
			onClick();
		}

		return(
			<div className="addClassForm">
			<img 
			src={deleteIcon} 
			alt="Delete Class" 
			className="ExitAddClass"
			onClick={e => hidePopup(e)}></img>
			<h2>Add Class</h2>
			<form className="inputForm">
			<input className="classNameEnter"type="text" placeholder="class name" ref={input => classInput=input}></input>
			<input className="timeDate"type="datetime-local" ref={input => textInput=input}></input> 
			<button onClick={e => buttonCLick(e)} className="addClass">add</button>

			</form>
			</div>
			);
	}
}