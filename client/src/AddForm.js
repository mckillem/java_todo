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
import {InputLabel, MenuItem, OutlinedInput, useTheme} from "@mui/material";
import DataContext from "./context/DataContext";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import useAuth from "./hooks/useAuth";

export default function AddForm({ fetchTodos, projectId }) {
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [state, setState] = useState("");
	const [states, setStates] = useState([]);
	const { getStyles, setSuccess } = useContext(DataContext);
	const theme = useTheme();
	const axiosPrivate = useAxiosPrivate();
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const { auth } = useAuth();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function add(event) {
		event.preventDefault();

		const todo = {
			createdBy: auth.id,
			projectId: parseInt(projectId),
			content: content,
			description: description,
			state: {"id": state},
			users: user
		}

		const newTodo = async () => {
			try {
				const response = await axiosPrivate.post('/todos', todo);
			} catch (err) {
				console.error(err);
			}

			setContent("");
			setDescription("");
			setState("");
			setUser([]);
			setSuccess(true);
			handleClose();
		}

		newTodo();
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

		const getStates = async () => {
			try {
				const response = await axiosPrivate.get('/todos/states', {
					signal: controller.signal
				});
				isMounted && setStates(response.data.map(d => ({
					key: d.id,
					value: d.name,
					label: d.text
				})));
			} catch (err) {
				console.error(err);
			}
		}

		getStates();

		return () => {
			isMounted = false;
			isMounted && controller.abort();
		}
		}, [])

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
			isMounted && controller.abort();
		}
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