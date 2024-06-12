import {useEffect} from "react";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import ListOfProjects from "./ListOfProjects";

function Dashboard() {
	useEffect(() => {
		console.log("component is mounted");
	}, []);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'left',
					'& > *': {
						m: 1,
					}
				}}
			>
				<Stack>
					<ListOfProjects/>
				</Stack>
			</Box>
		</>
	)
}

export default Dashboard;