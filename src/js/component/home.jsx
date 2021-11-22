import React, { Fragment, useEffect, useState } from "react";
import Task from "./task.jsx";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/anag";

const Home = () => {
	const [list, setList] = useState([]);
	const [listOfComponents, setListOfComponents] = useState([]);
	const [failOnUpdating, setFailOnUpdating] = useState("");
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		fetch(URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Fail on load");
			})
			.then(responseAsJSON => {
				setUpdate(false);
				setList(responseAsJSON);
			})
			.catch(error => {
				setFailOnUpdating(error.message);
			});
	}, []);

	useEffect(() => {
		if (list.lenght != 0) {
			fetch(URL, {
				method: "PUT",
				body: JSON.stringify(list),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (response.ok) {
						setUpdate(false);
					} else {
						throw new Error("Failing updating task List");
					}
				})
				.catch(error => setFailOnUpdating(error.message));
		}
	}, [update]);

	useEffect(() => {
		if (list.length != 0) {
			setListOfComponents(
				list.map((inputValue, index) => {
					return (
						<Task
							key={index.toString()}
							id={index.toString()}
							label={inputValue.label}
							delete={deleteTask}
						/>
					);
				})
			);
		}
	}, [list]);

	const deleteTask = id => {
		setList(list.filter((_, index) => index != id));
		setUpdate(true);
	};

	return (
		<div className="ContainerToDo">
			<div className="todoList">
				{!failOnUpdating && <h1>{failOnUpdating}</h1>}
				<h1>TO DO LIST</h1>
				<form
					onSubmit={event => {
						event.preventDefault();
						setUpdate(true);
						setList([
							...list,
							{
								label: document.querySelector("input").value,
								done: false
							}
						]);
					}}
					action="">
					<input type="text" placeholder="add new task" />
				</form>
				<ul>{listOfComponents}</ul>
			</div>
		</div>
	);
};

export default Home;
