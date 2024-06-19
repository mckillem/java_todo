import {useContext, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import AddProject from "../AddProject";
import DataContext from "../context/DataContext";
import useInput from "../hooks/useInput";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function ListOfProjects() {
	const [open, setOpen] = useState(true);
	// const { fetchError, setFetchError } = useContext(DataContext);
	const [projects, setProjects] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const [fetchError, setFetchError] = useState(null);

	const [projectNameAttribs] = useInput('projectName', '');

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	function todos(project) {
		projectNameAttribs(project.name);
		// todo: změnit aby se nenačítala stráka ale jen se načetla data
		window.location.href= project.id;
	}

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getProjects = async () => {

			try {
				const response = await axiosPrivate.get('/projects', {
					signal: controller.signal
				});
				isMounted && setProjects(response.data);
			} catch (err) {
				// todo: jak zobrazovat chyby uživateli?
				// todo: i když načte projekty tak stejně hodí chybu a tím pádem by přeměroval
				console.log(" toto je nějaká chyba: " + err);
				// setFetchError("Nepodařilo se načíst projekty.");

				// navigate('/login', { state: { from: location }, replace: true });
			}
		}

		getProjects();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, []);

	const Projects = (
		<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
			<List>
				{projects.length ? projects.map((project) => (
					<ListItem key={project.id} disablePadding>
						<ListItemButton>
							<ListItemText primary={project.name} onClick={() => todos(project)} />
						</ListItemButton>
					</ListItem>
				)) : "no projects"}
			</List>
		</Box>
	);

	return (
		<>
			<Button onClick={toggleDrawer(true)}>Seznam projektů</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}>
				<AddProject/>
				{fetchError && <p style={{ color: "red" }}>{`Chyba: ${fetchError}`}</p>}
				{!fetchError && Projects}
			</Drawer>
		</>
	)
}

export default ListOfProjects;