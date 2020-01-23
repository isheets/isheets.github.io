import React, { Component } from 'react';
import deleteIcon from './delete.svg'

export default class TodoItem extends Component {
	render() {

		const todos = this.props.todos;
		const classIndex = this.props.classIndex;
		const deleteTodo = this.props.deleteTodo;


		function todoStrike(checked) {
			return {
				textDecoration: checked ? 'line-through' : 'none',
			};
		}

		if(!todos || todos.length === 0) {
			return(<h4>Add something todo</h4>);
		}
		return (
			<div>
			{todos.map((item, index) =>
				<li className="todoItem" key={index}>
				<input 
				type="checkbox" 
				className="todoCheck" 
				onChange={() => this.props.todoCheck(classIndex, index)}>
				</input>
				<p 
				className="todoTitle"
				style={todoStrike(item.checked)} >
				{item.name}
				</p>
				<img src={deleteIcon} alt="Delete Todo" onClick={() => deleteTodo(classIndex, index)} className="deleteIcon"></img>
				</li>
				)}
			</div>
			);
	}


}
