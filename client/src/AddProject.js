import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {addProject} from "./client";
import {useContext, useState} from "react";
import Select from '@mui/material/Select';
import {FormControl, InputLabel, MenuItem, OutlinedInput} from "@mui/material";
import DataContext from "./context/DataContext";

export default function AddProject({ fetchProjects, userId }) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const { users, user, handleChange } = useContext(DataContext);
	// const theme = useTheme();

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
			"users": user
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
			setName("");
			setDescription("");
			handleClose()
		})
	}

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
					<FormControl>
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
									// style={getStyles(u.value, user, theme, users)}
								>
									{u.value}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Zrušit</Button>
					<Button type="submit">Uložit</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}