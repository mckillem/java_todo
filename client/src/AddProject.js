import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {addProject, getAllUsers} from "./client";
import {useEffect, useState} from "react";
import Select from "react-select";

export default function AddProject({ fetchProjects, userId }) {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState(0);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function add(event) {
		event.preventDefault();

		const project = {
			"name": name,
			"description": description,
			"users": [
				{"id": user}
			]
		}

		addProject(project)
			.then(() => {
				console.log("project added")
				// successNotification(
				//     "Todo successfully added",
				//     `${todo.name} was added to the system`
				// )
				fetchProjects();
			}).catch(err => {
			// console.log(err);
			// err.response.json().then(res => {
			// 	console.log(res);
			// errorNotification(
			//     "There was an issue",
			//     `${res.message} [${res.status}] [${res.error}]`,
			//     "bottomLeft"
			// )
			// });
		}).finally(() => {
			// setSubmitting(false);
			setName("");
			setDescription("");
			handleClose()
		})
	}

	const fetchUsers = () =>
		getAllUsers()
			.then(res => res.json())
			.then(data => {
				setUsers(data.map(d => ({
					key: d.id,
					value: d.username,
					label: d.username
				})));
			}).catch(err => {
			console.log(err.response);
		}).finally(
		);

	useEffect(() => {
		fetchUsers();
	}, [])

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={handleClickOpen}>
				Přidat projekt
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: add
				}}
			>
				<DialogTitle>Projekt</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Co budeme dnes tvořit?
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						name="name"
						label="Název"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
					<TextField
						margin="dense"
						name="description"
						label="Popis"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setDescription(e.target.value)}
						value={description}
					/>
					<Select
						options={users}
						onChange={e => setUser(e.key)}
					>
					</Select>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Zrušit</Button>
					<Button type="submit">Uložit</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}