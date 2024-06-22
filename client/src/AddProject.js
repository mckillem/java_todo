import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fragment, useContext, useEffect, useState} from "react";
import Select from '@mui/material/Select';
import {FormControl, InputLabel, MenuItem, OutlinedInput, useTheme} from "@mui/material";
import DataContext from "./context/DataContext";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

export default function AddProject() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const { getStyles} = useContext(DataContext);
	const theme = useTheme();
	const axiosPrivate = useAxiosPrivate();
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function add(event) {
		event.preventDefault();

		const project = {
			name: name,
			description: description,
			users: user
		}

		const newProject = async () => {
			try {
				const response = await axiosPrivate.post('/projects', project);
			} catch (err) {
				console.error(err);
			}

			setName("");
			setDescription("");
			handleClose();
		}

		newProject();
	}

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;

		setUser(
			// On autofill we get a stringified value.
			typeof value === 'number' ? value.split(',') : value,
		);
	};

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get('/users', {
					signal: controller.signal
				});
				isMounted && setUsers(response.data.map(d => ({
					key: d.id,
					value: d.username,
					label: d.username
				})));
			} catch (err) {
				console.error(err);
			}
		}

		getUsers();

		return () => {
			isMounted = false;
			isMounted && controller.abort()
		}
	}, [])

	return (
		<Fragment>
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
									style={getStyles(u.value, user, theme, users)}
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
		</Fragment>
	);
}