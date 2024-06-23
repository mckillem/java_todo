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
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import DataContext from "../context/DataContext";

function ListOfProjects() {
	const [open, setOpen] = useState(true);
	const [projects, setProjects] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const [fetchError] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const {setProjectName} = useContext(DataContext);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	function todos(project) {
		setProjectName(project.name);

		navigate("/" + project.id);
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
				console.error(err)

				navigate('/login', { state: { from: location }, replace: true });
			}
		}

		getProjects();

		return () => {
			isMounted = false;
			isMounted && controller.abort();
		}
	}, [projects]);

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