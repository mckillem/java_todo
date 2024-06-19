import {useContext, useEffect, useState} from "react";
import {deleteTodo, getAllTodosByProject, getAllTodosByUser} from "./client";
import {useParams} from "react-router-dom";
import AddForm from "./AddForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {getId} from "./localStorage/LocalStorage";
import * as React from "react";
import DataContext from "./context/DataContext";
import useInput from "./hooks/useInput";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

function TodoList() {
	const [todos, setTodos] = useState([]);
	const [allTodos, setAllTodos] = useState(true);
	const { fetchError, setFetchError } = useContext(DataContext);
	const { projectId } = useParams();
	const [value] = useInput('projectName', '');
	const axiosPrivate = useAxiosPrivate();


	// const fetchTodos = () => {
	// 	if (allTodos) {
	// 		getAllTodosByProject(projectId)
	// 			.then(res => res.json())
	// 			.then(data => {
	// 				setTodos(data);
	// 			}).catch(() => {
	// 				setFetchError("Nepodařilo se načíst úkoly.");
	// 		});
	// 	} else {
	// 		//todo: budeme ještě používat? pokud ano, tak upravit na getAllTodosByProjectByUser
	// 		getAllTodosByUser(getId())
	// 			.then(res => res.json())
	// 			.then(data => {
	// 				setTodos(data);
	// 			}).catch(() => {
	// 				setFetchError("Nepodařilo se načíst úkoly.");
	// 		});
	// 	}
	// }

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getTodos = async () => {

			try {
				const response = await axiosPrivate.get('/todos/project/?id=' + projectId, {
					signal: controller.signal
				});
				isMounted && setTodos(response.data);
			} catch (err) {
				console.log(" toto je nějaká chyba: " + err);
				// setFetchError("Nepodařilo se načíst projekty.");

				// navigate('/login', { state: { from: location }, replace: true });
			}
		}

		getTodos();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, []);

	const removeTodo = (todoId, callback) =>
		deleteTodo(todoId)
			.then(() => {
				callback();
		}).catch(() => {
			setFetchError("Nepodařilo se smazat úkol.");
		});

	// useEffect(() => {
	// 	fetchTodos();
	// }, []);

	// const buttonOnClick = (id) => {
	// 	removeTodo(id, fetchTodos);
	// }

	const switchTodoList = () => {
		setAllTodos(!allTodos);
		// fetchTodos();
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
				{/*<h1>{value}</h1>*/}
				<br/>
				<br/>
				<AddForm projectId={projectId}/>
				<br/>
				<h3>Seznam úkolů</h3>
				<Button onClick={switchTodoList}>Všechny/moje</Button>
				<br/>
				{fetchError && <p style={{ color: "red" }}>{`Chyba: ${fetchError}`}</p>}
				{!fetchError && todos.length ? todos.map(todo => {
					return <div key={todo.id}>
						<Button variant="outlined">{todo.content}</Button>
						{/*<Button onClick={() => buttonOnClick(todo.id)}>X</Button>*/}
					</div>
				}) : "no todos"}
			</Box>
		</>
	)
}

export default TodoList;