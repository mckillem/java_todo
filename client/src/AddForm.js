import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {addTodo} from "./client";
import {Fragment, useContext, useEffect, useState} from "react";
import {getAllStates} from "./client";
import Select from '@mui/material/Select';
import {InputLabel, MenuItem, OutlinedInput, useTheme} from "@mui/material";
import DataContext from "./context/DataContext";
import {getId} from "./localStorage/LocalStorage";

export default function AddForm({ fetchTodos, projectId }) {
	const [open, setOpen] = useState(false);
	const [project, setProject] = useState(projectId);
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [state, setState] = useState("");
	const [states, setStates] = useState([]);
	const { users, user, handleChange, setFetchError, getStyles } = useContext(DataContext);
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
			"createdBy": getId(),
			"projectId": project,
			"content": content,
			"description": description,
			"state": {"id": state},
			"users": user
		}

		addTodo(todo)
			.then(() => {
				fetchTodos();
			}).catch(() => {
				setFetchError("Nepodařilo se vytvořit úkol.");
		}).finally(() => {
			setContent("");
			setDescription("");
			handleClose()
		})
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
			}).catch(() => {
				setFetchError("Nepodařilo se načíst stav.");
		});
		}, [])

	return (
		<Fragment>
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
								style={getStyles(u.value, user, theme, users)}
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
		</Fragment>
	);
}