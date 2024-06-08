import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {addTodo, getAllUsers} from "./client";
import {useEffect, useState} from "react";
import {getAllStates} from "./client";
import Select from "react-select";

export default function AddForm({ fetchTodos, userId }) {
	const [open, setOpen] = React.useState(false);
	const [createdBy, setCreatedBy] = useState(userId);
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [state, setState] = useState(0);
	const [states, setStates] = useState([]);
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

		const todo = {
			"createdBy": createdBy,
			"content": content,
			"description": description,
			"state": {"id": state},
			"users": [
				{"id": user}
			]
		}

		addTodo(todo)
			.then(() => {
				console.log("todo added")
				// successNotification(
				//     "Todo successfully added",
				//     `${todo.name} was added to the system`
				// )
				fetchTodos();
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
			setContent("");
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
		getAllStates()
			.then(res => res.json())
			.then(data => {
				data.map(d => console.log(d))

				setStates(data.map(d => ({
					key: d.id,
					value: d.name,
					label: d.text
				})));

			}).catch(err => {
			console.log(err.response);
		}).finally(
			// () => setFetching(false)
		);

		fetchUsers();
	}, [])

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={handleClickOpen}>
				Přidat úkol
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: add
				}}
			>
				<DialogTitle>Úkol</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Co budeme dnes tvořit?
					</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						name="content"
						label="Obsah"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/>
					<TextField
						required
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
						options={states}
						onChange={(e) => setState(e.key)}
					>
					</Select>
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