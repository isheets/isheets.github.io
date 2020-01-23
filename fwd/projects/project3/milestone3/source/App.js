import React, { Component } from 'react';
import NewClassForm from './NewClassForm';
import ClassItem from './ClassItem'

  //firebase stuff
  var Rebase = require('re-base');
  var firebase = require('firebase/app');
  require('firebase/database');
  var config = {
  	apiKey: "AIzaSyAHopfFrNrrdOrURhhGHHTjoAQwIYO6x5g",
  	authDomain: "the-finals-countown.firebaseapp.com",
  	databaseURL: "https://the-finals-countown.firebaseio.com",
  	projectId: "the-finals-countown",
  	storageBucket: "the-finals-countown.appspot.com",
  	messagingSenderId: "924389184060"
  };
  var app = firebase.initializeApp(config);
  var db = firebase.database(app);
  var base = Rebase.createClass(db);

  class App extends Component {

  	constructor(props) {
  		super(props);
  		this.state = {
  			classes: [],
  			show: false
  		};

  		this.addTodo = this.addTodo.bind(this);
  		this.handleTodoCheck = this.handleTodoCheck.bind(this);
  		this.deleteTodo = this.deleteTodo.bind(this);
  		this.deleteClass = this.deleteClass.bind(this);
  		this.addClass = this.addClass.bind(this);
  		this.showHide = this.showHide.bind(this);

  	}

  	addClass(textInput,classInput) {
  		
  		var classesCopy = this.state.classes;

  		if(classInput.value.length !== 0)
  		{
  			if(textInput.value.length !== 0) {
  				var time = textInput.value;
  				var date = new Date(time);
  				console.log(date);
  				console.log(date.getTime());

  				const newClass = {
  					className: classInput.value,
  					dateOfTest: date.getTime(),
  					countDownString: "",
  					todos: []
  				};

  				if(!classesCopy || classesCopy.length === 0) {
  					classesCopy[0] = newClass;
  				}
  				else{classesCopy.push(newClass);}

  				this.setState({
  					classes: classesCopy
  				});

  				textInput.value = '';
  				classInput.value = '';


  				base.post('classes', {
  					data: this.state.classes
  				});
  			}
  		}

  	}



  	componentWillMount() {
  		this.timerInterval = setInterval(this.timer.bind(this), 1000, true);


  		base.fetch('classes', {
  			context: this,
  			asArray: true,
  			then(data) {
  				console.log(data);
  				this.setState ({

  					classes: data
  				});
  			}
  		});
  	}

  	componentWillUnmount(){
  		clearInterval(this.timerInterval);
  	}


  	timer() {

  		var classesCopy = this.state.classes;
  		classesCopy.forEach((item, index) => {

  			var _second = 1000;
  			var _minute = _second * 60;
  			var _hour = _minute * 60;
  			var _day = _hour * 24;

  			var end = new Date(item.dateOfTest);
  			var now = new Date();

  			var distance = end - now;



  			if (distance < 0 ) {
  				if (item.countDownString !== "Your " + item.className + " test already happened.") {
  					alert("It's time for your " + item.className + " test! Good Luck!");
  					item.countDownString = "Your " + item.className + " test already happened.";
  				}
  			}

  			else {

  				var days = Math.floor(distance / _day);
  				var hours = Math.floor((distance % _day) / _hour);
  				var minutes = Math.floor((distance % _hour) / _minute);
  				var seconds = Math.floor((distance % _minute) / _second);
  				item.countDownString = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  			}


  		});


  		this.setState ({
  			classes: classesCopy
  		});

  		// base.post('classes', {
  		// 	data: this.state.classes
  		// });

  	}

  	addTodo(newTodo, index) {

  		var classesCopy = this.state.classes;
      //check to see if todos[] array exists
      if (!classesCopy[index].todos) {
        //if it doesn't already exist then create the array
        classesCopy[index].todos = [newTodo];
    }
    else {
        //todos[] exists so just push
        classesCopy[index].todos.push(newTodo);
    }

      //set state
      this.setState({
      	classes: classesCopy 
      });

      //post to firebase
      base.post('classes', {
      	data: this.state.classes
      });

  }

    //strike out a todo
    handleTodoCheck(classIndex, todoIndex) {

      //copy classes and get the current status of the checkbox
      var classesCopy = this.state.classes;
      var status = classesCopy[classIndex].todos[todoIndex].checked;

      //if the box was already checked then set it to true and vice versa
      if(status === false) {
      	classesCopy[classIndex].todos[todoIndex].checked = true;
      }
      else {

      	classesCopy[classIndex].todos[todoIndex].checked = false;
      }

      //set the state
      this.setState({
      	classes: classesCopy 
      });

      //post to firebase
      base.post('classes', {
      	data: this.state.classes
      });

  }

    //delete a todo item
    deleteTodo(classIndex, todoIndex) {

      //make a copy and delete the todo from the class at the specified index
      var classesCopy = this.state.classes;
      classesCopy[classIndex].todos.splice(todoIndex, 1);

      //set the state
      this.setState({
      	classes: classesCopy 
      });

      //post to firebase
      base.post('classes', {
      	data: this.state.classes
      });

  }

    //delete a class object frome the classes array in state
    deleteClass(index) {

      //make a copy and remove the class at the specified index
      var classesCopy = this.state.classes;
      classesCopy.splice(index, 1);

      //set the state
      this.setState({
      	classes: classesCopy 
      });

      //post to firebase
      base.post('classes', {
      	data: this.state.classes
      });

  }

  showHide(e)
  {
  	this.setState({
  		show: !this.state.show
  	});
  }




  render() {
  	return (
  		<div className="wrapper">
  		<h1 className="title">The Finals Countdown</h1>
  		<button className="addClassButton" onClick = {this.showHide}>Add Class</button>
  		{
  			this.state.show
  			?  <NewClassForm 
  			onButtonClick={this.addClass}
  			onClick={this.showHide}/>
  			: null
  		}

  		<ClassItem 
  		classes={this.state.classes}
  		todoFunc={this.addTodo}
  		todoCheck ={this.handleTodoCheck}
  		deleteTodo = {this.deleteTodo}
  		deleteClass = {this.deleteClass}
  		/>
  		</div>
  		);
  }


}

export default App;
