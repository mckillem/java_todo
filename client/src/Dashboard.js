import {useEffect} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import AddProject from "./AddProject";
import {useParams} from "react-router-dom";

function Dashboard() {

	let params = useParams();
	console.log(params)

	function dashboard() {
		window.location.href="/dashboard/" + params.id;
	}
	
	const fetchProjects = () => {
	  console.log("nacital bych kdyby byly projekty")
	}
	
	function listOfProjects() {
		window.location.href="/list-of-projects";
	}

	useEffect(() => {
		console.log("component is mounted");
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
				<Stack spacing={2} direction="row">
					<Button onClick={dashboard}>Nástěnka</Button>
					<AddProject fetchProjects={fetchProjects} userId={params.id}/>
					<Button onClick={listOfProjects}>Seznam projektů</Button>
				</Stack>
			</Box>
		</>
	)
}

export default Dashboard;