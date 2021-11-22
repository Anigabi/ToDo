import React, { useState, useEffect } from "react";
import Task from "./task.jsx";

const Home = () => {
	const INPUT = document.querySelector("input");
	const [list, setList] = useState([]);
	const [toDoList, setToDoList] = useState([]);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/anag", {
			method: "GET"
		})
			.then(response => {
				console.log(response);
				if (response.ok) {
					return response.json();
				}
				throw new Error("Fail");
			})
			.then(responseAsJSON => {
				setList(responseAsJSON);
				console.log(responseAsJSON);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/anag", {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response);
				if (response.ok) {
					return response.json();
				}
				throw new Error("Failing updating list");
			})
			.then(responseAsJSON => {
				console.log(responseAsJSON);
			})
			.catch(error => {
				console.log(error);
			});
	}, [update]);

	useEffect(() => {
		setToDoList(
			list.map((tasks, index) => {
				return (
					<Task
						label={tasks.label}
						key={index.toString()}
						id={index.toString()}
						task={tasks}
						delete={handleRemoveItem}
						cross={crossItem}
					/>
				);
			})
		);
	}, [list]);

	const handleRemoveItem = indexList => {
		setList(list.filter((_, index) => index != indexList));
	};

	const crossItem = taskLabel => {
		let updatedTasks = list.map(task => {
			if (task.label == taskLabel) {
				return { label: task.label, done: !task.done };
			}
			return task;
		});
		setList(updatedTasks);
		setUpdate(true);
	};

	return (
		<div className="ContainerToDo">
			<div className="todoList">
				<h2>To Do List</h2>
				<form
					onSubmit={event => {
						event.preventDefault();
						setUpdate(true);
						setList([...list, { label: INPUT.value, done: false }]);
						INPUT.value = "";
					}}>
					<input type="text" placeholder="Things to be done" />
				</form>
				<ul>{toDoList}</ul>
			</div>
		</div>
	);
};

export default Home;
