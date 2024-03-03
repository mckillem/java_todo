import {useEffect, useState} from "react";
import {getAllTodosByUser} from "./client";

function TodoList() {
	const [todos, setTodos] = useState([]);
	const [fetching, setFetching] = useState(true);

	const fetchTodos = () =>
		getAllTodosByUser()
			.then(res => res.json())
			.then(data => {
				setTodos(data);
			}).catch(err => {
			console.log(err.response);
		}).finally(() => setFetching(false));

	useEffect(() => {
		console.log("component is mounted");
		fetchTodos();
	}, []);

	const buttonOnClick = (id) => {
		console.log(id)
		// let navigate = useNavigate();
		// navigate("user-list/id");
		// window.location.href="user-list/id";

	}

	return (
		<>
			<h1>Seznam úkolů</h1>
			{todos && todos.length > 0 ? todos.map(todo => {
				return <div>
					<button onClick={() => buttonOnClick(todo.id)}>{todo.content}</button>
					<br/>
				</div>
			}) : "no todos"}
		</>
	)
}

export default TodoList;