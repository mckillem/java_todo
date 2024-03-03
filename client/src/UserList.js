import {useEffect, useState} from "react";
import {getAllUsers} from "./client";

function UserList() {
	const [users, setUsers] = useState([]);
	const [fetching, setFetching] = useState(true);

	const fetchUsers = () =>
		getAllUsers()
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setUsers(data);
			}).catch(err => {
			console.log(err.response);
			console.log(users.length);
		}).finally(() => setFetching(false));

	useEffect(() => {
		console.log("component is mounted");
		fetchUsers();
	}, []);

	return (
		<>
			<h1>Seznam uživatelů</h1>
			{users && users.length > 0 ? users.map(user => {
				return <div>
					{user.username}
					<br/>
				</div>
			}) : "no users"}
		</>
	)
}

export default UserList;