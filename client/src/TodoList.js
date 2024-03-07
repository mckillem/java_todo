import {useEffect, useState} from "react";
import {deleteTodo, getAllTodos, getAllTodosByUser} from "./client";
import {useParams} from "react-router-dom";
import {AddForm} from "./AddForm";

function TodoList() {
	const [todos, setTodos] = useState([]);
	// const [fetching, setFetching] = useState(true);
	const [allTodos, setAllTodos] = useState(true);
	let params = useParams();

	const fetchTodos = () => {
		if (allTodos) {
			getAllTodos()
				.then(res => res.json())
				.then(data => {
					setTodos(data);
				}).catch(err => {
				console.log(err.response);
			}).finally(
				// () => setFetching(false)
			);
		} else {
			getAllTodosByUser(params.id)
				.then(res => res.json())
				.then(data => {
					setTodos(data);
				}).catch(err => {
				console.log(err.response);
			}).finally(
				// () => setFetching(false)
			);
		}
	}

	const removeTodo = (todoId, callback) => {
		deleteTodo(todoId).then(() => {
			// successNotification("Student deleted", `Student with ${todoId} was deleted`);
			// console.log(callback);
			callback();
		}).catch(err => {
			// err.response.json().then(res => {
			// 	console.log(res);
			// errorNotification(
			// 	"There was an issue",
			// 	`${res.message} [${res.status}] [${res.error}]`
			// )
			// });
		});
	}

	useEffect(() => {
		console.log("component is mounted");
		fetchTodos();
	}, []);

	const buttonOnClick = (id) => {
		removeTodo(id, fetchTodos);
	}

	const switchTodoList = () => {
		setAllTodos(!allTodos);
	}

	return (
		<>
			<AddForm fetchTodos={fetchTodos()}/>
			<br/>
			<h1>Seznam úkolů</h1>
			<button onClick={switchTodoList}>Všechny/moje</button>
			<br/>
			{todos && todos.length > 0 ? todos.map(todo => {
				return <div>
					<>{todo.content}</>
					<button onClick={() => buttonOnClick(todo.id)}>X</button>
					<br/>
				</div>
			}) : "no todos"}
		</>
	)
}

export default TodoList;