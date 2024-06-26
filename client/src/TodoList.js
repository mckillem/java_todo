import {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import AddForm from "./AddForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import DataContext from "./context/DataContext";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import UpdateTodoForm from "./UpdateTodoForm";

function TodoList() {
	const [todos, setTodos] = useState([]);
	const [allTodos, setAllTodos] = useState(true);
	const { fetchError, projectName, success, setSuccess } = useContext(DataContext);
	const { projectId } = useParams();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

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
				// todo: neustále načítá
				// setSuccess(true);
			} catch (err) {
				console.log("nějaká chyba v todolistu: " + err);

				navigate('/login', { state: { from: location }, replace: true });
			}
		}

		getTodosByProject();
		setSuccess(false);

		return () => {
			isMounted = false;
			isMounted && controller.abort();
		}
	// 	todo: sice obnoví po přidání úkolu ale neobnoví při změně projektu
	}, [success]);

	const removeTodo = async (todoId) => {
		try {
			await axiosPrivate.delete('/todos/' + todoId);
			setSuccess(true);
		} catch (err) {
			console.error(err);
		}
	}

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
				<h1>{projectName}</h1>
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
						<UpdateTodoForm todo={todo}/>
						<Button onClick={() => removeTodo(todo.id)}>X</Button>
					</div>
				}) : "no todos"}
			</Box>
		</>
	)
}

export default TodoList;