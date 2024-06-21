import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import AddForm from "./AddForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import DataContext from "./context/DataContext";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

function TodoList() {
	const [todos, setTodos] = useState([]);
	const [allTodos, setAllTodos] = useState(true);
	const { fetchError, setFetchError } = useContext(DataContext);
	const { projectId } = useParams();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";


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

		const getTodosByProject = async () => {

			try {
				const response = await axiosPrivate.get('/todos/project/?id=' + projectId, {
					signal: controller.signal
				});
				isMounted && setTodos(response.data);
			} catch (err) {
				console.log("nějaká chyba v todolistu: " + err);
				// setFetchError("Nepodařilo se načíst projekty.");

				navigate('/login', { state: { from: location }, replace: true });
			}
		}

		getTodosByProject();

		return () => {
			isMounted = false;
			isMounted && controller.abort()
		}
	}, []);

	const removeTodo = async (todoId) => {
		try {
			await axiosPrivate.delete('/todos/' + todoId);
		} catch (err) {
			console.error(err);
			// setFetchError("Nepodařilo se načíst uživatelé.");
		}
	}

	// useEffect(() => {
	// 	fetchTodos();
	// }, []);

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
						<Button onClick={() => removeTodo(todo.id)}>X</Button>
					</div>
				}) : "no todos"}
			</Box>
		</>
	)
}

export default TodoList;