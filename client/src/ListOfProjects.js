import {useEffect, useState} from "react";
import {deleteTodo, getAllTodos, getAllTodosByUser} from "./client";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function ListOfProjects() {
	const [todos, setTodos] = useState([]);
	const [allTodos, setAllTodos] = useState(true);
	let params = useParams();
	console.log("seznam projektů")
	const fetchTodos = () => {
		if (allTodos) {
			console.log(allTodos)

			getAllTodos()
				.then(res => res.json())
				.then(data => {
					setTodos(data);
				}).catch(err => {
				console.log(err.response);
			}).finally(
			);
		} else {
			console.log(allTodos)

			getAllTodosByUser(params.id)
				.then(res => res.json())
				.then(data => {
					setTodos(data);
				}).catch(err => {
				console.log(err.response);
			}).finally(
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
				<h1>Seznam projektů (očividně je třeba se domluvit co a jak)</h1>
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

export default ListOfProjects;