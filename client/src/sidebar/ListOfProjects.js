import {useEffect, useState} from "react";
import {getAllProjects} from "../client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import AddProject from "../AddProject";
import {getId, setProjectName} from "../localStorage/LocalStorage";

function ListOfProjects() {
	const [projects, setProjects] = useState([]);
	const [open, setOpen] = React.useState(true);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const fetchProjects = () => {

		getAllProjects()
			.then(res => res.json())
			.then(data => {
				setProjects(data);
			}).catch(err => {
			console.log(err.response);
		}).finally(
		);
	}

	function todos(project) {
		setProjectName(project.name);
		window.location.href="/list-of-projects/" + getId() + "/" + project.id;
	}

	useEffect(() => {
		console.log("listOfProjects is mounted");
		fetchProjects();
	}, []);

	const Projects = (
		<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
			<List>
				{projects && projects.length > 0 ? projects.map((project) => (
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
				<AddProject fetchProjects={fetchProjects} userId={getId()}/>
				{Projects}
			</Drawer>
		</>
	)
}

export default ListOfProjects;