import {useEffect, useState} from "react";
import {getAllUsers} from "./client";

function UserList() {
	const [users, setUsers] = useState([]);
	const [fetching, setFetching] = useState(true);

	const fetchUsers = () =>
		getAllUsers()
			.then(res => res.json())
			.then(data => {
				setUsers(data);
			}).catch(err => {
			console.log(err.response);
		}).finally(() => setFetching(false));

	useEffect(() => {
		console.log("component is mounted");
		fetchUsers();
	}, []);

	const buttonOnClick = (id) => {
		window.location.href="todos/" + id;
	}

	return (
		<>
			<h1>Seznam uživatelů</h1>
			{users && users.length > 0 ? users.map(user => {
				return <div>
					<button onClick={() => buttonOnClick(user.id)}>{user.username}</button>
					<br/>
				</div>
			}) : "no users"}
		</>
	)
}

export default UserList;