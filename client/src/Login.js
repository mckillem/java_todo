import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import {loginUser} from "./client";

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		console.log("component is mounted");
	}, []);

	function signIn(event)  {
		const userParams = {
			"username": username,
			"password": password
		}

		loginUser(userParams)
			.then(res => res.json())
			.then(data => {
				console.log(data.id)
				// window.location.href="todos/" + data.id;
				window.location.href="dashboard/" + data.id;
			})
			.catch(err => {
				console.log("Špatné přihlašovací údaje")
				console.log(err.response);
			})
			.finally(() => {
				setUsername("");
				setPassword("");
			})
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
				<TextField
					// error
					id="standard-error"
					label="Uživatelské jméno"
					variant="standard"
					onChange={e => setUsername(e.target.value)}
					value={username}
				/>
				<TextField
					// error
					id="standard-error-helper-text"
					label="Heslo"
					// helperText="Incorrect entry."
					variant="standard"
					type="password"
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
				<Button type="submit" variant="outlined" onClick={() => signIn()}>Přihlásit</Button>
			</Box>
		</>
	)
}

export default Login;