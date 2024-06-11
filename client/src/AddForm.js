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
import * as ReactSelect from "react-select";
import Select from '@mui/material/Select';
import {InputLabel, MenuItem, OutlinedInput, useTheme} from "@mui/material";

export default function AddForm({ fetchTodos, projectId, userId }) {
	const [open, setOpen] = React.useState(false);
	const [createdBy, setCreatedBy] = useState(userId);
	const [project, setProject] = useState(projectId);
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [state, setState] = useState("");
	const [states, setStates] = useState([]);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const theme = useTheme();

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
			"projectId": project,
			"content": content,
			"description": description,
			"state": {"id": state},
			"users": user
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

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;

		setUser(
			// On autofill we get a stringified value.
			typeof value === 'number' ? value.split(',') : value,
		);
	};

	function getStyles(name, user, theme) {
		return {
			fontWeight:
				users.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		};
	}

	useEffect(() => {
		getAllStates()
			.then(res => res.json())
			.then(data => {

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
						value={state}
						onChange={e => setState(e.target.value)}
					>
						{states.map(u => (
							<MenuItem
								key={u.key}
								value={u.key}
								style={getStyles(u.label, state, theme)}
							>
								{u.label}
							</MenuItem>
						))}
					</Select>
					<InputLabel id="multiple-name-label">Uživatelé</InputLabel>
					<Select
						labelId="multiple-name-label"
						multiple
						value={user}
						onChange={handleChange}
						input={<OutlinedInput label="Name" />}
					>
						{users.map(u => (
							<MenuItem
								key={u.key}
								value={u.key}
								style={getStyles(u.value, user, theme)}
							>
								{u.value}
							</MenuItem>
						))}
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