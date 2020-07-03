import React, { Component } from 'react';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import uuid from 'uuid';


import './App.css';

class App extends Component {
	state = {
		todos: [
			{
				id: uuid.v4(),
				title: 'Estudar react',
				completed: false
			},
			{
				id: uuid.v4(),
				title: 'Estudar vue',
				completed: false
			},
			{
				id: uuid.v4(),
				title: 'Estudar php',
				completed: false
			}
		]
	};

	markComplete = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					todo.completed = !todo.completed;
				}
				return todo;
			})
		});
	};

	delTodo = (id) => {
		this.setState({
			todos: [...this.state.todos.filter(todo => todo.id !== id)]
		});
	}

	addTodo = (title) => {
		const newTodo = {
			id: uuid.v4(),
			title,
			completed: false
		}
		this.setState({ todos: [...this.state.todos, newTodo] });
	}

	render() {
		return (
			<div className="App">
				<div className="container">
					<Header />
					<AddTodo addTodo={this.addTodo} />
					<Todos
						todos={this.state.todos}
						markComplete={this.markComplete}
						delTodo={this.delTodo}
					/>
				</div>
			</div>
		);
	}
}


export default App;
