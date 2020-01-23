import React, { Component } from 'react';
import TodoList from './TodoList';
import Timer from './Timer';
import deleteIcon from './delete.svg'

export default class ClassItem extends Component {



	render() {
		const classes  = this.props.classes;
		const deleteClass = this.props.deleteClass;

		if(!classes || classes.length === 0) {
			return(<h2 className="noClasses">Add a class to get started!</h2>);
		}
		else {

				return (
					<div>
					{classes.map((item, index) =>
						<div className="classItem" key={index}>
						<h2 className="ClassName">{item.className}</h2>
						<img 
						src={deleteIcon} 
						alt="Delete Class" 
						onClick={() => deleteClass(index)}
						className="deleteClass"></img>
						<div className="classGrid">
						<Timer 
						countDownString={item.countDownString}
						/>
						<TodoList 
						addTodo = {this.props.todoFunc}
						todoCheck = {this.props.todoCheck}
						deleteTodo = {this.props.deleteTodo}
						index = {index}
						todos = {item.todos}
						/>
						</div>
						</div>
						)}
					</div>
					);
			}
		}
	}

