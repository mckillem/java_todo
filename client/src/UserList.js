import {useEffect, useState} from "react";
import {getAllUsers} from "./client";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

function UserList() {
	const [users, setUsers] = useState([]);
	// const [fetching, setFetching] = useState(true);

	const fetchUsers = () =>
		getAllUsers()
			.then(res => res.json())
			.then(data => {
				setUsers(data);
			}).catch(err => {
			console.log(err.response);
		}).finally(
			// () => setFetching(false)
		);

	useEffect(() => {
		console.log("component is mounted");
		fetchUsers();
	}, []);

	const buttonOnClick = (id) => {
		window.location.href="todos/" + id;
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
				{/*<h1>Seznam uživatelů</h1>*/}
				<ButtonGroup orientation="vertical" aria-label="Vertical button group">
					{users && users.length > 0 ? users.map(user => {
						return <div>
							<Button fullWidth onClick={() => buttonOnClick(user.id)}>{user.username}</Button>
						</div>
					}) : "no users"}
				</ButtonGroup>
			</Box>
		</>
	)
}

export default UserList;