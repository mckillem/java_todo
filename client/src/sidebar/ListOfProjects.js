import {useContext, useState} from "react";
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

function ListOfProjects() {
	const [open, setOpen] = useState(true);
	const { fetchError, projects } = useContext(DataContext);
	const [projectNameAttribs] = useInput('projectName', '');

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	function todos(project) {
		projectNameAttribs(project.name);
		// todo: změnit aby se nenačítala stráka ale jen se načetla data
		window.location.href= project.id;
	}

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