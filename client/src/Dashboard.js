import {useEffect} from "react";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import ListOfProjects from "./sidebar/ListOfProjects";
import Header from "./header/Header";

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
					<Header/>
					<ListOfProjects/>
				</Stack>
			</Box>
		</>
	)
}

export default Dashboard;