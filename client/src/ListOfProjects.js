import {useEffect, useState} from "react";
import {getAllProjects, getAllTodos, getAllTodosByUser} from "./client";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function ListOfProjects() {
	const [projects, setProjects] = useState([]);
	const [allProjects, setAllProjects] = useState(true);
	let params = useParams();

	console.log("seznam projektů")
	const fetchProjects = () => {
		console.log(allProjects)

		getAllProjects()
			.then(res => res.json())
			.then(data => {
				setProjects(data);
			}).catch(err => {
			console.log(err.response);
		}).finally(
		);
	}

	function todos(id) {
		window.location.href="/list-of-projects/" + params.id + "/project/" + id;
	}

	useEffect(() => {
		console.log("component is mounted");
		fetchProjects();
	}, []);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					'& > *': {
						m: 1,
					}
				}}
			>
				<h1>Seznam projektů</h1>
				{projects && projects.length > 0 ? projects.map(project => {
					return <div key={project.id}>
						<Button onClick={() => todos(project.id)} variant="outlined">{project.name}</Button>
					</div>
				}) : "no projects"}
			</Box>
		</>
	)
}

export default ListOfProjects;