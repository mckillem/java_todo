import {useEffect, useState} from "react";
import {deleteTodo, getAllTodos, getAllTodosByProject, getAllTodosByUser} from "./client";
import {useParams} from "react-router-dom";
import AddForm from "./AddForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function TodoList() {
	const [todos, setTodos] = useState([]);
	// const [fetching, setFetching] = useState(true);
	const [allTodos, setAllTodos] = useState(true);
	let params = useParams();

	console.log(params)
	const fetchTodos = () => {

		getAllTodosByProject(params.id)
			.then(res => res.json())
			.then(data => {
				setTodos(data);
			}).catch(err => {
			console.log(err.response)
		}).finally();

		//todo: jak upravit v rámci projektu?
		// if (allTodos) {
		// 	console.log(allTodos)
		//
		// 	getAllTodos()
		// 		.then(res => res.json())
		// 		.then(data => {
		// 			setTodos(data);
		// 		}).catch(err => {
		// 		console.log(err.response);
		// 	}).finally(
		// 		// () => setFetching(false)
		// 	);
		// } else {
		// 	console.log(allTodos)
		//
		// 	getAllTodosByUser(params.id)
		// 		.then(res => res.json())
		// 		.then(data => {
		// 			setTodos(data);
		// 		}).catch(err => {
		// 		console.log(err.response);
		// 	}).finally(
		// 		// () => setFetching(false)
		// 	);
		// }
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
		fetchTodos();
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					'& > *': {
						m: 1,
					}
				}}
			>
				<AddForm fetchTodos={fetchTodos} projectId={params.id}/>
				<br/>
				<h1>Seznam úkolů</h1>
				<Button onClick={switchTodoList}>Všechny/moje</Button>
				<br/>
				{todos && todos.length > 0 ? todos.map(todo => {
					return <div key={todo.id}>
						<Button variant="outlined">{todo.content}</Button>
						<Button onClick={() => buttonOnClick(todo.id)}>X</Button>
					</div>
				}) : "no todos"}
			</Box>
		</>
	)
}

export default TodoList;